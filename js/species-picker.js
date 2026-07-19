/**
 * Species Picker
 * --------------
 * Autocomplete built on top of data/pokemon-species.js. Kept as its own module (separate
 * from js/pokemon.js's existing form logic) since it's a standalone feature: the Species
 * field stays a normal free-text input, this just layers suggestions on top of it as you
 * type -- click in, type, a list of matches drops below the field, click one to fill it in.
 *
 * Nothing in here is hardcoded per-species -- every row, subtitle, and typing comes from
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
// shown when the Pokémon is actually linked to a database entry -- a freely-typed species
// with no match has no dex number to show.
function dexPrefixHTML(p){
  const entry = p.speciesEntryId ? findSpeciesEntry(p.speciesEntryId) : null;
  return entry ? `<span class="dex-number-prefix">${dexNumberFormatted(entry.dex)} · </span>` : '';
}

// Which typing to actually display: Mega Evolution shows its own independently-stored
// typing when one's been set; Gigantamax never changes typing (sprite only); anything else
// falls back to the Pokémon's default typing.
function displayTypes(p){
  if(p.preferredForm === 'mega' && Array.isArray(p.megaTypes) && p.megaTypes.length) return p.megaTypes;
  return p.types;
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

// Renders the dropdown's contents for the current search text. Nothing is shown for an
// empty query -- with a database meant to eventually cover the full National Dex, listing
// everything unfiltered isn't useful (or cheap to render).
function renderSpeciesPickerPanel(filterText){
  const panel = document.getElementById('speciesPicker_panel');
  if(!panel) return;
  const q = (filterText || '').trim().toLowerCase();
  if(!q){
    panel.innerHTML = '';
    panel.classList.remove('open');
    return;
  }
  const matches = POKEMON_SPECIES.filter(e => e.species.toLowerCase().includes(q)).slice(0, 50);
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
  if(selectedSpeciesEntryId){
    const entry = findSpeciesEntry(selectedSpeciesEntryId);
    if(!entry || entry.species.toLowerCase() !== trimmed.toLowerCase()) selectedSpeciesEntryId = '';
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
  // preset game fills its tag field -- still just a starting point, freely editable after.
  selectedTypes = [...entry.types];
  document.querySelectorAll('#typeSwatches .type-badge').forEach(s => {
    s.classList.toggle('active', selectedTypes.includes(s.dataset.type));
  });

  // Covers the "Mega Evolution already checked, then species picked" order -- the other
  // order (species first, then check Mega) is handled in onFormToggleChange.
  const megaCheckbox = document.getElementById('f_isMega');
  if(megaCheckbox && megaCheckbox.checked) tryAutoFillMegaTypes();
  renderMegaFormOptions();

  const panel = document.getElementById('speciesPicker_panel');
  if(panel){ panel.innerHTML = ''; panel.classList.remove('open'); }
}

function closeSpeciesPicker(){
  const panel = document.getElementById('speciesPicker_panel');
  if(panel) panel.classList.remove('open');
}
