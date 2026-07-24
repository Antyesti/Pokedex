
// Flat index of all catalog entries (excludes sub-ribbons), keyed by `key`.
const ACHIEVEMENT_INDEX = {};
Object.values(ACHIEVEMENT_CATALOG).forEach(cat => {
  Object.values(cat.subcategories).forEach(sub => {
    sub.items.forEach(item => { ACHIEVEMENT_INDEX[item.key] = item; });
  });
});
// Flat index of sub-ribbons (Contest/Battle Memory components, plus any custom
// Memory Ribbon-style achievement's sub-ribbons), keyed by their own key. Built
// generically from the catalog so new custom collections are covered automatically.
const SUB_RIBBON_INDEX = {};
Object.values(ACHIEVEMENT_INDEX).forEach(item => {
  if(item.isMemoryRibbon && Array.isArray(item.subRibbons)){
    item.subRibbons.forEach(r => { SUB_RIBBON_INDEX[r.key] = r; });
  }
});
// Flat list of every Memory Ribbon-style catalog item (built-in Contest/Battle Memory
// Ribbons plus any custom ones), used to generalize state/title/toggle logic below.
const MEMORY_RIBBON_ITEMS = Object.values(ACHIEVEMENT_INDEX).filter(item => item.isMemoryRibbon);

// Category tags available for custom achievements.
const CUSTOM_ACHIEVEMENT_TAGS = [
  { value:'ribbons-league', label:'Ribbons: League' },
  { value:'ribbons-contest', label:'Ribbons: Contest' },
  { value:'ribbons-tower', label:'Ribbons: Tower' },
  { value:'ribbons-memorial', label:'Ribbons: Memorial' },
  { value:'ribbons-gift', label:'Ribbons: Gift' },
  { value:'marks', label:'Marks' },
  { value:'misc-pokeathlon', label:'Pok\u00e9athlon Achievements' },
  { value:'misc', label:'Bonus Achievements' }
];

/* ---------- Memory Ribbon (Contest/Battle, plus custom) unlock state ---------- */
// Default behavior (used by the built-in Contest/Battle Memory Ribbons, and any custom
// Memory Ribbon that doesn't set memoryUnlockMode): shows as soon as >=1 sub-ribbon is
// selected, and swaps to its Gold variant once all are selected.
// Opt-in behavior (catalogItem.memoryUnlockMode === 'all'): stays hidden entirely until
// every sub-ribbon has been selected — for "you need the full set" achievements like a
// custom Leaf Crown that requires all 5 Shiny Leaf pieces before it counts as earned.
function memoryRibbonState(p, catalogItem, selectedSubKeys){
  const total = catalogItem.subRibbons.length;
  const have = selectedSubKeys.filter(k => catalogItem.subRibbons.some(r => r.key === k)).length;
  const requireAll = catalogItem.memoryUnlockMode === 'all';
  return {
    unlocked: requireAll ? (total > 0 && have === total) : have > 0,
    gold: have === total && total > 0,
    have, total
  };
}
function contestMemoryState(p){ return memoryRibbonState(p, ACHIEVEMENT_CATALOG.ribbons.subcategories.contest.items.find(i=>i.key==='contest_memory_ribbon'), p.contestMemorySubKeys); }
function battleMemoryState(p){ return memoryRibbonState(p, ACHIEVEMENT_CATALOG.ribbons.subcategories.tower.items.find(i=>i.key==='battle_memory_ribbon'), p.battleMemorySubKeys); }

// Returns the mutable array of selected sub-ribbon keys for a given Memory Ribbon
// catalog item on a given Pokémon. The two built-in items keep their own dedicated
// arrays (existing save data stays compatible); any other Memory Ribbon item (i.e.
// a custom one) gets a lazily-created array inside p.customMemorySubKeys, keyed by
// the item's own key, so custom collections no longer collide with Battle Memory's.
function getMemorySubKeyList(p, item){
  if(item.key === 'contest_memory_ribbon') return p.contestMemorySubKeys;
  if(item.key === 'battle_memory_ribbon') return p.battleMemorySubKeys;
  if(!p.customMemorySubKeys || typeof p.customMemorySubKeys !== 'object') p.customMemorySubKeys = {};
  if(!Array.isArray(p.customMemorySubKeys[item.key])) p.customMemorySubKeys[item.key] = [];
  return p.customMemorySubKeys[item.key];
}

/* ---------- Title resolution ---------- */
// Returns the list of achievement keys (catalog ribbons/marks + custom) that currently
// grant a usable title for this Pokémon, i.e. are selected/unlocked AND have a title defined.
function getEarnedTitleKeys(p){
  const keys = [];
  (p.achievementKeys||[]).forEach(key => {
    const item = ACHIEVEMENT_INDEX[key];
    if(!item || !item.title) return;
    // Being present in p.achievementKeys already means it's selected/earned (including
    // unreleased achievements that were force-enabled), so it still grants its title.
    if(item.isMemoryRibbon) return; // handled separately below
    if(isAutoGrantedAchievement(item)) return; // handled separately below, not stored here
    if(isAchievementLocked(p, item)) return; // prerequisite no longer satisfied
    keys.push(key);
  });
  // Memory Ribbons are driven entirely by their sub-ribbon collections; the parent key is
  // never pushed into achievementKeys, so check them independently here. Covers the two
  // built-in items as well as any custom Memory Ribbon-style achievement.
  MEMORY_RIBBON_ITEMS.forEach(item => {
    if(!item.title) return;
    const subKeys = getMemorySubKeyList(p, item);
    const st = memoryRibbonState(p, item, subKeys);
    if(st.unlocked) keys.push(item.key);
  });
  // Auto-granted achievements aren't stored in achievementKeys, so check every catalog
  // item that declares autoGrant independently here.
  Object.values(ACHIEVEMENT_INDEX).forEach(item => {
    if(!item.title || !isAutoGrantedAchievement(item)) return;
    if(isAchievementAutoGranted(p, item)) keys.push(item.key);
  });
  // Custom achievements don't carry titles (no title field collected on creation), so they
  // never contribute to earned titles, only catalog ribbons/marks do.
  return keys;
}

// Resolves the display text + position for a given title key, on a specific Pokémon
// (needed because Partner Ribbon's title text depends on that Pokémon's trainer name/nickname).
function resolveTitleDisplay(p, key){
  const item = ACHIEVEMENT_INDEX[key];
  if(!item || !item.title) return null;
  if(item.title.type === 'dynamic-partner'){
    const trainer = (p.partnerTrainerName || '').trim() || 'Trainer';
    const subject = (p.nickname || p.species || 'Pok\u00e9mon').trim();
    return { type:'prefix', text: `${trainer}'s`, full: `${trainer}'s ${subject}` };
  }
  // Generic dynamic title: the control panel defines a field label/placeholder and a
  // template containing "{value}", filled in per-Pokémon (see customTitleFieldHTML).
  // Falls back to the placeholder text itself when nothing's been entered yet.
  if(item.title.type === 'dynamic'){
    const raw = ((p.customTitleFields && p.customTitleFields[key]) || '').trim();
    const value = raw || (item.title.placeholder || '').trim() || 'Someone';
    const text = (item.title.template || '{value}').replace(/\{value\}/g, value);
    return { type: item.title.position === 'suffix' ? 'suffix' : 'prefix', text };
  }
  return { type: item.title.type, text: item.title.text };
}

// Builds "Nickname the Champion" / "Trainer's Nickname" style display HTML for use anywhere
// the nickname is shown. Falls back to the plain nickname when no active title is set.
function titledNicknameHTML(p){
  const nick = escapeHTML(p.nickname || p.species || '');
  if(!p.activeTitleKey) return nick;
  const display = resolveTitleDisplay(p, p.activeTitleKey);
  if(!display) return nick;
  if(display.type === 'prefix'){
    if(display.full) return escapeHTML(display.full); // Partner Ribbon already includes the subject
    return `${escapeHTML(display.text)} ${nick}`;
  }
  return `${nick} ${escapeHTML(display.text)}`;
}

// Plain-text equivalent of titledNicknameHTML, for contexts that can't render markup
// (e.g. canvas text for the share-as-image export).
function titledNicknamePlainText(p){
  const nick = p.nickname || p.species || '';
  if(!p.activeTitleKey) return nick;
  const display = resolveTitleDisplay(p, p.activeTitleKey);
  if(!display) return nick;
  if(display.type === 'prefix'){
    if(display.full) return display.full;
    return `${display.text} ${nick}`;
  }
  return `${nick} ${display.text}`;
}

let state = {
  trainer: '',
  settings: { defaultSort: 'oldest', defaultTheme: 'light', custom: null },
  pokemon: []
};

let editingId = null; // id of pokemon being edited, or null when adding


function cryptoId(){ return 'p_' + Math.random().toString(36).slice(2,10) + Date.now().toString(36); }

// Backfills fields introduced after a Pokémon record may have been created/exported, so
// older saves (or the empty seed array) still get a consistent shape to render and edit against.
function normalizePokemon(p){
  if(typeof p.speciesEntryId !== 'string') p.speciesEntryId = '';
  if(!Array.isArray(p.megaTypes)) p.megaTypes = [];
  if(typeof p.megaForm !== 'string') p.megaForm = '';
  if(typeof p.isMega !== 'boolean') p.isMega = false;
  if(typeof p.isGigantamax !== 'boolean') p.isGigantamax = false;
  if(typeof p.spriteMega !== 'string') p.spriteMega = '';
  if(typeof p.spriteGigantamax !== 'string') p.spriteGigantamax = '';
  if(p.preferredForm !== 'mega' && p.preferredForm !== 'gigantamax' && p.preferredForm !== 'default') p.preferredForm = 'default';
  // Disabling a form also clears it as the preferred sprite variant.
  if(p.preferredForm === 'mega' && !p.isMega) p.preferredForm = 'default';
  if(p.preferredForm === 'gigantamax' && !p.isGigantamax) p.preferredForm = 'default';
  if(!p.isMega) p.megaForm = '';

  // Achievements: ribbons/marks/misc selections, Memory Ribbon sub-collections, custom
  // achievements, partner trainer name (for the dynamic Partner Ribbon title), custom
  // dynamic title field values (for any other achievement with a control-panel-defined
  // dynamic title), and the
  // single active title shown beside the nickname.
  if(!Array.isArray(p.achievementKeys)) p.achievementKeys = [];
  if(!Array.isArray(p.contestMemorySubKeys)) p.contestMemorySubKeys = [];
  if(!Array.isArray(p.battleMemorySubKeys)) p.battleMemorySubKeys = [];
  if(!p.customMemorySubKeys || typeof p.customMemorySubKeys !== 'object') p.customMemorySubKeys = {};
  Object.keys(p.customMemorySubKeys).forEach(k => {
    if(!Array.isArray(p.customMemorySubKeys[k])) p.customMemorySubKeys[k] = [];
  });
  // One-time migration: earlier versions had no generic storage for custom Memory
  // Ribbon-style achievements, so their sub-ribbon selections were accidentally saved
  // into battleMemorySubKeys. Move any leftover matches into the correct per-item slot.
  MEMORY_RIBBON_ITEMS.forEach(item => {
    if(item.key === 'contest_memory_ribbon' || item.key === 'battle_memory_ribbon') return;
    const subRibbonKeys = (item.subRibbons || []).map(r => r.key);
    if(!subRibbonKeys.length) return;
    [p.contestMemorySubKeys, p.battleMemorySubKeys].forEach(list => {
      for(let i = list.length - 1; i >= 0; i--){
        if(subRibbonKeys.includes(list[i])){
          const moved = list.splice(i, 1)[0];
          if(!Array.isArray(p.customMemorySubKeys[item.key])) p.customMemorySubKeys[item.key] = [];
          if(!p.customMemorySubKeys[item.key].includes(moved)) p.customMemorySubKeys[item.key].push(moved);
        }
      }
    });
  });
  if(!Array.isArray(p.customAchievements)) p.customAchievements = [];
  // each custom achievement: { id, name, tag, icon }
  p.customAchievements = p.customAchievements.map(c => ({
    id: c.id || cryptoId(),
    name: typeof c.name === 'string' ? c.name : '',
    tag: typeof c.tag === 'string' ? c.tag : 'misc',
    icon: typeof c.icon === 'string' && c.icon ? c.icon : PLACEHOLDER_RIBBON_ICON
  }));
  if(typeof p.partnerTrainerName !== 'string') p.partnerTrainerName = '';
  if(!p.customTitleFields || typeof p.customTitleFields !== 'object') p.customTitleFields = {};
  Object.keys(p.customTitleFields).forEach(k => {
    if(typeof p.customTitleFields[k] !== 'string') p.customTitleFields[k] = '';
  });
  if(typeof p.activeTitleKey !== 'string') p.activeTitleKey = '';
  // an active title must point at something the Pokémon actually still has selected,
  // otherwise drop it back to "no title" rather than displaying a stale/invalid one
  const earned = getEarnedTitleKeys(p);
  if(p.activeTitleKey && !earned.includes(p.activeTitleKey)) p.activeTitleKey = '';
  return p;
}

function seedData(){
  state.pokemon = JSON.parse(JSON.stringify(ROSTER_DATA)).map(normalizePokemon);
}

/* ============== ACHIEVEMENTS SECTION (detail view) ============== */
// Tracks which Memory Ribbon expand panel (if any) is open per Pokémon id, so reopening
// the detail view or re-rendering after a toggle doesn't unexpectedly collapse it.
// Shape: { [pokemonId]: { [memoryRibbonItemKey]: bool } }
const achievementMemoryExpanded = {};

function findPokemonById(id){ return state.pokemon.find(x=>x.id===id); }

// All achievements earned by a Pokémon, resolved to {name, icon} entries: catalog
// ribbons/marks/misc, Contest/Battle Memory sub-ribbons, and user-defined custom
// achievements. Used by the share-as-image card export and (via earnedAchievementNames)
// by search matching.
function earnedAchievementEntries(p){
  const entries = [];
  (p.achievementKeys||[]).forEach(key => {
    const item = ACHIEVEMENT_INDEX[key];
    if(item) entries.push({ name: item.name, icon: item.icon });
  });
  [...(p.contestMemorySubKeys||[]), ...(p.battleMemorySubKeys||[]), ...Object.values(p.customMemorySubKeys||{}).flat()].forEach(key => {
    const sub = SUB_RIBBON_INDEX[key];
    if(sub) entries.push({ name: sub.name, icon: sub.icon });
  });
  (p.customAchievements||[]).forEach(c => { if(c.name) entries.push({ name: c.name, icon: c.icon }); });
  return entries;
}

function earnedAchievementNames(p){
  return earnedAchievementEntries(p).map(e => e.name);
}


// Generic prerequisite / auto-grant helpers. Any achievement can declare `requires`
// (an array of achievement keys that must ALL be earned before this one can be manually
// toggled) and/or `autoGrant` (an array of achievement keys that, once ALL earned,
// automatically grant this one -- it's then never manually toggled). These replace what
// used to be logic hardcoded specifically for Contest Star Ribbon / Twinkling Star Ribbon.
function isAutoGrantedAchievement(item){
  return Array.isArray(item.autoGrant) && item.autoGrant.length > 0;
}

// Looks up an achievement by key and checks whether it's earned, honoring the same rules
// as isAchievementEarned. Used when only a key is on hand (e.g. reading another
// achievement's `requires`/`autoGrant` list).
function isAchievementEarnedByKey(p, key){
  const item = ACHIEVEMENT_INDEX[key];
  if(!item) return (p.achievementKeys||[]).includes(key);
  return isAchievementEarned(p, item);
}

function isAchievementAutoGranted(p, item){
  if(!isAutoGrantedAchievement(item)) return false;
  return item.autoGrant.every(key => isAchievementEarnedByKey(p, key));
}

function isAchievementLocked(p, item){
  if(!Array.isArray(item.requires) || item.requires.length === 0) return false;
  return !item.requires.every(key => isAchievementEarnedByKey(p, key));
}

// Removes any manually-toggled achievement whose prerequisites are no longer satisfied,
// e.g. its `requires` achievement got toggled back off after this one was earned.
function cleanupLockedAchievements(p){
  Object.values(ACHIEVEMENT_INDEX).forEach(item => {
    if(!isAchievementLocked(p, item)) return;
    const idx = p.achievementKeys.indexOf(item.key);
    if(idx !== -1) p.achievementKeys.splice(idx, 1);
  });
}

function achievementBadgeHTML(p, item, selected, readonly){
  const disabled = item.status === 'unreleased';

  // Auto-granted achievements are never manually toggled -- show current state read-only.
  if(isAutoGrantedAchievement(item)){
    const awarded = isAchievementAutoGranted(p, item);
    const reqNames = item.autoGrant.map(k => ACHIEVEMENT_INDEX[k]?.name || k).join(', ');
    return `
      <div class="achv-badge ${awarded?'selected':''}" title="${escapeAttr(item.name)}: ${awarded ? `Auto-awarded: ${reqNames} collected` : `Collect ${reqNames} to unlock`}">
        <img src="${item.icon}" alt="">
        <span class="achv-badge-label">${escapeHTML(item.name)}</span>
        ${!awarded ? '<span class="achv-unreleased-tag">Auto</span>' : ''}
      </div>
    `;
  }

  // Achievements with unmet prerequisites stay locked until those are earned first.
  if(isAchievementLocked(p, item)){
    const reqNames = item.requires.map(k => ACHIEVEMENT_INDEX[k]?.name || k).join(', ');
    return `
      <div class="achv-badge disabled" title="${escapeAttr(item.name)}: Requires ${reqNames} first">
        <img src="${item.icon}" alt="">
        <span class="achv-badge-label">${escapeHTML(item.name)}</span>
        <span class="achv-unreleased-tag">Locked</span>
      </div>
    `;
  }

  // Once force-enabled, an unreleased achievement looks and behaves like any other
  // earned one -- the grey-out, "Unreleased" tag, and tooltip note only apply while
  // it's still unselected.
  const showAsDisabled = disabled && !selected;
  const title = showAsDisabled ? `${item.name} (Unreleased)` : item.name;

  // Read-only (detail view): render as a static, non-interactive badge. Every badge shown
  // here is earned (unearned ones are filtered out before this runs), so it gets a plain
  // "readonly" look rather than the "selected" glow used for the interactive toggle grid --
  // otherwise the whole section reads as if everything were permanently clicked.
  if(readonly){
    return `
      <div class="achv-badge readonly ${showAsDisabled?'disabled':''}" title="${escapeAttr(title)}">
        <img src="${item.icon}" alt="">
        <span class="achv-badge-label">${escapeHTML(item.name)}</span>
        ${showAsDisabled ? '<span class="achv-unreleased-tag">Unreleased</span>' : ''}
      </div>
    `;
  }

  return `
    <button type="button" class="achv-badge ${selected?'selected':''} ${showAsDisabled?'disabled':''}"
      title="${escapeAttr(title)}"
      onclick="${disabled ? `confirmForceEnableUnreleased('${p.id}','${item.key}')` : `toggleAchievement('${p.id}','${item.key}')`}">
      <img src="${item.icon}" alt="">
      <span class="achv-badge-label">${escapeHTML(item.name)}</span>
      ${showAsDisabled ? '<span class="achv-unreleased-tag">Unreleased</span>' : ''}
    </button>
  `;
}

function memoryRibbonBadgeHTML(p, item, readonly){
  const subKeys = getMemorySubKeyList(p, item);
  const st = memoryRibbonState(p, item, subKeys);
  const expandKind = item.key;
  const isOpen = !!(achievementMemoryExpanded[p.id] && achievementMemoryExpanded[p.id][expandKind]);
  const displayName = st.gold ? item.goldName : item.name;
  const displayIcon = st.gold ? item.goldIcon : item.icon;
  return `
    <div class="achv-memory-wrap">
      <button type="button" class="achv-badge memory-ribbon ${st.unlocked?'selected':''} ${st.gold?'gold':''}"
        title="${escapeAttr(displayName)}: ${st.have}/${st.total} collected"
        onclick="toggleMemoryExpand('${p.id}','${expandKind}')">
        <img src="${displayIcon}" alt="">
        <span class="achv-badge-label">${escapeHTML(displayName)}</span>
        <span class="achv-memory-count">${st.have}/${st.total}</span>
      </button>
      ${isOpen ? memoryRibbonExpandHTML(p, item, subKeys, readonly) : ''}
    </div>
  `;
}

function memoryRibbonExpandHTML(p, item, subKeys, readonly){
  const subBadge = r => {
    const sel = subKeys.includes(r.key);
    if(readonly){
      return `
        <div class="achv-sub-badge ${sel?'selected':''}" title="${escapeAttr(r.name)}">
          <img src="${r.icon}" alt="">
          <span>${escapeHTML(r.name)}</span>
        </div>
      `;
    }
    return `
      <button type="button" class="achv-sub-badge ${sel?'selected':''}" title="${escapeAttr(r.name)}" onclick="toggleMemorySubRibbon('${p.id}','${item.key}','${r.key}')">
        <img src="${r.icon}" alt="">
        <span>${escapeHTML(r.name)}</span>
      </button>
    `;
  };
  // Read-only view shows only sub-ribbons the Pokémon has actually earned; the edit form
  // shows the full picker grid so any sub-ribbon can be toggled individually.
  const subRibbons = readonly ? item.subRibbons.filter(r => subKeys.includes(r.key)) : item.subRibbons;

  // Contest Memory's 40 sub-ribbons split cleanly by region (20 Hoenn + 20 Sinnoh); group them
  // so the panel reads as two sets instead of one undifferentiated 40-item grid.
  if(item.key === 'contest_memory_ribbon'){
    const hoenn = subRibbons.filter(r => r.key.startsWith('contestmem_hoenn_'));
    const sinnoh = subRibbons.filter(r => r.key.startsWith('contestmem_sinnoh_'));
    return `
      <div class="achv-memory-expand-wrap">
        ${hoenn.length ? `
        <div class="achv-memory-region-label">Hoenn Contest Ribbons</div>
        <div class="achv-memory-expand">${hoenn.map(subBadge).join('')}</div>` : ''}
        ${sinnoh.length ? `
        <div class="achv-memory-region-label">Sinnoh Super Contest Ribbons</div>
        <div class="achv-memory-expand">${sinnoh.map(subBadge).join('')}</div>` : ''}
      </div>
    `;
  }
  return `<div class="achv-memory-expand">${subRibbons.map(subBadge).join('')}</div>`;
}

function isAchievementEarned(p, item){
  if(item.isMemoryRibbon){
    const subKeys = getMemorySubKeyList(p, item);
    return memoryRibbonState(p, item, subKeys).unlocked;
  }
  if(isAutoGrantedAchievement(item)) return isAchievementAutoGranted(p, item);
  return p.achievementKeys.includes(item.key);
}

// Tracks which achievement category/subcategory headers are collapsed, per Pokémon.
// Kept outside the render functions (not on the Pokémon data itself) since it's pure
// view state -- achievementsSectionHTML gets outerHTML-swapped every time an achievement
// is toggled, so this needs to live somewhere that survives that swap.
const achvCollapseState = {};

function isAchvSectionCollapsed(pokemonId, sectionKey){
  return !!achvCollapseState[`${pokemonId}::${sectionKey}`];
}

function toggleAchvSection(pokemonId, sectionKey){
  const k = `${pokemonId}::${sectionKey}`;
  achvCollapseState[k] = !achvCollapseState[k];
  refreshAchievementsSection(pokemonId);
}

// Small circular disclosure button: right-pointing chevron rotates to point down when open.
function achvCollapseToggleHTML(open){
  return `
    <span class="collapse-circle-btn${open ? ' open' : ''}" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 6 15 12 9 18"/></svg>
    </span>
  `;
}

function achievementGroupHTML(p, sub, readonly){
  if(sub.order === 'grouped'){
    return sub.groups.map(g => {
      const items = g.keys.map(k => sub.items.find(i=>i.key===k)).filter(Boolean);
      const visibleItems = readonly ? items.filter(item => isAchievementEarned(p, item)) : items;
      if(visibleItems.length === 0) return '';
      return `
        <div class="achv-group">
          <div class="achv-group-label">${escapeHTML(g.label)}</div>
          <div class="achv-badge-grid">
            ${visibleItems.map(item => item.isMemoryRibbon ? memoryRibbonBadgeHTML(p, item, readonly) : achievementBadgeHTML(p, item, p.achievementKeys.includes(item.key), readonly)).join('')}
          </div>
        </div>
      `;
    }).join('');
  }
  const items = readonly ? sub.items.filter(item => isAchievementEarned(p, item)) : sub.items;
  if(items.length === 0) return '';
  return `<div class="achv-badge-grid">${items.map(item => {
    if(item.isMemoryRibbon) return memoryRibbonBadgeHTML(p, item, readonly);
    return achievementBadgeHTML(p, item, p.achievementKeys.includes(item.key), readonly);
  }).join('')}</div>`;
}

function customAchievementBadgeHTML(p, custom, readonly){
  return `
    <div class="achv-badge ${readonly ? 'readonly' : 'selected'} custom" title="${escapeAttr(custom.name)}">
      <img src="${custom.icon}" alt="">
      <span class="achv-badge-label">${escapeHTML(custom.name)}</span>
      ${readonly ? '' : `<button type="button" class="achv-custom-remove" title="Remove custom achievement" onclick="event.stopPropagation(); removeCustomAchievement('${p.id}','${custom.id}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`}
    </div>
  `;
}

function customAchievementsForTag(p, tag){
  return p.customAchievements.filter(c => c.tag === tag);
}

// Renders the inline field for a single achievement with a generic dynamic title (control
// panel-defined label/placeholder/template), mirroring the built-in Partner Ribbon field
// below. One of these appears per selected dynamic achievement, in whichever subcategory
// it actually lives in -- there's nowhere else in the UI to set its per-Pokémon value.
function customTitleFieldHTML(p, item, readonly){
  const title = item.title;
  const value = (p.customTitleFields && p.customTitleFields[item.key]) || '';
  const display = resolveTitleDisplay(p, item.key);
  const subject = p.nickname || p.species;
  const preview = display.type === 'suffix' ? `${subject} ${display.text}` : `${display.text} ${subject}`;
  const label = escapeHTML(title.fieldLabel || item.name);
  if(readonly){
    return `
      <div class="achv-partner-field">
        <label>${label}</label>
        <div class="v">${escapeHTML(value || '-')}</div>
        <div class="hint">Used in the title: "<span id="dynamicTitlePreview_${p.id}_${item.key}">${escapeHTML(preview)}</span>"</div>
      </div>
    `;
  }
  return `
    <div class="achv-partner-field">
      <label>${label}</label>
      <input type="text" value="${escapeAttr(value)}" placeholder="${escapeAttr(title.placeholder || '')}"
        onchange="updateCustomTitleField('${p.id}', '${item.key}', this.value)">
      <div class="hint">Used in the title: "<span id="dynamicTitlePreview_${p.id}_${item.key}">${escapeHTML(preview)}</span>"</div>
    </div>
  `;
}

// All currently-selected achievements in a given subcategory that have a generic dynamic
// title, each rendered with its own field via customTitleFieldHTML above.
function dynamicTitleFieldsHTML(p, sub, readonly){
  return (sub.items || [])
    .filter(it => it.title && it.title.type === 'dynamic' && p.achievementKeys.includes(it.key))
    .map(it => customTitleFieldHTML(p, it, readonly))
    .join('');
}

function achievementsSectionHTML(p, readonly){
  const tagToSubcat = {
    'ribbons-league': ACHIEVEMENT_CATALOG.ribbons.subcategories.league,
    'ribbons-contest': ACHIEVEMENT_CATALOG.ribbons.subcategories.contest,
    'ribbons-tower': ACHIEVEMENT_CATALOG.ribbons.subcategories.tower,
    'ribbons-memorial': ACHIEVEMENT_CATALOG.ribbons.subcategories.memorial,
    'ribbons-gift': ACHIEVEMENT_CATALOG.ribbons.subcategories.gift,
    'marks': ACHIEVEMENT_CATALOG.marks.subcategories.marks,
    'misc': ACHIEVEMENT_CATALOG.misc.subcategories.bonus,
    'misc-pokeathlon': ACHIEVEMENT_CATALOG.misc.subcategories.pokeathlon
  };

  // Partner Ribbon needs its trainer-name field surfaced inline when selected, since the
  // title text depends on it and there's nowhere else in the UI to set it per-Pokémon.
  const partnerSelected = p.achievementKeys.includes('partner_ribbon');
  const partnerFieldHTML = partnerSelected ? (readonly ? `
    <div class="achv-partner-field">
      <label>Partner Ribbon Trainer Name</label>
      <div class="v">${escapeHTML(p.partnerTrainerName || '-')}</div>
      <div class="hint">Used as the title prefix: "<span id="partnerPreview_${p.id}">${escapeHTML((p.partnerTrainerName||'Trainer'))}'s ${escapeHTML(p.nickname||p.species)}</span>"</div>
    </div>
  ` : `
    <div class="achv-partner-field">
      <label>Partner Ribbon Trainer Name</label>
      <input type="text" value="${escapeAttr(p.partnerTrainerName)}" placeholder="e.g. Ash"
        onchange="updatePartnerTrainerName('${p.id}', this.value)">
      <div class="hint">Used as the title prefix: "<span id="partnerPreview_${p.id}">${escapeHTML((p.partnerTrainerName||'Trainer'))}'s ${escapeHTML(p.nickname||p.species)}</span>"</div>
    </div>
  `) : '';

  const sectionsHTML = [
    ['Ribbons', [
      ['League Ribbons','ribbons-league'], ['Contest Ribbons','ribbons-contest'],
      ['Tower Ribbons','ribbons-tower'], ['Memorial Ribbons','ribbons-memorial'], ['Gift Ribbons','ribbons-gift']
    ]],
    ['Marks', [['Marks','marks']]],
    ['Miscellaneous Achievements', [['Pok\u00e9athlon Achievements','misc-pokeathlon'], ['Bonus Achievements','misc']]]
  ];

  const earnedKeys = getEarnedTitleKeys(p);
  const titleOptions = earnedKeys.map(k => {
    const display = resolveTitleDisplay(p, k);
    const preview = display.type === 'prefix' ? (display.full || `${display.text} ${p.nickname||p.species}`) : `${p.nickname||p.species} ${display.text}`;
    return `<option value="${escapeAttr(k)}" ${p.activeTitleKey===k?'selected':''}>${escapeHTML(preview)}</option>`;
  }).join('');

  const titlePickerHTML = readonly ? '' : `
    <div class="achv-title-picker">
      <label>Active Title</label>
      <select onchange="setActiveTitle('${p.id}', this.value)">
        <option value="">${earnedKeys.length ? 'No title displayed' : 'No titles earned yet'}</option>
        ${titleOptions}
      </select>
      <div class="hint">Choose one earned Ribbon or Mark title to display beside this Pok\u00e9mon's nickname.</div>
    </div>
  `;

  const addCustomBtnHTML = readonly ? '' : `
    <button type="button" class="btn ghost achv-add-custom-btn" onclick="openAddCustomAchievement('${p.id}','ribbons-league')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:13px;height:13px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add Custom Achievement
    </button>
  `;

  const categoriesHTML = sectionsHTML.map(([catLabel, subs]) => {
    const subsHTML = subs.map(([subLabel, tag]) => {
      const sub = tagToSubcat[tag];
      const customs = customAchievementsForTag(p, tag);
      const groupHTML = achievementGroupHTML(p, sub, readonly);
      const hasGroupContent = !readonly || groupHTML.trim().length > 0;
      if(readonly && !hasGroupContent && customs.length === 0) return '';
      const subContentHTML = `
        ${groupHTML}
        ${tag === 'ribbons-memorial' && partnerFieldHTML ? partnerFieldHTML : ''}
        ${dynamicTitleFieldsHTML(p, sub, readonly)}
        ${customs.length ? `<div class="achv-badge-grid achv-custom-grid">${customs.map(c=>customAchievementBadgeHTML(p,c,readonly)).join('')}</div>` : ''}
      `;
      if(subs.length <= 1){
        // Only one subcategory under this category (e.g. Marks) -- the category header
        // above already covers collapsing it, so skip a redundant second toggle here.
        return `<div class="achv-subcategory">${subContentHTML}</div>`;
      }
      const subOpen = !isAchvSectionCollapsed(p.id, tag);
      return `
        <div class="achv-subcategory">
          <button type="button" class="achv-toggle-header achv-subcategory-label" onclick="toggleAchvSection('${p.id}','${tag}')">
            ${achvCollapseToggleHTML(subOpen)}
            <span>${escapeHTML(subLabel)}</span>
          </button>
          <div class="collapsible${subOpen ? ' open' : ''}"><div class="collapsible-inner">${subContentHTML}</div></div>
        </div>
      `;
    }).join('');
    if(readonly && !subsHTML.trim()) return '';
    const catKey = `cat-${catLabel}`;
    const catOpen = !isAchvSectionCollapsed(p.id, catKey);
    return `
      <div class="achv-category">
        <div class="achv-category-label achv-header-row">
          <button type="button" class="achv-toggle-header" onclick="toggleAchvSection('${p.id}','${catKey}')">
            ${achvCollapseToggleHTML(catOpen)}
            <span>${escapeHTML(catLabel)}</span>
          </button>
          ${catLabel === 'Ribbons' ? addCustomBtnHTML : ''}
        </div>
        <div class="collapsible${catOpen ? ' open' : ''}"><div class="collapsible-inner">${subsHTML}</div></div>
      </div>
    `;
  }).join('');

  return `
    <div class="achv-section">
      ${titlePickerHTML}
      ${categoriesHTML || (readonly ? `<div class="hint">No achievements unlocked yet.</div>` : '')}
    </div>
  `;
}

// Called after a global setting affecting achievement display (e.g. the Unreleased
// Achievements toggle) changes, so any currently-open detail/edit view updates immediately
// instead of waiting for the next time it's reopened.
function refreshAllOpenAchievementsSections(){
  ['detailOverlay','formOverlay'].forEach(overlayId => {
    const el = document.getElementById(overlayId);
    if(el && el.dataset.pokemonId) refreshAchievementsSection(el.dataset.pokemonId);
  });
}

function refreshAchievementsSection(id){
  const p = findPokemonById(id);
  if(!p) return;
  // Re-render the achievements section in place wherever it's currently shown: read-only
  // inside the detail view's overlay, editable inside the edit form's overlay, then re-bind
  // (innerHTML swap loses live focus/selection state otherwise).
  const containers = [
    { el: document.getElementById('detailOverlay'), readonly: true },
    { el: document.getElementById('formBody'), readonly: false }
  ];
  containers.forEach(({ el, readonly }) => {
    if(!el) return;
    const labels = el.querySelectorAll('.section-label');
    let achvLabel = null;
    labels.forEach(l => { if(l.textContent.trim() === 'Achievements') achvLabel = l; });
    if(achvLabel && achvLabel.nextElementSibling){
      achvLabel.nextElementSibling.outerHTML = achievementsSectionHTML(p, readonly);
    }
  });
}

function toggleAchievement(id, key){
  const p = findPokemonById(id);
  if(!p) return;
  const item = ACHIEVEMENT_INDEX[key];
  if(!item) return;
  if(isAutoGrantedAchievement(item)) return; // auto-awarded only, not manually togglable
  if(isAchievementLocked(p, item)) return; // prerequisites not yet earned
  const idx = p.achievementKeys.indexOf(key);
  if(idx === -1) p.achievementKeys.push(key);
  else p.achievementKeys.splice(idx, 1);
  // Toggling one off can leave a dependent achievement's prerequisites unmet.
  cleanupLockedAchievements(p);
  // dropping a title's underlying achievement invalidates it as the active title
  if(p.activeTitleKey && !getEarnedTitleKeys(p).includes(p.activeTitleKey)) p.activeTitleKey = '';
  refreshAchievementsSection(id);
  renderGrid();
}

// Unreleased Ribbons/Marks/etc. are still shown (greyed out) by default, but clicking one
// warns that it isn't available in any official game yet before letting the user force it
// on anyway, rather than being inert. Turning an already force-enabled one back off needs
// no re-warning, since removing it is always safe.
function confirmForceEnableUnreleased(id, key){
  const p = findPokemonById(id);
  if(!p) return;
  const item = ACHIEVEMENT_INDEX[key];
  if(!item) return;
  if(p.achievementKeys.includes(key)){
    toggleAchievement(id, key);
    return;
  }
  openUnreleasedWarningModal(id, key, item);
}
function openUnreleasedWarningModal(id, key, item){
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'unreleasedWarningOverlay';
  overlay.style.zIndex = 60;
  overlay.onclick = (e) => { if(e.target === overlay) closeUnreleasedWarningModal(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:420px;">
      <div class="modal-head">
        <div style="font-family:var(--sans); font-weight:800; font-size:19px;">Unreleased Achievement</div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeUnreleasedWarningModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        <div class="hint settings-unreleased-warning">⚠ "${escapeHTML(item.name)}" is not yet available in any official Pokémon game. Marking it here doesn't unlock or grant it in-game, it just lets you track it ahead of release.</div>
      </div>
      <div class="modal-foot">
        <button type="button" class="btn ghost" onclick="closeUnreleasedWarningModal()">Cancel</button>
        <button type="button" class="btn primary" onclick="forceEnableUnreleased('${id}','${key}')">Enable Anyway</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
function closeUnreleasedWarningModal(){
  const el = document.getElementById('unreleasedWarningOverlay');
  if(el) el.remove();
}
function forceEnableUnreleased(id, key){
  closeUnreleasedWarningModal();
  toggleAchievement(id, key);
}

function toggleMemoryExpand(id, kind){
  if(!achievementMemoryExpanded[id]) achievementMemoryExpanded[id] = {};
  achievementMemoryExpanded[id][kind] = !achievementMemoryExpanded[id][kind];
  refreshAchievementsSection(id);
}

// Contest Memory sub-ribbons are tiered per region+category (e.g. Hoenn Cool has
// Base -> Super -> Hyper -> Master). Selecting a higher tier implies you've already
// cleared every lower tier in that same line, so it auto-selects them too; removing a
// tier likewise removes any higher tiers that depended on it, keeping the set consistent.
const CONTEST_MEMORY_TIER_ORDER = {};
CONTEST_MEMORY_REGIONS.forEach(({region, tiers}) => {
  CONTEST_MEMORY_TIER_ORDER[region.toLowerCase()] = tiers.map(t => (t || 'base').toLowerCase().trim());
});
function applyContestTierConsistency(list, subKey, selecting){
  const m = subKey.match(/^contestmem_([a-z]+)_([a-z]+)_([a-z]+)$/);
  if(!m) return;
  const [, region, tierKey, category] = m;
  const order = CONTEST_MEMORY_TIER_ORDER[region];
  if(!order) return;
  const tierIdx = order.indexOf(tierKey);
  if(tierIdx === -1) return;
  if(selecting){
    for(let i=0; i<tierIdx; i++){
      const lowerKey = `contestmem_${region}_${order[i]}_${category}`;
      if(!list.includes(lowerKey)) list.push(lowerKey);
    }
  } else {
    for(let i=tierIdx+1; i<order.length; i++){
      const higherKey = `contestmem_${region}_${order[i]}_${category}`;
      const hIdx = list.indexOf(higherKey);
      if(hIdx !== -1) list.splice(hIdx, 1);
    }
  }
}

function toggleMemorySubRibbon(id, parentKey, subKey){
  const p = findPokemonById(id);
  if(!p) return;
  const item = ACHIEVEMENT_INDEX[parentKey];
  if(!item) return;
  const list = getMemorySubKeyList(p, item);
  const idx = list.indexOf(subKey);
  const selecting = idx === -1;
  if(selecting) list.push(subKey);
  else list.splice(idx, 1);
  if(parentKey === 'contest_memory_ribbon') applyContestTierConsistency(list, subKey, selecting);
  // A sub-ribbon change can affect a Master Ribbon-style achievement's earned state, which
  // in turn can unlock/lock things that depend on it -- recheck everything defensively.
  cleanupLockedAchievements(p);
  if(p.activeTitleKey && !getEarnedTitleKeys(p).includes(p.activeTitleKey)) p.activeTitleKey = '';
  refreshAchievementsSection(id);
  renderGrid();
}

function updatePartnerTrainerName(id, value){
  const p = findPokemonById(id);
  if(!p) return;
  p.partnerTrainerName = value.trim();
  refreshAchievementsSection(id);
  renderGrid();
}

function updateCustomTitleField(id, achievementKey, value){
  const p = findPokemonById(id);
  if(!p) return;
  if(!p.customTitleFields || typeof p.customTitleFields !== 'object') p.customTitleFields = {};
  p.customTitleFields[achievementKey] = value.trim();
  refreshAchievementsSection(id);
  renderGrid();
}

function setActiveTitle(id, key){
  const p = findPokemonById(id);
  if(!p) return;
  p.activeTitleKey = key || '';
  refreshAchievementsSection(id);
  renderGrid();
}

function removeCustomAchievement(id, customId){
  const p = findPokemonById(id);
  if(!p) return;
  p.customAchievements = p.customAchievements.filter(c => c.id !== customId);
  refreshAchievementsSection(id);
  renderGrid();
}

/* ---- Add Custom Achievement (small inline prompt-style modal) ---- */
// The four placeholder icon choices offered when creating a custom achievement, shown as
// selectable tiles side-by-side (not a dropdown) so the icon is visible at a glance.
const CUSTOM_ACHV_ICON_CHOICES = [
  { key:'ribbon', label:'Ribbon', icon: PLACEHOLDER_RIBBON_ICON },
  { key:'mark', label:'Mark', icon: PLACEHOLDER_MARK_ICON },
  { key:'diploma', label:'Diploma', icon: PLACEHOLDER_DIPLOMA_ICON },
  { key:'star', label:'Star', icon: PLACEHOLDER_STAR_ICON }
];
let customAchvIconDraft = 'ribbon';

function customAchvIconPickerHTML(selectedKey){
  return `
    <div class="custom-achv-icon-grid">
      ${CUSTOM_ACHV_ICON_CHOICES.map(c => `
        <button type="button" class="custom-achv-icon-option ${selectedKey===c.key?'selected':''}" data-icon-key="${c.key}" title="${escapeAttr(c.label)}" onclick="selectCustomAchvIcon('${c.key}')">
          <img src="${c.icon}" alt="${escapeAttr(c.label)}">
          <span>${escapeHTML(c.label)}</span>
        </button>
      `).join('')}
    </div>
  `;
}
function selectCustomAchvIcon(key){
  customAchvIconDraft = key;
  document.querySelectorAll('.custom-achv-icon-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.iconKey === key);
  });
}

function openAddCustomAchievement(pokemonId, defaultTag){
  customAchvIconDraft = 'ribbon';
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'customAchvOverlay';
  overlay.style.zIndex = 60;
  overlay.onclick = (e) => { if(e.target === overlay) closeCustomAchievementModal(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:420px;">
      <div class="modal-head">
        <div style="font-family:var(--sans); font-weight:800; font-size:19px;">Add Custom Achievement</div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeCustomAchievementModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        <div class="field">
          <label>Achievement Name</label>
          <input type="text" id="customAchvName" placeholder="e.g. Regional Tournament Winner">
        </div>
        <div class="field" style="margin-top:14px;">
          <label>Category</label>
          <select id="customAchvTag">
            ${CUSTOM_ACHIEVEMENT_TAGS.map(t => `<option value="${t.value}" ${t.value===defaultTag?'selected':''}>${escapeHTML(t.label)}</option>`).join('')}
          </select>
        </div>
        <div class="field" style="margin-top:14px;">
          <label>Icon</label>
          ${customAchvIconPickerHTML(customAchvIconDraft)}
        </div>
        <div class="hint" style="margin-top:10px;">Custom achievements don't grant a title.</div>
      </div>
      <div class="modal-foot">
        <button type="button" class="btn ghost" onclick="closeCustomAchievementModal()">Cancel</button>
        <button type="button" class="btn primary" onclick="saveCustomAchievement('${pokemonId}')">Add Achievement</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('customAchvName').focus();
}
function closeCustomAchievementModal(){
  const el = document.getElementById('customAchvOverlay');
  if(el) el.remove();
}
function saveCustomAchievement(pokemonId){
  const name = document.getElementById('customAchvName').value.trim();
  const tag = document.getElementById('customAchvTag').value;
  if(!name){ showToast('Achievement name is required.'); return; }
  const p = findPokemonById(pokemonId);
  if(!p) return;
  const chosen = CUSTOM_ACHV_ICON_CHOICES.find(c => c.key === customAchvIconDraft) || CUSTOM_ACHV_ICON_CHOICES[0];
  p.customAchievements.push({ id: cryptoId(), name, tag, icon: chosen.icon });
  closeCustomAchievementModal();
  refreshAchievementsSection(pokemonId);
  renderGrid();
  showToast(`${name} added.`);
}

function openDetail(id){
  const p = state.pokemon.find(x=>x.id===id);
  if(!p) return;
  const detailTypes = displayTypes(p);
  const primaryColor = TYPE_HEX[detailTypes[0]] || '#4FD1C5';
  const displaySprite = resolveDisplaySprite(p);
  const formPrefix = p.preferredForm === 'mega' ? 'MEGA ' : p.preferredForm === 'gigantamax' ? 'GIGANTAMAX ' : '';
  const formSuffix = (p.preferredForm === 'mega' && p.megaForm) ? ' ' + p.megaForm.toUpperCase() : '';

  const movesRows = p.games.map(g => {
    const preset = GAME_PRESET_INDEX[g.gameKey || detectGameKeyFromTag(g.tag)];
    return `
    <tr>
      <td><span class="game-tag">${preset ? `<img class="game-tag-icon" src="${preset.icon}" alt="${escapeAttr(preset.label)}" title="${escapeAttr(preset.label)}">` : ''}${escapeHTML(g.tag)}</span></td>
      <td class="${g.ability? '':'empty-cell'}">${g.ability ? `<span class="ability-tag">${escapeHTML(g.ability)}</span>` : '-'}</td>
      ${g.moves.map(m => `<td class="${m? '':'empty-cell'}">${m ? m : '-'}</td>`).join('')}
    </tr>
  `;
  }).join('');

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'detailOverlay';
  overlay.dataset.pokemonId = p.id;
  overlay.onclick = (e) => { if(e.target === overlay) closeDetail(); };
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <div class="modal-close" role="button" tabindex="0" aria-label="Share as image" title="Share as image" style="right:64px;" onclick="shareCardAsImage('${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.6" x2="15.4" y2="6.4"/><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"/></svg>
        </div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeDetail()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div style="display:flex; align-items:center; gap:16px;">
          <div class="card-sprite" style="width:64px;height:64px; font-size:30px; --glow:${primaryColor};">${displaySprite ? `<img src="${escapeAttr(displaySprite)}">` : '<div class="brand-mark mini"></div>'}</div>
          <div>
            <div class="card-id" style="font-size:12px;">${dexPrefixHTML(p)}${formPrefix}${escapeHTML(p.species.toUpperCase())}${escapeHTML(formSuffix)}</div>
            <div style="font-family:var(--nickname-font); font-weight:800; font-size:26px; letter-spacing:-0.02em; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span>${titledNicknameHTML(p)}</span>
              ${p.shiny ? `<img src="${SHINY_ICON}" alt="Shiny" title="Shiny" style="width:20px;height:20px;">` : ''}
              ${(p.isMega || p.isGigantamax) ? `<span class="detail-form-switcher">
                ${p.isMega ? `<button type="button" class="detail-form-switch-btn ${p.preferredForm==='mega'?'active':''}" title="${p.preferredForm==='mega' ? 'Showing Mega Evolution, click to switch to Default' : 'Switch to Mega Evolution'}" onclick="setPreferredForm('${p.id}','mega'); closeDetail(); openDetail('${p.id}')"><img src="${MEGA_ICON}" alt="Mega Evolution"></button>` : ''}
                ${p.isGigantamax ? `<button type="button" class="detail-form-switch-btn ${p.preferredForm==='gigantamax'?'active':''}" title="${p.preferredForm==='gigantamax' ? 'Showing Gigantamax, click to switch to Default' : 'Switch to Gigantamax'}" onclick="setPreferredForm('${p.id}','gigantamax'); closeDetail(); openDetail('${p.id}')"><img src="${GIGANTAMAX_ICON}" alt="Gigantamax"></button>` : ''}
              </span>` : ''}
            </div>
            <div class="type-row" style="margin:6px 0 0;">${detailTypes.map(t=>`<span class="type-badge" style="background:${TYPE_HEX[t]}">${t}</span>`).join('')}</div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="section-label">Profile</div>
        <div class="info-grid">
          <div class="info-cell"><div class="k">Nature</div><div class="v" style="display:flex; align-items:center; gap:6px;">${escapeHTML(p.nature)||'-'}${p.nature ? `<span class="nature-tooltip-trigger" tabindex="0" style="width:22px;height:22px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><div class="nature-tooltip" style="bottom:auto; top:calc(100% + 8px); left:0; right:auto;">${natureTooltipHTML(p.nature)}</div></span>` : ''}</div></div>
          <div class="info-cell"><div class="k">Gender</div><div class="v">${genderSymbolHTML(p.gender)||'-'}</div></div>
          <div class="info-cell"><div class="k">Met Location</div><div class="v">${p.metLocation||'-'}</div></div>
          <div class="info-cell"><div class="k">Housed Ball</div><div class="v" style="display:flex; align-items:center; gap:6px;">${p.ball ? `${ballIconHTML(p.ball,26)}${escapeHTML(p.ball)}` : '-'}</div></div>
          <div class="info-cell"><div class="k">Origin Game</div><div class="v" style="display:flex; align-items:center; gap:6px;">${(() => { const preset = GAME_PRESET_INDEX[detectGameKeyFromTag(p.originGame)]; return p.originGame ? `${preset ? `<img class="game-tag-icon" src="${preset.icon}" alt="${escapeAttr(preset.label)}" title="${escapeAttr(preset.label)}">` : ''}${escapeHTML(p.originGame)}` : '-'; })()}</div></div>
          <div class="info-cell"><div class="k">Last Game</div><div class="v" style="display:flex; align-items:center; gap:6px;">${(() => { const preset = GAME_PRESET_INDEX[detectGameKeyFromTag(p.lastGame)]; return p.lastGame ? `${preset ? `<img class="game-tag-icon" src="${preset.icon}" alt="${escapeAttr(preset.label)}" title="${escapeAttr(preset.label)}">` : ''}${escapeHTML(p.lastGame)}` : '-'; })()}</div></div>
          <div class="info-cell"><div class="k">Games Logged</div><div class="v">${p.games.length}</div></div>
          <div class="info-cell"><div class="k">Species</div><div class="v"><a href="${bulbapediaURL(p.species)}" target="_blank" rel="noopener noreferrer" class="species-link" title="View on Bulbapedia">${escapeHTML(p.species)}<svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a></div></div>
        </div>

        ${p.metDate ? `<div class="section-label">Age</div><div class="age-display"><div class="age-duration">${formatAge(p.metDate) || 'Met date is in the future'}</div><div class="age-met-date"><svg class="age-clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>Met on <span class="age-met-date-value">${formatMetDate(p.metDate) || '-'}</span></div></div>` : ''}

        ${p.notes ? `<div class="section-label">Trainer Notes</div><div class="notes-box">${p.notes}</div>` : ''}

        <div class="section-label">Achievements</div>
        ${achievementsSectionHTML(p, true)}

        <div class="section-label">Moveset by Game</div>
        <div class="table-scroll">
        <table class="movetable">
          <thead><tr><th>Game</th><th>Ability</th><th>Move 1</th><th>Move 2</th><th>Move 3</th><th>Move 4</th></tr></thead>
          <tbody>${movesRows || `<tr><td colspan="6" class="empty-cell">No games logged yet.</td></tr>`}</tbody>
        </table>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn danger" onclick="deletePokemon('${p.id}'); closeDetail();">Delete Pokémon</button>
        <button class="btn primary" onclick="closeDetail(); openForm('${p.id}')">Edit</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
function closeDetail(){
  const el = document.getElementById('detailOverlay');
  if(el) el.remove();
}

