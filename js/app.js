/* ============== DATA MODEL ============== */
const TYPES = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];

const TYPE_COLOR = {
  Normal:"var(--t-normal)", Fire:"var(--t-fire)", Water:"var(--t-water)", Electric:"var(--t-electric)",
  Grass:"var(--t-grass)", Ice:"var(--t-ice)", Fighting:"var(--t-fighting)", Poison:"var(--t-poison)",
  Ground:"var(--t-ground)", Flying:"var(--t-flying)", Psychic:"var(--t-psychic)", Bug:"var(--t-bug)",
  Rock:"var(--t-rock)", Ghost:"var(--t-ghost)", Dragon:"var(--t-dragon)", Dark:"var(--t-dark)",
  Steel:"var(--t-steel)", Fairy:"var(--t-fairy)"
};

const TYPE_HEX = {
  Normal:"#A8A878", Fire:"#F08030", Water:"#6890F0", Electric:"#F8D030",
  Grass:"#78C850", Ice:"#98D8D8", Fighting:"#C03028", Poison:"#A040A0",
  Ground:"#E0C068", Flying:"#A890F0", Psychic:"#F85888", Bug:"#A8B820",
  Rock:"#B8A038", Ghost:"#705898", Dragon:"#7038F8", Dark:"#705848",
  Steel:"#B8B8D0", Fairy:"#EE99AC"
};

const STAT_COLOR = {
  "Attack":"#E8D24C", "Defense":"#E0954D", "Speed":"#D85FA8",
  "Sp. Attack":"#52C4D6", "Sp. Defense":"#7B8FE0"
};
// up/down stat per nature; null/null = neutral (no stat change)
const NATURE_DATA = {
  Hardy:    { up:null,           down:null },
  Lonely:   { up:"Attack",       down:"Defense" },
  Brave:    { up:"Attack",       down:"Speed" },
  Adamant:  { up:"Attack",       down:"Sp. Attack" },
  Naughty:  { up:"Attack",       down:"Sp. Defense" },
  Bold:     { up:"Defense",      down:"Attack" },
  Docile:   { up:null,           down:null },
  Relaxed:  { up:"Defense",      down:"Speed" },
  Impish:   { up:"Defense",      down:"Sp. Attack" },
  Lax:      { up:"Defense",      down:"Sp. Defense" },
  Timid:    { up:"Speed",        down:"Attack" },
  Hasty:    { up:"Speed",        down:"Defense" },
  Serious:  { up:null,           down:null },
  Jolly:    { up:"Speed",        down:"Sp. Attack" },
  Naive:    { up:"Speed",        down:"Sp. Defense" },
  Modest:   { up:"Sp. Attack",   down:"Attack" },
  Mild:     { up:"Sp. Attack",   down:"Defense" },
  Quiet:    { up:"Sp. Attack",   down:"Speed" },
  Bashful:  { up:null,           down:null },
  Rash:     { up:"Sp. Attack",   down:"Sp. Defense" },
  Calm:     { up:"Sp. Defense",  down:"Attack" },
  Gentle:   { up:"Sp. Defense",  down:"Defense" },
  Sassy:    { up:"Sp. Defense",  down:"Speed" },
  Careful:  { up:"Sp. Defense",  down:"Sp. Attack" },
  Quirky:   { up:null,           down:null }
};
const NATURE_NAMES = Object.keys(NATURE_DATA);


/* ============== CHANGELOG ============== */

function changelogEntryHTML(entry){
  return `
    <div class="changelog-entry ${entry.knownIssue?'known-issue':''}">
      <div class="changelog-entry-title">${escapeHTML(entry.title)}</div>
      <ul class="changelog-list">
        ${entry.items.map(i=>`<li>${i}</li>`).join('')}
      </ul>
    </div>
  `;
}

function changelogVersionHTML(v, idx){
  return `
    <div class="changelog-version">
      <div class="changelog-version-head">
        <h3>Pokédex ${escapeHTML(v.version)}</h3>
        ${idx===0 ? '<span class="latest-tag">Latest</span>' : ''}
      </div>
      ${v.entries.map(changelogEntryHTML).join('')}
    </div>
    ${idx < CHANGELOG.length-1 ? '<hr class="changelog-divider">' : ''}
  `;
}

function openChangelog(){
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'changelogOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeChangelog(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:680px;">
      <div class="modal-head">
        <div>
          <h2 style="font-family:var(--sans); font-size:22px; font-weight:800; letter-spacing:-0.01em; margin:0;">Changelog</h2>
          <div class="hint" style="margin-top:4px;">What's new and what's changed in the Pokédex.</div>
        </div>
        <div class="modal-close" onclick="closeChangelog()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        ${CHANGELOG.map((v,idx)=>changelogVersionHTML(v,idx)).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
function closeChangelog(){
  const el = document.getElementById('changelogOverlay');
  if(el) el.remove();
}
document.getElementById('changelogLink').addEventListener('click', (e) => {
  e.preventDefault();
  openChangelog();
});


/* ============== CREDITS ============== */
// Credit source data (CREDITS) lives in data/changelog.js, alongside CHANGELOG.

function creditsEntryHTML(entry){
  return `
    <div class="changelog-entry">
      <div class="changelog-entry-title">${escapeHTML(entry.title)}</div>
      <ul class="changelog-list">
        ${entry.items.map(i=>`<li>${i}</li>`).join('')}
      </ul>
    </div>
  `;
}

function openCredits(){
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'creditsOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeCredits(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:560px;">
      <div class="modal-head">
        <div>
          <h2 style="font-family:var(--sans); font-size:22px; font-weight:800; letter-spacing:-0.01em; margin:0;">Credits</h2>
          <div class="hint" style="margin-top:4px;">Sources and resources this Pokédex relies on.</div>
        </div>
        <div class="modal-close" onclick="closeCredits()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        ${CREDITS.map(creditsEntryHTML).join('')}
        <div class="hint" style="margin-top:4px;">Pokémon and related images are © Nintendo, Creatures Inc., Game Freak, and The Pokémon Company. This is an unofficial, non-commercial fan project and is not affiliated with or endorsed by Nintendo, Creatures Inc., Game Freak, or The Pokémon Company.</div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
function closeCredits(){
  const el = document.getElementById('creditsOverlay');
  if(el) el.remove();
}
document.getElementById('creditsLink').addEventListener('click', (e) => {
  e.preventDefault();
  openCredits();
});



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
  const s = state.settings || { defaultSort:'oldest', defaultTheme:'light', custom: defaultCustomTheme(), bodyFont: defaultFontSetting(), nicknameFont: defaultFontSetting(), shareFormat:'apng', cardFooterInfo:'arrow', sortBallsAlpha:false };
  const custom = s.custom || defaultCustomTheme();
  const bodyFont = s.bodyFont || defaultFontSetting();
  const nicknameFont = s.nicknameFont || defaultFontSetting();
  const cardFooterInfo = s.cardFooterInfo || 'arrow';
  const sortBallsAlpha = !!s.sortBallsAlpha;
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
        <div class="modal-close" onclick="closeSettings()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        <div class="field">
          <label>Default Sort</label>
          <select id="settingsDefaultSort">
            <option value="recent" ${s.defaultSort==='recent'?'selected':''}>Sort: Recently Added</option>
            <option value="oldest" ${s.defaultSort==='oldest'?'selected':''}>Sort: Oldest Added</option>
            <option value="name" ${s.defaultSort==='name'?'selected':''}>Sort: Name (A–Z)</option>
            <option value="species" ${s.defaultSort==='species'?'selected':''}>Sort: Species (A–Z)</option>
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
            <option value="origin" ${cardFooterInfo==='origin'?'selected':''}>Just Origin Game</option>
            <option value="last" ${cardFooterInfo==='last'?'selected':''}>Just Last Game</option>
            <option value="none" ${cardFooterInfo==='none'?'selected':''}>None</option>
          </select>
          <div class="hint" style="margin-top:2px;">Shown on each card, next to the Share/Edit/Delete buttons. Choosing None centers those buttons instead.</div>
        </div>
        <div class="field" style="margin-top:16px;">
          <label>Poké Ball Order</label>
          <div class="shiny-field">
            <label class="switch">
              <input type="checkbox" id="settingsSortBallsAlpha" ${sortBallsAlpha ? 'checked' : ''}>
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
            <label for="settingsSortBallsAlpha" style="font-size:13px; color:var(--text-dim); display:inline-flex; align-items:center; gap:5px; cursor:pointer; text-transform:uppercase; letter-spacing:0.04em;">Sort Alphabetically</label>
          </div>
          <div class="hint" style="margin-top:2px;">Applies to the Poké Ball picker in the edit form.</div>
        </div>
        <div class="field" style="margin-top:16px;">
          <label style="display:flex; align-items:center; gap:6px;">Animated Sprite Format
            <span class="info-tooltip-trigger" tabindex="0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip"><sup>Most photo viewers, including phone galleries and Windows Photos, do not animate APNG files. Web browsers are the most reliable way to view APNG animations. GIFs, on the other hand, are supported almost everywhere, including previews in Discord and Slack.</sup></span>
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
          <div class="font-preview-card" id="fontPreviewCard">
            <div class="font-preview-name" id="fontPreviewName">Charizard</div>
            <div class="font-preview-species">#006 · Fire / Flying</div>
            <div class="font-preview-sample">This is how the rest of your Pokédex will read.</div>
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
  nickname: { type:'default', googleName:'', localName:'', localData:'' }
};
const LOCAL_FONT_PREVIEW_FAMILY = { body:'PokedexLocalFontPreviewBody', nickname:'PokedexLocalFontPreviewNickname' };
let previewFontFaces = { body:null, nickname:null };

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
    shareFormat: 'apng',
    cardFooterInfo: 'arrow',
    sortBallsAlpha: false
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
  const custom = settingsThemeDraft === 'custom' ? readCustomColorsFromInputs() : (state.settings && state.settings.custom) || defaultCustomTheme();
  const bodyFont = { ...fontDrafts.body };
  const nicknameFont = { ...fontDrafts.nickname };
  state.settings = { defaultSort, defaultTheme: settingsThemeDraft, custom, bodyFont, nicknameFont, shareFormat: settingsShareFormatDraft, cardFooterInfo, sortBallsAlpha };
  applySettings();
  renderGrid();
  refreshAllOpenAchievementsSections();
  closeSettings();
  showToast('Settings saved, they\u2019ll be included in your next export.');
}

document.getElementById('settingsBtn').addEventListener('click', openSettings);

function saveForm(id){
  const nickname = document.getElementById('f_nickname').value.trim();
  const species = document.getElementById('f_species').value.trim();
  if(!species){
    showToast('Species is required.');
    return;
  }
  if(selectedTypes.length === 0){
    showToast('At least one Type is required.');
    return;
  }
  const isMega = document.getElementById('f_isMega').checked;
  const isGigantamax = document.getElementById('f_isGigantamax').checked;
  // A disabled form's sprite slot is hidden in the UI but may still hold a stale value;
  // clear it here so re-enabling the form later starts from a clean slot.
  const spriteMega = isMega ? document.getElementById('f_spriteMega').value.trim() : '';
  const spriteGigantamax = isGigantamax ? document.getElementById('f_spriteGigantamax').value.trim() : '';

  const existing = id ? state.pokemon.find(x=>x.id===id) : null;
  let preferredForm = (existing && existing.preferredForm) || 'default';
  if(preferredForm === 'mega' && !isMega) preferredForm = 'default';
  if(preferredForm === 'gigantamax' && !isGigantamax) preferredForm = 'default';

  const payload = {
    nickname: nickname || species,
    species,
    types: [...selectedTypes],
    nature: document.getElementById('f_nature').value.trim(),
    gender: selectedGender,
    shiny: document.getElementById('f_shiny').checked,
    metLocation: document.getElementById('metLocEdit').innerHTML.trim(),
    metDate: document.getElementById('f_metDate').value,
    ball: document.getElementById('f_ball').value.trim(),
    originGame: document.getElementById('f_originGame').value.trim(),
    lastGame: document.getElementById('f_lastGame').value.trim(),
    notes: document.getElementById('notesEdit').innerHTML.trim(),
    sprite: document.getElementById('f_sprite').value.trim(),
    isMega,
    isGigantamax,
    spriteMega,
    spriteGigantamax,
    preferredForm,
    games: formMovesDraft.map(g => ({ id:g.id||cryptoId(), tag:g.tag.trim(), ability:g.ability.trim(), moves:g.moves.map(m=>m.trim()), gameKey:g.gameKey||'' }))
  };

  if(id){
    const idx = state.pokemon.findIndex(x=>x.id===id);
    state.pokemon[idx] = { ...state.pokemon[idx], ...payload };
    showToast(`${nickname} updated.`);
  } else {
    state.pokemon.push(normalizePokemon({ id: cryptoId(), ...payload }));
    showToast(`${nickname} added to your dex.`);
  }
  closeForm();
  render();
}

/* Pending deletions are kept on a stack (not a single closure-captured idx) so that deleting
   several Pokémon in a row before acting on any toast still lets every one of them be undone,
   clicking Undo always restores the most recently deleted entry, and clicking it again restores
   the one before that, instead of earlier deletions being silently overwritten/lost. */
let pendingDeletions = [];

function deletePokemon(id){
  const idx = state.pokemon.findIndex(x=>x.id===id);
  if(idx === -1) return;
  const [removed] = state.pokemon.splice(idx, 1);
  pendingDeletions.push({ pokemon: removed, idx });
  render();
  const count = pendingDeletions.length;
  const msg = count > 1
    ? `${removed.nickname} removed. (${count} to undo)`
    : `${removed.nickname} removed.`;
  showToast(msg, {
    label: 'Undo',
    onClick: undoLastDeletion
  });
}

function undoLastDeletion(){
  const entry = pendingDeletions.pop();
  if(!entry) return;
  const insertAt = Math.min(entry.idx, state.pokemon.length);
  state.pokemon.splice(insertAt, 0, entry.pokemon);
  render();
  const remaining = pendingDeletions.length;
  if(remaining > 0){
    const msg = remaining > 1
      ? `${entry.pokemon.nickname} restored. (${remaining} more to undo)`
      : `${entry.pokemon.nickname} restored. (1 more to undo)`;
    showToast(msg, {
      label: 'Undo',
      onClick: undoLastDeletion
    });
  } else {
    showToast(`${entry.pokemon.nickname} restored.`);
  }
}

/* hook up the type swatches whenever form opens for editing existing pokemon */
/* ============== KEYBOARD ============== */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    closeDetail();
    closeForm();
    closeChangelog();
  }
});
