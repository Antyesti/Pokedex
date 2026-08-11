/**
 * Mega Evolution Types
 * --------------------
 * Reference typing for every known Mega Evolution, keyed by species entry id (see
 * data/pokemon-species.js). Used to auto-fill Mega Evolution Type(s) the moment a
 * Pokémon is marked as Mega. The fill-in is just a starting point, still freely
 * editable afterward like everything else the Species field pre-fills.
 *
 * Keyed by entry id rather than species name so a species with multiple forms can have
 * the entry apply to just the one that actually gets a Mega, e.g. only Floette's
 * Eternal Flower form does, not its five color variants, and only Kantonian Slowbro
 * does, not Galarian.
 *
 * Each entry maps to a list of variants, since a handful of species have more than one
 * Mega form with different typing (Charizard X/Y, Mewtwo X/Y, and this project's own
 * Absol/Garchomp `Z` variants). Every variant has a `label`, empty string for a
 * species' single/standard Mega, "X"/"Y"/"Z" for the others, which is what actually gets
 * stored on the Pokémon record (see megaForm in js/pokemon.js) so which form was picked is
 * explicit instead of guessed from whatever typing happens to be set.
 *
 * A variant can also carry an `ability`, since most Mega Evolutions replace the
 * Pokémon's normal ability with a fixed one of their own. Unlike typing, this is shown
 * read-only in the Pokémon form rather than editable. Leave `ability` unset (or "")
 * for a variant that doesn't have one filled in yet.
 */

const MEGA_TYPES = {
  venusaur: [
    {
      label: "",
      types: [
        "Grass",
        "Poison"
      ],
      ability: "Thick Fat"
    }
  ],
  charizard: [
    {
      label: "X",
      types: [
        "Fire",
        "Dragon"
      ],
      ability: "Tough Claws"
    },
    {
      label: "Y",
      types: [
        "Fire",
        "Flying"
      ],
      ability: "Drought"
    }
  ],
  blastoise: [
    {
      label: "",
      types: [
        "Water"
      ],
      ability: "Mega Launcher"
    }
  ],
  beedrill: [
    {
      label: "",
      types: [
        "Bug",
        "Poison"
      ],
      ability: "Adaptability"
    }
  ],
  pidgeot: [
    {
      label: "",
      types: [
        "Normal",
        "Flying"
      ],
      ability: "No Guard"
    }
  ],
  alakazam: [
    {
      label: "",
      types: [
        "Psychic"
      ],
      ability: "Trace"
    }
  ],
  "slowbro-kantonian": [
    {
      label: "",
      types: [
        "Water",
        "Psychic"
      ],
      ability: "Shell Armor"
    }
  ],
  gengar: [
    {
      label: "",
      types: [
        "Ghost",
        "Poison"
      ],
      ability: "Shadow Tag"
    }
  ],
  kangaskhan: [
    {
      label: "",
      types: [
        "Normal"
      ],
      ability: "Parental Bond"
    }
  ],
  pinsir: [
    {
      label: "",
      types: [
        "Bug",
        "Flying"
      ],
      ability: "Aerilate"
    }
  ],
  gyarados: [
    {
      label: "",
      types: [
        "Water",
        "Dark"
      ],
      ability: "Mold Breaker"
    }
  ],
  aerodactyl: [
    {
      label: "",
      types: [
        "Rock",
        "Flying"
      ],
      ability: "Tough Claws"
    }
  ],
  mewtwo: [
    {
      label: "X",
      types: [
        "Psychic",
        "Fighting"
      ],
      ability: "Steadfast"
    },
    {
      label: "Y",
      types: [
        "Psychic"
      ],
      ability: "Insomnia"
    }
  ],
  dragonite: [
    {
      label: "",
      types: [
        "Dragon",
        "Flying"
      ],
      ability: "Multiscale"
    }
  ],
  ampharos: [
    {
      label: "",
      types: [
        "Electric",
        "Dragon"
      ],
      ability: "Mold Breaker"
    }
  ],
  clefable: [
    {
      label: "",
      types: [
        "Fairy",
        "Flying"
      ],
      ability: "Magic Bounce"
    }
  ],
  victreebel: [
    {
      label: "",
      types: [
        "Grass",
        "Poison"
      ],
      ability: "Innards Out"
    }
  ],
  starmie: [
    {
      label: "",
      types: [
        "Water",
        "Psychic"
      ],
      ability: "Huge Power"
    }
  ],
  scizor: [
    {
      label: "",
      types: [
        "Bug",
        "Steel"
      ],
      ability: "Technician"
    }
  ],
  heracross: [
    {
      label: "",
      types: [
        "Bug",
        "Fighting"
      ],
      ability: "Skill Link"
    }
  ],
  houndoom: [
    {
      label: "",
      types: [
        "Dark",
        "Fire"
      ],
      ability: "Solar Power"
    }
  ],
  tyranitar: [
    {
      label: "",
      types: [
        "Rock",
        "Dark"
      ],
      ability: "Sand Stream"
    }
  ],
  sceptile: [
    {
      label: "",
      types: [
        "Grass",
        "Dragon"
      ],
      ability: "Lightning Rod"
    }
  ],
  blaziken: [
    {
      label: "",
      types: [
        "Fire",
        "Fighting"
      ],
      ability: "Speed Boost"
    }
  ],
  swampert: [
    {
      label: "",
      types: [
        "Water",
        "Ground"
      ],
      ability: "Swift Swim"
    }
  ],
  gardevoir: [
    {
      label: "",
      types: [
        "Psychic",
        "Fairy"
      ],
      ability: "Pixilate"
    }
  ],
  sableye: [
    {
      label: "",
      types: [
        "Dark",
        "Ghost"
      ],
      ability: "Magic Bounce"
    }
  ],
  mawile: [
    {
      label: "",
      types: [
        "Steel",
        "Fairy"
      ],
      ability: "Huge Power"
    }
  ],
  aggron: [
    {
      label: "",
      types: [
        "Steel"
      ],
      ability: "Filter"
    }
  ],
  medicham: [
    {
      label: "",
      types: [
        "Fighting",
        "Psychic"
      ],
      ability: "Pure Power"
    }
  ],
  manectric: [
    {
      label: "",
      types: [
        "Electric"
      ],
      ability: "Intimidate"
    }
  ],
  camerupt: [
    {
      label: "",
      types: [
        "Fire",
        "Ground"
      ],
      ability: "Sheer Force"
    }
  ],
  altaria: [
    {
      label: "",
      types: [
        "Dragon",
        "Fairy"
      ],
      ability: "Pixilate"
    }
  ],
  banette: [
    {
      label: "",
      types: [
        "Ghost"
      ],
      ability: "Prankster"
    }
  ],
  absol: [
    {
      label: "",
      types: [
        "Dark"
      ],
      ability: "Magic Bounce"
    },
    {
      label: "Z",
      types: [
        "Dark",
        "Ghost"
      ],
      ability: ""
    }
  ],
  glalie: [
    {
      label: "",
      types: [
        "Ice"
      ],
      ability: "Refrigerate"
    }
  ],
  salamence: [
    {
      label: "",
      types: [
        "Dragon",
        "Flying"
      ],
      ability: "Aerilate"
    }
  ],
  metagross: [
    {
      label: "",
      types: [
        "Steel",
        "Psychic"
      ],
      ability: "Tough Claws"
    }
  ],
  latias: [
    {
      label: "",
      types: [
        "Dragon",
        "Psychic"
      ],
      ability: "Levitate"
    }
  ],
  latios: [
    {
      label: "",
      types: [
        "Dragon",
        "Psychic"
      ],
      ability: "Levitate"
    }
  ],
  rayquaza: [
    {
      label: "",
      types: [
        "Dragon",
        "Flying"
      ],
      ability: "Delta Stream"
    }
  ],
  garchomp: [
    {
      label: "",
      types: [
        "Dragon",
        "Ground"
      ],
      ability: "Sand Force"
    },
    {
      label: "Z",
      types: [
        "Dragon"
      ],
      ability: ""
    }
  ],
  lucario: [
    {
      label: "",
      types: [
        "Fighting",
        "Steel"
      ],
      ability: "Adaptability"
    },
    {
      label: "Z",
      types: [
        "Fighting",
        "Steel"
      ],
      ability: ""
    }
  ],
  lopunny: [
    {
      label: "",
      types: [
        "Normal",
        "Fighting"
      ],
      ability: "Scrappy"
    }
  ],
  gallade: [
    {
      label: "",
      types: [
        "Psychic",
        "Fighting"
      ],
      ability: "Inner Focus"
    }
  ],
  audino: [
    {
      label: "",
      types: [
        "Normal",
        "Fairy"
      ],
      ability: "Healer"
    }
  ],
  diancie: [
    {
      label: "",
      types: [
        "Rock",
        "Fairy"
      ],
      ability: "Magic Bounce"
    }
  ],
  froslass: [
    {
      label: "",
      types: [
        "Ice",
        "Ghost"
      ],
      ability: "Snow Warning"
    }
  ],
  emboar: [
    {
      label: "",
      types: [
        "Fire",
        "Fighting"
      ],
      ability: "Mold Breaker"
    }
  ],
  excadrill: [
    {
      label: "",
      types: [
        "Ground",
        "Steel"
      ],
      ability: "Piercing Drill"
    }
  ],
  scolipede: [
    {
      label: "",
      types: [
        "Bug",
        "Poison"
      ],
      ability: "Shell Armor"
    }
  ],
  scrafty: [
    {
      label: "",
      types: [
        "Dark",
        "Fighting"
      ],
      ability: "Intimidate"
    }
  ],
  eelektross: [
    {
      label: "",
      types: [
        "Electric"
      ],
      ability: "Eelevate"
    }
  ],
  chandelure: [
    {
      label: "",
      types: [
        "Ghost",
        "Fire"
      ],
      ability: "Infiltrator"
    }
  ],
  chesnaught: [
    {
      label: "",
      types: [
        "Grass",
        "Fighting"
      ],
      ability: "Bulletproof"
    }
  ],
  delphox: [
    {
      label: "",
      types: [
        "Fire",
        "Psychic"
      ],
      ability: "Levitate"
    }
  ],
  greninja: [
    {
      label: "",
      types: [
        "Water",
        "Dark"
      ],
      ability: "Protean"
    }
  ],
  pyroar: [
    {
      label: "",
      types: [
        "Fire",
        "Normal"
      ],
      ability: "Fire Mane"
    }
  ],
  "floette-eternal-flower": [
    {
      label: "",
      types: [
        "Fairy"
      ],
      ability: "Fairy Aura"
    }
  ],
  malamar: [
    {
      label: "",
      types: [
        "Dark",
        "Psychic"
      ],
      ability: "Contrary"
    }
  ],
  barbaracle: [
    {
      label: "",
      types: [
        "Rock",
        "Fighting"
      ],
      ability: "Tough Claws"
    }
  ],
  dragalge: [
    {
      label: "",
      types: [
        "Poison",
        "Dragon"
      ],
      ability: "Regenerator"
    }
  ],
  hawlucha: [
    {
      label: "",
      types: [
        "Fighting",
        "Flying"
      ],
      ability: "No Guard"
    }
  ],
  "zygarde-50": [
    {
      label: "",
      types: [
        "Dragon",
        "Ground"
      ]
    }
  ],
  drampa: [
    {
      label: "",
      types: [
        "Normal",
        "Dragon"
      ],
      ability: "Berserk"
    }
  ],
  falinks: [
    {
      label: "",
      types: [
        "Fighting"
      ],
      ability: "Defiant"
    }
  ],
  "raichu-kantonian": [
    {
      label: "X",
      types: [
        "Electric"
      ],
      ability: "Electric Surge"
    },
    {
      label: "Y",
      types: [
        "Electric"
      ],
      ability: "No Guard"
    }
  ],
  chimecho: [
    {
      label: "",
      types: [
        "Psychic",
        "Steel"
      ],
      ability: "Levitate"
    }
  ],
  staraptor: [
    {
      label: "",
      types: [
        "Fighting",
        "Flying"
      ],
      ability: "Contrary"
    }
  ],
  heatran: [
    {
      label: "",
      types: [
        "Fire",
        "Steel"
      ]
    }
  ],
  darkrai: [
    {
      label: "",
      types: [
        "Dark"
      ]
    }
  ],
  golurk: [
    {
      label: "",
      types: [
        "Ground",
        "Ghost"
      ],
      ability: "Unseen Fist"
    }
  ],
  "meowstic-male": [
    {
      label: "",
      types: [
        "Psychic"
      ],
      ability: "Trace"
    }
  ],
  crabominable: [
    {
      label: "",
      types: [
        "Fighting",
        "Ice"
      ],
      ability: "Iron Fist"
    }
  ],
  golisopod: [
    {
      label: "",
      types: [
        "Bug",
        "Steel"
      ]
    }
  ],
  magearna: [
    {
      label: "",
      types: [
        "Steel",
        "Fairy"
      ]
    }
  ],
  zeraora: [
    {
      label: "",
      types: [
        "Electric"
      ]
    }
  ],
  scovillain: [
    {
      label: "",
      types: [
        "Grass",
        "Fire"
      ],
      ability: "Spicy Spray"
    }
  ],
  glimmora: [
    {
      label: "",
      types: [
        "Rock",
        "Poison"
      ],
      ability: "Adaptability"
    }
  ],
  "tatsugiri-curly": [
    {
      label: "",
      types: [
        "Dragon",
        "Water"
      ]
    }
  ],
  baxcalibur: [
    {
      label: "",
      types: [
        "Dragon",
        "Ice"
      ]
    }
  ],
  abomasnow: [
    {
      label: "",
      types: [
        "Ice",
        "Grass"
      ],
      ability: "Snow Warning"
    }
  ],
  feraligatr: [
    {
      label: "",
      types: [
        "Water",
        "Dragon"
      ],
      ability: "Dragonize"
    }
  ],
  sharpedo: [
    {
      label: "",
      types: [
        "Water",
        "Dark"
      ],
      ability: "Strong Jaw"
    }
  ],
  steelix: [
    {
      label: "",
      types: [
        "Steel",
        "Ground"
      ],
      ability: "Sand Force"
    }
  ],
  meganium: [
    {
      label: "",
      types: [
        "Grass",
        "Fairy"
      ],
      ability: "Mega Sol"
    }
  ],
  skarmory: [
    {
      label: "",
      types: [
        "Steel",
        "Flying"
      ],
      ability: "Stalwart"
    }
  ],
  groudon: [
    {
      label: "",
      types: [
        "Ground",
        "Fire"
      ],
      ability: "Desolate Land"
    }
  ],
  kyogre: [
    {
      label: "",
      types: [
        "Water"
      ],
      ability: "Primordial Sea"
    }
  ],
  "necrozma-dawn-wings": [
    {
      label: "",
      types: [
        "Psychic",
        "Dragon"
      ],
      ability: "Neuroforce"
    }
  ],
  "necrozma-dusk-mane": [
    {
      label: "",
      types: [
        "Psychic",
        "Dragon"
      ],
      ability: "Neuroforce"
    }
  ],
  "tatsugiri-droopy": [
    {
      label: "",
      types: [
        "Dragon",
        "Water"
      ],
      ability: ""
    }
  ],
  "tatsugiri-stretchy": [
    {
      label: "",
      types: [
        "Dragon",
        "Water"
      ],
      ability: ""
    }
  ],
  "meowstic-female": [
    {
      label: "",
      types: [
        "Psychic"
      ],
      ability: "Trace"
    }
  ],
  "magearna-original-color": [
    {
      label: "",
      types: [
        "Steel",
        "Fairy"
      ],
      ability: ""
    }
  ]
};

/**
 * Mega Evolution Alternate Forms
 * -------------------------------
 * A few species do the exact same thing Mega Evolution does, using the same toggle and
 * megaTypes/megaForm/spriteMega fields underneath, but the games call it something
 * else and give it its own icon: Groudon and Kyogre get Primal Reversion, and both of
 * Necrozma's fused forms get Ultra Burst. Keyed by species entry id (see
 * data/pokemon-species.js) rather than species name, since Necrozma's two forms share a
 * name but need different typing/icons from the base Necrozma and from each other.
 *
 * Anything not listed here just uses the default Mega Evolution term/icon. See
 * getMegaFormDisplay in js/utils.js, which is what actually reads this table.
 */
const MEGA_ALT_FORMS = {
  groudon: {
    term: "Primal Reversion",
    prefix: "PRIMAL",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABbUlEQVR42nWSCbXEIAxFY6EWsBALsYAFLNRCLdQCFmIBC1jAwvsvKX+f4cwtW24Cc5C/rYtU4gQ/cFLlXXPV2ksBe7hVeN0YUUM/jkjSif2upmoE47ow7xveGm7O71KSbpaJeqyJkB8JWNFHO7HmxBqDSRpmPzH94rgywUHKzwQ9xUskjzvPi0Kn7ACij1M0YF7AOinx2DvBzSuEF7K7GUbcrxkDdzWRL5Y3JqshIGJdDeHJKfKIqixSKLcU+g+8PutdOS6KYRXhpTxDjqPfO+hT+pI1192OjBt1yy0q25bPlJmkfsvlAMb5yEUemfHhSY0HYAUrqs6s8Ny7WSZYPefP+niudmtBeCHXU4VVlQl25aZZdZC+/zDMmuLg3snT2OeL46DnIzEjBX4wmTwM4gx2Lbl/My7i5bMpf1xAJFhWiWHFuBD2M+b7gUSchvKzxQLp7YgqRqGGEH3OYz32U3zXiogRJ4tg907sb+wHPVWPXYRl1W0AAAAASUVORK5CYII="
  },
  kyogre: {
    term: "Primal Reversion",
    prefix: "PRIMAL",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABaElEQVR42l3LUXFdRxAFwJZKBIbCUNhA2EB4gfAoiIJFQRB0KVwIXggZCodCPpwqq9z//fLj57/+8MATW0IV3PjE5Zu3/pbCVyYyQyIAaiu7uu6q+sANb0lg46tQuMPM71xV9OLce63e1N+4XyHxLqxua7XerfYSzIzsTTdKTpAnvJ2ZR6kdBNWlLYpa27mPqjLXpWZYLZOHyuMt8QT/x8/ruK4jifV46LUkZAYEFcLzVbITusuEz88jCuVcN5g5EqIkUCT7NQmgCEEQ5beiCkRRJPErVzkT1XQ3AXotUN1AlSooSbxJbsmecE68/9jue1Cqy0xUleomVP2Kkvs1fMwc3e3j87iv0d2qyrnHfR1C762qUGaO8PFS6wFfaz8f1cuZmInvepXuZg4zzrku/PNSvWFRP9fjqXqB719GIRlzX8hfOC9qAyy891qPXlv1QiEyx5zbnHPhAwde1PKHjXf83hx84PbNf71n2MwCK6CoAAAAAElFTkSuQmCC"
  },
  "necrozma-dawn-wings": {
    term: "Ultra Burst",
    prefix: "ULTRA",
    icon: "data:image/png;base64,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"
  },
  "necrozma-dusk-mane": {
    term: "Ultra Burst",
    prefix: "ULTRA",
    icon: "data:image/png;base64,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"
  }
};

/**
 * Gigantamax Alternate Forms
 * --------------------------
 * Same idea as MEGA_ALT_FORMS above, but for the Gigantamax toggle: Eternatus's
 * Gigantamax is called Eternamax instead. An entry's icon can be left as "" to mean
 * "use the default Gigantamax icon", since Eternamax doesn't have a separate official icon,
 * so it's just a term override.
 *
 * Anything not listed here just uses the default Gigantamax term/icon. See
 * getGigantamaxFormDisplay in js/utils.js, which is what actually reads this table.
 */
const GIGANTAMAX_ALT_FORMS = {
  eternatus: {
    term: "Eternamax",
    prefix: "ETERNAMAX",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAXCAYAAAAcP/9qAAAHzklEQVRIDQXBaYzcZR3A8e/vef7/2ZnZmZ2ZvboHe3Z7AN1WGkrAFpRD8EUlCKGJiYmYGDDRiO8whsSoiS9UQkwwaowSXxA12hisAYIpEZJiAdvS0gN6bLvb7Xa798zO9T+e5+fnI4JQQOghpEfy9JocWbX5rAT7BFtx+DN1orkacdrUBAUCDCFCgBCjRDhSFAPkJaCLDnLYoogJvbpG7F1UJWadNhtEbKgjADAiBGopkWF70Pv1fpP7Vqq6r+3TjEfX2qQf1n3yRkvSGQVAyYoJshJM1Hx0LsKfBlWLmcpLOJ0nvD8jcg+YohFmVDi5kNZeib2bqfsEwREAoACKQ0lHix/c98AjL/TMu/y1M+epVmv9GxodbEj65QjnFQiAnnKJyaERe/L8uXaDZAFULXZLlqAzLzbIhxmGd0wxsHtq5Pj8x/tuHj3+F6PMGAQBAoAET4onIuHW5eurh9deTw8+d4iHn/s+9f9c4OqRY6wsrwcNTVBRQi+U79zK5IN307q01NnQaJuqYjGU8gWGPr+TrU9+kSVT5fAvX9WZszPvbGp0NlFPiicFLCIISoghwBBiWvm2pCsfXHxkafVmOP3txxh9/AA9pQr5azW6YkuPzbH16f307t+O/usCXT6kp6PAtof3seeHTzPwxF5Ov3+cN3/6KhvXV+aXaD67Tuv6OhF1HE0UKyIoAngMikGwmAuhmkk/uzG98N+zZmT/NioHptjy0G46yVCfW2D4mw9i+/JUT1xhYGiQyRe+QumpabQAx17+K+dePcp6s9lc1OaPVnzzyDItqsTUccSAFREAYiDB4/EImqLybogdyaylu269d056dgxQHOsms3eQ/gd2E/RlMeLpnp6g8+Cd6JYMcbXKsR+/xvzb51lMmvUF33hxUeu/ucGmX6ZNFUcTBRGsiICACiQobRwORdC2gRMZEz5ZbJly/cNrFMfKdG2pIHkBPHiP5A2KI1qpcuJnh1n5YI55v5nM+tqL81p9ZZ7N9BZt1nFEKCqCAFZEABBARPAIDiUQIUfYKJjso12mY6o77sCdWiAz1kW+t4BxHnEOnCPaqHHh529Q//gWC77OvNbPzPna8/PUm8u0WcORAoggAIABAAAAsAJ5sXRKSJdkhgsS3t4pIR3G0K151v9wio0L1/FJgk9S0s0GV17+N91rGWLjiFES/GoivuVEiUVxAAIAAABWRAAAsEAZy5B0MiJdlTFbfmncdu0fC8oyOtDPxHNfoLJnlNnXjlHY0YcEwtU/HWNwaJgtz+ylenGR2nKNhrjuSP07ibp5jxJLigMUAACwIgJAAJSxDEueMSn1TNrKb7cFlUNTYcVMDA0w+cx+dKgDKVmK+S6u/P04rdlV8q0MvYduZ+H0Raqza4xtH6NxYy2rovdZzA0Dl0VQR0qsigoAWEQwQAnLkOQYl0rfpK38fsqWn5gKKnbrwBBjX7sX3x0gzmOcJ+jLIddbtM6sMPrsXWzMLLB+5DLT33iA8s4ymyduErRNXyDmoEUaFnvCqfORpMQoANaIUMEySI5xU+4dN+U/bg3KB7cFFTvRN8DIV+/Cd1lM6sE7xHmi9U3Ov3WS1bUqsU1YOnqFnYfuxRUTrv35JNv2T9NbKYlbqHcYNQdQaSF8lKrzMY5YFVsSwwA5RqWcmzCVX08Gpae2B912vNLH8KPT+FKIOI86Dz5FnePTIydYmllhxbXY+GyFnY/uori9wOzhM/T1D1I60EP3VIXOmiFdbGRA709JW6n6Ew7n2uKwgybLiBTtmCl9bzIof2d7UMmMdvYwfGAnWgkR71HnEO/BedYu3uTSu5dYSOus+DapVzI5D8stinGWvi8NI6SAozReJlxyJKtRmKjfryI3E01PxXjsHZQYNeX7R23pVxO2qzSeqTBy9xT05sA7cIqkDvUprhVz9q1TzNarOuc3Z5d843iM6/PLcbYQhUw9vg0JHXgF71HjqExUSOdaRNUoE6mbjkiPpuqX7LTpzg5K8XcjQXHXRFhmYsc4wUAZdQrOgXeoc2jqmTt/jQuXrjPjNtdnffXQqjZ/4SDqIHi4Us6a0Tv6MHjwKeIc4jxYR89tPWxcWqMRReW2+qCtyZv2c6Zv14DkfzAZlnLbh0Yo3taPupSk0aCxvMHmzDK3Lt7g/OlP+ezaArPJZnXObzw/r/U31omcCKdDzG2y6Xbf+mReGpdqpNdatJp1Ym2SCUJMztHdX2bh4pLU4qi/Tvq3wKpOdAfZ4kihl2ypwI2rs9RXN2i3YpouIvKeuotZ1XZ70Tf/t6iNl67r5j8XafgIhyrNnIY/CVK7M1lnX6u2aldMk9xZIRNaOvILZHcEDG3tZ+89E1x7r7olTM2eANUl5111rr3efeGTG+KcxwGxOtfCtRoaLdQ1+aiq0eur2n57lVZ1iSarRChKSJsFzFXv9VBdkmeWyR0quXCymGY6OuPQhi1L+L7w2YdLdA1l6cnnE6orNXmMAdtP50N5yTweislZhESda5OcbKk/U6P1aYO02iTxVWI2SdggpY0iQAGhREiZDEU66CJT7iJzR0E69nUS7slLuNuKGVOlLFBraPSPGarflbsoUSSkA4sFHEoLR5OUJgk1Elp4PJ4EpQ2oCAAAKGRQQoQQoUBADkuRDAVCCmTyOcJBI3baq7vYIL5cI4r/D+tyBbstEA1CAAAAAElFTkSuQmCC"
  }
};

/**
 * Fixed Tera Types
 * ----------------
 * Terastallization is normally a free choice of any type (see the Tera Type field in
 * js/pokemon.js), but a few species are locked to one specific Tera type by the games:
 * each of Ogerpon's masks has its own, and Terapagos always goes Stellar. Keyed by
 * species entry id (see data/pokemon-species.js) since this varies per Ogerpon form.
 *
 * Anything not listed here keeps the free Tera Type picker. See getFixedTeraType in
 * js/utils.js, which is what actually reads this table.
 */
const FIXED_TERA_TYPES = {
  "ogerpon-teal-mask": "Grass",
  "ogerpon-wellspring-mask": "Water",
  "ogerpon-hearthflame-mask": "Fire",
  "ogerpon-cornerstone-mask": "Rock",
  "terapagos-normal": "Stellar"
};
