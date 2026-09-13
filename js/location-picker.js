/**
 * Location Picker
 * ---------------
 * Autocomplete for the Met Location field, backed by data/met-locations.js's two groups
 * (Locations, Generic). Same idea as the Species Picker: click in, type, pick a
 * suggestion, or keep typing anything not on the list, since nothing here is ever locked
 * to only these options.
 *
 * Met Location is a contenteditable "rich input" (it also supports a superscript toggle),
 * so this reads/writes plain text via textContent rather than treating it like a normal
 * <input>. Picking a suggestion replaces whatever superscript formatting was there before.
 */

function locationPickerMatches(query){
  const q = (query || '').trim().toLowerCase();
  return MET_LOCATION_GROUPS
    .map(g => ({ label: g.label, items: q ? g.items.filter(i => i.toLowerCase().includes(q)) : g.items }))
    .filter(g => g.items.length);
}

// An empty query (the field was just clicked into) shows every location grouped as-is, so
// browsing without typing works; a typed query caps the total shown across both groups,
// since the full list isn't useful once narrowed down.
function locationPickerPanelHTML(query){
  const groups = locationPickerMatches(query);
  const cap = (query || '').trim() ? 60 : Infinity;
  let shown = 0;
  const html = [];
  for(const g of groups){
    if(shown >= cap) break;
    const items = g.items.slice(0, cap - shown);
    shown += items.length;
    html.push(`<div class="text-picker-group-label">${escapeHTML(g.label)}</div>`);
    items.forEach(v => html.push(`<div class="text-picker-row" data-value="${escapeAttr(v)}">${escapeHTML(v)}</div>`));
  }
  return html.length
    ? html.join('')
    : `<div class="text-picker-empty">No matches. <b>${escapeHTML((query || '').trim())}</b> will be saved as typed.</div>`;
}

function renderLocationPickerPanel(query){
  const panel = document.getElementById('metLocationPicker_panel');
  if(!panel) return;
  panel.innerHTML = locationPickerPanelHTML(query);
  panel.classList.add('open');
}

function closeLocationPicker(){
  const panel = document.getElementById('metLocationPicker_panel');
  if(panel) panel.classList.remove('open');
}

function onMetLocationInput(el){
  renderLocationPickerPanel(el.textContent);
}

// preventDefault() first so the field doesn't blur, and the panel close, before the click
// actually registers.
function onMetLocationPickerClick(event){
  event.preventDefault();
  const row = event.target.closest('.text-picker-row');
  if(!row) return;
  const el = document.getElementById('metLocEdit');
  if(el) el.textContent = row.dataset.value;
  closeLocationPicker();
}
