/* ============== FORM MODAL (Add/Edit) ============== */
let formMovesDraft = [];

function openForm(id){
  editingId = id || null;
  let p;
  if(id){
    p = state.pokemon.find(x=>x.id===id);
    formMovesDraft = p.games.map(g => ({...g, moves:[...g.moves], gameKey: g.gameKey || detectGameKeyFromTag(g.tag)}));
  } else {
    p = { nickname:'', species:'', types:[], nature:'', gender:'', shiny:false, metLocation:'', metDate:'', ball:'', originGame:'', lastGame:'', notes:'', sprite:'', isMega:false, isGigantamax:false, spriteMega:'', spriteGigantamax:'', preferredForm:'default', achievementKeys:[], contestMemorySubKeys:[], battleMemorySubKeys:[], customAchievements:[], partnerTrainerName:'', activeTitleKey:'' };
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
        <div class="modal-close" onclick="closeForm()">
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
      <div class="sprite-slot-label">${escapeHTML(label)}${slot!=='default' && !enabled ? `<span class="slot-disabled-tag">(enable above)</span>` : ''}</div>
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

// Enabling/disabling Mega or Gigantamax flips the corresponding sprite slot's interactive
// state in place, without re-rendering the whole form (which would lose focus/scroll position).
function onFormToggleChange(slot, enabled){
  const slotEl = document.getElementById(`spriteSlot_${slot}`);
  if(!slotEl) return;
  slotEl.classList.toggle('disabled', !enabled);
  const label = slotEl.querySelector('.sprite-slot-label');
  const labelText = slot === 'mega' ? 'Mega Evolution' : 'Gigantamax';
  label.innerHTML = `${escapeHTML(labelText)}${!enabled ? `<span class="slot-disabled-tag">(enable above)</span>` : ''}`;
  const fileInput = document.getElementById(`f_sprite_file_${slot}`);
  const chooseLabel = slotEl.querySelector('.sprite-upload-btn');
  if(fileInput) fileInput.disabled = !enabled;
  if(chooseLabel){
    if(enabled){ chooseLabel.removeAttribute('aria-disabled'); chooseLabel.onclick = null; }
    else { chooseLabel.setAttribute('aria-disabled','true'); chooseLabel.onclick = () => false; }
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
      <div class="field"><label>Nickname <span style="color:var(--text-faint); font-weight:400;">(optional)</span></label><input id="f_nickname" value="${escapeAttr(p.nickname)}" placeholder="e.g. Sparky"></div>
      <div class="field"><label>Species</label><input id="f_species" value="${escapeAttr(p.species)}" placeholder="e.g. Pikachu"></div>
      <div class="field span-2">
        <label>Type(s), click to toggle, up to 2</label>
        <div class="color-swatches" id="typeSwatches">
          ${TYPES.map(t=>`<div class="swatch ${p.types && p.types.includes(t)?'active':''}" data-type="${t}" style="background:${TYPE_HEX[t]}" title="${t}" onclick="toggleType('${t}')"></div>`).join('')}
        </div>
        <div class="hint" id="typeSelectedLabel">${(p.types||[]).join(' / ') || 'No type selected'}</div>
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
        <label>Forms</label>
        <div class="shiny-field" style="flex-wrap:wrap; gap:14px;">
          <span class="shiny-field" style="gap:10px;">
            <label class="switch">
              <input type="checkbox" id="f_isMega" ${p.isMega ? 'checked' : ''} onchange="onFormToggleChange('mega', this.checked)">
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
            <label for="f_isMega" style="font-size:13px; color:var(--text-dim); cursor:pointer; display:inline-flex; align-items:center; gap:6px;"><img src="${MEGA_ICON}" alt="" style="width:16px;height:16px;">Mega Evolution</label>
          </span>
          <span class="shiny-field" style="gap:10px;">
            <label class="switch">
              <input type="checkbox" id="f_isGigantamax" ${p.isGigantamax ? 'checked' : ''} onchange="onFormToggleChange('gigantamax', this.checked)">
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
            <label for="f_isGigantamax" style="font-size:13px; color:var(--text-dim); cursor:pointer; display:inline-flex; align-items:center; gap:6px;"><img src="${GIGANTAMAX_ICON}" alt="" style="width:16px;height:16px;">Gigantamax</label>
          </span>
        </div>
      </div>
      <div class="field span-2">
        <label style="display:flex; align-items:center; gap:6px;">Sprite Images
          <span class="info-tooltip-trigger" tabindex="0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span class="info-tooltip">Default is required; Mega/Gigantamax are optional and only apply when that form is enabled above.</span>
          </span>
        </label>
        <div class="sprite-slots-grid" id="spriteSlotsGrid">
          ${spriteSlotHTML('default', 'Default', p.sprite, true)}
          ${spriteSlotHTML('mega', 'Mega Evolution', p.spriteMega, p.isMega)}
          ${spriteSlotHTML('gigantamax', 'Gigantamax', p.spriteGigantamax, p.isGigantamax)}
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
  document.querySelectorAll('#typeSwatches .swatch').forEach(s=>{
    s.classList.toggle('active', selectedTypes.includes(s.dataset.type));
  });
  document.getElementById('typeSelectedLabel').textContent = selectedTypes.join(' / ') || 'No type selected';
}

let selectedGender = '';
function toggleGender(g){
  selectedGender = (selectedGender === g) ? '' : g;
  document.querySelectorAll('#genderToggleGroup .gender-toggle-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.gender === selectedGender);
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
      return '<div class="rich-field">' +
        '<div class="rich-toolbar">' +
          '<button type="button" class="rich-btn" onmousedown="event.preventDefault(); richCmdOnEl(document.getElementById(\'move-' + idx + '-' + slot + '\'),\'bold\')" title="Bold"><b>B</b></button>' +
          '<button type="button" class="rich-btn" onmousedown="event.preventDefault(); richCmdOnEl(document.getElementById(\'move-' + idx + '-' + slot + '\'),\'italic\')" title="Italic"><i>I</i></button>' +
        '</div>' +
        '<div class="rich-input" id="move-' + idx + '-' + slot + '" contenteditable="true" ' +
          'data-placeholder="Move ' + (slot+1) + '" ' +
          'onblur="updateMoveSlotRich(' + idx + ',' + slot + ',this)">' + (g.moves[slot]||'') + '</div>' +
      '</div>';
    }).join('');
    return '<div class="move-row">' +
      '<div class="game-tag-field">' +
        gamePresetSelectHTML(String(idx), g.gameKey || '') +
        '<input placeholder="Tag (e.g. Pokémon Platinum)" value="' + escapeAttr(g.tag) + '" oninput="updateMoveField(' + idx + ',\'tag\',this.value)">' +
      '</div>' +
      '<input placeholder="Ability" value="' + escapeAttr(g.ability) + '" oninput="updateMoveField(' + idx + ',\'ability\',this.value)">' +
      moveSlots +
      '<div class="remove-row-btn" onclick="removeMoveRow(' + idx + ')">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</div>' +
    '</div>';
  }).join('');
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
  }
}
function updateMoveSlotRich(idx, slot, el){ formMovesDraft[idx].moves[slot] = el.innerHTML.trim(); }
function richCmd(elId, cmd){ document.getElementById(elId).focus(); document.execCommand(cmd, false, null); }
function richCmdOnEl(el, cmd){ if(el) el.focus(); document.execCommand(cmd, false, null); }
function addMoveRow(){
  formMovesDraft.push({ id: cryptoId(), tag:'', ability:'', moves:['','','',''], gameKey:'' });
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
    <div class="game-dropdown-gen-label">${escapeHTML(GAME_PRESET_GEN_LABELS[gen])}</div>
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
  selectedGender = '';
  formMovesDraft = [];
}

const _origOpenForm = openForm;
openForm = function(id){
  selectedTypes = id ? [...(state.pokemon.find(x=>x.id===id).types)] : [];
  selectedGender = id ? (state.pokemon.find(x=>x.id===id).gender || '') : '';
  _origOpenForm(id);
};

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
      const data = JSON.parse(ev.target.result);
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

