/* ============== ROSTER STATE ============== */
let state = {
  trainer: '',
  settings: { defaultSort: 'oldest', defaultTheme: 'light', custom: null },
  pokemon: []
};

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
    });
  }

  // Achievements: ribbons/marks/misc selections, Memory Ribbon sub-collections, custom
  // achievements, partner trainer name (for the dynamic Partner Ribbon title), custom
  // dynamic title field values (for any other achievement with a control-panel-defined
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
  // an active title must point at something the Pokémon actually still has selected,
  // otherwise drop it back to "no title" rather than displaying a stale/invalid one
  const earned = getEarnedTitleKeys(p);
  if(p.activeTitleKey && !earned.includes(p.activeTitleKey)) p.activeTitleKey = '';
  return p;
}

function seedData(){
  state.pokemon = JSON.parse(JSON.stringify(ROSTER_DATA)).map(normalizePokemon);
}
