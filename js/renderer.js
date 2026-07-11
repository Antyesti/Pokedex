/* ============== RENDER ============== */
const gridWrap = document.getElementById('gridWrap');
const statsBar = document.getElementById('statsBar');
const typeFilter = document.getElementById('typeFilter');
const gameFilter = document.getElementById('gameFilter');
const sortFilter = document.getElementById('sortFilter');
const searchInput = document.getElementById('searchInput');
let gridDensity = 'cozy'; // 'cozy' (3/row, default) or 'dense' (6/row)
let shinyOnly = false;
let megaOnly = false;
let gigantamaxOnly = false;

function init(){
  document.documentElement.style.setProperty('--shiny-icon-url', `url("${SHINY_ICON}")`);
  document.getElementById('megaFilterIcon').src = MEGA_ICON;
  document.getElementById('gigantamaxFilterIcon').src = GIGANTAMAX_ICON;
  const autosaved = loadAutosavedState();
  if(autosaved){
    state.trainer = typeof autosaved.trainer === 'string' ? autosaved.trainer : '';
    state.settings = (autosaved.settings && typeof autosaved.settings === 'object') ? autosaved.settings : state.settings;
    state.pokemon = autosaved.pokemon.map(normalizePokemon);
  } else {
    seedData();
  }
  applySettings();
  TYPES.forEach(t=>{
    const o = document.createElement('option');
    o.value = t; o.textContent = t;
    typeFilter.appendChild(o);
  });
  document.querySelectorAll('#viewToggle .view-toggle-btn').forEach(btn=>{
    btn.addEventListener('click', () => {
      gridDensity = btn.dataset.density;
      document.querySelectorAll('#viewToggle .view-toggle-btn').forEach(b=>b.classList.toggle('active', b===btn));
      renderGrid();
    });
  });
  const shinyBtn = document.getElementById('shinyFilterBtn');
  shinyBtn.addEventListener('click', () => {
    shinyOnly = !shinyOnly;
    shinyBtn.classList.toggle('active', shinyOnly);
    shinyBtn.setAttribute('aria-pressed', String(shinyOnly));
    renderGrid();
  });
  const megaBtn = document.getElementById('megaFilterBtn');
  megaBtn.addEventListener('click', () => {
    megaOnly = !megaOnly;
    megaBtn.classList.toggle('active', megaOnly);
    megaBtn.setAttribute('aria-pressed', String(megaOnly));
    renderGrid();
  });
  const gigantamaxBtn = document.getElementById('gigantamaxFilterBtn');
  gigantamaxBtn.addEventListener('click', () => {
    gigantamaxOnly = !gigantamaxOnly;
    gigantamaxBtn.classList.toggle('active', gigantamaxOnly);
    gigantamaxBtn.setAttribute('aria-pressed', String(gigantamaxOnly));
    renderGrid();
  });
  render();
}

function populateGameFilter(){
  const games = new Set();
  state.pokemon.forEach(p => { if(p.originGame) games.add(p.originGame); });
  const current = gameFilter.value;
  const sorted = [...games].sort((a,b)=>a.localeCompare(b));
  gameFilter.innerHTML = `<option value="">All Origin Games</option>` +
    sorted.map(g => `<option value="${escapeAttr(g)}">${escapeHTML(g)}</option>`).join('');
  if(sorted.includes(current)) gameFilter.value = current;
}

function render(){
  renderTrainer();
  renderStats();
  populateGameFilter();
  renderGrid();
}

function renderTrainer(){
  const name = (state.trainer||'').trim();
  document.getElementById('dexTitle').textContent = name ? `${name}'s Pokédex` : 'Pokédex';
  document.getElementById('trainerLabel').textContent = name ? `Trainer · ${name}` : 'Personal Roster Records';
}

const CUSTOM_THEME_VARS = [
  '--bg','--text','--text-dim','--text-faint',
  '--accent','--accent-2','--accent-grad-1','--accent-grad-2','--btn-primary-text',
  '--panel','--panel-border','--panel-hi',
  '--nm-shadow-out','--nm-shadow-out-sm','--nm-shadow-in','--nm-shadow-hover',
  '--nm-highlight-rgb','--nm-shadow-rgb','--nm-highlight-a','--nm-shadow-a','--nm-highlight-a-hover',
  '--hairline','--select-option-bg','--select-option-text'
];

function setTheme(theme){
  const html = document.documentElement;
  const btn = document.getElementById('themeToggleBtn');
  html.setAttribute('data-theme', theme);
  html.removeAttribute('data-style');
  // clear inline custom-theme variables from a previous Master Ball session, since
  // inline styles would otherwise override this theme's stylesheet values
  CUSTOM_THEME_VARS.forEach(v => html.style.removeProperty(v));
  document.getElementById('themeIconMoon').style.display = theme === 'light' ? 'none' : '';
  document.getElementById('themeIconSun').style.display = theme === 'light' ? '' : 'none';
  document.getElementById('themeIconCustom').style.display = 'none';
  if(btn) btn.title = theme === 'light' ? 'Switch to Beast Ball Theme' : 'Switch to Master Ball Theme';
}

/* ---- Master Ball (custom) theme color math ---- */
function hexToRgbArr(hex){
  hex = (hex||'#000000').replace('#','');
  if(hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  const num = parseInt(hex, 16);
  return [(num>>16)&255, (num>>8)&255, num&255];
}
function rgbToHex(r,g,b){
  return '#' + [r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
// WCAG-style relative luminance, used only to decide "is this background light or dark"
function relativeLuminance([r,g,b]){
  const srgb = [r,g,b].map(v => v/255).map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}
function mixRgb(rgb, target, amount){
  return rgb.map((c,i) => c + (target[i]-c)*amount);
}
function rgbaStr(rgb, alpha){ return `rgba(${Math.round(rgb[0])},${Math.round(rgb[1])},${Math.round(rgb[2])},${alpha})`; }

function applyCustomTheme(custom){
  const html = document.documentElement;
  const btn = document.getElementById('themeToggleBtn');
  html.setAttribute('data-theme', 'custom');
  html.setAttribute('data-style', custom.style === 'neumorphic' ? 'neumorphic' : 'glass');
  document.getElementById('themeIconMoon').style.display = 'none';
  document.getElementById('themeIconSun').style.display = 'none';
  document.getElementById('themeIconCustom').style.display = '';
  if(btn) btn.title = 'Switch to Poké Ball Theme';

  const bgRgb = hexToRgbArr(custom.bg);
  const lum = relativeLuminance(bgRgb);
  const isLightBg = lum > 0.5;

  const style = html.style;
  style.setProperty('--bg', custom.bg);
  style.setProperty('--text', custom.text);
  style.setProperty('--text-dim', rgbaStr(hexToRgbArr(custom.text), 0.65));
  style.setProperty('--text-faint', rgbaStr(hexToRgbArr(custom.text), 0.42));
  style.setProperty('--accent', custom.accent);
  style.setProperty('--accent-2', custom.accent2);
  style.setProperty('--accent-grad-1', custom.accent);
  style.setProperty('--accent-grad-2', custom.accent2);
  style.setProperty('--btn-primary-text', isLightBg ? '#1a1a1a' : '#fff');
  style.setProperty('--hairline', rgbaStr(hexToRgbArr(custom.text), 0.12));
  // Native <option> elements render with the OS popup layer, which only respects
  // background-color/color -- derive an explicit light/dark choice from luminance.
  style.setProperty('--select-option-bg', isLightBg ? '#ffffff' : '#1a1a1a');
  style.setProperty('--select-option-text', custom.text);

  if(custom.style === 'neumorphic'){
    // Derive shadow tones from the chosen background color rather than fixed white/black,
    // so a dark custom background still gets a perceptible neumorphic effect.
    const highlightMix = isLightBg ? 0.92 : 0.35;
    const shadowMix = isLightBg ? 0.10 : 0.55;
    const highlightRgb = mixRgb(bgRgb, [255,255,255], highlightMix);
    const shadowRgb = mixRgb(bgRgb, [0,0,0], shadowMix);
    const hA = isLightBg ? 0.85 : 0.18;
    const sA = isLightBg ? 0.16 : 0.55;
    style.setProperty('--panel', custom.bg);
    style.setProperty('--panel-border', 'transparent');
    style.setProperty('--panel-hi', custom.bg);
    style.setProperty('--nm-shadow-out', `-7px -7px 14px ${rgbaStr(highlightRgb,hA)}, 7px 7px 16px ${rgbaStr(shadowRgb,sA)}`);
    style.setProperty('--nm-shadow-out-sm', `-4px -4px 8px ${rgbaStr(highlightRgb,hA)}, 4px 4px 10px ${rgbaStr(shadowRgb,sA*0.94)}`);
    style.setProperty('--nm-shadow-in', `inset -5px -5px 10px ${rgbaStr(highlightRgb,hA*0.8)}, inset 5px 5px 12px ${rgbaStr(shadowRgb,sA*1.1)}`);
    style.setProperty('--nm-shadow-hover', `-9px -9px 18px ${rgbaStr(highlightRgb,hA*1.05)}, 9px 9px 20px ${rgbaStr(shadowRgb,sA*1.1)}`);
    style.setProperty('--nm-highlight-rgb', `${Math.round(highlightRgb[0])},${Math.round(highlightRgb[1])},${Math.round(highlightRgb[2])}`);
    style.setProperty('--nm-shadow-rgb', `${Math.round(shadowRgb[0])},${Math.round(shadowRgb[1])},${Math.round(shadowRgb[2])}`);
    style.setProperty('--nm-highlight-a', hA);
    style.setProperty('--nm-shadow-a', sA);
    style.setProperty('--nm-highlight-a-hover', Math.min(1, hA*1.06));
  } else {
    style.setProperty('--panel', isLightBg ? rgbaStr([255,255,255], 0.5) : rgbaStr([255,255,255], 0.045));
    style.setProperty('--panel-border', rgbaStr(isLightBg ? [0,0,0] : [255,255,255], isLightBg ? 0.08 : 0.09));
    style.setProperty('--panel-hi', rgbaStr([255,255,255], isLightBg ? 0.6 : 0.08));
    style.setProperty('--nm-shadow-out', 'none');
    style.setProperty('--nm-shadow-out-sm', 'none');
    style.setProperty('--nm-shadow-in', 'none');
    style.setProperty('--nm-shadow-hover', 'none');
    style.setProperty('--nm-highlight-rgb', isLightBg ? '255,255,255' : '255,255,255');
    style.setProperty('--nm-shadow-rgb', '0,0,0');
  }
}

/* ---- Custom fonts (Google Fonts or a font file from the local device) ----
   Two independent slots: "body" (--sans, everything except nicknames) and
   "nickname" (--nickname-font, Pokémon nicknames only). */
const FONT_SLOT_VAR = { body:'--sans', nickname:'--nickname-font' };
const ACTIVE_LOCAL_FONT_FAMILY = { body:'PokedexActiveLocalFontBody', nickname:'PokedexActiveLocalFontNickname' };
let activeLocalFontFaces = { body:null, nickname:null };

function ensureGoogleFontLink(slot, name){
  if(!name) return;
  const linkId = `googleFontLink_${slot}`;
  let link = document.getElementById(linkId);
  if(!link){
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  const family = encodeURIComponent(name).replace(/%20/g, '+');
  link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;600;700;800&display=swap`;
}

async function applyLocalFont(slot, dataUrl){
  try{
    const familyName = ACTIVE_LOCAL_FONT_FAMILY[slot];
    const face = new FontFace(familyName, `url(${dataUrl})`);
    await face.load();
    // drop any previously loaded local font face first, otherwise document.fonts keeps
    // accumulating stale entries every time a different file is chosen
    if(activeLocalFontFaces[slot]) document.fonts.delete(activeLocalFontFaces[slot]);
    document.fonts.add(face);
    activeLocalFontFaces[slot] = face;
    return true;
  } catch(err){
    return false;
  }
}

function applyFontSlot(slot, font){
  const html = document.documentElement;
  const cssVar = FONT_SLOT_VAR[slot];
  if(!font || font.type === 'google' && !font.googleName || font.type === 'local' && !font.localData){
    html.style.removeProperty(cssVar);
    return;
  }
  if(font.type === 'google'){
    ensureGoogleFontLink(slot, font.googleName);
    html.style.setProperty(cssVar, `'${font.googleName}', sans-serif`);
  } else if(font.type === 'local'){
    applyLocalFont(slot, font.localData).then(ok => {
      if(ok) html.style.setProperty(cssVar, `'${ACTIVE_LOCAL_FONT_FAMILY[slot]}', sans-serif`);
    });
  } else {
    html.style.removeProperty(cssVar);
  }
}

function applySettings(){
  const s = state.settings || { defaultSort:'oldest', defaultTheme:'light', custom: defaultCustomTheme(), bodyFont: defaultFontSetting(), nicknameFont: defaultFontSetting() };
  if(s.defaultTheme === 'custom'){
    applyCustomTheme(s.custom || defaultCustomTheme());
  } else {
    setTheme(s.defaultTheme === 'dark' ? 'dark' : 'light');
  }
  if(sortFilter) sortFilter.value = s.defaultSort || 'oldest';
  applyFontSlot('body', s.bodyFont || defaultFontSetting());
  applyFontSlot('nickname', s.nicknameFont || defaultFontSetting());
}

document.getElementById('themeToggleBtn').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : current === 'dark' ? 'custom' : 'light';
  if(!state.settings) state.settings = { defaultSort:'oldest', defaultTheme:'light', custom: null, bodyFont: defaultFontSetting(), nicknameFont: defaultFontSetting() };
  state.settings.defaultTheme = next;
  if(next === 'custom'){
    if(!state.settings.custom) state.settings.custom = defaultCustomTheme();
    applyCustomTheme(state.settings.custom);
  } else {
    setTheme(next);
  }
  renderGrid(); // card type-tint alpha is theme-aware, so cards need to rebuild
});

document.getElementById('trainerEditBtn').addEventListener('click', () => {
  const current = state.trainer || '';
  const next = prompt('Original Trainer name:', current);
  if(next === null) return; // Operation cancelled
  state.trainer = next.trim();
  renderTrainer();
  scheduleAutosave();
  showToast(state.trainer ? `Dex is now set to ${state.trainer}.` : 'Trainer name cleared.');
});

function renderStats(){
  const total = state.pokemon.length;
  const shinyCount = state.pokemon.filter(p=>p.shiny).length;
  const typeCounts = {};
  state.pokemon.forEach(p => p.types.forEach(t => typeCounts[t] = (typeCounts[t]||0)+1));
  const topType = Object.entries(typeCounts).sort((a,b)=>b[1]-a[1])[0];
  const totalGames = state.pokemon.reduce((sum,p)=>sum + p.games.length, 0);

  const dashOpen = document.getElementById('statsDashboard').classList.contains('open');
  statsBar.innerHTML = `
    <div class="stat-chip">ROSTER &nbsp;<b>${total}</b></div>
    <div class="stat-chip">SHINY &nbsp;<b style="color:var(--accent-2)">${shinyCount}</b></div>
    <div class="stat-chip">TOTAL GAME APPEARANCES &nbsp;<b>${totalGames}</b></div>
    ${topType ? `<div class="stat-chip">MOST COMMON TYPE &nbsp;<b style="color:${TYPE_HEX[topType[0]]}">${topType[0]}</b></div>` : ''}
    <button type="button" class="stats-toggle-btn ${dashOpen?'open':''}" id="statsToggleBtn">
      Full Stats
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
  `;
  document.getElementById('statsToggleBtn').addEventListener('click', (e) => {
    const panel = document.getElementById('statsDashboard');
    const willOpen = !panel.classList.contains('open');
    panel.classList.toggle('open', willOpen);
    e.currentTarget.classList.toggle('open', willOpen);
    if(willOpen) renderStatsDashboard();
  });
  // keep dashboard contents fresh if it's already open (e.g. after add/delete/import)
  if(dashOpen) renderStatsDashboard();
}

function renderStatsDashboard(){
  const dash = document.getElementById('statsDashboard');
  const list = state.pokemon;
  const total = list.length;
  if(total === 0){
    dash.innerHTML = `<div class="stats-section-title">Dex Stats</div><div class="hint">Add some Pokémon to see your stats.</div>`;
    return;
  }

  const shinyCount = list.filter(p=>p.shiny).length;
  const shinyPct = ((shinyCount/total)*100).toFixed(1);

  // Type distribution (counts dual types separately, as appearances)
  const typeCounts = {};
  TYPES.forEach(t => typeCounts[t] = 0);
  list.forEach(p => p.types.forEach(t => { if(typeCounts[t]!=null) typeCounts[t]++; }));
  const maxTypeCount = Math.max(1, ...Object.values(typeCounts));
  const typeRows = TYPES
    .map(t => ({ t, c: typeCounts[t] }))
    .filter(x => x.c > 0)
    .sort((a,b)=>b.c-a.c)
    .map(({t,c}) => `
      <div class="type-bar-row">
        <div class="tb-label">${t}</div>
        <div class="type-bar-track"><div class="type-bar-fill" style="width:${(c/maxTypeCount*100).toFixed(0)}%; background:${TYPE_HEX[t]}"></div></div>
        <div class="tb-count">${c}</div>
      </div>
    `).join('');

  // Mono vs dual type
  const monoCount = list.filter(p=>p.types.length===1).length;
  const dualCount = list.filter(p=>p.types.length===2).length;

  // Gender breakdown: percentages computed against Pokémon with a gender actually set,
  // so an unset entry doesn't dilute the real Male/Female/Genderless split.
  const genderCounts = { Male:0, Female:0, Genderless:0, Unset:0 };
  list.forEach(p => {
    if(p.gender === 'Male') genderCounts.Male++;
    else if(p.gender === 'Female') genderCounts.Female++;
    else if(p.gender === 'Genderless') genderCounts.Genderless++;
    else genderCounts.Unset++;
  });
  const genderSetTotal = genderCounts.Male + genderCounts.Female + genderCounts.Genderless;
  const genderPct = (n) => genderSetTotal ? ((n/genderSetTotal)*100).toFixed(0) : 0;

  // Games: moveset row Tags are the source of truth for "games represented",
  // Origin/Last Game are free-text per-mon labels and often duplicate a tag under a different string.
  const originCounts = {};
  const lastCounts = {};
  const tagCounts = {};
  list.forEach(p => {
    if(p.originGame) originCounts[p.originGame] = (originCounts[p.originGame]||0)+1;
    if(p.lastGame) lastCounts[p.lastGame] = (lastCounts[p.lastGame]||0)+1;
    p.games.forEach(g => {
      const tag = (g.tag||'').trim();
      if(tag) tagCounts[tag] = (tagCounts[tag]||0)+1;
    });
  });
  const allGamesSeen = new Set(Object.keys(tagCounts));
  const topOriginGames = Object.entries(originCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);

  // Natures
  const natureCounts = {};
  list.forEach(p => { if(p.nature) natureCounts[p.nature] = (natureCounts[p.nature]||0)+1; });
  const topNatures = Object.entries(natureCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const noNatureCount = list.filter(p=>!p.nature).length;

  // Balls
  const ballCounts = {};
  list.forEach(p => { if(p.ball) ballCounts[p.ball] = (ballCounts[p.ball]||0)+1; });
  const topBalls = Object.entries(ballCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const noBallCount = list.filter(p=>!p.ball).length;

  // Moves / abilities / games logged
  const totalGameRows = list.reduce((s,p)=>s+p.games.length,0);
  const totalMovesLogged = list.reduce((s,p)=>s+p.games.reduce((s2,g)=>s2+g.moves.filter(Boolean).length,0),0);
  const totalAbilitiesLogged = list.reduce((s,p)=>s+p.games.filter(g=>g.ability).length,0);
  const avgGamesPerMon = (totalGameRows/total).toFixed(1);
  const withNotes = list.filter(p=>stripHTML(p.notes).trim().length>0).length;
  const withSprite = list.filter(p=>p.sprite).length;
  const withMetLocation = list.filter(p=>stripHTML(p.metLocation).trim().length>0).length;

  // Most awarded ribbon: which single Ribbons-category achievement has the most Pokémon
  const ribbonItems = [];
  Object.values(ACHIEVEMENT_CATALOG.ribbons.subcategories).forEach(sub => {
    sub.items.forEach(item => ribbonItems.push(item));
  });
  const ribbonAwardCounts = ribbonItems
    .map(item => ({ name: item.name, icon: item.icon, count: list.filter(p => isAchievementEarned(p, item)).length }))
    .filter(r => r.count > 0)
    .sort((a,b) => b.count - a.count);
  const mostAwardedRibbon = ribbonAwardCounts[0] || null;

  // Contest / Battle Memory Ribbon: how many Pokémon have at least one sub-ribbon,
  // and how many have collected every sub-ribbon (Gilded)
  const contestMemoryCount = list.filter(p => contestMemoryState(p).unlocked).length;
  const battleMemoryCount = list.filter(p => battleMemoryState(p).unlocked).length;
  const gildedContestCount = list.filter(p => contestMemoryState(p).gold).length;
  const gildedBattleCount = list.filter(p => battleMemoryState(p).gold).length;

  dash.innerHTML = `
    <div class="stats-section-title">Overview</div>
    <div class="stats-dash-grid">
      <div class="dash-cell"><div class="k">Total Roster</div><div class="v">${total}</div></div>
      <div class="dash-cell"><div class="k">Shiny</div><div class="v">${shinyCount}<small>${shinyPct}%</small></div></div>
      <div class="dash-cell"><div class="k">Mono / Dual Type</div><div class="v">${monoCount} <small>/ ${dualCount}</small></div></div>
      <div class="dash-cell"><div class="k">Games Represented</div><div class="v">${allGamesSeen.size}</div></div>
      <div class="dash-cell"><div class="k">Game Rows Logged</div><div class="v">${totalGameRows}<small>avg ${avgGamesPerMon}/mon</small></div></div>
      <div class="dash-cell"><div class="k">Moves Logged</div><div class="v">${totalMovesLogged}</div></div>
      <div class="dash-cell"><div class="k">Abilities Logged</div><div class="v">${totalAbilitiesLogged}</div></div>
      <div class="dash-cell"><div class="k">With Sprite / Notes</div><div class="v">${withSprite} <small>/ ${withNotes}</small></div></div>
    </div>

    <div class="stats-section-title">Type Distribution</div>
    ${typeRows || '<div class="hint">No types assigned yet.</div>'}

    <div class="stats-section-title">Gender</div>
    <div class="stats-dash-grid">
      <div class="dash-cell"><div class="k">♂ Male</div><div class="v" style="color:#5B9CFF;">${genderCounts.Male}<small>${genderPct(genderCounts.Male)}%</small></div></div>
      <div class="dash-cell"><div class="k">♀ Female</div><div class="v" style="color:#FF6FA5;">${genderCounts.Female}<small>${genderPct(genderCounts.Female)}%</small></div></div>
      <div class="dash-cell"><div class="k">○ Genderless</div><div class="v" style="color:#B07CFF;">${genderCounts.Genderless}<small>${genderPct(genderCounts.Genderless)}%</small></div></div>
      <div class="dash-cell"><div class="k">No Gender Set</div><div class="v" style="color:var(--text-faint);">${genderCounts.Unset}</div></div>
    </div>

    <div class="stats-section-title">Achievements</div>
    <div class="stats-dash-grid">
      <div class="dash-cell" style="grid-column:span 2;">
        <div class="k">Most Awarded Ribbon</div>
        ${mostAwardedRibbon
          ? `<div style="display:flex; align-items:center; gap:8px; margin-top:2px;">
               <img src="${mostAwardedRibbon.icon}" alt="" style="width:22px; height:22px; flex-shrink:0;">
               <div class="v" style="font-size:15px; line-height:1.3;">${escapeHTML(mostAwardedRibbon.name)}<small>${mostAwardedRibbon.count}/${total}</small></div>
             </div>`
          : `<div class="v" style="color:var(--text-faint); font-size:15px;">None earned yet</div>`}
      </div>
      <div class="dash-cell"><div class="k">Contest Memory Ribbon</div><div class="v">${contestMemoryCount}<small>${gildedContestCount} Gilded</small></div></div>
      <div class="dash-cell"><div class="k">Battle Memory Ribbon</div><div class="v">${battleMemoryCount}<small>${gildedBattleCount} Gilded</small></div></div>
    </div>

    <div class="stats-dash-grid" style="margin-top:22px;">
      <div>
        <div class="stats-section-title" style="margin-top:0;">Top Origin Games</div>
        <div class="dash-list">
          ${topOriginGames.length ? topOriginGames.map(([g,c])=>`<div class="dash-list-row"><span>${escapeHTML(g)}</span><b>${c}</b></div>`).join('') : '<div class="hint">No origin games logged.</div>'}
        </div>
      </div>
      <div>
        <div class="stats-section-title" style="margin-top:0;">Top Natures</div>
        <div class="dash-list">
          ${topNatures.length ? topNatures.map(([n,c])=>`<div class="dash-list-row"><span>${escapeHTML(n)}</span><b>${c}</b></div>`).join('') : '<div class="hint">No natures logged.</div>'}
          ${noNatureCount ? `<div class="dash-list-row"><span style="color:var(--text-faint)">No nature set</span><b style="color:var(--text-faint)">${noNatureCount}</b></div>` : ''}
        </div>
      </div>
      <div>
        <div class="stats-section-title" style="margin-top:0;">Top Poké Balls</div>
        <div class="dash-list">
          ${topBalls.length ? topBalls.map(([b,c])=>`<div class="dash-list-row"><span style="display:flex;align-items:center;gap:6px;">${ballIconHTML(b,16)}${escapeHTML(b)}</span><b>${c}</b></div>`).join('') : '<div class="hint">No balls logged.</div>'}
          ${noBallCount ? `<div class="dash-list-row"><span style="color:var(--text-faint)">No ball set</span><b style="color:var(--text-faint)">${noBallCount}</b></div>` : ''}
        </div>
      </div>
      <div>
        <div class="stats-section-title" style="margin-top:0;">Record Completeness</div>
        <div class="dash-list">
          <div class="dash-list-row"><span>Has Met Location</span><b>${withMetLocation}/${total}</b></div>
          <div class="dash-list-row"><span>Has Sprite</span><b>${withSprite}/${total}</b></div>
          <div class="dash-list-row"><span>Has Notes</span><b>${withNotes}/${total}</b></div>
          <div class="dash-list-row"><span>Has ≥1 Game Logged</span><b>${list.filter(p=>p.games.length>0).length}/${total}</b></div>
        </div>
      </div>
    </div>
  `;
}

function stripHTML(s){
  if(!s) return '';
  const d = document.createElement('div');
  d.innerHTML = s;
  return d.textContent || '';
}

function matchesSearch(p, q){
  if(!q) return true;
  q = q.toLowerCase();
  const hay = [
    p.nickname, p.species, stripHTML(p.notes), stripHTML(p.metLocation), p.originGame, p.lastGame,
    p.nature, p.gender, p.ball,
    ...p.types,
    ...p.games.flatMap(g => [g.tag, g.ability, ...g.moves.map(stripHTML)]),
    ...earnedAchievementNames(p)
  ].filter(Boolean).join(' ').toLowerCase();
  return hay.includes(q);
}

/* Cards render in batches rather than all at once, so a large roster doesn't pay the full
   DOM-construction cost on every render. gridVisibleCount grows by GRID_PAGE_SIZE either via
   the "Load more" button or automatically once the sentinel scrolls into view. The filter
   signature resets the count back to one page whenever search/filter/sort criteria change. */
const GRID_PAGE_SIZE = 24;
let gridVisibleCount = GRID_PAGE_SIZE;
let gridFilterSignature = '';
let gridLoadMoreObserver = null;

function renderGrid(){
  const q = searchInput.value.trim();
  const tFilter = typeFilter.value;
  const gFilter = gameFilter.value;
  const sortMode = sortFilter.value;

  const signature = JSON.stringify([q, tFilter, gFilter, sortMode, shinyOnly, megaOnly, gigantamaxOnly, gridDensity]);
  if(signature !== gridFilterSignature){
    gridFilterSignature = signature;
    gridVisibleCount = GRID_PAGE_SIZE;
  }

  let list = state.pokemon.filter(p =>
    matchesSearch(p, q) &&
    (!tFilter || p.types.includes(tFilter)) &&
    (!gFilter || p.originGame === gFilter) &&
    (!shinyOnly || p.shiny) &&
    (!megaOnly || p.isMega) &&
    (!gigantamaxOnly || p.isGigantamax)
  );

  if(sortMode === 'name') list = [...list].sort((a,b)=>a.nickname.localeCompare(b.nickname));
  else if(sortMode === 'species') list = [...list].sort((a,b)=>a.species.localeCompare(b.species));
  else if(sortMode === 'oldest') { /* natural insertion order already = oldest first */ }
  else list = [...list].reverse();

  if(state.pokemon.length === 0){
    gridWrap.innerHTML = emptyStateHTML("Your dex is empty", "Add the first Pokémon from your save file to start building your living roster.");
    scheduleAutosave();
    return;
  }
  if(list.length === 0){
    gridWrap.innerHTML = emptyStateHTML("No matches", "Try a different search term or clear your filters.");
    scheduleAutosave();
    return;
  }

  const visible = list.slice(0, gridVisibleCount);
  const hasMore = list.length > visible.length;

  gridWrap.innerHTML = `
    <div class="grid ${gridDensity === 'dense' ? 'dense' : ''}">${visible.map(cardHTML).join('')}</div>
    <div class="grid-status">Showing ${visible.length} of ${list.length}</div>
    ${hasMore ? `<div class="grid-load-more" id="gridLoadMore"><button type="button" class="btn ghost" id="gridLoadMoreBtn">Load more</button></div>` : ''}
  `;

  if(hasMore){
    document.getElementById('gridLoadMoreBtn').addEventListener('click', () => {
      gridVisibleCount += GRID_PAGE_SIZE;
      renderGrid();
    });
    observeGridLoadMore();
  } else if(gridLoadMoreObserver){
    gridLoadMoreObserver.disconnect();
  }

  scheduleAutosave();
}

// Auto-advances gridVisibleCount when the "Load more" sentinel scrolls into view, so
// long rosters keep loading as the user scrolls instead of requiring a manual click.
function observeGridLoadMore(){
  if(gridLoadMoreObserver) gridLoadMoreObserver.disconnect();
  if(!('IntersectionObserver' in window)) return;
  const sentinel = document.getElementById('gridLoadMore');
  if(!sentinel) return;
  gridLoadMoreObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting){
      gridVisibleCount += GRID_PAGE_SIZE;
      renderGrid();
    }
  }, { rootMargin: '600px' });
  gridLoadMoreObserver.observe(sentinel);
}

function emptyStateHTML(title, body){
  return `<div class="empty">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto;color:var(--text-faint)"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"/></svg>
    <h3>${title}</h3>
    <p>${body}</p>
    <button class="btn primary" onclick="openForm()">Add Pokémon</button>
  </div>`;
}

function sparkleParticlesHTML(seed){
  let h = 0;
  for(let i=0;i<seed.length;i++){ h = (h*31 + seed.charCodeAt(i)) >>> 0; }
  function rand(){ h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; }
  const count = 9;
  let out = '';
  for(let i=0;i<count;i++){
    const x = (rand()*90 + 4).toFixed(1);
    const y = (rand()*90 + 4).toFixed(1);
    const size = (rand()*2.5 + 2).toFixed(1);
    const delay = (rand()*2.6).toFixed(2);
    const peak = (rand()*0.4 + 0.6).toFixed(2);
    out += `<span class="sparkle-particle" style="--sx:${x}%; --sy:${y}%; --ssize:${size}px; --sdelay:${delay}s; --speak:${peak}"></span>`;
  }
  return out;
}

// Resolves which sprite to show on a card: the preferred form if that form is both
// enabled and has an uploaded image, otherwise the Default sprite. This fallback has to be
// resolved at render time (not baked into preferredForm) because an uploaded Mega/Gigantamax
// sprite can be removed independently of its toggle, and the card should degrade gracefully
// rather than show a broken/empty image.
function resolveDisplaySprite(p){
  if(p.preferredForm === 'mega' && p.isMega && p.spriteMega) return p.spriteMega;
  if(p.preferredForm === 'gigantamax' && p.isGigantamax && p.spriteGigantamax) return p.spriteGigantamax;
  return p.sprite || '';
}

function formBadgeRowHTML(p){
  const badges = [];
  if(p.shiny) badges.push(`<span class="shiny-badge" title="Shiny"><img src="${SHINY_ICON}" alt="Shiny"></span>`);
  if(p.isMega){
    const active = p.preferredForm === 'mega';
    badges.push(`<button type="button" class="form-badge mega ${active?'active':''}" title="${active ? 'Showing Mega Evolution sprite, click to switch to Default' : 'Switch to Mega Evolution sprite'}" onclick="event.stopPropagation(); setPreferredForm('${p.id}','mega')"><img src="${MEGA_ICON}" alt="Mega Evolution"></button>`);
  }
  if(p.isGigantamax){
    const active = p.preferredForm === 'gigantamax';
    badges.push(`<button type="button" class="form-badge gigantamax ${active?'active':''}" title="${active ? 'Showing Gigantamax sprite, click to switch to Default' : 'Switch to Gigantamax sprite'}" onclick="event.stopPropagation(); setPreferredForm('${p.id}','gigantamax')"><img src="${GIGANTAMAX_ICON}" alt="Gigantamax"></button>`);
  }
  if(badges.length === 0) return '';
  return `<div class="card-badge-row">${badges.join('')}${p.shiny ? sparkleParticlesHTML(p.id) : ''}</div>`;
}

function setPreferredForm(id, form){
  const p = state.pokemon.find(x=>x.id===id);
  if(!p) return;
  // Clicking the already-active form badge toggles back to Default; clicking an inactive
  // one switches to it. Either way the result is always a valid, currently-enabled form.
  p.preferredForm = (p.preferredForm === form) ? 'default' : form;
  renderGrid();
}

function gameTagHTML(tag){
  const preset = GAME_PRESET_INDEX[detectGameKeyFromTag(tag)];
  return `${preset ? `<img class="game-tag-icon" src="${preset.icon}" alt="" title="${escapeAttr(preset.label)}">` : ''}${escapeHTML(tag || '-')}`;
}

// Icon-only version of gameTagHTML, for the "without the text" footer mode. Falls back to
// the plain tag text when a game doesn't match a known preset, so a custom/free-typed game
// name doesn't just disappear.
function gameTagIconOnlyHTML(tag){
  const preset = GAME_PRESET_INDEX[detectGameKeyFromTag(tag)];
  return preset ? `<img class="game-tag-icon" src="${preset.icon}" alt="" title="${escapeAttr(preset.label)}">` : escapeHTML(tag || '-');
}

// What shows in the card footer, left of the Share/Edit/Delete buttons, is controlled by the
// cardFooterInfo setting (a global preference, not per card). Dense grid view is cramped enough
// that we always drop the footer text there regardless of the setting, same as choosing None.
function cardFooterInfoHTML(p){
  if(gridDensity === 'dense') return '';
  const mode = (state.settings && state.settings.cardFooterInfo) || 'arrow';
  switch(mode){
    case 'none':
      return '';
    case 'age': {
      const age = formatAge(p.metDate);
      return age ? `<span class="origin-label">${age} old</span>` : '';
    }
    case 'ageWithMet': {
      const age = formatAge(p.metDate);
      if(!age) return '';
      const met = formatMetDate(p.metDate);
      return `<span class="origin-label">${age} old${met ? ` · Met ${met}` : ''}</span>`;
    }
    case 'notes': {
      const notes = stripHTML(p.notes).trim();
      return notes ? `<span class="origin-label">${escapeHTML(notes)}</span>` : '';
    }
    case 'origin':
      return p.originGame ? `<span class="origin-label" style="display:inline-flex; align-items:center; gap:4px;">${gameTagHTML(p.originGame)}</span>` : '';
    case 'last':
      return p.lastGame ? `<span class="origin-label" style="display:inline-flex; align-items:center; gap:4px;">${gameTagHTML(p.lastGame)}</span>` : '';
    case 'arrow':
      return `<span class="origin-label" style="display:inline-flex; align-items:center; gap:4px;">${gameTagHTML(p.originGame)} → ${gameTagHTML(p.lastGame)}</span>`;
    case 'arrowIconsOnly':
      return `<span class="origin-label" style="display:inline-flex; align-items:center; gap:4px;">${gameTagIconOnlyHTML(p.originGame)} → ${gameTagIconOnlyHTML(p.lastGame)}</span>`;
    default:
      return `<span class="origin-label" style="display:inline-flex; align-items:center; gap:4px;">${gameTagHTML(p.originGame)} → ${gameTagHTML(p.lastGame)}</span>`;
  }
}

function cardHTML(p){
  const primaryColor = TYPE_HEX[p.types[0]] || '#4FD1C5';
  const secondaryColor = TYPE_HEX[p.types[1]] || primaryColor;
  // Build type tint colors with alpha: light/neumorphic surfaces need a stronger tint
  // than dark/glass surfaces to read clearly, since there's no dark base competing for contrast.
  const isLight = isNeumorphicActive();
  const a1 = isLight ? 0.30 : 0.22;
  const a2 = isLight ? 0.24 : 0.18;
  const tint1 = hexToRgba(TYPE_HEX[p.types[0]] || '#4FD1C5', a1);
  const tint2 = hexToRgba(TYPE_HEX[p.types[1]] || p.types[0] && TYPE_HEX[p.types[0]] || '#4FD1C5', a2);
  const borderColor = hexToRgba(primaryColor, 0.45);
  const displaySprite = resolveDisplaySprite(p);
  const formPrefix = p.preferredForm === 'mega' ? 'MEGA ' : p.preferredForm === 'gigantamax' ? 'GIGANTAMAX ' : '';
  const footerInfo = cardFooterInfoHTML(p);
  return `
  <div class="card ${p.shiny ? 'is-shiny' : ''}" style="--glow:${primaryColor}; --type-tint-1:${tint1}; --type-tint-2:${tint2}; border-color:${borderColor}" onclick="openDetail('${p.id}')">
    ${formBadgeRowHTML(p)}
    <div class="card-top">
      <div class="card-sprite">${displaySprite ? `<img src="${escapeAttr(displaySprite)}">` : '🟢'}</div>
      <div>
        <div class="card-id">${formPrefix}${p.species.toUpperCase()}</div>
        <div class="card-name">${titledNicknameHTML(p)}</div>
        <div class="card-species">${escapeHTML(p.nature||'')}${p.nature && p.gender ? ' · ' : ''}${genderSymbolHTML(p.gender)}</div>
      </div>
    </div>
    <div class="type-row">
      ${p.types.map(t=>`<span class="type-badge" style="background:${TYPE_HEX[t]}">${t}</span>`).join('')}
    </div>
    <div class="card-meta">
      ${p.metLocation ? `<span>📍 ${p.metLocation}</span>` : ''}
      ${p.ball ? `<span style="display:inline-flex; align-items:center; gap:4px;">${ballIconHTML(p.ball,18)}${escapeHTML(p.ball)}</span>` : ''}
      <span>${p.games.length} game${p.games.length===1?'':'s'}</span>
    </div>
    <div class="card-foot ${footerInfo ? '' : 'centered'}">
      ${footerInfo}
      <div class="card-actions">
        <div class="icon-btn" title="Share as image" onclick="event.stopPropagation(); shareCardAsImage('${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.6" x2="15.4" y2="6.4"/><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"/></svg>
        </div>
        <div class="icon-btn" title="Edit" onclick="event.stopPropagation(); openForm('${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </div>
        <div class="icon-btn danger" title="Delete" onclick="event.stopPropagation(); deletePokemon('${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </div>
      </div>
    </div>
  </div>`;
}

function isNeumorphicActive(){
  const html = document.documentElement;
  if(html.getAttribute('data-theme') === 'light') return true;
  if(html.getAttribute('data-theme') === 'custom' && html.getAttribute('data-style') === 'neumorphic') return true;
  return false;
}

function hexToRgba(hex, alpha){
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function calculateAge(metDateStr){
  if(!metDateStr) return null;
  const met = new Date(metDateStr + 'T00:00:00');
  if(isNaN(met.getTime())) return null;
  const rawNow = new Date();
  const now = new Date(rawNow.getFullYear(), rawNow.getMonth(), rawNow.getDate());
  if(met > now) return null; // met date in the future, nothing sensible to show

  let years = now.getFullYear() - met.getFullYear();
  let months = now.getMonth() - met.getMonth();
  if(months < 0){ years -= 1; months += 12; }

  // Advance the met date by the computed years+months to get an anchor date, then the
  // remaining days are (now - anchor). Stepping back a month at a time when the anchor
  // overshoots avoids the day-of-month rollover bug (e.g. met on the 31st, shorter month).
  let anchor = new Date(met.getFullYear() + years, met.getMonth() + months, met.getDate());
  while(anchor > now){
    months -= 1;
    if(months < 0){ years -= 1; months += 12; }
    anchor = new Date(met.getFullYear() + years, met.getMonth() + months, met.getDate());
  }
  const days = Math.round((now - anchor) / (1000*60*60*24));
  return { years, months, days };
}

function formatAge(metDateStr){
  const age = calculateAge(metDateStr);
  if(!age) return null;
  const unit = (n, label) => `${n} <span class="age-unit">${label}${n!==1?'s':''}</span>`;
  const parts = [];
  if(age.years > 0) parts.push(unit(age.years, 'Year'));
  if(age.months > 0) parts.push(unit(age.months, 'Month'));
  // Always show days if it's the only unit, or if nonzero, so "0 Years 0 Months 3 Days" style
  // doesn't collapse into nothing for very recently met Pokémon.
  if(age.days > 0 || parts.length === 0) parts.push(unit(age.days, 'Day'));
  return parts.join(' ');
}

function ordinalSuffix(n){
  const v = n % 100;
  if(v >= 11 && v <= 13) return 'th';
  switch(n % 10){
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function formatMetDate(metDateStr){
  if(!metDateStr) return null;
  const d = new Date(metDateStr + 'T00:00:00');
  if(isNaN(d.getTime())) return null;
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const day = d.getDate();
  return `${day}${ordinalSuffix(day)} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function escapeHTML(s){
  if(s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(s){ return escapeHTML(s); }

function bulbapediaURL(species){
  if(!species) return null;
  // Bulbapedia article slugs: spaces -> underscores, then "_(Pokémon)" suffix.
  // Covers the common case; unusual punctuation (e.g. Farfetch'd, Nidoran♂/♀)
  // may need manual correction.
  const slug = species.trim().replace(/\s+/g, '_');
  return `https://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(slug)}_(Pok%C3%A9mon)`;
}

function genderSymbolHTML(gender){
  if(gender === 'Male') return `<span style="color:#5B9CFF; font-weight:700;">♂ Male</span>`;
  if(gender === 'Female') return `<span style="color:#FF6FA5; font-weight:700;">♀ Female</span>`;
  if(gender === 'Genderless') return `<span style="color:#B07CFF; font-weight:700;">○ Genderless</span>`;
  return '';
}

function natureTooltipHTML(name){
  const n = NATURE_DATA[name];
  if(!n) return '';
  if(!n.up && !n.down){
    return `<div class="nature-tip-row neutral">No stat change</div>`;
  }
  return `
    <div class="nature-tip-row"><span class="nature-tip-arrow up">▲</span> <span style="color:${STAT_COLOR[n.up]}">${n.up}</span></div>
    <div class="nature-tip-row"><span class="nature-tip-arrow down">▼</span> <span style="color:${STAT_COLOR[n.down]}">${n.down}</span></div>
  `;
}

function natureSelectHTML(id, selected){
  const opts = ['<option value="">-</option>'].concat(
    NATURE_NAMES.map(n => `<option value="${n}" ${selected===n?'selected':''}>${n}</option>`)
  ).join('');
  return `
    <div class="nature-field">
      <select id="${id}" onchange="updateNatureTooltip('${id}')">${opts}</select>
      <div class="nature-tooltip-trigger" id="${id}_tipTrigger" tabindex="0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div class="nature-tooltip" id="${id}_tip">${selected ? natureTooltipHTML(selected) : '<div class="nature-tip-row neutral">Select a nature</div>'}</div>
      </div>
    </div>
  `;
}
function updateNatureTooltip(id){
  const val = document.getElementById(id).value;
  document.getElementById(id+'_tip').innerHTML = val ? natureTooltipHTML(val) : '<div class="nature-tip-row neutral">Select a nature</div>';
}

/* ---------- Ball icon dropdown ---------- */
const BALL_LOOKUP = {};
BALL_DATA.forEach(b => { BALL_LOOKUP[b.name] = b.data; });

function ballIconHTML(ballName, size){
  size = size || 22;
  const data = BALL_LOOKUP[ballName];
  if(!data) return '';
  return `<img src="${data}" alt="" style="width:${size}px;height:${size}px;flex:none;vertical-align:middle;">`;
}

function orderedBallData(){
  if(state.settings && state.settings.sortBallsAlpha){
    return [...BALL_DATA].sort((a,b) => a.name.localeCompare(b.name));
  }
  return BALL_DATA;
}

function ballSelectHTML(id, selected){
  const rows = orderedBallData().map(b => `
    <div class="ball-option ${selected===b.name?'active':''}" onclick="selectBall('${id}','${escapeAttr(b.name).replace(/'/g,"\\'")}')">
      <img src="${b.data}" alt="">
      <span>${escapeHTML(b.name)}</span>
    </div>
  `).join('');
  return `
    <div class="ball-dropdown" id="${id}_wrap">
      <input type="hidden" id="${id}" value="${escapeAttr(selected||'')}">
      <button type="button" class="ball-dropdown-trigger" onclick="toggleBallDropdown('${id}')">
        <span class="ball-dropdown-current">
          ${selected ? `${ballIconHTML(selected,26)}<span>${escapeHTML(selected)}</span>` : `<span class="placeholder">Select a Poké Ball…</span>`}
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;flex:none;"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="ball-dropdown-panel" id="${id}_panel">
        <div class="ball-option ${!selected?'active':''}" onclick="selectBall('${id}','')">
          <span style="width:24px;height:24px;flex:none;"></span><span style="color:var(--text-faint);">- None -</span>
        </div>
        ${rows}
      </div>
    </div>
  `;
}
function toggleBallDropdown(id){
  const panel = document.getElementById(id+'_panel');
  const isOpen = panel.classList.contains('open');
  document.querySelectorAll('.ball-dropdown-panel.open').forEach(p => p.classList.remove('open'));
  if(!isOpen) panel.classList.add('open');
}
function selectBall(id, ballName){
  document.getElementById(id).value = ballName;
  const current = document.querySelector(`#${id}_wrap .ball-dropdown-current`);
  current.innerHTML = ballName ? `${ballIconHTML(ballName,26)}<span>${escapeHTML(ballName)}</span>` : `<span class="placeholder">Select a Poké Ball…</span>`;
  document.querySelectorAll(`#${id}_panel .ball-option`).forEach(opt => opt.classList.remove('active'));
  document.getElementById(id+'_panel').classList.remove('open');
}
document.addEventListener('click', (e) => {
  if(!e.target.closest('.ball-dropdown')){
    document.querySelectorAll('.ball-dropdown-panel.open').forEach(p => p.classList.remove('open'));
  }
  if(!e.target.closest('.game-preset-dropdown')){
    document.querySelectorAll('.game-preset-panel.open').forEach(p => p.classList.remove('open'));
  }
  // Date panels are now appended to body (not inside .date-field) so check both the
  // field wrapper and any open date-panel directly
  if(!e.target.closest('.date-field') && !e.target.closest('.date-panel')){
    closeAllDatePanels();
  }
});

/* ---------- Custom Date Picker ---------- */
const DATE_MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DATE_WEEKDAY_LABELS = ['S','M','T','W','T','F','S'];
// view month tracked per-field-id so multiple instances (currently just Met Date, but
// designed to scale) don't clobber each other's calendar position while open
const dateFieldViewMonth = {};
// 'days' (default month grid) or 'years' (decade grid, opened via the month/year label)
const dateFieldViewMode = {};
// anchor year for whichever decade's year-grid is currently showing
const dateFieldYearGridAnchor = {};

function todayDateStr(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function parseDateStrLocal(s){
  if(!s) return null;
  const d = new Date(s + 'T00:00:00');
  return isNaN(d.getTime()) ? null : d;
}

function dateDisplayParts(value){
  const d = parseDateStrLocal(value);
  if(!d) return null;
  const day = d.getDate();
  return {
    day: day,
    ord: ordinalSuffix(day),
    month: DATE_MONTH_NAMES[d.getMonth()],
    year: d.getFullYear()
  };
}

function dateFieldHTML(id, value){
  const max = todayDateStr();
  const parts = dateDisplayParts(value);
  const displayInner = parts
    ? `<span class="date-disp-day">${parts.day}</span><sup class="date-disp-ord">${parts.ord}</sup><span class="date-disp-sep">&nbsp;</span><span class="date-disp-monthyear">${parts.month} ${parts.year}</span>`
    : `<span class="date-disp-placeholder">Select a date&hellip;</span>`;
  return `
    <div class="date-field" id="${id}_wrap">
      <input type="hidden" id="${id}" value="${escapeAttr(value||'')}" data-max="${max}">
      <button type="button" class="date-trigger" id="${id}_trigger"
        onclick="event.stopPropagation();toggleDatePanel('${id}')" title="Open date picker">
        <svg class="date-cal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span class="date-disp" id="${id}_disp">${displayInner}</span>
        <svg class="date-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </div>
  `;
}

function toggleDatePanel(id){
  // If a panel for this id already exists in body and is open, close it
  const existingPanel = document.getElementById(id+'_panel');
  if(existingPanel && existingPanel.classList.contains('open')){
    existingPanel.classList.remove('open');
    const trigger = document.getElementById(id+'_trigger');
    if(trigger) trigger.classList.remove('open');
    return;
  }
  // Close any other open date panels
  closeAllDatePanels();
  // Create/reuse panel appended to body (escapes backdrop-filter stacking contexts in dark/Beast Ball theme)
  let panel = document.getElementById(id+'_panel');
  if(!panel){
    panel = document.createElement('div');
    panel.className = 'date-panel';
    panel.id = id+'_panel';
    panel.dataset.dateFieldId = id;
    document.body.appendChild(panel);
  }
  const hidden = document.getElementById(id);
  const current = parseDateStrLocal(hidden.value) || new Date();
  dateFieldViewMonth[id] = { year: current.getFullYear(), month: current.getMonth() };
  dateFieldViewMode[id] = 'days';
  renderDatePanel(id);
  positionDatePanel(id);
  panel.classList.add('open');
  const trigger = document.getElementById(id+'_trigger');
  if(trigger) trigger.classList.add('open');
}

// The panel is position:fixed so it renders above the modal's scrollable body,
// so coordinates are calculated against the viewport. Re-run after every
// renderDatePanel call since the calendar's height varies (5 vs 6 week rows).
function positionDatePanel(id){
  const panel = document.getElementById(id+'_panel');
  const trigger = document.getElementById(id+'_trigger');
  const rect = trigger.getBoundingClientRect();
  const panelWidth = 268;
  const margin = 8;
  let left = rect.left;
  if(left + panelWidth > window.innerWidth - margin) left = window.innerWidth - margin - panelWidth;
  if(left < margin) left = margin;
  let top = rect.bottom + 6;
  const panelHeight = panel.offsetHeight || 360;
  if(top + panelHeight > window.innerHeight - margin){
    // not enough room below the trigger, flip to render above it instead
    const above = rect.top - panelHeight - 6;
    top = above > margin ? above : margin;
  }
  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
}

function renderDatePanel(id){
  const panel = document.getElementById(id+'_panel');
  if(!panel) return;
  panel.dataset.dateFieldId = id;
  if(dateFieldViewMode[id] === 'years'){
    renderYearGridPanel(id);
    return;
  }
  const hidden = document.getElementById(id);
  const maxStr = hidden.dataset.max;
  const maxDate = parseDateStrLocal(maxStr);
  const view = dateFieldViewMonth[id];
  const selectedStr = hidden.value;
  const todayStr = todayDateStr();

  const firstOfMonth = new Date(view.year, view.month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(view.year, view.month+1, 0).getDate();
  const daysInPrevMonth = new Date(view.year, view.month, 0).getDate();

  // Disable the "next month" nav once the view is already showing the month containing
  // today's date, since dates beyond that are out of range (met dates can't be future).
  const isAtMaxMonth = maxDate && view.year === maxDate.getFullYear() && view.month === maxDate.getMonth();

  let cells = '';
  for(let i=0; i<startWeekday; i++){
    const dayNum = daysInPrevMonth - startWeekday + 1 + i;
    cells += `<button type="button" class="date-day-cell outside" disabled>${dayNum}</button>`;
  }
  for(let day=1; day<=daysInMonth; day++){
    const cellDate = new Date(view.year, view.month, day);
    const cellStr = `${view.year}-${String(view.month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const isFuture = maxDate && cellDate > maxDate;
    const isSelected = cellStr === selectedStr;
    const isToday = cellStr === todayStr;
    cells += `<button type="button" class="date-day-cell ${isSelected?'selected':''} ${isToday?'today':''}" ${isFuture?'disabled':''} onclick="event.stopPropagation();pickDate('${id}','${cellStr}')">${day}</button>`;
  }
  const totalCells = startWeekday + daysInMonth;
  const trailing = (7 - (totalCells % 7)) % 7;
  for(let i=1; i<=trailing; i++){
    cells += `<button type="button" class="date-day-cell outside" disabled>${i}</button>`;
  }

  panel.innerHTML = `
    <div class="date-panel-head">
      <button type="button" class="date-nav-btn" onclick="event.stopPropagation();navDateMonth('${id}',-1)" title="Previous month">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="date-month-label" onclick="event.stopPropagation();openYearGrid('${id}')" title="Pick a year">
        <span>${DATE_MONTH_NAMES[view.month]} ${view.year}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <button type="button" class="date-nav-btn" ${isAtMaxMonth?'disabled':''} onclick="event.stopPropagation();navDateMonth('${id}',1)" title="Next month">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="date-weekday-row">${DATE_WEEKDAY_LABELS.map(w=>`<span>${w}</span>`).join('')}</div>
    <div class="date-day-grid">${cells}</div>
    <div class="date-panel-foot">
      <button type="button" class="date-clear-btn" onclick="event.stopPropagation();clearDate('${id}')">Clear date</button>
      <button type="button" class="date-today-btn" onclick="event.stopPropagation();pickDate('${id}','${todayStr}')">Today</button>
    </div>
  `;
}

// Year-grid view: a 4x3 decade picker, opened by clicking the month/year label.
// Picking a year keeps the current month and drops back into the day grid for that
// year, since the whole point is faster long-range navigation, not a final selection.
function openYearGrid(id){
  const view = dateFieldViewMonth[id];
  dateFieldViewMode[id] = 'years';
  // anchor the decade grid so the currently-viewed year sits in the middle third of it
  dateFieldYearGridAnchor[id] = Math.floor((view.year - 4) / 12) * 12 + 4;
  renderDatePanel(id);
  positionDatePanel(id);
}

function navYearDecade(id, delta){
  dateFieldYearGridAnchor[id] += delta * 12;
  renderDatePanel(id);
  positionDatePanel(id);
}

function pickYear(id, year){
  const view = dateFieldViewMonth[id];
  view.year = year;
  const hidden = document.getElementById(id);
  const maxDate = parseDateStrLocal(hidden.dataset.max);
  // If jumping to this year would put the current month view past today (e.g. picking
  // this year while sat on December but today is only in March of it), clamp the month
  // back so "next month" doesn't dead-end on an already-disabled control.
  if(maxDate && view.year === maxDate.getFullYear() && view.month > maxDate.getMonth()){
    view.month = maxDate.getMonth();
  }
  dateFieldViewMode[id] = 'days';
  renderDatePanel(id);
  positionDatePanel(id);
}

function renderYearGridPanel(id){
  const panel = document.getElementById(id+'_panel');
  const hidden = document.getElementById(id);
  const maxDate = parseDateStrLocal(hidden.dataset.max);
  const maxYear = maxDate ? maxDate.getFullYear() : new Date().getFullYear();
  const view = dateFieldViewMonth[id];
  const anchor = dateFieldYearGridAnchor[id];

  let cells = '';
  for(let i=0; i<12; i++){
    const y = anchor + i;
    const isFuture = y > maxYear;
    const isSelected = y === view.year;
    cells += `<button type="button" class="date-year-cell ${isSelected?'selected':''}" ${isFuture?'disabled':''} onclick="event.stopPropagation();pickYear('${id}',${y})">${y}</button>`;
  }

  panel.innerHTML = `
    <div class="date-panel-head">
      <button type="button" class="date-nav-btn" onclick="event.stopPropagation();navYearDecade('${id}',-1)" title="Previous years">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="date-month-label" onclick="event.stopPropagation();closeYearGrid('${id}')" title="Back to calendar">
        <span>${anchor} \u2013 ${anchor+11}</span>
      </div>
      <button type="button" class="date-nav-btn" ${anchor+11>=maxYear?'disabled':''} onclick="event.stopPropagation();navYearDecade('${id}',1)" title="Next years">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="date-year-grid">${cells}</div>
    <div class="date-panel-foot">
      <button type="button" class="date-clear-btn" onclick="event.stopPropagation();clearDate('${id}')">Clear date</button>
    </div>
  `;
}

function closeYearGrid(id){
  dateFieldViewMode[id] = 'days';
  renderDatePanel(id);
  positionDatePanel(id);
}

function navDateMonth(id, delta){
  const view = dateFieldViewMonth[id];
  view.month += delta;
  if(view.month < 0){ view.month = 11; view.year -= 1; }
  if(view.month > 11){ view.month = 0; view.year += 1; }
  renderDatePanel(id);
  positionDatePanel(id);
}

function pickDate(id, dateStr){
  const hidden = document.getElementById(id);
  hidden.value = dateStr;
  const disp = document.getElementById(id+'_disp');
  if(disp){
    const parts = dateDisplayParts(dateStr);
    disp.innerHTML = parts
      ? `<span class="date-disp-day">${parts.day}</span><sup class="date-disp-ord">${parts.ord}</sup><span class="date-disp-sep">&nbsp;</span><span class="date-disp-monthyear">${parts.month} ${parts.year}</span>`
      : `<span class="date-disp-placeholder">Select a date&hellip;</span>`;
  }
  const panel = document.getElementById(id+'_panel');
  if(panel) panel.classList.remove('open');
  const trigger = document.getElementById(id+'_trigger');
  if(trigger) trigger.classList.remove('open');
}

function clearDate(id){
  const hidden = document.getElementById(id);
  hidden.value = '';
  const disp = document.getElementById(id+'_disp');
  if(disp) disp.innerHTML = `<span class="date-disp-placeholder">Select a date&hellip;</span>`;
  const panel = document.getElementById(id+'_panel');
  if(panel) panel.classList.remove('open');
  const trigger = document.getElementById(id+'_trigger');
  if(trigger) trigger.classList.remove('open');
  if(window._datePendingPreview) delete window._datePendingPreview[id];
}

