/**
 * Mega Evolution Types
 * --------------------
 * Reference typing for every known Mega Evolution, keyed by species name exactly as it
 * appears in the Species field. Used to auto-fill Mega Evolution Type(s) the moment a
 * Pokémon is marked as Mega -- the fill-in is just a starting point, still freely
 * editable afterward like everything else the Species field pre-fills.
 *
 * Each species maps to a list of variants, since a handful of species have more than one
 * Mega form with different typing (Charizard X/Y, Mewtwo X/Y, and this project's own
 * Absol/Garchomp "Z" variants). Every variant has a `label` -- empty string for a
 * species' single/standard Mega, "X"/"Y"/"Z" for the others -- which is what actually gets
 * stored on the Pokémon record (see megaForm in js/pokemon.js) so which form was picked is
 * explicit instead of guessed from whatever typing happens to be set.
 */

const MEGA_TYPES = {
  Venusaur: [
    {
      label: "",
      types: [
        "Grass",
        "Poison"
      ]
    }
  ],
  Charizard: [
    {
      label: "X",
      types: [
        "Fire",
        "Dragon"
      ]
    },
    {
      label: "Y",
      types: [
        "Fire",
        "Flying"
      ]
    }
  ],
  Blastoise: [
    {
      label: "",
      types: [
        "Water"
      ]
    }
  ],
  Beedrill: [
    {
      label: "",
      types: [
        "Bug",
        "Poison"
      ]
    }
  ],
  Pidgeot: [
    {
      label: "",
      types: [
        "Normal",
        "Flying"
      ]
    }
  ],
  Alakazam: [
    {
      label: "",
      types: [
        "Psychic"
      ]
    }
  ],
  Slowbro: [
    {
      label: "",
      types: [
        "Water",
        "Psychic"
      ]
    }
  ],
  Gengar: [
    {
      label: "",
      types: [
        "Ghost",
        "Poison"
      ]
    }
  ],
  Kangaskhan: [
    {
      label: "",
      types: [
        "Normal"
      ]
    }
  ],
  Pinsir: [
    {
      label: "",
      types: [
        "Bug",
        "Flying"
      ]
    }
  ],
  Gyarados: [
    {
      label: "",
      types: [
        "Water",
        "Dark"
      ]
    }
  ],
  Aerodactyl: [
    {
      label: "",
      types: [
        "Rock",
        "Flying"
      ]
    }
  ],
  Mewtwo: [
    {
      label: "X",
      types: [
        "Psychic",
        "Fighting"
      ]
    },
    {
      label: "Y",
      types: [
        "Psychic"
      ]
    }
  ],
  Dragonite: [
    {
      label: "",
      types: [
        "Dragon",
        "Flying"
      ]
    }
  ],
  Ampharos: [
    {
      label: "",
      types: [
        "Electric",
        "Dragon"
      ]
    }
  ],
  Clefable: [
    {
      label: "",
      types: [
        "Fairy",
        "Flying"
      ]
    }
  ],
  Victreebel: [
    {
      label: "",
      types: [
        "Grass",
        "Poison"
      ]
    }
  ],
  Starmie: [
    {
      label: "",
      types: [
        "Water",
        "Psychic"
      ]
    }
  ],
  Scizor: [
    {
      label: "",
      types: [
        "Bug",
        "Steel"
      ]
    }
  ],
  Heracross: [
    {
      label: "",
      types: [
        "Bug",
        "Fighting"
      ]
    }
  ],
  Houndoom: [
    {
      label: "",
      types: [
        "Dark",
        "Fire"
      ]
    }
  ],
  Tyranitar: [
    {
      label: "",
      types: [
        "Rock",
        "Dark"
      ]
    }
  ],
  Sceptile: [
    {
      label: "",
      types: [
        "Grass",
        "Dragon"
      ]
    }
  ],
  Blaziken: [
    {
      label: "",
      types: [
        "Fire",
        "Fighting"
      ]
    }
  ],
  Swampert: [
    {
      label: "",
      types: [
        "Water",
        "Ground"
      ]
    }
  ],
  Gardevoir: [
    {
      label: "",
      types: [
        "Psychic",
        "Fairy"
      ]
    }
  ],
  Sableye: [
    {
      label: "",
      types: [
        "Dark",
        "Ghost"
      ]
    }
  ],
  Mawile: [
    {
      label: "",
      types: [
        "Steel",
        "Fairy"
      ]
    }
  ],
  Aggron: [
    {
      label: "",
      types: [
        "Steel"
      ]
    }
  ],
  Medicham: [
    {
      label: "",
      types: [
        "Fighting",
        "Psychic"
      ]
    }
  ],
  Manectric: [
    {
      label: "",
      types: [
        "Electric"
      ]
    }
  ],
  Camerupt: [
    {
      label: "",
      types: [
        "Fire",
        "Ground"
      ]
    }
  ],
  Altaria: [
    {
      label: "",
      types: [
        "Dragon",
        "Fairy"
      ]
    }
  ],
  Banette: [
    {
      label: "",
      types: [
        "Ghost"
      ]
    }
  ],
  Absol: [
    {
      label: "",
      types: [
        "Dark"
      ]
    },
    {
      label: "Z",
      types: [
        "Dark",
        "Ghost"
      ]
    }
  ],
  Glalie: [
    {
      label: "",
      types: [
        "Ice"
      ]
    }
  ],
  Salamence: [
    {
      label: "",
      types: [
        "Dragon",
        "Flying"
      ]
    }
  ],
  Metagross: [
    {
      label: "",
      types: [
        "Steel",
        "Psychic"
      ]
    }
  ],
  Latias: [
    {
      label: "",
      types: [
        "Dragon",
        "Psychic"
      ]
    }
  ],
  Latios: [
    {
      label: "",
      types: [
        "Dragon",
        "Psychic"
      ]
    }
  ],
  Rayquaza: [
    {
      label: "",
      types: [
        "Dragon",
        "Flying"
      ]
    }
  ],
  Garchomp: [
    {
      label: "",
      types: [
        "Dragon",
        "Ground"
      ]
    },
    {
      label: "Z",
      types: [
        "Dragon"
      ]
    }
  ],
  Lucario: [
    {
      label: "",
      types: [
        "Fighting",
        "Steel"
      ]
    },
    {
      label: "Z",
      types: [
        "Fighting",
        "Steel"
      ]
    }
  ],
  Lopunny: [
    {
      label: "",
      types: [
        "Normal",
        "Fighting"
      ]
    }
  ],
  Gallade: [
    {
      label: "",
      types: [
        "Psychic",
        "Fighting"
      ]
    }
  ],
  Audino: [
    {
      label: "",
      types: [
        "Normal",
        "Fairy"
      ]
    }
  ],
  Diancie: [
    {
      label: "",
      types: [
        "Rock",
        "Fairy"
      ]
    }
  ],
  Froslass: [
    {
      label: "",
      types: [
        "Ice",
        "Ghost"
      ]
    }
  ],
  Emboar: [
    {
      label: "",
      types: [
        "Fire",
        "Fighting"
      ]
    }
  ],
  Excadrill: [
    {
      label: "",
      types: [
        "Ground",
        "Steel"
      ]
    }
  ],
  Scolipede: [
    {
      label: "",
      types: [
        "Bug",
        "Poison"
      ]
    }
  ],
  Scrafty: [
    {
      label: "",
      types: [
        "Dark",
        "Fighting"
      ]
    }
  ],
  Eelektross: [
    {
      label: "",
      types: [
        "Electric"
      ]
    }
  ],
  Chandelure: [
    {
      label: "",
      types: [
        "Ghost",
        "Fire"
      ]
    }
  ],
  Chesnaught: [
    {
      label: "",
      types: [
        "Grass",
        "Fighting"
      ]
    }
  ],
  Delphox: [
    {
      label: "",
      types: [
        "Fire",
        "Psychic"
      ]
    }
  ],
  Greninja: [
    {
      label: "",
      types: [
        "Water",
        "Dark"
      ]
    }
  ],
  Pyroar: [
    {
      label: "",
      types: [
        "Fire",
        "Normal"
      ]
    }
  ],
  Floette: [
    {
      label: "",
      types: [
        "Fairy"
      ]
    }
  ],
  Malamar: [
    {
      label: "",
      types: [
        "Dark",
        "Psychic"
      ]
    }
  ],
  Barbaracle: [
    {
      label: "",
      types: [
        "Rock",
        "Fighting"
      ]
    }
  ],
  Dragalge: [
    {
      label: "",
      types: [
        "Poison",
        "Dragon"
      ]
    }
  ],
  Hawlucha: [
    {
      label: "",
      types: [
        "Fighting",
        "Flying"
      ]
    }
  ],
  Zygarde: [
    {
      label: "",
      types: [
        "Dragon",
        "Ground"
      ]
    }
  ],
  Drampa: [
    {
      label: "",
      types: [
        "Normal",
        "Dragon"
      ]
    }
  ],
  Falinks: [
    {
      label: "",
      types: [
        "Fighting"
      ]
    }
  ],
  Raichu: [
    {
      label: "X",
      types: [
        "Electric"
      ]
    },
    {
      label: "Y",
      types: [
        "Electric"
      ]
    }
  ],
  Chimecho: [
    {
      label: "",
      types: [
        "Psychic",
        "Steel"
      ]
    }
  ],
  Staraptor: [
    {
      label: "",
      types: [
        "Fighting",
        "Flying"
      ]
    }
  ],
  Heatran: [
    {
      label: "",
      types: [
        "Fire",
        "Steel"
      ]
    }
  ],
  Darkrai: [
    {
      label: "",
      types: [
        "Dark"
      ]
    }
  ],
  Golurk: [
    {
      label: "",
      types: [
        "Ground",
        "Ghost"
      ]
    }
  ],
  Meowstic: [
    {
      label: "",
      types: [
        "Psychic"
      ]
    }
  ],
  Crabominable: [
    {
      label: "",
      types: [
        "Fighting",
        "Ice"
      ]
    }
  ],
  Golisopod: [
    {
      label: "",
      types: [
        "Bug",
        "Steel"
      ]
    }
  ],
  Magearna: [
    {
      label: "",
      types: [
        "Steel",
        "Fairy"
      ]
    }
  ],
  Zeraora: [
    {
      label: "",
      types: [
        "Electric"
      ]
    }
  ],
  Scovillain: [
    {
      label: "",
      types: [
        "Grass",
        "Fire"
      ]
    }
  ],
  Glimmora: [
    {
      label: "",
      types: [
        "Rock",
        "Poison"
      ]
    }
  ],
  Tatsugiri: [
    {
      label: "",
      types: [
        "Dragon",
        "Water"
      ]
    }
  ],
  Baxcalibur: [
    {
      label: "",
      types: [
        "Dragon",
        "Ice"
      ]
    }
  ]
};
