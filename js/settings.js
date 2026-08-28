/* ============== SETTINGS ============== */

function fontPickerFieldHTML(slot, labelText, hintText, font){
  const cap = slot.charAt(0).toUpperCase() + slot.slice(1);
  return `
    <div class="field">
      <label>${labelText}</label>
      <div class="hint" style="margin-top:2px; margin-bottom:8px;">${hintText}</div>
      <div class="btn-toggle-row">
        <button type="button" class="btn ${font.type==='default'||!font.type?'primary':'ghost'}" id="fontType${cap}Default" style="flex:1; width:auto; height:auto; padding:10px 8px; border-radius:10px; font-size:12.5px;" onclick="setFontTypeChoice('${slot}','default')">Default</button>
        <button type="button" class="btn ${font.type==='google'?'primary':'ghost'}" id="fontType${cap}Google" style="flex:1; width:auto; height:auto; padding:10px 8px; border-radius:10px; font-size:12.5px;" onclick="setFontTypeChoice('${slot}','google')">Google Font</button>
        <button type="button" class="btn ${font.type==='local'?'primary':'ghost'}" id="fontType${cap}Local" style="flex:1; width:auto; height:auto; padding:10px 8px; border-radius:10px; font-size:12.5px;" onclick="setFontTypeChoice('${slot}','local')">My Computer</button>
      </div>
      <div id="fontGooglePanel${cap}" style="display:${font.type==='google'?'block':'none'}; margin-top:14px;">
        <div class="field">
          <label for="fontGoogleName${cap}">Google Font name</label>
          <input type="text" id="fontGoogleName${cap}" placeholder="e.g. Roboto Slab" value="${escapeAttr(font.googleName||'')}">
        </div>
        <div class="hint" style="margin-top:6px;">Find names at fonts.google.com, then type the exact font name here.</div>
      </div>
      <div id="fontLocalPanel${cap}" style="display:${font.type==='local'?'block':'none'}; margin-top:14px;">
        <div class="field">
          <label for="fontLocalFile${cap}">Font file (.ttf, .otf, .woff, .woff2)</label>
          <input type="file" id="fontLocalFile${cap}" accept=".ttf,.otf,.woff,.woff2" onchange="handleLocalFontUpload('${slot}', event)">
        </div>
        <div class="hint" id="fontLocalFileName${cap}" style="margin-top:6px;">${font.type==='local' && font.localName ? `Currently: ${escapeHTML(font.localName)}` : 'No file chosen yet.'}</div>
      </div>
    </div>
  `;
}

function openSettings(){
  const s = state.settings || { defaultSort:'oldest', defaultTheme:'light', custom: defaultCustomTheme(), bodyFont: defaultFontSetting(), nicknameFont: defaultFontSetting(), monoFont: defaultFontSetting(), shareFormat:'apng', cardFooterInfo:'arrow', sortBallsAlpha:false, sortGamesAlpha:false };
  const custom = s.custom || defaultCustomTheme();
  const bodyFont = s.bodyFont || defaultFontSetting();
  const nicknameFont = s.nicknameFont || defaultFontSetting();
  const monoFont = s.monoFont || defaultFontSetting();
  const cardFooterInfo = s.cardFooterInfo || 'arrow';
  const sortBallsAlpha = !!s.sortBallsAlpha;
  const sortGamesAlpha = !!s.sortGamesAlpha;
  const previewMon = { types:['Fire','Flying'], preferredForm:'default', shiny:false };
  const previewIsLight = isNeumorphicActive();
  const previewA1 = previewIsLight ? 0.30 : 0.22;
  const previewA2 = previewIsLight ? 0.24 : 0.18;
  const previewTint1 = hexToRgba(TYPE_HEX.Fire, previewA1);
  const previewTint2 = hexToRgba(TYPE_HEX.Flying, previewA2);
  const previewBorder = hexToRgba(TYPE_HEX.Fire, 0.45);
  const [previewGlowC1, previewGlowC2, previewGlowC3] = typeGlowColors(previewMon);
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'settingsOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeSettings(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:560px;">
      <div class="modal-head">
        <div>
          <h2 style="font-family:var(--sans); font-size:19px; margin:0;">Settings</h2>
          <div class="hint" style="margin-top:2px;">Saved into your exported JSON file.</div>
        </div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeSettings()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        <div class="field">
          <label>Default Card Sort</label>
          <select id="settingsDefaultSort">
            <option value="recent" ${s.defaultSort==='recent'?'selected':''}>Sort by Recently Added</option>
            <option value="oldest" ${s.defaultSort==='oldest'?'selected':''}>Sort by Oldest Added</option>
            <option value="name" ${s.defaultSort==='name'?'selected':''}>Sort by Nickname (A–Z)</option>
            <option value="name-desc" ${s.defaultSort==='name-desc'?'selected':''}>Sort by Nickname (Z–A)</option>
            <option value="species" ${s.defaultSort==='species'?'selected':''}>Sort by Species (A–Z)</option>
            <option value="species-desc" ${s.defaultSort==='species-desc'?'selected':''}>Sort by Species (Z–A)</option>
          </select>
        </div>
        <div class="field" style="margin-top:16px;">
          <label>Card Footer Info</label>
          <select id="settingsCardFooterInfo">
            <option value="arrow" ${cardFooterInfo==='arrow'?'selected':''}>Origin Game → Last Game</option>
            <option value="arrowIconsOnly" ${cardFooterInfo==='arrowIconsOnly'?'selected':''}>Origin Game → Last Game (Icons Only)</option>
            <option value="age" ${cardFooterInfo==='age'?'selected':''}>Age</option>
            <option value="ageWithMet" ${cardFooterInfo==='ageWithMet'?'selected':''}>Age with Met Date</option>
            <option value="notes" ${cardFooterInfo==='notes'?'selected':''}>Trainer Notes</option>
            <option value="characteristic" ${cardFooterInfo==='characteristic'?'selected':''}>Characteristic</option>
            <option value="origin" ${cardFooterInfo==='origin'?'selected':''}>Just Origin Game</option>
            <option value="last" ${cardFooterInfo==='last'?'selected':''}>Just Last Game</option>
            <option value="none" ${cardFooterInfo==='none'?'selected':''}>None</option>
          </select>
          <div class="hint" style="margin-top:2px;">Shown on each card, next to the Share/Edit/Delete buttons. Choosing None centers those buttons instead.</div>
        </div>
        <div class="field" style="margin-top:16px;">
          <label>Sort Alphabetically</label>
          <div class="shiny-field">
            <label class="switch">
              <input type="checkbox" id="settingsSortBallsAlpha" ${sortBallsAlpha ? 'checked' : ''}>
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
            <label for="settingsSortBallsAlpha" style="font-size:13px; color:var(--text-dim); display:inline-flex; align-items:center; gap:5px; cursor:pointer; text-transform:uppercase; letter-spacing:0.04em;">Poké Ball</label>
          </div>
          <div class="shiny-field" style="margin-top:8px;">
            <label class="switch">
              <input type="checkbox" id="settingsSortGamesAlpha" ${sortGamesAlpha ? 'checked' : ''}>
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
            <label for="settingsSortGamesAlpha" style="font-size:13px; color:var(--text-dim); display:inline-flex; align-items:center; gap:5px; cursor:pointer; text-transform:uppercase; letter-spacing:0.04em;">Origin Game</label>
          </div>
          <div class="hint" style="margin-top:2px;">Applies to the Poké Ball and Origin/Last Game pickers, and the Origin Game filter. Off sorts games by generation instead.</div>
        </div>
        <div class="field" style="margin-top:16px;">
          <label style="display:flex; align-items:center; gap:6px;">Animated Sprite Format
            <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip">Most photo viewers, including phone galleries and Windows Photos, do not animate APNG files. Web browsers are the most reliable way to view APNG animations. GIFs, on the other hand, are supported almost everywhere, including previews in Discord and Slack.</span>
            </span>
          </label>
          <div class="hint" style="margin-top:2px; margin-bottom:10px;">Used when sharing a card with an animated sprite as an image.</div>
          <div class="btn-toggle-row">
            <button type="button" class="btn ${s.shareFormat!=='gif'?'primary':'ghost'}" id="settingsShareFormatApng" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:10px; font-size:13px;" onclick="setSettingsShareFormatChoice('apng')">Animated PNG</button>
            <button type="button" class="btn ${s.shareFormat==='gif'?'primary':'ghost'}" id="settingsShareFormatGif" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:10px; font-size:13px;" onclick="setSettingsShareFormatChoice('gif')">GIF</button>
          </div>
        </div>
        <div class="field" style="margin-top:16px;">
          <label>Default Theme</label>
          <div class="btn-toggle-row">
            <button type="button" class="btn ${s.defaultTheme==='light'?'primary':'ghost'}" id="settingsThemeLight" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:10px; font-size:13px;" onclick="setSettingsThemeChoice('light')">☉ Poké Ball</button>
            <button type="button" class="btn ${s.defaultTheme==='dark'?'primary':'ghost'}" id="settingsThemeDark" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:10px; font-size:13px;" onclick="setSettingsThemeChoice('dark')">☾ Beast Ball</button>
            <button type="button" class="btn ${s.defaultTheme==='custom'?'primary':'ghost'}" id="settingsThemeCustom" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:10px; font-size:13px;" onclick="setSettingsThemeChoice('custom')">⬢ Master Ball</button>
          </div>
        </div>
        <div id="customThemePanel" style="display:${s.defaultTheme==='custom'?'block':'none'}; margin-top:18px; padding-top:16px; border-top:1px solid var(--panel-border);">
          <div class="field">
            <label>Surface Style</label>
            <div class="btn-toggle-row">
              <button type="button" class="btn ${custom.style!=='neumorphic'?'primary':'ghost'}" id="customStyleGlass" style="flex:1; width:auto; height:auto; padding:10px 14px; border-radius:10px;" onclick="setCustomStyleChoice('glass')">Glassmorphic</button>
              <button type="button" class="btn ${custom.style==='neumorphic'?'primary':'ghost'}" id="customStyleNeumorphic" style="flex:1; width:auto; height:auto; padding:10px 14px; border-radius:10px;" onclick="setCustomStyleChoice('neumorphic')">Neumorphic</button>
            </div>
          </div>
          <div class="custom-color-grid">
            <div class="custom-color-field">
              <label for="customColorBg">Background</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" id="customColorBg" value="${custom.bg}">
                <input type="text" id="customColorBgHex" class="hex-input" maxlength="7" placeholder="#000000" value="${custom.bg}">
              </div>
            </div>
            <div class="custom-color-field">
              <label for="customColorText">Text</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" id="customColorText" value="${custom.text}">
                <input type="text" id="customColorTextHex" class="hex-input" maxlength="7" placeholder="#000000" value="${custom.text}">
              </div>
            </div>
            <div class="custom-color-field">
              <label for="customColorAccent">Accent</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" id="customColorAccent" value="${custom.accent}">
                <input type="text" id="customColorAccentHex" class="hex-input" maxlength="7" placeholder="#000000" value="${custom.accent}">
              </div>
            </div>
            <div class="custom-color-field">
              <label for="customColorAccent2">Accent / Highlight</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" id="customColorAccent2" value="${custom.accent2}">
                <input type="text" id="customColorAccent2Hex" class="hex-input" maxlength="7" placeholder="#000000" value="${custom.accent2}">
              </div>
            </div>
          </div>
          <div class="hint" style="margin-top:10px;">Master Ball theme updates live as you pick colors below. Hex codes work too.</div>
          <button type="button" class="btn ghost" style="margin-top:10px; width:auto; height:auto; padding:8px 14px; font-size:12.5px;" onclick="resetCustomThemeToDefault()">Reset Master Ball Colors to Default</button>
        </div>
        <div class="field" style="margin-top:16px; padding-top:16px; border-top:1px solid var(--panel-border);">
          <label>Fonts</label>
          <div class="hint" style="margin-top:2px; margin-bottom:10px;">Nicknames can have their own stylish font, separate from the readable font used everywhere else.</div>
          ${fontPickerFieldHTML('body', 'General Font', 'Used for everything except Pokémon nicknames.', bodyFont)}
          <div style="margin-top:16px;">
            ${fontPickerFieldHTML('nickname', 'Nickname Font', 'Used only for Pokémon nicknames, on cards and in the detail view.', nicknameFont)}
          </div>
          <div style="margin-top:16px;">
            ${fontPickerFieldHTML('mono', 'Monospace Font', 'Used for stat labels, tags, dex numbers, and other monospace text.', monoFont)}
          </div>
          <div class="card" id="fontPreviewCard" style="margin-top:14px; cursor:default; --glow:${TYPE_HEX.Fire}; --type-tint-1:${previewTint1}; --type-tint-2:${previewTint2}; border-color:${previewBorder}; --glow-c1:${previewGlowC1}; --glow-c2:${previewGlowC2}; --glow-c3:${previewGlowC3};">
            <span class="card-glow-ring" aria-hidden="true"></span>
            <span class="card-glow-halo" aria-hidden="true"></span>
            <div class="card-top">
              <div class="card-sprite"><div class="brand-mark mini"></div></div>
              <div>
                <div class="card-id">#0006 · CHARIZARD</div>
                <div class="card-name" id="fontPreviewName">Charizard</div>
                <div class="card-species">Adamant · ♂</div>
              </div>
            </div>
            <div class="type-row">
              <span class="type-badge" style="background:${TYPE_HEX.Fire}">FIRE</span>
              <span class="type-badge" style="background:${TYPE_HEX.Flying}">FLYING</span>
            </div>
            <div class="card-foot">
              <span class="origin-label">This is how the rest of your Pokédex will read.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-foot">
        <button type="button" class="btn ghost" style="color:#F4A6BA;" onclick="resetAllPreferencesToDefault()">Reset to Default</button>
        <div style="display:flex; gap:10px;">
          <button type="button" class="btn ghost" onclick="closeSettings()">Cancel</button>
          <button type="button" class="btn primary" onclick="saveSettings()">Save Settings</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  settingsThemeDraft = s.defaultTheme === 'dark' ? 'dark' : (s.defaultTheme === 'custom' ? 'custom' : 'light');
  customStyleDraft = custom.style === 'neumorphic' ? 'neumorphic' : 'glass';
  ['Bg','Text','Accent','Accent2'].forEach(key => {
    const colorEl = document.getElementById(`customColor${key}`);
    colorEl.addEventListener('input', () => { syncHexInputFromPicker(key); previewCustomTheme(); });
    document.getElementById(`customColor${key}Hex`).addEventListener('input', () => handleHexColorInput(key));
  });
  if(settingsThemeDraft === 'custom') previewCustomTheme();
  fontDrafts.body = { type: bodyFont.type || 'default', googleName: bodyFont.googleName || '', localName: bodyFont.localName || '', localData: bodyFont.localData || '' };
  fontDrafts.nickname = { type: nicknameFont.type || 'default', googleName: nicknameFont.googleName || '', localName: nicknameFont.localName || '', localData: nicknameFont.localData || '' };
  fontDrafts.mono = { type: monoFont.type || 'default', googleName: monoFont.googleName || '', localName: monoFont.localName || '', localData: monoFont.localData || '' };
  settingsShareFormatDraft = s.shareFormat === 'gif' ? 'gif' : 'apng';
  document.getElementById('fontGoogleNameBody').addEventListener('input', () => handleGoogleFontNameInput('body'));
  document.getElementById('fontGoogleNameNickname').addEventListener('input', () => handleGoogleFontNameInput('nickname'));
  updateFontPreview();
}

function defaultCustomTheme(){
  return { style:'glass', bg:'#0B0F14', text:'#E8EDF2', accent:'#9B5DE5', accent2:'#F2C14E' };
}

function defaultFontSetting(){
  return { type:'default', googleName:'', localName:'', localData:'' };
}

let settingsThemeDraft = 'light';
let customStyleDraft = 'glass';
let settingsShareFormatDraft = 'apng';
let fontDrafts = {
  body: { type:'default', googleName:'', localName:'', localData:'' },
  nickname: { type:'default', googleName:'', localName:'', localData:'' },
  mono: { type:'default', googleName:'', localName:'', localData:'' }
};
const LOCAL_FONT_PREVIEW_FAMILY = { body:'PokedexLocalFontPreviewBody', nickname:'PokedexLocalFontPreviewNickname', mono:'PokedexLocalFontPreviewMono' };
let previewFontFaces = { body:null, nickname:null, mono:null };

function resetCustomThemeToDefault(){
  const def = defaultCustomTheme();
  ['Bg','Text','Accent','Accent2'].forEach(key => {
    const field = key.charAt(0).toLowerCase() + key.slice(1);
    document.getElementById(`customColor${key}`).value = def[field];
    document.getElementById(`customColor${key}Hex`).value = def[field];
    document.getElementById(`customColor${key}Hex`).classList.remove('invalid');
  });
  setCustomStyleChoice('glass');
}

function syncHexInputFromPicker(key){
  const colorEl = document.getElementById(`customColor${key}`);
  const hexEl = document.getElementById(`customColor${key}Hex`);
  hexEl.value = colorEl.value;
  hexEl.classList.remove('invalid');
}

function normalizeHexColor(raw){
  let v = (raw || '').trim().replace(/^#/, '');
  if(/^[0-9a-fA-F]{3}$/.test(v)) v = v.split('').map(c => c + c).join('');
  if(!/^[0-9a-fA-F]{6}$/.test(v)) return null;
  return '#' + v.toLowerCase();
}

function handleHexColorInput(key){
  const hexEl = document.getElementById(`customColor${key}Hex`);
  const colorEl = document.getElementById(`customColor${key}`);
  const normalized = normalizeHexColor(hexEl.value);
  if(!normalized){
    hexEl.classList.add('invalid');
    return;
  }
  hexEl.classList.remove('invalid');
  colorEl.value = normalized;
  previewCustomTheme();
}

function setFontTypeChoice(slot, type){
  const cap = slot.charAt(0).toUpperCase() + slot.slice(1);
  fontDrafts[slot].type = type;
  ['Default','Google','Local'].forEach(key => {
    const btn = document.getElementById(`fontType${cap}${key}`);
    const match = key.toLowerCase() === type;
    btn.classList.toggle('primary', match);
    btn.classList.toggle('ghost', !match);
  });
  document.getElementById(`fontGooglePanel${cap}`).style.display = type === 'google' ? 'block' : 'none';
  document.getElementById(`fontLocalPanel${cap}`).style.display = type === 'local' ? 'block' : 'none';
  updateFontPreview();
}

function handleGoogleFontNameInput(slot){
  const cap = slot.charAt(0).toUpperCase() + slot.slice(1);
  fontDrafts[slot].googleName = document.getElementById(`fontGoogleName${cap}`).value.trim();
  updateFontPreview();
}

function handleLocalFontUpload(slot, e){
  const cap = slot.charAt(0).toUpperCase() + slot.slice(1);
  const file = e.target.files[0];
  if(!file) return;
  if(!/\.(ttf|otf|woff2?|)$/i.test(file.name)){
    showToast('Please choose a .ttf, .otf, .woff, or .woff2 font file.');
    return;
  }
  if(file.size > 6 * 1024 * 1024){
    showToast('That font file is quite large, it will make your exported JSON file much bigger.');
  }
  const reader = new FileReader();
  reader.onload = async (ev) => {
    fontDrafts[slot].localData = ev.target.result;
    fontDrafts[slot].localName = file.name;
    document.getElementById(`fontLocalFileName${cap}`).textContent = `Currently: ${fontDrafts[slot].localName}`;
    await updateFontPreview();
  };
  reader.readAsDataURL(file);
}

async function loadPreviewFontFamily(slot){
  const draft = fontDrafts[slot];
  if(draft.type === 'google' && draft.googleName){
    ensureGoogleFontLink(draft.googleName);
    return `'${draft.googleName}', sans-serif`;
  }
  if(draft.type === 'local' && draft.localData){
    try{
      const familyName = LOCAL_FONT_PREVIEW_FAMILY[slot];
      const face = new FontFace(familyName, `url(${draft.localData})`);
      await face.load();
      if(previewFontFaces[slot]) document.fonts.delete(previewFontFaces[slot]);
      document.fonts.add(face);
      previewFontFaces[slot] = face;
      return `'${familyName}', sans-serif`;
    } catch(err){
      showToast('That font file could not be read, please try a different one.');
      return '';
    }
  }
  return '';
}

async function updateFontPreview(){
  const card = document.getElementById('fontPreviewCard');
  const nameEl = document.getElementById('fontPreviewName');
  if(!card || !nameEl) return;
  const [bodyFamily, nicknameFamily] = await Promise.all([loadPreviewFontFamily('body'), loadPreviewFontFamily('nickname')]);
  card.style.fontFamily = bodyFamily;
  nameEl.style.fontFamily = nicknameFamily;
}

function resetAllPreferencesToDefault(){
  const previous = state.settings ? JSON.parse(JSON.stringify(state.settings)) : null;
  state.settings = {
    defaultSort: 'oldest',
    defaultTheme: 'light',
    custom: defaultCustomTheme(),
    bodyFont: defaultFontSetting(),
    nicknameFont: defaultFontSetting(),
    monoFont: defaultFontSetting(),
    shareFormat: 'apng',
    cardFooterInfo: 'arrow',
    sortBallsAlpha: false,
    sortGamesAlpha: false
  };
  applySettings();
  renderGrid();
  refreshAllOpenAchievementsSections();
  closeSettings();
  openSettings();
  showToast('Preferences reset to default.', {
    label: 'Undo',
    onClick: () => {
      state.settings = previous || state.settings;
      applySettings();
      renderGrid();
      refreshAllOpenAchievementsSections();
      closeSettings();
      openSettings();
      showToast('Previous preferences restored.');
    }
  });
}

function setSettingsThemeChoice(theme){
  settingsThemeDraft = theme;
  document.getElementById('settingsThemeLight').classList.toggle('primary', theme==='light');
  document.getElementById('settingsThemeLight').classList.toggle('ghost', theme!=='light');
  document.getElementById('settingsThemeDark').classList.toggle('primary', theme==='dark');
  document.getElementById('settingsThemeDark').classList.toggle('ghost', theme!=='dark');
  document.getElementById('settingsThemeCustom').classList.toggle('primary', theme==='custom');
  document.getElementById('settingsThemeCustom').classList.toggle('ghost', theme!=='custom');
  document.getElementById('customThemePanel').style.display = theme==='custom' ? 'block' : 'none';
  if(theme === 'custom') previewCustomTheme();
  else restorePreviewTheme();
}

function setSettingsShareFormatChoice(format){
  settingsShareFormatDraft = format;
  document.getElementById('settingsShareFormatApng').classList.toggle('primary', format!=='gif');
  document.getElementById('settingsShareFormatApng').classList.toggle('ghost', format==='gif');
  document.getElementById('settingsShareFormatGif').classList.toggle('primary', format==='gif');
  document.getElementById('settingsShareFormatGif').classList.toggle('ghost', format!=='gif');
}

function setCustomStyleChoice(style){
  customStyleDraft = style;
  document.getElementById('customStyleGlass').classList.toggle('primary', style==='glass');
  document.getElementById('customStyleGlass').classList.toggle('ghost', style!=='glass');
  document.getElementById('customStyleNeumorphic').classList.toggle('primary', style==='neumorphic');
  document.getElementById('customStyleNeumorphic').classList.toggle('ghost', style!=='neumorphic');
  previewCustomTheme();
}

function readCustomColorsFromInputs(){
  return {
    style: customStyleDraft,
    bg: document.getElementById('customColorBg').value,
    text: document.getElementById('customColorText').value,
    accent: document.getElementById('customColorAccent').value,
    accent2: document.getElementById('customColorAccent2').value
  };
}

function previewCustomTheme(){
  const custom = readCustomColorsFromInputs();
  applyCustomTheme(custom);
}

function restorePreviewTheme(){
  // restore whatever theme is currently saved in state, so backing out of the custom
  // panel without saving doesn't leave the live preview applied
  applySettings();
}

function closeSettings(){
  const el = document.getElementById('settingsOverlay');
  if(el) el.remove();
  applySettings(); // discard any unsaved live preview from color pickers
}

function saveSettings(){
  const defaultSort = document.getElementById('settingsDefaultSort').value;
  const cardFooterInfo = document.getElementById('settingsCardFooterInfo').value;
  const sortBallsAlpha = document.getElementById('settingsSortBallsAlpha').checked;
  const sortGamesAlpha = document.getElementById('settingsSortGamesAlpha').checked;
  const custom = settingsThemeDraft === 'custom' ? readCustomColorsFromInputs() : (state.settings && state.settings.custom) || defaultCustomTheme();
  const bodyFont = { ...fontDrafts.body };
  const nicknameFont = { ...fontDrafts.nickname };
  const monoFont = { ...fontDrafts.mono };
  state.settings = { defaultSort, defaultTheme: settingsThemeDraft, custom, bodyFont, nicknameFont, monoFont, shareFormat: settingsShareFormatDraft, cardFooterInfo, sortBallsAlpha, sortGamesAlpha };
  applySettings();
  populateGameFilter();
  renderGrid();
  refreshAllOpenAchievementsSections();
  closeSettings();
  showToast('Settings saved, they\u2019ll be included in your next export.');
}

document.getElementById('settingsBtn').addEventListener('click', openSettings);
