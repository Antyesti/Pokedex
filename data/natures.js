/**
 * Natures
 * -------
 * Each Nature raises one stat by 10% and lowers another by 10%. The five "neutral"
 * natures aren't a special case with no stat change on file -- same as in the actual
 * games, they raise and lower the *same* stat, which is what makes it a no-op. Anything
 * editing this (Control Panel included) should set up===down for a neutral nature, not
 * leave either blank; the app treats up===down as "No Stat Change" wherever it displays
 * a Nature's effect (see natureTooltipHTML in js/renderer.js). Kept as an object keyed by
 * name since that's how the app looks a Nature up (NATURE_DATA[name]); NATURE_NAMES is
 * just its keys, for the Nature field's dropdown.
 */

const NATURE_DATA = {
  Hardy: {
    up: "Attack",
    down: "Attack"
  },
  Lonely: {
    up: "Attack",
    down: "Defense"
  },
  Brave: {
    up: "Attack",
    down: "Speed"
  },
  Adamant: {
    up: "Attack",
    down: "Sp. Attack"
  },
  Naughty: {
    up: "Attack",
    down: "Sp. Defense"
  },
  Bold: {
    up: "Defense",
    down: "Attack"
  },
  Docile: {
    up: "Defense",
    down: "Defense"
  },
  Relaxed: {
    up: "Defense",
    down: "Speed"
  },
  Impish: {
    up: "Defense",
    down: "Sp. Attack"
  },
  Lax: {
    up: "Defense",
    down: "Sp. Defense"
  },
  Timid: {
    up: "Speed",
    down: "Attack"
  },
  Hasty: {
    up: "Speed",
    down: "Defense"
  },
  Serious: {
    up: "Speed",
    down: "Speed"
  },
  Jolly: {
    up: "Speed",
    down: "Sp. Attack"
  },
  Naive: {
    up: "Speed",
    down: "Sp. Defense"
  },
  Modest: {
    up: "Sp. Attack",
    down: "Attack"
  },
  Mild: {
    up: "Sp. Attack",
    down: "Defense"
  },
  Quiet: {
    up: "Sp. Attack",
    down: "Speed"
  },
  Bashful: {
    up: "Sp. Attack",
    down: "Sp. Attack"
  },
  Rash: {
    up: "Sp. Attack",
    down: "Sp. Defense"
  },
  Calm: {
    up: "Sp. Defense",
    down: "Attack"
  },
  Gentle: {
    up: "Sp. Defense",
    down: "Defense"
  },
  Sassy: {
    up: "Sp. Defense",
    down: "Speed"
  },
  Careful: {
    up: "Sp. Defense",
    down: "Sp. Attack"
  },
  Quirky: {
    up: "Sp. Defense",
    down: "Sp. Defense"
  }
};
const NATURE_NAMES = Object.keys(NATURE_DATA);
