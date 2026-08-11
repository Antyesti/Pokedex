/* ============== FORM MODAL (Add/Edit) ============== */
let formMovesDraft = [];

function openForm(id){
  editingId = id || null;
  let p;
  if(id){
    p = state.pokemon.find(x=>x.id===id);
    formMovesDraft = p.games.map(g => ({...g, moves:[...g.moves], gameKey: g.gameKey || detectGameKeyFromTag(g.tag), useMegaAbility: !!g.useMegaAbility}));
  } else {
    p = { nickname:'', species:'', speciesEntryId:'', types:[], megaTypes:[], megaForm:'', nature:'', gender:'', shiny:false, metLocation:'', metDate:'', ball:'', originGame:'', lastGame:'', notes:'', sprite:'', isMega:false, isGigantamax:false, spriteMega:'', spriteGigantamax:'', isTera:false, teraType:'', preferredForm:'default', achievementKeys:[], contestMemorySubKeys:[], battleMemorySubKeys:[], customMemorySubKeys:{}, customAchievements:[], partnerTrainerName:'', customTitleFields:{}, activeTitleKey:'' };
    formMovesDraft = [];
  }

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'formOverlay';
  if(id) overlay.dataset.pokemonId = id;
  overlay.onclick = (e) => { if(e.target === overlay) closeForm(); };
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeForm()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div style="font-family:var(--sans); font-weight:800; font-size:22px; letter-spacing:-0.02em;">${id ? 'Edit Pokémon' : 'Add Pokémon'}</div>
      </div>
      <div class="modal-body" id="formBody"></div>
      <div class="modal-foot">
        <button class="btn ghost" onclick="closeForm()">Cancel</button>
        <button class="btn primary" id="btnSaveForm">Save Pokémon</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('formBody').innerHTML = formBodyHTML(p);
  document.getElementById('btnSaveForm').onclick = () => saveForm(id);
  renderMovesEditor();
  setupSpriteUpload('default');
  setupSpriteUpload('mega');
  setupSpriteUpload('gigantamax');
  renderMegaFormOptions();
  // the date panel is position:fixed so it can escape this container's overflow clipping;
  // close it on scroll rather than letting it float disconnected from its trigger button
  document.getElementById('formBody').addEventListener('scroll', closeAllDatePanels);
}

function closeAllDatePanels(){
  document.querySelectorAll('.date-panel.open').forEach(p => {
    p.classList.remove('open');
    // sync the trigger's open state
    const fieldId = p.dataset.dateFieldId || p.id.replace('_panel','');
    const trigger = document.getElementById(fieldId+'_trigger');
    if(trigger) trigger.classList.remove('open');
  });
}
window.addEventListener('resize', closeAllDatePanels);

const SPRITE_SLOT_FIELD = { default: 'f_sprite', mega: 'f_spriteMega', gigantamax: 'f_spriteGigantamax' };
const SPRITE_SLOT_TOGGLE_FIELD = { mega: 'f_isMega', gigantamax: 'f_isGigantamax' };

function spriteSlotHTML(slot, label, value, enabled){
  const fieldId = SPRITE_SLOT_FIELD[slot];
  return `
    <div class="sprite-slot ${enabled ? '' : 'disabled'}" id="spriteSlot_${slot}">
      <div class="sprite-slot-label">${escapeHTML(label)}</div>
      <div class="sprite-preview" id="spritePreview_${slot}">${value ? `<img src="${escapeAttr(value)}">` : '<span>No image</span>'}</div>
      <div class="sprite-upload-controls">
        <label class="btn ghost sprite-upload-btn" for="f_sprite_file_${slot}" ${enabled ? '' : 'aria-disabled="true" onclick="return false;"'}>Choose Image</label>
        <input type="file" id="f_sprite_file_${slot}" accept="image/*" style="display:none" ${enabled ? '' : 'disabled'}>
        ${value ? `<button type="button" class="btn ghost" id="spriteClearBtn_${slot}" style="color:#F4A6BA;">Remove</button>` : ''}
      </div>
      <input type="hidden" id="${fieldId}" value="${escapeAttr(value||'')}">
    </div>
  `;
}

// Swaps the Mega toggle's label/icon (and the mega typing field's label, and the mega
// sprite slot's label) to match whichever species is currently selected. Primal
// Reversion for Groudon/Kyogre, Ultra Burst for Necrozma's fused forms, and plain Mega
// Evolution for everyone else. Called whenever the selected species changes while the form is
// open, since the toggle itself doesn't move, just what it's called and shows.
function refreshMegaFormLabel(){
  const display = getMegaFormDisplay(selectedSpeciesEntryId);
  const toggleLabel = document.getElementById('megaToggleLabel');
  if(toggleLabel) toggleLabel.innerHTML = `<img src="${display.icon}" alt="" style="width:16px;height:16px;">${escapeHTML(display.term)}`;
  const typingFieldLabel = document.getElementById('megaTypingFieldLabel');
  if(typingFieldLabel) typingFieldLabel.textContent = `${display.term} Type(s)`;
  const spriteSlotLabel = document.querySelector('#spriteSlot_mega .sprite-slot-label');
  if(spriteSlotLabel) spriteSlotLabel.textContent = display.term;
}

// Enabling/disabling Mega or Gigantamax flips the corresponding sprite slot's interactive
// state in place, without re-rendering the whole form (which would lose focus/scroll position).
function onFormToggleChange(slot, enabled){
  const slotEl = document.getElementById(`spriteSlot_${slot}`);
  if(!slotEl) return;
  slotEl.classList.toggle('disabled', !enabled);
  const label = slotEl.querySelector('.sprite-slot-label');
  const labelText = slot === 'mega' ? getMegaFormDisplay(selectedSpeciesEntryId).term : 'Gigantamax';
  label.textContent = labelText;
  const fileInput = document.getElementById(`f_sprite_file_${slot}`);
  const chooseLabel = slotEl.querySelector('.sprite-upload-btn');
  if(fileInput) fileInput.disabled = !enabled;
  if(chooseLabel){
    if(enabled){ chooseLabel.removeAttribute('aria-disabled'); chooseLabel.onclick = null; }
    else { chooseLabel.setAttribute('aria-disabled','true'); chooseLabel.onclick = () => false; }
  }
  // Mega Typing only makes sense once Mega Evolution is actually enabled.
  if(slot === 'mega'){
    const typingField = document.getElementById('megaTypingField');
    if(typingField) typingField.style.display = enabled ? '' : 'none';
    if(enabled) tryAutoFillMegaTypes();
    renderMegaFormOptions();
  }
}

function setupSpriteUpload(slot){
  const fileInput = document.getElementById(`f_sprite_file_${slot}`);
  if(!fileInput) return;
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/')){
      showToast('Please choose an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      document.getElementById(SPRITE_SLOT_FIELD[slot]).value = dataUrl;
      document.getElementById(`spritePreview_${slot}`).innerHTML = `<img src="${dataUrl}">`;
      // add a Remove button if not already present
      if(!document.getElementById(`spriteClearBtn_${slot}`)){
        const controls = document.querySelector(`#spriteSlot_${slot} .sprite-upload-controls`);
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'btn ghost';
        removeBtn.id = `spriteClearBtn_${slot}`;
        removeBtn.style.color = '#F4A6BA';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => clearSpritePreview(slot);
        controls.appendChild(removeBtn);
      }
    };
    reader.readAsDataURL(file);
  };
  const clearBtn = document.getElementById(`spriteClearBtn_${slot}`);
  if(clearBtn) clearBtn.onclick = () => clearSpritePreview(slot);
}

function clearSpritePreview(slot){
  document.getElementById(SPRITE_SLOT_FIELD[slot]).value = '';
  document.getElementById(`spritePreview_${slot}`).innerHTML = '<span>No image</span>';
  const fileInput = document.getElementById(`f_sprite_file_${slot}`);
  if(fileInput) fileInput.value = '';
  const clearBtn = document.getElementById(`spriteClearBtn_${slot}`);
  if(clearBtn) clearBtn.remove();
}

function formBodyHTML(p){
  return `
    <div class="section-label">Identity</div>
    <div class="form-grid">
      <div class="identity-row">
        <div class="field">
          <label>Species</label>
          <div class="species-field" id="speciesField_wrap">
            <input id="f_species" value="${escapeAttr(p.species)}" placeholder="e.g. Pikachu" autocomplete="off" data-no-autofocus oninput="onSpeciesInput(this.value)" onfocus="onSpeciesInput(this.value)">
            <div class="species-picker-panel" id="speciesPicker_panel"></div>
          </div>
        </div>
        <div class="field"><label>Nickname</label><input id="f_nickname" value="${escapeAttr(p.nickname)}" placeholder="e.g. Sparky"></div>
      </div>
      <div class="field span-2">
        <label>Type(s), click to toggle, up to 2</label>
        <div class="type-select-row" id="typeSwatches">
          ${TYPES.map(t=>`<button type="button" class="type-badge type-select ${p.types && p.types.includes(t)?'active':''}" data-type="${t}" style="background:${TYPE_HEX[t]}" onclick="toggleType('${t}')">${t}</button>`).join('')}
        </div>
      </div>
      <div class="field"><label>Nature</label>${natureSelectHTML('f_nature', p.nature)}</div>
      <div class="field"><label>Gender</label>
        <div class="gender-toggle-group" id="genderToggleGroup">
          <button type="button" class="gender-toggle-btn male ${p.gender==='Male'?'active':''}" data-gender="Male" onclick="toggleGender('Male')" title="Male">♂</button>
          <button type="button" class="gender-toggle-btn female ${p.gender==='Female'?'active':''}" data-gender="Female" onclick="toggleGender('Female')" title="Female">♀</button>
          <button type="button" class="gender-toggle-btn genderless ${p.gender==='Genderless'?'active':''}" data-gender="Genderless" onclick="toggleGender('Genderless')" title="Genderless">○</button>
        </div>
      </div>
      <div class="field">
        <label>Shiny</label>
        <div class="shiny-field">
          <label class="switch">
            <input type="checkbox" id="f_shiny" ${p.shiny ? 'checked' : ''}>
            <span class="track"></span>
            <span class="thumb"></span>
          </label>
          <label for="f_shiny" style="font-size:13px; color:var(--text-dim); display:inline-flex; align-items:center; gap:5px; cursor:pointer; text-transform:uppercase; letter-spacing:0.04em;"><img src="${SHINY_ICON}" alt="" style="width:14px;height:14px;">SHINY</label>
        </div>
      </div>
      <div class="field">
        <label>Pokérus</label>
        <div class="pokerus-toggle-group" id="pokerusToggleGroup" role="group" aria-label="Pokérus status">
          <button type="button" class="pokerus-toggle-btn infected ${p.pokerus==='infected'?'active':''}" data-pokerus="infected" onclick="togglePokerus('infected')" title="Infected"><img src="${POKERUS_INFECTED_ICON}" alt="">Infected</button>
          <button type="button" class="pokerus-toggle-btn none-status ${(!p.pokerus || p.pokerus==='none')?'active':''}" data-pokerus="none" onclick="togglePokerus('none')" title="No Interaction">None</button>
          <button type="button" class="pokerus-toggle-btn cured ${p.pokerus==='cured'?'active':''}" data-pokerus="cured" onclick="togglePokerus('cured')" title="Cured"><img src="${POKERUS_CURED_ICON}" alt="">Cured</button>
        </div>
      </div>
      <div class="field span-2">
        <label>Forms</label>
        <div class="shiny-field" style="flex-wrap:wrap; gap:14px;">
          <span class="shiny-field" style="gap:10px;">
            <label class="switch">
              <input type="checkbox" id="f_isMega" ${p.isMega ? 'checked' : ''} onchange="onFormToggleChange('mega', this.checked)">
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
            <label for="f_isMega" id="megaToggleLabel" style="font-size:13px; color:var(--text-dim); cursor:pointer; display:inline-flex; align-items:center; gap:6px;"><img src="${getMegaFormDisplay(p.speciesEntryId).icon}" alt="" style="width:16px;height:16px;">${escapeHTML(getMegaFormDisplay(p.speciesEntryId).term)}</label>
          </span>
          <span class="shiny-field" style="gap:10px;">
            <label class="switch">
              <input type="checkbox" id="f_isGigantamax" ${p.isGigantamax ? 'checked' : ''} onchange="onFormToggleChange('gigantamax', this.checked)">
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
            <label for="f_isGigantamax" id="gigantamaxToggleLabel" style="font-size:13px; color:var(--text-dim); cursor:pointer; display:inline-flex; align-items:center; gap:6px;"><img src="${getGigantamaxFormDisplay(p.speciesEntryId).icon}" alt="" style="width:16px;height:16px;">${escapeHTML(getGigantamaxFormDisplay(p.speciesEntryId).term)}</label>
          </span>
          <span class="shiny-field" style="gap:10px;">
            <label class="switch">
              <input type="checkbox" id="f_isTera" ${p.isTera ? 'checked' : ''} onchange="onTeraToggleChange(this.checked)">
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
            <label for="f_isTera" style="font-size:13px; color:var(--text-dim); cursor:pointer; display:inline-flex; align-items:center; gap:6px;"><img src="${TERASTALLIZATION_ICON}" alt="" style="width:16px;height:16px;">Terastallization</label>
          </span>
        </div>
      </div>
      <div class="field span-2" id="megaFormField" style="display:none;">
        <label>Mega Form</label>
        <div class="btn-toggle-row" id="megaFormButtons"></div>
      </div>
      <div class="field span-2" id="megaTypingField" style="${p.isMega ? '' : 'display:none;'}">
        <label><span id="megaTypingFieldLabel">${escapeHTML(getMegaFormDisplay(p.speciesEntryId).term)} Type(s)</span> <span style="color:var(--text-faint); font-weight:400;">(independent of the default typing above)</span></label>
        <div class="type-select-row" id="megaTypeSwatches">
          ${TYPES.map(t=>`<button type="button" class="type-badge type-select ${p.megaTypes && p.megaTypes.includes(t)?'active':''}" data-type="${t}" style="background:${TYPE_HEX[t]}" onclick="toggleMegaType('${t}')">${t}</button>`).join('')}
        </div>
      </div>
      <div class="field span-2" id="teraTypeField" style="${p.isTera ? '' : 'display:none;'}">
        <label>Tera Type <span style="color:var(--text-faint); font-weight:400;">(added as a third type alongside the default typing above)</span></label>
        <div class="type-select-row" id="teraTypeSwatches">${teraTypeFieldInnerHTML(p.speciesEntryId, p.teraType)}</div>
      </div>
      <div class="field span-2">
        <label style="display:flex; align-items:center; gap:6px;">Sprite Images
          <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span class="info-tooltip">Default is required; Mega/Gigantamax are optional and only apply when that form is enabled above. Terastallization reuses the Default sprite.</span>
          </span>
        </label>
        <div class="sprite-slots-grid" id="spriteSlotsGrid">
          ${spriteSlotHTML('default', 'Default', p.sprite, true)}
          ${spriteSlotHTML('mega', getMegaFormDisplay(p.speciesEntryId).term, p.spriteMega, p.isMega)}
          ${spriteSlotHTML('gigantamax', getGigantamaxFormDisplay(p.speciesEntryId).term, p.spriteGigantamax, p.isGigantamax)}
        </div>
      </div>
    </div>

    <div class="section-label">Memories</div>
    <div class="form-grid">
      <div class="field span-2">
        <label>Met Location</label>
        <div class="rich-toolbar" id="metLocToolbar">
          <button type="button" class="rich-btn" onclick="richCmd('metLocEdit','superscript')" title="Superscript"><sup>x²</sup></button>
        </div>
        <div class="rich-input" id="metLocEdit" contenteditable="true" data-placeholder="e.g. Pallet Town">${p.metLocation||''}</div>
      </div>
      <div class="field"><label>Housed Poké Ball</label>${ballSelectHTML('f_ball', p.ball)}</div>
      <div class="field"><label>Met Date</label>${dateFieldHTML('f_metDate', p.metDate||'')}</div>
      <div class="field">
        <label>Origin Game</label>
        <div class="game-tag-field">
          ${gamePresetSelectHTML('originGame', detectGameKeyFromTag(p.originGame))}
          <input id="f_originGame" value="${escapeAttr(p.originGame)}" placeholder="e.g. Pokémon Yellow" oninput="updateGameFieldIcon('originGame', this.value)">
        </div>
      </div>
      <div class="field">
        <label>Last Game</label>
        <div class="game-tag-field">
          ${gamePresetSelectHTML('lastGame', detectGameKeyFromTag(p.lastGame))}
          <input id="f_lastGame" value="${escapeAttr(p.lastGame)}" placeholder="e.g. Pokémon Legends: Z-A" oninput="updateGameFieldIcon('lastGame', this.value)">
        </div>
      </div>
      <div class="field span-2">
        <label>Trainer Notes</label>
        <div class="rich-toolbar" id="notesToolbar">
          <button type="button" class="rich-btn" onclick="richCmd('notesEdit','bold')" title="Bold"><b>B</b></button>
          <button type="button" class="rich-btn" onclick="richCmd('notesEdit','italic')" title="Italic"><i>I</i></button>
          <button type="button" class="rich-btn" onclick="richCmd('notesEdit','underline')" title="Underline"><u>U</u></button>
          <button type="button" class="rich-btn" onclick="richCmd('notesEdit','strikeThrough')" title="Strikethrough"><s>S</s></button>
          <button type="button" class="rich-btn" onclick="richCmd('notesEdit','superscript')" title="Superscript"><sup>x²</sup></button>
          <button type="button" class="rich-btn" onclick="richCmd('notesEdit','subscript')" title="Subscript"><sub>x₂</sub></button>
        </div>
        <div class="rich-input notes-input" id="notesEdit" contenteditable="true" data-placeholder="e.g. First partner Pokémon">${p.notes||''}</div>
      </div>
    </div>

    <div class="section-label">Achievements</div>
    ${p.id ? achievementsSectionHTML(p, false) : `<div class="hint">Save this Pok\u00e9mon first, then reopen Edit to track Ribbons, Marks, and other achievements.</div>`}

    <div class="section-label">Moveset by Game</div>
    <div class="moves-editor" id="movesEditor"></div>
    <button class="btn ghost" style="margin-top:10px;" onclick="addMoveRow()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add Game Row
    </button>
  `;
}

let selectedTypes = [];
function toggleType(t){
  if(selectedTypes.includes(t)){
    selectedTypes = selectedTypes.filter(x=>x!==t);
  } else {
    if(selectedTypes.length >= 2) selectedTypes.shift();
    selectedTypes.push(t);
  }
  document.querySelectorAll('#typeSwatches .type-badge').forEach(s=>{
    s.classList.toggle('active', selectedTypes.includes(s.dataset.type));
  });
  if(selectedTypes.length > 0) document.getElementById('typeSwatches').classList.remove('field-error');
}

// Mega Evolution's typing, edited independently of the default typing above. Selecting a
// species/form from the picker never touches this, and vice versa.
let selectedMegaTypes = [];
// Which Mega form this is, for species with more than one (Charizard X/Y, Mewtwo X/Y, ...).
// Empty string for species with only one Mega, or when typing was set by hand rather than
// picked via the Mega Form toggle. See renderMegaFormOptions/selectMegaForm below.
let selectedMegaForm = '';
function toggleMegaType(t){
  if(selectedMegaTypes.includes(t)){
    selectedMegaTypes = selectedMegaTypes.filter(x=>x!==t);
  } else {
    if(selectedMegaTypes.length >= 2) selectedMegaTypes.shift();
    selectedMegaTypes.push(t);
  }
  // Hand-editing the types means they may no longer match any known Mega Form variant.
  selectedMegaForm = '';
  document.querySelectorAll('#megaTypeSwatches .type-badge').forEach(s=>{
    s.classList.toggle('active', selectedMegaTypes.includes(s.dataset.type));
  });
  renderMegaFormOptions();
}

// Auto-fills Mega Evolution Type(s) (and Mega Form, if applicable) from the MEGA_TYPES
// reference table the moment Mega Evolution gets enabled (or the species changes while
// it's already enabled), but only when nothing's been picked yet, so it never overwrites a
// typing the user already set by hand. A couple of species have more than one Mega form
// with different typing (Charizard X/Y, Mewtwo X/Y, etc.); the first listed variant is
// used as the starting guess and can be changed via the Mega Form toggle.
function tryAutoFillMegaTypes(){
  if(selectedMegaTypes.length > 0) return;
  const variants = MEGA_TYPES[selectedSpeciesEntryId];
  if(!variants || !variants.length) return;
  selectedMegaForm = variants[0].label;
  selectedMegaTypes = [...variants[0].types];
  document.querySelectorAll('#megaTypeSwatches .type-badge').forEach(s=>{
    s.classList.toggle('active', selectedMegaTypes.includes(s.dataset.type));
  });
  renderMegaFormOptions();
}

// Shows the Mega Form toggle only for species with more than one known Mega (Charizard,
// Mewtwo, Absol, Garchomp). Everyone else's Mega has nothing to disambiguate, so no
// field is shown and megaForm just stays empty.
function renderMegaFormOptions(){
  refreshAllAbilityFields();
  const field = document.getElementById('megaFormField');
  const buttons = document.getElementById('megaFormButtons');
  if(!field || !buttons) return;
  const megaCheckbox = document.getElementById('f_isMega');
  const variants = MEGA_TYPES[selectedSpeciesEntryId];
  if(!megaCheckbox || !megaCheckbox.checked || !variants || variants.length < 2){
    field.style.display = 'none';
    buttons.innerHTML = '';
    return;
  }
  field.style.display = '';
  buttons.innerHTML = variants.map(v => {
    const active = selectedMegaForm === v.label;
    return `<button type="button" class="btn ${active ? 'primary' : 'ghost'}" style="flex:1;" onclick="selectMegaForm('${v.label}')">${escapeHTML(v.label || 'Standard')}</button>`;
  }).join('');
}

function selectMegaForm(label){
  selectedMegaForm = label;
  const variant = (MEGA_TYPES[selectedSpeciesEntryId] || []).find(v => v.label === label);
  if(variant){
    selectedMegaTypes = [...variant.types];
    document.querySelectorAll('#megaTypeSwatches .type-badge').forEach(s=>{
      s.classList.toggle('active', selectedMegaTypes.includes(s.dataset.type));
    });
  }
  renderMegaFormOptions();
}

// Tera Type, single-select like Gender rather than the up-to-2 toggle used for base/Mega
// typing, since a Pokémon only Terastallizes to one type at a time. Species with a fixed Tera
// type (see FIXED_TERA_TYPES) override whatever's selected here; see renderTeraTypeField.
let selectedTeraType = '';
function selectTeraType(t){
  if(getFixedTeraType(selectedSpeciesEntryId)) return; // locked, not user-editable
  selectedTeraType = (selectedTeraType === t) ? '' : t;
  renderTeraTypeField();
  if(selectedTeraType) document.getElementById('teraTypeSwatches').classList.remove('field-error');
}

// Rebuilds the Tera Type swatches/locked-badge to match the currently selected species,
// and re-applies the fixed type (if any) to selectedTeraType. Called on toggle change and
// whenever the species selection changes while the form is open.
function renderTeraTypeField(){
  const fixedType = getFixedTeraType(selectedSpeciesEntryId);
  if(fixedType) selectedTeraType = fixedType;
  const container = document.getElementById('teraTypeSwatches');
  if(container) container.innerHTML = teraTypeFieldInnerHTML(selectedSpeciesEntryId, selectedTeraType);
}

function onTeraToggleChange(enabled){
  const field = document.getElementById('teraTypeField');
  if(field) field.style.display = enabled ? '' : 'none';
  if(enabled) renderTeraTypeField();
  else document.getElementById('teraTypeSwatches').classList.remove('field-error');
}

let selectedGender = '';
function toggleGender(g){
  selectedGender = (selectedGender === g) ? '' : g;
  document.querySelectorAll('#genderToggleGroup .gender-toggle-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.gender === selectedGender);
  });
}

let selectedPokerus = 'none';
function togglePokerus(status){
  selectedPokerus = status;
  document.querySelectorAll('#pokerusToggleGroup .pokerus-toggle-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.pokerus === selectedPokerus);
  });
}

function renderMovesEditor(){
  const wrap = document.getElementById('movesEditor');
  if(formMovesDraft.length === 0){
    wrap.innerHTML = '<div class="hint">No game rows yet, click "Add Game Row" to log a playthrough.</div>';
    return;
  }
  wrap.innerHTML = formMovesDraft.map(function(g, idx){
    var moveSlots = [0,1,2,3].map(function(slot){
      return '<input placeholder="Move ' + (slot+1) + '" value="' + escapeAttr(g.moves[slot]||'') + '" oninput="updateMoveSlot(' + idx + ',' + slot + ',this.value)">';
    }).join('');
    var abilityField = abilityFieldHTML(idx, g);
    return '<div class="move-row">' +
      '<div class="game-tag-field">' +
        gamePresetSelectHTML(String(idx), g.gameKey || '') +
        '<input placeholder="Tag (e.g. Pokémon Platinum)" value="' + escapeAttr(g.tag) + '" oninput="updateMoveField(' + idx + ',\'tag\',this.value)">' +
      '</div>' +
      '<div class="field" id="abilityFieldWrap-' + idx + '">' +
        abilityField +
      '</div>' +
      moveSlots +
      '<div class="remove-row-btn" onclick="removeMoveRow(' + idx + ')">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</div>' +
    '</div>';
  }).join('');
}
// Mega Ability (see data/mega-types.js) only applies to a Moveset by Game row when the
// Pokémon is currently Mega and that row's game is flagged supportsMega in GAME_PRESETS
// (Control Panel > Games), since not every game a Pokémon has appeared in supports Mega
// Evolution. Returns '' when nothing overrides that row's typed-in Ability.
// Renders the whole Ability area for a game row: nothing at all for games flagged
// noAbilities in GAME_PRESETS (Control Panel > Games), otherwise the normal input plus,
// when eligible, a dimmed Mega icon the user can click to apply the Mega Ability to that
// specific row, since some Megas were introduced after a given game released, so this isn't
// automatic just because the game generally supports Mega Evolution.
function abilityFieldHTML(idx, g){
  const preset = GAME_PRESET_INDEX[g.gameKey];
  if(preset && preset.noAbilities){
    return '';
  }
  const eligibleAbility = getEligibleMegaAbility(g.gameKey);
  const applied = !!g.useMegaAbility && eligibleAbility;
  return '<input placeholder="Ability" value="' + escapeAttr(g.ability) + '" oninput="updateMoveField(' + idx + ',\'ability\',this.value)">' +
    megaAbilityToggleRowHTML(idx, eligibleAbility, applied);
}
// Whether a Mega Ability even exists to offer for this row: Mega enabled, the row's
// game generally supports Mega Evolution, and the current species/Mega Form has one set.
// Doesn't decide whether it's actually applied; see g.useMegaAbility for that.
function getEligibleMegaAbility(gameKey){
  const megaCheckbox = document.getElementById('f_isMega');
  if(!megaCheckbox || !megaCheckbox.checked) return '';
  const preset = GAME_PRESET_INDEX[gameKey];
  if(!preset || !preset.supportsMega) return '';
  const variant = getMegaVariant(selectedSpeciesEntryId, selectedMegaForm);
  return (variant && variant.ability) || '';
}
function megaAbilityToggleRowHTML(idx, eligibleAbility, applied){
  if(!eligibleAbility) return '';
  const icon = getMegaFormDisplay(selectedSpeciesEntryId).icon;
  const title = applied ? 'Click to hide the Mega Ability for this game' : 'Click to show the Mega Ability for this game';
  return '<div class="mega-ability-toggle-row' + (applied ? ' active' : '') + '" id="moveMegaToggle-' + idx + '" title="' + escapeAttr(title) + '" onclick="toggleRowMegaAbility(' + idx + ')">' +
    '<img src="' + icon + '" alt="">' +
    (applied ? '<span>' + escapeHTML(eligibleAbility) + '</span>' : '') +
    '</div>';
}
function toggleRowMegaAbility(idx){
  formMovesDraft[idx].useMegaAbility = !formMovesDraft[idx].useMegaAbility;
  refreshAbilityField(idx);
}
// Rebuilds one row's whole Ability area (input, Mega toggle button if eligible, note,
// or the noAbilities message) from scratch. A full innerHTML replacement rather than
// tweaking existing elements' state, since the Mega toggle button itself may need to be
// created or removed entirely. For example, it doesn't exist yet the first time Mega gets
// enabled with a game row already present, so there'd be nothing to tweak.
function refreshAbilityField(idx){
  const wrap = document.getElementById('abilityFieldWrap-' + idx);
  const g = formMovesDraft[idx];
  if(!wrap || !g) return;
  wrap.innerHTML = abilityFieldHTML(idx, g);
}
function refreshAllAbilityFields(){
  formMovesDraft.forEach(function(g, idx){ refreshAbilityField(idx); });
}
function updateMoveField(idx, field, val){
  formMovesDraft[idx][field] = val;
  if(field === 'tag'){
    // Auto-links a typed game name to its preset badge (case/punctuation-insensitive,
    // "Pokémon" prefix optional). Anything that doesn't match detaches the icon.
    const detectedKey = detectGameKeyFromTag(val);
    formMovesDraft[idx].gameKey = detectedKey;
    const wrap = document.getElementById('gamePreset_' + idx + '_wrap');
    const trigger = wrap ? wrap.querySelector('.game-preset-trigger') : null;
    if(trigger){
      const preset = detectedKey ? GAME_PRESET_INDEX[detectedKey] : null;
      trigger.innerHTML = preset
        ? `<img src="${preset.icon}" alt="${escapeAttr(preset.label)}">`
        : `<span class="game-preset-trigger-placeholder">🎮</span>`;
    }
    refreshAbilityField(idx);
  }
}
function updateMoveSlot(idx, slot, val){ formMovesDraft[idx].moves[slot] = val; }
function richCmd(elId, cmd){ document.getElementById(elId).focus(); document.execCommand(cmd, false, null); }
function addMoveRow(){
  formMovesDraft.push({ id: cryptoId(), tag:'', ability:'', moves:['','','',''], gameKey:'', useMegaAbility:false });
  renderMovesEditor();
}
function removeMoveRow(idx){
  formMovesDraft.splice(idx,1);
  renderMovesEditor();
}

/* ---- Preset game picker (icon dropdown) ----
   Used by the Moveset by Game rows (target = row index, e.g. "0", "1", ...)
   as well as the single Origin Game / Last Game fields (target = "originGame" / "lastGame"). */
function gamePresetSelectHTML(target, gameKey){
  const selected = GAME_PRESET_INDEX[gameKey];
  const grouped = {};
  GAME_PRESETS.forEach(g => { (grouped[g.gen] = grouped[g.gen] || []).push(g); });
  const panelHTML = Object.keys(grouped).sort((a,b)=>a-b).map(gen => `
    <div class="game-dropdown-gen-label">${escapeHTML(gamePresetGenLabel(gen))}</div>
    ${grouped[gen].map(g => `
      <div class="ball-option game-preset-option ${gameKey===g.key?'active':''}" onclick="selectGamePreset('${target}','${g.key}')">
        <img src="${g.icon}" alt="">
        <span>${escapeHTML(g.label)}</span>
      </div>
    `).join('')}
  `).join('');
  return `
    <div class="ball-dropdown game-preset-dropdown" id="gamePreset_${target}_wrap">
      <button type="button" class="game-preset-trigger" onclick="toggleGamePresetDropdown('${target}')" title="Pick a preset game">
        ${selected ? `<img src="${selected.icon}" alt="${escapeAttr(selected.label)}">` : `<span class="game-preset-trigger-placeholder">🎮</span>`}
      </button>
      <div class="ball-dropdown-panel game-preset-panel" id="gamePreset_${target}_panel">
        <div class="ball-option game-preset-option ${!gameKey?'active':''}" onclick="clearGamePreset('${target}')">
          <span class="game-preset-option-blank"></span><span>None / Custom</span>
        </div>
        ${panelHTML}
      </div>
    </div>
  `;
}
function toggleGamePresetDropdown(target){
  const panel = document.getElementById(`gamePreset_${target}_panel`);
  if(!panel) return;
  const isOpen = panel.classList.contains('open');
  document.querySelectorAll('.game-preset-panel.open').forEach(p => p.classList.remove('open'));
  if(!isOpen) panel.classList.add('open');
}
// Move-editor rows are addressed by a plain numeric index ("0", "1", ...);
// the Origin Game / Last Game fields use the fixed targets "originGame" / "lastGame".
function isMoveRowTarget(target){ return /^\d+$/.test(target); }
function selectGamePreset(target, key){
  const preset = GAME_PRESET_INDEX[key];
  if(!preset) return;
  if(isMoveRowTarget(target)){
    const idx = parseInt(target, 10);
    formMovesDraft[idx].gameKey = key;
    formMovesDraft[idx].tag = preset.label;
    renderMovesEditor();
  } else {
    const inputId = target === 'originGame' ? 'f_originGame' : 'f_lastGame';
    const input = document.getElementById(inputId);
    if(input) input.value = preset.label;
    refreshGamePresetWidget(target, key);
  }
}
function clearGamePreset(target){
  if(isMoveRowTarget(target)){
    const idx = parseInt(target, 10);
    formMovesDraft[idx].gameKey = '';
    renderMovesEditor();
  } else {
    refreshGamePresetWidget(target, '');
  }
}
// Re-renders a standalone game-preset dropdown (Origin/Last Game) in place, keeping
// its trigger icon and highlighted option in sync with the current selection.
function refreshGamePresetWidget(target, key){
  const wrap = document.getElementById(`gamePreset_${target}_wrap`);
  if(!wrap) return;
  wrap.outerHTML = gamePresetSelectHTML(target, key);
}
// Auto-links Origin Game / Last Game text to its preset icon while typing,
// mirroring the Moveset by Game tag field's behavior.
function updateGameFieldIcon(target, val){
  const detectedKey = detectGameKeyFromTag(val);
  refreshGamePresetWidget(target, detectedKey);
}

function closeForm(){
  // Clean up any body-appended date panels from this form
  closeAllDatePanels();
  document.querySelectorAll('.date-panel[data-date-field-id]').forEach(p => p.remove());
  const el = document.getElementById('formOverlay');
  if(el) el.remove();
  selectedTypes = [];
  selectedMegaTypes = [];
  selectedMegaForm = '';
  selectedTeraType = '';
  selectedGender = '';
  selectedPokerus = 'none';
  selectedSpeciesEntryId = '';
  formMovesDraft = [];
}

const _origOpenForm = openForm;
openForm = function(id){
  const existing = id ? state.pokemon.find(x=>x.id===id) : null;
  selectedTypes = existing ? [...existing.types] : [];
  selectedMegaTypes = existing ? [...(existing.megaTypes||[])] : [];
  selectedMegaForm = existing ? (existing.megaForm || '') : '';
  selectedTeraType = existing ? (existing.teraType || '') : '';
  selectedGender = existing ? (existing.gender || '') : '';
  selectedPokerus = existing ? (existing.pokerus || 'none') : 'none';
  selectedSpeciesEntryId = existing ? (existing.speciesEntryId || '') : '';
  _origOpenForm(id);
  // Covers "species already had Mega enabled with no typing saved, and MEGA_TYPES has
  // since gained an entry for it". The checkbox-change and species-pick triggers for
  // auto-fill don't fire just from opening the form, so without this an existing record
  // would keep showing a blank Mega Type(s) picker even after adding reference data for
  // its species. No-ops (via tryAutoFillMegaTypes's own guard) if typing is already set.
  tryAutoFillMegaTypes();
};

document.getElementById('btnNewDex').onclick = () => openNewDexModal();

function openNewDexModal(){
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'newDexOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeNewDexModal(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:420px;">
      <div class="modal-head">
        <div style="font-family:var(--sans); font-weight:800; font-size:19px;">Start a Fresh Pokédex</div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeNewDexModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        <div class="hint settings-unreleased-warning">⚠ This clears every Pokémon currently in your Pokédex. If you haven't exported this roster to a file yet, do that first, this can't be recovered once you close the tab.</div>
      </div>
      <div class="modal-foot">
        <button type="button" class="btn ghost" onclick="closeNewDexModal()">Cancel</button>
        <button type="button" class="btn danger" onclick="confirmNewDex()">Start Fresh</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeNewDexModal(){
  const el = document.getElementById('newDexOverlay');
  if(el) el.remove();
}

function confirmNewDex(){
  const previous = state;
  state = { pokemon: [], trainer: '', settings: previous.settings };
  pendingDeletions = [];
  historyBarVisible = false;
  updateHistoryBar();
  closeNewDexModal();
  applySettings();
  render();
  showToast('Started a fresh, empty Pokédex.', {
    label: 'Undo',
    onClick: () => {
      state = previous;
      applySettings();
      render();
    }
  });
}

/* ============== IMPORT / EXPORT ============== */
document.getElementById('btnExport').onclick = async () => {
  const json = JSON.stringify(state, null, 2);
  if(FS_SUPPORTED){
    try{
      const handle = await window.showSaveFilePicker({
        suggestedName: `pokedex-export-${new Date().toISOString().slice(0,10)}.json`,
        types: [{ description:'JSON', accept:{'application/json':['.json']} }]
      });
      const writable = await handle.createWritable();
      await writable.write(json);
      await writable.close();
      await saveHandle(handle);
      showToast('Dex exported and remembered for next time.');
      tryShowLastFileChip();
      return;
    } catch(err){
      if(err.name === 'AbortError') return; // File picker was closed
      // fall through to download fallback on any other error
    }
  }
  const blob = new Blob([json], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pokedex-export-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Dex exported as JSON.');
};

document.getElementById('btnImport').onclick = async () => {
  if(FS_SUPPORTED){
    try{
      const [handle] = await window.showOpenFilePicker({
        types: [{ description:'JSON', accept:{'application/json':['.json']} }],
        multiple:false
      });
      const file = await handle.getFile();
      await applyFileToState(file);
      await saveHandle(handle);
      tryShowLastFileChip();
      return;
    } catch(err){
      if(err.name === 'AbortError') return; // File picker was closed
      // fall through to legacy input on any other error
    }
  }
  document.getElementById('fileInput').click();
};

document.getElementById('fileInput').onchange = (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try{
      const data = normalizeImportedData(JSON.parse(ev.target.result));
      state = data;
      pendingDeletions = [];
      historyBarVisible = false;
      updateHistoryBar();
      applySettings();
      render();
      showToast(`Imported ${data.pokemon.length} Pokémon.`);
    } catch(err){
      showToast('Could not read that file, is it a valid Pokédex export?');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
};

document.getElementById('btnAdd').onclick = () => openForm(null);

tryShowLastFileChip();

