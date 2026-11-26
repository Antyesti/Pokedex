/* UI state tables.
   Each table's state is derived from variables and DOM the app already has, never stored a second time, so saved
   JSON, autosave and older backups are unaffected. A table lists its states and legal events. expect() only
   warns in the console on an unexpected transition and never blocks the person using the app.
   Pokedex.snapshot() reads every table at once. */
const MACHINES = {};

function defineMachine(name, { states, on, doc }){
  const m = {
    name, states, on, doc,
    can: (s, ev) => !!(on[s] && ev in on[s]),
    events: s => Object.keys(on[s] || {}),
    expect(s, ev){
      const ok = m.can(s, ev);
      if(!ok) console.warn(`[machine:${name}] event "${ev}" is not expected in state "${s}"`);
      return ok;
    }
  };
  return MACHINES[name] = m;
}

/* 1. Modal stack. Every modal is an .overlay appended to <body>; the last one is on top. */
const modalM = defineMachine('modal', {
  doc: 'Whether any modal is open (depth and ids are in the snapshot)',
  states: ['closed', 'open'],
  on: { closed: { OPEN: 'open' }, open: { OPEN: 'open', CLOSE: '*', ESCAPE: '*' } }
});
const MODAL_CLOSERS = {
  unreleasedWarningOverlay: () => closeUnreleasedWarningModal(),
  customAchvOverlay: () => closeCustomAchievementModal(),
  changelogOverlay: () => closeChangelog(),
  creditsOverlay: () => closeCredits(),
  historyOverlay: () => closeHistory(),
  detailOverlay: () => closeDetail(),
  formOverlay: () => closeForm(),
  newDexOverlay: () => closeNewDexModal(),
  importWarnOverlay: () => closeImportWarn(),
  saveImportOverlay: () => closeSaveImport(),
  trainerNameOverlay: () => closeTrainerNameModal()
};
const modalStack = () => Array.from(document.body.querySelectorAll(':scope > .overlay')).map(el => el.id);
const modalState = () => modalStack().length ? 'open' : 'closed';
/* Closes only the modal on top. Returns true if there was one. */
function closeTopModal(){
  const stack = modalStack();
  if(!stack.length) return false;
  const close = MODAL_CLOSERS[stack[stack.length - 1]];
  if(close) close();
  return true;
}

/* 2. Dropdowns and pickers. At most one owner is open at a time because a click anywhere outside an owner closes it.
   `owners` are the elements a click may land in without closing the panel. */
const DROPDOWNS = [
  { name: 'ball', panel: '.ball-dropdown-panel.open', owners: ['.ball-dropdown'] },
  { name: 'title', panel: '.title-dropdown-panel.open', owners: ['.title-dropdown'] },
  { name: 'gamePreset', panel: '.game-preset-panel.open', owners: ['.game-preset-dropdown'] },
  { name: 'gameFilter', panel: '.game-filter-panel.open', owners: ['.game-filter-dropdown'] },
  { name: 'typeFilter', panel: '.type-filter-panel.open', owners: ['.type-filter-dropdown'] },
  { name: 'species', panel: '.species-picker-panel.open', owners: ['.species-field', '.move-slot-field'] },
  { name: 'text', panel: '.text-picker-panel.open', owners: ['.text-picker-field'] },
  { name: 'importMenu', panel: '.import-menu.open', owners: ['.import-wrap'] }
];
const dropdownM = defineMachine('dropdown', {
  doc: 'Whether a dropdown or picker panel is open',
  states: ['closed', 'open'],
  on: { closed: { OPEN: 'open' }, open: { OPEN: 'open', CLOSE: 'closed', OUTSIDE_CLICK: 'closed', ESCAPE: 'closed' } }
});
function openDropdowns(){
  const names = DROPDOWNS.filter(d => document.querySelector(d.panel)).map(d => d.name);
  if(document.getElementById('trainerAvatarPortal')) names.push('trainerAvatar');
  if(document.querySelector('.date-panel.open')) names.push('date');
  return names;
}
const dropdownState = () => openDropdowns().length ? 'open' : 'closed';
/* Closes every open panel whose owner did not receive the click. */
function closeDropdownsOutside(target){
  DROPDOWNS.forEach(d => {
    if(d.owners.some(sel => target.closest(sel))) return;
    document.querySelectorAll(d.panel).forEach(p => p.classList.remove('open'));
  });
  if(!target.closest('.trainer-avatar-dropdown') && !target.closest('.avatar-dropdown-portal')) closeTrainerAvatarDropdown();
  if(!target.closest('.date-field') && !target.closest('.date-panel')) closeAllDatePanels();
}
/* Escape: closes everything that is open and returns true if anything was. */
function closeAllDropdowns(){
  const wasOpen = openDropdowns().length > 0;
  DROPDOWNS.forEach(d => document.querySelectorAll(d.panel).forEach(p => p.classList.remove('open')));
  closeTrainerAvatarDropdown();
  closeAllDatePanels();
  return wasOpen;
}

/* 3. Add/Edit form. editingId is the only stored variable; the rest comes from whether the overlay exists. */
const formM = defineMachine('form', {
  doc: 'The Add/Edit Pokémon form',
  states: ['closed', 'adding', 'editing'],
  on: { closed: { OPEN_ADD: 'adding', OPEN_EDIT: 'editing' }, adding: { SAVE: 'closed', CLOSE: 'closed' }, editing: { SAVE: 'closed', CLOSE: 'closed' } }
});
const formState = () => !document.getElementById('formOverlay') ? 'closed' : editingId ? 'editing' : 'adding';

/* 4. Record lifecycle. A history entry is added or edited (listed right away), or deleted. A deletion is hidden from
   History while its Undo toast is live ("deletedPending") and listed afterwards ("deleted"). Undo removes the entry. */
const recordM = defineMachine('record', {
  doc: 'A history entry for one Pokémon change',
  states: ['added', 'edited', 'deletedPending', 'deleted'],
  on: { added: {}, edited: {}, deletedPending: { UNDO: '*', TOAST_VANISH: 'deleted' }, deleted: { RESTORE: '*' } }
});
const historyState = e => e.type === 'deleted' ? (e.revealed ? 'deleted' : 'deletedPending') : e.type;
/* A card on screen is present, or leaving while its exit animation plays. */
const cardState = el => el.classList.contains('is-deleting') ? 'deleting' : 'present';

/* 5. Toast. One toast at a time; a new message replaces the old one. */
const toastM = defineMachine('toast', {
  doc: 'The bottom message bar',
  states: ['hidden', 'shown', 'shownWithAction'],
  on: { hidden: { SHOW: '*' }, shown: { SHOW: '*', TIMEOUT: 'hidden', HIDE: 'hidden' }, shownWithAction: { SHOW: '*', ACTION: 'hidden', TIMEOUT: 'hidden', HIDE: 'hidden' } }
});
function toastState(){
  const t = document.getElementById('toast');
  if(!t || !t.classList.contains('show')) return 'hidden';
  const a = document.getElementById('toastAction');
  return a && a.style.display !== 'none' ? 'shownWithAction' : 'shown';
}

/* 6. Autosave to localStorage. dirty: a write is queued. saved/error: the result of the last write. */
const autosaveM = defineMachine('autosave', {
  doc: 'Whether the roster is written to browser storage',
  states: ['clean', 'dirty', 'saved', 'error'],
  on: { clean: { CHANGE: 'dirty' }, dirty: { CHANGE: 'dirty', WRITE_OK: 'saved', WRITE_FAILED: 'error' }, saved: { CHANGE: 'dirty' }, error: { CHANGE: 'dirty' } }
});
const autosaveState = () => autosaveTimer ? 'dirty' : autosaveResult;

/* 7. Last-opened file chip (File System Access API). */
const fileM = defineMachine('file', {
  doc: 'Whether a previously opened file can be reloaded',
  states: ['unsupported', 'none', 'available'],
  on: { unsupported: {}, none: { FILE_SAVED: 'available' }, available: { FILE_SAVED: 'available', REOPEN_FAILED: 'none' } }
});
function fileState(){
  if(!FS_SUPPORTED) return 'unsupported';
  const chip = document.getElementById('lastFileChip');
  return chip && chip.style.display !== 'none' && chip.style.display !== '' ? 'available' : 'none';
}

/* 8. Theme. Light and dark are built in; custom uses the Master Ball colors in either glass or neumorphic style. */
const themeM = defineMachine('theme', {
  doc: 'Which theme is applied right now',
  states: ['light', 'dark', 'custom'],
  on: { light: { TOGGLE: 'dark', CHOOSE: '*' }, dark: { TOGGLE: 'light', CHOOSE: '*' }, custom: { TOGGLE: 'light', CHOOSE: '*' } }
});
const themeState = () => document.documentElement.getAttribute('data-theme') || 'light';
const themeStyle = () => document.documentElement.getAttribute('data-style') || 'glass';

/* 9. Settings page. While it is open on Master Ball, edits preview live and are undone if it closes without saving. */
const settingsM = defineMachine('settings', {
  doc: 'The Settings page (#/settings) and its live preview',
  states: ['closed', 'open', 'previewing'],
  on: { closed: { OPEN: 'open' }, open: { PICK_CUSTOM: 'previewing', SAVE: 'closed', CANCEL: 'closed' }, previewing: { PICK_OTHER: 'open', SAVE: 'closed', CANCEL: 'closed' } }
});
const settingsState = () => !document.documentElement.classList.contains('route-settings') ? 'closed' : settingsThemeDraft === 'custom' ? 'previewing' : 'open';

/* 10. Share image job. One at a time, so a second tap cannot start a duplicate. */
const shareM = defineMachine('share', {
  doc: 'Generating a card or roster image',
  states: ['idle', 'working'],
  on: { idle: { START: 'working' }, working: { FINISH: 'idle', FAIL: 'idle' } }
});
/* Declared here, not in share.js, because share.js loads last and the state hooks may be read earlier. */
let shareLock = false;
const shareState = () => shareLock ? 'working' : 'idle';

/* 11. What the grid is showing. */
const gridM = defineMachine('grid', {
  doc: 'Roster grid view',
  states: ['emptyRoster', 'noResults', 'showing', 'showingPartial'],
  on: { emptyRoster: { ADD: 'showing' }, noResults: { FILTER: '*' }, showing: { FILTER: '*', DELETE: '*' }, showingPartial: { LOAD_MORE: '*', FILTER: '*' } }
});
function gridState(){
  if(!state.pokemon.length) return 'emptyRoster';
  if(!document.querySelector('#gridWrap .card[data-pid]')) return 'noResults';
  return document.getElementById('gridLoadMore') ? 'showingPartial' : 'showing';
}

/* 12. Pokérus status of one record (normalizePokemon keeps it to these three). */
const pokerusM = defineMachine('pokerus', {
  doc: 'Pokérus status on a Pokémon',
  states: ['none', 'infected', 'cured'],
  on: { none: { SET: '*' }, infected: { SET: '*' }, cured: { SET: '*' } }
});
const pokerusState = p => p.pokerus === 'infected' || p.pokerus === 'cured' ? p.pokerus : 'none';

/* 13. Footer easter egg. */
const easterEggM = defineMachine('easterEgg', {
  doc: 'Footer runner easter egg',
  states: ['locked', 'pikachu', 'suicune'],
  on: { locked: { UNLOCK: 'pikachu' }, pikachu: { CHOOSE: '*' }, suicune: { CHOOSE: '*' } }
});
const easterEggState = () => !(state.settings && state.settings.easterEggUnlocked) ? 'locked' : easterEggPreferSuicune() ? 'suicune' : 'pikachu';

/* 14. Drag reorder of cards. */
const dragM = defineMachine('drag', {
  doc: 'Reordering cards by dragging',
  states: ['idle', 'dragging'],
  on: { idle: { DRAG_START: 'dragging' }, dragging: { DROP: 'idle', DRAG_END: 'idle' } }
});
const dragState = () => document.querySelector('.card.dragging') ? 'dragging' : 'idle';

/* Mirrors a few states onto the DOM so tests can wait on them. */
function syncStateHooks(){
  const root = document.documentElement;
  root.dataset.autosave = autosaveState();
  root.dataset.share = shareState();
  const t = document.getElementById('toast');
  if(t) t.dataset.state = toastState();
  const grid = document.getElementById('gridWrap');
  if(grid) grid.dataset.state = gridState();
  const form = document.getElementById('formOverlay');
  if(form) form.dataset.state = formState();
}

window.Pokedex = {
  machines: MACHINES,
  snapshot(){
    const cards = Array.from(document.querySelectorAll('.card[data-pid]'));
    return {
      modal: { state: modalState(), stack: modalStack() },
      dropdown: { state: dropdownState(), open: openDropdowns() },
      form: { state: formState(), editingId: editingId || null },
      history: {
        added: changeHistory.filter(e => historyState(e) === 'added').length,
        edited: changeHistory.filter(e => historyState(e) === 'edited').length,
        deletedPending: changeHistory.filter(e => historyState(e) === 'deletedPending').length,
        deleted: changeHistory.filter(e => historyState(e) === 'deleted').length
      },
      cards: { total: state.pokemon.length, shown: cards.length, deleting: cards.filter(c => cardState(c) === 'deleting').length },
      toast: toastState(),
      autosave: autosaveState(),
      file: fileState(),
      theme: { state: themeState(), style: themeStyle() },
      settings: settingsState(),
      share: shareState(),
      grid: gridState(),
      pokerus: state.pokemon.reduce((n, p) => (n[pokerusState(p)]++, n), { none: 0, infected: 0, cured: 0 }),
      easterEgg: easterEggState(),
      drag: dragState()
    };
  }
};
