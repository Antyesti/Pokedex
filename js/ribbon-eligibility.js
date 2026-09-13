/**
 * Ribbon Eligibility Engine
 * -------------------------
 * Works out whether a given Pokemon could ever get a given Ribbon.
 *
 * Game reachability is driven entirely by each game's own Travels To list (and, for games
 * with a Virtual Console/re-release version, that version's own Travels To list), both
 * editable in Control Panel -> Games. Which of those two lists applies to a given Pokemon
 * depends on its actual Original/Virtual Console version for that game -- see
 * pokemonGameVersion() below, derived from its Moveset by Game entries rather than a
 * separate manual toggle, since two copies of the same game can have different transfer
 * paths. A Ribbon's own game restriction comes from its availableGames field if the
 * Control Panel has one set for it (Control Panel -> Ribbons), falling back to the
 * community Ribbon dataset in data/ribbon-eligibility-data.js for Ribbons nobody has
 * customized yet. Species bans (banned/bannedBDSP/nomythical) still come from that same
 * community dataset. Met Level is handled separately in data/ribbon-met-level.js and
 * combined in here via ribbonIneligibilityReason(). Which games even count as part of a
 * Pokemon's history in the first place is filtered by the `games` list on its
 * POKEMON_SPECIES entry (data/pokemon-species.js) -- see speciesAllowsGame() below.
 *
 * Nothing in here should ever grey out a Ribbon it simply lacks data for: a Ribbon with no
 * restriction configured anywhere, or a Pokemon with no detectable game history, is always
 * treated as eligible.
 *
 * A Pokemon's evolution line (the `evolvesFrom` field on each data/pokemon-species.js
 * entry, editable from Control Panel -> Pokemon Database) widens both the
 * game-reachability and species-ban checks above to look at the current species AND every
 * species it evolved from -- see speciesLineageIds() below -- since a Ribbon earned or a
 * game reached as a pre-evolution stays valid after evolving forward. A later evolution's
 * own possibilities never count toward an earlier or current stage, since a Pokemon can't
 * have been something it hasn't evolved into yet.
 */

// Maps this app's own Game Preset keys to the community dataset's game keys (used only as
// a fallback for Ribbons that don't have availableGames configured in the Control Panel).
const APP_GAME_TO_RIBBON_GAME = {
  red: 'red', blue: 'blue', green: 'green', yellow: 'yellow',
  gold: 'gold', silver: 'silver', crystal: 'crystal',
  ruby: 'ruby', sapphire: 'sapphire', emerald: 'emerald',
  colosseum: 'colosseum', xdgaleofdarkness: 'xd',
  firered: 'fr', leafgreen: 'lg',
  diamond: 'diamond', pearl: 'pearl', platinum: 'platinum',
  heartgold: 'hg', soulsilver: 'ss',
  black: 'black', white: 'white', black2: 'black2', white2: 'white2',
  x: 'x', y: 'y', omegaruby: 'or', alphasapphire: 'as',
  sun: 'sun', moon: 'moon', ultrasun: 'usun', ultramoon: 'umoon',
  letsgopikachu: 'lgp', letsgoeevee: 'lge',
  sword: 'sw', shield: 'sh',
  brilliantdiamond: 'bd', shiningpearl: 'sp',
  legendsarceus: 'pla', scarlet: 'scar', violet: 'vio', legendsza: 'plza',
  go: 'go'
};

// The set of Game Preset keys a species could actually appear in, or null if there's no
// data to restrict by at all. Prefers the exact linked POKEMON_SPECIES entry
// (speciesEntryId, set when a Species autocomplete suggestion gets clicked); when that
// link is missing entirely -- hand-typed species text, or an older record from before this
// existed -- falls back to matching by the plain species name instead, since an exact name
// match with no ID is still real information and shouldn't just be treated as unrestricted.
// A name can match more than one form/variant (e.g. Hoopa's two Formes), so every match's
// games list gets unioned together: a game only counts as disallowed if none of them allow
// it, since guessing the wrong specific form is a worse failure mode than under-restricting.
function speciesGamesFor(speciesEntryId, speciesName){
  if(speciesEntryId){
    const entry = typeof findSpeciesEntry === 'function' ? findSpeciesEntry(speciesEntryId) : null;
    if(entry?.games?.length) return entry.games;
  }
  if(!speciesName || typeof POKEMON_SPECIES === 'undefined') return null;
  const nameLower = speciesName.trim().toLowerCase();
  if(!nameLower) return null;
  const matches = POKEMON_SPECIES.filter(e => e.species.toLowerCase() === nameLower && e.games?.length);
  if(matches.length === 0) return null;
  const union = new Set();
  matches.forEach(e => e.games.forEach(g => union.add(g)));
  return [...union];
}

// A species entry id plus every species it evolved from, earliest last, walking each
// entry's own `evolvesFrom` field (data/pokemon-species.js) back one hop at a time. Stops
// at whichever entry has no evolvesFrom set, or safely bails out on a cycle in hand-edited
// data rather than looping forever. Used everywhere a Pokemon's evolution history needs to
// widen a check beyond just its current species: a pre-evolution can have reached a game or
// earned a Ribbon its current form never could have, so most checks below look at this
// whole chain (current species first, oldest ancestor last) rather than the id alone. A
// later evolution's own possibilities are never included, since a Pokemon can't have been
// something it hasn't evolved into yet.
function speciesLineageIds(speciesEntryId){
  const chain = [];
  const seen = new Set();
  let cur = speciesEntryId;
  while(cur && !seen.has(cur)){
    chain.push(cur);
    seen.add(cur);
    const entry = typeof findSpeciesEntry === 'function' ? findSpeciesEntry(cur) : null;
    cur = entry?.evolvesFrom || null;
  }
  return chain;
}

// True if a species could actually be obtained in a given Game Preset key. A key outside
// RESTRICTABLE_GAME_KEYS (Pokemon GO/Bank/HOME, or any game a user added themselves) is
// never restricted, since there's no availability data behind it either way. Missing
// species data (unknown/unlinked species, or an entry with no `games` list yet) also never
// blocks -- same "don't grey out on missing data" rule the rest of this engine follows.
function speciesAllowsGame(speciesEntryId, gameKey, speciesName){
  if(typeof RESTRICTABLE_GAME_KEYS === 'undefined' || !RESTRICTABLE_GAME_KEYS.includes(gameKey)) return true;
  const games = speciesGamesFor(speciesEntryId, speciesName);
  if(!games) return true;
  return games.includes(gameKey);
}

// Same as speciesAllowsGame() above, but also allows the game if any earlier stage in this
// species' evolution line could have been obtained there -- since a Pokemon that was still
// its pre-evolution at the time could have been in a game its current species never existed
// in yet (a Gen 6+ evolution reachable from a Gen 3 game via its Gen 3-available
// pre-evolution, for instance). Only ever widens the check, never narrows it.
function speciesAllowsGameLineage(speciesEntryId, gameKey, speciesName){
  if(speciesAllowsGame(speciesEntryId, gameKey, speciesName)) return true;
  if(!speciesEntryId) return false;
  return speciesLineageIds(speciesEntryId).some(id => id !== speciesEntryId && speciesAllowsGame(id, gameKey));
}

// Every app Game Preset key this Pokemon is known to have actually been in: Origin Game
// and Last Game (both free text, resolved via detectGameKeyFromTag same as the rest of the
// app), plus any game picked in its per-game movesets. A game neither the Pokemon's current
// species nor anything earlier in its evolution line could actually have been obtained in
// (see speciesAllowsGameLineage() above) is dropped rather than trusted, since a typo'd or
// mistaken game tag shouldn't unlock a Ribbon.
function gameKeysForPokemon(p){
  const isAllowed = k => speciesAllowsGameLineage(p.speciesEntryId, k, p.species);
  const keys = new Set();
  if(p.originGame){ const k = detectGameKeyFromTag(p.originGame); if(k && isAllowed(k)) keys.add(k); }
  if(p.lastGame){ const k = detectGameKeyFromTag(p.lastGame); if(k && isAllowed(k)) keys.add(k); }
  (p.games || []).forEach(g => { if(g.gameKey && isAllowed(g.gameKey)) keys.add(g.gameKey); });
  return keys;
}

// The specific copy (Original or Virtual Console/re-release) this Pokemon's game history
// implies for a given game, inferred automatically rather than asked for directly: if the
// only way to reach a game listed further down its Moveset by Game entries is through that
// game's Virtual Console connectivity, this copy must have been the Virtual Console one.
// Otherwise Original is assumed, since that's the far more common case.
function pokemonGameVersion(p, gameKey, visiting){
  const game = typeof GAME_PRESET_INDEX !== 'undefined' ? GAME_PRESET_INDEX[gameKey] : null;
  if(!game?.vc?.enabled) return 'original';

  const entries = p.games || [];
  const idx = entries.findIndex(g => g.gameKey === gameKey);
  if(idx === -1) return 'original';

  const laterKeys = [...new Set(entries.slice(idx + 1).map(g => g.gameKey).filter(Boolean))];
  if(laterKeys.length === 0) return 'original';

  // Guards against a cycle in unusually-ordered data (e.g. the same game tagged twice, or
  // games listed out of chronological order) recursing forever between two keys.
  visiting = visiting || new Set();
  if(visiting.has(gameKey)) return 'original';
  visiting.add(gameKey);

  const reachableAs = (startKey, startVersion) => {
    const seen = new Set([startKey]);
    const queue = [[startKey, startVersion]];
    while(queue.length){
      const [key, version] = queue.shift();
      const g = typeof GAME_PRESET_INDEX !== 'undefined' ? GAME_PRESET_INDEX[key] : null;
      if(!g) continue;
      const next = (version === 'vc' && g.vc?.enabled ? g.vc.travelTo : g.travelTo) || [];
      next.forEach(n => {
        if(seen.has(n)) return;
        seen.add(n);
        // Any other explicitly tracked game further down the list has its own version
        // resolved the same way (recursively, always looking forward); anything else along
        // the way is just a stepping stone the user never tagged, so its own Original vs
        // Virtual Console distinction isn't something we have an opinion on here.
        queue.push([n, pokemonGameVersion(p, n, visiting)]);
      });
    }
    return seen;
  };

  const reachableAsOriginal = reachableAs(gameKey, 'original');
  if(laterKeys.every(k => reachableAsOriginal.has(k))) return 'original';

  const reachableAsVC = reachableAs(gameKey, 'vc');
  return laterKeys.every(k => reachableAsVC.has(k)) ? 'vc' : 'original';
}

// The Travels To list to use for a given game as this specific Pokemon experienced it: the
// Virtual Console/re-release list if that game has one and this Pokemon's own game history
// implies that's the copy it was in (see pokemonGameVersion() above), otherwise the game's
// normal list.
function travelToForPokemon(p, gameKey){
  const game = typeof GAME_PRESET_INDEX !== 'undefined' ? GAME_PRESET_INDEX[gameKey] : null;
  if(!game) return [];
  const usesVC = game.vc?.enabled && pokemonGameVersion(p, gameKey) === 'vc';
  return (usesVC ? game.vc.travelTo : game.travelTo) || [];
}

// Follows games' Travels To lists forward (never backward) from a starting set of game
// keys, returning every key reached along the way, including the starting ones
// themselves. Shared by reachableGamesForPokemon() below and the Ribbons Helper further
// down, which needs the same walk starting from a single game instead of a Pokemon's
// whole history.
function forwardReachableGamesFrom(p, startKeys){
  const seen = new Set(startKeys);
  const queue = [...seen];
  while(queue.length){
    const g = queue.pop();
    travelToForPokemon(p, g).forEach(next => {
      if(!seen.has(next)){ seen.add(next); queue.push(next); }
    });
  }
  return seen;
}

// Every game key reachable from a Pokemon's known game history, following each game's
// Travels To list forward (never backward), including the starting games themselves.
function reachableGamesForPokemon(p){
  return forwardReachableGamesFrom(p, gameKeysForPokemon(p));
}

// A Ribbon's configured game list: the Control Panel's own availableGames if set (already
// in this app's Game Preset keys), otherwise the community dataset's list (translated from
// its own key space), otherwise null for "no restriction known".
function ribbonAvailableGames(key){
  const item = (typeof ACHIEVEMENT_INDEX !== 'undefined' ? ACHIEVEMENT_INDEX[key] : null)
    || (typeof SUB_RIBBON_INDEX !== 'undefined' ? SUB_RIBBON_INDEX[key] : null);
  if(item?.availableGames?.length) return item.availableGames;
  const communityGames = (typeof RIBBON_ELIGIBILITY !== 'undefined' ? RIBBON_ELIGIBILITY[key]?.available : null);
  if(communityGames?.length){
    const reverse = {};
    Object.keys(APP_GAME_TO_RIBBON_GAME).forEach(appKey => { reverse[APP_GAME_TO_RIBBON_GAME[appKey]] = appKey; });
    return communityGames.map(g => reverse[g]).filter(Boolean);
  }
  return null;
}

// A Ribbon's species restriction rule: nomythical, a fully-banned species list, and a
// banned-in-this-specific-game-only map (gameKey -> species list). Checks the Control
// Panel's own item-level fields first -- if the item defines ANY of the three, that
// replaces the community dataset entirely rather than merging with it, since mixing a
// freshly-edited nomythical with a stale community banned list would cause more confusion
// than it's worth. Falls back to the community dataset's `banned`/`bannedBDSP`/`nomythical`
// otherwise, translating the community shape's BD/SP-specific field into the general
// bannedInGame shape so every caller only has one code path to worry about.
function ribbonSpeciesRule(key){
  const item = (typeof ACHIEVEMENT_INDEX !== 'undefined' && ACHIEVEMENT_INDEX[key])
    || (typeof SUB_RIBBON_INDEX !== 'undefined' && SUB_RIBBON_INDEX[key]);
  if(item && (item.nomythical !== undefined || item.banned !== undefined || item.bannedInGame !== undefined)){
    return {
      nomythical: !!item.nomythical,
      banned: item.banned || [],
      bannedInGame: item.bannedInGame || {}
    };
  }
  const communityRule = typeof RIBBON_ELIGIBILITY !== 'undefined' ? RIBBON_ELIGIBILITY[key] : null;
  if(!communityRule) return null;
  const bannedInGame = {};
  if(Array.isArray(communityRule.bannedBDSP) && communityRule.bannedBDSP.length){
    bannedInGame.brilliantdiamond = communityRule.bannedBDSP;
    bannedInGame.shiningpearl = communityRule.bannedBDSP;
  }
  return {
    nomythical: !!communityRule.nomythical,
    banned: communityRule.banned || [],
    bannedInGame
  };
}

// True if the Pokemon has any Origin Game, Last Game, or Moveset by Game entry at all,
// before species restriction gets applied. Lets reachesAnyOfGames() below tell "nothing was
// ever entered" (never blocks eligibility) apart from "something was entered but it turned
// out impossible for this species" (should still block) -- gameKeysForPokemon()'s already-
// filtered result can't tell those two apart on its own once the invalid game is dropped.
function hasAnyRawGameHistory(p){
  if(p.originGame && detectGameKeyFromTag(p.originGame)) return true;
  if(p.lastGame && detectGameKeyFromTag(p.lastGame)) return true;
  return (p.games || []).some(g => !!g.gameKey);
}

// True if the Pokemon can reach at least one game in the given list. No known game
// history, or an empty list, both return true rather than blocking on missing data -- but
// a game that WAS entered and got filtered out entirely for being impossible for this
// species is treated as known-and-unreachable, not as missing data.
function reachesAnyOfGames(p, gameList){
  if(!gameList || gameList.length === 0) return true;
  const known = gameKeysForPokemon(p);
  if(known.size === 0) return !hasAnyRawGameHistory(p);
  const reachable = reachableGamesForPokemon(p);
  return gameList.some(g => reachable.has(g));
}

// True if the Pokemon can reach at least one of a Ribbon's configured games.
function reachesAnyGame(p, key){
  const available = ribbonAvailableGames(key);
  if(!available || available.length === 0) return true;
  return reachesAnyOfGames(p, available);
}

// True if some species in a Pokemon's evolution line -- current or earlier, never a later
// evolution -- could have earned Ribbon `key` specifically in `gameKey`: that lineage
// member's own species could actually be obtained there, and isn't banned from the Ribbon
// either outright or in that particular game. Doesn't check whether the Pokemon's overall
// game history actually reaches gameKey at all; callers combine this with reachesAnyOfGames
// for that.
function lineageClearForRibbonInGame(p, rule, gameKey){
  if(!p.speciesEntryId) return true; // no species link, nothing to check a ban against
  return speciesLineageIds(p.speciesEntryId).some(id =>
    !rule.banned.includes(id) &&
    !(rule.bannedInGame[gameKey] || []).includes(id) &&
    speciesAllowsGame(id, gameKey)
  );
}

// Returns a short reason a Ribbon is ruled out by species or game history, or null.
function ribbonEligibilityReason(p, key){
  const rule = ribbonSpeciesRule(key);

  if(rule && p.speciesEntryId && rule.nomythical && MYTHICAL_SPECIES.includes(p.speciesEntryId)){
    // Mythical status doesn't change across an evolution line in practice (no Mythical
    // evolves from or into anything else), so this stays a plain current-species check.
    return "Mythical Pok\u00e9mon can't earn this Ribbon.";
  }

  const available = ribbonAvailableGames(key);

  if(rule && p.speciesEntryId){
    if(!available || !available.length){
      // No game list to weigh species-in-game bans against -- only the Ribbon-wide banned
      // list applies, and only if every stage in the line (current and all earlier) is on
      // it. A pre-evolution that isn't banned could still have earned this before evolving.
      if(speciesLineageIds(p.speciesEntryId).every(id => rule.banned.includes(id))){
        return "This species is excluded from this Ribbon.";
      }
    } else if(!available.some(g => lineageClearForRibbonInGame(p, rule, g))){
      // No available game clears the species ban for any stage in the line. Distinguish
      // "never reaches any of these games at all" (a reachability problem) from "reaches
      // some of them, but every stage is banned there" (a species problem), since the two
      // need different messages.
      return reachesAnyOfGames(p, available)
        ? "This species is excluded from this Ribbon."
        : "This Pok\u00e9mon hasn't been in a game that can reach where this Ribbon is earned.";
    }
  }

  if(!reachesAnyGame(p, key)){
    return "This Pok\u00e9mon hasn't been in a game that can reach where this Ribbon is earned.";
  }
  return null;
}

// Single entry point achievements.js calls: Met Level first (cheaper, no species data
// needed), then species/game eligibility.
function ribbonIneligibilityReason(p, key){
  return metLevelIneligibilityReason(p, key) || ribbonEligibilityReason(p, key);
}

/* ---------- Ribbons Helper (per-game breakdown, rendered from achievements.js) ---------- */

// Species-only block check for a Ribbon in one already-known game, used by the Ribbons
// Helper below. Mirrors the species checks in ribbonEligibilityReason() above, minus its
// game-reachability check, which is redundant here since the caller already knows the
// Pokemon reaches this exact game. Blocked only if EVERY stage in the Pokemon's evolution
// line -- current and all earlier -- is banned from the Ribbon in this game (or outright);
// a single non-banned stage that could itself have been obtained here is enough to clear it.
function ribbonSpeciesBlockedForGame(p, key, gameKey){
  const rule = ribbonSpeciesRule(key);
  if(!rule || !p.speciesEntryId) return false;
  if(rule.nomythical && MYTHICAL_SPECIES.includes(p.speciesEntryId)) return true;
  return !lineageClearForRibbonInGame(p, rule, gameKey);
}

// Whether a Ribbon is flagged Event in the catalog (Control Panel -> Ribbons/Marks/Misc):
// distributed only through special events, never earnable through normal gameplay. Only
// consulted by the Ribbons Helper below -- everywhere else (the Ribbons filter, eligibility
// checks, Give All Eligible) treats an Event Ribbon exactly like any other.
function ribbonIsEventOnly(key){
  const entry = (typeof ACHIEVEMENT_INDEX !== 'undefined' && ACHIEVEMENT_INDEX[key])
    || (typeof SUB_RIBBON_INDEX !== 'undefined' && SUB_RIBBON_INDEX[key]);
  return !!entry?.event;
}

// Whether a Ribbon's release status (Control Panel -> Ribbons/Marks/Misc) is Unreleased.
// A Memory Ribbon sub-ribbon has no status of its own -- it's the parent Memory Ribbon
// item that's marked released/unreleased -- so this checks the parent's status for those.
// Only consulted by the Ribbons Helper below; the Ribbons filter elsewhere still shows
// Unreleased Ribbons (as Restricted, force-enable-able) since that's a different, broader
// purpose than the Helper's "what can actually be earned right now" breakdown.
function ribbonIsUnreleased(entry){
  const statusHolderKey = entry.parentKey || entry.key;
  const holder = typeof ACHIEVEMENT_INDEX !== 'undefined' ? ACHIEVEMENT_INDEX[statusHolderKey] : null;
  return !!holder && holder.status === 'unreleased';
}

// Every leaf Ribbon key (standalone achievements and Memory Ribbon sub-ribbons) this
// specific Pokemon can earn through one specific game. Ribbons with no availableGames
// restriction at all are left out on purpose -- they're not tied to any one game, so
// listing them under a single game here would misstate where they actually come from.
// Whether a Ribbon is currently locked behind an unmet prerequisite (Control Panel ->
// Ribbons/Marks/Misc -> Requires). Only top-level items can have a requires list (a
// Memory Ribbon sub-ribbon has no such field), so this is a no-op for sub-ribbon keys.
// Only consulted by the Ribbons Helper below -- the Ribbons filter elsewhere already
// disables a locked Ribbon's badge directly via isAchievementLocked(), independent of
// this file.
function ribbonIsLocked(p, key){
  const item = typeof ACHIEVEMENT_INDEX !== 'undefined' ? ACHIEVEMENT_INDEX[key] : null;
  return !!(item && typeof isAchievementLocked === 'function' && isAchievementLocked(p, item));
}

function ribbonsObtainableInGame(p, gameKey){
  return allLeafRibbonKeys()
    .filter(entry => {
      const key = entry.key;
      if(ribbonIsEventOnly(key)) return false;
      if(ribbonIsUnreleased(entry)) return false;
      if(ribbonIsLocked(p, key)) return false;
      const available = ribbonAvailableGames(key);
      if(!available || !available.length) return false;
      if(!available.includes(gameKey)) return false;
      if(metLevelIneligibilityReason(p, key)) return false;
      if(ribbonSpeciesBlockedForGame(p, key, gameKey)) return false;
      return true;
    })
    .map(entry => entry.key);
}

// Builds the Ribbons Helper's per-game breakdown: every game this Pokemon's history can
// reach (Origin Game, Last Game, and Moveset by Game entries, plus everywhere further
// those lead via each game's own Travels To list), in the app's own chronological order,
// each paired with the Ribbons it can specifically earn there. A game with no Ribbons of
// its own is left out entirely rather than shown empty. Virtual Console/re-release games
// never need special handling here since they share the exact same key, and therefore the
// exact same Ribbons, as their original game.
//
// Games are first grouped into tiers by their full obtainable-Ribbon set: two games are the
// same tier only if they can earn the exact same set of Ribbons, full stop. This is NOT the
// same thing as being mutually tradeable -- Diamond/Pearl/Platinum can all trade freely with
// HeartGold/SoulSilver, but that doesn't make them one tier here, because their overall
// Ribbon lists genuinely differ (HGSS lacks some DPPt has, and vice versa). Counterpart
// versions like Ruby/Sapphire/Emerald usually do share an identical list and so land in the
// same tier, which also happens to be exactly the right grouping for display (one combined
// entry with all their icons instead of three identical ones back to back).
//
// Last Chance is then decided per Ribbon, not per game: among every tier that can earn a
// given Ribbon, only the chronologically LAST tier (by GAME_PRESETS order) gets the flag,
// on every game in that tier. Every earlier tier offering the same Ribbon never does, even
// if it's directly trade-linked to that later tier -- reaching a sibling version isn't a
// later opportunity, but reaching a genuinely later game/generation is, and that's the
// distinction that actually matters for "is this my last chance."
function ribbonHelperGamesForPokemon(p){
  const reachable = reachableGamesForPokemon(p);
  if(reachable.size === 0) return [];
  const order = GAME_PRESETS.map(g => g.key);
  const orderedKeys = [...reachable].sort((a, b) => order.indexOf(a) - order.indexOf(b));

  // Every reachable game's full obtainable-Ribbon set, computed once up front.
  const obtainableByGame = new Map();
  orderedKeys.forEach(gameKey => obtainableByGame.set(gameKey, ribbonsObtainableInGame(p, gameKey)));

  // Tier games by exact Ribbon-set match. Order-independent (sorted before joining) so two
  // games listing the same Ribbons in a different order still match.
  const tiers = [];
  const tierByGame = new Map();
  orderedKeys.forEach(gameKey => {
    const ribbonSet = new Set(obtainableByGame.get(gameKey));
    const signature = [...ribbonSet].sort().join('|');
    let tier = tiers.find(t => t.signature === signature);
    if(!tier){
      tier = { signature, gameKeys: [], ribbonSet, chronologicalIndex: order.indexOf(gameKey) };
      tiers.push(tier);
    }
    tier.gameKeys.push(gameKey);
    tierByGame.set(gameKey, tier);
  });

  // For each Ribbon, find whichever reachable tier offering it sits latest in chronological
  // order -- that's the one and only tier allowed to show Last Chance for it.
  const lastChanceTierForRibbon = new Map();
  const allRibbonKeys = new Set();
  obtainableByGame.forEach(set => set.forEach(key => allRibbonKeys.add(key)));
  allRibbonKeys.forEach(key => {
    let latest = null;
    tiers.forEach(tier => {
      if(!tier.ribbonSet.has(key)) return;
      if(!latest || tier.chronologicalIndex > latest.chronologicalIndex) latest = tier;
    });
    lastChanceTierForRibbon.set(key, latest);
  });

  return tiers
    .filter(tier => tier.ribbonSet.size > 0)
    .map(tier => ({
      gameKeys: tier.gameKeys,
      ribbons: [...tier.ribbonSet].map(key => ({
        key,
        lastChance: lastChanceTierForRibbon.get(key) === tier
      }))
    }));
}
