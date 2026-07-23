/**
 * Pokémon Species Database
 * -------------------------
 * Every entry the Species field's autocomplete/picker can suggest: National Dex number,
 * species name, an optional Regional Demonym, an optional Form Name, and typing.
 *
 * A single species can have multiple entries -- one per Regional Variant or official form
 * that carries its own typing (Alolan Meowth, Origin Forme Giratina, Zen Mode Darmanitan,
 * and so on). Each entry has a stable `id` so a saved Pokémon can remember exactly which
 * one was picked (and have it re-highlighted if the picker is reopened), independent of
 * array order.
 *
 * Fields are kept separate on purpose -- species name, demonym, and form name are never
 * pre-joined into one string. The picker builds its subtitle from them at render time:
 *   - both demonym and form  -> "Demonym · Form"
 *   - demonym only           -> "Demonym"
 *   - form only              -> "Form"
 *   - neither                -> no subtitle
 *
 * Regional Demonym is only ever one of the fixed regional-origin labels (Kantonian Form,
 * Alolan Form, Galarian Form, etc.) -- and every entry for a species that HAS regional
 * variants gets one, including that species' original form, so all of them read
 * consistently in the picker. Form Name is for official in-game alternate-forme names
 * (Origin Forme, Zen Mode, Crowned Sword, ...) unrelated to regional origin.
 *
 * This is a seed set covering the worked examples from the v25 spec, proving out the
 * schema end-to-end. The remaining ~1020 species (plain, single-entry, no demonym/form)
 * still need to be added from the full National Dex list.
 */

const POKEMON_SPECIES = [
  {
    id: "bulbasaur",
    dex: 1,
    species: "Bulbasaur",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "ivysaur",
    dex: 2,
    species: "Ivysaur",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "venusaur",
    dex: 3,
    species: "Venusaur",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "charmander",
    dex: 4,
    species: "Charmander",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "charmeleon",
    dex: 5,
    species: "Charmeleon",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "charizard",
    dex: 6,
    species: "Charizard",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Flying"
    ]
  },
  {
    id: "squirtle",
    dex: 7,
    species: "Squirtle",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "wartortle",
    dex: 8,
    species: "Wartortle",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "blastoise",
    dex: 9,
    species: "Blastoise",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "caterpie",
    dex: 10,
    species: "Caterpie",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "metapod",
    dex: 11,
    species: "Metapod",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "butterfree",
    dex: 12,
    species: "Butterfree",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "weedle",
    dex: 13,
    species: "Weedle",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "kakuna",
    dex: 14,
    species: "Kakuna",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "beedrill",
    dex: 15,
    species: "Beedrill",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "pidgey",
    dex: 16,
    species: "Pidgey",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "pidgeotto",
    dex: 17,
    species: "Pidgeotto",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "pidgeot",
    dex: 18,
    species: "Pidgeot",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "rattata-kantonian",
    dex: 19,
    species: "Rattata",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "rattata-alolan",
    dex: 19,
    species: "Rattata",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Dark",
      "Normal"
    ]
  },
  {
    id: "raticate-kantonian",
    dex: 20,
    species: "Raticate",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "raticate-alolan",
    dex: 20,
    species: "Raticate",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Dark",
      "Normal"
    ]
  },
  {
    id: "spearow",
    dex: 21,
    species: "Spearow",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "fearow",
    dex: 22,
    species: "Fearow",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "ekans",
    dex: 23,
    species: "Ekans",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "arbok",
    dex: 24,
    species: "Arbok",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "pikachu",
    dex: 25,
    species: "Pikachu",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "raichu-kantonian",
    dex: 26,
    species: "Raichu",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "raichu-alolan",
    dex: 26,
    species: "Raichu",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Electric",
      "Psychic"
    ]
  },
  {
    id: "sandshrew-kantonian",
    dex: 27,
    species: "Sandshrew",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "sandshrew-alolan",
    dex: 27,
    species: "Sandshrew",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Ice",
      "Steel"
    ]
  },
  {
    id: "sandslash-kantonian",
    dex: 28,
    species: "Sandslash",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "sandslash-alolan",
    dex: 28,
    species: "Sandslash",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Ice",
      "Steel"
    ]
  },
  {
    id: "nidoran-female",
    dex: 29,
    species: "Nidoran♀",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "nidorina",
    dex: 30,
    species: "Nidorina",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "nidoqueen",
    dex: 31,
    species: "Nidoqueen",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Ground"
    ]
  },
  {
    id: "nidoran-male",
    dex: 32,
    species: "Nidoran♂",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "nidorino",
    dex: 33,
    species: "Nidorino",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "nidoking",
    dex: 34,
    species: "Nidoking",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Ground"
    ]
  },
  {
    id: "clefairy",
    dex: 35,
    species: "Clefairy",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "clefable",
    dex: 36,
    species: "Clefable",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "vulpix-kantonian",
    dex: 37,
    species: "Vulpix",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "vulpix-alolan",
    dex: 37,
    species: "Vulpix",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "ninetales-kantonian",
    dex: 38,
    species: "Ninetales",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "ninetales-alolan",
    dex: 38,
    species: "Ninetales",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Ice",
      "Fairy"
    ]
  },
  {
    id: "jigglypuff",
    dex: 39,
    species: "Jigglypuff",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Fairy"
    ]
  },
  {
    id: "wigglytuff",
    dex: 40,
    species: "Wigglytuff",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Fairy"
    ]
  },
  {
    id: "zubat",
    dex: 41,
    species: "Zubat",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Flying"
    ]
  },
  {
    id: "golbat",
    dex: 42,
    species: "Golbat",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Flying"
    ]
  },
  {
    id: "oddish",
    dex: 43,
    species: "Oddish",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "gloom",
    dex: 44,
    species: "Gloom",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "vileplume",
    dex: 45,
    species: "Vileplume",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "paras",
    dex: 46,
    species: "Paras",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Grass"
    ]
  },
  {
    id: "parasect",
    dex: 47,
    species: "Parasect",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Grass"
    ]
  },
  {
    id: "venonat",
    dex: 48,
    species: "Venonat",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "venomoth",
    dex: 49,
    species: "Venomoth",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "diglett-kantonian",
    dex: 50,
    species: "Diglett",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "diglett-alolan",
    dex: 50,
    species: "Diglett",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Ground",
      "Steel"
    ]
  },
  {
    id: "dugtrio-kantonian",
    dex: 51,
    species: "Dugtrio",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "dugtrio-alolan",
    dex: 51,
    species: "Dugtrio",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Ground",
      "Steel"
    ]
  },
  {
    id: "meowth-kantonian",
    dex: 52,
    species: "Meowth",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "meowth-alolan",
    dex: 52,
    species: "Meowth",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "meowth-galarian",
    dex: 52,
    species: "Meowth",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "persian-kantonian",
    dex: 53,
    species: "Persian",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "persian-alolan",
    dex: 53,
    species: "Persian",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "psyduck",
    dex: 54,
    species: "Psyduck",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "golduck",
    dex: 55,
    species: "Golduck",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "mankey",
    dex: 56,
    species: "Mankey",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "primeape",
    dex: 57,
    species: "Primeape",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "growlithe-kantonian",
    dex: 58,
    species: "Growlithe",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "growlithe-hisuian",
    dex: 58,
    species: "Growlithe",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Fire",
      "Rock"
    ]
  },
  {
    id: "arcanine-kantonian",
    dex: 59,
    species: "Arcanine",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "arcanine-hisuian",
    dex: 59,
    species: "Arcanine",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Fire",
      "Rock"
    ]
  },
  {
    id: "poliwag",
    dex: 60,
    species: "Poliwag",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "poliwhirl",
    dex: 61,
    species: "Poliwhirl",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "poliwrath",
    dex: 62,
    species: "Poliwrath",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Fighting"
    ]
  },
  {
    id: "abra",
    dex: 63,
    species: "Abra",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "kadabra",
    dex: 64,
    species: "Kadabra",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "alakazam",
    dex: 65,
    species: "Alakazam",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "machop",
    dex: 66,
    species: "Machop",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "machoke",
    dex: 67,
    species: "Machoke",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "machamp",
    dex: 68,
    species: "Machamp",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "bellsprout",
    dex: 69,
    species: "Bellsprout",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "weepinbell",
    dex: 70,
    species: "Weepinbell",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "victreebel",
    dex: 71,
    species: "Victreebel",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "tentacool",
    dex: 72,
    species: "Tentacool",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Poison"
    ]
  },
  {
    id: "tentacruel",
    dex: 73,
    species: "Tentacruel",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Poison"
    ]
  },
  {
    id: "geodude-kantonian",
    dex: 74,
    species: "Geodude",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Rock",
      "Ground"
    ]
  },
  {
    id: "geodude-alolan",
    dex: 74,
    species: "Geodude",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Rock",
      "Electric"
    ]
  },
  {
    id: "graveler-kantonian",
    dex: 75,
    species: "Graveler",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Rock",
      "Ground"
    ]
  },
  {
    id: "graveler-alolan",
    dex: 75,
    species: "Graveler",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Rock",
      "Electric"
    ]
  },
  {
    id: "golem-kantonian",
    dex: 76,
    species: "Golem",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Rock",
      "Ground"
    ]
  },
  {
    id: "golem-alolan",
    dex: 76,
    species: "Golem",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Rock",
      "Electric"
    ]
  },
  {
    id: "ponyta-kantonian",
    dex: 77,
    species: "Ponyta",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "ponyta-galarian",
    dex: 77,
    species: "Ponyta",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "rapidash-kantonian",
    dex: 78,
    species: "Rapidash",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "rapidash-galarian",
    dex: 78,
    species: "Rapidash",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Psychic",
      "Fairy"
    ]
  },
  {
    id: "slowpoke-kantonian",
    dex: 79,
    species: "Slowpoke",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Water",
      "Psychic"
    ]
  },
  {
    id: "slowpoke-galarian",
    dex: 79,
    species: "Slowpoke",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "slowbro-kantonian",
    dex: 80,
    species: "Slowbro",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Water",
      "Psychic"
    ]
  },
  {
    id: "slowbro-galarian",
    dex: 80,
    species: "Slowbro",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Poison",
      "Psychic"
    ]
  },
  {
    id: "magnemite",
    dex: 81,
    species: "Magnemite",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Steel"
    ]
  },
  {
    id: "magneton",
    dex: 82,
    species: "Magneton",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Steel"
    ]
  },
  {
    id: "farfetchd-kantonian",
    dex: 83,
    species: "Farfetch’d",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "farfetchd-galarian",
    dex: 83,
    species: "Farfetch’d",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "doduo",
    dex: 84,
    species: "Doduo",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "dodrio",
    dex: 85,
    species: "Dodrio",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "seel",
    dex: 86,
    species: "Seel",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "dewgong",
    dex: 87,
    species: "Dewgong",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ice"
    ]
  },
  {
    id: "grimer-kantonian",
    dex: 88,
    species: "Grimer",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "grimer-alolan",
    dex: 88,
    species: "Grimer",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Poison",
      "Dark"
    ]
  },
  {
    id: "muk-kantonian",
    dex: 89,
    species: "Muk",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "muk-alolan",
    dex: 89,
    species: "Muk",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Poison",
      "Dark"
    ]
  },
  {
    id: "shellder",
    dex: 90,
    species: "Shellder",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "cloyster",
    dex: 91,
    species: "Cloyster",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ice"
    ]
  },
  {
    id: "gastly",
    dex: 92,
    species: "Gastly",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Poison"
    ]
  },
  {
    id: "haunter",
    dex: 93,
    species: "Haunter",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Poison"
    ]
  },
  {
    id: "gengar",
    dex: 94,
    species: "Gengar",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Poison"
    ]
  },
  {
    id: "onix",
    dex: 95,
    species: "Onix",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Ground"
    ]
  },
  {
    id: "drowzee",
    dex: 96,
    species: "Drowzee",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "hypno",
    dex: 97,
    species: "Hypno",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "krabby",
    dex: 98,
    species: "Krabby",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "kingler",
    dex: 99,
    species: "Kingler",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "voltorb-kantonian",
    dex: 100,
    species: "Voltorb",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "voltorb-hisuian",
    dex: 100,
    species: "Voltorb",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Electric",
      "Grass"
    ]
  },
  {
    id: "electrode-kantonian",
    dex: 101,
    species: "Electrode",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "electrode-hisuian",
    dex: 101,
    species: "Electrode",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Electric",
      "Grass"
    ]
  },
  {
    id: "exeggcute",
    dex: 102,
    species: "Exeggcute",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Psychic"
    ]
  },
  {
    id: "exeggutor-kantonian",
    dex: 103,
    species: "Exeggutor",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Grass",
      "Psychic"
    ]
  },
  {
    id: "exeggutor-alolan",
    dex: 103,
    species: "Exeggutor",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Grass",
      "Dragon"
    ]
  },
  {
    id: "cubone",
    dex: 104,
    species: "Cubone",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "marowak-kantonian",
    dex: 105,
    species: "Marowak",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "marowak-alolan",
    dex: 105,
    species: "Marowak",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Fire",
      "Ghost"
    ]
  },
  {
    id: "hitmonlee",
    dex: 106,
    species: "Hitmonlee",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "hitmonchan",
    dex: 107,
    species: "Hitmonchan",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "lickitung",
    dex: 108,
    species: "Lickitung",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "koffing",
    dex: 109,
    species: "Koffing",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "weezing-kantonian",
    dex: 110,
    species: "Weezing",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "weezing-galarian",
    dex: 110,
    species: "Weezing",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Poison",
      "Fairy"
    ]
  },
  {
    id: "rhyhorn",
    dex: 111,
    species: "Rhyhorn",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Rock"
    ]
  },
  {
    id: "rhydon",
    dex: 112,
    species: "Rhydon",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Rock"
    ]
  },
  {
    id: "chansey",
    dex: 113,
    species: "Chansey",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "tangela",
    dex: 114,
    species: "Tangela",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "kangaskhan",
    dex: 115,
    species: "Kangaskhan",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "horsea",
    dex: 116,
    species: "Horsea",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "seadra",
    dex: 117,
    species: "Seadra",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "goldeen",
    dex: 118,
    species: "Goldeen",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "seaking",
    dex: 119,
    species: "Seaking",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "staryu",
    dex: 120,
    species: "Staryu",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "starmie",
    dex: 121,
    species: "Starmie",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Psychic"
    ]
  },
  {
    id: "mr-mime-kantonian",
    dex: 122,
    species: "Mr. Mime",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Psychic",
      "Fairy"
    ]
  },
  {
    id: "mr-mime-galarian",
    dex: 122,
    species: "Mr. Mime",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Ice",
      "Psychic"
    ]
  },
  {
    id: "scyther",
    dex: 123,
    species: "Scyther",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "jynx",
    dex: 124,
    species: "Jynx",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Psychic"
    ]
  },
  {
    id: "electabuzz",
    dex: 125,
    species: "Electabuzz",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "magmar",
    dex: 126,
    species: "Magmar",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "pinsir",
    dex: 127,
    species: "Pinsir",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "tauros-kantonian",
    dex: 128,
    species: "Tauros",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "tauros-paldean-aqua-breed",
    dex: 128,
    species: "Tauros",
    demonym: "Paldean Form",
    form: "Aqua Breed",
    types: [
      "Fighting",
      "Water"
    ]
  },
  {
    id: "tauros-paldean-blaze-breed",
    dex: 128,
    species: "Tauros",
    demonym: "Paldean Form",
    form: "Blaze Breed",
    types: [
      "Fighting",
      "Fire"
    ]
  },
  {
    id: "tauros-paldean-combat-breed",
    dex: 128,
    species: "Tauros",
    demonym: "Paldean Form",
    form: "Combat Breed",
    types: [
      "Fighting"
    ]
  },
  {
    id: "magikarp",
    dex: 129,
    species: "Magikarp",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "gyarados",
    dex: 130,
    species: "Gyarados",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Flying"
    ]
  },
  {
    id: "lapras",
    dex: 131,
    species: "Lapras",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ice"
    ]
  },
  {
    id: "ditto",
    dex: 132,
    species: "Ditto",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "eevee",
    dex: 133,
    species: "Eevee",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "vaporeon",
    dex: 134,
    species: "Vaporeon",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "jolteon",
    dex: 135,
    species: "Jolteon",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "flareon",
    dex: 136,
    species: "Flareon",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "porygon",
    dex: 137,
    species: "Porygon",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "omanyte",
    dex: 138,
    species: "Omanyte",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Water"
    ]
  },
  {
    id: "omastar",
    dex: 139,
    species: "Omastar",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Water"
    ]
  },
  {
    id: "kabuto",
    dex: 140,
    species: "Kabuto",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Water"
    ]
  },
  {
    id: "kabutops",
    dex: 141,
    species: "Kabutops",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Water"
    ]
  },
  {
    id: "aerodactyl",
    dex: 142,
    species: "Aerodactyl",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "snorlax",
    dex: 143,
    species: "Snorlax",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "articuno-kantonian",
    dex: 144,
    species: "Articuno",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Ice",
      "Flying"
    ]
  },
  {
    id: "articuno-galarian",
    dex: 144,
    species: "Articuno",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "zapdos-kantonian",
    dex: 145,
    species: "Zapdos",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Electric",
      "Flying"
    ]
  },
  {
    id: "zapdos-galarian",
    dex: 145,
    species: "Zapdos",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Fighting",
      "Flying"
    ]
  },
  {
    id: "moltres-kantonian",
    dex: 146,
    species: "Moltres",
    demonym: "Kantonian Form",
    form: null,
    types: [
      "Fire",
      "Flying"
    ]
  },
  {
    id: "moltres-galarian",
    dex: 146,
    species: "Moltres",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Dark",
      "Flying"
    ]
  },
  {
    id: "dratini",
    dex: 147,
    species: "Dratini",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "dragonair",
    dex: 148,
    species: "Dragonair",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "dragonite",
    dex: 149,
    species: "Dragonite",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Flying"
    ]
  },
  {
    id: "mewtwo",
    dex: 150,
    species: "Mewtwo",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "mew",
    dex: 151,
    species: "Mew",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "chikorita",
    dex: 152,
    species: "Chikorita",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "bayleef",
    dex: 153,
    species: "Bayleef",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "meganium",
    dex: 154,
    species: "Meganium",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "cyndaquil",
    dex: 155,
    species: "Cyndaquil",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "quilava",
    dex: 156,
    species: "Quilava",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "typhlosion-johtonian",
    dex: 157,
    species: "Typhlosion",
    demonym: "Johtonian Form",
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "typhlosion-hisuian",
    dex: 157,
    species: "Typhlosion",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Fire",
      "Ghost"
    ]
  },
  {
    id: "totodile",
    dex: 158,
    species: "Totodile",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "croconaw",
    dex: 159,
    species: "Croconaw",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "feraligatr",
    dex: 160,
    species: "Feraligatr",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "sentret",
    dex: 161,
    species: "Sentret",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "furret",
    dex: 162,
    species: "Furret",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "hoothoot",
    dex: 163,
    species: "Hoothoot",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "noctowl",
    dex: 164,
    species: "Noctowl",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "ledyba",
    dex: 165,
    species: "Ledyba",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "ledian",
    dex: 166,
    species: "Ledian",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "spinarak",
    dex: 167,
    species: "Spinarak",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "ariados",
    dex: 168,
    species: "Ariados",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "crobat",
    dex: 169,
    species: "Crobat",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Flying"
    ]
  },
  {
    id: "chinchou",
    dex: 170,
    species: "Chinchou",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Electric"
    ]
  },
  {
    id: "lanturn",
    dex: 171,
    species: "Lanturn",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Electric"
    ]
  },
  {
    id: "pichu",
    dex: 172,
    species: "Pichu",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "cleffa",
    dex: 173,
    species: "Cleffa",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "igglybuff",
    dex: 174,
    species: "Igglybuff",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Fairy"
    ]
  },
  {
    id: "togepi",
    dex: 175,
    species: "Togepi",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "togetic",
    dex: 176,
    species: "Togetic",
    demonym: null,
    form: null,
    types: [
      "Fairy",
      "Flying"
    ]
  },
  {
    id: "natu",
    dex: 177,
    species: "Natu",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "xatu",
    dex: 178,
    species: "Xatu",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "mareep",
    dex: 179,
    species: "Mareep",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "flaaffy",
    dex: 180,
    species: "Flaaffy",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "ampharos",
    dex: 181,
    species: "Ampharos",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "bellossom",
    dex: 182,
    species: "Bellossom",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "marill",
    dex: 183,
    species: "Marill",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Fairy"
    ]
  },
  {
    id: "azumarill",
    dex: 184,
    species: "Azumarill",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Fairy"
    ]
  },
  {
    id: "sudowoodo",
    dex: 185,
    species: "Sudowoodo",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "politoed",
    dex: 186,
    species: "Politoed",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "hoppip",
    dex: 187,
    species: "Hoppip",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Flying"
    ]
  },
  {
    id: "skiploom",
    dex: 188,
    species: "Skiploom",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Flying"
    ]
  },
  {
    id: "jumpluff",
    dex: 189,
    species: "Jumpluff",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Flying"
    ]
  },
  {
    id: "aipom",
    dex: 190,
    species: "Aipom",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "sunkern",
    dex: 191,
    species: "Sunkern",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "sunflora",
    dex: 192,
    species: "Sunflora",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "yanma",
    dex: 193,
    species: "Yanma",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "wooper-johtonian",
    dex: 194,
    species: "Wooper",
    demonym: "Johtonian Form",
    form: null,
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "wooper-paldean",
    dex: 194,
    species: "Wooper",
    demonym: "Paldean Form",
    form: null,
    types: [
      "Poison",
      "Ground"
    ]
  },
  {
    id: "quagsire",
    dex: 195,
    species: "Quagsire",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "espeon",
    dex: 196,
    species: "Espeon",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "umbreon",
    dex: 197,
    species: "Umbreon",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "murkrow",
    dex: 198,
    species: "Murkrow",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Flying"
    ]
  },
  {
    id: "slowking-johtonian",
    dex: 199,
    species: "Slowking",
    demonym: "Johtonian Form",
    form: null,
    types: [
      "Water",
      "Psychic"
    ]
  },
  {
    id: "slowking-galarian",
    dex: 199,
    species: "Slowking",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Poison",
      "Psychic"
    ]
  },
  {
    id: "misdreavus",
    dex: 200,
    species: "Misdreavus",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "unown-one",
    dex: 201,
    species: "Unown",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "wobbuffet",
    dex: 202,
    species: "Wobbuffet",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "girafarig",
    dex: 203,
    species: "Girafarig",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Psychic"
    ]
  },
  {
    id: "pineco",
    dex: 204,
    species: "Pineco",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "forretress",
    dex: 205,
    species: "Forretress",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Steel"
    ]
  },
  {
    id: "dunsparce",
    dex: 206,
    species: "Dunsparce",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "gligar",
    dex: 207,
    species: "Gligar",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Flying"
    ]
  },
  {
    id: "steelix",
    dex: 208,
    species: "Steelix",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Ground"
    ]
  },
  {
    id: "snubbull",
    dex: 209,
    species: "Snubbull",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "granbull",
    dex: 210,
    species: "Granbull",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "qwilfish-johtonian",
    dex: 211,
    species: "Qwilfish",
    demonym: "Johtonian Form",
    form: null,
    types: [
      "Water",
      "Poison"
    ]
  },
  {
    id: "qwilfish-hisuian",
    dex: 211,
    species: "Qwilfish",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Dark",
      "Poison"
    ]
  },
  {
    id: "scizor",
    dex: 212,
    species: "Scizor",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Steel"
    ]
  },
  {
    id: "shuckle",
    dex: 213,
    species: "Shuckle",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Rock"
    ]
  },
  {
    id: "heracross",
    dex: 214,
    species: "Heracross",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Fighting"
    ]
  },
  {
    id: "sneasel-johtonian",
    dex: 215,
    species: "Sneasel",
    demonym: "Johtonian Form",
    form: null,
    types: [
      "Dark",
      "Ice"
    ]
  },
  {
    id: "sneasel-hisuian",
    dex: 215,
    species: "Sneasel",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Fighting",
      "Poison"
    ]
  },
  {
    id: "teddiursa",
    dex: 216,
    species: "Teddiursa",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "ursaring",
    dex: 217,
    species: "Ursaring",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "slugma",
    dex: 218,
    species: "Slugma",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "magcargo",
    dex: 219,
    species: "Magcargo",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Rock"
    ]
  },
  {
    id: "swinub",
    dex: 220,
    species: "Swinub",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Ground"
    ]
  },
  {
    id: "piloswine",
    dex: 221,
    species: "Piloswine",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Ground"
    ]
  },
  {
    id: "corsola-johtonian",
    dex: 222,
    species: "Corsola",
    demonym: "Johtonian Form",
    form: null,
    types: [
      "Water",
      "Rock"
    ]
  },
  {
    id: "corsola-galarian",
    dex: 222,
    species: "Corsola",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "remoraid",
    dex: 223,
    species: "Remoraid",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "octillery",
    dex: 224,
    species: "Octillery",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "delibird",
    dex: 225,
    species: "Delibird",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Flying"
    ]
  },
  {
    id: "mantine",
    dex: 226,
    species: "Mantine",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Flying"
    ]
  },
  {
    id: "skarmory",
    dex: 227,
    species: "Skarmory",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Flying"
    ]
  },
  {
    id: "houndour",
    dex: 228,
    species: "Houndour",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Fire"
    ]
  },
  {
    id: "houndoom",
    dex: 229,
    species: "Houndoom",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Fire"
    ]
  },
  {
    id: "kingdra",
    dex: 230,
    species: "Kingdra",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Dragon"
    ]
  },
  {
    id: "phanpy",
    dex: 231,
    species: "Phanpy",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "donphan",
    dex: 232,
    species: "Donphan",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "porygon2",
    dex: 233,
    species: "Porygon2",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "stantler",
    dex: 234,
    species: "Stantler",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "smeargle",
    dex: 235,
    species: "Smeargle",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "tyrogue",
    dex: 236,
    species: "Tyrogue",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "hitmontop",
    dex: 237,
    species: "Hitmontop",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "smoochum",
    dex: 238,
    species: "Smoochum",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Psychic"
    ]
  },
  {
    id: "elekid",
    dex: 239,
    species: "Elekid",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "magby",
    dex: 240,
    species: "Magby",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "miltank",
    dex: 241,
    species: "Miltank",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "blissey",
    dex: 242,
    species: "Blissey",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "raikou",
    dex: 243,
    species: "Raikou",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "entei",
    dex: 244,
    species: "Entei",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "suicune",
    dex: 245,
    species: "Suicune",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "larvitar",
    dex: 246,
    species: "Larvitar",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Ground"
    ]
  },
  {
    id: "pupitar",
    dex: 247,
    species: "Pupitar",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Ground"
    ]
  },
  {
    id: "tyranitar",
    dex: 248,
    species: "Tyranitar",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Dark"
    ]
  },
  {
    id: "lugia",
    dex: 249,
    species: "Lugia",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "ho-oh",
    dex: 250,
    species: "Ho-Oh",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Flying"
    ]
  },
  {
    id: "celebi",
    dex: 251,
    species: "Celebi",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Grass"
    ]
  },
  {
    id: "treecko",
    dex: 252,
    species: "Treecko",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "grovyle",
    dex: 253,
    species: "Grovyle",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "sceptile",
    dex: 254,
    species: "Sceptile",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "torchic",
    dex: 255,
    species: "Torchic",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "combusken",
    dex: 256,
    species: "Combusken",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Fighting"
    ]
  },
  {
    id: "blaziken",
    dex: 257,
    species: "Blaziken",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Fighting"
    ]
  },
  {
    id: "mudkip",
    dex: 258,
    species: "Mudkip",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "marshtomp",
    dex: 259,
    species: "Marshtomp",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "swampert",
    dex: 260,
    species: "Swampert",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "poochyena",
    dex: 261,
    species: "Poochyena",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "mightyena",
    dex: 262,
    species: "Mightyena",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "zigzagoon-hoennian",
    dex: 263,
    species: "Zigzagoon",
    demonym: "Hoennian Form",
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "zigzagoon-galarian",
    dex: 263,
    species: "Zigzagoon",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Dark",
      "Normal"
    ]
  },
  {
    id: "linoone-hoennian",
    dex: 264,
    species: "Linoone",
    demonym: "Hoennian Form",
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "linoone-galarian",
    dex: 264,
    species: "Linoone",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Dark",
      "Normal"
    ]
  },
  {
    id: "wurmple",
    dex: 265,
    species: "Wurmple",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "silcoon",
    dex: 266,
    species: "Silcoon",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "beautifly",
    dex: 267,
    species: "Beautifly",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "cascoon",
    dex: 268,
    species: "Cascoon",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "dustox",
    dex: 269,
    species: "Dustox",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "lotad",
    dex: 270,
    species: "Lotad",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Grass"
    ]
  },
  {
    id: "lombre",
    dex: 271,
    species: "Lombre",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Grass"
    ]
  },
  {
    id: "ludicolo",
    dex: 272,
    species: "Ludicolo",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Grass"
    ]
  },
  {
    id: "seedot",
    dex: 273,
    species: "Seedot",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "nuzleaf",
    dex: 274,
    species: "Nuzleaf",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dark"
    ]
  },
  {
    id: "shiftry",
    dex: 275,
    species: "Shiftry",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dark"
    ]
  },
  {
    id: "taillow",
    dex: 276,
    species: "Taillow",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "swellow",
    dex: 277,
    species: "Swellow",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "wingull",
    dex: 278,
    species: "Wingull",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Flying"
    ]
  },
  {
    id: "pelipper",
    dex: 279,
    species: "Pelipper",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Flying"
    ]
  },
  {
    id: "ralts",
    dex: 280,
    species: "Ralts",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Fairy"
    ]
  },
  {
    id: "kirlia",
    dex: 281,
    species: "Kirlia",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Fairy"
    ]
  },
  {
    id: "gardevoir",
    dex: 282,
    species: "Gardevoir",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Fairy"
    ]
  },
  {
    id: "surskit",
    dex: 283,
    species: "Surskit",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Water"
    ]
  },
  {
    id: "masquerain",
    dex: 284,
    species: "Masquerain",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "shroomish",
    dex: 285,
    species: "Shroomish",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "breloom",
    dex: 286,
    species: "Breloom",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fighting"
    ]
  },
  {
    id: "slakoth",
    dex: 287,
    species: "Slakoth",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "vigoroth",
    dex: 288,
    species: "Vigoroth",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "slaking",
    dex: 289,
    species: "Slaking",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "nincada",
    dex: 290,
    species: "Nincada",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Ground"
    ]
  },
  {
    id: "ninjask",
    dex: 291,
    species: "Ninjask",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "shedinja",
    dex: 292,
    species: "Shedinja",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Ghost"
    ]
  },
  {
    id: "whismur",
    dex: 293,
    species: "Whismur",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "loudred",
    dex: 294,
    species: "Loudred",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "exploud",
    dex: 295,
    species: "Exploud",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "makuhita",
    dex: 296,
    species: "Makuhita",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "hariyama",
    dex: 297,
    species: "Hariyama",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "azurill",
    dex: 298,
    species: "Azurill",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Fairy"
    ]
  },
  {
    id: "nosepass",
    dex: 299,
    species: "Nosepass",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "skitty",
    dex: 300,
    species: "Skitty",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "delcatty",
    dex: 301,
    species: "Delcatty",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "sableye",
    dex: 302,
    species: "Sableye",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Ghost"
    ]
  },
  {
    id: "mawile",
    dex: 303,
    species: "Mawile",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Fairy"
    ]
  },
  {
    id: "aron",
    dex: 304,
    species: "Aron",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Rock"
    ]
  },
  {
    id: "lairon",
    dex: 305,
    species: "Lairon",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Rock"
    ]
  },
  {
    id: "aggron",
    dex: 306,
    species: "Aggron",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Rock"
    ]
  },
  {
    id: "meditite",
    dex: 307,
    species: "Meditite",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Psychic"
    ]
  },
  {
    id: "medicham",
    dex: 308,
    species: "Medicham",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Psychic"
    ]
  },
  {
    id: "electrike",
    dex: 309,
    species: "Electrike",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "manectric",
    dex: 310,
    species: "Manectric",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "plusle",
    dex: 311,
    species: "Plusle",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "minun",
    dex: 312,
    species: "Minun",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "volbeat",
    dex: 313,
    species: "Volbeat",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "illumise",
    dex: 314,
    species: "Illumise",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "roselia",
    dex: 315,
    species: "Roselia",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "gulpin",
    dex: 316,
    species: "Gulpin",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "swalot",
    dex: 317,
    species: "Swalot",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "carvanha",
    dex: 318,
    species: "Carvanha",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Dark"
    ]
  },
  {
    id: "sharpedo",
    dex: 319,
    species: "Sharpedo",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Dark"
    ]
  },
  {
    id: "wailmer",
    dex: 320,
    species: "Wailmer",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "wailord",
    dex: 321,
    species: "Wailord",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "numel",
    dex: 322,
    species: "Numel",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Ground"
    ]
  },
  {
    id: "camerupt",
    dex: 323,
    species: "Camerupt",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Ground"
    ]
  },
  {
    id: "torkoal",
    dex: 324,
    species: "Torkoal",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "spoink",
    dex: 325,
    species: "Spoink",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "grumpig",
    dex: 326,
    species: "Grumpig",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "spinda",
    dex: 327,
    species: "Spinda",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "trapinch",
    dex: 328,
    species: "Trapinch",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "vibrava",
    dex: 329,
    species: "Vibrava",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Dragon"
    ]
  },
  {
    id: "flygon",
    dex: 330,
    species: "Flygon",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Dragon"
    ]
  },
  {
    id: "cacnea",
    dex: 331,
    species: "Cacnea",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "cacturne",
    dex: 332,
    species: "Cacturne",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dark"
    ]
  },
  {
    id: "swablu",
    dex: 333,
    species: "Swablu",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "altaria",
    dex: 334,
    species: "Altaria",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Flying"
    ]
  },
  {
    id: "zangoose",
    dex: 335,
    species: "Zangoose",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "seviper",
    dex: 336,
    species: "Seviper",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "lunatone",
    dex: 337,
    species: "Lunatone",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Psychic"
    ]
  },
  {
    id: "solrock",
    dex: 338,
    species: "Solrock",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Psychic"
    ]
  },
  {
    id: "barboach",
    dex: 339,
    species: "Barboach",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "whiscash",
    dex: 340,
    species: "Whiscash",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "corphish",
    dex: 341,
    species: "Corphish",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "crawdaunt",
    dex: 342,
    species: "Crawdaunt",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Dark"
    ]
  },
  {
    id: "baltoy",
    dex: 343,
    species: "Baltoy",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Psychic"
    ]
  },
  {
    id: "claydol",
    dex: 344,
    species: "Claydol",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Psychic"
    ]
  },
  {
    id: "lileep",
    dex: 345,
    species: "Lileep",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Grass"
    ]
  },
  {
    id: "cradily",
    dex: 346,
    species: "Cradily",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Grass"
    ]
  },
  {
    id: "anorith",
    dex: 347,
    species: "Anorith",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Bug"
    ]
  },
  {
    id: "armaldo",
    dex: 348,
    species: "Armaldo",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Bug"
    ]
  },
  {
    id: "feebas",
    dex: 349,
    species: "Feebas",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "milotic",
    dex: 350,
    species: "Milotic",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "castform",
    dex: 351,
    species: "Castform",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "castform-rainy",
    dex: 351,
    species: "Castform",
    demonym: null,
    form: "Rainy Form",
    types: [
      "Water"
    ]
  },
  {
    id: "castform-snowy",
    dex: 351,
    species: "Castform",
    demonym: null,
    form: "Snowy Form",
    types: [
      "Ice"
    ]
  },
  {
    id: "castform-sunny",
    dex: 351,
    species: "Castform",
    demonym: null,
    form: "Sunny Form",
    types: [
      "Fire"
    ]
  },
  {
    id: "kecleon",
    dex: 352,
    species: "Kecleon",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "shuppet",
    dex: 353,
    species: "Shuppet",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "banette",
    dex: 354,
    species: "Banette",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "duskull",
    dex: 355,
    species: "Duskull",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "dusclops",
    dex: 356,
    species: "Dusclops",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "tropius",
    dex: 357,
    species: "Tropius",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Flying"
    ]
  },
  {
    id: "chimecho",
    dex: 358,
    species: "Chimecho",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "absol",
    dex: 359,
    species: "Absol",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "wynaut",
    dex: 360,
    species: "Wynaut",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "snorunt",
    dex: 361,
    species: "Snorunt",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "glalie",
    dex: 362,
    species: "Glalie",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "spheal",
    dex: 363,
    species: "Spheal",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Water"
    ]
  },
  {
    id: "sealeo",
    dex: 364,
    species: "Sealeo",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Water"
    ]
  },
  {
    id: "walrein",
    dex: 365,
    species: "Walrein",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Water"
    ]
  },
  {
    id: "clamperl",
    dex: 366,
    species: "Clamperl",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "huntail",
    dex: 367,
    species: "Huntail",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "gorebyss",
    dex: 368,
    species: "Gorebyss",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "relicanth",
    dex: 369,
    species: "Relicanth",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Rock"
    ]
  },
  {
    id: "luvdisc",
    dex: 370,
    species: "Luvdisc",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "bagon",
    dex: 371,
    species: "Bagon",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "shelgon",
    dex: 372,
    species: "Shelgon",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "salamence",
    dex: 373,
    species: "Salamence",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Flying"
    ]
  },
  {
    id: "beldum",
    dex: 374,
    species: "Beldum",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Psychic"
    ]
  },
  {
    id: "metang",
    dex: 375,
    species: "Metang",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Psychic"
    ]
  },
  {
    id: "metagross",
    dex: 376,
    species: "Metagross",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Psychic"
    ]
  },
  {
    id: "regirock",
    dex: 377,
    species: "Regirock",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "regice",
    dex: 378,
    species: "Regice",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "registeel",
    dex: 379,
    species: "Registeel",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "latias",
    dex: 380,
    species: "Latias",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Psychic"
    ]
  },
  {
    id: "latios",
    dex: 381,
    species: "Latios",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Psychic"
    ]
  },
  {
    id: "kyogre",
    dex: 382,
    species: "Kyogre",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "groudon",
    dex: 383,
    species: "Groudon",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "rayquaza",
    dex: 384,
    species: "Rayquaza",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Flying"
    ]
  },
  {
    id: "jirachi",
    dex: 385,
    species: "Jirachi",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Psychic"
    ]
  },
  {
    id: "deoxys-normal",
    dex: 386,
    species: "Deoxys",
    demonym: null,
    form: "Normal Forme",
    types: [
      "Psychic"
    ]
  },
  {
    id: "deoxys-attack",
    dex: 386,
    species: "Deoxys",
    demonym: null,
    form: "Attack Forme",
    types: [
      "Psychic"
    ]
  },
  {
    id: "deoxys-defense",
    dex: 386,
    species: "Deoxys",
    demonym: null,
    form: "Defense Forme",
    types: [
      "Psychic"
    ]
  },
  {
    id: "deoxys-speed",
    dex: 386,
    species: "Deoxys",
    demonym: null,
    form: "Speed Forme",
    types: [
      "Psychic"
    ]
  },
  {
    id: "turtwig",
    dex: 387,
    species: "Turtwig",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "grotle",
    dex: 388,
    species: "Grotle",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "torterra",
    dex: 389,
    species: "Torterra",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Ground"
    ]
  },
  {
    id: "chimchar",
    dex: 390,
    species: "Chimchar",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "monferno",
    dex: 391,
    species: "Monferno",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Fighting"
    ]
  },
  {
    id: "infernape",
    dex: 392,
    species: "Infernape",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Fighting"
    ]
  },
  {
    id: "piplup",
    dex: 393,
    species: "Piplup",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "prinplup",
    dex: 394,
    species: "Prinplup",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "empoleon",
    dex: 395,
    species: "Empoleon",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Steel"
    ]
  },
  {
    id: "starly",
    dex: 396,
    species: "Starly",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "staravia",
    dex: 397,
    species: "Staravia",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "staraptor",
    dex: 398,
    species: "Staraptor",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "bidoof",
    dex: 399,
    species: "Bidoof",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "bibarel",
    dex: 400,
    species: "Bibarel",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Water"
    ]
  },
  {
    id: "kricketot",
    dex: 401,
    species: "Kricketot",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "kricketune",
    dex: 402,
    species: "Kricketune",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "shinx",
    dex: 403,
    species: "Shinx",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "luxio",
    dex: 404,
    species: "Luxio",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "luxray",
    dex: 405,
    species: "Luxray",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "budew",
    dex: 406,
    species: "Budew",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "roserade",
    dex: 407,
    species: "Roserade",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "cranidos",
    dex: 408,
    species: "Cranidos",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "rampardos",
    dex: 409,
    species: "Rampardos",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "shieldon",
    dex: 410,
    species: "Shieldon",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Steel"
    ]
  },
  {
    id: "bastiodon",
    dex: 411,
    species: "Bastiodon",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Steel"
    ]
  },
  {
    id: "burmy-plant",
    dex: 412,
    species: "Burmy",
    demonym: null,
    form: "Plant Cloak",
    types: [
      "Bug"
    ]
  },
  {
    id: "burmy-sandy",
    dex: 412,
    species: "Burmy",
    demonym: null,
    form: "Sandy Cloak",
    types: [
      "Bug"
    ]
  },
  {
    id: "burmy-trash",
    dex: 412,
    species: "Burmy",
    demonym: null,
    form: "Trash Cloak",
    types: [
      "Bug"
    ]
  },
  {
    id: "wormadam-plant",
    dex: 413,
    species: "Wormadam",
    demonym: null,
    form: "Plant Cloak",
    types: [
      "Bug",
      "Grass"
    ]
  },
  {
    id: "wormadam-sandy",
    dex: 413,
    species: "Wormadam",
    demonym: null,
    form: "Sandy Cloak",
    types: [
      "Bug",
      "Ground"
    ]
  },
  {
    id: "wormadam-trash",
    dex: 413,
    species: "Wormadam",
    demonym: null,
    form: "Trash Cloak",
    types: [
      "Bug",
      "Steel"
    ]
  },
  {
    id: "mothim",
    dex: 414,
    species: "Mothim",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "combee",
    dex: 415,
    species: "Combee",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "vespiquen",
    dex: 416,
    species: "Vespiquen",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "pachirisu",
    dex: 417,
    species: "Pachirisu",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "buizel",
    dex: 418,
    species: "Buizel",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "floatzel",
    dex: 419,
    species: "Floatzel",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "cherubi",
    dex: 420,
    species: "Cherubi",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "cherrim",
    dex: 421,
    species: "Cherrim",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "shellos-east-sea",
    dex: 422,
    species: "Shellos",
    demonym: null,
    form: "East Sea",
    types: [
      "Water"
    ]
  },
  {
    id: "shellos-west-sea",
    dex: 422,
    species: "Shellos",
    demonym: null,
    form: "West Sea",
    types: [
      "Water"
    ]
  },
  {
    id: "gastrodon-east-sea",
    dex: 423,
    species: "Gastrodon",
    demonym: null,
    form: "East Sea",
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "gastrodon-west-sea",
    dex: 423,
    species: "Gastrodon",
    demonym: null,
    form: "West Sea",
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "ambipom",
    dex: 424,
    species: "Ambipom",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "drifloon",
    dex: 425,
    species: "Drifloon",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Flying"
    ]
  },
  {
    id: "drifblim",
    dex: 426,
    species: "Drifblim",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Flying"
    ]
  },
  {
    id: "buneary",
    dex: 427,
    species: "Buneary",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "lopunny",
    dex: 428,
    species: "Lopunny",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "mismagius",
    dex: 429,
    species: "Mismagius",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "honchkrow",
    dex: 430,
    species: "Honchkrow",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Flying"
    ]
  },
  {
    id: "glameow",
    dex: 431,
    species: "Glameow",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "purugly",
    dex: 432,
    species: "Purugly",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "chingling",
    dex: 433,
    species: "Chingling",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "stunky",
    dex: 434,
    species: "Stunky",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Dark"
    ]
  },
  {
    id: "skuntank",
    dex: 435,
    species: "Skuntank",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Dark"
    ]
  },
  {
    id: "bronzor",
    dex: 436,
    species: "Bronzor",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Psychic"
    ]
  },
  {
    id: "bronzong",
    dex: 437,
    species: "Bronzong",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Psychic"
    ]
  },
  {
    id: "bonsly",
    dex: 438,
    species: "Bonsly",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "mime-jr",
    dex: 439,
    species: "Mime Jr.",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Fairy"
    ]
  },
  {
    id: "happiny",
    dex: 440,
    species: "Happiny",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "chatot",
    dex: 441,
    species: "Chatot",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "spiritomb",
    dex: 442,
    species: "Spiritomb",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Dark"
    ]
  },
  {
    id: "gible",
    dex: 443,
    species: "Gible",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ground"
    ]
  },
  {
    id: "gabite",
    dex: 444,
    species: "Gabite",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ground"
    ]
  },
  {
    id: "garchomp",
    dex: 445,
    species: "Garchomp",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ground"
    ]
  },
  {
    id: "munchlax",
    dex: 446,
    species: "Munchlax",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "riolu",
    dex: 447,
    species: "Riolu",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "lucario",
    dex: 448,
    species: "Lucario",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Steel"
    ]
  },
  {
    id: "hippopotas",
    dex: 449,
    species: "Hippopotas",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "hippowdon",
    dex: 450,
    species: "Hippowdon",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "skorupi",
    dex: 451,
    species: "Skorupi",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Bug"
    ]
  },
  {
    id: "drapion",
    dex: 452,
    species: "Drapion",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Dark"
    ]
  },
  {
    id: "croagunk",
    dex: 453,
    species: "Croagunk",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Fighting"
    ]
  },
  {
    id: "toxicroak",
    dex: 454,
    species: "Toxicroak",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Fighting"
    ]
  },
  {
    id: "carnivine",
    dex: 455,
    species: "Carnivine",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "finneon",
    dex: 456,
    species: "Finneon",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "lumineon",
    dex: 457,
    species: "Lumineon",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "mantyke",
    dex: 458,
    species: "Mantyke",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Flying"
    ]
  },
  {
    id: "snover",
    dex: 459,
    species: "Snover",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Ice"
    ]
  },
  {
    id: "abomasnow",
    dex: 460,
    species: "Abomasnow",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Ice"
    ]
  },
  {
    id: "weavile",
    dex: 461,
    species: "Weavile",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Ice"
    ]
  },
  {
    id: "magnezone",
    dex: 462,
    species: "Magnezone",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Steel"
    ]
  },
  {
    id: "lickilicky",
    dex: 463,
    species: "Lickilicky",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "rhyperior",
    dex: 464,
    species: "Rhyperior",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Rock"
    ]
  },
  {
    id: "tangrowth",
    dex: 465,
    species: "Tangrowth",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "electivire",
    dex: 466,
    species: "Electivire",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "magmortar",
    dex: 467,
    species: "Magmortar",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "togekiss",
    dex: 468,
    species: "Togekiss",
    demonym: null,
    form: null,
    types: [
      "Fairy",
      "Flying"
    ]
  },
  {
    id: "yanmega",
    dex: 469,
    species: "Yanmega",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "leafeon",
    dex: 470,
    species: "Leafeon",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "glaceon",
    dex: 471,
    species: "Glaceon",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "gliscor",
    dex: 472,
    species: "Gliscor",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Flying"
    ]
  },
  {
    id: "mamoswine",
    dex: 473,
    species: "Mamoswine",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Ground"
    ]
  },
  {
    id: "porygon-z",
    dex: 474,
    species: "Porygon-Z",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "gallade",
    dex: 475,
    species: "Gallade",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Fighting"
    ]
  },
  {
    id: "probopass",
    dex: 476,
    species: "Probopass",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Steel"
    ]
  },
  {
    id: "dusknoir",
    dex: 477,
    species: "Dusknoir",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "froslass",
    dex: 478,
    species: "Froslass",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Ghost"
    ]
  },
  {
    id: "rotom",
    dex: 479,
    species: "Rotom",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Ghost"
    ]
  },
  {
    id: "rotom-fan",
    dex: 479,
    species: "Rotom",
    demonym: null,
    form: "Fan",
    types: [
      "Electric",
      "Flying"
    ]
  },
  {
    id: "rotom-frost",
    dex: 479,
    species: "Rotom",
    demonym: null,
    form: "Frost",
    types: [
      "Electric",
      "Ice"
    ]
  },
  {
    id: "rotom-heat",
    dex: 479,
    species: "Rotom",
    demonym: null,
    form: "Heat",
    types: [
      "Electric",
      "Fire"
    ]
  },
  {
    id: "rotom-mow",
    dex: 479,
    species: "Rotom",
    demonym: null,
    form: "Mow",
    types: [
      "Electric",
      "Grass"
    ]
  },
  {
    id: "rotom-wash",
    dex: 479,
    species: "Rotom",
    demonym: null,
    form: "Wash",
    types: [
      "Electric",
      "Water"
    ]
  },
  {
    id: "uxie",
    dex: 480,
    species: "Uxie",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "mesprit",
    dex: 481,
    species: "Mesprit",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "azelf",
    dex: 482,
    species: "Azelf",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "dialga",
    dex: 483,
    species: "Dialga",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Dragon"
    ]
  },
  {
    id: "dialga-origin",
    dex: 483,
    species: "Dialga",
    demonym: null,
    form: "Origin Forme",
    types: [
      "Steel",
      "Dragon"
    ]
  },
  {
    id: "palkia",
    dex: 484,
    species: "Palkia",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Dragon"
    ]
  },
  {
    id: "palkia-origin",
    dex: 484,
    species: "Palkia",
    demonym: null,
    form: "Origin Forme",
    types: [
      "Water",
      "Dragon"
    ]
  },
  {
    id: "heatran",
    dex: 485,
    species: "Heatran",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Steel"
    ]
  },
  {
    id: "regigigas",
    dex: 486,
    species: "Regigigas",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "giratina-altered",
    dex: 487,
    species: "Giratina",
    demonym: null,
    form: "Altered Forme",
    types: [
      "Ghost",
      "Dragon"
    ]
  },
  {
    id: "giratina-origin",
    dex: 487,
    species: "Giratina",
    demonym: null,
    form: "Origin Forme",
    types: [
      "Ghost",
      "Dragon"
    ]
  },
  {
    id: "cresselia",
    dex: 488,
    species: "Cresselia",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "phione",
    dex: 489,
    species: "Phione",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "manaphy",
    dex: 490,
    species: "Manaphy",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "darkrai",
    dex: 491,
    species: "Darkrai",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "shaymin-land",
    dex: 492,
    species: "Shaymin",
    demonym: null,
    form: "Land Forme",
    types: [
      "Grass"
    ]
  },
  {
    id: "shaymin-sky",
    dex: 492,
    species: "Shaymin",
    demonym: null,
    form: "Sky Forme",
    types: [
      "Grass",
      "Flying"
    ]
  },
  {
    id: "arceus",
    dex: 493,
    species: "Arceus",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "victini",
    dex: 494,
    species: "Victini",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Fire"
    ]
  },
  {
    id: "snivy",
    dex: 495,
    species: "Snivy",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "servine",
    dex: 496,
    species: "Servine",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "serperior",
    dex: 497,
    species: "Serperior",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "tepig",
    dex: 498,
    species: "Tepig",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "pignite",
    dex: 499,
    species: "Pignite",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Fighting"
    ]
  },
  {
    id: "emboar",
    dex: 500,
    species: "Emboar",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Fighting"
    ]
  },
  {
    id: "oshawott",
    dex: 501,
    species: "Oshawott",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "dewott",
    dex: 502,
    species: "Dewott",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "samurott-unovan",
    dex: 503,
    species: "Samurott",
    demonym: "Unovan Form",
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "samurott-hisuian",
    dex: 503,
    species: "Samurott",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Water",
      "Dark"
    ]
  },
  {
    id: "patrat",
    dex: 504,
    species: "Patrat",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "watchog",
    dex: 505,
    species: "Watchog",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "lillipup",
    dex: 506,
    species: "Lillipup",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "herdier",
    dex: 507,
    species: "Herdier",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "stoutland",
    dex: 508,
    species: "Stoutland",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "purrloin",
    dex: 509,
    species: "Purrloin",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "liepard",
    dex: 510,
    species: "Liepard",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "pansage",
    dex: 511,
    species: "Pansage",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "simisage",
    dex: 512,
    species: "Simisage",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "pansear",
    dex: 513,
    species: "Pansear",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "simisear",
    dex: 514,
    species: "Simisear",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "panpour",
    dex: 515,
    species: "Panpour",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "simipour",
    dex: 516,
    species: "Simipour",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "munna",
    dex: 517,
    species: "Munna",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "musharna",
    dex: 518,
    species: "Musharna",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "pidove",
    dex: 519,
    species: "Pidove",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "tranquill",
    dex: 520,
    species: "Tranquill",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "unfezant",
    dex: 521,
    species: "Unfezant",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "blitzle",
    dex: 522,
    species: "Blitzle",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "zebstrika",
    dex: 523,
    species: "Zebstrika",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "roggenrola",
    dex: 524,
    species: "Roggenrola",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "boldore",
    dex: 525,
    species: "Boldore",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "gigalith",
    dex: 526,
    species: "Gigalith",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "woobat",
    dex: 527,
    species: "Woobat",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "swoobat",
    dex: 528,
    species: "Swoobat",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "drilbur",
    dex: 529,
    species: "Drilbur",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "excadrill",
    dex: 530,
    species: "Excadrill",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Steel"
    ]
  },
  {
    id: "audino",
    dex: 531,
    species: "Audino",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "timburr",
    dex: 532,
    species: "Timburr",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "gurdurr",
    dex: 533,
    species: "Gurdurr",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "conkeldurr",
    dex: 534,
    species: "Conkeldurr",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "tympole",
    dex: 535,
    species: "Tympole",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "palpitoad",
    dex: 536,
    species: "Palpitoad",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "seismitoad",
    dex: 537,
    species: "Seismitoad",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ground"
    ]
  },
  {
    id: "throh",
    dex: 538,
    species: "Throh",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "sawk",
    dex: 539,
    species: "Sawk",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "sewaddle",
    dex: 540,
    species: "Sewaddle",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Grass"
    ]
  },
  {
    id: "swadloon",
    dex: 541,
    species: "Swadloon",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Grass"
    ]
  },
  {
    id: "leavanny",
    dex: 542,
    species: "Leavanny",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Grass"
    ]
  },
  {
    id: "venipede",
    dex: 543,
    species: "Venipede",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "whirlipede",
    dex: 544,
    species: "Whirlipede",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "scolipede",
    dex: 545,
    species: "Scolipede",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Poison"
    ]
  },
  {
    id: "cottonee",
    dex: 546,
    species: "Cottonee",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fairy"
    ]
  },
  {
    id: "whimsicott",
    dex: 547,
    species: "Whimsicott",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fairy"
    ]
  },
  {
    id: "petilil",
    dex: 548,
    species: "Petilil",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "lilligant-unovan",
    dex: 549,
    species: "Lilligant",
    demonym: "Unovan Form",
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "lilligant-hisuian",
    dex: 549,
    species: "Lilligant",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Grass",
      "Fighting"
    ]
  },
  {
    id: "basculin-blue-striped",
    dex: 550,
    species: "Basculin",
    demonym: null,
    form: "Blue-Striped Form",
    types: [
      "Water"
    ]
  },
  {
    id: "basculin-red-striped",
    dex: 550,
    species: "Basculin",
    demonym: null,
    form: "Red-Striped Form",
    types: [
      "Water"
    ]
  },
  {
    id: "basculin-white-striped",
    dex: 550,
    species: "Basculin",
    demonym: null,
    form: "White-Striped Form",
    types: [
      "Water"
    ]
  },
  {
    id: "sandile",
    dex: 551,
    species: "Sandile",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Dark"
    ]
  },
  {
    id: "krokorok",
    dex: 552,
    species: "Krokorok",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Dark"
    ]
  },
  {
    id: "krookodile",
    dex: 553,
    species: "Krookodile",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Dark"
    ]
  },
  {
    id: "darumaka-unovan",
    dex: 554,
    species: "Darumaka",
    demonym: "Unovan Form",
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "darumaka-galarian",
    dex: 554,
    species: "Darumaka",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "darmanitan-unovan-standard",
    dex: 555,
    species: "Darmanitan",
    demonym: "Unovan Form",
    form: "Standard Mode",
    types: [
      "Fire"
    ]
  },
  {
    id: "darmanitan-unovan-zen",
    dex: 555,
    species: "Darmanitan",
    demonym: "Unovan Form",
    form: "Zen Mode",
    types: [
      "Fire",
      "Psychic"
    ]
  },
  {
    id: "darmanitan-galarian-standard",
    dex: 555,
    species: "Darmanitan",
    demonym: "Galarian Form",
    form: "Standard Mode",
    types: [
      "Ice"
    ]
  },
  {
    id: "darmanitan-galarian-zen",
    dex: 555,
    species: "Darmanitan",
    demonym: "Galarian Form",
    form: "Zen Mode",
    types: [
      "Ice",
      "Fire"
    ]
  },
  {
    id: "maractus",
    dex: 556,
    species: "Maractus",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "dwebble",
    dex: 557,
    species: "Dwebble",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Rock"
    ]
  },
  {
    id: "crustle",
    dex: 558,
    species: "Crustle",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Rock"
    ]
  },
  {
    id: "scraggy",
    dex: 559,
    species: "Scraggy",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Fighting"
    ]
  },
  {
    id: "scrafty",
    dex: 560,
    species: "Scrafty",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Fighting"
    ]
  },
  {
    id: "sigilyph",
    dex: 561,
    species: "Sigilyph",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "yamask-unovan",
    dex: 562,
    species: "Yamask",
    demonym: "Unovan Form",
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "yamask-galarian",
    dex: 562,
    species: "Yamask",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Ground",
      "Ghost"
    ]
  },
  {
    id: "cofagrigus",
    dex: 563,
    species: "Cofagrigus",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "tirtouga",
    dex: 564,
    species: "Tirtouga",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Rock"
    ]
  },
  {
    id: "carracosta",
    dex: 565,
    species: "Carracosta",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Rock"
    ]
  },
  {
    id: "archen",
    dex: 566,
    species: "Archen",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "archeops",
    dex: 567,
    species: "Archeops",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "trubbish",
    dex: 568,
    species: "Trubbish",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "garbodor",
    dex: 569,
    species: "Garbodor",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "zorua-unovan",
    dex: 570,
    species: "Zorua",
    demonym: "Unovan Form",
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "zorua-hisuian",
    dex: 570,
    species: "Zorua",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Normal",
      "Ghost"
    ]
  },
  {
    id: "zoroark-unovan",
    dex: 571,
    species: "Zoroark",
    demonym: "Unovan Form",
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "zoroark-hisuian",
    dex: 571,
    species: "Zoroark",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Normal",
      "Ghost"
    ]
  },
  {
    id: "minccino",
    dex: 572,
    species: "Minccino",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "cinccino",
    dex: 573,
    species: "Cinccino",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "gothita",
    dex: 574,
    species: "Gothita",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "gothorita",
    dex: 575,
    species: "Gothorita",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "gothitelle",
    dex: 576,
    species: "Gothitelle",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "solosis",
    dex: 577,
    species: "Solosis",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "duosion",
    dex: 578,
    species: "Duosion",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "reuniclus",
    dex: 579,
    species: "Reuniclus",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "ducklett",
    dex: 580,
    species: "Ducklett",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Flying"
    ]
  },
  {
    id: "swanna",
    dex: 581,
    species: "Swanna",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Flying"
    ]
  },
  {
    id: "vanillite",
    dex: 582,
    species: "Vanillite",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "vanillish",
    dex: 583,
    species: "Vanillish",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "vanilluxe",
    dex: 584,
    species: "Vanilluxe",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "deerling-autumn",
    dex: 585,
    species: "Deerling",
    demonym: null,
    form: "Autumn Form",
    types: [
      "Normal",
      "Grass"
    ]
  },
  {
    id: "deerling-spring",
    dex: 585,
    species: "Deerling",
    demonym: null,
    form: "Spring Form",
    types: [
      "Normal",
      "Grass"
    ]
  },
  {
    id: "deerling-summer",
    dex: 585,
    species: "Deerling",
    demonym: null,
    form: "Summer Form",
    types: [
      "Normal",
      "Grass"
    ]
  },
  {
    id: "deerling-winter",
    dex: 585,
    species: "Deerling",
    demonym: null,
    form: "Winter Form",
    types: [
      "Normal",
      "Grass"
    ]
  },
  {
    id: "sawsbuck-autumn",
    dex: 586,
    species: "Sawsbuck",
    demonym: null,
    form: "Autumn Form",
    types: [
      "Normal",
      "Grass"
    ]
  },
  {
    id: "sawsbuck-spring",
    dex: 586,
    species: "Sawsbuck",
    demonym: null,
    form: "Spring Form",
    types: [
      "Normal",
      "Grass"
    ]
  },
  {
    id: "sawsbuck-summer",
    dex: 586,
    species: "Sawsbuck",
    demonym: null,
    form: "Summer Form",
    types: [
      "Normal",
      "Grass"
    ]
  },
  {
    id: "sawsbuck-winter",
    dex: 586,
    species: "Sawsbuck",
    demonym: null,
    form: "Winter Form",
    types: [
      "Normal",
      "Grass"
    ]
  },
  {
    id: "emolga",
    dex: 587,
    species: "Emolga",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Flying"
    ]
  },
  {
    id: "karrablast",
    dex: 588,
    species: "Karrablast",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "escavalier",
    dex: 589,
    species: "Escavalier",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Steel"
    ]
  },
  {
    id: "foongus",
    dex: 590,
    species: "Foongus",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "amoonguss",
    dex: 591,
    species: "Amoonguss",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Poison"
    ]
  },
  {
    id: "frillish",
    dex: 592,
    species: "Frillish",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ghost"
    ]
  },
  {
    id: "jellicent",
    dex: 593,
    species: "Jellicent",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ghost"
    ]
  },
  {
    id: "alomomola",
    dex: 594,
    species: "Alomomola",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "joltik",
    dex: 595,
    species: "Joltik",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Electric"
    ]
  },
  {
    id: "galvantula",
    dex: 596,
    species: "Galvantula",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Electric"
    ]
  },
  {
    id: "ferroseed",
    dex: 597,
    species: "Ferroseed",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Steel"
    ]
  },
  {
    id: "ferrothorn",
    dex: 598,
    species: "Ferrothorn",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Steel"
    ]
  },
  {
    id: "klink",
    dex: 599,
    species: "Klink",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "klang",
    dex: 600,
    species: "Klang",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "klinklang",
    dex: 601,
    species: "Klinklang",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "tynamo",
    dex: 602,
    species: "Tynamo",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "eelektrik",
    dex: 603,
    species: "Eelektrik",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "eelektross",
    dex: 604,
    species: "Eelektross",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "elgyem",
    dex: 605,
    species: "Elgyem",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "beheeyem",
    dex: 606,
    species: "Beheeyem",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "litwick",
    dex: 607,
    species: "Litwick",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Fire"
    ]
  },
  {
    id: "lampent",
    dex: 608,
    species: "Lampent",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Fire"
    ]
  },
  {
    id: "chandelure",
    dex: 609,
    species: "Chandelure",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Fire"
    ]
  },
  {
    id: "axew",
    dex: 610,
    species: "Axew",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "fraxure",
    dex: 611,
    species: "Fraxure",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "haxorus",
    dex: 612,
    species: "Haxorus",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "cubchoo",
    dex: 613,
    species: "Cubchoo",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "beartic",
    dex: 614,
    species: "Beartic",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "cryogonal",
    dex: 615,
    species: "Cryogonal",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "shelmet",
    dex: 616,
    species: "Shelmet",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "accelgor",
    dex: 617,
    species: "Accelgor",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "stunfisk-unovan",
    dex: 618,
    species: "Stunfisk",
    demonym: "Unovan Form",
    form: null,
    types: [
      "Ground",
      "Electric"
    ]
  },
  {
    id: "stunfisk-galarian",
    dex: 618,
    species: "Stunfisk",
    demonym: "Galarian Form",
    form: null,
    types: [
      "Ground",
      "Steel"
    ]
  },
  {
    id: "mienfoo",
    dex: 619,
    species: "Mienfoo",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "mienshao",
    dex: 620,
    species: "Mienshao",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "druddigon",
    dex: 621,
    species: "Druddigon",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "golett",
    dex: 622,
    species: "Golett",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Ghost"
    ]
  },
  {
    id: "golurk",
    dex: 623,
    species: "Golurk",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Ghost"
    ]
  },
  {
    id: "pawniard",
    dex: 624,
    species: "Pawniard",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Steel"
    ]
  },
  {
    id: "bisharp",
    dex: 625,
    species: "Bisharp",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Steel"
    ]
  },
  {
    id: "bouffalant",
    dex: 626,
    species: "Bouffalant",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "rufflet",
    dex: 627,
    species: "Rufflet",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "braviary-unovan",
    dex: 628,
    species: "Braviary",
    demonym: "Unovan Form",
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "braviary-hisuian",
    dex: 628,
    species: "Braviary",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "vullaby",
    dex: 629,
    species: "Vullaby",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Flying"
    ]
  },
  {
    id: "mandibuzz",
    dex: 630,
    species: "Mandibuzz",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Flying"
    ]
  },
  {
    id: "heatmor",
    dex: 631,
    species: "Heatmor",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "durant",
    dex: 632,
    species: "Durant",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Steel"
    ]
  },
  {
    id: "deino",
    dex: 633,
    species: "Deino",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Dragon"
    ]
  },
  {
    id: "zweilous",
    dex: 634,
    species: "Zweilous",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Dragon"
    ]
  },
  {
    id: "hydreigon",
    dex: 635,
    species: "Hydreigon",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Dragon"
    ]
  },
  {
    id: "larvesta",
    dex: 636,
    species: "Larvesta",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Fire"
    ]
  },
  {
    id: "volcarona",
    dex: 637,
    species: "Volcarona",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Fire"
    ]
  },
  {
    id: "cobalion",
    dex: 638,
    species: "Cobalion",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Fighting"
    ]
  },
  {
    id: "terrakion",
    dex: 639,
    species: "Terrakion",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Fighting"
    ]
  },
  {
    id: "virizion",
    dex: 640,
    species: "Virizion",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fighting"
    ]
  },
  {
    id: "tornadus-incarnate",
    dex: 641,
    species: "Tornadus",
    demonym: null,
    form: "Incarnate Forme",
    types: [
      "Flying"
    ]
  },
  {
    id: "tornadus-therian",
    dex: 641,
    species: "Tornadus",
    demonym: null,
    form: "Therian Forme",
    types: [
      "Flying"
    ]
  },
  {
    id: "thundurus-incarnate",
    dex: 642,
    species: "Thundurus",
    demonym: null,
    form: "Incarnate Forme",
    types: [
      "Electric",
      "Flying"
    ]
  },
  {
    id: "thundurus-therian",
    dex: 642,
    species: "Thundurus",
    demonym: null,
    form: "Therian Forme",
    types: [
      "Electric",
      "Flying"
    ]
  },
  {
    id: "reshiram",
    dex: 643,
    species: "Reshiram",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Fire"
    ]
  },
  {
    id: "zekrom",
    dex: 644,
    species: "Zekrom",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Electric"
    ]
  },
  {
    id: "landorus-incarnate",
    dex: 645,
    species: "Landorus",
    demonym: null,
    form: "Incarnate Forme",
    types: [
      "Ground",
      "Flying"
    ]
  },
  {
    id: "landorus-therian",
    dex: 645,
    species: "Landorus",
    demonym: null,
    form: "Therian Forme",
    types: [
      "Ground",
      "Flying"
    ]
  },
  {
    id: "kyurem",
    dex: 646,
    species: "Kyurem",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ice"
    ]
  },
  {
    id: "kyurem-black",
    dex: 646,
    species: "Kyurem",
    demonym: null,
    form: "Black",
    types: [
      "Dragon",
      "Ice"
    ]
  },
  {
    id: "kyurem-white",
    dex: 646,
    species: "Kyurem",
    demonym: null,
    form: "White",
    types: [
      "Dragon",
      "Ice"
    ]
  },
  {
    id: "keldeo-ordinary",
    dex: 647,
    species: "Keldeo",
    demonym: null,
    form: "Ordinary Form",
    types: [
      "Water",
      "Fighting"
    ]
  },
  {
    id: "keldeo-resolute",
    dex: 647,
    species: "Keldeo",
    demonym: null,
    form: "Resolute Form",
    types: [
      "Water",
      "Fighting"
    ]
  },
  {
    id: "meloetta-aria",
    dex: 648,
    species: "Meloetta",
    demonym: null,
    form: "Aria Forme",
    types: [
      "Normal",
      "Psychic"
    ]
  },
  {
    id: "meloetta-pirouette",
    dex: 648,
    species: "Meloetta",
    demonym: null,
    form: "Pirouette Forme",
    types: [
      "Normal",
      "Fighting"
    ]
  },
  {
    id: "genesect",
    dex: 649,
    species: "Genesect",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Steel"
    ]
  },
  {
    id: "chespin",
    dex: 650,
    species: "Chespin",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "quilladin",
    dex: 651,
    species: "Quilladin",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "chesnaught",
    dex: 652,
    species: "Chesnaught",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fighting"
    ]
  },
  {
    id: "fennekin",
    dex: 653,
    species: "Fennekin",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "braixen",
    dex: 654,
    species: "Braixen",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "delphox",
    dex: 655,
    species: "Delphox",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Psychic"
    ]
  },
  {
    id: "froakie",
    dex: 656,
    species: "Froakie",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "frogadier",
    dex: 657,
    species: "Frogadier",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "greninja",
    dex: 658,
    species: "Greninja",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Dark"
    ]
  },
  {
    id: "bunnelby",
    dex: 659,
    species: "Bunnelby",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "diggersby",
    dex: 660,
    species: "Diggersby",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Ground"
    ]
  },
  {
    id: "fletchling",
    dex: 661,
    species: "Fletchling",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "fletchinder",
    dex: 662,
    species: "Fletchinder",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Flying"
    ]
  },
  {
    id: "talonflame",
    dex: 663,
    species: "Talonflame",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Flying"
    ]
  },
  {
    id: "scatterbug",
    dex: 664,
    species: "Scatterbug",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "spewpa",
    dex: 665,
    species: "Spewpa",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "vivillon-meadow-pattern",
    dex: 666,
    species: "Vivillon",
    demonym: null,
    form: "Meadow Pattern",
    types: [
      "Bug",
      "Flying"
    ]
  },
  {
    id: "litleo",
    dex: 667,
    species: "Litleo",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Normal"
    ]
  },
  {
    id: "pyroar",
    dex: 668,
    species: "Pyroar",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Normal"
    ]
  },
  {
    id: "flabebe-blue-flower",
    dex: 669,
    species: "Flabébé",
    demonym: null,
    form: "Blue Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "flabebe-orange-flower",
    dex: 669,
    species: "Flabébé",
    demonym: null,
    form: "Orange Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "flabebe-red-flower",
    dex: 669,
    species: "Flabébé",
    demonym: null,
    form: "Red Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "flabebe-white-flower",
    dex: 669,
    species: "Flabébé",
    demonym: null,
    form: "White Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "flabebe-yellow-flower",
    dex: 669,
    species: "Flabébé",
    demonym: null,
    form: "Yellow Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "floette-blue-flower",
    dex: 670,
    species: "Floette",
    demonym: null,
    form: "Blue Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "floette-orange-flower",
    dex: 670,
    species: "Floette",
    demonym: null,
    form: "Orange Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "floette-red-flower",
    dex: 670,
    species: "Floette",
    demonym: null,
    form: "Red Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "floette-white-flower",
    dex: 670,
    species: "Floette",
    demonym: null,
    form: "White Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "floette-yellow-flower",
    dex: 670,
    species: "Floette",
    demonym: null,
    form: "Yellow Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "floette-eternal-flower",
    dex: 670,
    species: "Floette",
    demonym: null,
    form: "Eternal Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "florges-blue-flower",
    dex: 671,
    species: "Florges",
    demonym: null,
    form: "Blue Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "florges-orange-flower",
    dex: 671,
    species: "Florges",
    demonym: null,
    form: "Orange Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "florges-red-flower",
    dex: 671,
    species: "Florges",
    demonym: null,
    form: "Red Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "florges-white-flower",
    dex: 671,
    species: "Florges",
    demonym: null,
    form: "White Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "florges-yellow-flower",
    dex: 671,
    species: "Florges",
    demonym: null,
    form: "Yellow Flower",
    types: [
      "Fairy"
    ]
  },
  {
    id: "skiddo",
    dex: 672,
    species: "Skiddo",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "gogoat",
    dex: 673,
    species: "Gogoat",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "pancham",
    dex: 674,
    species: "Pancham",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "pangoro",
    dex: 675,
    species: "Pangoro",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Dark"
    ]
  },
  {
    id: "furfrou",
    dex: 676,
    species: "Furfrou",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "espurr",
    dex: 677,
    species: "Espurr",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "meowstic-female",
    dex: 678,
    species: "Meowstic",
    demonym: null,
    form: "Female",
    types: [
      "Psychic"
    ]
  },
  {
    id: "meowstic-male",
    dex: 678,
    species: "Meowstic",
    demonym: null,
    form: "Male",
    types: [
      "Psychic"
    ]
  },
  {
    id: "honedge",
    dex: 679,
    species: "Honedge",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Ghost"
    ]
  },
  {
    id: "doublade",
    dex: 680,
    species: "Doublade",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Ghost"
    ]
  },
  {
    id: "aegislash",
    dex: 681,
    species: "Aegislash",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Ghost"
    ]
  },
  {
    id: "spritzee",
    dex: 682,
    species: "Spritzee",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "aromatisse",
    dex: 683,
    species: "Aromatisse",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "swirlix",
    dex: 684,
    species: "Swirlix",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "slurpuff",
    dex: 685,
    species: "Slurpuff",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "inkay",
    dex: 686,
    species: "Inkay",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Psychic"
    ]
  },
  {
    id: "malamar",
    dex: 687,
    species: "Malamar",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Psychic"
    ]
  },
  {
    id: "binacle",
    dex: 688,
    species: "Binacle",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Water"
    ]
  },
  {
    id: "barbaracle",
    dex: 689,
    species: "Barbaracle",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Water"
    ]
  },
  {
    id: "skrelp",
    dex: 690,
    species: "Skrelp",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Water"
    ]
  },
  {
    id: "dragalge",
    dex: 691,
    species: "Dragalge",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Dragon"
    ]
  },
  {
    id: "clauncher",
    dex: 692,
    species: "Clauncher",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "clawitzer",
    dex: 693,
    species: "Clawitzer",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "helioptile",
    dex: 694,
    species: "Helioptile",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Normal"
    ]
  },
  {
    id: "heliolisk",
    dex: 695,
    species: "Heliolisk",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Normal"
    ]
  },
  {
    id: "tyrunt",
    dex: 696,
    species: "Tyrunt",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Dragon"
    ]
  },
  {
    id: "tyrantrum",
    dex: 697,
    species: "Tyrantrum",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Dragon"
    ]
  },
  {
    id: "amaura",
    dex: 698,
    species: "Amaura",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Ice"
    ]
  },
  {
    id: "aurorus",
    dex: 699,
    species: "Aurorus",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Ice"
    ]
  },
  {
    id: "sylveon",
    dex: 700,
    species: "Sylveon",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "hawlucha",
    dex: 701,
    species: "Hawlucha",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Flying"
    ]
  },
  {
    id: "dedenne",
    dex: 702,
    species: "Dedenne",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Fairy"
    ]
  },
  {
    id: "carbink",
    dex: 703,
    species: "Carbink",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Fairy"
    ]
  },
  {
    id: "goomy",
    dex: 704,
    species: "Goomy",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "sliggoo-kalosian",
    dex: 705,
    species: "Sliggoo",
    demonym: "Kalosian Form",
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "sliggoo-hisuian",
    dex: 705,
    species: "Sliggoo",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Steel",
      "Dragon"
    ]
  },
  {
    id: "goodra-kalosian",
    dex: 706,
    species: "Goodra",
    demonym: "Kalosian Form",
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "goodra-hisuian",
    dex: 706,
    species: "Goodra",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Steel",
      "Dragon"
    ]
  },
  {
    id: "klefki",
    dex: 707,
    species: "Klefki",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Fairy"
    ]
  },
  {
    id: "phantump",
    dex: 708,
    species: "Phantump",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Grass"
    ]
  },
  {
    id: "trevenant",
    dex: 709,
    species: "Trevenant",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Grass"
    ]
  },
  {
    id: "pumpkaboo",
    dex: 710,
    species: "Pumpkaboo",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Grass"
    ]
  },
  {
    id: "gourgeist",
    dex: 711,
    species: "Gourgeist",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Grass"
    ]
  },
  {
    id: "bergmite",
    dex: 712,
    species: "Bergmite",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "avalugg-kalosian",
    dex: 713,
    species: "Avalugg",
    demonym: "Kalosian Form",
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "avalugg-hisuian",
    dex: 713,
    species: "Avalugg",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Ice",
      "Rock"
    ]
  },
  {
    id: "noibat",
    dex: 714,
    species: "Noibat",
    demonym: null,
    form: null,
    types: [
      "Flying",
      "Dragon"
    ]
  },
  {
    id: "noivern",
    dex: 715,
    species: "Noivern",
    demonym: null,
    form: null,
    types: [
      "Flying",
      "Dragon"
    ]
  },
  {
    id: "xerneas",
    dex: 716,
    species: "Xerneas",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "yveltal",
    dex: 717,
    species: "Yveltal",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Flying"
    ]
  },
  {
    id: "zygarde-10",
    dex: 718,
    species: "Zygarde",
    demonym: null,
    form: "10% Forme",
    types: [
      "Dragon",
      "Ground"
    ]
  },
  {
    id: "zygarde-50",
    dex: 718,
    species: "Zygarde",
    demonym: null,
    form: "50% Forme",
    types: [
      "Dragon",
      "Ground"
    ]
  },
  {
    id: "zygarde-complete",
    dex: 718,
    species: "Zygarde",
    demonym: null,
    form: "Complete Forme",
    types: [
      "Dragon",
      "Ground"
    ]
  },
  {
    id: "diancie",
    dex: 719,
    species: "Diancie",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Fairy"
    ]
  },
  {
    id: "hoopa-confined",
    dex: 720,
    species: "Hoopa",
    demonym: null,
    form: "Confined",
    types: [
      "Psychic",
      "Ghost"
    ]
  },
  {
    id: "hoopa-unbound",
    dex: 720,
    species: "Hoopa",
    demonym: null,
    form: "Unbound",
    types: [
      "Psychic",
      "Dark"
    ]
  },
  {
    id: "volcanion",
    dex: 721,
    species: "Volcanion",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Water"
    ]
  },
  {
    id: "rowlet",
    dex: 722,
    species: "Rowlet",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Flying"
    ]
  },
  {
    id: "dartrix",
    dex: 723,
    species: "Dartrix",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Flying"
    ]
  },
  {
    id: "decidueye-alolan",
    dex: 724,
    species: "Decidueye",
    demonym: "Alolan Form",
    form: null,
    types: [
      "Grass",
      "Ghost"
    ]
  },
  {
    id: "decidueye-hisuian",
    dex: 724,
    species: "Decidueye",
    demonym: "Hisuian Form",
    form: null,
    types: [
      "Grass",
      "Fighting"
    ]
  },
  {
    id: "litten",
    dex: 725,
    species: "Litten",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "torracat",
    dex: 726,
    species: "Torracat",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "incineroar",
    dex: 727,
    species: "Incineroar",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Dark"
    ]
  },
  {
    id: "popplio",
    dex: 728,
    species: "Popplio",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "brionne",
    dex: 729,
    species: "Brionne",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "primarina",
    dex: 730,
    species: "Primarina",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Fairy"
    ]
  },
  {
    id: "pikipek",
    dex: 731,
    species: "Pikipek",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "trumbeak",
    dex: 732,
    species: "Trumbeak",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "toucannon",
    dex: 733,
    species: "Toucannon",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "yungoos",
    dex: 734,
    species: "Yungoos",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "gumshoos",
    dex: 735,
    species: "Gumshoos",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "grubbin",
    dex: 736,
    species: "Grubbin",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "charjabug",
    dex: 737,
    species: "Charjabug",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Electric"
    ]
  },
  {
    id: "vikavolt",
    dex: 738,
    species: "Vikavolt",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Electric"
    ]
  },
  {
    id: "crabrawler",
    dex: 739,
    species: "Crabrawler",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "crabominable",
    dex: 740,
    species: "Crabominable",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Ice"
    ]
  },
  {
    id: "oricorio-baile",
    dex: 741,
    species: "Oricorio",
    demonym: null,
    form: "Baile Style",
    types: [
      "Fire",
      "Flying"
    ]
  },
  {
    id: "oricorio-pau",
    dex: 741,
    species: "Oricorio",
    demonym: null,
    form: "Pa’u Style",
    types: [
      "Psychic",
      "Flying"
    ]
  },
  {
    id: "oricorio-pom-pom",
    dex: 741,
    species: "Oricorio",
    demonym: null,
    form: "Pom-Pom Style",
    types: [
      "Electric",
      "Flying"
    ]
  },
  {
    id: "oricorio-sensu",
    dex: 741,
    species: "Oricorio",
    demonym: null,
    form: "Sensu Style",
    types: [
      "Ghost",
      "Flying"
    ]
  },
  {
    id: "cutiefly",
    dex: 742,
    species: "Cutiefly",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Fairy"
    ]
  },
  {
    id: "ribombee",
    dex: 743,
    species: "Ribombee",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Fairy"
    ]
  },
  {
    id: "rockruff",
    dex: 744,
    species: "Rockruff",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "lycanroc-midday",
    dex: 745,
    species: "Lycanroc",
    demonym: null,
    form: "Midday Form",
    types: [
      "Rock"
    ]
  },
  {
    id: "lycanroc-dusk",
    dex: 745,
    species: "Lycanroc",
    demonym: null,
    form: "Dusk Form",
    types: [
      "Rock"
    ]
  },
  {
    id: "lycanroc-midnight",
    dex: 745,
    species: "Lycanroc",
    demonym: null,
    form: "Midnight Form",
    types: [
      "Rock"
    ]
  },
  {
    id: "wishiwashi-school",
    dex: 746,
    species: "Wishiwashi",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "mareanie",
    dex: 747,
    species: "Mareanie",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Water"
    ]
  },
  {
    id: "toxapex",
    dex: 748,
    species: "Toxapex",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Water"
    ]
  },
  {
    id: "mudbray",
    dex: 749,
    species: "Mudbray",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "mudsdale",
    dex: 750,
    species: "Mudsdale",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "dewpider",
    dex: 751,
    species: "Dewpider",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Bug"
    ]
  },
  {
    id: "araquanid",
    dex: 752,
    species: "Araquanid",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Bug"
    ]
  },
  {
    id: "fomantis",
    dex: 753,
    species: "Fomantis",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "lurantis",
    dex: 754,
    species: "Lurantis",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "morelull",
    dex: 755,
    species: "Morelull",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fairy"
    ]
  },
  {
    id: "shiinotic",
    dex: 756,
    species: "Shiinotic",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fairy"
    ]
  },
  {
    id: "salandit",
    dex: 757,
    species: "Salandit",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Fire"
    ]
  },
  {
    id: "salazzle",
    dex: 758,
    species: "Salazzle",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Fire"
    ]
  },
  {
    id: "stufful",
    dex: 759,
    species: "Stufful",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Fighting"
    ]
  },
  {
    id: "bewear",
    dex: 760,
    species: "Bewear",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Fighting"
    ]
  },
  {
    id: "bounsweet",
    dex: 761,
    species: "Bounsweet",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "steenee",
    dex: 762,
    species: "Steenee",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "tsareena",
    dex: 763,
    species: "Tsareena",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "comfey",
    dex: 764,
    species: "Comfey",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "oranguru",
    dex: 765,
    species: "Oranguru",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Psychic"
    ]
  },
  {
    id: "passimian",
    dex: 766,
    species: "Passimian",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "wimpod",
    dex: 767,
    species: "Wimpod",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Water"
    ]
  },
  {
    id: "golisopod",
    dex: 768,
    species: "Golisopod",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Water"
    ]
  },
  {
    id: "sandygast",
    dex: 769,
    species: "Sandygast",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Ground"
    ]
  },
  {
    id: "palossand",
    dex: 770,
    species: "Palossand",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Ground"
    ]
  },
  {
    id: "pyukumuku",
    dex: 771,
    species: "Pyukumuku",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "type-null",
    dex: 772,
    species: "Type: Null",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "silvally",
    dex: 773,
    species: "Silvally",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "minior-meteor",
    dex: 774,
    species: "Minior",
    demonym: null,
    form: "Meteor Form",
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "minior-red-core",
    dex: 774,
    species: "Minior",
    demonym: null,
    form: "Red Core",
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "minior-orange-core",
    dex: 774,
    species: "Minior",
    demonym: null,
    form: "Orange Core",
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "minior-yellow-core",
    dex: 774,
    species: "Minior",
    demonym: null,
    form: "Yellow Core",
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "minior-green-core",
    dex: 774,
    species: "Minior",
    demonym: null,
    form: "Green Core",
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "minior-blue-core",
    dex: 774,
    species: "Minior",
    demonym: null,
    form: "Blue Core",
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "minior-indigo-core",
    dex: 774,
    species: "Minior",
    demonym: null,
    form: "Indigo Core",
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "minior-violet-core",
    dex: 774,
    species: "Minior",
    demonym: null,
    form: "Violet Core",
    types: [
      "Rock",
      "Flying"
    ]
  },
  {
    id: "komala",
    dex: 775,
    species: "Komala",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "turtonator",
    dex: 776,
    species: "Turtonator",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Dragon"
    ]
  },
  {
    id: "togedemaru",
    dex: 777,
    species: "Togedemaru",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Steel"
    ]
  },
  {
    id: "mimikyu",
    dex: 778,
    species: "Mimikyu",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Fairy"
    ]
  },
  {
    id: "bruxish",
    dex: 779,
    species: "Bruxish",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Psychic"
    ]
  },
  {
    id: "drampa",
    dex: 780,
    species: "Drampa",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Dragon"
    ]
  },
  {
    id: "dhelmise",
    dex: 781,
    species: "Dhelmise",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Grass"
    ]
  },
  {
    id: "jangmo-o",
    dex: 782,
    species: "Jangmo-o",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "hakamo-o",
    dex: 783,
    species: "Hakamo-o",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Fighting"
    ]
  },
  {
    id: "kommo-o",
    dex: 784,
    species: "Kommo-o",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Fighting"
    ]
  },
  {
    id: "tapu-koko",
    dex: 785,
    species: "Tapu Koko",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Fairy"
    ]
  },
  {
    id: "tapu-lele",
    dex: 786,
    species: "Tapu Lele",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Fairy"
    ]
  },
  {
    id: "tapu-bulu",
    dex: 787,
    species: "Tapu Bulu",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fairy"
    ]
  },
  {
    id: "tapu-fini",
    dex: 788,
    species: "Tapu Fini",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Fairy"
    ]
  },
  {
    id: "cosmog",
    dex: 789,
    species: "Cosmog",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "cosmoem",
    dex: 790,
    species: "Cosmoem",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "solgaleo",
    dex: 791,
    species: "Solgaleo",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Steel"
    ]
  },
  {
    id: "lunala",
    dex: 792,
    species: "Lunala",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Ghost"
    ]
  },
  {
    id: "nihilego",
    dex: 793,
    species: "Nihilego",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Poison"
    ]
  },
  {
    id: "buzzwole",
    dex: 794,
    species: "Buzzwole",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Fighting"
    ]
  },
  {
    id: "pheromosa",
    dex: 795,
    species: "Pheromosa",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Fighting"
    ]
  },
  {
    id: "xurkitree",
    dex: 796,
    species: "Xurkitree",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "celesteela",
    dex: 797,
    species: "Celesteela",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Flying"
    ]
  },
  {
    id: "kartana",
    dex: 798,
    species: "Kartana",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Steel"
    ]
  },
  {
    id: "guzzlord",
    dex: 799,
    species: "Guzzlord",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Dragon"
    ]
  },
  {
    id: "necrozma",
    dex: 800,
    species: "Necrozma",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "necrozma-dawn-wings",
    dex: 800,
    species: "Necrozma",
    demonym: null,
    form: "Dawn Wings",
    types: [
      "Psychic",
      "Ghost"
    ]
  },
  {
    id: "necrozma-dusk-mane",
    dex: 800,
    species: "Necrozma",
    demonym: null,
    form: "Dusk Mane",
    types: [
      "Psychic",
      "Steel"
    ]
  },
  {
    id: "magearna",
    dex: 801,
    species: "Magearna",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Fairy"
    ]
  },
  {
    id: "marshadow",
    dex: 802,
    species: "Marshadow",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Ghost"
    ]
  },
  {
    id: "poipole",
    dex: 803,
    species: "Poipole",
    demonym: null,
    form: null,
    types: [
      "Poison"
    ]
  },
  {
    id: "naganadel",
    dex: 804,
    species: "Naganadel",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Dragon"
    ]
  },
  {
    id: "stakataka",
    dex: 805,
    species: "Stakataka",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Steel"
    ]
  },
  {
    id: "blacephalon",
    dex: 806,
    species: "Blacephalon",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Ghost"
    ]
  },
  {
    id: "zeraora",
    dex: 807,
    species: "Zeraora",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "meltan",
    dex: 808,
    species: "Meltan",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "melmetal",
    dex: 809,
    species: "Melmetal",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "grookey",
    dex: 810,
    species: "Grookey",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "thwackey",
    dex: 811,
    species: "Thwackey",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "rillaboom",
    dex: 812,
    species: "Rillaboom",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "scorbunny",
    dex: 813,
    species: "Scorbunny",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "raboot",
    dex: 814,
    species: "Raboot",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "cinderace",
    dex: 815,
    species: "Cinderace",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "sobble",
    dex: 816,
    species: "Sobble",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "drizzile",
    dex: 817,
    species: "Drizzile",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "inteleon",
    dex: 818,
    species: "Inteleon",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "skwovet",
    dex: 819,
    species: "Skwovet",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "greedent",
    dex: 820,
    species: "Greedent",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "rookidee",
    dex: 821,
    species: "Rookidee",
    demonym: null,
    form: null,
    types: [
      "Flying"
    ]
  },
  {
    id: "corvisquire",
    dex: 822,
    species: "Corvisquire",
    demonym: null,
    form: null,
    types: [
      "Flying"
    ]
  },
  {
    id: "corviknight",
    dex: 823,
    species: "Corviknight",
    demonym: null,
    form: null,
    types: [
      "Flying",
      "Steel"
    ]
  },
  {
    id: "blipbug",
    dex: 824,
    species: "Blipbug",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "dottler",
    dex: 825,
    species: "Dottler",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Psychic"
    ]
  },
  {
    id: "orbeetle",
    dex: 826,
    species: "Orbeetle",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Psychic"
    ]
  },
  {
    id: "nickit",
    dex: 827,
    species: "Nickit",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "thievul",
    dex: 828,
    species: "Thievul",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "gossifleur",
    dex: 829,
    species: "Gossifleur",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "eldegoss",
    dex: 830,
    species: "Eldegoss",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "wooloo",
    dex: 831,
    species: "Wooloo",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "dubwool",
    dex: 832,
    species: "Dubwool",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "chewtle",
    dex: 833,
    species: "Chewtle",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "drednaw",
    dex: 834,
    species: "Drednaw",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Rock"
    ]
  },
  {
    id: "yamper",
    dex: 835,
    species: "Yamper",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "boltund",
    dex: 836,
    species: "Boltund",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "rolycoly",
    dex: 837,
    species: "Rolycoly",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "carkol",
    dex: 838,
    species: "Carkol",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Fire"
    ]
  },
  {
    id: "coalossal",
    dex: 839,
    species: "Coalossal",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Fire"
    ]
  },
  {
    id: "applin",
    dex: 840,
    species: "Applin",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dragon"
    ]
  },
  {
    id: "flapple",
    dex: 841,
    species: "Flapple",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dragon"
    ]
  },
  {
    id: "appletun",
    dex: 842,
    species: "Appletun",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dragon"
    ]
  },
  {
    id: "silicobra",
    dex: 843,
    species: "Silicobra",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "sandaconda",
    dex: 844,
    species: "Sandaconda",
    demonym: null,
    form: null,
    types: [
      "Ground"
    ]
  },
  {
    id: "cramorant",
    dex: 845,
    species: "Cramorant",
    demonym: null,
    form: null,
    types: [
      "Flying",
      "Water"
    ]
  },
  {
    id: "arrokuda",
    dex: 846,
    species: "Arrokuda",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "barraskewda",
    dex: 847,
    species: "Barraskewda",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "toxel",
    dex: 848,
    species: "Toxel",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Poison"
    ]
  },
  {
    id: "toxtricity-amped",
    dex: 849,
    species: "Toxtricity",
    demonym: null,
    form: "Amped Form",
    types: [
      "Electric",
      "Poison"
    ]
  },
  {
    id: "toxtricity-low-key",
    dex: 849,
    species: "Toxtricity",
    demonym: null,
    form: "Low Key Form",
    types: [
      "Electric",
      "Poison"
    ]
  },
  {
    id: "sizzlipede",
    dex: 850,
    species: "Sizzlipede",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Bug"
    ]
  },
  {
    id: "centiskorch",
    dex: 851,
    species: "Centiskorch",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Bug"
    ]
  },
  {
    id: "clobbopus",
    dex: 852,
    species: "Clobbopus",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "grapploct",
    dex: 853,
    species: "Grapploct",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "sinistea",
    dex: 854,
    species: "Sinistea",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "polteageist",
    dex: 855,
    species: "Polteageist",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "hatenna",
    dex: 856,
    species: "Hatenna",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "hattrem",
    dex: 857,
    species: "Hattrem",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "hatterene",
    dex: 858,
    species: "Hatterene",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Fairy"
    ]
  },
  {
    id: "impidimp",
    dex: 859,
    species: "Impidimp",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Fairy"
    ]
  },
  {
    id: "morgrem",
    dex: 860,
    species: "Morgrem",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Fairy"
    ]
  },
  {
    id: "grimmsnarl",
    dex: 861,
    species: "Grimmsnarl",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Fairy"
    ]
  },
  {
    id: "obstagoon",
    dex: 862,
    species: "Obstagoon",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Normal"
    ]
  },
  {
    id: "perrserker",
    dex: 863,
    species: "Perrserker",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "cursola",
    dex: 864,
    species: "Cursola",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "sirfetchd",
    dex: 865,
    species: "Sirfetch’d",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "mr-rime",
    dex: 866,
    species: "Mr. Rime",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Psychic"
    ]
  },
  {
    id: "runerigus",
    dex: 867,
    species: "Runerigus",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Ghost"
    ]
  },
  {
    id: "milcery",
    dex: 868,
    species: "Milcery",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-vanilla-cream",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Vanilla Cream",
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-ruby-cream",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Ruby Cream",
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-matcha-cream",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Matcha Cream",
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-mint-cream",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Mint Cream",
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-lemon-cream",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Lemon Cream",
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-salted-cream",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Salted Cream",
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-ruby-swirl",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Ruby Swirl",
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-caramel-swirl",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Caramel Swirl",
    types: [
      "Fairy"
    ]
  },
  {
    id: "alcremie-rainbow-swirl",
    dex: 869,
    species: "Alcremie",
    demonym: null,
    form: "Rainbow Swirl",
    types: [
      "Fairy"
    ]
  },
  {
    id: "falinks",
    dex: 870,
    species: "Falinks",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "pincurchin",
    dex: 871,
    species: "Pincurchin",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "snom",
    dex: 872,
    species: "Snom",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Bug"
    ]
  },
  {
    id: "frosmoth",
    dex: 873,
    species: "Frosmoth",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Bug"
    ]
  },
  {
    id: "stonjourner",
    dex: 874,
    species: "Stonjourner",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "eiscue-ice-face",
    dex: 875,
    species: "Eiscue",
    demonym: null,
    form: "Ice Face",
    types: [
      "Ice"
    ]
  },
  {
    id: "eiscue-noice-face",
    dex: 875,
    species: "Eiscue",
    demonym: null,
    form: "Noice Face",
    types: [
      "Ice"
    ]
  },
  {
    id: "indeedee-female",
    dex: 876,
    species: "Indeedee",
    demonym: null,
    form: "Female",
    types: [
      "Psychic",
      "Normal"
    ]
  },
  {
    id: "indeedee-male",
    dex: 876,
    species: "Indeedee",
    demonym: null,
    form: "Male",
    types: [
      "Psychic",
      "Normal"
    ]
  },
  {
    id: "morpeko-full-belly",
    dex: 877,
    species: "Morpeko",
    demonym: null,
    form: "Full Belly Mode",
    types: [
      "Electric",
      "Dark"
    ]
  },
  {
    id: "morpeko-hangry",
    dex: 877,
    species: "Morpeko",
    demonym: null,
    form: "Hangry Mode",
    types: [
      "Electric",
      "Dark"
    ]
  },
  {
    id: "cufant",
    dex: 878,
    species: "Cufant",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "copperajah",
    dex: 879,
    species: "Copperajah",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "dracozolt",
    dex: 880,
    species: "Dracozolt",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Dragon"
    ]
  },
  {
    id: "arctozolt",
    dex: 881,
    species: "Arctozolt",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Ice"
    ]
  },
  {
    id: "dracovish",
    dex: 882,
    species: "Dracovish",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Dragon"
    ]
  },
  {
    id: "arctovish",
    dex: 883,
    species: "Arctovish",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Ice"
    ]
  },
  {
    id: "duraludon",
    dex: 884,
    species: "Duraludon",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Dragon"
    ]
  },
  {
    id: "dreepy",
    dex: 885,
    species: "Dreepy",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ghost"
    ]
  },
  {
    id: "drakloak",
    dex: 886,
    species: "Drakloak",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ghost"
    ]
  },
  {
    id: "dragapult",
    dex: 887,
    species: "Dragapult",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ghost"
    ]
  },
  {
    id: "zacian-crowned-sword",
    dex: 888,
    species: "Zacian",
    demonym: null,
    form: "Crowned Sword",
    types: [
      "Fairy",
      "Steel"
    ]
  },
  {
    id: "zacian-hero-of-many-battles",
    dex: 888,
    species: "Zacian",
    demonym: null,
    form: "Hero of Many Battles",
    types: [
      "Fairy"
    ]
  },
  {
    id: "zamazenta-crowned-shield",
    dex: 889,
    species: "Zamazenta",
    demonym: null,
    form: "Crowned Shield",
    types: [
      "Fighting",
      "Steel"
    ]
  },
  {
    id: "zamazenta-hero-of-many-battles",
    dex: 889,
    species: "Zamazenta",
    demonym: null,
    form: "Hero of Many Battles",
    types: [
      "Fighting"
    ]
  },
  {
    id: "eternatus",
    dex: 890,
    species: "Eternatus",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Dragon"
    ]
  },
  {
    id: "kubfu",
    dex: 891,
    species: "Kubfu",
    demonym: null,
    form: null,
    types: [
      "Fighting"
    ]
  },
  {
    id: "urshifu-rapid-strike",
    dex: 892,
    species: "Urshifu",
    demonym: null,
    form: "Rapid Strike Style",
    types: [
      "Fighting",
      "Water"
    ]
  },
  {
    id: "urshifu-single-strike",
    dex: 892,
    species: "Urshifu",
    demonym: null,
    form: "Single Strike Style",
    types: [
      "Fighting",
      "Dark"
    ]
  },
  {
    id: "zarude",
    dex: 893,
    species: "Zarude",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Grass"
    ]
  },
  {
    id: "regieleki",
    dex: 894,
    species: "Regieleki",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "regidrago",
    dex: 895,
    species: "Regidrago",
    demonym: null,
    form: null,
    types: [
      "Dragon"
    ]
  },
  {
    id: "glastrier",
    dex: 896,
    species: "Glastrier",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "spectrier",
    dex: 897,
    species: "Spectrier",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "calyrex",
    dex: 898,
    species: "Calyrex",
    demonym: null,
    form: null,
    types: [
      "Psychic",
      "Grass"
    ]
  },
  {
    id: "calyrex-ice-rider",
    dex: 898,
    species: "Calyrex",
    demonym: null,
    form: "Ice Rider",
    types: [
      "Psychic",
      "Ice"
    ]
  },
  {
    id: "calyrex-shadow-rider",
    dex: 898,
    species: "Calyrex",
    demonym: null,
    form: "Shadow Rider",
    types: [
      "Psychic",
      "Ghost"
    ]
  },
  {
    id: "wyrdeer",
    dex: 899,
    species: "Wyrdeer",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Psychic"
    ]
  },
  {
    id: "kleavor",
    dex: 900,
    species: "Kleavor",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Rock"
    ]
  },
  {
    id: "ursaluna",
    dex: 901,
    species: "Ursaluna",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Normal"
    ]
  },
  {
    id: "ursaluna-bloodmoon",
    dex: 901,
    species: "Ursaluna",
    demonym: null,
    form: "Bloodmoon",
    types: [
      "Ground",
      "Normal"
    ]
  },
  {
    id: "basculegion-female",
    dex: 902,
    species: "Basculegion",
    demonym: null,
    form: "Female",
    types: [
      "Water",
      "Ghost"
    ]
  },
  {
    id: "basculegion-male",
    dex: 902,
    species: "Basculegion",
    demonym: null,
    form: "Male",
    types: [
      "Water",
      "Ghost"
    ]
  },
  {
    id: "sneasler",
    dex: 903,
    species: "Sneasler",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Poison"
    ]
  },
  {
    id: "overqwil",
    dex: 904,
    species: "Overqwil",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Poison"
    ]
  },
  {
    id: "enamorus-incarnate",
    dex: 905,
    species: "Enamorus",
    demonym: null,
    form: "Incarnate Forme",
    types: [
      "Fairy",
      "Flying"
    ]
  },
  {
    id: "enamorus-therian",
    dex: 905,
    species: "Enamorus",
    demonym: null,
    form: "Therian Forme",
    types: [
      "Fairy",
      "Flying"
    ]
  },
  {
    id: "sprigatito",
    dex: 906,
    species: "Sprigatito",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "floragato",
    dex: 907,
    species: "Floragato",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "meowscarada",
    dex: 908,
    species: "Meowscarada",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dark"
    ]
  },
  {
    id: "fuecoco",
    dex: 909,
    species: "Fuecoco",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "crocalor",
    dex: 910,
    species: "Crocalor",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "skeledirge",
    dex: 911,
    species: "Skeledirge",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Ghost"
    ]
  },
  {
    id: "quaxly",
    dex: 912,
    species: "Quaxly",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "quaxwell",
    dex: 913,
    species: "Quaxwell",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "quaquaval",
    dex: 914,
    species: "Quaquaval",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Fighting"
    ]
  },
  {
    id: "lechonk",
    dex: 915,
    species: "Lechonk",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "oinkologne-female",
    dex: 916,
    species: "Oinkologne",
    demonym: null,
    form: "Female",
    types: [
      "Normal"
    ]
  },
  {
    id: "oinkologne-male",
    dex: 916,
    species: "Oinkologne",
    demonym: null,
    form: "Male",
    types: [
      "Normal"
    ]
  },
  {
    id: "tarountula",
    dex: 917,
    species: "Tarountula",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "spidops",
    dex: 918,
    species: "Spidops",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "nymble",
    dex: 919,
    species: "Nymble",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "lokix",
    dex: 920,
    species: "Lokix",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Dark"
    ]
  },
  {
    id: "pawmi",
    dex: 921,
    species: "Pawmi",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "pawmo",
    dex: 922,
    species: "Pawmo",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Fighting"
    ]
  },
  {
    id: "pawmot",
    dex: 923,
    species: "Pawmot",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Fighting"
    ]
  },
  {
    id: "tandemaus",
    dex: 924,
    species: "Tandemaus",
    demonym: null,
    form: null,
    types: [
      "Normal"
    ]
  },
  {
    id: "maushold-family-of-four",
    dex: 925,
    species: "Maushold",
    demonym: null,
    form: "Family of Four",
    types: [
      "Normal"
    ]
  },
  {
    id: "maushold-family-of-three",
    dex: 925,
    species: "Maushold",
    demonym: null,
    form: "Family of Three",
    types: [
      "Normal"
    ]
  },
  {
    id: "fidough",
    dex: 926,
    species: "Fidough",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "dachsbun",
    dex: 927,
    species: "Dachsbun",
    demonym: null,
    form: null,
    types: [
      "Fairy"
    ]
  },
  {
    id: "smoliv",
    dex: 928,
    species: "Smoliv",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Normal"
    ]
  },
  {
    id: "dolliv",
    dex: 929,
    species: "Dolliv",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Normal"
    ]
  },
  {
    id: "arboliva",
    dex: 930,
    species: "Arboliva",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Normal"
    ]
  },
  {
    id: "squawkabilly-blue-plumage",
    dex: 931,
    species: "Squawkabilly",
    demonym: null,
    form: "Blue Plumage",
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "squawkabilly-green-plumage",
    dex: 931,
    species: "Squawkabilly",
    demonym: null,
    form: "Green Plumage",
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "squawkabilly-white-plumage",
    dex: 931,
    species: "Squawkabilly",
    demonym: null,
    form: "White Plumage",
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "squawkabilly-yellow-plumage",
    dex: 931,
    species: "Squawkabilly",
    demonym: null,
    form: "Yellow Plumage",
    types: [
      "Normal",
      "Flying"
    ]
  },
  {
    id: "nacli",
    dex: 932,
    species: "Nacli",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "naclstack",
    dex: 933,
    species: "Naclstack",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "garganacl",
    dex: 934,
    species: "Garganacl",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "charcadet",
    dex: 935,
    species: "Charcadet",
    demonym: null,
    form: null,
    types: [
      "Fire"
    ]
  },
  {
    id: "armarouge",
    dex: 936,
    species: "Armarouge",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Psychic"
    ]
  },
  {
    id: "ceruledge",
    dex: 937,
    species: "Ceruledge",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Ghost"
    ]
  },
  {
    id: "tadbulb",
    dex: 938,
    species: "Tadbulb",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "bellibolt",
    dex: 939,
    species: "Bellibolt",
    demonym: null,
    form: null,
    types: [
      "Electric"
    ]
  },
  {
    id: "wattrel",
    dex: 940,
    species: "Wattrel",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Flying"
    ]
  },
  {
    id: "kilowattrel",
    dex: 941,
    species: "Kilowattrel",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Flying"
    ]
  },
  {
    id: "maschiff",
    dex: 942,
    species: "Maschiff",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "mabosstiff",
    dex: 943,
    species: "Mabosstiff",
    demonym: null,
    form: null,
    types: [
      "Dark"
    ]
  },
  {
    id: "shroodle",
    dex: 944,
    species: "Shroodle",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Normal"
    ]
  },
  {
    id: "grafaiai",
    dex: 945,
    species: "Grafaiai",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Normal"
    ]
  },
  {
    id: "bramblin",
    dex: 946,
    species: "Bramblin",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Ghost"
    ]
  },
  {
    id: "brambleghast",
    dex: 947,
    species: "Brambleghast",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Ghost"
    ]
  },
  {
    id: "toedscool",
    dex: 948,
    species: "Toedscool",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Grass"
    ]
  },
  {
    id: "toedscruel",
    dex: 949,
    species: "Toedscruel",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Grass"
    ]
  },
  {
    id: "klawf",
    dex: 950,
    species: "Klawf",
    demonym: null,
    form: null,
    types: [
      "Rock"
    ]
  },
  {
    id: "capsakid",
    dex: 951,
    species: "Capsakid",
    demonym: null,
    form: null,
    types: [
      "Grass"
    ]
  },
  {
    id: "scovillain",
    dex: 952,
    species: "Scovillain",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Fire"
    ]
  },
  {
    id: "rellor",
    dex: 953,
    species: "Rellor",
    demonym: null,
    form: null,
    types: [
      "Bug"
    ]
  },
  {
    id: "rabsca",
    dex: 954,
    species: "Rabsca",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Psychic"
    ]
  },
  {
    id: "flittle",
    dex: 955,
    species: "Flittle",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "espathra",
    dex: 956,
    species: "Espathra",
    demonym: null,
    form: null,
    types: [
      "Psychic"
    ]
  },
  {
    id: "tinkatink",
    dex: 957,
    species: "Tinkatink",
    demonym: null,
    form: null,
    types: [
      "Fairy",
      "Steel"
    ]
  },
  {
    id: "tinkatuff",
    dex: 958,
    species: "Tinkatuff",
    demonym: null,
    form: null,
    types: [
      "Fairy",
      "Steel"
    ]
  },
  {
    id: "tinkaton",
    dex: 959,
    species: "Tinkaton",
    demonym: null,
    form: null,
    types: [
      "Fairy",
      "Steel"
    ]
  },
  {
    id: "wiglett",
    dex: 960,
    species: "Wiglett",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "wugtrio",
    dex: 961,
    species: "Wugtrio",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "bombirdier",
    dex: 962,
    species: "Bombirdier",
    demonym: null,
    form: null,
    types: [
      "Flying",
      "Dark"
    ]
  },
  {
    id: "finizen",
    dex: 963,
    species: "Finizen",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "palafin-hero",
    dex: 964,
    species: "Palafin",
    demonym: null,
    form: "Hero Form",
    types: [
      "Water"
    ]
  },
  {
    id: "palafin-zero",
    dex: 964,
    species: "Palafin",
    demonym: null,
    form: "Zero Form",
    types: [
      "Water"
    ]
  },
  {
    id: "varoom",
    dex: 965,
    species: "Varoom",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Poison"
    ]
  },
  {
    id: "revavroom",
    dex: 966,
    species: "Revavroom",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Poison"
    ]
  },
  {
    id: "cyclizar",
    dex: 967,
    species: "Cyclizar",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Normal"
    ]
  },
  {
    id: "orthworm",
    dex: 968,
    species: "Orthworm",
    demonym: null,
    form: null,
    types: [
      "Steel"
    ]
  },
  {
    id: "glimmet",
    dex: 969,
    species: "Glimmet",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Poison"
    ]
  },
  {
    id: "glimmora",
    dex: 970,
    species: "Glimmora",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Poison"
    ]
  },
  {
    id: "greavard",
    dex: 971,
    species: "Greavard",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "houndstone",
    dex: 972,
    species: "Houndstone",
    demonym: null,
    form: null,
    types: [
      "Ghost"
    ]
  },
  {
    id: "flamigo",
    dex: 973,
    species: "Flamigo",
    demonym: null,
    form: null,
    types: [
      "Flying",
      "Fighting"
    ]
  },
  {
    id: "cetoddle",
    dex: 974,
    species: "Cetoddle",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "cetitan",
    dex: 975,
    species: "Cetitan",
    demonym: null,
    form: null,
    types: [
      "Ice"
    ]
  },
  {
    id: "veluza",
    dex: 976,
    species: "Veluza",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Psychic"
    ]
  },
  {
    id: "dondozo",
    dex: 977,
    species: "Dondozo",
    demonym: null,
    form: null,
    types: [
      "Water"
    ]
  },
  {
    id: "tatsugiri-curly",
    dex: 978,
    species: "Tatsugiri",
    demonym: null,
    form: "Curly Form",
    types: [
      "Dragon",
      "Water"
    ]
  },
  {
    id: "tatsugiri-droopy",
    dex: 978,
    species: "Tatsugiri",
    demonym: null,
    form: "Droopy Form",
    types: [
      "Dragon",
      "Water"
    ]
  },
  {
    id: "tatsugiri-stretchy",
    dex: 978,
    species: "Tatsugiri",
    demonym: null,
    form: "Stretchy Form",
    types: [
      "Dragon",
      "Water"
    ]
  },
  {
    id: "annihilape",
    dex: 979,
    species: "Annihilape",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Ghost"
    ]
  },
  {
    id: "clodsire",
    dex: 980,
    species: "Clodsire",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Ground"
    ]
  },
  {
    id: "farigiraf",
    dex: 981,
    species: "Farigiraf",
    demonym: null,
    form: null,
    types: [
      "Normal",
      "Psychic"
    ]
  },
  {
    id: "dudunsparce-three-segment",
    dex: 982,
    species: "Dudunsparce",
    demonym: null,
    form: "Three-Segment Form",
    types: [
      "Normal"
    ]
  },
  {
    id: "dudunsparce-two-segment",
    dex: 982,
    species: "Dudunsparce",
    demonym: null,
    form: "Two-Segment Form",
    types: [
      "Normal"
    ]
  },
  {
    id: "kingambit",
    dex: 983,
    species: "Kingambit",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Steel"
    ]
  },
  {
    id: "great-tusk",
    dex: 984,
    species: "Great Tusk",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Fighting"
    ]
  },
  {
    id: "scream-tail",
    dex: 985,
    species: "Scream Tail",
    demonym: null,
    form: null,
    types: [
      "Fairy",
      "Psychic"
    ]
  },
  {
    id: "brute-bonnet",
    dex: 986,
    species: "Brute Bonnet",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dark"
    ]
  },
  {
    id: "flutter-mane",
    dex: 987,
    species: "Flutter Mane",
    demonym: null,
    form: null,
    types: [
      "Ghost",
      "Fairy"
    ]
  },
  {
    id: "slither-wing",
    dex: 988,
    species: "Slither Wing",
    demonym: null,
    form: null,
    types: [
      "Bug",
      "Fighting"
    ]
  },
  {
    id: "sandy-shocks",
    dex: 989,
    species: "Sandy Shocks",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Ground"
    ]
  },
  {
    id: "iron-treads",
    dex: 990,
    species: "Iron Treads",
    demonym: null,
    form: null,
    types: [
      "Ground",
      "Steel"
    ]
  },
  {
    id: "iron-bundle",
    dex: 991,
    species: "Iron Bundle",
    demonym: null,
    form: null,
    types: [
      "Ice",
      "Water"
    ]
  },
  {
    id: "iron-hands",
    dex: 992,
    species: "Iron Hands",
    demonym: null,
    form: null,
    types: [
      "Fighting",
      "Electric"
    ]
  },
  {
    id: "iron-jugulis",
    dex: 993,
    species: "Iron Jugulis",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Flying"
    ]
  },
  {
    id: "iron-moth",
    dex: 994,
    species: "Iron Moth",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Poison"
    ]
  },
  {
    id: "iron-thorns",
    dex: 995,
    species: "Iron Thorns",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Electric"
    ]
  },
  {
    id: "frigibax",
    dex: 996,
    species: "Frigibax",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ice"
    ]
  },
  {
    id: "arctibax",
    dex: 997,
    species: "Arctibax",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ice"
    ]
  },
  {
    id: "baxcalibur",
    dex: 998,
    species: "Baxcalibur",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Ice"
    ]
  },
  {
    id: "gimmighoul-chest",
    dex: 999,
    species: "Gimmighoul",
    demonym: null,
    form: "Chest Form",
    types: [
      "Ghost"
    ]
  },
  {
    id: "gimmighoul-roaming",
    dex: 999,
    species: "Gimmighoul",
    demonym: null,
    form: "Roaming Form",
    types: [
      "Ghost"
    ]
  },
  {
    id: "gholdengo",
    dex: 1000,
    species: "Gholdengo",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Ghost"
    ]
  },
  {
    id: "wo-chien",
    dex: 1001,
    species: "Wo-Chien",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Grass"
    ]
  },
  {
    id: "chien-pao",
    dex: 1002,
    species: "Chien-Pao",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Ice"
    ]
  },
  {
    id: "ting-lu",
    dex: 1003,
    species: "Ting-Lu",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Ground"
    ]
  },
  {
    id: "chi-yu",
    dex: 1004,
    species: "Chi-Yu",
    demonym: null,
    form: null,
    types: [
      "Dark",
      "Fire"
    ]
  },
  {
    id: "roaring-moon",
    dex: 1005,
    species: "Roaring Moon",
    demonym: null,
    form: null,
    types: [
      "Dragon",
      "Dark"
    ]
  },
  {
    id: "iron-valiant",
    dex: 1006,
    species: "Iron Valiant",
    demonym: null,
    form: null,
    types: [
      "Fairy",
      "Fighting"
    ]
  },
  {
    id: "koraidon",
    dex: 1007,
    species: "Koraidon",
    demonym: null,
    form: "Apex Build",
    types: [
      "Fighting",
      "Dragon"
    ]
  },
  {
    id: "miraidon",
    dex: 1008,
    species: "Miraidon",
    demonym: null,
    form: "Ultimate Mode",
    types: [
      "Electric",
      "Dragon"
    ]
  },
  {
    id: "walking-wake",
    dex: 1009,
    species: "Walking Wake",
    demonym: null,
    form: null,
    types: [
      "Water",
      "Dragon"
    ]
  },
  {
    id: "iron-leaves",
    dex: 1010,
    species: "Iron Leaves",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Psychic"
    ]
  },
  {
    id: "dipplin",
    dex: 1011,
    species: "Dipplin",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dragon"
    ]
  },
  {
    id: "poltchageist",
    dex: 1012,
    species: "Poltchageist",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Ghost"
    ]
  },
  {
    id: "sinistcha",
    dex: 1013,
    species: "Sinistcha",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Ghost"
    ]
  },
  {
    id: "okidogi",
    dex: 1014,
    species: "Okidogi",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Fighting"
    ]
  },
  {
    id: "munkidori",
    dex: 1015,
    species: "Munkidori",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Psychic"
    ]
  },
  {
    id: "fezandipiti",
    dex: 1016,
    species: "Fezandipiti",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Fairy"
    ]
  },
  {
    id: "ogerpon-teal-mask",
    dex: 1017,
    species: "Ogerpon",
    demonym: null,
    form: "Teal Mask",
    types: [
      "Grass"
    ]
  },
  {
    id: "ogerpon-cornerstone-mask",
    dex: 1017,
    species: "Ogerpon",
    demonym: null,
    form: "Cornerstone Mask",
    types: [
      "Grass",
      "Rock"
    ]
  },
  {
    id: "ogerpon-hearthflame-mask",
    dex: 1017,
    species: "Ogerpon",
    demonym: null,
    form: "Hearthflame Mask",
    types: [
      "Grass",
      "Fire"
    ]
  },
  {
    id: "ogerpon-wellspring-mask",
    dex: 1017,
    species: "Ogerpon",
    demonym: null,
    form: "Wellspring Mask",
    types: [
      "Grass",
      "Water"
    ]
  },
  {
    id: "archaludon",
    dex: 1018,
    species: "Archaludon",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Dragon"
    ]
  },
  {
    id: "hydrapple",
    dex: 1019,
    species: "Hydrapple",
    demonym: null,
    form: null,
    types: [
      "Grass",
      "Dragon"
    ]
  },
  {
    id: "gouging-fire",
    dex: 1020,
    species: "Gouging Fire",
    demonym: null,
    form: null,
    types: [
      "Fire",
      "Dragon"
    ]
  },
  {
    id: "raging-bolt",
    dex: 1021,
    species: "Raging Bolt",
    demonym: null,
    form: null,
    types: [
      "Electric",
      "Dragon"
    ]
  },
  {
    id: "iron-boulder",
    dex: 1022,
    species: "Iron Boulder",
    demonym: null,
    form: null,
    types: [
      "Rock",
      "Psychic"
    ]
  },
  {
    id: "iron-crown",
    dex: 1023,
    species: "Iron Crown",
    demonym: null,
    form: null,
    types: [
      "Steel",
      "Psychic"
    ]
  },
  {
    id: "terapagos-normal",
    dex: 1024,
    species: "Terapagos",
    demonym: null,
    form: "Normal Form",
    types: [
      "Normal"
    ]
  },
  {
    id: "terapagos-terastal",
    dex: 1024,
    species: "Terapagos",
    demonym: null,
    form: "Terastal Form",
    types: [
      "Normal"
    ]
  },
  {
    id: "pecharunt",
    dex: 1025,
    species: "Pecharunt",
    demonym: null,
    form: null,
    types: [
      "Poison",
      "Ghost"
    ]
  },
  {
    id: "pichu-spiky-eared-pichu",
    dex: 172,
    species: "Pichu",
    demonym: null,
    form: "Spiky-eared Pichu",
    types: [
      "Electric"
    ]
  }
];
