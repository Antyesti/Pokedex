/**
 * Species Picker
 * --------------
 * Autocomplete built on top of data/pokemon-species.js. Kept as its own module (separate
 * from js/pokemon.js's existing form logic) since it's a standalone feature: the Species
 * field stays a normal free-text input, this just layers suggestions on top of it as you
 * type. Click in, type, and a list of matches drops below the field; click one to fill it in.
 *
 * Nothing in here is hardcoded per-species. Every row, subtitle, and typing comes from
 * POKEMON_SPECIES, so new entries (added later, eventually via the Control Panel) show up
 * automatically with no changes needed here.
 */

let selectedSpeciesEntryId = '';

/* ---------- Lookups ---------- */

function findSpeciesEntry(entryId){
  return POKEMON_SPECIES.find(e => e.id === entryId) || null;
}

function dexNumberFormatted(dex){
  return '#' + String(dex).padStart(4, '0');
}

// Builds the picker's subtitle from the two optional fields, per the display rules: both ->
// "Demonym · Form", either alone on its own, neither -> no subtitle. Purely a display string;
// it's never written back into species/demonym/form themselves.
function speciesSubtitle(entry){
  if(entry.demonym && entry.form) return `${entry.demonym} · ${entry.form}`;
  if(entry.demonym) return entry.demonym;
  if(entry.form) return entry.form;
  return '';
}

// The "#0052 · " prefix shown before the species name on cards and in Detail View. Only
// shown when the Pokémon is actually linked to a database entry. A freely-typed species
// with no match has no dex number to show.
function dexPrefixHTML(p){
  const entry = p.speciesEntryId ? findSpeciesEntry(p.speciesEntryId) : null;
  return entry ? `<span class="dex-number-prefix">${dexNumberFormatted(entry.dex)} · </span>` : '';
}

// Which typing to actually display: Mega Evolution shows its own independently-stored
// typing when one's been set; Gigantamax never changes typing (sprite only); anything else
// falls back to the Pokémon's default typing. `gameSupportsTera`, when explicitly passed
// (true/false), additionally gates the Tera type on a specific game supporting
// Terastallization -- used by the Moveset by Game move resolver in js/moves.js, since Tera
// itself is a Pokémon-wide toggle but doesn't apply to every game a Pokémon's been played
// in. Omitted (the card/Detail View's own type badges), it's unrestricted as before.
function displayTypes(p, gameSupportsTera){
  if(p.preferredForm === 'mega' && Array.isArray(p.megaTypes) && p.megaTypes.length) return p.megaTypes;
  const teraGateOk = gameSupportsTera === undefined ? true : gameSupportsTera;
  if(p.preferredForm !== 'mega' && p.preferredForm !== 'gigantamax' && p.isTera && p.teraType && teraGateOk) return [...p.types, p.teraType];
  return p.types;
}

// Renders the full type-badge row for a Pokémon, same priority order as displayTypes
// above, except the Tera-added type (when applicable) renders faded so it reads as
// "added on top" rather than innate, while its text stays fully legible. Card and Detail
// View both use this rather than mapping displayTypes(p) through typeBadgeHTML directly,
// since only this function knows which entry (if any) is the Tera addition.
function typeRowHTML(p){
  if(p.preferredForm === 'mega' && Array.isArray(p.megaTypes) && p.megaTypes.length){
    return p.megaTypes.map(t => typeBadgeHTML(t)).join('');
  }
  const badges = p.types.map(t => typeBadgeHTML(t));
  if(p.preferredForm !== 'mega' && p.preferredForm !== 'gigantamax' && p.isTera && p.teraType){
    badges.push(typeBadgeHTML(p.teraType, { faded: true }));
  }
  return badges.join('');
}

/* ---------- Autocomplete dropdown ---------- */

// Each row spans the full width of the field: dex number on the left, species name (plus
// an optional faded subtitle) in the center, current typing on the right, everything
// vertically centered against each other.
function speciesPickerRowHTML(entry){
  const subtitle = speciesSubtitle(entry);
  const active = selectedSpeciesEntryId === entry.id;
  return `
    <div class="species-picker-row ${active?'active':''}" onmousedown="event.preventDefault(); selectSpeciesEntry('${entry.id}')">
      <div class="species-picker-dex">${dexNumberFormatted(entry.dex)}</div>
      <div class="species-picker-name">
        <div class="species-picker-name-main">${escapeHTML(entry.species)}</div>
        ${subtitle ? `<div class="species-picker-subtitle">${escapeHTML(subtitle)}</div>` : ''}
      </div>
      <div class="species-picker-types">
        ${entry.types.map(t=>`<span class="type-badge" style="background:${TYPE_HEX[t]}">${t}</span>`).join('')}
      </div>
    </div>
  `;
}

// Renders the dropdown's contents for the current search text. An empty query (the field
// was just clicked into) shows every species, so browsing without typing works; a typed
// query filters down to matches, capped since the full list isn't useful once narrowed.
function renderSpeciesPickerPanel(filterText){
  const panel = document.getElementById('speciesPicker_panel');
  if(!panel) return;
  const q = (filterText || '').trim().toLowerCase();
  const matches = (q ? POKEMON_SPECIES.filter(e => e.species.toLowerCase().includes(q)) : POKEMON_SPECIES.slice())
    .sort((a, b) => a.dex - b.dex)
    .slice(0, q ? 50 : Infinity);
  panel.innerHTML = matches.length
    ? matches.map(speciesPickerRowHTML).join('')
    : `<div class="species-picker-empty">No matches in the database. <b>${escapeHTML(filterText.trim())}</b> will be saved as typed.</div>`;
  panel.classList.add('open');
}

// Fires on every keystroke (and on focus, re-showing matches for whatever's already typed).
// Keeps the remembered database link only while the typed text still matches it, so
// hand-editing the name away from a picked entry cleanly forgets it rather than leaving a
// stale dex number/typing behind.
function onSpeciesInput(val){
  const trimmed = val.trim();
  if(trimmed) document.getElementById('f_species').classList.remove('field-error');
  if(selectedSpeciesEntryId){
    const entry = findSpeciesEntry(selectedSpeciesEntryId);
    if(!entry || entry.species.toLowerCase() !== trimmed.toLowerCase()){
      selectedSpeciesEntryId = '';
      refreshMegaFormLabel();
      renderTeraTypeField();
    }
  }
  renderSpeciesPickerPanel(trimmed);
}

function selectSpeciesEntry(entryId){
  const entry = findSpeciesEntry(entryId);
  if(!entry) return;
  selectedSpeciesEntryId = entry.id;

  const input = document.getElementById('f_species');
  if(input) input.value = entry.species;

  // Fills the same Type swatches the Species field sits above, exactly like picking a
  // preset game fills its tag field: still just a starting point, freely editable after.
  selectedTypes = [...entry.types];
  document.querySelectorAll('#typeSwatches .type-badge').forEach(s => {
    s.classList.toggle('active', selectedTypes.includes(s.dataset.type));
  });

  // Covers the "Mega Evolution already checked, then species picked" order. The other
  // order (species first, then check Mega) is handled in onFormToggleChange.
  // Mega typing is species-specific, so anything carried over from the previous species
  // is stale here; clear it before re-running the auto-fill, otherwise its "don't
  // overwrite a value that's already set" guard would leave the old species' typing in place.
  selectedMegaTypes = [];
  selectedMegaForm = '';
  document.querySelectorAll('#megaTypeSwatches .type-badge').forEach(s => s.classList.remove('active'));
  const megaCheckbox = document.getElementById('f_isMega');
  if(megaCheckbox && megaCheckbox.checked) tryAutoFillMegaTypes();
  renderMegaFormOptions();
  refreshMegaFormLabel();
  renderTeraTypeField();

  const panel = document.getElementById('speciesPicker_panel');
  if(panel){ panel.innerHTML = ''; panel.classList.remove('open'); }
}

function closeSpeciesPicker(){
  const panel = document.getElementById('speciesPicker_panel');
  if(panel) panel.classList.remove('open');
}
