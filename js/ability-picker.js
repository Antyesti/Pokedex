/**
 * Ability Picker
 * --------------
 * Autocomplete for the Ability field in Moveset by Game, backed by data/abilities.js. Same
 * idea as the Species Picker: click in, type, pick a suggestion, or keep typing anything
 * not on the list, since nothing here is ever locked to only these options.
 *
 * Each Moveset by Game row has its own independent Ability field, so everything here is
 * keyed by that row's index (idx) rather than a single fixed element id.
 */

function abilityPickerMatches(query){
  const q = (query || '').trim().toLowerCase();
  return q ? ABILITY_LIST.filter(a => a.toLowerCase().includes(q)) : ABILITY_LIST;
}

// An empty query (the field was just clicked into) shows every ability, so browsing
// without typing works; a typed query caps the list, since the full list isn't useful
// once narrowed down.
function abilityPickerPanelHTML(query){
  const matches = abilityPickerMatches(query).slice(0, (query || '').trim() ? 60 : Infinity);
  return matches.length
    ? matches.map(a => `<div class="text-picker-row" data-value="${escapeAttr(a)}">${escapeHTML(a)}</div>`).join('')
    : `<div class="text-picker-empty">No matches. <b>${escapeHTML((query || '').trim())}</b> will be saved as typed.</div>`;
}

function renderAbilityPickerPanel(idx, query){
  const panel = document.getElementById('abilityPicker_panel_' + idx);
  if(!panel) return;
  panel.innerHTML = abilityPickerPanelHTML(query);
  panel.classList.add('open');
}

function closeAbilityPicker(idx){
  const panel = document.getElementById('abilityPicker_panel_' + idx);
  if(panel) panel.classList.remove('open');
}

function onAbilityInput(idx, val){
  renderAbilityPickerPanel(idx, val);
}

// Reads which suggestion a mousedown landed on (null if it landed on the empty-state text
// instead), applies it to the row's Ability field, and re-renders that field so the input
// shows the picked value. preventDefault() first so the field doesn't blur, and the panel
// close, before the click actually registers.
function onAbilityPickerClick(event, idx){
  event.preventDefault();
  const row = event.target.closest('.text-picker-row');
  if(!row) return;
  updateMoveField(idx, 'ability', row.dataset.value);
  refreshAbilityField(idx);
}
