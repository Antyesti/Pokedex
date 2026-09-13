
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
// Maps a sub-ribbon's own key back to its parent Memory Ribbon item's key. Used where a
// sub-ribbon needs to check something that only lives on the parent (release status,
// whether it's currently selected on a given Pokémon), since a sub-ribbon has no such
// state of its own -- it's tracked in the parent's own sub-key list.
const SUB_RIBBON_PARENT_KEY = {};
Object.values(ACHIEVEMENT_INDEX).forEach(item => {
  if(item.isMemoryRibbon && Array.isArray(item.subRibbons)){
    item.subRibbons.forEach(r => { SUB_RIBBON_PARENT_KEY[r.key] = item.key; });
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

// The icon to show for a given earned title key: a Memory Ribbon-style item swaps to its
// gold icon once every sub-ribbon is collected, same rule the achievement grid itself uses.
function resolveTitleIcon(p, key){
  const item = ACHIEVEMENT_INDEX[key];
  if(!item) return '';
  if(item.isMemoryRibbon){
    const st = memoryRibbonState(p, item, getMemorySubKeyList(p, item));
    return st.gold ? item.goldIcon : item.icon;
  }
  return item.icon;
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

/* ============== ACHIEVEMENTS SECTION (detail view) ============== */
// Tracks which Memory Ribbon expand panel (if any) is open per Pokémon id, so reopening
// the detail view or re-rendering after a toggle doesn't unexpectedly collapse it.
// Shape: { [pokemonId]: { [memoryRibbonItemKey]: bool } }
const achievementMemoryExpanded = {};
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
// automatically grant this one, which is then never manually toggled). These replace what
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
  const ineligibleReason = ribbonIneligibilityReason(p, item.key);
  const disabled = item.status === 'unreleased' || !!ineligibleReason;

  // Auto-granted achievements are never manually toggled, so show current state read-only.
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
  // earned one. The grey-out, "Unreleased" tag, and tooltip note only apply while
  // it's still unselected.
  const showAsDisabled = disabled && !selected;
  const disabledTag = ineligibleReason ? 'Restricted' : 'Unreleased';
  const title = showAsDisabled ? `${item.name}\n${ineligibleReason || 'Unreleased'}` : item.name;

  // Read-only (detail view): render as a static, non-interactive badge. Every badge shown
  // here is earned (unearned ones are filtered out before this runs), so it gets a plain
  // "readonly" look rather than the "selected" glow used for the interactive toggle grid --
  // otherwise the whole section reads as if everything were permanently clicked.
  if(readonly){
    return `
      <div class="achv-badge readonly ${showAsDisabled?'disabled':''}" title="${escapeAttr(title)}">
        <img src="${item.icon}" alt="">
        <span class="achv-badge-label">${escapeHTML(item.name)}</span>
        ${showAsDisabled ? `<span class="achv-unreleased-tag">${disabledTag}</span>` : ''}
      </div>
    `;
  }

  return `
    <button type="button" class="achv-badge ${selected?'selected':''} ${showAsDisabled?'disabled':''}"
      title="${escapeAttr(title)}"
      onclick="${disabled ? `confirmForceEnableIneligible('${p.id}','${item.key}')` : `toggleAchievement('${p.id}','${item.key}')`}">
      <img src="${item.icon}" alt="">
      <span class="achv-badge-label">${escapeHTML(item.name)}</span>
      ${showAsDisabled ? `<span class="achv-unreleased-tag">${disabledTag}</span>` : ''}
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
    const reason = ribbonIneligibilityReason(p, r.key);
    if(readonly){
      return `
        <div class="achv-sub-badge ${sel?'selected':''}" title="${escapeAttr(r.name)}">
          <img src="${r.icon}" alt="">
          <span>${escapeHTML(r.name)}</span>
        </div>
      `;
    }
    const showAsDisabled = !!reason && !sel;
    const title = showAsDisabled ? `${r.name}\n${reason}` : r.name;
    return `
      <button type="button" class="achv-sub-badge ${sel?'selected':''} ${showAsDisabled?'disabled':''}" title="${escapeAttr(title)}"
        onclick="${reason ? `confirmForceEnableIneligibleSubRibbon('${p.id}','${item.key}','${r.key}')` : `toggleMemorySubRibbon('${p.id}','${item.key}','${r.key}')`}">
        <img src="${r.icon}" alt="">
        <span>${escapeHTML(r.name)}</span>
        ${showAsDisabled ? '<span class="achv-unreleased-tag">Restricted</span>' : ''}
      </button>
    `;
  };
  // Read-only view shows only sub-ribbons the Pokémon has actually earned; the edit form
  // shows the full picker grid so any sub-ribbon can be toggled individually, minus any the
  // Restricted Ribbons on Edit Screen setting says to hide.
  const subRibbons = (readonly ? item.subRibbons.filter(r => subKeys.includes(r.key)) : item.subRibbons)
    .filter(r => !hideRestrictedRibbonKey(p, r.key, readonly, subKeys.includes(r.key)));

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

// Whether a Ribbon/Mark key should be hidden entirely on the Edit Screen rather than shown
// disabled with a "Restricted" tag, per the Restricted Ribbons on Edit Screen setting
// (Settings). Only ever hides something the Pokémon hasn't already got -- existing data on
// a Pokémon is never hidden just because it would now be newly restricted.
function hideRestrictedRibbonKey(p, key, readonly, selected){
  if(readonly) return false;
  if(!state.settings || state.settings.showRestrictedRibbons !== false) return false;
  if(selected) return false;
  return !!ribbonIneligibilityReason(p, key);
}

// Tracks which achievement category/subcategory headers are collapsed, per Pokémon.
// Kept outside the render functions (not on the Pokémon data itself) since it's pure
// view state, since achievementsSectionHTML gets outerHTML-swapped every time an achievement
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
      const visibleItems = (readonly ? items.filter(item => isAchievementEarned(p, item)) : items)
        .filter(item => !hideRestrictedRibbonKey(p, item.key, readonly, isAchievementEarned(p, item)));
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
  const items = (readonly ? sub.items.filter(item => isAchievementEarned(p, item)) : sub.items)
    .filter(item => !hideRestrictedRibbonKey(p, item.key, readonly, isAchievementEarned(p, item)));
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
// it actually lives in, since there's nowhere else in the UI to set its per-Pokémon value.
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

// Ribbons filter: currently just Met Level, kept as its own small panel next to
// "Add Custom Achievement" rather than a normal form field, since it isn't part of the
// Pokémon's own data the way Met Location/Met Date are -- it only exists to grey out
// Ribbons that Met Level rules out (Winning Ribbon, Footprint Ribbon).
const ribbonFilterOpenState = {};

// Same three buckets data/ribbon-met-level.js uses for eligibility (le50 / 50to70 / gt70),
// surfaced here as a badge so the user can see which one a typed Met Level falls into
// without having to remember the cutoffs.
const MET_LEVEL_BUCKET_LABELS = {
  le50: 'Met Level \u2264 50',
  '50to70': '50 < Met Level \u2264 70',
  gt70: 'Met Level > 70'
};

function metLevelBucketFromRaw(rawValue){
  const n = parseInt(rawValue, 10);
  if(rawValue === '' || rawValue === null || rawValue === undefined || Number.isNaN(n)) return null;
  if(n <= 50) return 'le50';
  if(n <= 70) return '50to70';
  return 'gt70';
}

function metLevelBadgeHTML(id, rawValue){
  const bucket = metLevelBucketFromRaw(rawValue);
  return `<span class="met-level-badge${bucket ? ' met-level-badge-'+bucket : ''}" id="metLevelBadge_${id}">${bucket ? MET_LEVEL_BUCKET_LABELS[bucket] : ''}</span>`;
}

// Fires on every keystroke so the badge tracks what's being typed, ahead of the onchange
// that actually commits the (clamped) value to the Pokémon via setMetLevel.
function updateMetLevelBadge(id, rawValue){
  const el = document.getElementById('metLevelBadge_' + id);
  if(el) el.outerHTML = metLevelBadgeHTML(id, rawValue);
}

function ribbonFilterButtonHTML(p){
  const active = typeof p.metLevel === 'number';
  return `
    <button type="button" class="btn ghost icon-btn achv-filter-btn ${active?'active':''}" title="Ribbon filters" aria-label="Ribbon filters" onclick="toggleRibbonFilterPanel('${p.id}')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
    </button>
  `;
}

function ribbonFilterPanelHTML(p){
  if(!ribbonFilterOpenState[p.id]) return '';
  const value = typeof p.metLevel === 'number' ? p.metLevel : '';
  return `
    <div class="achv-filter-panel">
      <div class="achv-filter-label">Met Level</div>
      <div class="achv-filter-metlevel-row">
        <input type="number" class="achv-filter-metlevel-input" min="1" max="100" placeholder="e.g. 45" value="${value}" oninput="updateMetLevelBadge('${p.id}', this.value)" onchange="setMetLevel('${p.id}', this.value)">
        ${metLevelBadgeHTML(p.id, value)}
      </div>
      <div class="hint">Used to grey out Ribbons Met Level rules out (Winning Ribbon, Footprint Ribbon). Doesn't affect anything else, and isn't shown anywhere outside this filter.</div>
      ${giveAllEligibleHTML(p)}
    </div>
  `;
}

// Give All Eligible Ribbons: adds every Ribbon obtainable specifically in a picked game,
// based on this Pokémon's actual reachable-games graph (Origin Game, Last Game, Moveset by
// Game, and each game's own Travels To/Virtual Console connectivity).
function giveAllEligibleHTML(p){
  const options = GAME_PRESETS.map(g => `<option value="${escapeHTML(g.key)}">${escapeHTML(g.label)}</option>`).join('');
  return `
    <div class="achv-filter-label" style="margin-top:6px;">Give All Eligible Ribbons</div>
    <div class="achv-filter-options" style="align-items:center;">
      <select id="giveAllGameSelect_${p.id}" class="achv-filter-game-select">${options}</select>
      <button type="button" class="btn ghost small" onclick="giveAllEligibleRibbonsFromGame('${p.id}')">Give Ribbons</button>
    </div>
    <div class="hint">Adds every Ribbon this Pok\u00e9mon is eligible for that's earnable specifically in the selected game. Marks are never included and stay manual.</div>
  `;
}

function toggleRibbonFilterPanel(id){
  ribbonFilterOpenState[id] = !ribbonFilterOpenState[id];
  refreshAchievementsSection(id);
}

const ribbonHelperOpenState = {};

function ribbonHelperButtonHTML(p){
  const active = !!ribbonHelperOpenState[p.id];
  return `
    <button type="button" class="btn ghost icon-btn achv-filter-btn ${active?'active':''}" title="Ribbons Helper" aria-label="Ribbons Helper" onclick="toggleRibbonHelperPanel('${p.id}')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
    </button>
  `;
}

// Shows, per game this Pokémon's history can reach, which Ribbons it can specifically earn
// there -- so a game with nothing to offer is skipped rather than shown empty. Ribbons
// flagged as a last chance won't be earnable in any later game the Pokémon can reach, so
// they need picking up now or they're gone for good.
// Joins display names the way a sentence would: "Emerald", "Ruby and Emerald", "Ruby,
// Sapphire and Emerald" -- no Oxford comma, matching how the merged Ribbons Helper entries
// read out a group of games that all offer the exact same Ribbons.
function joinWithAnd(names){
  if(names.length <= 1) return names.join('');
  if(names.length === 2) return names.join(' and ');
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
}

// Whether this Ribbon is already selected on the Pokémon -- a sub-ribbon's own state lives
// in its parent Memory Ribbon's sub-key list, not on the Pokémon directly, so this checks
// the right place for either kind.
function isRibbonAlreadySelected(p, key){
  const parentKey = SUB_RIBBON_PARENT_KEY[key];
  if(parentKey){
    const parentItem = ACHIEVEMENT_INDEX[parentKey];
    return parentItem ? getMemorySubKeyList(p, parentItem).includes(key) : false;
  }
  return p.achievementKeys.includes(key);
}

function ribbonHelperPanelHTML(p){
  if(!ribbonHelperOpenState[p.id]) return '';
  const games = ribbonHelperGamesForPokemon(p);
  if(!games.length){
    return `
      <div class="achv-filter-panel achv-helper-panel">
        <div class="achv-filter-label">Ribbons Helper</div>
        <div class="hint">No known game history to work from yet. Set an Origin Game, Last Game, or Moveset by Game entry first.</div>
      </div>
    `;
  }
  const gamesHTML = games.map(({ gameKeys, ribbons }) => {
    const presets = gameKeys.map(k => GAME_PRESET_INDEX[k]);
    const iconsHTML = presets.map(preset => preset ? `<img src="${preset.icon}" alt="">` : '').join('');
    const nameText = joinWithAnd(gameKeys.map((k, i) => presets[i] ? presets[i].label : k));
    const ribbonsHTML = ribbons.map(({ key, lastChance }) => {
      const info = ACHIEVEMENT_INDEX[key] || SUB_RIBBON_INDEX[key];
      if(!info) return '';
      // Already having it makes the Last Chance warning moot -- nothing was missed, so it
      // gets a plain "already got this" mark instead of a red one telling you to hurry.
      const selected = isRibbonAlreadySelected(p, key);
      const flagAsLastChance = lastChance && !selected;
      const title = selected
        ? `${info.name}\nAlready selected on this Pok\u00e9mon.`
        : (flagAsLastChance ? `${info.name}\nLast chance! This achievement can\u2019t be earned in any later game this Pok\u00e9mon reaches.` : info.name);
      return `
        <span class="achv-helper-ribbon ${flagAsLastChance?'last-chance':''} ${selected?'selected':''}" title="${escapeAttr(title)}">
          <img src="${info.icon}" alt="">
        </span>
      `;
    }).join('');
    return `
      <div class="achv-helper-game">
        <div class="achv-helper-game-header">
          <span class="achv-helper-game-icons">${iconsHTML}</span>
          <span>${escapeHTML(nameText)}</span>
        </div>
        <div class="achv-helper-ribbon-row">${ribbonsHTML}</div>
      </div>
    `;
  }).join('');
  return `
    <div class="achv-filter-panel achv-helper-panel">
      <div class="achv-filter-label">Ribbons Helper</div>
      <div class="hint">Ribbons this Pok\u00e9mon can earn in each game it can reach. Ones marked in red won't be earnable in any later game, so pick them up now or lose the chance.</div>
      ${gamesHTML}
    </div>
  `;
}

function toggleRibbonHelperPanel(id){
  ribbonHelperOpenState[id] = !ribbonHelperOpenState[id];
  refreshAchievementsSection(id);
}

function setMetLevel(id, rawValue){
  const p = findPokemonById(id);
  if(!p) return;
  const n = parseInt(rawValue, 10);
  p.metLevel = (rawValue === '' || Number.isNaN(n)) ? null : Math.max(1, Math.min(100, n));
  refreshAchievementsSection(id);
}

// Every individually-earnable Ribbon key in the catalog: standalone achievements plus each
// Memory Ribbon's sub-ribbons, but never the Memory Ribbon parent itself (that's an
// aggregate, not something a Pokémon earns directly) and never anything from Marks/Misc.
function allLeafRibbonKeys(){
  const keys = [];
  Object.values(ACHIEVEMENT_CATALOG.ribbons.subcategories).forEach(sub => {
    sub.items.forEach(item => {
      if(item.isMemoryRibbon && Array.isArray(item.subRibbons)){
        item.subRibbons.forEach(r => keys.push({ key: r.key, parentKey: item.key }));
      } else {
        keys.push({ key: item.key, parentKey: null });
      }
    });
  });
  return keys;
}

// Adds every Ribbon this Pokémon is eligible for that's specifically obtainable in the
// chosen game, given its current species/Met Level/game-version settings. Marks are never
// touched, matching how they stay a manual, per-Pokémon judgment call.
function giveAllEligibleRibbonsFromGame(id){
  const p = findPokemonById(id);
  if(!p) return;
  const select = document.getElementById(`giveAllGameSelect_${id}`);
  const gameKey = select ? select.value : null;
  if(!gameKey) return;

  let added = 0;
  allLeafRibbonKeys().forEach(({ key, parentKey }) => {
    const available = ribbonAvailableGames(key);
    if(available && available.length && !available.includes(gameKey)) return; // not from this game
    if(!reachesAnyOfGames(p, [gameKey])) return; // Pokémon can't actually reach this game
    if(metLevelIneligibilityReason(p, key)) return;
    if(ribbonEligibilityReason(p, key)) return;

    if(parentKey){
      const parentItem = ACHIEVEMENT_INDEX[parentKey];
      const list = getMemorySubKeyList(p, parentItem);
      if(!list.includes(key)){ list.push(key); added++; }
    } else if(!p.achievementKeys.includes(key)){
      p.achievementKeys.push(key);
      clearMutuallyExclusive(p, key);
      added++;
    }
  });

  cleanupLockedAchievements(p);
  refreshAchievementsSection(id);
  renderGrid();
  showToast(added > 0 ? `Added ${added} Ribbon${added===1?'':'s'}.` : 'No new Ribbons were eligible from that game.');
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
  const titleRows = earnedKeys.map(k => {
    const display = resolveTitleDisplay(p, k);
    const label = display.type === 'prefix' ? (display.full || `${display.text} ${p.nickname||p.species}`) : `${p.nickname||p.species} ${display.text}`;
    return { key: k, label, icon: resolveTitleIcon(p, k) };
  });

  const titlePickerHTML = readonly ? '' : titleDropdownHTML(p, titleRows);

  const addCustomBtnHTML = readonly ? '' : `
    <div class="achv-toolbar-row">
      <button type="button" class="btn ghost achv-add-custom-btn" onclick="openAddCustomAchievement('${p.id}','ribbons-league')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:13px;height:13px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Custom Achievement
      </button>
      ${ribbonFilterButtonHTML(p)}
      ${ribbonHelperButtonHTML(p)}
    </div>
    ${ribbonFilterPanelHTML(p)}
    ${ribbonHelperPanelHTML(p)}
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
        // Only one subcategory under this category (e.g. Marks). The category header
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

// Jumbo Mark and Mini Mark record opposite extremes of a Pokémon's size and can never
// both apply at once, so selecting one always clears the other.
const MUTUALLY_EXCLUSIVE_ACHIEVEMENTS = [['jumbo_mark', 'mini_mark']];
function clearMutuallyExclusive(p, key){
  MUTUALLY_EXCLUSIVE_ACHIEVEMENTS.forEach(group => {
    if(!group.includes(key)) return;
    group.forEach(otherKey => {
      if(otherKey === key) return;
      const idx = p.achievementKeys.indexOf(otherKey);
      if(idx !== -1) p.achievementKeys.splice(idx, 1);
    });
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
  if(idx === -1){
    p.achievementKeys.push(key);
    clearMutuallyExclusive(p, key);
  }
  else p.achievementKeys.splice(idx, 1);
  // Toggling one off can leave a dependent achievement's prerequisites unmet.
  cleanupLockedAchievements(p);
  // dropping a title's underlying achievement invalidates it as the active title
  if(p.activeTitleKey && !getEarnedTitleKeys(p).includes(p.activeTitleKey)) p.activeTitleKey = '';
  refreshAchievementsSection(id);
  renderGrid();
}

// Unreleased Ribbons/Marks/etc., and Ribbons the Met Level filter rules out, are still
// shown (greyed out) by default, but clicking one warns why before letting the user force
// it on anyway, rather than being inert. Turning an already force-enabled one back off
// needs no re-warning, since removing it is always safe.
function confirmForceEnableIneligible(id, key){
  const p = findPokemonById(id);
  if(!p) return;
  const item = ACHIEVEMENT_INDEX[key];
  if(!item) return;
  if(p.achievementKeys.includes(key)){
    toggleAchievement(id, key);
    return;
  }
  // Recomputed here rather than passed in through the onclick attribute: reason strings
  // routinely contain apostrophes ("hasn't", "can't", "Pokémon's"), and HTML-escaping them
  // for the attribute doesn't help, since the browser decodes entities back to literal
  // characters before handing the attribute value to the JS parser as the handler body --
  // reopening the very string the escaping was meant to close.
  const reason = ribbonIneligibilityReason(p, key);
  openIneligibleWarningModal(id, key, item, reason);
}
function openIneligibleWarningModal(id, key, item, reason, enableAction){
  const message = reason
    ? `⚠ ${escapeHTML(reason)} Marking it here doesn't check this in-game, it just lets you track it against the filter anyway.`
    : `⚠ "${escapeHTML(item.name)}" is not yet available in any official Pokémon game. Marking it here doesn't unlock or grant it in-game, it just lets you track it ahead of release.`;
  const onEnable = enableAction || `forceEnableUnreleased('${id}','${key}')`;
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'unreleasedWarningOverlay';
  overlay.style.zIndex = 60;
  overlay.onclick = (e) => { if(e.target === overlay) closeUnreleasedWarningModal(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:420px;">
      <div class="modal-head">
        <div style="font-family:var(--sans); font-weight:800; font-size:19px;">${reason ? 'Restricted' : 'Unreleased'} Achievement</div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeUnreleasedWarningModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        <div class="hint settings-unreleased-warning">${message}</div>
      </div>
      <div class="modal-foot">
        <button type="button" class="btn ghost" onclick="closeUnreleasedWarningModal()">Cancel</button>
        <button type="button" class="btn primary" onclick="closeUnreleasedWarningModal();${onEnable}">Enable Anyway</button>
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

// Same grey-out-then-confirm pattern as confirmForceEnableIneligible above, but for a
// Memory Ribbon sub-ribbon (e.g. Winning Ribbon), which lives in its own subKey list
// rather than the plain achievementKeys array.
function confirmForceEnableIneligibleSubRibbon(id, parentKey, subKey){
  const p = findPokemonById(id);
  if(!p) return;
  const item = ACHIEVEMENT_INDEX[parentKey];
  if(!item) return;
  const list = getMemorySubKeyList(p, item);
  if(list.includes(subKey)){
    toggleMemorySubRibbon(id, parentKey, subKey);
    return;
  }
  // Recomputed rather than threaded through the onclick attribute -- see the comment in
  // confirmForceEnableIneligible above for why passing reason text that way is broken.
  const reason = ribbonIneligibilityReason(p, subKey);
  openIneligibleWarningModal(id, subKey, { name: item.subRibbons.find(r => r.key === subKey)?.name || subKey }, reason);
  // Route the modal's "Enable Anyway" button at the sub-ribbon toggle instead of the
  // plain achievement toggle it defaults to.
  const btn = document.querySelector('#unreleasedWarningOverlay .btn.primary');
  if(btn) btn.setAttribute('onclick', `closeUnreleasedWarningModal();toggleMemorySubRibbon('${id}','${parentKey}','${subKey}')`);
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
  // in turn can unlock/lock things that depend on it, so recheck everything defensively.
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

// Preferred Title picker: a Poké Ball-dropdown-style control (icon-dropdown-trigger +
// panel of icon rows) rather than a plain <select>, since a title's Ribbon/Mark icon is
// what tells two similarly-worded titles apart -- a native <option> can't show one.
function titleOptionRowHTML(p, row){
  return `
    <div class="title-option ${p.activeTitleKey===row.key?'active':''}" onclick="setActiveTitle('${p.id}','${row.key}')">
      <img src="${row.icon}" alt="">
      <span>${escapeHTML(row.label)}</span>
    </div>
  `;
}

function titleDropdownCurrentHTML(p, rows){
  const selected = p.activeTitleKey ? rows.find(r => r.key === p.activeTitleKey) : null;
  if(!selected) return `<span class="placeholder">${rows.length ? 'No title displayed' : 'No titles earned yet'}</span>`;
  return `<img src="${selected.icon}" alt=""><span>${escapeHTML(selected.label)}</span>`;
}

function titleDropdownHTML(p, rows){
  const noneRow = `
    <div class="title-option ${!p.activeTitleKey?'active':''}" onclick="setActiveTitle('${p.id}','')">
      <span class="title-option-spacer"></span><span style="color:var(--text-faint);">No title displayed</span>
    </div>
  `;
  return `
    <div class="achv-title-picker">
      <label>Preferred Title</label>
      <div class="title-dropdown" id="titlePicker_${p.id}_wrap">
        <button type="button" class="title-dropdown-trigger" onclick="toggleTitleDropdown('${p.id}')">
          <span class="title-dropdown-current">${titleDropdownCurrentHTML(p, rows)}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;flex:none;"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="title-dropdown-panel" id="titlePicker_${p.id}_panel">
          ${rows.length ? noneRow + rows.map(r => titleOptionRowHTML(p, r)).join('') : `<div class="text-picker-empty">No titles earned yet.</div>`}
        </div>
      </div>
      <div class="hint">Choose one earned Ribbon or Mark title to display beside this Pok\u00e9mon's nickname.</div>
    </div>
  `;
}

function toggleTitleDropdown(id){
  const panel = document.getElementById('titlePicker_' + id + '_panel');
  if(!panel) return;
  const isOpen = panel.classList.contains('open');
  document.querySelectorAll('.title-dropdown-panel.open').forEach(el => el.classList.remove('open'));
  if(!isOpen) panel.classList.add('open');
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

