/* ============== ROSTER STATE ============== */
let state = {
  trainer: '',
  trainerAvatar: '',
  settings: { defaultSort: 'oldest', defaultTheme: 'light', custom: null },
  pokemon: []
};

/* ---- Custom page background (Master Ball theme only) ----
 * colors + optional explicit stops (percent positions) + shape/position + effects.
 * Older saved configs without shape, stops, cardStyle or animSpeed get the defaults below. */
const BG_MAX_COLORS = 5;
const BG_TYPES = ['linear', 'radial', 'conic'];
const BG_SHAPES = ['ellipse', 'circle'];
// Card Style: light or dark card colors (the Poké Ball or Beast Ball base and text colors) for the page background.
// Surface Style (glass or neumorphic) and the user's accent colors are left alone.
const BG_CARD_STYLES = {
  dark: { label: 'Dark', look: { bg: '#0B0F14', text: '#E8EDF2' } },
  light: { label: 'Light', look: { bg: '#F0F0F0', text: '#222224' } }
};
function defaultBackground(){
  return { enabled: false, cardStyle: 'dark', type: 'linear', shape: 'ellipse', colors: ['#EFB4AA', '#5B2FD1'], stops: null, direction: 135, intensity: 100,
    smoothness: 100, grain: 0, vignette: 0, animate: false, animSpeed: 50, posX: 50, posY: 50 };
}
function normalizeBackground(b){
  const def = defaultBackground();
  if(!b || typeof b !== 'object') return def;
  const hex = /^#[0-9a-f]{6}$/i;
  let colors = Array.isArray(b.colors) ? b.colors.filter(c => typeof c === 'string' && hex.test(c)).map(c => c.toUpperCase()) : [];
  colors = colors.slice(0, BG_MAX_COLORS);
  if(!colors.length) colors = def.colors;
  const num = (v, lo, hi, d) => (typeof v === 'number' && isFinite(v)) ? Math.min(hi, Math.max(lo, Math.round(v))) : d;
  const pos = (v, d) => [0, 50, 100].includes(v) ? v : d;
  // Explicit stops must match the colors one for one; they're clamped to 0-100 and kept in ascending order.
  let stops = null;
  if(Array.isArray(b.stops) && b.stops.length === colors.length && b.stops.every(v => typeof v === 'number' && isFinite(v))){
    let prev = 0;
    stops = b.stops.map(v => (prev = Math.max(prev, Math.min(100, Math.max(0, Math.round(v * 100) / 100)))));
  }
  return {
    enabled: !!b.enabled, cardStyle: BG_CARD_STYLES[b.cardStyle] ? b.cardStyle : (BG_CARD_STYLES[b.preset] ? b.preset : def.cardStyle), // `preset` is the name older saves used
    type: BG_TYPES.includes(b.type) ? b.type : def.type, shape: BG_SHAPES.includes(b.shape) ? b.shape : def.shape,
    colors, stops,
    direction: num(b.direction, 0, 360, def.direction), intensity: num(b.intensity, 0, 100, def.intensity),
    smoothness: num(b.smoothness, 0, 100, def.smoothness), grain: num(b.grain, 0, 100, def.grain),
    vignette: num(b.vignette, 0, 100, def.vignette), animate: !!b.animate, animSpeed: num(b.animSpeed, 0, 100, def.animSpeed),
    posX: pos(b.posX, 50), posY: pos(b.posY, 50)
  };
}

function cryptoId(){ return 'p_' + Math.random().toString(36).slice(2,10) + Date.now().toString(36); }

function findPokemonById(id){ return state.pokemon.find(x=>x.id===id); }

// Backfills fields introduced after a Pokémon record may have been created/exported, so
// older saves (or the empty seed array) still get a consistent shape to render and edit against.
function normalizePokemon(p){
  if(typeof p.speciesEntryId !== 'string') p.speciesEntryId = '';
  if(typeof p.characteristic !== 'string') p.characteristic = '';
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
  if(p.pokerus !== 'infected' && p.pokerus !== 'cured') p.pokerus = 'none';
  if(typeof p.isTera !== 'boolean') p.isTera = false;
  if(typeof p.teraType !== 'string') p.teraType = '';
  // A fixed-Tera-type species (Ogerpon's masks, Terapagos) always Terastallizes to that
  // one type, overriding anything else a record might have picked up, e.g. via import.
  const fixedTeraType = getFixedTeraType(p.speciesEntryId);
  if(fixedTeraType) p.teraType = fixedTeraType;

  // Move fields used to support Bold/Italic rich text; they're plain text now. Existing
  // records may still have that formatting saved as HTML, so strip it down to plain text
  // here rather than leaving stray <b>/<i> tags showing up literally in the move name.
  if(Array.isArray(p.games)){
    p.games.forEach(g => {
      if(Array.isArray(g.moves)){
        g.moves = g.moves.map(m => (typeof m === 'string' && m.includes('<')) ? stripHtmlToText(m) : m);
      } else {
        g.moves = ['','','',''];
      }
      // Older records won't have moveIds yet, and imported/hand-edited ones may have it
      // only partially filled in; link anything that matches a Move List entry by name so
      // its pill/Z-Move/Max Move display works without re-entering it.
      g.moveIds = normalizeMoveIds(g.moves, g.moveIds);
      if(typeof g.zMoveSlot !== 'number') g.zMoveSlot = -1;
      if(!g.zMoveMode) g.zMoveMode = 'basic';
      g.maxMoveModes = normalizeMaxMoveModes(g);
      delete g.maxGuardSlots;
      delete g.downgradeGMaxSlots;
      delete g.gameVersion;
    });
  }

  // Original vs Virtual Console used to be set manually (first via a per-Pokemon map, then
  // a per-entry checkbox); both are gone now that pokemonGameVersion() in
  // js/ribbon-eligibility.js infers it automatically from a Pokemon's own Moveset by Game
  // entries, so any leftover value from either era is just discarded here.
  delete p.gameVersions;

  // Achievements: ribbons/marks/misc selections, Memory Ribbon sub-collections, custom
  // achievements, partner trainer name (for the dynamic Partner Ribbon title), custom
  // dynamic title field values (for any other achievement with a catalog-defined
  // dynamic title), and the single active title shown beside the nickname.
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
  if(typeof p.metLevel !== 'number' || !Number.isFinite(p.metLevel) || p.metLevel < 1 || p.metLevel > 100) p.metLevel = null;
  // an active title must point at something the Pokémon actually still has selected,
  // otherwise drop it back to "no title" rather than displaying a stale/invalid one
  const earned = getEarnedTitleKeys(p);
  if(p.activeTitleKey && !earned.includes(p.activeTitleKey)) p.activeTitleKey = '';
  return p;
}

function seedData(){
  state.pokemon = JSON.parse(JSON.stringify(ROSTER_DATA)).map(normalizePokemon);
}
