/* ============== KEYBOARD SUPPORT FOR DIV-BASED BUTTONS ============== */
/* A handful of controls (modal close, card edit/delete/share) are rendered as
   <div role="button"> rather than real <button> elements, since they sit inside larger
   template strings alongside plain text/icons. This makes Enter/Space activate them the
   same way a native button would, so they're not mouse/touch-only. */
document.addEventListener('keydown', (e) => {
  if(e.key !== 'Enter' && e.key !== ' ') return;
  const el = e.target.closest('[role="button"]');
  if(!el) return;
  e.preventDefault();
  el.click();
});

/* ============== MODAL SCROLL LOCK + FOCUS TRAP ============== */
/* Every modal (Add/Edit form, Detail view, Settings, Changelog, Credits, achievement
   popups) is just a .overlay div appended straight to <body> and removed on close.
   Watching body for those comings and goings, rather than wiring this into every
   individual open/close function, means scroll lock, initial focus, Tab containment,
   and returning focus on close all work for any current or future modal for free. */
function getFocusableEls(container){
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(el => el.offsetParent !== null);
}

let activeModalEl = null;
let focusBeforeModal = null;

const bodyScrollObserver = new MutationObserver(() => {
  const overlay = document.body.querySelector(':scope > .overlay');
  document.body.classList.toggle('modal-open', !!overlay);

  if(overlay && overlay !== activeModalEl){
    focusBeforeModal = document.activeElement;
    activeModalEl = overlay;
    const focusable = getFocusableEls(overlay);
    const preferred = focusable.find(el => !el.classList.contains('modal-close')) || focusable[0];
    if(preferred) preferred.focus();
  } else if(!overlay && activeModalEl){
    activeModalEl = null;
    if(focusBeforeModal && document.body.contains(focusBeforeModal)) focusBeforeModal.focus();
    focusBeforeModal = null;
  }
});
bodyScrollObserver.observe(document.body, { childList: true });

document.addEventListener('keydown', (e) => {
  if(e.key !== 'Tab' || !activeModalEl) return;
  const focusable = getFocusableEls(activeModalEl);
  if(!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if(e.shiftKey && document.activeElement === first){
    e.preventDefault(); last.focus();
  } else if(!e.shiftKey && document.activeElement === last){
    e.preventDefault(); first.focus();
  }
});

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

// Shared validation + migration for imported JSON, used by both the File System Access
// path and the legacy <input type=file> fallback, so a future shape/settings change only
// needs to happen in one place instead of being kept in sync across two copies.
function normalizeImportedData(data){
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
  return data;
}

async function applyFileToState(file){
  const text = await file.text();
  const data = normalizeImportedData(JSON.parse(text));
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

