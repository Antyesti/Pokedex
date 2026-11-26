/* ============== SETTINGS ============== */

function fontPickerFieldHTML(slot, labelText, hintText, font){
  const cap = slot.charAt(0).toUpperCase() + slot.slice(1);
  return `
    <div class="field">
      <label>${labelText}</label>
      <div class="hint" style="margin-top:2px; margin-bottom:8px;">${hintText}</div>
      <div class="btn-toggle-row">
        <button type="button" class="btn ${font.type==='default'||!font.type?'primary':'ghost'}" id="fontType${cap}Default" style="flex:1; width:auto; height:auto; padding:10px 8px; border-radius:999px; font-size:12.5px;" onclick="setFontTypeChoice('${slot}','default')">Default</button>
        <button type="button" class="btn ${font.type==='google'?'primary':'ghost'}" id="fontType${cap}Google" style="flex:1; width:auto; height:auto; padding:10px 8px; border-radius:999px; font-size:12.5px;" onclick="setFontTypeChoice('${slot}','google')">Google Font</button>
        <button type="button" class="btn ${font.type==='local'?'primary':'ghost'}" id="fontType${cap}Local" style="flex:1; width:auto; height:auto; padding:10px 8px; border-radius:999px; font-size:12.5px;" onclick="setFontTypeChoice('${slot}','local')">My Computer</button>
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

function renderSettingsPage(){
  const s = state.settings || { defaultSort:'oldest', defaultTheme:'light', custom: defaultCustomTheme(), bodyFont: defaultFontSetting(), nicknameFont: defaultFontSetting(), monoFont: defaultFontSetting(), shareFormat:'apng', cardFooterInfo:'arrow', sortBallsAlpha:false, sortGamesAlpha:false, strangeBallDisplay:false, showRestrictedRibbons:true, showRibbonHelperByDefault:true, easterEggUnlocked:false, easterEggPreferred:'pikachu', hiddenAvatarsEnabled:true };
  const custom = s.custom || defaultCustomTheme();
  const bodyFont = s.bodyFont || defaultFontSetting();
  const nicknameFont = s.nicknameFont || defaultFontSetting();
  const monoFont = s.monoFont || defaultFontSetting();
  const cardFooterInfo = s.cardFooterInfo || 'arrow';
  const sortBallsAlpha = !!s.sortBallsAlpha;
  const sortGamesAlpha = !!s.sortGamesAlpha;
  const strangeBallDisplay = !!s.strangeBallDisplay;
  const showRestrictedRibbons = s.showRestrictedRibbons !== false;
  const showRibbonHelperByDefault = s.showRibbonHelperByDefault !== false;
  const hiddenAvatarsEnabled = s.hiddenAvatarsEnabled !== false;
  const previewMon = { types:['Fire','Flying'], preferredForm:'default', shiny:false };
  const previewIsLight = isNeumorphicActive();
  const previewA1 = previewIsLight ? 0.30 : 0.22;
  const previewA2 = previewIsLight ? 0.24 : 0.18;
  const previewTint1 = hexToRgba(TYPE_HEX.Fire, previewA1);
  const previewTint2 = hexToRgba(TYPE_HEX.Flying, previewA2);
  const previewBorder = hexToRgba(TYPE_HEX.Fire, 0.45);
  const [previewGlowC1, previewGlowC2, previewGlowC3] = typeGlowColors(previewMon);
  const page = document.getElementById('settingsPage');
  const bg = normalizeBackground(s.background);
  page.innerHTML = `
    <div class="settings-shell">
      <header class="settings-top">
        <div>
          <h1 class="settings-title">Settings</h1>
          <div class="hint" style="margin-top:2px;">Saved into your exported JSON file.</div>
        </div>
      </header>
      <div class="settings-body">
      <section class="modal settings-section">
        <h3>General</h3>
        <div class="field">
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="${BALL_LOOKUP['Strange Ball'] || ''}" alt="" style="width:22px; height:22px; flex:none;">
            <label for="settingsStrangeBallDisplay" style="margin:0;">Strange Ball</label>
            <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip">This is a global setting. It can be overridden individually for specific Pokémon from their Edit screen.</span>
            </span>
            <label class="switch" style="margin-left:auto;">
              <input type="checkbox" id="settingsStrangeBallDisplay" ${strangeBallDisplay ? 'checked' : ''}>
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
          </div>
        </div>
        <div class="field" style="margin-top:16px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <label for="settingsShowRestrictedRibbons" style="margin:0;">Restricted Ribbons on Edit Screen</label>
            <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip">On shows Ribbons this Pokémon can't earn as disabled. Off hides them. Restrictions depend on species, game, or Met Level. Selected Ribbons stay visible, and Met Level becomes required first for Ribbons with a Met Level rule.</span>
            </span>
            <label class="switch" style="margin-left:auto;">
              <input type="checkbox" id="settingsShowRestrictedRibbons" ${showRestrictedRibbons ? 'checked' : ''}>
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
          </div>
        </div>
        <div class="field" style="margin-top:16px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <label for="settingsShowRibbonHelperByDefault" style="margin:0;">Show Ribbons Helper by Default</label>
            <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip">Whether the Ribbons Helper starts on or off each time you open a Pokémon's Edit screen. Either way, its own toggle next to the Ribbons header lets you switch it for that session.</span>
            </span>
            <label class="switch" style="margin-left:auto;">
              <input type="checkbox" id="settingsShowRibbonHelperByDefault" ${showRibbonHelperByDefault ? 'checked' : ''}>
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
          </div>
        </div>
        <div class="field" style="margin-top:16px;">
          <label id="interactionStyleLabel">Card Interaction Style</label>
          <div class="pokerus-toggle-group" id="settingsInteractionStyle" role="group" aria-labelledby="interactionStyleLabel">
            ${[['floating','Floating'],['fullscreen','Full Screen']].map(([value,label]) => {
              const active = (s.detailViewStyle === 'fullscreen' ? 'fullscreen' : 'floating') === value;
              return `<button type="button" class="pokerus-toggle-btn none-status ${active ? 'active' : ''}" data-style-choice="${value}" aria-pressed="${active}">${label}</button>`;
            }).join('')}
          </div>
        </div>
        <div class="field" style="margin-top:16px;">
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
        ${hasHoverMenus() ? '' : `
        <div class="field" style="margin-top:16px;">
          <label style="display:flex; align-items:center; gap:6px;">Animated Sprite Format
            <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip">Most photo viewers, including phone galleries and Windows Photos, do not animate APNG files. Web browsers are the most reliable way to view APNG animations. GIFs, on the other hand, are supported almost everywhere, including previews in Discord and Slack.</span>
            </span>
          </label>
          <div class="hint" style="margin-top:2px; margin-bottom:10px;">Used when sharing a card with an animated sprite as an image. On a computer, hover Share to pick a format each time.</div>
          <div class="btn-toggle-row">
            <button type="button" class="btn ${s.shareFormat!=='gif'?'primary':'ghost'}" id="settingsShareFormatApng" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:999px; font-size:13px;" onclick="setSettingsShareFormatChoice('apng')">Animated PNG</button>
            <button type="button" class="btn ${s.shareFormat==='gif'?'primary':'ghost'}" id="settingsShareFormatGif" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:999px; font-size:13px;" onclick="setSettingsShareFormatChoice('gif')">GIF</button>
          </div>
        </div>
        `}
      </section>
      <section class="modal settings-section">
        <h3>Appearance</h3>
        <div class="field">
          <label>Default Theme</label>
          <div class="btn-toggle-row">
            <button type="button" class="btn ${s.defaultTheme==='light'?'primary':'ghost'}" id="settingsThemeLight" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:999px; font-size:13px;" onclick="setSettingsThemeChoice('light')">☉ Poké Ball</button>
            <button type="button" class="btn ${s.defaultTheme==='dark'?'primary':'ghost'}" id="settingsThemeDark" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:999px; font-size:13px;" onclick="setSettingsThemeChoice('dark')">☾ Beast Ball</button>
            <button type="button" class="btn ${s.defaultTheme==='custom'?'primary':'ghost'}" id="settingsThemeCustom" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:999px; font-size:13px;" onclick="setSettingsThemeChoice('custom')">⬢ Master Ball</button>
          </div>
        </div>
        <div id="customThemePanel" style="display:${s.defaultTheme==='custom'?'block':'none'}; margin-top:18px; padding-top:16px; border-top:1px solid var(--panel-border);">
          <div class="field" id="customStyleField">
            <label>Surface Style</label>
            <div class="btn-toggle-row">
              <button type="button" class="btn ${custom.style!=='neumorphic'?'primary':'ghost'}" id="customStyleGlass" style="flex:1; width:auto; height:auto; padding:10px 14px; border-radius:999px;" onclick="setCustomStyleChoice('glass')">Glassmorphic</button>
              <button type="button" class="btn ${custom.style==='neumorphic'?'primary':'ghost'}" id="customStyleNeumorphic" style="flex:1; width:auto; height:auto; padding:10px 14px; border-radius:999px;" onclick="setCustomStyleChoice('neumorphic')">Neumorphic</button>
            </div>
          </div>
          <div class="custom-color-grid">
            <div class="custom-color-field" id="customColorBgField" style="${bg.enabled ? 'display:none;' : ''}">
              <label for="customColorBg">Background</label>
              ${ColorPicker.field('customColorBg', 'Background', { value: custom.bg, def: defaultCustomTheme().bg, presets: 'surface', role: 'bg', against: 'customColorText' })}
            </div>
            <div class="custom-color-field" id="customColorTextField" style="${bg.enabled ? 'display:none;' : ''}">
              <label for="customColorText">Text</label>
              ${ColorPicker.field('customColorText', 'Text', { value: custom.text, def: defaultCustomTheme().text, presets: 'ink', role: 'fg', against: 'customColorBg' })}
            </div>
            <div class="custom-color-field">
              <label for="customColorAccent">Accent</label>
              ${ColorPicker.field('customColorAccent', 'Accent', { value: custom.accent, def: defaultCustomTheme().accent, presets: 'accent', role: 'fg', against: 'customColorBg' })}
            </div>
            <div class="custom-color-field">
              <label for="customColorAccent2">Accent / Highlight</label>
              ${ColorPicker.field('customColorAccent2', 'Accent / Highlight', { value: custom.accent2, def: defaultCustomTheme().accent2, presets: 'accent', role: 'fg', against: 'customColorBg' })}
            </div>
          </div>
          <div class="hint" style="margin-top:10px;">Pick a color or enter a hex code to preview it on the Master Ball theme.</div>
          <button type="button" class="btn ghost" style="margin-top:10px; width:auto; height:auto; padding:8px 14px; font-size:12.5px;" onclick="resetCustomThemeToDefault()">Reset Master Ball Colors to Default</button>
        <div class="field bg-section" style="margin-top:18px; padding-top:16px; border-top:1px solid var(--panel-border);">
          <div style="display:flex; align-items:center; gap:8px;">
            <label style="margin:0;">Custom Background</label>
            <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip">Master Ball theme only. Paints the page behind everything with one to five colors. Cards and text follow the Card Style you pick below, so choose a Card Style that stays readable on your colors.</span>
            </span>
            <label class="switch" style="margin-left:auto;">
              <input type="checkbox" id="settingsBgEnabled" aria-label="Custom background" ${bg.enabled ? 'checked' : ''}>
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
          </div>
          <div class="hint" style="margin-top:2px;">Master Ball theme only. One color is a solid background; two to five make a gradient. Turning it on hides the Background and Text colors, because Card Style sets them.</div>
          <div id="bgPanel" class="bg-panel" style="display:${bg.enabled ? 'block' : 'none'};">
            <div class="bg-sub" style="margin-top:0;">Card Style</div>
            <div class="btn-toggle-row bg-type-row" id="bgCardStyleRow">
              ${Object.keys(BG_CARD_STYLES).reverse().map(k => `<button type="button" class="btn ${bg.cardStyle === k ? 'primary' : 'ghost'}" data-bgcardstyle="${k}">${BG_CARD_STYLES[k].label}</button>`).join('')}
            </div>
            <div class="hint" style="margin-top:6px;">Light gives the cards the Poké Ball colors and Dark gives them the Beast Ball colors. Surface Style above still applies.</div>
            <div class="bg-preview" id="bgPreview" aria-hidden="true" style="margin-top:18px;"></div>
            <div class="bg-sub">Colors</div>
            <div id="bgColorList" class="bg-color-list"></div>
            <button type="button" class="btn ghost bg-add" id="bgAddColor">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Color
            </button>
            <div class="bg-sub">Style</div>
            <div class="btn-toggle-row bg-type-row" id="bgTypeRow">
              ${BG_TYPES.map(t => `<button type="button" class="btn ${bg.type === t ? 'primary' : 'ghost'}" data-bgtype="${t}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('')}
            </div>
            <div class="btn-toggle-row bg-type-row" id="bgShapeRow" style="margin-top:8px;">
              ${BG_SHAPES.map(sh => `<button type="button" class="btn ${bg.shape === sh ? 'primary' : 'ghost'}" data-bgshape="${sh}">${sh.charAt(0).toUpperCase() + sh.slice(1)}</button>`).join('')}
            </div>
            <div class="bg-pos" id="bgPosWrap">
              <div class="bg-slider-head"><label>Center</label></div>
              <div class="bg-pos-grid" id="bgPosGrid">
                ${[0, 50, 100].map(y => [0, 50, 100].map(x => `<button type="button" class="bg-pos-dot" data-x="${x}" data-y="${y}" aria-label="Center ${y === 0 ? 'top' : y === 50 ? 'middle' : 'bottom'} ${x === 0 ? 'left' : x === 50 ? 'center' : 'right'}"></button>`).join('')).join('')}
              </div>
            </div>
            <div class="bg-sub">Controls</div>
            ${BG_SLIDERS.filter(sl => !sl.afterToggle).map(sl => bgSliderHTML(sl, bg)).join('')}
            <div class="bg-toggle-row">
              <label for="bgAnimate" style="margin:0;">Animation</label>
              <label class="switch" style="margin-left:auto;">
                <input type="checkbox" id="bgAnimate" ${bg.animate ? 'checked' : ''}>
                <span class="track"></span>
                <span class="thumb"></span>
              </label>
            </div>
            ${BG_SLIDERS.filter(sl => sl.afterToggle).map(sl => bgSliderHTML(sl, bg)).join('')}
            <div class="bg-actions">
              <button type="button" class="btn ghost" id="bgSurprise">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>
                Surprise Me!
              </button>
              <button type="button" class="btn ghost" id="bgReset">Reset</button>
            </div>
          </div>
        </div>
        </div>
      </section>
      <section class="modal settings-section">
        <h3>Fonts</h3>
        <div class="field">
          <div class="card" id="fontPreviewCard" style="margin-bottom:14px; cursor:default; --glow:${TYPE_HEX.Fire}; --type-tint-1:${previewTint1}; --type-tint-2:${previewTint2}; border-color:${previewBorder}; --glow-c1:${previewGlowC1}; --glow-c2:${previewGlowC2}; --glow-c3:${previewGlowC3};">
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
          <div class="hint" style="margin-top:2px; margin-bottom:10px;">Nicknames can have their own stylish font, separate from the readable font used everywhere else.</div>
          ${fontPickerFieldHTML('body', 'General Font', 'Used for everything except Pokémon nicknames.', bodyFont)}
          <div style="margin-top:16px;">
            ${fontPickerFieldHTML('nickname', 'Nickname Font', 'Used only for Pokémon nicknames, on cards and in the detail view.', nicknameFont)}
          </div>
          <div style="margin-top:16px;">
            ${fontPickerFieldHTML('mono', 'Monospace Font', 'Used for stat labels, tags, dex numbers, and other monospace text.', monoFont)}
          </div>
        </div>
      </section>
        ${s.easterEggUnlocked ? `
      <section class="modal settings-section">
        <h3>Easter Egg</h3>
        <div class="field">
          <label style="display:flex; align-items:center; gap:6px;">Easter Egg
            <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip">Selecting Shiny Suicune makes Pikachu the rare one. Selecting Pikachu makes Shiny Suicune the rare one.</span>
            </span>
          </label>
          <div class="hint" style="margin-top:2px; margin-bottom:10px;">Pick which one runs across the footer permanently.</div>
          <div class="btn-toggle-row">
            <button type="button" class="btn ${s.easterEggPreferred!=='suicune'?'primary':'ghost'}" id="settingsEasterEggPikachu" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:999px; font-size:13px;" onclick="setSettingsEasterEggChoice('pikachu')">Pikachu</button>
            <button type="button" class="btn ${s.easterEggPreferred==='suicune'?'primary':'ghost'}" id="settingsEasterEggSuicune" style="flex:1; width:auto; height:auto; padding:10px 10px; border-radius:999px; font-size:13px;" onclick="setSettingsEasterEggChoice('suicune')">Shiny Suicune</button>
          </div>
        </div>
        <div class="field" style="margin-top:16px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <label for="settingsHiddenAvatars" style="margin:0;">Hidden Trainer Avatars</label>
            <span class="info-tooltip-trigger" tabindex="0" data-no-autofocus>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span class="info-tooltip">Shows the hidden Trainer Avatars in the avatar picker, next to their regular versions. Turning this off only hides them from the list. A Trainer already using one keeps it.</span>
            </span>
            <label class="switch" style="margin-left:auto;">
              <input type="checkbox" id="settingsHiddenAvatars" ${hiddenAvatarsEnabled ? 'checked' : ''}>
              <span class="track"></span>
              <span class="thumb"></span>
            </label>
          </div>
        </div>
      </section>` : ''}
      </div>
      <div class="modal settings-foot">
        <button type="button" class="btn ghost" style="color:#F4A6BA;" onclick="resetAllPreferencesToDefault()">Reset to Default</button>
        <div style="display:flex; gap:10px;">
          <button type="button" class="btn ghost" onclick="closeSettings()">Cancel</button>
          <button type="button" class="btn primary" onclick="saveSettings()">Save Settings</button>
        </div>
      </div>
    </div>
  `;
  const interactionGroup = document.getElementById('settingsInteractionStyle');
  interactionGroup.onclick = event => {
    const button = event.target.closest('[data-style-choice]');
    if(!button) return;
    state.settings = { ...state.settings, detailViewStyle:button.dataset.styleChoice };
    for(const choice of interactionGroup.querySelectorAll('button')){
      choice.classList.toggle('active',choice === button);
      choice.setAttribute('aria-pressed',String(choice === button));
    }
    scheduleAutosave();
  };
  settingsThemeDraft = s.defaultTheme === 'dark' ? 'dark' : (s.defaultTheme === 'custom' ? 'custom' : 'light');
  customStyleDraft = custom.style === 'neumorphic' ? 'neumorphic' : 'glass';
  ColorPicker.bind(document.getElementById('customThemePanel'), previewCustomTheme);
  if(settingsThemeDraft === 'custom') previewCustomTheme();
  fontDrafts.body = { type: bodyFont.type || 'default', googleName: bodyFont.googleName || '', localName: bodyFont.localName || '', localData: bodyFont.localData || '' };
  fontDrafts.nickname = { type: nicknameFont.type || 'default', googleName: nicknameFont.googleName || '', localName: nicknameFont.localName || '', localData: nicknameFont.localData || '' };
  fontDrafts.mono = { type: monoFont.type || 'default', googleName: monoFont.googleName || '', localName: monoFont.localName || '', localData: monoFont.localData || '' };
  settingsShareFormatDraft = s.shareFormat === 'gif' ? 'gif' : 'apng';
  settingsEasterEggDraft = s.easterEggPreferred === 'suicune' ? 'suicune' : 'pikachu';  document.getElementById('fontGoogleNameBody').addEventListener('input', () => handleGoogleFontNameInput('body'));
  document.getElementById('fontGoogleNameNickname').addEventListener('input', () => handleGoogleFontNameInput('nickname'));
  setupBackgroundControls(bg);
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
let settingsEasterEggDraft = 'pikachu';
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
    ColorPicker.set(document.getElementById(`customColor${key}`), def[field]);
  });
  setCustomStyleChoice('glass');
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
    detailViewStyle: 'floating',
    cardFooterInfo: 'arrow',
    sortBallsAlpha: false,
    sortGamesAlpha: false,
    strangeBallDisplay: false,
    showRestrictedRibbons: true,
    showRibbonHelperByDefault: true,
    // Not a display preference in the same sense as the rest of this -- it's a hidden
    // unlock, so "Reset to Default" doesn't re-lock it or clear the chosen ball.
    easterEggUnlocked: !!(previous && previous.easterEggUnlocked),
    easterEggPreferred: (previous && previous.easterEggPreferred) || 'pikachu',
    hiddenAvatarsEnabled: !(previous && previous.hiddenAvatarsEnabled === false),
    background: defaultBackground()
  };
  scheduleAutosave();
  applySettings();
  renderGrid();
  refreshAllOpenAchievementsSections();
  renderSettingsPage();
  showToast('Preferences reset to default.', {
    label: 'Undo',
    onClick: () => {
      state.settings = previous || state.settings;
      applySettings();
      renderGrid();
      refreshAllOpenAchievementsSections();
      renderSettingsPage();
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
  if(theme === 'custom'){
    bgLivePreview(); // restore the unsaved background draft the Master Ball panel is showing
    previewCustomTheme();
  } else restorePreviewTheme();
}

function setSettingsShareFormatChoice(format){
  settingsShareFormatDraft = format;
  document.getElementById('settingsShareFormatApng').classList.toggle('primary', format!=='gif');
  document.getElementById('settingsShareFormatApng').classList.toggle('ghost', format==='gif');
  document.getElementById('settingsShareFormatGif').classList.toggle('primary', format==='gif');
  document.getElementById('settingsShareFormatGif').classList.toggle('ghost', format!=='gif');
}

function setSettingsEasterEggChoice(choice){
  settingsEasterEggDraft = choice;
  document.getElementById('settingsEasterEggPikachu').classList.toggle('primary', choice!=='suicune');
  document.getElementById('settingsEasterEggPikachu').classList.toggle('ghost', choice==='suicune');
  document.getElementById('settingsEasterEggSuicune').classList.toggle('primary', choice==='suicune');
  document.getElementById('settingsEasterEggSuicune').classList.toggle('ghost', choice!=='suicune');
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
    bg: ColorPicker.get(document.getElementById('customColorBg')),
    text: ColorPicker.get(document.getElementById('customColorText')),
    accent: ColorPicker.get(document.getElementById('customColorAccent')),
    accent2: ColorPicker.get(document.getElementById('customColorAccent2'))
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

function saveSettings(){
  const defaultSort = document.getElementById('settingsDefaultSort').value;
  const cardFooterInfo = document.getElementById('settingsCardFooterInfo').value;
  const sortBallsAlpha = document.getElementById('settingsSortBallsAlpha').checked;
  const sortGamesAlpha = document.getElementById('settingsSortGamesAlpha').checked;
  const strangeBallDisplay = document.getElementById('settingsStrangeBallDisplay').checked;
  const showRestrictedRibbons = document.getElementById('settingsShowRestrictedRibbons').checked;
  const showRibbonHelperByDefault = document.getElementById('settingsShowRibbonHelperByDefault').checked;
  // Not editable here -- easterEggUnlocked only flips via the secret click sequence in
  // the footer, and this rebuild would otherwise silently drop it back to its default.
  const easterEggUnlocked = !!(state.settings && state.settings.easterEggUnlocked);
  const easterEggPreferred = settingsEasterEggDraft;
  // The toggle only exists once the Easter Egg is unlocked, so keep the saved value when it isn't on the page.
  const hiddenAvatarsToggle = document.getElementById('settingsHiddenAvatars');
  const hiddenAvatarsEnabled = hiddenAvatarsToggle ? hiddenAvatarsToggle.checked : !(state.settings && state.settings.hiddenAvatarsEnabled === false);
  const custom = settingsThemeDraft === 'custom' ? readCustomColorsFromInputs() : (state.settings && state.settings.custom) || defaultCustomTheme();
  const bodyFont = { ...fontDrafts.body };
  const nicknameFont = { ...fontDrafts.nickname };
  const monoFont = { ...fontDrafts.mono };
  const background = normalizeBackground({ ...bgDraft });
  state.settings = { ...state.settings, background, defaultSort, defaultTheme: settingsThemeDraft, custom, bodyFont, nicknameFont, monoFont, shareFormat: settingsShareFormatDraft, cardFooterInfo, sortBallsAlpha, sortGamesAlpha, strangeBallDisplay, showRestrictedRibbons, showRibbonHelperByDefault, easterEggUnlocked, easterEggPreferred, hiddenAvatarsEnabled };
  scheduleAutosave();
  // The footer runner only re-reads this preference the next time it happens to
  // redraw itself (on the next rare appearance/revert cycle), which could be minutes
  // away -- refresh it now so picking a new one in Settings takes effect immediately.
  if(typeof easterEggShowBase === 'function') easterEggShowBase();
  applySettings();
  populateGameFilter();
  renderGrid();
  refreshAllOpenAchievementsSections();
  closeSettings();
  showToast('Settings saved, they\u2019ll be included in your next export.');
}


/* ============== SETTINGS ROUTE (#/settings) ============== */
const SETTINGS_ROUTE = '#/settings';
let settingsPushed = false;      // true when this page was opened from inside the app, so Back can use history
let settingsReturnScroll = 0;
let settingsBaseTitle = document.title;
const isSettingsRoute = () => location.hash === SETTINGS_ROUTE;
const settingsPageOpen = () => document.documentElement.classList.contains('route-settings');

function openSettings(){
  if(isSettingsRoute()){ showSettingsPage(); return; }
  settingsPushed = true;
  location.hash = SETTINGS_ROUTE; // hashchange shows the page
}
function closeSettings(){
  if(!settingsPageOpen() && !isSettingsRoute()) return;
  if(settingsPushed){
    settingsPushed = false;
    history.back();
  } else {
    history.replaceState(null, '', location.pathname + location.search);
    syncSettingsRoute();
  }
}
function showSettingsPage(){
  const page = document.getElementById('settingsPage');
  if(!page) return;
  if(!settingsPageOpen()) settingsReturnScroll = window.scrollY;
  closeAllDropdowns();
  document.documentElement.classList.add('route-settings');
  page.hidden = false;
  settingsBaseTitle = settingsBaseTitle || document.title;
  document.title = 'Settings · ' + settingsBaseTitle.replace(/^Settings · /, '');
  setSettingsButtonMode(true);
  renderSettingsPage();
  window.scrollTo(0, 0);
}
function hideSettingsPage(){
  const page = document.getElementById('settingsPage');
  if(!page || !settingsPageOpen()) return;
  ColorPicker.close(false);
  document.documentElement.classList.remove('route-settings');
  page.hidden = true;
  page.innerHTML = '';
  document.title = settingsBaseTitle;
  setSettingsButtonMode(false);
  applySettings(); // discards any unsaved live preview (theme colors, background)
  window.scrollTo(0, settingsReturnScroll);
}
// The header's Settings button turns into a Home button while the page is open (the icons cross-fade in CSS).
function setSettingsButtonMode(open){
  const btn = document.getElementById('settingsBtn');
  if(!btn) return;
  const label = open ? 'Back to Pokédex' : 'Settings';
  btn.title = label;
  btn.setAttribute('aria-label', label);
}
function syncSettingsRoute(){ if(isSettingsRoute()) showSettingsPage(); else hideSettingsPage(); }
function refreshSettingsPage(){ if(settingsPageOpen()) renderSettingsPage(); }
function initSettingsRoute(){
  window.addEventListener('hashchange', syncSettingsRoute);
  document.getElementById('settingsBtn').addEventListener('click', () => { if(settingsPageOpen()) closeSettings(); else openSettings(); });
  settingsBaseTitle = document.title;
  syncSettingsRoute(); // a direct visit to /index.html#/settings
}

/* ============== BACKGROUND EDITOR ============== */
let bgDraft = defaultBackground();

const BG_SLIDERS = [
  { id: 'bgDirection', key: 'direction', label: 'Gradient Direction', min: 0, max: 360, step: 5, unit: '°', hint: '' },
  { id: 'bgIntensity', key: 'intensity', label: 'Color Intensity', min: 0, max: 100, step: 1, unit: '%', hint: '' },
  { id: 'bgSmoothness', key: 'smoothness', label: 'Smoothness', min: 0, max: 100, step: 1, unit: '%', hint: 'Lower values turn the blend into hard bands of color. Moving this resets custom stop positions.' },
  { id: 'bgGrain', key: 'grain', label: 'Grain', min: 0, max: 100, step: 1, unit: '%', hint: 'Adds a fine film-style noise over the colors.' },
  { id: 'bgVignette', key: 'vignette', label: 'Vignette', min: 0, max: 100, step: 1, unit: '%', hint: 'Darkens the edges of the page.' },
  { id: 'bgAnimSpeed', key: 'animSpeed', label: 'Animation Speed', min: 0, max: 100, step: 1, unit: '', hint: 'Slow on the left, fast on the right. Stays still if your device prefers reduced motion.', afterToggle: true }
];
function bgSliderHTML(sl, bg){
  return `
            <div class="bg-slider" id="${sl.id}Row">
              <div class="bg-slider-head"><label for="${sl.id}">${sl.label}</label><span id="${sl.id}Val"></span></div>
              <input type="range" id="${sl.id}" min="${sl.min}" max="${sl.max}" step="${sl.step}" value="${bg[sl.key]}">
              ${sl.hint ? `<div class="hint bg-slider-hint">${sl.hint}</div>` : ''}
            </div>`;
}

function bgLivePreview(){
  applyBackground(bgDraft.enabled ? bgDraft : null);
  const bar = document.getElementById('bgPreview');
  if(!bar) return;
  bar.style.background = bgGradient(bgDraft, 1, { type: 'linear', direction: 90 });
  const n = bgDraft.colors.length;
  const marks = n === 1 ? [50] : bgStopPositions(bgDraft, false);
  bar.innerHTML = bgDraft.colors.map((c, i) =>
    `<span class="bg-stop" style="left:${+Number(marks[i]).toFixed(2)}%; background:${c};"></span>`).join('');
  const single = n < 2, type = bgDraft.type;
  // Turning the background on hands the Background and Text colors to Card Style, so those options go away.
  ['customColorBgField', 'customColorTextField'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = bgDraft.enabled ? 'none' : '';
  });
  BG_SLIDERS.forEach(sl => {
    const el = document.getElementById(sl.id), val = document.getElementById(sl.id + 'Val'), row = document.getElementById(sl.id + 'Row');
    if(!el) return;
    el.value = bgDraft[sl.key];
    val.textContent = sl.key === 'animSpeed' ? (bgDraft.animSpeed < 34 ? 'Slow' : bgDraft.animSpeed > 66 ? 'Fast' : 'Medium') : `${bgDraft[sl.key]}${sl.unit}`;
    if(sl.afterToggle) row.style.display = bgDraft.animate ? '' : 'none';
    // Direction only applies to linear and conic; blending controls need two or more colors.
    if(sl.key === 'direction') row.style.display = type === 'radial' ? 'none' : '';
    const needsGradient = sl.key === 'direction' || sl.key === 'smoothness';
    el.disabled = needsGradient && single;
    row.classList.toggle('is-disabled', el.disabled);
    el.title = el.disabled ? 'Add a second color to make a gradient.' : '';
  });
  document.getElementById('bgPosWrap').style.display = type === 'linear' ? 'none' : '';
  document.getElementById('bgShapeRow').style.display = type === 'radial' ? '' : 'none';
  document.querySelectorAll('#bgShapeRow [data-bgshape]').forEach(b => {
    const on = b.dataset.bgshape === bgDraft.shape;
    b.classList.toggle('primary', on); b.classList.toggle('ghost', !on);
  });
  document.querySelectorAll('#bgCardStyleRow [data-bgcardstyle]').forEach(b => {
    const on = b.dataset.bgcardstyle === bgDraft.cardStyle;
    b.classList.toggle('primary', on); b.classList.toggle('ghost', !on);
  });
  // Keep each color's stop field in step with the gradient (positions can change when colors or Smoothness do).
  const pos = bgStopPositions(bgDraft, type === 'conic');
  document.querySelectorAll('#bgColorList [data-stop]').forEach(inp => {
    if(document.activeElement !== inp) inp.value = +Number(pos[+inp.dataset.stop]).toFixed(2);
  });
  document.querySelectorAll('#bgTypeRow [data-bgtype]').forEach(b => {
    const on = b.dataset.bgtype === type;
    b.classList.toggle('primary', on); b.classList.toggle('ghost', !on);
  });
  document.querySelectorAll('#bgPosGrid .bg-pos-dot').forEach(d => {
    d.classList.toggle('on', +d.dataset.x === bgDraft.posX && +d.dataset.y === bgDraft.posY);
  });
}
function renderBgColorList(){
  const list = document.getElementById('bgColorList');
  if(!list) return;
  list.innerHTML = bgDraft.colors.map((c, i) => `
    <div class="bg-color-row">
      ${ColorPicker.field(`bgColor${i}`, `Background color ${i + 1}`, { value: c, def: c, presets: 'accent', role: 'bg' })}
      <label class="bg-stop-field" title="Where this color sits in the gradient">
        <input type="number" class="bg-stop-input" data-stop="${i}" min="0" max="100" step="1" aria-label="Stop position for color ${i + 1}" ${bgDraft.colors.length < 2 ? 'disabled' : ''}>
        <span>%</span>
      </label>
      <button type="button" class="btn ghost bg-remove" data-remove="${i}" aria-label="Remove color ${i + 1}" title="Remove color" ${bgDraft.colors.length <= 1 ? 'disabled' : ''}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>`).join('');
  ColorPicker.bind(list, (btn, hex) => {
    const i = +btn.id.replace('bgColor', '');
    bgDraft.colors[i] = hex.toUpperCase();
    bgLivePreview();
  });
  list.querySelectorAll('[data-stop]').forEach(inp => inp.addEventListener('input', () => {
    const i = +inp.dataset.stop, v = parseFloat(inp.value);
    if(!isFinite(v)) return;
    // Editing a stop switches from Smoothness-derived positions to explicit ones, kept ascending.
    const stops = bgStopPositions(bgDraft, bgDraft.type === 'conic').map(x => +Number(x).toFixed(2));
    stops[i] = Math.max(0, Math.min(100, v));
    for(let j = i + 1; j < stops.length; j++) stops[j] = Math.max(stops[j], stops[i]);
    for(let j = i - 1; j >= 0; j--) stops[j] = Math.min(stops[j], stops[i]);
    bgDraft.stops = stops;
    bgLivePreview();
  }));
  // While typing, the field is left alone; once focus leaves it, show the clamped and ordered value.
  list.querySelectorAll('[data-stop]').forEach(inp => inp.addEventListener('blur', bgLivePreview));
  list.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
    if(bgDraft.colors.length <= 1) return;
    ColorPicker.close(false);
    bgDraft.colors.splice(+b.dataset.remove, 1);
    bgDraft.stops = null; // positions are recalculated for the new number of colors
    renderBgColorList();
    bgLivePreview();
  }));
  const add = document.getElementById('bgAddColor');
  if(add){
    const full = bgDraft.colors.length >= BG_MAX_COLORS;
    add.disabled = full;
    add.title = full ? `Up to ${BG_MAX_COLORS} colors.` : '';
  }
}
function hslToHex(h, s, l){
  const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
}
function randomBgPalette(n){
  const base = Math.random() * 360, spread = [24, 40, 70, 120][Math.floor(Math.random() * 4)];
  return Array.from({ length: n }, (_, i) =>
    hslToHex((base + i * spread + (Math.random() * 12 - 6) + 360) % 360, 0.5 + Math.random() * 0.35, 0.42 + Math.random() * 0.22));
}
function setupBackgroundControls(saved){
  bgDraft = normalizeBackground(saved);
  renderBgColorList();
  bgLivePreview();
  const $ = id => document.getElementById(id);
  $('settingsBgEnabled').addEventListener('change', (e) => {
    bgDraft.enabled = e.target.checked;
    $('bgPanel').style.display = bgDraft.enabled ? 'block' : 'none';
    ColorPicker.close(false);
    bgLivePreview();
  });
  $('bgAddColor').addEventListener('click', () => {
    if(bgDraft.colors.length >= BG_MAX_COLORS) return;
    ColorPicker.close(false);
    bgDraft.colors.push(randomBgPalette(1)[0]);
    bgDraft.stops = null;
    renderBgColorList();
    bgLivePreview();
  });
  BG_SLIDERS.forEach(sl => $(sl.id).addEventListener('input', (e) => {
    bgDraft[sl.key] = +e.target.value;
    if(sl.key === 'smoothness') bgDraft.stops = null; // Smoothness drives positions again
    bgLivePreview();
  }));
  document.querySelectorAll('#bgShapeRow [data-bgshape]').forEach(b => b.addEventListener('click', () => { bgDraft.shape = b.dataset.bgshape; bgLivePreview(); }));
  document.querySelectorAll('#bgCardStyleRow [data-bgcardstyle]').forEach(b => b.addEventListener('click', () => {
    bgDraft.cardStyle = b.dataset.bgcardstyle;
    bgLivePreview();
  }));
  document.querySelectorAll('#bgTypeRow [data-bgtype]').forEach(b => b.addEventListener('click', () => { bgDraft.type = b.dataset.bgtype; bgLivePreview(); }));
  document.querySelectorAll('#bgPosGrid .bg-pos-dot').forEach(d => d.addEventListener('click', () => { bgDraft.posX = +d.dataset.x; bgDraft.posY = +d.dataset.y; bgLivePreview(); }));
  $('bgAnimate').addEventListener('change', (e) => { bgDraft.animate = e.target.checked; bgLivePreview(); });
  $('bgSurprise').addEventListener('click', () => {
    ColorPicker.close(false);
    bgDraft.colors = randomBgPalette(Math.max(2, bgDraft.colors.length));
    bgDraft.stops = null;
    bgDraft.type = ['linear', 'linear', 'radial', 'conic'][Math.floor(Math.random() * 4)];
    bgDraft.direction = Math.floor(Math.random() * 73) * 5;
    bgDraft.smoothness = Math.random() < 0.8 ? 100 : Math.floor(Math.random() * 60);
    bgDraft.grain = Math.floor(Math.random() * 35);
    bgDraft.vignette = Math.floor(Math.random() * 40);
    renderBgColorList();
    bgLivePreview();
  });
  $('bgReset').addEventListener('click', () => {
    ColorPicker.close(false);
    bgDraft = { ...defaultBackground(), enabled: bgDraft.enabled };
    $('bgAnimate').checked = bgDraft.animate;
    renderBgColorList();
    bgLivePreview();
  });
}
