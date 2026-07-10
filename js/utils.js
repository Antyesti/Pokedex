/* ============== AUTOSAVE (localStorage) ============== */
/* Persists trainer/settings/pokemon to localStorage so a reload restores the
   last session automatically, independent of the File System Access handle
   above. Writes are debounced so rapid successive mutations (e.g. several
   achievement toggles) collapse into a single write. */
const AUTOSAVE_KEY = 'pokedex_autosave_v1';
let autosaveTimer = null;
let autosaveQuotaWarned = false;

function persistState(){
  try{
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({
      trainer: state.trainer,
      settings: state.settings,
      pokemon: state.pokemon
    }));
  } catch(e){
    // Quota exceeded or storage disabled (e.g. private browsing) -- warn once per
    // session rather than repeating the toast on every debounced write attempt.
    if(!autosaveQuotaWarned){
      autosaveQuotaWarned = true;
      showToast('Autosave failed: browser storage is full or unavailable. Export to back up your roster.');
    }
  }
}

function scheduleAutosave(){
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(persistState, 400);
}

function loadAutosavedState(){
  try{
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if(!raw) return null;
    const parsed = JSON.parse(raw);
    if(!parsed || !Array.isArray(parsed.pokemon)) return null;
    return parsed;
  } catch(e){
    return null;
  }
}

/* ============== LAST FILE HANDLE (File System Access API) ============== */
/* Lets Chromium browsers remember the last opened/saved file across reloads.
   Not supported in Firefox/Safari -> falls back to plain <input type=file>. */
const FS_SUPPORTED = 'showOpenFilePicker' in window;
const HANDLE_DB = 'pokedex-fs';
const HANDLE_STORE = 'handles';
const HANDLE_KEY = 'lastFile';

function openHandleDB(){
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(HANDLE_DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(HANDLE_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function saveHandle(handle){
  try{
    const db = await openHandleDB();
    return new Promise((resolve) => {
      const tx = db.transaction(HANDLE_STORE, 'readwrite');
      tx.objectStore(HANDLE_STORE).put(handle, HANDLE_KEY);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch(e){ return false; }
}
async function loadHandle(){
  try{
    const db = await openHandleDB();
    return new Promise((resolve) => {
      const tx = db.transaction(HANDLE_STORE, 'readonly');
      const req = tx.objectStore(HANDLE_STORE).get(HANDLE_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch(e){ return null; }
}

async function applyFileToState(file){
  const text = await file.text();
  const data = JSON.parse(text);
  if(!data.pokemon || !Array.isArray(data.pokemon)) throw new Error('bad shape');
  if(typeof data.trainer !== 'string') data.trainer = '';
  if(typeof data.settings !== 'object' || !data.settings) data.settings = { defaultSort:'oldest', defaultTheme:'light', custom: defaultCustomTheme(), bodyFont: defaultFontSetting(), nicknameFont: defaultFontSetting() };
  if(typeof data.settings.custom !== 'object' || !data.settings.custom) data.settings.custom = defaultCustomTheme();
  // migrate the older single "font" setting (pre-nickname-font split) into bodyFont
  if(data.settings.font && !data.settings.bodyFont) data.settings.bodyFont = data.settings.font;
  delete data.settings.font;
  if(typeof data.settings.bodyFont !== 'object' || !data.settings.bodyFont) data.settings.bodyFont = defaultFontSetting();
  if(typeof data.settings.nicknameFont !== 'object' || !data.settings.nicknameFont) data.settings.nicknameFont = defaultFontSetting();
  data.pokemon = data.pokemon.map(normalizePokemon);
  state = data;
  pendingDeletions = [];
  applySettings();
  render();
  showToast(`Loaded ${data.pokemon.length} Pokémon from ${file.name}.`);
}

async function tryShowLastFileChip(){
  if(!FS_SUPPORTED) return;
  const handle = await loadHandle();
  if(!handle) return;
  const chip = document.getElementById('lastFileChip');
  const label = document.getElementById('lastFileLabel');
  if(!chip) return;
  label.textContent = `Load ${handle.name}`;
  chip.style.display = 'inline-flex';
  chip.onclick = async () => {
    try{
      const perm = await handle.queryPermission({mode:'read'});
      if(perm !== 'granted'){
        const req = await handle.requestPermission({mode:'read'});
        if(req !== 'granted'){ showToast('Permission denied for that file.'); return; }
      }
      const file = await handle.getFile();
      await applyFileToState(file);
    } catch(err){
      showToast('Could not reopen that file, it may have moved or been deleted.');
      chip.style.display = 'none';
    }
  };
}

document.getElementById('lastFileDismiss')?.addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('lastFileChip').style.display = 'none';
});

/* ============== TOAST ============== */
let toastTimer = null;
function showToast(msg, action){
  const t = document.getElementById('toast');
  const actionBtn = document.getElementById('toastAction');
  document.getElementById('toastMsg').textContent = msg;
  if(action){
    actionBtn.textContent = action.label;
    actionBtn.style.display = 'inline-flex';
    actionBtn.onclick = () => {
      // Just call the action; showToast inside it will manage visibility
      action.onClick();
    };
  } else {
    actionBtn.style.display = 'none';
    actionBtn.onclick = null;
  }
  t.classList.remove('show');
  t.offsetHeight; // flush reflow so removal registers before re-add
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), action ? 8000 : 2600);
}

