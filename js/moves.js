/**
 * Move List logic
 * ----------------
 * Backs the Move picker (mirrors js/species-picker.js) and works out what a Moveset by
 * Game slot should actually display once Z-Move/Gigantamax come into play. Shared between
 * the editable form (js/pokemon.js) and the read-only Detail View table (js/achievements.js)
 * so both apply the exact same rules instead of drifting apart.
 *
 * Reference data (MOVE_LIST, BASIC_Z_MOVES, SPECIAL_Z_MOVES, MAX_MOVES, MAX_GUARD,
 * GMAX_MOVES) lives in data/moves.js.
 */

const MOVE_INDEX = {};
MOVE_LIST.forEach(m => { MOVE_INDEX[m.id] = m; });

function findMoveEntry(moveId){
  return MOVE_INDEX[moveId] || null;
}

function normalizeMoveNameForMatch(name){
  return String(name || '').trim().toLowerCase();
}

// Lets a freely-typed move name link itself to the database the same way a typed game
// name auto-links to GAME_PRESET_NAME_LOOKUP, or a typed species name to POKEMON_SPECIES.
const MOVE_NAME_LOOKUP = {};
MOVE_LIST.forEach(m => { MOVE_NAME_LOOKUP[normalizeMoveNameForMatch(m.name)] = m.id; });
function detectMoveIdFromName(name){
  return MOVE_NAME_LOOKUP[normalizeMoveNameForMatch(name)] || '';
}

// Fills in any missing per-slot move link by matching its typed name against the Move
// List, without touching a slot that's already linked. Used both when a Pokémon record
// loads (normalizePokemon in js/achievements.js) and when the edit form opens (openForm
// in js/pokemon.js), so a move that's "from the move list" gets its type-aware pill/Z-
// Move/Max Move display even if it was typed in before this feature existed, imported,
// or otherwise ended up on the record without ever passing through the picker.
function normalizeMoveIds(moves, moveIds){
  const base = Array.isArray(moveIds) && moveIds.length === 4 ? moveIds.slice() : ['','','',''];
  return base.map((id, i) => id || detectMoveIdFromName((moves && moves[i]) || ''));
}

// Migrates a game row's old two-boolean-array Max Guard/G-Max downgrade fields (from
// before the single Gigantamax cycle toggle replaced them) into the new maxMoveModes
// array, and otherwise just validates whatever's already there.
function normalizeMaxMoveModes(g){
  if(Array.isArray(g.maxMoveModes) && g.maxMoveModes.length === 4) return g.maxMoveModes.slice();
  const modes = ['','','',''];
  if(Array.isArray(g.maxGuardSlots) || Array.isArray(g.downgradeGMaxSlots)){
    for(let i = 0; i < 4; i++){
      if(g.maxGuardSlots && g.maxGuardSlots[i]) modes[i] = 'guard';
      else if(g.downgradeGMaxSlots && g.downgradeGMaxSlots[i]) modes[i] = 'max';
    }
  }
  return modes;
}

// Matches a Pokémon against a Special Z-Move or G-Max Move's Pokémon allowlist. Each
// list entry is either a species entry id -- picked from the Species Database in the
// Control Panel, the same way MEGA_TYPES and Mega Ability overrides are keyed, so forms
// that only some variants of a species have (e.g. G-Max Gold Rush is Galarian Meowth
// only) are told apart correctly -- or a plain species name, for Pokémon typed in by hand
// that don't have their own Species Database entry. A Mega Evolution/Ultra Burst Pokémon
// also matches its alternate display name (e.g. "Ultra Necrozma", "Mega Charizard X"),
// since that's the only way to target one from the Control Panel -- there's no separate
// Species Database entry for a Mega/Ultra form the way there is for Dawn Wings or Dusk
// Mane Necrozma. `p` only needs speciesEntryId/species plus whatever
// megaOrGigantamaxDisplayName needs.
function pokemonEligible(list, p){
  if(!Array.isArray(list)) return false;
  if(p.speciesEntryId && list.includes(p.speciesEntryId)) return true;
  const altName = typeof megaOrGigantamaxDisplayName === 'function' ? megaOrGigantamaxDisplayName(p) : '';
  const candidates = [p.species, altName].map(normalizeMoveNameForMatch).filter(Boolean);
  if(!candidates.length) return false;
  return list.some(name => candidates.includes(normalizeMoveNameForMatch(name)));
}

// The Z-Move for a move already sitting in a slot, if any. `mode` is the per-slot cycle
// state set by the Z-Move toggle in js/pokemon.js -- '' (or a state that isn't reachable
// for this move) falls back to the default: a Special Z-Move (species + exact move match)
// if one applies, otherwise the type's Basic Z-Move. 'special' forces the Special Z-Move
// (only when one actually applies), 'basic' forces the type's Basic Z-Move even when a
// Special Z-Move would otherwise apply.
function resolveZMove(moveName, moveType, p, mode){
  const special = SPECIAL_Z_MOVES.find(z =>
    normalizeMoveNameForMatch(z.replaces) === normalizeMoveNameForMatch(moveName) &&
    pokemonEligible(z.pokemon, p)
  );
  if(mode !== 'basic' && special) return { name: special.name };
  const basic = BASIC_Z_MOVES[moveType];
  return basic ? { name: basic } : null;
}

// The sequence of states the Z-Move toggle cycles through for a given move: the Basic
// Z-Move always applies (every type has one), followed by the Special Z-Move only when
// the species actually has one for this exact move.
function zMoveCycleStates(moveName, moveType, p){
  const states = ['basic'];
  const special = SPECIAL_Z_MOVES.some(z =>
    normalizeMoveNameForMatch(z.replaces) === normalizeMoveNameForMatch(moveName) &&
    pokemonEligible(z.pokemon, p)
  );
  if(special) states.push('special');
  return states;
}

// The Max Move for a move's type, if any, once Gigantamax is shown. `mode` is the
// per-slot cycle state set by the single Gigantamax toggle in js/pokemon.js -- '' (or
// any state that isn't reachable for this move) falls back to the default: G-Max Move
// if the species has one for this type, otherwise the type's normal Max Move. 'gmax'
// forces the G-Max Move, 'guard' forces Max Guard (Normal-type moves only), and 'max'
// forces the type's normal Max Move even when a G-Max Move would otherwise apply.
function resolveMaxMove(moveType, p, mode){
  if(moveType === 'Normal' && mode === 'guard') return { name: MAX_GUARD, isGMax: false };
  if(mode !== 'max'){
    const gmax = GMAX_MOVES.find(g => g.type === moveType && pokemonEligible(g.pokemon, p));
    if(gmax) return { name: gmax.name, isGMax: true };
  }
  const max = MAX_MOVES[moveType];
  return max ? { name: max, isGMax: false } : null;
}

// Whether a Pokémon has its own G-Max Move for a given move type, so js/pokemon.js knows
// whether to include 'gmax' in the toggle's cycle.
function hasGMaxMove(moveType, p){
  return GMAX_MOVES.some(g => g.type === moveType && pokemonEligible(g.pokemon, p));
}

// The sequence of states the Gigantamax toggle cycles through for a given move: G-Max
// Move first (when the species has one), then the type's normal Max Move, then Max Guard
// (Normal-type moves only). Empty if neither a G-Max Move nor Max Guard applies, meaning
// there's nothing to toggle -- the move only ever has one possible Max Move.
function maxMoveCycleStates(moveType, p){
  const states = [];
  if(hasGMaxMove(moveType, p)) states.push('gmax');
  if(states.length || moveType === 'Normal') states.push('max');
  if(moveType === 'Normal') states.push('guard');
  return states;
}

// Advances a slot's cycle mode to the next state for this specific move, wrapping back
// to the start. An unset/no-longer-reachable mode is treated as sitting at the first
// (default) state, so the click always advances it.
function cycleMaxMoveMode(currentMode, moveType, p){
  const states = maxMoveCycleStates(moveType, p);
  if(states.length === 0) return '';
  const at = states.includes(currentMode) ? states.indexOf(currentMode) : 0;
  return states[(at + 1) % states.length];
}

// Resolves what a single Moveset by Game slot should display: the plain entered move,
// or its Z-Move/Max Move/G-Max Move substitution, plus whether it should render bold
// and/or italic. Returns null for an empty slot.
//
// `p` only needs types, megaTypes, isMega, isGigantamax, isTera, teraType, preferredForm,
// species, and speciesEntryId -- callers can pass either the saved Pokémon record or a
// live preview object built from the form's current (unsaved) selections. `gamePreset` is the row's own
// GAME_PRESET_INDEX entry (or null/undefined for an unset/unrecognized game): Max
// Move/G-Max Move, Z-Move, and Mega's italic preview only apply in a game that actually
// supports Gigantamax, Z-Move, or Mega Evolution respectively; the Tera/Stellar type only
// counts toward bold in a game that supports Terastallization. `zMoveMode` is '' when this
// slot isn't the row's Z-Move, otherwise 'basic'/'special' (or any other truthy value,
// treated as the default priority) from the Z-Move toggle's cycle.
function resolveDisplayedMove(p, moveName, moveId, zMoveMode, maxMoveMode, gamePreset){
  const trimmed = String(moveName || '').trim();
  if(!trimmed) return null;

  const entry = moveId ? findMoveEntry(moveId) : null;
  const type = entry ? entry.type : '';

  let name = trimmed;
  let isMaxMove = false;
  let isGMaxMove = false;

  const gigaShown = !!p.isGigantamax && p.preferredForm === 'gigantamax' && !!(gamePreset && gamePreset.supportsGigantamax);
  if(gigaShown && type){
    const max = resolveMaxMove(type, p, maxMoveMode);
    if(max){ name = max.name; isMaxMove = true; isGMaxMove = max.isGMax; }
  } else if(zMoveMode && !!(gamePreset && gamePreset.supportsZMove) && type){
    const z = resolveZMove(trimmed, type, p, zMoveMode);
    if(z) name = z.name;
  }

  // Bold: STAB against whatever's currently shown (base types, Mega types when Mega is
  // the shown form, or the Stellar/Tera type if this game supports Terastallization).
  // Italic: would be STAB against the Mega typing, previewed while Mega isn't the shown
  // form, only in a game that supports Mega Evolution. Bold wins if both would apply, so
  // a move never renders as both at once.
  const gameSupportsTera = !!(gamePreset && gamePreset.supportsTera);

  const shownTypes = typeof displayTypes === 'function' ? displayTypes(p, gameSupportsTera) : (p.types || []);
  const bold = !!type && shownTypes.includes(type);
  const italic = !bold && !!type && !!(gamePreset && gamePreset.supportsMega) && !!p.isMega && Array.isArray(p.megaTypes) && p.megaTypes.includes(type) && p.preferredForm !== 'mega';

  return { name, type, bold, italic, isMaxMove, isGMaxMove, linked: !!entry };
}

// Renders a resolved move as a type-colored pill with the move name as its label
// (instead of the type name), per the Moveset by Game "move name inside the type pill"
// display. Returns a plain escaped string for an unlinked/freeform move, since there's
// no type to color it by.
function movePillHTML(resolved, extraClass){
  if(!resolved) return '';
  if(!resolved.linked) return escapeHTML(resolved.name);
  const cls = ['type-badge', 'move-pill'];
  if(resolved.bold) cls.push('move-pill-bold');
  if(resolved.italic) cls.push('move-pill-italic');
  if(resolved.isGMaxMove) cls.push('move-pill-gmax');
  if(extraClass) cls.push(extraClass);
  return `<span class="${cls.join(' ')}" style="background:${TYPE_HEX[resolved.type]}">${escapeHTML(resolved.name)}</span>`;
}
