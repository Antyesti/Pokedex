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
    // Auto-focus is for keyboard/screen-reader users landing somewhere sensible; on a touch
    // device it can instead pop open a native <select> picker the instant the modal appears,
    // before the person has tapped anything, so skip it there entirely.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if(!isTouch){
      const focusable = getFocusableEls(overlay);
      const explicit = focusable.find(el => el.hasAttribute('data-autofocus'));
      const preferred = explicit || focusable.find(el => !el.classList.contains('modal-close') && !el.hasAttribute('data-no-autofocus')) || focusable[0];
      if(preferred) preferred.focus();
    }
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
    // Quota exceeded or storage disabled (e.g. private browsing). Warn once per
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
  historyBarVisible = false;
  updateHistoryBar();
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
// Only one toast is ever showing at a time, so only one "vanish" callback needs tracking.
// A toast counts as vanished once it's no longer visible and its action (if any) wasn't
// used to handle whatever it was offering: either it timed out, or a newer toast replaced
// it before the person acted on it.
let toastVanishCallback = null;

function showToast(msg, action, opts){
  const t = document.getElementById('toast');
  const actionBtn = document.getElementById('toastAction');

  if(toastVanishCallback){
    const cb = toastVanishCallback;
    toastVanishCallback = null;
    cb();
  }
  toastVanishCallback = (opts && opts.onVanish) || null;

  document.getElementById('toastMsg').textContent = msg;
  if(action){
    actionBtn.textContent = action.label;
    actionBtn.style.display = 'inline-flex';
    actionBtn.onclick = () => {
      // The action handled it directly, so this isn't a vanish.
      toastVanishCallback = null;
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
  toastTimer = setTimeout(()=> {
    t.classList.remove('show');
    if(toastVanishCallback){
      const cb = toastVanishCallback;
      toastVanishCallback = null;
      cb();
    }
  }, action ? 8000 : 2600);
}

// Any .switch, anywhere (Shiny, Mega, Gigantamax, Settings, future ones too) gets the
// bounce on its first toggle. Delegated on document so it works on switches that don't
// exist yet when this script runs (modals build their content dynamically), without
// needing separate wiring per checkbox.
document.addEventListener('change', (e) => {
  if(e.target.matches('input[type="checkbox"]')){
    const sw = e.target.closest('.switch');
    if(sw) sw.classList.add('is-init');
  }
});

/* ============== SCROLL TO TOP ============== */
const scrollTopBtn = document.getElementById('scrollTopBtn');
let scrollTopTicking = false;
window.addEventListener('scroll', () => {
  if(scrollTopTicking) return;
  scrollTopTicking = true;
  requestAnimationFrame(() => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 480);
    scrollTopTicking = false;
  });
}, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============== MEGA/GIGANTAMAX ALTERNATE FORMS ============== */
// Groudon, Kyogre, Necrozma's Dawn Wings/Dusk Mane forms, and Eternatus all flip the same
// isMega/isGigantamax toggle as everyone else, but the games call it something else
// (Primal Reversion, Ultra Burst, Eternamax) and show a different icon for some of them.
// These are the single places that decide which term/icon to show for a given species --
// everywhere the generic label or icon would otherwise be shown for a specific Pokémon,
// look it up through here instead.
function resolveFormDisplay(speciesEntryId, altForms, fallback){
  const alt = speciesEntryId && altForms[speciesEntryId];
  if(!alt) return fallback;
  return { term: alt.term, icon: alt.icon || fallback.icon, prefix: alt.prefix || fallback.prefix };
}
function getMegaFormDisplay(speciesEntryId){
  return resolveFormDisplay(speciesEntryId, MEGA_ALT_FORMS, { term: 'Mega Evolution', icon: MEGA_ICON, prefix: 'MEGA' });
}
function getGigantamaxFormDisplay(speciesEntryId){
  return resolveFormDisplay(speciesEntryId, GIGANTAMAX_ALT_FORMS, { term: 'Gigantamax', icon: GIGANTAMAX_ICON, prefix: 'GIGANTAMAX' });
}

// Finds the MEGA_TYPES variant that's currently in effect for a species: the one
// matching megaForm's label (Charizard X/Y, Mewtwo X/Y, ...), or the only/first variant
// for species with just one Mega. Shared by the typing auto-fill and the Mega Ability
// display, since both need "which variant applies right now" the same way. Keyed by
// species entry id rather than name, since only specific forms of some species can Mega
// Evolve (Floette's Eternal Flower form, Kantonian but not Galarian Slowbro, etc.).
function getMegaVariant(speciesEntryId, megaForm){
  const variants = MEGA_TYPES[speciesEntryId];
  if(!variants || !variants.length) return null;
  return variants.find(v => v.label === megaForm) || variants[0];
}

/* ============== TERASTALLIZATION ============== */
// A handful of species Terastallize to one specific type rather than a free choice,
// namely Ogerpon's masks and Terapagos. See FIXED_TERA_TYPES in data/mega-types.js. Everyone
// else picks freely from TERA_TYPES via the Tera Type swatches in the form.
function getFixedTeraType(speciesEntryId){
  return (speciesEntryId && FIXED_TERA_TYPES[speciesEntryId]) || null;
}

// Renders the Tera Type picker's contents: a locked single badge for species with a fixed
// Tera type, or the full swatch row otherwise. Shared between the form's initial render
// (js/pokemon.js) and re-renders triggered by a species change (refreshTeraAvailability).
function teraTypeFieldInnerHTML(speciesEntryId, currentType){
  const fixedType = getFixedTeraType(speciesEntryId);
  if(fixedType){
    return `${typeBadgeHTML(fixedType)}<div class="hint" style="width:100%; margin-top:6px;">Fixed by this species, can't be changed.</div>`;
  }
  return TERA_TYPES.map(t => `<button type="button" class="type-badge type-select ${t===STELLAR_TYPE?'type-badge-stellar':''} ${currentType===t?'active':''}" data-type="${t}" ${t===STELLAR_TYPE?'':`style="background:${TYPE_HEX[t]}"`} onclick="selectTeraType('${t}')">${t}</button>`).join('');
}

// Shared by the card and Detail View type rows. Stellar has no fixed color of its own in
// the games, since TYPE_HEX has no entry for it, so it gets a CSS class that animates
// through every other type's color instead of an inline background.
function typeBadgeHTML(t, opts){
  const faded = opts && opts.faded;
  if(t === STELLAR_TYPE){
    return `<span class="type-badge type-badge-stellar${faded ? ' type-badge-faded' : ''}">${t}</span>`;
  }
  if(faded){
    // The inline `background` shorthand used below would reset background-image/color
    // and override the CSS class's color-mix background, so faded badges go through the
    // --type-color custom property + .type-badge-faded class instead.
    return `<span class="type-badge type-badge-faded" style="--type-color:${TYPE_HEX[t]}">${t}</span>`;
  }
  return `<span class="type-badge" style="background:${TYPE_HEX[t]}">${t}</span>`;
}

// Strips HTML tags and decodes entities down to plain text, using the browser's own
// parser rather than a regex (which can't reliably handle entities or nesting). Used to
// migrate move names that were saved back when the field supported Bold/Italic.
function stripHtmlToText(html){
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent.trim();
}

