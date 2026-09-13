/**
 * Met Level rules for Ribbons
 * ---------------------------
 * Which Ribbons care about Met Level, and what they require, is configured per-Ribbon in
 * the Control Panel (metLevelMax: 'le50' | '50to70', plus an optional voiceless-species
 * exemption) rather than hardcoded here. This file only holds the one piece that isn't
 * Ribbon-specific: which species are exempt from a Met Level requirement because they
 * can't be judged on friendship the normal way (used by Footprint Ribbon out of the box,
 * and available to any other Ribbon an admin sets the exemption on).
 *
 * Met Level only ever blocks a Ribbon once the user has actually entered a Met Level for
 * that Pokemon via the Ribbons filter; an unset Met Level never blocks anything -- unless
 * the Restricted Ribbons on Edit Screen setting (Settings) is off, in which case Met Level
 * becomes mandatory for a Met-Level-gated Ribbon, since there'd be no way to tell an
 * eligible one apart from a restricted one otherwise.
 */

const FOOTPRINT_VOICELESS_SPECIES = [
  'metapod', 'kakuna', 'paras', 'parasect', 'venomoth', 'magnemite', 'magneton', 'staryu',
  'starmie', 'porygon', 'kabuto', 'xatu', 'unown', 'pineco', 'forretress', 'remoraid',
  'porygon2', 'pupitar', 'silcoon', 'cascoon', 'seedot', 'nincada', 'nosepass', 'lunatone',
  'solrock', 'baltoy', 'claydol', 'lileep', 'cradily', 'anorith', 'shelgon', 'beldum',
  'metang', 'regirock', 'regice', 'registeel', 'bronzor', 'bronzong', 'magnezone',
  'porygon-z', 'probopass', 'regigigas'
];

function isMetLevelVoicelessExempt(p){
  return FOOTPRINT_VOICELESS_SPECIES.includes(p.speciesEntryId);
}

// Turns a stored numeric Met Level into the bucket the rest of the eligibility logic
// already understands, or null if no Met Level has been entered yet.
function metLevelBucketOf(p){
  const level = p.metLevel;
  if(typeof level !== 'number' || !Number.isFinite(level)) return null;
  if(level <= 50) return 'le50';
  if(level <= 70) return '50to70';
  return 'gt70';
}

// Returns a short reason Met Level rules this Ribbon out for the Pokemon, or null if it's
// fine (including whenever no Met Level has been entered yet, or the Ribbon has no Met
// Level requirement configured at all).
function metLevelIneligibilityReason(p, key){
  const item = (typeof ACHIEVEMENT_INDEX !== 'undefined' ? ACHIEVEMENT_INDEX[key] : null)
    || (typeof SUB_RIBBON_INDEX !== 'undefined' ? SUB_RIBBON_INDEX[key] : null);
  const max = item?.metLevelMax;
  if(!max) return null;

  const bucket = metLevelBucketOf(p);
  if(!bucket){
    // No Met Level entered yet. Normally that's fine (Met Level is optional) -- but with
    // Restricted Ribbons hidden on the Edit Screen, an unknown Met Level can't be told
    // apart from an eligible one, so this Ribbon needs one entered before it'll show up.
    const hidingRestricted = typeof state !== 'undefined' && state.settings && state.settings.showRestrictedRibbons === false;
    return hidingRestricted ? 'Enter this Pok\u00e9mon\u2019s Met Level to check eligibility for this Ribbon.' : null;
  }

  const order = { le50: 0, '50to70': 1, gt70: 2 };
  if(order[bucket] <= order[max]) return null;

  if(item.metLevelVoicelessExempt && isMetLevelVoicelessExempt(p)) return null;

  const limitLabel = max === 'le50' ? '50' : '70';
  return `This Pok\u00e9mon's Met Level is too high, it needs to be ${limitLabel} or lower.`;
}
