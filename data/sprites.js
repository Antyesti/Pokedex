/**
 * Sprite List
 * -----------
 * Placeholder sprite artwork, one entry per species/form/Mega/Gigantamax variant this app
 * knows a sprite for. `name` matches how that variant is displayed elsewhere in the app --
 * plain species name for a base form, "Alolan"/"Galarian"/"Hisuian"/"Paldean" + species for a
 * regional form, "Mega" (+ Mega Form letter, e.g. "Mega Charizard X") + species for a Mega
 * Evolution, "Gigantamax" + species for a Gigantamax form -- intended to be matched to a
 * Pokémon record by reconstructing that same display name, so a fallback lookup doesn't need
 * its own id linkage. That runtime matching isn't wired up yet; this is the data + Control
 * Panel management side of it.
 *
 * Each entry is 4 URLs -- Male, Female, Shiny Male, Shiny Female -- linked from an external
 * host (img.pokemondb.net), not hosted by this app. For a species with no visual gender
 * difference, Male and Female (and their Shiny counterparts) are just the same URL twice.
 * These are only ever a fallback for a Pokémon that has no sprite of its own uploaded.
 */

const SPRITE_LIST = [
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    dex: 1,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bulbasaur.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bulbasaur.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bulbasaur.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bulbasaur.png"
  },
  {
    id: "ivysaur",
    name: "Ivysaur",
    dex: 2,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ivysaur.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ivysaur.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ivysaur.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ivysaur.png"
  },
  {
    id: "venusaur",
    name: "Venusaur",
    dex: 3,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/venusaur.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/venusaur.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/venusaur-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/venusaur-f.png"
  },
  {
    id: "mega_venusaur",
    name: "Mega Venusaur",
    dex: 3,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/venusaur-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/venusaur-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/venusaur-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/venusaur-mega.png"
  },
  {
    id: "gigantamax_venusaur",
    name: "Gigantamax Venusaur",
    dex: 3,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/venusaur-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/venusaur-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/venusaur-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/venusaur-gigantamax.png"
  },
  {
    id: "charmander",
    name: "Charmander",
    dex: 4,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/charmander.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/charmander.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/charmander.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/charmander.png"
  },
  {
    id: "charmeleon",
    name: "Charmeleon",
    dex: 5,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/charmeleon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/charmeleon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/charmeleon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/charmeleon.png"
  },
  {
    id: "charizard",
    name: "Charizard",
    dex: 6,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/charizard.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/charizard.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/charizard.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/charizard.png"
  },
  {
    id: "mega_charizard_x",
    name: "Mega Charizard X",
    dex: 6,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/charizard-mega-x.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/charizard-mega-x.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/charizard-mega-x.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/charizard-mega-x.png"
  },
  {
    id: "mega_charizard_y",
    name: "Mega Charizard Y",
    dex: 6,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/charizard-mega-y.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/charizard-mega-y.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/charizard-mega-y.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/charizard-mega-y.png"
  },
  {
    id: "gigantamax_charizard",
    name: "Gigantamax Charizard",
    dex: 6,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/charizard-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/charizard-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/charizard-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/charizard-gigantamax.png"
  },
  {
    id: "squirtle",
    name: "Squirtle",
    dex: 7,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/squirtle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/squirtle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/squirtle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/squirtle.png"
  },
  {
    id: "wartortle",
    name: "Wartortle",
    dex: 8,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wartortle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wartortle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wartortle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wartortle.png"
  },
  {
    id: "blastoise",
    name: "Blastoise",
    dex: 9,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blastoise.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blastoise.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blastoise.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blastoise.png"
  },
  {
    id: "mega_blastoise",
    name: "Mega Blastoise",
    dex: 9,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blastoise-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blastoise-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blastoise-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blastoise-mega.png"
  },
  {
    id: "gigantamax_blastoise",
    name: "Gigantamax Blastoise",
    dex: 9,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blastoise-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blastoise-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blastoise-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blastoise-gigantamax.png"
  },
  {
    id: "caterpie",
    name: "Caterpie",
    dex: 10,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/caterpie.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/caterpie.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/caterpie.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/caterpie.png"
  },
  {
    id: "metapod",
    name: "Metapod",
    dex: 11,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/metapod.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/metapod.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/metapod.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/metapod.png"
  },
  {
    id: "butterfree",
    name: "Butterfree",
    dex: 12,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/butterfree.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/butterfree.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/butterfree-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/butterfree-f.png"
  },
  {
    id: "gigantamax_butterfree",
    name: "Gigantamax Butterfree",
    dex: 12,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/butterfree-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/butterfree-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/butterfree-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/butterfree-gigantamax.png"
  },
  {
    id: "weedle",
    name: "Weedle",
    dex: 13,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/weedle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/weedle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/weedle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/weedle.png"
  },
  {
    id: "kakuna",
    name: "Kakuna",
    dex: 14,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kakuna.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kakuna.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kakuna.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kakuna.png"
  },
  {
    id: "beedrill",
    name: "Beedrill",
    dex: 15,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/beedrill.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/beedrill.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/beedrill.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/beedrill.png"
  },
  {
    id: "mega_beedrill",
    name: "Mega Beedrill",
    dex: 15,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/beedrill-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/beedrill-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/beedrill-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/beedrill-mega.png"
  },
  {
    id: "pidgey",
    name: "Pidgey",
    dex: 16,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pidgey.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pidgey.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pidgey.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pidgey.png"
  },
  {
    id: "pidgeotto",
    name: "Pidgeotto",
    dex: 17,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pidgeotto.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pidgeotto.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pidgeotto.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pidgeotto.png"
  },
  {
    id: "pidgeot",
    name: "Pidgeot",
    dex: 18,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pidgeot.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pidgeot.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pidgeot.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pidgeot.png"
  },
  {
    id: "mega_pidgeot",
    name: "Mega Pidgeot",
    dex: 18,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pidgeot-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pidgeot-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pidgeot-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pidgeot-mega.png"
  },
  {
    id: "rattata",
    name: "Rattata",
    dex: 19,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rattata.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rattata.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rattata-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rattata-f.png"
  },
  {
    id: "alolan_rattata",
    name: "Alolan Rattata",
    dex: 19,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rattata-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rattata-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rattata-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rattata-alolan.png"
  },
  {
    id: "raticate",
    name: "Raticate",
    dex: 20,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/raticate.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/raticate.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/raticate-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/raticate-f.png"
  },
  {
    id: "alolan_raticate",
    name: "Alolan Raticate",
    dex: 20,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/raticate-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/raticate-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/raticate-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/raticate-alolan.png"
  },
  {
    id: "spearow",
    name: "Spearow",
    dex: 21,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spearow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spearow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spearow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spearow.png"
  },
  {
    id: "fearow",
    name: "Fearow",
    dex: 22,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/fearow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/fearow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/fearow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/fearow.png"
  },
  {
    id: "ekans",
    name: "Ekans",
    dex: 23,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ekans.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ekans.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ekans.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ekans.png"
  },
  {
    id: "arbok",
    name: "Arbok",
    dex: 24,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arbok.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arbok.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arbok.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arbok.png"
  },
  {
    id: "pikachu",
    name: "Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pikachu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pikachu-f.png"
  },
  {
    id: "pikachu_rock_star",
    name: "Pikachu Rock Star",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pikachu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pikachu-f.png"
  },
  {
    id: "pikachu_belle",
    name: "Pikachu Belle",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pikachu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pikachu-f.png"
  },
  {
    id: "pikachu_pop_star",
    name: "Pikachu Pop Star",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pikachu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pikachu-f.png"
  },
  {
    id: "pikachu_libre",
    name: "Pikachu Libre",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pikachu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pikachu-f.png"
  },
  {
    id: "cosplay_pikachu",
    name: "Cosplay Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pikachu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pikachu-f.png"
  },
  {
    id: "original_cap_pikachu",
    name: "Original Cap Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-original-cap.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/normal/pikachu-original-cap.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-original-cap.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/normal/pikachu-original-cap.png"
  },
  {
    id: "hoenn_cap_pikachu",
    name: "Hoenn Cap Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-hoenn-cap.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/normal/pikachu-hoenn-cap.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-hoenn-cap.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/normal/pikachu-hoenn-cap.png"
  },
  {
    id: "sinnoh_cap_pikachu",
    name: "Sinnoh Cap Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-sinnoh-cap.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/normal/pikachu-sinnoh-cap.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-sinnoh-cap.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/normal/pikachu-sinnoh-cap.png"
  },
  {
    id: "unova_cap_pikachu",
    name: "Unova Cap Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-unova-cap.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/normal/pikachu-unova-cap.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-unova-cap.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/normal/pikachu-unova-cap.png"
  },
  {
    id: "kalos_cap_pikachu",
    name: "Kalos Cap Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-kalos-cap.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/normal/pikachu-kalos-cap.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-kalos-cap.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/normal/pikachu-kalos-cap.png"
  },
  {
    id: "alola_cap_pikachu",
    name: "Alola Cap Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-alola-cap.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/normal/pikachu-alola-cap.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-alola-cap.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/normal/pikachu-alola-cap.png"
  },
  {
    id: "partner_cap_pikachu",
    name: "Partner Cap Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-partner-cap.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/normal/pikachu-partner-cap.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-partner-cap.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/normal/pikachu-partner-cap.png"
  },
  {
    id: "world_cap_pikachu",
    name: "World Cap Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-world-cap.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/normal/pikachu-world-cap.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-world-cap.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/normal/pikachu-world-cap.png"
  },
  {
    id: "gigantamax_pikachu",
    name: "Gigantamax Pikachu",
    dex: 25,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikachu-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pikachu-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikachu-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pikachu-gigantamax.png"
  },
  {
    id: "raichu",
    name: "Raichu",
    dex: 26,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/raichu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/raichu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/raichu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/raichu-f.png"
  },
  {
    id: "alolan_raichu",
    name: "Alolan Raichu",
    dex: 26,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/raichu-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/raichu-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/raichu-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/raichu-alolan.png"
  },
  {
    id: "mega_raichu_x",
    name: "Mega Raichu X",
    dex: 26,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/6/64/HOME0026MX.png/400px-HOME0026MX.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/b/b9/HOME0026MX_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/6/64/HOME0026MX.png/400px-HOME0026MX.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/b/b9/HOME0026MX_s.png"
  },
  {
    id: "mega_raichu_y",
    name: "Mega Raichu Y",
    dex: 26,
    spriteM: "https://archives.bulbagarden.net/media/upload/6/67/HOME0026MY.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/1/15/HOME0026MY_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/6/67/HOME0026MY.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/1/15/HOME0026MY_s.png"
  },
  {
    id: "sandshrew",
    name: "Sandshrew",
    dex: 27,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandshrew.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandshrew.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandshrew.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandshrew.png"
  },
  {
    id: "alolan_sandshrew",
    name: "Alolan Sandshrew",
    dex: 27,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandshrew-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandshrew-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandshrew-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandshrew-alolan.png"
  },
  {
    id: "sandslash",
    name: "Sandslash",
    dex: 28,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandslash.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandslash.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandslash.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandslash.png"
  },
  {
    id: "alolan_sandslash",
    name: "Alolan Sandslash",
    dex: 28,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandslash-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandslash-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandslash-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandslash-alolan.png"
  },
  {
    id: "nidoran",
    name: "Nidoran♀",
    dex: 29,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nidoran-f.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nidoran-f.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nidoran-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nidoran-f.png"
  },
  {
    id: "nidorina",
    name: "Nidorina",
    dex: 30,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nidorina.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nidorina.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nidorina.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nidorina.png"
  },
  {
    id: "nidoqueen",
    name: "Nidoqueen",
    dex: 31,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nidoqueen.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nidoqueen.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nidoqueen.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nidoqueen.png"
  },
  {
    id: "nidoran_2",
    name: "Nidoran♂",
    dex: 32,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nidoran-m.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nidoran-m.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nidoran-m.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nidoran-m.png"
  },
  {
    id: "nidorino",
    name: "Nidorino",
    dex: 33,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nidorino.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nidorino.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nidorino.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nidorino.png"
  },
  {
    id: "nidoking",
    name: "Nidoking",
    dex: 34,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nidoking.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nidoking.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nidoking.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nidoking.png"
  },
  {
    id: "clefairy",
    name: "Clefairy",
    dex: 35,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/clefairy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/clefairy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/clefairy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/clefairy.png"
  },
  {
    id: "clefable",
    name: "Clefable",
    dex: 36,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/clefable.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/clefable.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/clefable.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/clefable.png"
  },
  {
    id: "mega_clefable",
    name: "Mega Clefable",
    dex: 36,
    spriteM: "https://archives.bulbagarden.net/media/upload/d/df/HOME0036M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/a/a6/HOME0036M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/d/df/HOME0036M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/a/a6/HOME0036M_s.png"
  },
  {
    id: "vulpix",
    name: "Vulpix",
    dex: 37,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vulpix.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vulpix.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vulpix.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vulpix.png"
  },
  {
    id: "alolan_vulpix",
    name: "Alolan Vulpix",
    dex: 37,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vulpix-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vulpix-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vulpix-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vulpix-alolan.png"
  },
  {
    id: "ninetales",
    name: "Ninetales",
    dex: 38,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ninetales.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ninetales.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ninetales.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ninetales.png"
  },
  {
    id: "alolan_ninetales",
    name: "Alolan Ninetales",
    dex: 38,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ninetales-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ninetales-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ninetales-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ninetales-alolan.png"
  },
  {
    id: "jigglypuff",
    name: "Jigglypuff",
    dex: 39,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/jigglypuff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/jigglypuff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/jigglypuff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/jigglypuff.png"
  },
  {
    id: "wigglytuff",
    name: "Wigglytuff",
    dex: 40,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wigglytuff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wigglytuff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wigglytuff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wigglytuff.png"
  },
  {
    id: "zubat",
    name: "Zubat",
    dex: 41,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zubat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zubat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zubat-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zubat-f.png"
  },
  {
    id: "golbat",
    name: "Golbat",
    dex: 42,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/golbat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/golbat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/golbat-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/golbat-f.png"
  },
  {
    id: "oddish",
    name: "Oddish",
    dex: 43,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/oddish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/oddish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/oddish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/oddish.png"
  },
  {
    id: "gloom",
    name: "Gloom",
    dex: 44,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gloom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gloom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gloom-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gloom-f.png"
  },
  {
    id: "vileplume",
    name: "Vileplume",
    dex: 45,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vileplume.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vileplume.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vileplume-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vileplume-f.png"
  },
  {
    id: "paras",
    name: "Paras",
    dex: 46,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/paras.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/paras.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/paras.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/paras.png"
  },
  {
    id: "parasect",
    name: "Parasect",
    dex: 47,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/parasect.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/parasect.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/parasect.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/parasect.png"
  },
  {
    id: "venonat",
    name: "Venonat",
    dex: 48,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/venonat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/venonat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/venonat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/venonat.png"
  },
  {
    id: "venomoth",
    name: "Venomoth",
    dex: 49,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/venomoth.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/venomoth.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/venomoth.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/venomoth.png"
  },
  {
    id: "diglett",
    name: "Diglett",
    dex: 50,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/diglett.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/diglett.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/diglett.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/diglett.png"
  },
  {
    id: "alolan_diglett",
    name: "Alolan Diglett",
    dex: 50,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/diglett-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/diglett-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/diglett-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/diglett-alolan.png"
  },
  {
    id: "dugtrio",
    name: "Dugtrio",
    dex: 51,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dugtrio.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dugtrio.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dugtrio.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dugtrio.png"
  },
  {
    id: "alolan_dugtrio",
    name: "Alolan Dugtrio",
    dex: 51,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dugtrio-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dugtrio-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dugtrio-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dugtrio-alolan.png"
  },
  {
    id: "meowth",
    name: "Meowth",
    dex: 52,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meowth.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meowth.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meowth.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meowth.png"
  },
  {
    id: "alolan_meowth",
    name: "Alolan Meowth",
    dex: 52,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meowth-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meowth-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meowth-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meowth-alolan.png"
  },
  {
    id: "galarian_meowth",
    name: "Galarian Meowth",
    dex: 52,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meowth-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meowth-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meowth-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meowth-galarian.png"
  },
  {
    id: "gigantamax_meowth",
    name: "Gigantamax Meowth",
    dex: 52,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meowth-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meowth-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meowth-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meowth-gigantamax.png"
  },
  {
    id: "persian",
    name: "Persian",
    dex: 53,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/persian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/persian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/persian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/persian.png"
  },
  {
    id: "alolan_persian",
    name: "Alolan Persian",
    dex: 53,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/persian-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/persian-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/persian-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/persian-alolan.png"
  },
  {
    id: "psyduck",
    name: "Psyduck",
    dex: 54,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/psyduck.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/psyduck.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/psyduck.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/psyduck.png"
  },
  {
    id: "golduck",
    name: "Golduck",
    dex: 55,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/golduck.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/golduck.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/golduck.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/golduck.png"
  },
  {
    id: "mankey",
    name: "Mankey",
    dex: 56,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mankey.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mankey.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mankey.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mankey.png"
  },
  {
    id: "primeape",
    name: "Primeape",
    dex: 57,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/primeape.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/primeape.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/primeape.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/primeape.png"
  },
  {
    id: "growlithe",
    name: "Growlithe",
    dex: 58,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/growlithe.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/growlithe.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/growlithe.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/growlithe.png"
  },
  {
    id: "hisuian_growlithe",
    name: "Hisuian Growlithe",
    dex: 58,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/growlithe-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/growlithe-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/growlithe-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/growlithe-hisuian.png"
  },
  {
    id: "arcanine",
    name: "Arcanine",
    dex: 59,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arcanine.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arcanine.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arcanine.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arcanine.png"
  },
  {
    id: "hisuian_arcanine",
    name: "Hisuian Arcanine",
    dex: 59,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arcanine-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arcanine-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arcanine-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arcanine-hisuian.png"
  },
  {
    id: "poliwag",
    name: "Poliwag",
    dex: 60,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/poliwag.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/poliwag.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/poliwag.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/poliwag.png"
  },
  {
    id: "poliwhirl",
    name: "Poliwhirl",
    dex: 61,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/poliwhirl.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/poliwhirl.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/poliwhirl.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/poliwhirl.png"
  },
  {
    id: "poliwrath",
    name: "Poliwrath",
    dex: 62,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/poliwrath.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/poliwrath.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/poliwrath.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/poliwrath.png"
  },
  {
    id: "abra",
    name: "Abra",
    dex: 63,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/abra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/abra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/abra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/abra.png"
  },
  {
    id: "kadabra",
    name: "Kadabra",
    dex: 64,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kadabra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kadabra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kadabra-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kadabra-f.png"
  },
  {
    id: "alakazam",
    name: "Alakazam",
    dex: 65,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alakazam.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alakazam.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alakazam-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alakazam-f.png"
  },
  {
    id: "mega_alakazam",
    name: "Mega Alakazam",
    dex: 65,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alakazam-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alakazam-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alakazam-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alakazam-mega.png"
  },
  {
    id: "machop",
    name: "Machop",
    dex: 66,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/machop.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/machop.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/machop.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/machop.png"
  },
  {
    id: "machoke",
    name: "Machoke",
    dex: 67,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/machoke.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/machoke.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/machoke.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/machoke.png"
  },
  {
    id: "machamp",
    name: "Machamp",
    dex: 68,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/machamp.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/machamp.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/machamp.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/machamp.png"
  },
  {
    id: "gigantamax_machamp",
    name: "Gigantamax Machamp",
    dex: 68,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/machamp-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/machamp-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/machamp-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/machamp-gigantamax.png"
  },
  {
    id: "bellsprout",
    name: "Bellsprout",
    dex: 69,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bellsprout.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bellsprout.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bellsprout.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bellsprout.png"
  },
  {
    id: "weepinbell",
    name: "Weepinbell",
    dex: 70,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/weepinbell.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/weepinbell.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/weepinbell.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/weepinbell.png"
  },
  {
    id: "victreebel",
    name: "Victreebel",
    dex: 71,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/victreebel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/victreebel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/victreebel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/victreebel.png"
  },
  {
    id: "mega_victreebel",
    name: "Mega Victreebel",
    dex: 71,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/0/04/HOME0071M.png/400px-HOME0071M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/e/e6/HOME0071M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/0/04/HOME0071M.png/400px-HOME0071M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/e/e6/HOME0071M_s.png"
  },
  {
    id: "tentacool",
    name: "Tentacool",
    dex: 72,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tentacool.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tentacool.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tentacool.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tentacool.png"
  },
  {
    id: "tentacruel",
    name: "Tentacruel",
    dex: 73,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tentacruel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tentacruel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tentacruel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tentacruel.png"
  },
  {
    id: "geodude",
    name: "Geodude",
    dex: 74,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/geodude.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/geodude.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/geodude.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/geodude.png"
  },
  {
    id: "alolan_geodude",
    name: "Alolan Geodude",
    dex: 74,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/geodude-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/geodude-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/geodude-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/geodude-alolan.png"
  },
  {
    id: "graveler",
    name: "Graveler",
    dex: 75,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/graveler.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/graveler.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/graveler.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/graveler.png"
  },
  {
    id: "alolan_graveler",
    name: "Alolan Graveler",
    dex: 75,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/graveler-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/graveler-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/graveler-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/graveler-alolan.png"
  },
  {
    id: "golem",
    name: "Golem",
    dex: 76,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/golem.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/golem.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/golem.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/golem.png"
  },
  {
    id: "alolan_golem",
    name: "Alolan Golem",
    dex: 76,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/golem-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/golem-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/golem-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/golem-alolan.png"
  },
  {
    id: "ponyta",
    name: "Ponyta",
    dex: 77,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ponyta.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ponyta.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ponyta.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ponyta.png"
  },
  {
    id: "galarian_ponyta",
    name: "Galarian Ponyta",
    dex: 77,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ponyta-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ponyta-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ponyta-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ponyta-galarian.png"
  },
  {
    id: "rapidash",
    name: "Rapidash",
    dex: 78,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rapidash.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rapidash.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rapidash.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rapidash.png"
  },
  {
    id: "galarian_rapidash",
    name: "Galarian Rapidash",
    dex: 78,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rapidash-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rapidash-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rapidash-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rapidash-galarian.png"
  },
  {
    id: "slowpoke",
    name: "Slowpoke",
    dex: 79,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slowpoke.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slowpoke.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slowpoke.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slowpoke.png"
  },
  {
    id: "galarian_slowpoke",
    name: "Galarian Slowpoke",
    dex: 79,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slowpoke-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slowpoke-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slowpoke-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slowpoke-galarian.png"
  },
  {
    id: "slowbro",
    name: "Slowbro",
    dex: 80,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slowbro.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slowbro.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slowbro.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slowbro.png"
  },
  {
    id: "galarian_slowbro",
    name: "Galarian Slowbro",
    dex: 80,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slowbro-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slowbro-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slowbro-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slowbro-galarian.png"
  },
  {
    id: "mega_slowbro",
    name: "Mega Slowbro",
    dex: 80,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slowbro-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slowbro-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slowbro-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slowbro-mega.png"
  },
  {
    id: "magnemite",
    name: "Magnemite",
    dex: 81,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magnemite.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magnemite.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magnemite.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magnemite.png"
  },
  {
    id: "magneton",
    name: "Magneton",
    dex: 82,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magneton.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magneton.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magneton.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magneton.png"
  },
  {
    id: "farfetchd",
    name: "Farfetch'd",
    dex: 83,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/farfetchd.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/farfetchd.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/farfetchd.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/farfetchd.png"
  },
  {
    id: "galarian_farfetchd",
    name: "Galarian Farfetch'd",
    dex: 83,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/farfetchd-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/farfetchd-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/farfetchd-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/farfetchd-galarian.png"
  },
  {
    id: "doduo",
    name: "Doduo",
    dex: 84,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/doduo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/doduo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/doduo-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/doduo-f.png"
  },
  {
    id: "dodrio",
    name: "Dodrio",
    dex: 85,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dodrio.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dodrio.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dodrio-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dodrio-f.png"
  },
  {
    id: "seel",
    name: "Seel",
    dex: 86,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/seel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/seel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/seel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/seel.png"
  },
  {
    id: "dewgong",
    name: "Dewgong",
    dex: 87,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dewgong.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dewgong.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dewgong.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dewgong.png"
  },
  {
    id: "grimer",
    name: "Grimer",
    dex: 88,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grimer.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grimer.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grimer.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grimer.png"
  },
  {
    id: "alolan_grimer",
    name: "Alolan Grimer",
    dex: 88,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grimer-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grimer-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grimer-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grimer-alolan.png"
  },
  {
    id: "muk",
    name: "Muk",
    dex: 89,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/muk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/muk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/muk.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/muk.png"
  },
  {
    id: "alolan_muk",
    name: "Alolan Muk",
    dex: 89,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/muk-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/muk-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/muk-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/muk-alolan.png"
  },
  {
    id: "shellder",
    name: "Shellder",
    dex: 90,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shellder.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shellder.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shellder.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shellder.png"
  },
  {
    id: "cloyster",
    name: "Cloyster",
    dex: 91,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cloyster.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cloyster.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cloyster.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cloyster.png"
  },
  {
    id: "gastly",
    name: "Gastly",
    dex: 92,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gastly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gastly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gastly.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gastly.png"
  },
  {
    id: "haunter",
    name: "Haunter",
    dex: 93,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/haunter.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/haunter.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/haunter.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/haunter.png"
  },
  {
    id: "gengar",
    name: "Gengar",
    dex: 94,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gengar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gengar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gengar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gengar.png"
  },
  {
    id: "mega_gengar",
    name: "Mega Gengar",
    dex: 94,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gengar-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gengar-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gengar-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gengar-mega.png"
  },
  {
    id: "gigantamax_gengar",
    name: "Gigantamax Gengar",
    dex: 94,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gengar-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gengar-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gengar-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gengar-gigantamax.png"
  },
  {
    id: "onix",
    name: "Onix",
    dex: 95,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/onix.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/onix.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/onix.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/onix.png"
  },
  {
    id: "drowzee",
    name: "Drowzee",
    dex: 96,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drowzee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drowzee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drowzee.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drowzee.png"
  },
  {
    id: "hypno",
    name: "Hypno",
    dex: 97,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hypno.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hypno.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hypno-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hypno-f.png"
  },
  {
    id: "krabby",
    name: "Krabby",
    dex: 98,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/krabby.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/krabby.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/krabby.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/krabby.png"
  },
  {
    id: "kingler",
    name: "Kingler",
    dex: 99,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kingler.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kingler.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kingler.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kingler.png"
  },
  {
    id: "gigantamax_kingler",
    name: "Gigantamax Kingler",
    dex: 99,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kingler-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kingler-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kingler-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kingler-gigantamax.png"
  },
  {
    id: "voltorb",
    name: "Voltorb",
    dex: 100,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/voltorb.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/voltorb.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/voltorb.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/voltorb.png"
  },
  {
    id: "hisuian_voltorb",
    name: "Hisuian Voltorb",
    dex: 100,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/voltorb-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/voltorb-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/voltorb-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/voltorb-hisuian.png"
  },
  {
    id: "electrode",
    name: "Electrode",
    dex: 101,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/electrode.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/electrode.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/electrode.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/electrode.png"
  },
  {
    id: "hisuian_electrode",
    name: "Hisuian Electrode",
    dex: 101,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/electrode-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/electrode-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/electrode-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/electrode-hisuian.png"
  },
  {
    id: "exeggcute",
    name: "Exeggcute",
    dex: 102,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/exeggcute.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/exeggcute.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/exeggcute.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/exeggcute.png"
  },
  {
    id: "exeggutor",
    name: "Exeggutor",
    dex: 103,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/exeggutor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/exeggutor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/exeggutor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/exeggutor.png"
  },
  {
    id: "alolan_exeggutor",
    name: "Alolan Exeggutor",
    dex: 103,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/exeggutor-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/exeggutor-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/exeggutor-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/exeggutor-alolan.png"
  },
  {
    id: "cubone",
    name: "Cubone",
    dex: 104,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cubone.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cubone.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cubone.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cubone.png"
  },
  {
    id: "marowak",
    name: "Marowak",
    dex: 105,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/marowak.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/marowak.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/marowak.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/marowak.png"
  },
  {
    id: "alolan_marowak",
    name: "Alolan Marowak",
    dex: 105,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/marowak-alolan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/marowak-alolan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/marowak-alolan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/marowak-alolan.png"
  },
  {
    id: "hitmonlee",
    name: "Hitmonlee",
    dex: 106,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hitmonlee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hitmonlee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hitmonlee.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hitmonlee.png"
  },
  {
    id: "hitmonchan",
    name: "Hitmonchan",
    dex: 107,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hitmonchan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hitmonchan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hitmonchan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hitmonchan.png"
  },
  {
    id: "lickitung",
    name: "Lickitung",
    dex: 108,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lickitung.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lickitung.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lickitung.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lickitung.png"
  },
  {
    id: "koffing",
    name: "Koffing",
    dex: 109,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/koffing.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/koffing.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/koffing.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/koffing.png"
  },
  {
    id: "weezing",
    name: "Weezing",
    dex: 110,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/weezing.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/weezing.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/weezing.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/weezing.png"
  },
  {
    id: "galarian_weezing",
    name: "Galarian Weezing",
    dex: 110,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/weezing-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/weezing-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/weezing-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/weezing-galarian.png"
  },
  {
    id: "rhyhorn",
    name: "Rhyhorn",
    dex: 111,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rhyhorn.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rhyhorn.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rhyhorn-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rhyhorn-f.png"
  },
  {
    id: "rhydon",
    name: "Rhydon",
    dex: 112,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rhydon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rhydon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rhydon-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rhydon-f.png"
  },
  {
    id: "chansey",
    name: "Chansey",
    dex: 113,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chansey.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chansey.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chansey.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chansey.png"
  },
  {
    id: "tangela",
    name: "Tangela",
    dex: 114,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tangela.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tangela.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tangela.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tangela.png"
  },
  {
    id: "kangaskhan",
    name: "Kangaskhan",
    dex: 115,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kangaskhan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kangaskhan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kangaskhan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kangaskhan.png"
  },
  {
    id: "mega_kangaskhan",
    name: "Mega Kangaskhan",
    dex: 115,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kangaskhan-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kangaskhan-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kangaskhan-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kangaskhan-mega.png"
  },
  {
    id: "horsea",
    name: "Horsea",
    dex: 116,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/horsea.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/horsea.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/horsea.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/horsea.png"
  },
  {
    id: "seadra",
    name: "Seadra",
    dex: 117,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/seadra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/seadra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/seadra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/seadra.png"
  },
  {
    id: "goldeen",
    name: "Goldeen",
    dex: 118,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/goldeen.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/goldeen.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/goldeen-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/goldeen-f.png"
  },
  {
    id: "seaking",
    name: "Seaking",
    dex: 119,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/seaking.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/seaking.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/seaking-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/seaking-f.png"
  },
  {
    id: "staryu",
    name: "Staryu",
    dex: 120,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/staryu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/staryu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/staryu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/staryu.png"
  },
  {
    id: "starmie",
    name: "Starmie",
    dex: 121,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/starmie.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/starmie.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/starmie.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/starmie.png"
  },
  {
    id: "mega_starmie",
    name: "Mega Starmie",
    dex: 121,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/4/41/HOME0121M.png/400px-HOME0121M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/0/01/HOME0121M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/4/41/HOME0121M.png/400px-HOME0121M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/0/01/HOME0121M_s.png"
  },
  {
    id: "mr_mime",
    name: "Mr. Mime",
    dex: 122,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mr-mime.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mr-mime.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mr-mime.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mr-mime.png"
  },
  {
    id: "galarian_mr_mime",
    name: "Galarian Mr. Mime",
    dex: 122,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mr-mime-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mr-mime-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mr-mime-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mr-mime-galarian.png"
  },
  {
    id: "scyther",
    name: "Scyther",
    dex: 123,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scyther.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scyther.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scyther-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scyther-f.png"
  },
  {
    id: "jynx",
    name: "Jynx",
    dex: 124,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/jynx.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/jynx.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/jynx.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/jynx.png"
  },
  {
    id: "electabuzz",
    name: "Electabuzz",
    dex: 125,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/electabuzz.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/electabuzz.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/electabuzz.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/electabuzz.png"
  },
  {
    id: "magmar",
    name: "Magmar",
    dex: 126,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magmar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magmar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magmar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magmar.png"
  },
  {
    id: "pinsir",
    name: "Pinsir",
    dex: 127,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pinsir.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pinsir.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pinsir.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pinsir.png"
  },
  {
    id: "mega_pinsir",
    name: "Mega Pinsir",
    dex: 127,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pinsir-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pinsir-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pinsir-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pinsir-mega.png"
  },
  {
    id: "tauros",
    name: "Tauros",
    dex: 128,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tauros.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tauros.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tauros.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tauros.png"
  },
  {
    id: "paldean_tauros_combat_breed",
    name: "Paldean Tauros Combat Breed",
    dex: 128,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tauros-paldean.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tauros-paldean.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tauros-paldean.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tauros-paldean.png"
  },
  {
    id: "paldean_tauros_blaze_breed",
    name: "Paldean Tauros Blaze Breed",
    dex: 128,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tauros-blaze.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tauros-blaze.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tauros-blaze.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tauros-blaze.png"
  },
  {
    id: "paldean_tauros_aqua_breed",
    name: "Paldean Tauros Aqua Breed",
    dex: 128,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tauros-aqua.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tauros-aqua.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tauros-aqua.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tauros-aqua.png"
  },
  {
    id: "magikarp",
    name: "Magikarp",
    dex: 129,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magikarp.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magikarp.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magikarp-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magikarp-f.png"
  },
  {
    id: "gyarados",
    name: "Gyarados",
    dex: 130,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gyarados.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gyarados.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gyarados-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gyarados-f.png"
  },
  {
    id: "mega_gyarados",
    name: "Mega Gyarados",
    dex: 130,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gyarados-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gyarados-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gyarados-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gyarados-mega.png"
  },
  {
    id: "lapras",
    name: "Lapras",
    dex: 131,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lapras.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lapras.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lapras.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lapras.png"
  },
  {
    id: "gigantamax_lapras",
    name: "Gigantamax Lapras",
    dex: 131,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lapras-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lapras-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lapras-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lapras-gigantamax.png"
  },
  {
    id: "ditto",
    name: "Ditto",
    dex: 132,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ditto.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ditto.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ditto.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ditto.png"
  },
  {
    id: "eevee",
    name: "Eevee",
    dex: 133,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eevee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eevee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eevee-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eevee-f.png"
  },
  {
    id: "gigantamax_eevee",
    name: "Gigantamax Eevee",
    dex: 133,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eevee-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eevee-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eevee-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eevee-gigantamax.png"
  },
  {
    id: "vaporeon",
    name: "Vaporeon",
    dex: 134,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vaporeon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vaporeon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vaporeon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vaporeon.png"
  },
  {
    id: "jolteon",
    name: "Jolteon",
    dex: 135,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/jolteon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/jolteon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/jolteon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/jolteon.png"
  },
  {
    id: "flareon",
    name: "Flareon",
    dex: 136,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flareon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flareon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flareon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flareon.png"
  },
  {
    id: "porygon",
    name: "Porygon",
    dex: 137,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/porygon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/porygon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/porygon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/porygon.png"
  },
  {
    id: "omanyte",
    name: "Omanyte",
    dex: 138,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/omanyte.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/omanyte.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/omanyte.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/omanyte.png"
  },
  {
    id: "omastar",
    name: "Omastar",
    dex: 139,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/omastar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/omastar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/omastar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/omastar.png"
  },
  {
    id: "kabuto",
    name: "Kabuto",
    dex: 140,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kabuto.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kabuto.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kabuto.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kabuto.png"
  },
  {
    id: "kabutops",
    name: "Kabutops",
    dex: 141,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kabutops.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kabutops.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kabutops.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kabutops.png"
  },
  {
    id: "aerodactyl",
    name: "Aerodactyl",
    dex: 142,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aerodactyl.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aerodactyl.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aerodactyl.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aerodactyl.png"
  },
  {
    id: "mega_aerodactyl",
    name: "Mega Aerodactyl",
    dex: 142,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aerodactyl-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aerodactyl-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aerodactyl-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aerodactyl-mega.png"
  },
  {
    id: "snorlax",
    name: "Snorlax",
    dex: 143,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/snorlax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/snorlax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/snorlax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/snorlax.png"
  },
  {
    id: "gigantamax_snorlax",
    name: "Gigantamax Snorlax",
    dex: 143,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/snorlax-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/snorlax-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/snorlax-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/snorlax-gigantamax.png"
  },
  {
    id: "articuno",
    name: "Articuno",
    dex: 144,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/articuno.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/articuno.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/articuno.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/articuno.png"
  },
  {
    id: "galarian_articuno",
    name: "Galarian Articuno",
    dex: 144,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/articuno-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/articuno-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/articuno-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/articuno-galarian.png"
  },
  {
    id: "zapdos",
    name: "Zapdos",
    dex: 145,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zapdos.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zapdos.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zapdos.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zapdos.png"
  },
  {
    id: "galarian_zapdos",
    name: "Galarian Zapdos",
    dex: 145,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zapdos-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zapdos-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zapdos-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zapdos-galarian.png"
  },
  {
    id: "moltres",
    name: "Moltres",
    dex: 146,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/moltres.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/moltres.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/moltres.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/moltres.png"
  },
  {
    id: "galarian_moltres",
    name: "Galarian Moltres",
    dex: 146,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/moltres-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/moltres-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/moltres-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/moltres-galarian.png"
  },
  {
    id: "dratini",
    name: "Dratini",
    dex: 147,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dratini.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dratini.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dratini.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dratini.png"
  },
  {
    id: "dragonair",
    name: "Dragonair",
    dex: 148,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dragonair.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dragonair.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dragonair.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dragonair.png"
  },
  {
    id: "dragonite",
    name: "Dragonite",
    dex: 149,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dragonite.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dragonite.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dragonite.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dragonite.png"
  },
  {
    id: "mega_dragonite",
    name: "Mega Dragonite",
    dex: 149,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/8/87/HOME0149M.png/400px-HOME0149M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/e/ee/HOME0149M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/8/87/HOME0149M.png/400px-HOME0149M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/e/ee/HOME0149M_s.png"
  },
  {
    id: "mewtwo",
    name: "Mewtwo",
    dex: 150,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mewtwo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mewtwo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mewtwo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mewtwo.png"
  },
  {
    id: "mega_mewtwo_x",
    name: "Mega Mewtwo X",
    dex: 150,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mewtwo-mega-x.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mewtwo-mega-x.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mewtwo-mega-x.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mewtwo-mega-x.png"
  },
  {
    id: "mega_mewtwo_y",
    name: "Mega Mewtwo Y",
    dex: 150,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mewtwo-mega-y.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mewtwo-mega-y.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mewtwo-mega-y.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mewtwo-mega-y.png"
  },
  {
    id: "mew",
    name: "Mew",
    dex: 151,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mew.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mew.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mew.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mew.png"
  },
  {
    id: "chikorita",
    name: "Chikorita",
    dex: 152,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chikorita.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chikorita.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chikorita.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chikorita.png"
  },
  {
    id: "bayleef",
    name: "Bayleef",
    dex: 153,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bayleef.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bayleef.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bayleef.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bayleef.png"
  },
  {
    id: "meganium",
    name: "Meganium",
    dex: 154,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meganium.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meganium.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meganium-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meganium-f.png"
  },
  {
    id: "mega_meganium",
    name: "Mega Meganium",
    dex: 154,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/6/60/HOME0154M.png/400px-HOME0154M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/a/a2/HOME0154M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/6/60/HOME0154M.png/400px-HOME0154M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/a/a2/HOME0154M_s.png"
  },
  {
    id: "cyndaquil",
    name: "Cyndaquil",
    dex: 155,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cyndaquil.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cyndaquil.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cyndaquil.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cyndaquil.png"
  },
  {
    id: "quilava",
    name: "Quilava",
    dex: 156,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/quilava.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/quilava.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/quilava.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/quilava.png"
  },
  {
    id: "typhlosion",
    name: "Typhlosion",
    dex: 157,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/typhlosion.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/typhlosion.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/typhlosion.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/typhlosion.png"
  },
  {
    id: "hisuian_typhlosion",
    name: "Hisuian Typhlosion",
    dex: 157,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/typhlosion-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/typhlosion-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/typhlosion-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/typhlosion-hisuian.png"
  },
  {
    id: "totodile",
    name: "Totodile",
    dex: 158,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/totodile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/totodile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/totodile.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/totodile.png"
  },
  {
    id: "croconaw",
    name: "Croconaw",
    dex: 159,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/croconaw.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/croconaw.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/croconaw.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/croconaw.png"
  },
  {
    id: "feraligatr",
    name: "Feraligatr",
    dex: 160,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/feraligatr.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/feraligatr.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/feraligatr.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/feraligatr.png"
  },
  {
    id: "mega_feraligatr",
    name: "Mega Feraligatr",
    dex: 160,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/9/9f/HOME0160M.png/400px-HOME0160M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/e/ea/HOME0160M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/9/9f/HOME0160M.png/400px-HOME0160M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/e/ea/HOME0160M_s.png"
  },
  {
    id: "sentret",
    name: "Sentret",
    dex: 161,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sentret.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sentret.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sentret.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sentret.png"
  },
  {
    id: "furret",
    name: "Furret",
    dex: 162,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furret.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furret.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furret.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furret.png"
  },
  {
    id: "hoothoot",
    name: "Hoothoot",
    dex: 163,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hoothoot.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hoothoot.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hoothoot.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hoothoot.png"
  },
  {
    id: "noctowl",
    name: "Noctowl",
    dex: 164,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/noctowl.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/noctowl.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/noctowl.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/noctowl.png"
  },
  {
    id: "ledyba",
    name: "Ledyba",
    dex: 165,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ledyba.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ledyba.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ledyba-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ledyba-f.png"
  },
  {
    id: "ledian",
    name: "Ledian",
    dex: 166,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ledian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ledian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ledian-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ledian-f.png"
  },
  {
    id: "spinarak",
    name: "Spinarak",
    dex: 167,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spinarak.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spinarak.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spinarak.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spinarak.png"
  },
  {
    id: "ariados",
    name: "Ariados",
    dex: 168,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ariados.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ariados.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ariados.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ariados.png"
  },
  {
    id: "crobat",
    name: "Crobat",
    dex: 169,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/crobat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/crobat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/crobat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/crobat.png"
  },
  {
    id: "chinchou",
    name: "Chinchou",
    dex: 170,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chinchou.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chinchou.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chinchou.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chinchou.png"
  },
  {
    id: "lanturn",
    name: "Lanturn",
    dex: 171,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lanturn.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lanturn.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lanturn.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lanturn.png"
  },
  {
    id: "pichu",
    name: "Pichu",
    dex: 172,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pichu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pichu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pichu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pichu.png"
  },
  {
    id: "cleffa",
    name: "Cleffa",
    dex: 173,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cleffa.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cleffa.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cleffa.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cleffa.png"
  },
  {
    id: "igglybuff",
    name: "Igglybuff",
    dex: 174,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/igglybuff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/igglybuff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/igglybuff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/igglybuff.png"
  },
  {
    id: "togepi",
    name: "Togepi",
    dex: 175,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/togepi.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/togepi.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/togepi.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/togepi.png"
  },
  {
    id: "togetic",
    name: "Togetic",
    dex: 176,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/togetic.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/togetic.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/togetic.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/togetic.png"
  },
  {
    id: "natu",
    name: "Natu",
    dex: 177,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/natu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/natu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/natu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/natu.png"
  },
  {
    id: "xatu",
    name: "Xatu",
    dex: 178,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/xatu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/xatu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/xatu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/xatu-f.png"
  },
  {
    id: "mareep",
    name: "Mareep",
    dex: 179,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mareep.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mareep.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mareep.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mareep.png"
  },
  {
    id: "flaaffy",
    name: "Flaaffy",
    dex: 180,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flaaffy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flaaffy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flaaffy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flaaffy.png"
  },
  {
    id: "ampharos",
    name: "Ampharos",
    dex: 181,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ampharos.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ampharos.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ampharos.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ampharos.png"
  },
  {
    id: "mega_ampharos",
    name: "Mega Ampharos",
    dex: 181,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ampharos-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ampharos-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ampharos-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ampharos-mega.png"
  },
  {
    id: "bellossom",
    name: "Bellossom",
    dex: 182,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bellossom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bellossom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bellossom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bellossom.png"
  },
  {
    id: "marill",
    name: "Marill",
    dex: 183,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/marill.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/marill.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/marill.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/marill.png"
  },
  {
    id: "azumarill",
    name: "Azumarill",
    dex: 184,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/azumarill.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/azumarill.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/azumarill.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/azumarill.png"
  },
  {
    id: "sudowoodo",
    name: "Sudowoodo",
    dex: 185,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sudowoodo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sudowoodo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sudowoodo-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sudowoodo-f.png"
  },
  {
    id: "politoed",
    name: "Politoed",
    dex: 186,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/politoed.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/politoed.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/politoed-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/politoed-f.png"
  },
  {
    id: "hoppip",
    name: "Hoppip",
    dex: 187,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hoppip.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hoppip.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hoppip.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hoppip.png"
  },
  {
    id: "skiploom",
    name: "Skiploom",
    dex: 188,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skiploom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skiploom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skiploom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skiploom.png"
  },
  {
    id: "jumpluff",
    name: "Jumpluff",
    dex: 189,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/jumpluff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/jumpluff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/jumpluff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/jumpluff.png"
  },
  {
    id: "aipom",
    name: "Aipom",
    dex: 190,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aipom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aipom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aipom-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aipom-f.png"
  },
  {
    id: "sunkern",
    name: "Sunkern",
    dex: 191,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sunkern.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sunkern.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sunkern.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sunkern.png"
  },
  {
    id: "sunflora",
    name: "Sunflora",
    dex: 192,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sunflora.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sunflora.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sunflora.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sunflora.png"
  },
  {
    id: "yanma",
    name: "Yanma",
    dex: 193,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/yanma.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/yanma.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/yanma.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/yanma.png"
  },
  {
    id: "wooper",
    name: "Wooper",
    dex: 194,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wooper.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wooper.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wooper-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wooper-f.png"
  },
  {
    id: "paldean_wooper",
    name: "Paldean Wooper",
    dex: 194,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wooper-paldean.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wooper-paldean.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wooper-paldean.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wooper-paldean.png"
  },
  {
    id: "quagsire",
    name: "Quagsire",
    dex: 195,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/quagsire.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/quagsire.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/quagsire-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/quagsire-f.png"
  },
  {
    id: "espeon",
    name: "Espeon",
    dex: 196,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/espeon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/espeon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/espeon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/espeon.png"
  },
  {
    id: "umbreon",
    name: "Umbreon",
    dex: 197,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/umbreon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/umbreon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/umbreon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/umbreon.png"
  },
  {
    id: "murkrow",
    name: "Murkrow",
    dex: 198,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/murkrow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/murkrow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/murkrow-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/murkrow-f.png"
  },
  {
    id: "slowking",
    name: "Slowking",
    dex: 199,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slowking.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slowking.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slowking.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slowking.png"
  },
  {
    id: "galarian_slowking",
    name: "Galarian Slowking",
    dex: 199,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slowking-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slowking-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slowking-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slowking-galarian.png"
  },
  {
    id: "misdreavus",
    name: "Misdreavus",
    dex: 200,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/misdreavus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/misdreavus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/misdreavus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/misdreavus.png"
  },
  {
    id: "unown_a",
    name: "Unown A",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-a.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-a.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-a.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-a.png"
  },
  {
    id: "unown_b",
    name: "Unown B",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-b.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-b.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-b.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-b.png"
  },
  {
    id: "unown_c",
    name: "Unown C",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-c.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-c.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-c.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-c.png"
  },
  {
    id: "unown_d",
    name: "Unown D",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-d.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-d.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-d.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-d.png"
  },
  {
    id: "unown_e",
    name: "Unown E",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-e.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-e.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-e.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-e.png"
  },
  {
    id: "unown_f",
    name: "Unown F",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-f.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-f.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-f.png"
  },
  {
    id: "unown_g",
    name: "Unown G",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-g.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-g.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-g.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-g.png"
  },
  {
    id: "unown_h",
    name: "Unown H",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-h.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-h.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-h.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-h.png"
  },
  {
    id: "unown_i",
    name: "Unown I",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-i.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-i.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-i.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-i.png"
  },
  {
    id: "unown_j",
    name: "Unown J",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-j.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-j.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-j.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-j.png"
  },
  {
    id: "unown_k",
    name: "Unown K",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-k.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-k.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-k.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-k.png"
  },
  {
    id: "unown_l",
    name: "Unown L",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-l.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-l.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-l.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-l.png"
  },
  {
    id: "unown_m",
    name: "Unown M",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-m.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-m.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-m.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-m.png"
  },
  {
    id: "unown_n",
    name: "Unown N",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-n.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-n.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-n.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-n.png"
  },
  {
    id: "unown_o",
    name: "Unown O",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-o.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-o.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-o.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-o.png"
  },
  {
    id: "unown_p",
    name: "Unown P",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-p.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-p.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-p.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-p.png"
  },
  {
    id: "unown_q",
    name: "Unown Q",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-q.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-q.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-q.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-q.png"
  },
  {
    id: "unown_r",
    name: "Unown R",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-r.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-r.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-r.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-r.png"
  },
  {
    id: "unown_s",
    name: "Unown S",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-s.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-s.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-s.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-s.png"
  },
  {
    id: "unown_t",
    name: "Unown T",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-t.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-t.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-t.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-t.png"
  },
  {
    id: "unown_u",
    name: "Unown U",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-u.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-u.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-u.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-u.png"
  },
  {
    id: "unown_v",
    name: "Unown V",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-v.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-v.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-v.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-v.png"
  },
  {
    id: "unown_w",
    name: "Unown W",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-w.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-w.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-w.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-w.png"
  },
  {
    id: "unown_x",
    name: "Unown X",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-x.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-x.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-x.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-x.png"
  },
  {
    id: "unown_y",
    name: "Unown Y",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-y.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-y.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-y.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-y.png"
  },
  {
    id: "unown_z",
    name: "Unown Z",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-z.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-z.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-z.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-z.png"
  },
  {
    id: "unown",
    name: "Unown !",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-em.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-em.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-em.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-em.png"
  },
  {
    id: "unown_2",
    name: "Unown ?",
    dex: 201,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unown-qm.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unown-qm.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unown-qm.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unown-qm.png"
  },
  {
    id: "wobbuffet",
    name: "Wobbuffet",
    dex: 202,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wobbuffet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wobbuffet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wobbuffet-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wobbuffet-f.png"
  },
  {
    id: "girafarig",
    name: "Girafarig",
    dex: 203,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/girafarig.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/girafarig.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/girafarig-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/girafarig-f.png"
  },
  {
    id: "pineco",
    name: "Pineco",
    dex: 204,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pineco.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pineco.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pineco.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pineco.png"
  },
  {
    id: "forretress",
    name: "Forretress",
    dex: 205,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/forretress.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/forretress.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/forretress.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/forretress.png"
  },
  {
    id: "dunsparce",
    name: "Dunsparce",
    dex: 206,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dunsparce.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dunsparce.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dunsparce.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dunsparce.png"
  },
  {
    id: "gligar",
    name: "Gligar",
    dex: 207,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gligar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gligar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gligar-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gligar-f.png"
  },
  {
    id: "steelix",
    name: "Steelix",
    dex: 208,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/steelix.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/steelix.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/steelix-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/steelix-f.png"
  },
  {
    id: "mega_steelix",
    name: "Mega Steelix",
    dex: 208,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/steelix-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/steelix-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/steelix-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/steelix-mega.png"
  },
  {
    id: "snubbull",
    name: "Snubbull",
    dex: 209,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/snubbull.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/snubbull.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/snubbull.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/snubbull.png"
  },
  {
    id: "granbull",
    name: "Granbull",
    dex: 210,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/granbull.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/granbull.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/granbull.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/granbull.png"
  },
  {
    id: "qwilfish",
    name: "Qwilfish",
    dex: 211,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/qwilfish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/qwilfish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/qwilfish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/qwilfish.png"
  },
  {
    id: "hisuian_qwilfish",
    name: "Hisuian Qwilfish",
    dex: 211,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/qwilfish-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/qwilfish-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/qwilfish-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/qwilfish-hisuian.png"
  },
  {
    id: "scizor",
    name: "Scizor",
    dex: 212,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scizor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scizor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scizor-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scizor-f.png"
  },
  {
    id: "mega_scizor",
    name: "Mega Scizor",
    dex: 212,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scizor-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scizor-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scizor-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scizor-mega.png"
  },
  {
    id: "shuckle",
    name: "Shuckle",
    dex: 213,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shuckle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shuckle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shuckle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shuckle.png"
  },
  {
    id: "heracross",
    name: "Heracross",
    dex: 214,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/heracross.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/heracross.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/heracross-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/heracross-f.png"
  },
  {
    id: "mega_heracross",
    name: "Mega Heracross",
    dex: 214,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/heracross-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/heracross-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/heracross-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/heracross-mega.png"
  },
  {
    id: "sneasel",
    name: "Sneasel",
    dex: 215,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sneasel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sneasel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sneasel-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sneasel-f.png"
  },
  {
    id: "hisuian_sneasel",
    name: "Hisuian Sneasel",
    dex: 215,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sneasel-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sneasel-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sneasel-hisuian-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sneasel-hisuian-f.png"
  },
  {
    id: "teddiursa",
    name: "Teddiursa",
    dex: 216,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/teddiursa.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/teddiursa.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/teddiursa.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/teddiursa.png"
  },
  {
    id: "ursaring",
    name: "Ursaring",
    dex: 217,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ursaring.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ursaring.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ursaring-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ursaring-f.png"
  },
  {
    id: "slugma",
    name: "Slugma",
    dex: 218,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slugma.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slugma.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slugma.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slugma.png"
  },
  {
    id: "magcargo",
    name: "Magcargo",
    dex: 219,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magcargo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magcargo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magcargo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magcargo.png"
  },
  {
    id: "swinub",
    name: "Swinub",
    dex: 220,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swinub.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swinub.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swinub.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swinub.png"
  },
  {
    id: "piloswine",
    name: "Piloswine",
    dex: 221,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/piloswine.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/piloswine.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/piloswine-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/piloswine-f.png"
  },
  {
    id: "corsola",
    name: "Corsola",
    dex: 222,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/corsola.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/corsola.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/corsola.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/corsola.png"
  },
  {
    id: "galarian_corsola",
    name: "Galarian Corsola",
    dex: 222,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/corsola-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/corsola-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/corsola-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/corsola-galarian.png"
  },
  {
    id: "remoraid",
    name: "Remoraid",
    dex: 223,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/remoraid.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/remoraid.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/remoraid.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/remoraid.png"
  },
  {
    id: "octillery",
    name: "Octillery",
    dex: 224,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/octillery.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/octillery.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/octillery-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/octillery-f.png"
  },
  {
    id: "delibird",
    name: "Delibird",
    dex: 225,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/delibird.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/delibird.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/delibird.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/delibird.png"
  },
  {
    id: "mantine",
    name: "Mantine",
    dex: 226,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mantine.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mantine.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mantine.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mantine.png"
  },
  {
    id: "skarmory",
    name: "Skarmory",
    dex: 227,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skarmory.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skarmory.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skarmory.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skarmory.png"
  },
  {
    id: "mega_skarmory",
    name: "Mega Skarmory",
    dex: 227,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/6/6d/HOME0227M.png/400px-HOME0227M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/8/85/HOME0227M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/6/6d/HOME0227M.png/400px-HOME0227M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/8/85/HOME0227M_s.png"
  },
  {
    id: "houndour",
    name: "Houndour",
    dex: 228,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/houndour.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/houndour.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/houndour.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/houndour.png"
  },
  {
    id: "houndoom",
    name: "Houndoom",
    dex: 229,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/houndoom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/houndoom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/houndoom-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/houndoom-f.png"
  },
  {
    id: "mega_houndoom",
    name: "Mega Houndoom",
    dex: 229,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/houndoom-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/houndoom-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/houndoom-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/houndoom-mega.png"
  },
  {
    id: "kingdra",
    name: "Kingdra",
    dex: 230,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kingdra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kingdra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kingdra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kingdra.png"
  },
  {
    id: "phanpy",
    name: "Phanpy",
    dex: 231,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/phanpy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/phanpy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/phanpy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/phanpy.png"
  },
  {
    id: "donphan",
    name: "Donphan",
    dex: 232,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/donphan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/donphan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/donphan-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/donphan-f.png"
  },
  {
    id: "porygon2",
    name: "Porygon2",
    dex: 233,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/porygon2.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/porygon2.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/porygon2.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/porygon2.png"
  },
  {
    id: "stantler",
    name: "Stantler",
    dex: 234,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/stantler.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/stantler.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/stantler.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/stantler.png"
  },
  {
    id: "smeargle",
    name: "Smeargle",
    dex: 235,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/smeargle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/smeargle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/smeargle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/smeargle.png"
  },
  {
    id: "tyrogue",
    name: "Tyrogue",
    dex: 236,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tyrogue.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tyrogue.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tyrogue.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tyrogue.png"
  },
  {
    id: "hitmontop",
    name: "Hitmontop",
    dex: 237,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hitmontop.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hitmontop.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hitmontop.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hitmontop.png"
  },
  {
    id: "smoochum",
    name: "Smoochum",
    dex: 238,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/smoochum.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/smoochum.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/smoochum.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/smoochum.png"
  },
  {
    id: "elekid",
    name: "Elekid",
    dex: 239,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/elekid.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/elekid.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/elekid.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/elekid.png"
  },
  {
    id: "magby",
    name: "Magby",
    dex: 240,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magby.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magby.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magby.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magby.png"
  },
  {
    id: "miltank",
    name: "Miltank",
    dex: 241,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/miltank.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/miltank.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/miltank.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/miltank.png"
  },
  {
    id: "blissey",
    name: "Blissey",
    dex: 242,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blissey.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blissey.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blissey.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blissey.png"
  },
  {
    id: "raikou",
    name: "Raikou",
    dex: 243,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/raikou.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/raikou.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/raikou.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/raikou.png"
  },
  {
    id: "entei",
    name: "Entei",
    dex: 244,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/entei.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/entei.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/entei.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/entei.png"
  },
  {
    id: "suicune",
    name: "Suicune",
    dex: 245,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/suicune.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/suicune.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/suicune.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/suicune.png"
  },
  {
    id: "larvitar",
    name: "Larvitar",
    dex: 246,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/larvitar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/larvitar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/larvitar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/larvitar.png"
  },
  {
    id: "pupitar",
    name: "Pupitar",
    dex: 247,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pupitar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pupitar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pupitar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pupitar.png"
  },
  {
    id: "tyranitar",
    name: "Tyranitar",
    dex: 248,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tyranitar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tyranitar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tyranitar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tyranitar.png"
  },
  {
    id: "mega_tyranitar",
    name: "Mega Tyranitar",
    dex: 248,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tyranitar-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tyranitar-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tyranitar-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tyranitar-mega.png"
  },
  {
    id: "lugia",
    name: "Lugia",
    dex: 249,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lugia.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lugia.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lugia.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lugia.png"
  },
  {
    id: "ho_oh",
    name: "Ho-Oh",
    dex: 250,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ho-oh.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ho-oh.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ho-oh.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ho-oh.png"
  },
  {
    id: "celebi",
    name: "Celebi",
    dex: 251,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/celebi.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/celebi.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/celebi.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/celebi.png"
  },
  {
    id: "treecko",
    name: "Treecko",
    dex: 252,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/treecko.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/treecko.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/treecko.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/treecko.png"
  },
  {
    id: "grovyle",
    name: "Grovyle",
    dex: 253,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grovyle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grovyle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grovyle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grovyle.png"
  },
  {
    id: "sceptile",
    name: "Sceptile",
    dex: 254,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sceptile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sceptile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sceptile.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sceptile.png"
  },
  {
    id: "mega_sceptile",
    name: "Mega Sceptile",
    dex: 254,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sceptile-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sceptile-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sceptile-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sceptile-mega.png"
  },
  {
    id: "torchic",
    name: "Torchic",
    dex: 255,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/torchic.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/torchic.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/torchic-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/torchic-f.png"
  },
  {
    id: "combusken",
    name: "Combusken",
    dex: 256,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/combusken.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/combusken.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/combusken-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/combusken-f.png"
  },
  {
    id: "blaziken",
    name: "Blaziken",
    dex: 257,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blaziken.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blaziken.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blaziken-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blaziken-f.png"
  },
  {
    id: "mega_blaziken",
    name: "Mega Blaziken",
    dex: 257,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blaziken-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blaziken-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blaziken-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blaziken-mega.png"
  },
  {
    id: "mudkip",
    name: "Mudkip",
    dex: 258,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mudkip.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mudkip.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mudkip.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mudkip.png"
  },
  {
    id: "marshtomp",
    name: "Marshtomp",
    dex: 259,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/marshtomp.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/marshtomp.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/marshtomp.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/marshtomp.png"
  },
  {
    id: "swampert",
    name: "Swampert",
    dex: 260,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swampert.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swampert.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swampert.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swampert.png"
  },
  {
    id: "mega_swampert",
    name: "Mega Swampert",
    dex: 260,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swampert-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swampert-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swampert-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swampert-mega.png"
  },
  {
    id: "poochyena",
    name: "Poochyena",
    dex: 261,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/poochyena.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/poochyena.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/poochyena.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/poochyena.png"
  },
  {
    id: "mightyena",
    name: "Mightyena",
    dex: 262,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mightyena.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mightyena.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mightyena.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mightyena.png"
  },
  {
    id: "zigzagoon",
    name: "Zigzagoon",
    dex: 263,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zigzagoon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zigzagoon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zigzagoon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zigzagoon.png"
  },
  {
    id: "galarian_zigzagoon",
    name: "Galarian Zigzagoon",
    dex: 263,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zigzagoon-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zigzagoon-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zigzagoon-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zigzagoon-galarian.png"
  },
  {
    id: "linoone",
    name: "Linoone",
    dex: 264,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/linoone.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/linoone.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/linoone.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/linoone.png"
  },
  {
    id: "galarian_linoone",
    name: "Galarian Linoone",
    dex: 264,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/linoone-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/linoone-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/linoone-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/linoone-galarian.png"
  },
  {
    id: "wurmple",
    name: "Wurmple",
    dex: 265,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wurmple.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wurmple.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wurmple.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wurmple.png"
  },
  {
    id: "silcoon",
    name: "Silcoon",
    dex: 266,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/silcoon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/silcoon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/silcoon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/silcoon.png"
  },
  {
    id: "beautifly",
    name: "Beautifly",
    dex: 267,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/beautifly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/beautifly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/beautifly-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/beautifly-f.png"
  },
  {
    id: "cascoon",
    name: "Cascoon",
    dex: 268,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cascoon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cascoon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cascoon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cascoon.png"
  },
  {
    id: "dustox",
    name: "Dustox",
    dex: 269,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dustox.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dustox.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dustox-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dustox-f.png"
  },
  {
    id: "lotad",
    name: "Lotad",
    dex: 270,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lotad.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lotad.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lotad.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lotad.png"
  },
  {
    id: "lombre",
    name: "Lombre",
    dex: 271,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lombre.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lombre.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lombre.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lombre.png"
  },
  {
    id: "ludicolo",
    name: "Ludicolo",
    dex: 272,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ludicolo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ludicolo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ludicolo-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ludicolo-f.png"
  },
  {
    id: "seedot",
    name: "Seedot",
    dex: 273,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/seedot.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/seedot.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/seedot.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/seedot.png"
  },
  {
    id: "nuzleaf",
    name: "Nuzleaf",
    dex: 274,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nuzleaf.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nuzleaf.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nuzleaf-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nuzleaf-f.png"
  },
  {
    id: "shiftry",
    name: "Shiftry",
    dex: 275,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shiftry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shiftry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shiftry-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shiftry-f.png"
  },
  {
    id: "taillow",
    name: "Taillow",
    dex: 276,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/taillow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/taillow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/taillow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/taillow.png"
  },
  {
    id: "swellow",
    name: "Swellow",
    dex: 277,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swellow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swellow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swellow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swellow.png"
  },
  {
    id: "wingull",
    name: "Wingull",
    dex: 278,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wingull.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wingull.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wingull.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wingull.png"
  },
  {
    id: "pelipper",
    name: "Pelipper",
    dex: 279,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pelipper.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pelipper.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pelipper.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pelipper.png"
  },
  {
    id: "ralts",
    name: "Ralts",
    dex: 280,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ralts.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ralts.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ralts.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ralts.png"
  },
  {
    id: "kirlia",
    name: "Kirlia",
    dex: 281,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kirlia.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kirlia.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kirlia.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kirlia.png"
  },
  {
    id: "gardevoir",
    name: "Gardevoir",
    dex: 282,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gardevoir.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gardevoir.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gardevoir.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gardevoir.png"
  },
  {
    id: "mega_gardevoir",
    name: "Mega Gardevoir",
    dex: 282,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gardevoir-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gardevoir-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gardevoir-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gardevoir-mega.png"
  },
  {
    id: "surskit",
    name: "Surskit",
    dex: 283,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/surskit.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/surskit.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/surskit.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/surskit.png"
  },
  {
    id: "masquerain",
    name: "Masquerain",
    dex: 284,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/masquerain.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/masquerain.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/masquerain.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/masquerain.png"
  },
  {
    id: "shroomish",
    name: "Shroomish",
    dex: 285,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shroomish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shroomish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shroomish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shroomish.png"
  },
  {
    id: "breloom",
    name: "Breloom",
    dex: 286,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/breloom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/breloom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/breloom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/breloom.png"
  },
  {
    id: "slakoth",
    name: "Slakoth",
    dex: 287,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slakoth.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slakoth.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slakoth.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slakoth.png"
  },
  {
    id: "vigoroth",
    name: "Vigoroth",
    dex: 288,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vigoroth.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vigoroth.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vigoroth.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vigoroth.png"
  },
  {
    id: "slaking",
    name: "Slaking",
    dex: 289,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slaking.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slaking.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slaking.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slaking.png"
  },
  {
    id: "nincada",
    name: "Nincada",
    dex: 290,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nincada.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nincada.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nincada.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nincada.png"
  },
  {
    id: "ninjask",
    name: "Ninjask",
    dex: 291,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ninjask.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ninjask.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ninjask.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ninjask.png"
  },
  {
    id: "shedinja",
    name: "Shedinja",
    dex: 292,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shedinja.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shedinja.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shedinja.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shedinja.png"
  },
  {
    id: "whismur",
    name: "Whismur",
    dex: 293,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/whismur.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/whismur.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/whismur.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/whismur.png"
  },
  {
    id: "loudred",
    name: "Loudred",
    dex: 294,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/loudred.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/loudred.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/loudred.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/loudred.png"
  },
  {
    id: "exploud",
    name: "Exploud",
    dex: 295,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/exploud.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/exploud.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/exploud.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/exploud.png"
  },
  {
    id: "makuhita",
    name: "Makuhita",
    dex: 296,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/makuhita.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/makuhita.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/makuhita.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/makuhita.png"
  },
  {
    id: "hariyama",
    name: "Hariyama",
    dex: 297,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hariyama.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hariyama.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hariyama.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hariyama.png"
  },
  {
    id: "azurill",
    name: "Azurill",
    dex: 298,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/azurill.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/azurill.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/azurill.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/azurill.png"
  },
  {
    id: "nosepass",
    name: "Nosepass",
    dex: 299,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nosepass.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nosepass.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nosepass.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nosepass.png"
  },
  {
    id: "skitty",
    name: "Skitty",
    dex: 300,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skitty.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skitty.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skitty.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skitty.png"
  },
  {
    id: "delcatty",
    name: "Delcatty",
    dex: 301,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/delcatty.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/delcatty.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/delcatty.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/delcatty.png"
  },
  {
    id: "sableye",
    name: "Sableye",
    dex: 302,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sableye.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sableye.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sableye.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sableye.png"
  },
  {
    id: "mega_sableye",
    name: "Mega Sableye",
    dex: 302,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sableye-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sableye-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sableye-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sableye-mega.png"
  },
  {
    id: "mawile",
    name: "Mawile",
    dex: 303,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mawile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mawile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mawile.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mawile.png"
  },
  {
    id: "mega_mawile",
    name: "Mega Mawile",
    dex: 303,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mawile-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mawile-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mawile-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mawile-mega.png"
  },
  {
    id: "aron",
    name: "Aron",
    dex: 304,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aron.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aron.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aron.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aron.png"
  },
  {
    id: "lairon",
    name: "Lairon",
    dex: 305,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lairon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lairon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lairon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lairon.png"
  },
  {
    id: "aggron",
    name: "Aggron",
    dex: 306,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aggron.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aggron.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aggron.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aggron.png"
  },
  {
    id: "mega_aggron",
    name: "Mega Aggron",
    dex: 306,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aggron-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aggron-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aggron-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aggron-mega.png"
  },
  {
    id: "meditite",
    name: "Meditite",
    dex: 307,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meditite.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meditite.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meditite-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meditite-f.png"
  },
  {
    id: "medicham",
    name: "Medicham",
    dex: 308,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/medicham.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/medicham.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/medicham-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/medicham-f.png"
  },
  {
    id: "mega_medicham",
    name: "Mega Medicham",
    dex: 308,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/medicham-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/medicham-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/medicham-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/medicham-mega.png"
  },
  {
    id: "electrike",
    name: "Electrike",
    dex: 309,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/electrike.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/electrike.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/electrike.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/electrike.png"
  },
  {
    id: "manectric",
    name: "Manectric",
    dex: 310,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/manectric.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/manectric.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/manectric.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/manectric.png"
  },
  {
    id: "mega_manectric",
    name: "Mega Manectric",
    dex: 310,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/manectric-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/manectric-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/manectric-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/manectric-mega.png"
  },
  {
    id: "plusle",
    name: "Plusle",
    dex: 311,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/plusle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/plusle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/plusle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/plusle.png"
  },
  {
    id: "minun",
    name: "Minun",
    dex: 312,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minun.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minun.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minun.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minun.png"
  },
  {
    id: "volbeat",
    name: "Volbeat",
    dex: 313,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/volbeat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/volbeat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/volbeat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/volbeat.png"
  },
  {
    id: "illumise",
    name: "Illumise",
    dex: 314,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/illumise.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/illumise.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/illumise.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/illumise.png"
  },
  {
    id: "roselia",
    name: "Roselia",
    dex: 315,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/roselia.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/roselia.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/roselia-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/roselia-f.png"
  },
  {
    id: "gulpin",
    name: "Gulpin",
    dex: 316,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gulpin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gulpin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gulpin-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gulpin-f.png"
  },
  {
    id: "swalot",
    name: "Swalot",
    dex: 317,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swalot.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swalot.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swalot-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swalot-f.png"
  },
  {
    id: "carvanha",
    name: "Carvanha",
    dex: 318,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/carvanha.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/carvanha.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/carvanha.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/carvanha.png"
  },
  {
    id: "sharpedo",
    name: "Sharpedo",
    dex: 319,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sharpedo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sharpedo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sharpedo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sharpedo.png"
  },
  {
    id: "mega_sharpedo",
    name: "Mega Sharpedo",
    dex: 319,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sharpedo-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sharpedo-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sharpedo-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sharpedo-mega.png"
  },
  {
    id: "wailmer",
    name: "Wailmer",
    dex: 320,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wailmer.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wailmer.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wailmer.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wailmer.png"
  },
  {
    id: "wailord",
    name: "Wailord",
    dex: 321,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wailord.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wailord.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wailord.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wailord.png"
  },
  {
    id: "numel",
    name: "Numel",
    dex: 322,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/numel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/numel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/numel-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/numel-f.png"
  },
  {
    id: "camerupt",
    name: "Camerupt",
    dex: 323,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/camerupt.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/camerupt.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/camerupt-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/camerupt-f.png"
  },
  {
    id: "mega_camerupt",
    name: "Mega Camerupt",
    dex: 323,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/camerupt-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/camerupt-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/camerupt-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/camerupt-mega.png"
  },
  {
    id: "torkoal",
    name: "Torkoal",
    dex: 324,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/torkoal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/torkoal.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/torkoal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/torkoal.png"
  },
  {
    id: "spoink",
    name: "Spoink",
    dex: 325,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spoink.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spoink.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spoink.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spoink.png"
  },
  {
    id: "grumpig",
    name: "Grumpig",
    dex: 326,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grumpig.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grumpig.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grumpig.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grumpig.png"
  },
  {
    id: "spinda",
    name: "Spinda",
    dex: 327,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spinda.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spinda.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spinda.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spinda.png"
  },
  {
    id: "trapinch",
    name: "Trapinch",
    dex: 328,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/trapinch.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/trapinch.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/trapinch.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/trapinch.png"
  },
  {
    id: "vibrava",
    name: "Vibrava",
    dex: 329,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vibrava.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vibrava.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vibrava.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vibrava.png"
  },
  {
    id: "flygon",
    name: "Flygon",
    dex: 330,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flygon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flygon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flygon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flygon.png"
  },
  {
    id: "cacnea",
    name: "Cacnea",
    dex: 331,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cacnea.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cacnea.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cacnea.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cacnea.png"
  },
  {
    id: "cacturne",
    name: "Cacturne",
    dex: 332,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cacturne.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cacturne.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cacturne-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cacturne-f.png"
  },
  {
    id: "swablu",
    name: "Swablu",
    dex: 333,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swablu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swablu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swablu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swablu.png"
  },
  {
    id: "altaria",
    name: "Altaria",
    dex: 334,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/altaria.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/altaria.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/altaria.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/altaria.png"
  },
  {
    id: "mega_altaria",
    name: "Mega Altaria",
    dex: 334,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/altaria-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/altaria-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/altaria-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/altaria-mega.png"
  },
  {
    id: "zangoose",
    name: "Zangoose",
    dex: 335,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zangoose.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zangoose.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zangoose.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zangoose.png"
  },
  {
    id: "seviper",
    name: "Seviper",
    dex: 336,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/seviper.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/seviper.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/seviper.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/seviper.png"
  },
  {
    id: "lunatone",
    name: "Lunatone",
    dex: 337,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lunatone.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lunatone.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lunatone.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lunatone.png"
  },
  {
    id: "solrock",
    name: "Solrock",
    dex: 338,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/solrock.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/solrock.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/solrock.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/solrock.png"
  },
  {
    id: "barboach",
    name: "Barboach",
    dex: 339,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/barboach.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/barboach.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/barboach.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/barboach.png"
  },
  {
    id: "whiscash",
    name: "Whiscash",
    dex: 340,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/whiscash.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/whiscash.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/whiscash.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/whiscash.png"
  },
  {
    id: "corphish",
    name: "Corphish",
    dex: 341,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/corphish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/corphish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/corphish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/corphish.png"
  },
  {
    id: "crawdaunt",
    name: "Crawdaunt",
    dex: 342,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/crawdaunt.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/crawdaunt.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/crawdaunt.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/crawdaunt.png"
  },
  {
    id: "baltoy",
    name: "Baltoy",
    dex: 343,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/baltoy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/baltoy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/baltoy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/baltoy.png"
  },
  {
    id: "claydol",
    name: "Claydol",
    dex: 344,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/claydol.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/claydol.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/claydol.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/claydol.png"
  },
  {
    id: "lileep",
    name: "Lileep",
    dex: 345,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lileep.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lileep.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lileep.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lileep.png"
  },
  {
    id: "cradily",
    name: "Cradily",
    dex: 346,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cradily.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cradily.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cradily.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cradily.png"
  },
  {
    id: "anorith",
    name: "Anorith",
    dex: 347,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/anorith.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/anorith.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/anorith.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/anorith.png"
  },
  {
    id: "armaldo",
    name: "Armaldo",
    dex: 348,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/armaldo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/armaldo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/armaldo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/armaldo.png"
  },
  {
    id: "feebas",
    name: "Feebas",
    dex: 349,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/feebas.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/feebas.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/feebas.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/feebas.png"
  },
  {
    id: "milotic",
    name: "Milotic",
    dex: 350,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/milotic.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/milotic.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/milotic-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/milotic-f.png"
  },
  {
    id: "castform",
    name: "Castform",
    dex: 351,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/castform.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/castform.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/castform.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/castform.png"
  },
  {
    id: "castform_sunny_form",
    name: "Sunny Form Castform",
    dex: 351,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/castform-sunny.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/castform-sunny.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/castform-sunny.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/castform-sunny.png"
  },
  {
    id: "castform_rainy_form",
    name: "Rainy Form Castform",
    dex: 351,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/castform-rainy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/castform-rainy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/castform-rainy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/castform-rainy.png"
  },
  {
    id: "castform_snowy_form",
    name: "Snowy Form Castform",
    dex: 351,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/castform-snowy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/castform-snowy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/castform-snowy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/castform-snowy.png"
  },
  {
    id: "kecleon",
    name: "Kecleon",
    dex: 352,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kecleon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kecleon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kecleon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kecleon.png"
  },
  {
    id: "shuppet",
    name: "Shuppet",
    dex: 353,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shuppet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shuppet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shuppet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shuppet.png"
  },
  {
    id: "banette",
    name: "Banette",
    dex: 354,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/banette.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/banette.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/banette.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/banette.png"
  },
  {
    id: "mega_banette",
    name: "Mega Banette",
    dex: 354,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/banette-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/banette-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/banette-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/banette-mega.png"
  },
  {
    id: "duskull",
    name: "Duskull",
    dex: 355,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/duskull.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/duskull.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/duskull.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/duskull.png"
  },
  {
    id: "dusclops",
    name: "Dusclops",
    dex: 356,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dusclops.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dusclops.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dusclops.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dusclops.png"
  },
  {
    id: "tropius",
    name: "Tropius",
    dex: 357,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tropius.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tropius.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tropius.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tropius.png"
  },
  {
    id: "chimecho",
    name: "Chimecho",
    dex: 358,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chimecho.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chimecho.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chimecho.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chimecho.png"
  },
  {
    id: "mega_chimecho",
    name: "Mega Chimecho",
    dex: 358,
    spriteM: "https://archives.bulbagarden.net/media/upload/7/7d/HOME0358M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/e/e8/HOME0358M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/7/7d/HOME0358M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/e/e8/HOME0358M_s.png"
  },
  {
    id: "absol",
    name: "Absol",
    dex: 359,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/absol.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/absol.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/absol.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/absol.png"
  },
  {
    id: "mega_absol",
    name: "Mega Absol",
    dex: 359,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/absol-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/absol-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/absol-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/absol-mega.png"
  },
  {
    id: "mega_absol_z",
    name: "Mega Absol Z",
    dex: 359,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/1/14/HOME0359MZ.png/400px-HOME0359MZ.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/5/5c/HOME0359MZ_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/1/14/HOME0359MZ.png/400px-HOME0359MZ.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/5/5c/HOME0359MZ_s.png"
  },
  {
    id: "wynaut",
    name: "Wynaut",
    dex: 360,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wynaut.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wynaut.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wynaut.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wynaut.png"
  },
  {
    id: "snorunt",
    name: "Snorunt",
    dex: 361,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/snorunt.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/snorunt.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/snorunt.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/snorunt.png"
  },
  {
    id: "glalie",
    name: "Glalie",
    dex: 362,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/glalie.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/glalie.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/glalie.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/glalie.png"
  },
  {
    id: "mega_glalie",
    name: "Mega Glalie",
    dex: 362,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/glalie-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/glalie-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/glalie-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/glalie-mega.png"
  },
  {
    id: "spheal",
    name: "Spheal",
    dex: 363,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spheal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spheal.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spheal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spheal.png"
  },
  {
    id: "sealeo",
    name: "Sealeo",
    dex: 364,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sealeo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sealeo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sealeo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sealeo.png"
  },
  {
    id: "walrein",
    name: "Walrein",
    dex: 365,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/walrein.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/walrein.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/walrein.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/walrein.png"
  },
  {
    id: "clamperl",
    name: "Clamperl",
    dex: 366,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/clamperl.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/clamperl.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/clamperl.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/clamperl.png"
  },
  {
    id: "huntail",
    name: "Huntail",
    dex: 367,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/huntail.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/huntail.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/huntail.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/huntail.png"
  },
  {
    id: "gorebyss",
    name: "Gorebyss",
    dex: 368,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gorebyss.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gorebyss.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gorebyss.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gorebyss.png"
  },
  {
    id: "relicanth",
    name: "Relicanth",
    dex: 369,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/relicanth.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/relicanth.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/relicanth-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/relicanth-f.png"
  },
  {
    id: "luvdisc",
    name: "Luvdisc",
    dex: 370,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/luvdisc.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/luvdisc.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/luvdisc.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/luvdisc.png"
  },
  {
    id: "bagon",
    name: "Bagon",
    dex: 371,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bagon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bagon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bagon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bagon.png"
  },
  {
    id: "shelgon",
    name: "Shelgon",
    dex: 372,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shelgon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shelgon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shelgon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shelgon.png"
  },
  {
    id: "salamence",
    name: "Salamence",
    dex: 373,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/salamence.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/salamence.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/salamence.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/salamence.png"
  },
  {
    id: "mega_salamence",
    name: "Mega Salamence",
    dex: 373,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/salamence-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/salamence-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/salamence-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/salamence-mega.png"
  },
  {
    id: "beldum",
    name: "Beldum",
    dex: 374,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/beldum.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/beldum.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/beldum.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/beldum.png"
  },
  {
    id: "metang",
    name: "Metang",
    dex: 375,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/metang.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/metang.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/metang.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/metang.png"
  },
  {
    id: "metagross",
    name: "Metagross",
    dex: 376,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/metagross.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/metagross.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/metagross.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/metagross.png"
  },
  {
    id: "mega_metagross",
    name: "Mega Metagross",
    dex: 376,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/metagross-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/metagross-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/metagross-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/metagross-mega.png"
  },
  {
    id: "regirock",
    name: "Regirock",
    dex: 377,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/regirock.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/regirock.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/regirock.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/regirock.png"
  },
  {
    id: "regice",
    name: "Regice",
    dex: 378,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/regice.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/regice.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/regice.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/regice.png"
  },
  {
    id: "registeel",
    name: "Registeel",
    dex: 379,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/registeel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/registeel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/registeel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/registeel.png"
  },
  {
    id: "latias",
    name: "Latias",
    dex: 380,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/latias.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/latias.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/latias.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/latias.png"
  },
  {
    id: "mega_latias",
    name: "Mega Latias",
    dex: 380,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/latias-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/latias-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/latias-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/latias-mega.png"
  },
  {
    id: "latios",
    name: "Latios",
    dex: 381,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/latios.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/latios.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/latios.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/latios.png"
  },
  {
    id: "mega_latios",
    name: "Mega Latios",
    dex: 381,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/latios-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/latios-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/latios-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/latios-mega.png"
  },
  {
    id: "kyogre",
    name: "Kyogre",
    dex: 382,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kyogre.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kyogre.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kyogre.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kyogre.png"
  },
  {
    id: "primal_kyogre",
    name: "Primal Kyogre",
    dex: 382,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kyogre-primal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kyogre-primal.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kyogre-primal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kyogre-primal.png"
  },
  {
    id: "groudon",
    name: "Groudon",
    dex: 383,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/groudon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/groudon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/groudon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/groudon.png"
  },
  {
    id: "primal_groudon",
    name: "Primal Groudon",
    dex: 383,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/groudon-primal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/groudon-primal.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/groudon-primal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/groudon-primal.png"
  },
  {
    id: "rayquaza",
    name: "Rayquaza",
    dex: 384,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rayquaza.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rayquaza.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rayquaza.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rayquaza.png"
  },
  {
    id: "mega_rayquaza",
    name: "Mega Rayquaza",
    dex: 384,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rayquaza-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rayquaza-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rayquaza-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rayquaza-mega.png"
  },
  {
    id: "jirachi",
    name: "Jirachi",
    dex: 385,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/jirachi.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/jirachi.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/jirachi.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/jirachi.png"
  },
  {
    id: "deoxys_normal_forme",
    name: "Normal Forme Deoxys",
    dex: 386,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deoxys.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deoxys.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deoxys.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deoxys.png"
  },
  {
    id: "deoxys_attack_forme",
    name: "Attack Forme Deoxys",
    dex: 386,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deoxys-attack.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deoxys-attack.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deoxys-attack.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deoxys-attack.png"
  },
  {
    id: "deoxys_defense_forme",
    name: "Defense Forme Deoxys",
    dex: 386,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deoxys-defense.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deoxys-defense.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deoxys-defense.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deoxys-defense.png"
  },
  {
    id: "deoxys_speed_forme",
    name: "Speed Forme Deoxys",
    dex: 386,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deoxys-speed.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deoxys-speed.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deoxys-speed.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deoxys-speed.png"
  },
  {
    id: "turtwig",
    name: "Turtwig",
    dex: 387,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/turtwig.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/turtwig.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/turtwig.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/turtwig.png"
  },
  {
    id: "grotle",
    name: "Grotle",
    dex: 388,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grotle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grotle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grotle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grotle.png"
  },
  {
    id: "torterra",
    name: "Torterra",
    dex: 389,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/torterra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/torterra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/torterra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/torterra.png"
  },
  {
    id: "chimchar",
    name: "Chimchar",
    dex: 390,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chimchar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chimchar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chimchar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chimchar.png"
  },
  {
    id: "monferno",
    name: "Monferno",
    dex: 391,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/monferno.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/monferno.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/monferno.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/monferno.png"
  },
  {
    id: "infernape",
    name: "Infernape",
    dex: 392,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/infernape.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/infernape.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/infernape.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/infernape.png"
  },
  {
    id: "piplup",
    name: "Piplup",
    dex: 393,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/piplup.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/piplup.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/piplup.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/piplup.png"
  },
  {
    id: "prinplup",
    name: "Prinplup",
    dex: 394,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/prinplup.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/prinplup.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/prinplup.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/prinplup.png"
  },
  {
    id: "empoleon",
    name: "Empoleon",
    dex: 395,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/empoleon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/empoleon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/empoleon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/empoleon.png"
  },
  {
    id: "starly",
    name: "Starly",
    dex: 396,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/starly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/starly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/starly-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/starly-f.png"
  },
  {
    id: "staravia",
    name: "Staravia",
    dex: 397,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/staravia.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/staravia.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/staravia-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/staravia-f.png"
  },
  {
    id: "staraptor",
    name: "Staraptor",
    dex: 398,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/staraptor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/staraptor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/staraptor-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/staraptor-f.png"
  },
  {
    id: "mega_staraptor",
    name: "Mega Staraptor",
    dex: 398,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/c/c9/HOME0398M.png/400px-HOME0398M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/4/49/HOME0398M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/c/c9/HOME0398M.png/400px-HOME0398M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/4/49/HOME0398M_s.png"
  },
  {
    id: "bidoof",
    name: "Bidoof",
    dex: 399,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bidoof.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bidoof.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bidoof-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bidoof-f.png"
  },
  {
    id: "bibarel",
    name: "Bibarel",
    dex: 400,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bibarel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bibarel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bibarel-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bibarel-f.png"
  },
  {
    id: "kricketot",
    name: "Kricketot",
    dex: 401,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kricketot.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kricketot.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kricketot-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kricketot-f.png"
  },
  {
    id: "kricketune",
    name: "Kricketune",
    dex: 402,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kricketune.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kricketune.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kricketune-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kricketune-f.png"
  },
  {
    id: "shinx",
    name: "Shinx",
    dex: 403,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shinx.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shinx.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shinx-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shinx-f.png"
  },
  {
    id: "luxio",
    name: "Luxio",
    dex: 404,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/luxio.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/luxio.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/luxio-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/luxio-f.png"
  },
  {
    id: "luxray",
    name: "Luxray",
    dex: 405,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/luxray.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/luxray.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/luxray-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/luxray-f.png"
  },
  {
    id: "budew",
    name: "Budew",
    dex: 406,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/budew.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/budew.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/budew.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/budew.png"
  },
  {
    id: "roserade",
    name: "Roserade",
    dex: 407,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/roserade.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/roserade.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/roserade-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/roserade-f.png"
  },
  {
    id: "cranidos",
    name: "Cranidos",
    dex: 408,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cranidos.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cranidos.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cranidos.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cranidos.png"
  },
  {
    id: "rampardos",
    name: "Rampardos",
    dex: 409,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rampardos.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rampardos.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rampardos.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rampardos.png"
  },
  {
    id: "shieldon",
    name: "Shieldon",
    dex: 410,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shieldon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shieldon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shieldon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shieldon.png"
  },
  {
    id: "bastiodon",
    name: "Bastiodon",
    dex: 411,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bastiodon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bastiodon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bastiodon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bastiodon.png"
  },
  {
    id: "burmy_plant_cloak",
    name: "Plant Cloak Burmy",
    dex: 412,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/burmy-plant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/burmy-plant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/burmy-plant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/burmy-plant.png"
  },
  {
    id: "burmy_sandy_cloak",
    name: "Sandy Cloak Burmy",
    dex: 412,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/burmy-sandy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/burmy-sandy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/burmy-sandy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/burmy-sandy.png"
  },
  {
    id: "burmy_trash_cloak",
    name: "Trash Cloak Burmy",
    dex: 412,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/burmy-trash.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/burmy-trash.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/burmy-trash.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/burmy-trash.png"
  },
  {
    id: "wormadam_plant_cloak",
    name: "Plant Cloak Wormadam",
    dex: 413,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wormadam-plant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wormadam-plant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wormadam-plant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wormadam-plant.png"
  },
  {
    id: "wormadam_sandy_cloak",
    name: "Sandy Cloak Wormadam",
    dex: 413,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wormadam-sandy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wormadam-sandy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wormadam-sandy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wormadam-sandy.png"
  },
  {
    id: "wormadam_trash_cloak",
    name: "Trash Cloak Wormadam",
    dex: 413,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wormadam-trash.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wormadam-trash.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wormadam-trash.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wormadam-trash.png"
  },
  {
    id: "mothim",
    name: "Mothim",
    dex: 414,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mothim.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mothim.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mothim.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mothim.png"
  },
  {
    id: "combee",
    name: "Combee",
    dex: 415,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/combee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/combee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/combee-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/combee-f.png"
  },
  {
    id: "vespiquen",
    name: "Vespiquen",
    dex: 416,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vespiquen.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vespiquen.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vespiquen.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vespiquen.png"
  },
  {
    id: "pachirisu",
    name: "Pachirisu",
    dex: 417,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pachirisu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pachirisu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pachirisu-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pachirisu-f.png"
  },
  {
    id: "buizel",
    name: "Buizel",
    dex: 418,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/buizel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/buizel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/buizel-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/buizel-f.png"
  },
  {
    id: "floatzel",
    name: "Floatzel",
    dex: 419,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/floatzel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/floatzel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/floatzel-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/floatzel-f.png"
  },
  {
    id: "cherubi",
    name: "Cherubi",
    dex: 420,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cherubi.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cherubi.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cherubi.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cherubi.png"
  },
  {
    id: "cherrim_overcast_form",
    name: "Overcast Form Cherrim",
    dex: 421,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cherrim.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cherrim.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cherrim.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cherrim.png"
  },
  {
    id: "west_sea_shellos",
    name: "West Sea Shellos",
    dex: 422,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shellos-west.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shellos-west.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shellos-west.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shellos-west.png"
  },
  {
    id: "east_sea_shellos",
    name: "East Sea Shellos",
    dex: 422,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shellos-east.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shellos-east.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shellos-east.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shellos-east.png"
  },
  {
    id: "west_sea_gastrodon",
    name: "West Sea Gastrodon",
    dex: 423,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gastrodon-west.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gastrodon-west.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gastrodon-west.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gastrodon-west.png"
  },
  {
    id: "east_sea_gastrodon",
    name: "East Sea Gastrodon",
    dex: 423,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gastrodon-east.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gastrodon-east.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gastrodon-east.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gastrodon-east.png"
  },
  {
    id: "ambipom",
    name: "Ambipom",
    dex: 424,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ambipom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ambipom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ambipom-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ambipom-f.png"
  },
  {
    id: "drifloon",
    name: "Drifloon",
    dex: 425,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drifloon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drifloon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drifloon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drifloon.png"
  },
  {
    id: "drifblim",
    name: "Drifblim",
    dex: 426,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drifblim.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drifblim.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drifblim.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drifblim.png"
  },
  {
    id: "buneary",
    name: "Buneary",
    dex: 427,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/buneary.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/buneary.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/buneary.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/buneary.png"
  },
  {
    id: "lopunny",
    name: "Lopunny",
    dex: 428,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lopunny.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lopunny.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lopunny.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lopunny.png"
  },
  {
    id: "mega_lopunny",
    name: "Mega Lopunny",
    dex: 428,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lopunny-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lopunny-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lopunny-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lopunny-mega.png"
  },
  {
    id: "mismagius",
    name: "Mismagius",
    dex: 429,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mismagius.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mismagius.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mismagius.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mismagius.png"
  },
  {
    id: "honchkrow",
    name: "Honchkrow",
    dex: 430,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/honchkrow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/honchkrow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/honchkrow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/honchkrow.png"
  },
  {
    id: "glameow",
    name: "Glameow",
    dex: 431,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/glameow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/glameow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/glameow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/glameow.png"
  },
  {
    id: "purugly",
    name: "Purugly",
    dex: 432,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/purugly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/purugly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/purugly.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/purugly.png"
  },
  {
    id: "chingling",
    name: "Chingling",
    dex: 433,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chingling.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chingling.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chingling.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chingling.png"
  },
  {
    id: "stunky",
    name: "Stunky",
    dex: 434,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/stunky.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/stunky.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/stunky.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/stunky.png"
  },
  {
    id: "skuntank",
    name: "Skuntank",
    dex: 435,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skuntank.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skuntank.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skuntank.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skuntank.png"
  },
  {
    id: "bronzor",
    name: "Bronzor",
    dex: 436,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bronzor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bronzor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bronzor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bronzor.png"
  },
  {
    id: "bronzong",
    name: "Bronzong",
    dex: 437,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bronzong.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bronzong.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bronzong.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bronzong.png"
  },
  {
    id: "bonsly",
    name: "Bonsly",
    dex: 438,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bonsly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bonsly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bonsly.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bonsly.png"
  },
  {
    id: "mime_jr",
    name: "Mime Jr.",
    dex: 439,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mime-jr.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mime-jr.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mime-jr.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mime-jr.png"
  },
  {
    id: "happiny",
    name: "Happiny",
    dex: 440,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/happiny.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/happiny.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/happiny.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/happiny.png"
  },
  {
    id: "chatot",
    name: "Chatot",
    dex: 441,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chatot.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chatot.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chatot.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chatot.png"
  },
  {
    id: "spiritomb",
    name: "Spiritomb",
    dex: 442,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spiritomb.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spiritomb.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spiritomb.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spiritomb.png"
  },
  {
    id: "gible",
    name: "Gible",
    dex: 443,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gible.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gible.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gible-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gible-f.png"
  },
  {
    id: "gabite",
    name: "Gabite",
    dex: 444,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gabite.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gabite.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gabite-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gabite-f.png"
  },
  {
    id: "garchomp",
    name: "Garchomp",
    dex: 445,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/garchomp.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/garchomp.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/garchomp-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/garchomp-f.png"
  },
  {
    id: "mega_garchomp",
    name: "Mega Garchomp",
    dex: 445,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/garchomp-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/garchomp-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/garchomp-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/garchomp-mega.png"
  },
  {
    id: "mega_garchomp_z",
    name: "Mega Garchomp Z",
    dex: 445,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/6/6a/HOME0445MZ.png/400px-HOME0445MZ.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/a/a9/HOME0445MZ_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/6/6a/HOME0445MZ.png/400px-HOME0445MZ.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/a/a9/HOME0445MZ_s.png"
  },
  {
    id: "munchlax",
    name: "Munchlax",
    dex: 446,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/munchlax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/munchlax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/munchlax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/munchlax.png"
  },
  {
    id: "riolu",
    name: "Riolu",
    dex: 447,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/riolu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/riolu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/riolu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/riolu.png"
  },
  {
    id: "lucario",
    name: "Lucario",
    dex: 448,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lucario.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lucario.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lucario.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lucario.png"
  },
  {
    id: "mega_lucario",
    name: "Mega Lucario",
    dex: 448,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lucario-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lucario-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lucario-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lucario-mega.png"
  },
  {
    id: "mega_lucario_z",
    name: "Mega Lucario Z",
    dex: 448,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/4/4e/HOME0448MZ.png/400px-HOME0448MZ.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/3/39/HOME0448MZ_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/4/4e/HOME0448MZ.png/400px-HOME0448MZ.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/3/39/HOME0448MZ_s.png"
  },
  {
    id: "hippopotas",
    name: "Hippopotas",
    dex: 449,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hippopotas.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hippopotas.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hippopotas-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hippopotas-f.png"
  },
  {
    id: "hippowdon",
    name: "Hippowdon",
    dex: 450,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hippowdon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hippowdon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hippowdon-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hippowdon-f.png"
  },
  {
    id: "skorupi",
    name: "Skorupi",
    dex: 451,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skorupi.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skorupi.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skorupi.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skorupi.png"
  },
  {
    id: "drapion",
    name: "Drapion",
    dex: 452,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drapion.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drapion.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drapion.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drapion.png"
  },
  {
    id: "croagunk",
    name: "Croagunk",
    dex: 453,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/croagunk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/croagunk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/croagunk-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/croagunk-f.png"
  },
  {
    id: "toxicroak",
    name: "Toxicroak",
    dex: 454,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toxicroak.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toxicroak.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toxicroak-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toxicroak-f.png"
  },
  {
    id: "carnivine",
    name: "Carnivine",
    dex: 455,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/carnivine.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/carnivine.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/carnivine.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/carnivine.png"
  },
  {
    id: "finneon",
    name: "Finneon",
    dex: 456,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/finneon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/finneon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/finneon-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/finneon-f.png"
  },
  {
    id: "lumineon",
    name: "Lumineon",
    dex: 457,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lumineon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lumineon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lumineon-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lumineon-f.png"
  },
  {
    id: "mantyke",
    name: "Mantyke",
    dex: 458,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mantyke.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mantyke.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mantyke.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mantyke.png"
  },
  {
    id: "snover",
    name: "Snover",
    dex: 459,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/snover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/snover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/snover-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/snover-f.png"
  },
  {
    id: "abomasnow",
    name: "Abomasnow",
    dex: 460,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/abomasnow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/abomasnow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/abomasnow-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/abomasnow-f.png"
  },
  {
    id: "mega_abomasnow",
    name: "Mega Abomasnow",
    dex: 460,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/abomasnow-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/abomasnow-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/abomasnow-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/abomasnow-mega.png"
  },
  {
    id: "weavile",
    name: "Weavile",
    dex: 461,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/weavile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/weavile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/weavile-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/weavile-f.png"
  },
  {
    id: "magnezone",
    name: "Magnezone",
    dex: 462,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magnezone.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magnezone.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magnezone.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magnezone.png"
  },
  {
    id: "lickilicky",
    name: "Lickilicky",
    dex: 463,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lickilicky.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lickilicky.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lickilicky.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lickilicky.png"
  },
  {
    id: "rhyperior",
    name: "Rhyperior",
    dex: 464,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rhyperior.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rhyperior.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rhyperior-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rhyperior-f.png"
  },
  {
    id: "tangrowth",
    name: "Tangrowth",
    dex: 465,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tangrowth.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tangrowth.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tangrowth-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tangrowth-f.png"
  },
  {
    id: "electivire",
    name: "Electivire",
    dex: 466,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/electivire.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/electivire.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/electivire.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/electivire.png"
  },
  {
    id: "magmortar",
    name: "Magmortar",
    dex: 467,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magmortar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magmortar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magmortar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magmortar.png"
  },
  {
    id: "togekiss",
    name: "Togekiss",
    dex: 468,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/togekiss.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/togekiss.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/togekiss.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/togekiss.png"
  },
  {
    id: "yanmega",
    name: "Yanmega",
    dex: 469,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/yanmega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/yanmega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/yanmega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/yanmega.png"
  },
  {
    id: "leafeon",
    name: "Leafeon",
    dex: 470,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/leafeon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/leafeon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/leafeon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/leafeon.png"
  },
  {
    id: "glaceon",
    name: "Glaceon",
    dex: 471,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/glaceon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/glaceon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/glaceon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/glaceon.png"
  },
  {
    id: "gliscor",
    name: "Gliscor",
    dex: 472,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gliscor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gliscor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gliscor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gliscor.png"
  },
  {
    id: "mamoswine",
    name: "Mamoswine",
    dex: 473,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mamoswine.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mamoswine.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mamoswine-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mamoswine-f.png"
  },
  {
    id: "porygon_z",
    name: "Porygon-Z",
    dex: 474,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/porygon-z.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/porygon-z.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/porygon-z.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/porygon-z.png"
  },
  {
    id: "gallade",
    name: "Gallade",
    dex: 475,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gallade.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gallade.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gallade.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gallade.png"
  },
  {
    id: "mega_gallade",
    name: "Mega Gallade",
    dex: 475,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gallade-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gallade-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gallade-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gallade-mega.png"
  },
  {
    id: "probopass",
    name: "Probopass",
    dex: 476,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/probopass.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/probopass.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/probopass.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/probopass.png"
  },
  {
    id: "dusknoir",
    name: "Dusknoir",
    dex: 477,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dusknoir.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dusknoir.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dusknoir.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dusknoir.png"
  },
  {
    id: "froslass",
    name: "Froslass",
    dex: 478,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/froslass.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/froslass.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/froslass.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/froslass.png"
  },
  {
    id: "mega_froslass",
    name: "Mega Froslass",
    dex: 478,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/f/f1/HOME0478M.png/400px-HOME0478M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/c/c4/HOME0478M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/f/f1/HOME0478M.png/400px-HOME0478M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/c/c4/HOME0478M_s.png"
  },
  {
    id: "rotom",
    name: "Rotom",
    dex: 479,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rotom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rotom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rotom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rotom.png"
  },
  {
    id: "heat_rotom",
    name: "Heat Rotom",
    dex: 479,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rotom-heat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rotom-heat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rotom-heat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rotom-heat.png"
  },
  {
    id: "wash_rotom",
    name: "Wash Rotom",
    dex: 479,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rotom-wash.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rotom-wash.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rotom-wash.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rotom-wash.png"
  },
  {
    id: "frost_rotom",
    name: "Frost Rotom",
    dex: 479,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rotom-frost.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rotom-frost.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rotom-frost.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rotom-frost.png"
  },
  {
    id: "fan_rotom",
    name: "Fan Rotom",
    dex: 479,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rotom-fan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rotom-fan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rotom-fan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rotom-fan.png"
  },
  {
    id: "mow_rotom",
    name: "Mow Rotom",
    dex: 479,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rotom-mow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rotom-mow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rotom-mow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rotom-mow.png"
  },
  {
    id: "uxie",
    name: "Uxie",
    dex: 480,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/uxie.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/uxie.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/uxie.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/uxie.png"
  },
  {
    id: "mesprit",
    name: "Mesprit",
    dex: 481,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mesprit.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mesprit.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mesprit.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mesprit.png"
  },
  {
    id: "azelf",
    name: "Azelf",
    dex: 482,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/azelf.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/azelf.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/azelf.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/azelf.png"
  },
  {
    id: "dialga",
    name: "Dialga",
    dex: 483,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dialga.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dialga.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dialga.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dialga.png"
  },
  {
    id: "dialga_origin_forme",
    name: "Origin Forme Dialga",
    dex: 483,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dialga-origin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dialga-origin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dialga-origin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dialga-origin.png"
  },
  {
    id: "palkia",
    name: "Palkia",
    dex: 484,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/palkia.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/palkia.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/palkia.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/palkia.png"
  },
  {
    id: "palkia_origin_forme",
    name: "Origin Forme Palkia",
    dex: 484,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/palkia-origin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/palkia-origin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/palkia-origin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/palkia-origin.png"
  },
  {
    id: "heatran",
    name: "Heatran",
    dex: 485,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/heatran.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/heatran.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/heatran.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/heatran.png"
  },
  {
    id: "mega_heatran",
    name: "Mega Heatran",
    dex: 485,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/c/ce/HOME0485M.png/400px-HOME0485M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/4/49/HOME0485M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/c/ce/HOME0485M.png/400px-HOME0485M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/4/49/HOME0485M_s.png"
  },
  {
    id: "regigigas",
    name: "Regigigas",
    dex: 486,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/regigigas.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/regigigas.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/regigigas.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/regigigas.png"
  },
  {
    id: "giratina",
    name: "Giratina",
    dex: 487,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/giratina.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/giratina.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/giratina.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/giratina.png"
  },
  {
    id: "giratina_origin_forme",
    name: "Origin Forme Giratina",
    dex: 487,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/giratina-origin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/giratina-origin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/giratina-origin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/giratina-origin.png"
  },
  {
    id: "cresselia",
    name: "Cresselia",
    dex: 488,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cresselia.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cresselia.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cresselia.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cresselia.png"
  },
  {
    id: "phione",
    name: "Phione",
    dex: 489,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/phione.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/phione.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/phione.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/phione.png"
  },
  {
    id: "manaphy",
    name: "Manaphy",
    dex: 490,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/manaphy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/manaphy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/manaphy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/manaphy.png"
  },
  {
    id: "darkrai",
    name: "Darkrai",
    dex: 491,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/darkrai.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/darkrai.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/darkrai.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/darkrai.png"
  },
  {
    id: "mega_darkrai",
    name: "Mega Darkrai",
    dex: 491,
    spriteM: "https://archives.bulbagarden.net/media/upload/a/a3/HOME0491M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/f/fc/HOME0491M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/a/a3/HOME0491M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/f/fc/HOME0491M_s.png"
  },
  {
    id: "shaymin_land_forme",
    name: "Land Forme Shaymin",
    dex: 492,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shaymin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shaymin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shaymin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shaymin.png"
  },
  {
    id: "shaymin_sky_forme",
    name: "Sky Forme Shaymin",
    dex: 492,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shaymin-sky.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shaymin-sky.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shaymin-sky.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shaymin-sky.png"
  },
  {
    id: "arceus",
    name: "Arceus",
    dex: 493,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arceus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arceus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arceus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arceus.png"
  },
  {
    id: "victini",
    name: "Victini",
    dex: 494,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/victini.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/victini.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/victini.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/victini.png"
  },
  {
    id: "snivy",
    name: "Snivy",
    dex: 495,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/snivy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/snivy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/snivy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/snivy.png"
  },
  {
    id: "servine",
    name: "Servine",
    dex: 496,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/servine.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/servine.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/servine.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/servine.png"
  },
  {
    id: "serperior",
    name: "Serperior",
    dex: 497,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/serperior.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/serperior.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/serperior.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/serperior.png"
  },
  {
    id: "tepig",
    name: "Tepig",
    dex: 498,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tepig.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tepig.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tepig.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tepig.png"
  },
  {
    id: "pignite",
    name: "Pignite",
    dex: 499,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pignite.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pignite.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pignite.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pignite.png"
  },
  {
    id: "emboar",
    name: "Emboar",
    dex: 500,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/emboar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/emboar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/emboar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/emboar.png"
  },
  {
    id: "mega_emboar",
    name: "Mega Emboar",
    dex: 500,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/9/92/HOME0500M.png/400px-HOME0500M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/thumb/e/ea/HOME0500M_s.png/400px-HOME0500M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/9/92/HOME0500M.png/400px-HOME0500M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/thumb/e/ea/HOME0500M_s.png/400px-HOME0500M_s.png"
  },
  {
    id: "oshawott",
    name: "Oshawott",
    dex: 501,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/oshawott.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/oshawott.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/oshawott.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/oshawott.png"
  },
  {
    id: "dewott",
    name: "Dewott",
    dex: 502,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dewott.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dewott.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dewott.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dewott.png"
  },
  {
    id: "samurott",
    name: "Samurott",
    dex: 503,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/samurott.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/samurott.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/samurott.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/samurott.png"
  },
  {
    id: "hisuian_samurott",
    name: "Hisuian Samurott",
    dex: 503,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/samurott-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/samurott-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/samurott-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/samurott-hisuian.png"
  },
  {
    id: "patrat",
    name: "Patrat",
    dex: 504,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/patrat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/patrat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/patrat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/patrat.png"
  },
  {
    id: "watchog",
    name: "Watchog",
    dex: 505,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/watchog.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/watchog.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/watchog.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/watchog.png"
  },
  {
    id: "lillipup",
    name: "Lillipup",
    dex: 506,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lillipup.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lillipup.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lillipup.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lillipup.png"
  },
  {
    id: "herdier",
    name: "Herdier",
    dex: 507,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/herdier.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/herdier.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/herdier.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/herdier.png"
  },
  {
    id: "stoutland",
    name: "Stoutland",
    dex: 508,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/stoutland.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/stoutland.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/stoutland.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/stoutland.png"
  },
  {
    id: "purrloin",
    name: "Purrloin",
    dex: 509,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/purrloin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/purrloin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/purrloin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/purrloin.png"
  },
  {
    id: "liepard",
    name: "Liepard",
    dex: 510,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/liepard.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/liepard.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/liepard.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/liepard.png"
  },
  {
    id: "pansage",
    name: "Pansage",
    dex: 511,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pansage.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pansage.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pansage.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pansage.png"
  },
  {
    id: "simisage",
    name: "Simisage",
    dex: 512,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/simisage.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/simisage.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/simisage.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/simisage.png"
  },
  {
    id: "pansear",
    name: "Pansear",
    dex: 513,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pansear.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pansear.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pansear.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pansear.png"
  },
  {
    id: "simisear",
    name: "Simisear",
    dex: 514,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/simisear.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/simisear.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/simisear.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/simisear.png"
  },
  {
    id: "panpour",
    name: "Panpour",
    dex: 515,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/panpour.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/panpour.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/panpour.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/panpour.png"
  },
  {
    id: "simipour",
    name: "Simipour",
    dex: 516,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/simipour.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/simipour.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/simipour.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/simipour.png"
  },
  {
    id: "munna",
    name: "Munna",
    dex: 517,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/munna.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/munna.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/munna.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/munna.png"
  },
  {
    id: "musharna",
    name: "Musharna",
    dex: 518,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/musharna.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/musharna.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/musharna.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/musharna.png"
  },
  {
    id: "pidove",
    name: "Pidove",
    dex: 519,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pidove.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pidove.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pidove.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pidove.png"
  },
  {
    id: "tranquill",
    name: "Tranquill",
    dex: 520,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tranquill.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tranquill.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tranquill.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tranquill.png"
  },
  {
    id: "unfezant",
    name: "Unfezant",
    dex: 521,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/unfezant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/unfezant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/unfezant-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/unfezant-f.png"
  },
  {
    id: "blitzle",
    name: "Blitzle",
    dex: 522,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blitzle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blitzle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blitzle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blitzle.png"
  },
  {
    id: "zebstrika",
    name: "Zebstrika",
    dex: 523,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zebstrika.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zebstrika.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zebstrika.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zebstrika.png"
  },
  {
    id: "roggenrola",
    name: "Roggenrola",
    dex: 524,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/roggenrola.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/roggenrola.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/roggenrola.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/roggenrola.png"
  },
  {
    id: "boldore",
    name: "Boldore",
    dex: 525,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/boldore.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/boldore.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/boldore.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/boldore.png"
  },
  {
    id: "gigalith",
    name: "Gigalith",
    dex: 526,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gigalith.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gigalith.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gigalith.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gigalith.png"
  },
  {
    id: "woobat",
    name: "Woobat",
    dex: 527,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/woobat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/woobat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/woobat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/woobat.png"
  },
  {
    id: "swoobat",
    name: "Swoobat",
    dex: 528,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swoobat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swoobat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swoobat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swoobat.png"
  },
  {
    id: "drilbur",
    name: "Drilbur",
    dex: 529,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drilbur.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drilbur.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drilbur.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drilbur.png"
  },
  {
    id: "excadrill",
    name: "Excadrill",
    dex: 530,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/excadrill.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/excadrill.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/excadrill.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/excadrill.png"
  },
  {
    id: "mega_excadrill",
    name: "Mega Excadrill",
    dex: 530,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/9/93/HOME0530M.png/400px-HOME0530M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/1/15/HOME0530M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/9/93/HOME0530M.png/400px-HOME0530M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/1/15/HOME0530M_s.png"
  },
  {
    id: "audino",
    name: "Audino",
    dex: 531,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/audino.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/audino.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/audino.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/audino.png"
  },
  {
    id: "mega_audino",
    name: "Mega Audino",
    dex: 531,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/audino-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/audino-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/audino-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/audino-mega.png"
  },
  {
    id: "timburr",
    name: "Timburr",
    dex: 532,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/timburr.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/timburr.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/timburr.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/timburr.png"
  },
  {
    id: "gurdurr",
    name: "Gurdurr",
    dex: 533,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gurdurr.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gurdurr.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gurdurr.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gurdurr.png"
  },
  {
    id: "conkeldurr",
    name: "Conkeldurr",
    dex: 534,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/conkeldurr.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/conkeldurr.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/conkeldurr.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/conkeldurr.png"
  },
  {
    id: "tympole",
    name: "Tympole",
    dex: 535,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tympole.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tympole.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tympole.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tympole.png"
  },
  {
    id: "palpitoad",
    name: "Palpitoad",
    dex: 536,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/palpitoad.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/palpitoad.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/palpitoad.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/palpitoad.png"
  },
  {
    id: "seismitoad",
    name: "Seismitoad",
    dex: 537,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/seismitoad.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/seismitoad.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/seismitoad.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/seismitoad.png"
  },
  {
    id: "throh",
    name: "Throh",
    dex: 538,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/throh.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/throh.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/throh.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/throh.png"
  },
  {
    id: "sawk",
    name: "Sawk",
    dex: 539,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sawk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sawk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sawk.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sawk.png"
  },
  {
    id: "sewaddle",
    name: "Sewaddle",
    dex: 540,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sewaddle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sewaddle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sewaddle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sewaddle.png"
  },
  {
    id: "swadloon",
    name: "Swadloon",
    dex: 541,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swadloon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swadloon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swadloon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swadloon.png"
  },
  {
    id: "leavanny",
    name: "Leavanny",
    dex: 542,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/leavanny.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/leavanny.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/leavanny.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/leavanny.png"
  },
  {
    id: "venipede",
    name: "Venipede",
    dex: 543,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/venipede.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/venipede.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/venipede.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/venipede.png"
  },
  {
    id: "whirlipede",
    name: "Whirlipede",
    dex: 544,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/whirlipede.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/whirlipede.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/whirlipede.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/whirlipede.png"
  },
  {
    id: "scolipede",
    name: "Scolipede",
    dex: 545,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scolipede.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scolipede.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scolipede.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scolipede.png"
  },
  {
    id: "mega_scolipede",
    name: "Mega Scolipede",
    dex: 545,
    spriteM: "https://archives.bulbagarden.net/media/upload/6/61/HOME0545M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/3/3c/HOME0545M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/6/61/HOME0545M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/3/3c/HOME0545M_s.png"
  },
  {
    id: "cottonee",
    name: "Cottonee",
    dex: 546,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cottonee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cottonee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cottonee.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cottonee.png"
  },
  {
    id: "whimsicott",
    name: "Whimsicott",
    dex: 547,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/whimsicott.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/whimsicott.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/whimsicott.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/whimsicott.png"
  },
  {
    id: "petilil",
    name: "Petilil",
    dex: 548,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/petilil.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/petilil.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/petilil.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/petilil.png"
  },
  {
    id: "lilligant",
    name: "Lilligant",
    dex: 549,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lilligant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lilligant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lilligant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lilligant.png"
  },
  {
    id: "hisuian_lilligant",
    name: "Hisuian Lilligant",
    dex: 549,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lilligant-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lilligant-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lilligant-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lilligant-hisuian.png"
  },
  {
    id: "basculin_red_striped_form",
    name: "Red-Striped Form Basculin",
    dex: 550,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/basculin-red-striped.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/basculin-red-striped.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/basculin-red-striped.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/basculin-red-striped.png"
  },
  {
    id: "basculin_blue_striped_form",
    name: "Blue-Striped Form Basculin",
    dex: 550,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/basculin-blue-striped.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/basculin-blue-striped.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/basculin-blue-striped.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/basculin-blue-striped.png"
  },
  {
    id: "basculin_white_striped_form",
    name: "White-Striped Form Basculin",
    dex: 550,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/basculin-white-striped.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/basculin-white-striped.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/basculin-white-striped.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/basculin-white-striped.png"
  },
  {
    id: "sandile",
    name: "Sandile",
    dex: 551,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandile.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandile.png"
  },
  {
    id: "krokorok",
    name: "Krokorok",
    dex: 552,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/krokorok.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/krokorok.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/krokorok.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/krokorok.png"
  },
  {
    id: "krookodile",
    name: "Krookodile",
    dex: 553,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/krookodile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/krookodile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/krookodile.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/krookodile.png"
  },
  {
    id: "darumaka",
    name: "Darumaka",
    dex: 554,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/darumaka.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/darumaka.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/darumaka.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/darumaka.png"
  },
  {
    id: "galarian_darumaka",
    name: "Galarian Darumaka",
    dex: 554,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/darumaka-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/darumaka-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/darumaka-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/darumaka-galarian.png"
  },
  {
    id: "darmanitan_standard_mode",
    name: "Standard Mode Darmanitan",
    dex: 555,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/darmanitan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/darmanitan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/darmanitan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/darmanitan.png"
  },
  {
    id: "darmanitan_zen_mode",
    name: "Zen Mode Darmanitan",
    dex: 555,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/darmanitan-zen.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/darmanitan-zen.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/darmanitan-zen.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/darmanitan-zen.png"
  },
  {
    id: "galarian_darmanitan_standard_mode",
    name: "Galarian Darmanitan Standard Mode",
    dex: 555,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/darmanitan-galarian-standard.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/darmanitan-galarian-standard.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/darmanitan-galarian-standard.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/darmanitan-galarian-standard.png"
  },
  {
    id: "galarian_darmanitan_zen_mode",
    name: "Galarian Darmanitan Zen Mode",
    dex: 555,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/darmanitan-galarian-zen.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/darmanitan-galarian-zen.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/darmanitan-galarian-zen.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/darmanitan-galarian-zen.png"
  },
  {
    id: "maractus",
    name: "Maractus",
    dex: 556,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/maractus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/maractus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/maractus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/maractus.png"
  },
  {
    id: "dwebble",
    name: "Dwebble",
    dex: 557,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dwebble.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dwebble.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dwebble.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dwebble.png"
  },
  {
    id: "crustle",
    name: "Crustle",
    dex: 558,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/crustle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/crustle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/crustle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/crustle.png"
  },
  {
    id: "scraggy",
    name: "Scraggy",
    dex: 559,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scraggy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scraggy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scraggy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scraggy.png"
  },
  {
    id: "scrafty",
    name: "Scrafty",
    dex: 560,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scrafty.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scrafty.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scrafty.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scrafty.png"
  },
  {
    id: "mega_scrafty",
    name: "Mega Scrafty",
    dex: 560,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/e/e7/HOME0560M.png/400px-HOME0560M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/4/42/HOME0560M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/e/e7/HOME0560M.png/400px-HOME0560M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/4/42/HOME0560M_s.png"
  },
  {
    id: "sigilyph",
    name: "Sigilyph",
    dex: 561,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sigilyph.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sigilyph.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sigilyph.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sigilyph.png"
  },
  {
    id: "yamask",
    name: "Yamask",
    dex: 562,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/yamask.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/yamask.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/yamask.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/yamask.png"
  },
  {
    id: "galarian_yamask",
    name: "Galarian Yamask",
    dex: 562,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/yamask-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/yamask-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/yamask-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/yamask-galarian.png"
  },
  {
    id: "cofagrigus",
    name: "Cofagrigus",
    dex: 563,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cofagrigus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cofagrigus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cofagrigus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cofagrigus.png"
  },
  {
    id: "tirtouga",
    name: "Tirtouga",
    dex: 564,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tirtouga.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tirtouga.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tirtouga.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tirtouga.png"
  },
  {
    id: "carracosta",
    name: "Carracosta",
    dex: 565,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/carracosta.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/carracosta.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/carracosta.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/carracosta.png"
  },
  {
    id: "archen",
    name: "Archen",
    dex: 566,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/archen.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/archen.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/archen.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/archen.png"
  },
  {
    id: "archeops",
    name: "Archeops",
    dex: 567,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/archeops.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/archeops.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/archeops.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/archeops.png"
  },
  {
    id: "trubbish",
    name: "Trubbish",
    dex: 568,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/trubbish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/trubbish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/trubbish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/trubbish.png"
  },
  {
    id: "garbodor",
    name: "Garbodor",
    dex: 569,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/garbodor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/garbodor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/garbodor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/garbodor.png"
  },
  {
    id: "gigantamax_garbodor",
    name: "Gigantamax Garbodor",
    dex: 569,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/garbodor-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/garbodor-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/garbodor-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/garbodor-gigantamax.png"
  },
  {
    id: "zorua",
    name: "Zorua",
    dex: 570,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zorua.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zorua.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zorua.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zorua.png"
  },
  {
    id: "hisuian_zorua",
    name: "Hisuian Zorua",
    dex: 570,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zorua-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zorua-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zorua-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zorua-hisuian.png"
  },
  {
    id: "zoroark",
    name: "Zoroark",
    dex: 571,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zoroark.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zoroark.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zoroark.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zoroark.png"
  },
  {
    id: "hisuian_zoroark",
    name: "Hisuian Zoroark",
    dex: 571,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zoroark-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zoroark-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zoroark-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zoroark-hisuian.png"
  },
  {
    id: "minccino",
    name: "Minccino",
    dex: 572,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minccino.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minccino.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minccino.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minccino.png"
  },
  {
    id: "cinccino",
    name: "Cinccino",
    dex: 573,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cinccino.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cinccino.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cinccino.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cinccino.png"
  },
  {
    id: "gothita",
    name: "Gothita",
    dex: 574,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gothita.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gothita.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gothita.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gothita.png"
  },
  {
    id: "gothorita",
    name: "Gothorita",
    dex: 575,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gothorita.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gothorita.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gothorita.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gothorita.png"
  },
  {
    id: "gothitelle",
    name: "Gothitelle",
    dex: 576,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gothitelle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gothitelle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gothitelle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gothitelle.png"
  },
  {
    id: "solosis",
    name: "Solosis",
    dex: 577,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/solosis.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/solosis.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/solosis.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/solosis.png"
  },
  {
    id: "duosion",
    name: "Duosion",
    dex: 578,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/duosion.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/duosion.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/duosion.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/duosion.png"
  },
  {
    id: "reuniclus",
    name: "Reuniclus",
    dex: 579,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/reuniclus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/reuniclus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/reuniclus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/reuniclus.png"
  },
  {
    id: "ducklett",
    name: "Ducklett",
    dex: 580,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ducklett.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ducklett.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ducklett.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ducklett.png"
  },
  {
    id: "swanna",
    name: "Swanna",
    dex: 581,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swanna.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swanna.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swanna.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swanna.png"
  },
  {
    id: "vanillite",
    name: "Vanillite",
    dex: 582,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vanillite.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vanillite.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vanillite.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vanillite.png"
  },
  {
    id: "vanillish",
    name: "Vanillish",
    dex: 583,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vanillish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vanillish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vanillish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vanillish.png"
  },
  {
    id: "vanilluxe",
    name: "Vanilluxe",
    dex: 584,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vanilluxe.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vanilluxe.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vanilluxe.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vanilluxe.png"
  },
  {
    id: "deerling_spring_form",
    name: "Spring Form Deerling",
    dex: 585,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deerling-spring.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deerling-spring.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deerling-spring.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deerling-spring.png"
  },
  {
    id: "deerling_summer_form",
    name: "Summer Form Deerling",
    dex: 585,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deerling-summer.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deerling-summer.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deerling-summer.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deerling-summer.png"
  },
  {
    id: "deerling_autumn_form",
    name: "Autumn Form Deerling",
    dex: 585,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deerling-autumn.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deerling-autumn.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deerling-autumn.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deerling-autumn.png"
  },
  {
    id: "deerling_winter_form",
    name: "Winter Form Deerling",
    dex: 585,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deerling-winter.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deerling-winter.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deerling-winter.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deerling-winter.png"
  },
  {
    id: "sawsbuck_spring_form",
    name: "Spring Form Sawsbuck",
    dex: 586,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sawsbuck-spring.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sawsbuck-spring.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sawsbuck-spring.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sawsbuck-spring.png"
  },
  {
    id: "sawsbuck_summer_form",
    name: "Summer Form Sawsbuck",
    dex: 586,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sawsbuck-summer.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sawsbuck-summer.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sawsbuck-summer.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sawsbuck-summer.png"
  },
  {
    id: "sawsbuck_autumn_form",
    name: "Autumn Form Sawsbuck",
    dex: 586,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sawsbuck-autumn.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sawsbuck-autumn.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sawsbuck-autumn.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sawsbuck-autumn.png"
  },
  {
    id: "sawsbuck_winter_form",
    name: "Winter Form Sawsbuck",
    dex: 586,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sawsbuck-winter.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sawsbuck-winter.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sawsbuck-winter.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sawsbuck-winter.png"
  },
  {
    id: "emolga",
    name: "Emolga",
    dex: 587,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/emolga.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/emolga.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/emolga.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/emolga.png"
  },
  {
    id: "karrablast",
    name: "Karrablast",
    dex: 588,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/karrablast.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/karrablast.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/karrablast.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/karrablast.png"
  },
  {
    id: "escavalier",
    name: "Escavalier",
    dex: 589,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/escavalier.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/escavalier.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/escavalier.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/escavalier.png"
  },
  {
    id: "foongus",
    name: "Foongus",
    dex: 590,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/foongus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/foongus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/foongus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/foongus.png"
  },
  {
    id: "amoonguss",
    name: "Amoonguss",
    dex: 591,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/amoonguss.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/amoonguss.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/amoonguss.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/amoonguss.png"
  },
  {
    id: "frillish",
    name: "Frillish",
    dex: 592,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/frillish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/frillish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/frillish-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/frillish-f.png"
  },
  {
    id: "jellicent",
    name: "Jellicent",
    dex: 593,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/jellicent.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/jellicent.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/jellicent-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/jellicent-f.png"
  },
  {
    id: "alomomola",
    name: "Alomomola",
    dex: 594,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alomomola.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alomomola.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alomomola.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alomomola.png"
  },
  {
    id: "joltik",
    name: "Joltik",
    dex: 595,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/joltik.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/joltik.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/joltik.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/joltik.png"
  },
  {
    id: "galvantula",
    name: "Galvantula",
    dex: 596,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/galvantula.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/galvantula.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/galvantula.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/galvantula.png"
  },
  {
    id: "ferroseed",
    name: "Ferroseed",
    dex: 597,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ferroseed.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ferroseed.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ferroseed.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ferroseed.png"
  },
  {
    id: "ferrothorn",
    name: "Ferrothorn",
    dex: 598,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ferrothorn.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ferrothorn.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ferrothorn.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ferrothorn.png"
  },
  {
    id: "klink",
    name: "Klink",
    dex: 599,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/klink.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/klink.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/klink.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/klink.png"
  },
  {
    id: "klang",
    name: "Klang",
    dex: 600,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/klang.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/klang.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/klang.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/klang.png"
  },
  {
    id: "klinklang",
    name: "Klinklang",
    dex: 601,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/klinklang.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/klinklang.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/klinklang.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/klinklang.png"
  },
  {
    id: "tynamo",
    name: "Tynamo",
    dex: 602,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tynamo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tynamo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tynamo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tynamo.png"
  },
  {
    id: "eelektrik",
    name: "Eelektrik",
    dex: 603,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eelektrik.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eelektrik.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eelektrik.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eelektrik.png"
  },
  {
    id: "eelektross",
    name: "Eelektross",
    dex: 604,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eelektross.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eelektross.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eelektross.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eelektross.png"
  },
  {
    id: "mega_eelektross",
    name: "Mega Eelektross",
    dex: 604,
    spriteM: "https://archives.bulbagarden.net/media/upload/f/f2/HOME0604M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/2/26/HOME0604M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/f/f2/HOME0604M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/2/26/HOME0604M_s.png"
  },
  {
    id: "elgyem",
    name: "Elgyem",
    dex: 605,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/elgyem.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/elgyem.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/elgyem.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/elgyem.png"
  },
  {
    id: "beheeyem",
    name: "Beheeyem",
    dex: 606,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/beheeyem.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/beheeyem.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/beheeyem.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/beheeyem.png"
  },
  {
    id: "litwick",
    name: "Litwick",
    dex: 607,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/litwick.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/litwick.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/litwick.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/litwick.png"
  },
  {
    id: "lampent",
    name: "Lampent",
    dex: 608,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lampent.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lampent.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lampent.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lampent.png"
  },
  {
    id: "chandelure",
    name: "Chandelure",
    dex: 609,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chandelure.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chandelure.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chandelure.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chandelure.png"
  },
  {
    id: "mega_chandelure",
    name: "Mega Chandelure",
    dex: 609,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/a/a4/HOME0609M.png/400px-HOME0609M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/0/07/HOME0609M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/a/a4/HOME0609M.png/400px-HOME0609M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/0/07/HOME0609M_s.png"
  },
  {
    id: "axew",
    name: "Axew",
    dex: 610,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/axew.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/axew.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/axew.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/axew.png"
  },
  {
    id: "fraxure",
    name: "Fraxure",
    dex: 611,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/fraxure.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/fraxure.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/fraxure.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/fraxure.png"
  },
  {
    id: "haxorus",
    name: "Haxorus",
    dex: 612,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/haxorus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/haxorus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/haxorus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/haxorus.png"
  },
  {
    id: "cubchoo",
    name: "Cubchoo",
    dex: 613,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cubchoo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cubchoo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cubchoo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cubchoo.png"
  },
  {
    id: "beartic",
    name: "Beartic",
    dex: 614,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/beartic.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/beartic.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/beartic.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/beartic.png"
  },
  {
    id: "cryogonal",
    name: "Cryogonal",
    dex: 615,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cryogonal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cryogonal.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cryogonal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cryogonal.png"
  },
  {
    id: "shelmet",
    name: "Shelmet",
    dex: 616,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shelmet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shelmet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shelmet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shelmet.png"
  },
  {
    id: "accelgor",
    name: "Accelgor",
    dex: 617,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/accelgor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/accelgor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/accelgor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/accelgor.png"
  },
  {
    id: "stunfisk",
    name: "Stunfisk",
    dex: 618,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/stunfisk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/stunfisk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/stunfisk.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/stunfisk.png"
  },
  {
    id: "galarian_stunfisk",
    name: "Galarian Stunfisk",
    dex: 618,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/stunfisk-galarian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/stunfisk-galarian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/stunfisk-galarian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/stunfisk-galarian.png"
  },
  {
    id: "mienfoo",
    name: "Mienfoo",
    dex: 619,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mienfoo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mienfoo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mienfoo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mienfoo.png"
  },
  {
    id: "mienshao",
    name: "Mienshao",
    dex: 620,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mienshao.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mienshao.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mienshao.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mienshao.png"
  },
  {
    id: "druddigon",
    name: "Druddigon",
    dex: 621,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/druddigon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/druddigon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/druddigon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/druddigon.png"
  },
  {
    id: "golett",
    name: "Golett",
    dex: 622,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/golett.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/golett.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/golett.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/golett.png"
  },
  {
    id: "golurk",
    name: "Golurk",
    dex: 623,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/golurk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/golurk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/golurk.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/golurk.png"
  },
  {
    id: "mega_golurk",
    name: "Mega Golurk",
    dex: 623,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/5/5c/HOME0623M.png/400px-HOME0623M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/c/c7/HOME0623M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/5/5c/HOME0623M.png/400px-HOME0623M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/c/c7/HOME0623M_s.png"
  },
  {
    id: "pawniard",
    name: "Pawniard",
    dex: 624,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pawniard.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pawniard.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pawniard.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pawniard.png"
  },
  {
    id: "bisharp",
    name: "Bisharp",
    dex: 625,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bisharp.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bisharp.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bisharp.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bisharp.png"
  },
  {
    id: "bouffalant",
    name: "Bouffalant",
    dex: 626,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bouffalant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bouffalant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bouffalant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bouffalant.png"
  },
  {
    id: "rufflet",
    name: "Rufflet",
    dex: 627,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rufflet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rufflet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rufflet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rufflet.png"
  },
  {
    id: "braviary",
    name: "Braviary",
    dex: 628,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/braviary.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/braviary.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/braviary.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/braviary.png"
  },
  {
    id: "hisuian_braviary",
    name: "Hisuian Braviary",
    dex: 628,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/braviary-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/braviary-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/braviary-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/braviary-hisuian.png"
  },
  {
    id: "vullaby",
    name: "Vullaby",
    dex: 629,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vullaby.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vullaby.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vullaby.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vullaby.png"
  },
  {
    id: "mandibuzz",
    name: "Mandibuzz",
    dex: 630,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mandibuzz.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mandibuzz.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mandibuzz.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mandibuzz.png"
  },
  {
    id: "heatmor",
    name: "Heatmor",
    dex: 631,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/heatmor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/heatmor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/heatmor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/heatmor.png"
  },
  {
    id: "durant",
    name: "Durant",
    dex: 632,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/durant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/durant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/durant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/durant.png"
  },
  {
    id: "deino",
    name: "Deino",
    dex: 633,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/deino.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/deino.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/deino.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/deino.png"
  },
  {
    id: "zweilous",
    name: "Zweilous",
    dex: 634,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zweilous.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zweilous.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zweilous.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zweilous.png"
  },
  {
    id: "hydreigon",
    name: "Hydreigon",
    dex: 635,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hydreigon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hydreigon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hydreigon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hydreigon.png"
  },
  {
    id: "larvesta",
    name: "Larvesta",
    dex: 636,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/larvesta.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/larvesta.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/larvesta.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/larvesta.png"
  },
  {
    id: "volcarona",
    name: "Volcarona",
    dex: 637,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/volcarona.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/volcarona.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/volcarona.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/volcarona.png"
  },
  {
    id: "cobalion",
    name: "Cobalion",
    dex: 638,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cobalion.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cobalion.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cobalion.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cobalion.png"
  },
  {
    id: "terrakion",
    name: "Terrakion",
    dex: 639,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/terrakion.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/terrakion.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/terrakion.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/terrakion.png"
  },
  {
    id: "virizion",
    name: "Virizion",
    dex: 640,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/virizion.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/virizion.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/virizion.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/virizion.png"
  },
  {
    id: "tornadus_incarnate_forme",
    name: "Incarnate Forme Tornadus",
    dex: 641,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tornadus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tornadus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tornadus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tornadus.png"
  },
  {
    id: "tornadus_therian_forme",
    name: "Therian Forme Tornadus",
    dex: 641,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tornadus-therian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tornadus-therian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tornadus-therian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tornadus-therian.png"
  },
  {
    id: "thundurus_incarnate_forme",
    name: "Incarnate Forme Thundurus",
    dex: 642,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/thundurus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/thundurus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/thundurus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/thundurus.png"
  },
  {
    id: "thundurus_therian_forme",
    name: "Therian Forme Thundurus",
    dex: 642,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/thundurus-therian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/thundurus-therian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/thundurus-therian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/thundurus-therian.png"
  },
  {
    id: "reshiram",
    name: "Reshiram",
    dex: 643,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/reshiram.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/reshiram.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/reshiram.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/reshiram.png"
  },
  {
    id: "zekrom",
    name: "Zekrom",
    dex: 644,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zekrom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zekrom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zekrom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zekrom.png"
  },
  {
    id: "landorus_incarnate_forme",
    name: "Incarnate Forme Landorus",
    dex: 645,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/landorus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/landorus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/landorus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/landorus.png"
  },
  {
    id: "landorus_therian_forme",
    name: "Therian Forme Landorus",
    dex: 645,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/landorus-therian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/landorus-therian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/landorus-therian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/landorus-therian.png"
  },
  {
    id: "kyurem",
    name: "Kyurem",
    dex: 646,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kyurem.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kyurem.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kyurem.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kyurem.png"
  },
  {
    id: "white_kyurem",
    name: "White Kyurem",
    dex: 646,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kyurem-white.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kyurem-white.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kyurem-white.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kyurem-white.png"
  },
  {
    id: "black_kyurem",
    name: "Black Kyurem",
    dex: 646,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kyurem-black.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kyurem-black.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kyurem-black.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kyurem-black.png"
  },
  {
    id: "keldeo_ordinary_form",
    name: "Ordinary Form Keldeo",
    dex: 647,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/keldeo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/keldeo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/keldeo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/keldeo.png"
  },
  {
    id: "keldeo_resolute_form",
    name: "Resolute Form Keldeo",
    dex: 647,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/keldeo-resolute.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/keldeo-resolute.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/keldeo-resolute.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/keldeo-resolute.png"
  },
  {
    id: "meloetta_aria_forme",
    name: "Aria Forme Meloetta",
    dex: 648,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meloetta.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meloetta.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meloetta.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meloetta.png"
  },
  {
    id: "meloetta_pirouette_forme",
    name: "Pirouette Forme Meloetta",
    dex: 648,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meloetta-pirouette.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meloetta-pirouette.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meloetta-pirouette.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meloetta-pirouette.png"
  },
  {
    id: "genesect_normal",
    name: "Normal Genesect",
    dex: 649,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/genesect.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/genesect.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/genesect.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/genesect.png"
  },
  {
    id: "chespin",
    name: "Chespin",
    dex: 650,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chespin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chespin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chespin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chespin.png"
  },
  {
    id: "quilladin",
    name: "Quilladin",
    dex: 651,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/quilladin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/quilladin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/quilladin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/quilladin.png"
  },
  {
    id: "chesnaught",
    name: "Chesnaught",
    dex: 652,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chesnaught.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chesnaught.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chesnaught.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chesnaught.png"
  },
  {
    id: "mega_chesnaught",
    name: "Mega Chesnaught",
    dex: 652,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/5/58/HOME0652M.png/400px-HOME0652M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/a/a5/HOME0652M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/5/58/HOME0652M.png/400px-HOME0652M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/a/a5/HOME0652M_s.png"
  },
  {
    id: "fennekin",
    name: "Fennekin",
    dex: 653,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/fennekin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/fennekin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/fennekin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/fennekin.png"
  },
  {
    id: "braixen",
    name: "Braixen",
    dex: 654,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/braixen.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/braixen.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/braixen.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/braixen.png"
  },
  {
    id: "delphox",
    name: "Delphox",
    dex: 655,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/delphox.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/delphox.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/delphox.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/delphox.png"
  },
  {
    id: "mega_delphox",
    name: "Mega Delphox",
    dex: 655,
    spriteM: "https://archives.bulbagarden.net/media/upload/9/9c/HOME0655M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/f/f2/HOME0655M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/9/9c/HOME0655M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/f/f2/HOME0655M_s.png"
  },
  {
    id: "froakie",
    name: "Froakie",
    dex: 656,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/froakie.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/froakie.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/froakie.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/froakie.png"
  },
  {
    id: "frogadier",
    name: "Frogadier",
    dex: 657,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/frogadier.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/frogadier.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/frogadier.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/frogadier.png"
  },
  {
    id: "greninja",
    name: "Greninja",
    dex: 658,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/greninja.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/greninja.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/greninja.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/greninja.png"
  },
  {
    id: "ash_greninja",
    name: "Ash-Greninja Greninja",
    dex: 658,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/greninja-ash.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/greninja-ash.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/greninja-ash.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/greninja-ash.png"
  },
  {
    id: "mega_greninja",
    name: "Mega Greninja",
    dex: 658,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/7/70/HOME0658M.png/400px-HOME0658M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/0/05/HOME0658M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/7/70/HOME0658M.png/400px-HOME0658M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/0/05/HOME0658M_s.png"
  },
  {
    id: "bunnelby",
    name: "Bunnelby",
    dex: 659,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bunnelby.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bunnelby.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bunnelby.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bunnelby.png"
  },
  {
    id: "diggersby",
    name: "Diggersby",
    dex: 660,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/diggersby.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/diggersby.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/diggersby.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/diggersby.png"
  },
  {
    id: "fletchling",
    name: "Fletchling",
    dex: 661,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/fletchling.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/fletchling.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/fletchling.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/fletchling.png"
  },
  {
    id: "fletchinder",
    name: "Fletchinder",
    dex: 662,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/fletchinder.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/fletchinder.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/fletchinder.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/fletchinder.png"
  },
  {
    id: "talonflame",
    name: "Talonflame",
    dex: 663,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/talonflame.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/talonflame.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/talonflame.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/talonflame.png"
  },
  {
    id: "scatterbug",
    name: "Scatterbug",
    dex: 664,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scatterbug.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scatterbug.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scatterbug.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scatterbug.png"
  },
  {
    id: "spewpa",
    name: "Spewpa",
    dex: 665,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spewpa.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spewpa.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spewpa.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spewpa.png"
  },
  {
    id: "vivillon_icy_snow_pattern",
    name: "Icy Snow Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-icy-snow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-icy-snow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-icy-snow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-icy-snow.png"
  },
  {
    id: "vivillon_polar_pattern",
    name: "Polar Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-polar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-polar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-polar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-polar.png"
  },
  {
    id: "vivillon_tundra_pattern",
    name: "Tundra Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-tundra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-tundra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-tundra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-tundra.png"
  },
  {
    id: "vivillon_continental_pattern",
    name: "Continental Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-continental.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-continental.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-continental.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-continental.png"
  },
  {
    id: "vivillon_garden_pattern",
    name: "Garden Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-garden.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-garden.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-garden.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-garden.png"
  },
  {
    id: "vivillon_elegant_pattern",
    name: "Elegant Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-elegant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-elegant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-elegant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-elegant.png"
  },
  {
    id: "vivillon_meadow_pattern",
    name: "Meadow Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-meadow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-meadow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-meadow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-meadow.png"
  },
  {
    id: "vivillon_modern_pattern",
    name: "Modern Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-modern.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-modern.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-modern.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-modern.png"
  },
  {
    id: "vivillon_marine_pattern",
    name: "Marine Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-marine.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-marine.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-marine.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-marine.png"
  },
  {
    id: "vivillon_archipelago_pattern",
    name: "Archipelago Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-archipelago.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-archipelago.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-archipelago.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-archipelago.png"
  },
  {
    id: "vivillon_high_plains_pattern",
    name: "High Plains Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-high-plains.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-high-plains.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-high-plains.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-high-plains.png"
  },
  {
    id: "vivillon_sandstorm_pattern",
    name: "Sandstorm Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-sandstorm.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-sandstorm.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-sandstorm.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-sandstorm.png"
  },
  {
    id: "vivillon_river_pattern",
    name: "River Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-river.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-river.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-river.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-river.png"
  },
  {
    id: "vivillon_monsoon_pattern",
    name: "Monsoon Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-monsoon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-monsoon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-monsoon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-monsoon.png"
  },
  {
    id: "vivillon_savanna_pattern",
    name: "Savanna Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-savanna.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-savanna.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-savanna.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-savanna.png"
  },
  {
    id: "vivillon_sun_pattern",
    name: "Sun Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-sun.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-sun.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-sun.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-sun.png"
  },
  {
    id: "vivillon_ocean_pattern",
    name: "Ocean Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-ocean.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-ocean.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-ocean.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-ocean.png"
  },
  {
    id: "vivillon_jungle_pattern",
    name: "Jungle Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-jungle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-jungle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-jungle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-jungle.png"
  },
  {
    id: "vivillon_fancy_pattern",
    name: "Fancy Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-fancy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-fancy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-fancy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-fancy.png"
  },
  {
    id: "vivillon_pokéball_pattern",
    name: "Pokéball Pattern Vivillon",
    dex: 666,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vivillon-poke-ball.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vivillon-poke-ball.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vivillon-poke-ball.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vivillon-poke-ball.png"
  },
  {
    id: "litleo",
    name: "Litleo",
    dex: 667,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/litleo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/litleo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/litleo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/litleo.png"
  },
  {
    id: "pyroar",
    name: "Pyroar",
    dex: 668,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pyroar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pyroar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pyroar-f.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pyroar-f.png"
  },
  {
    id: "mega_pyroar",
    name: "Mega Pyroar",
    dex: 668,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/4/42/HOME0668M.png/400px-HOME0668M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/5/5f/HOME0668M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/4/42/HOME0668M.png/400px-HOME0668M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/5/5f/HOME0668M_s.png"
  },
  {
    id: "flabébé_red_flower",
    name: "Red Flower Flabébé",
    dex: 669,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flabebe-red.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flabebe-red.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flabebe-red.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flabebe-red.png"
  },
  {
    id: "flabébé_yellow_flower",
    name: "Yellow Flower Flabébé",
    dex: 669,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flabebe-yellow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flabebe-yellow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flabebe-yellow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flabebe-yellow.png"
  },
  {
    id: "flabébé_orange_flower",
    name: "Orange Flower Flabébé",
    dex: 669,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flabebe-orange.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flabebe-orange.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flabebe-orange.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flabebe-orange.png"
  },
  {
    id: "flabébé_blue_flower",
    name: "Blue Flower Flabébé",
    dex: 669,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flabebe-blue.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flabebe-blue.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flabebe-blue.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flabebe-blue.png"
  },
  {
    id: "flabébé_white_flower",
    name: "White Flower Flabébé",
    dex: 669,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flabebe-white.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flabebe-white.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flabebe-white.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flabebe-white.png"
  },
  {
    id: "floette_red_flower",
    name: "Red Flower Floette",
    dex: 670,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/floette-red.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/floette-red.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/floette-red.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/floette-red.png"
  },
  {
    id: "floette_yellow_flower",
    name: "Yellow Flower Floette",
    dex: 670,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/floette-yellow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/floette-yellow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/floette-yellow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/floette-yellow.png"
  },
  {
    id: "floette_orange_flower",
    name: "Orange Flower Floette",
    dex: 670,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/floette-orange.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/floette-orange.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/floette-orange.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/floette-orange.png"
  },
  {
    id: "floette_blue_flower",
    name: "Blue Flower Floette",
    dex: 670,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/floette-blue.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/floette-blue.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/floette-blue.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/floette-blue.png"
  },
  {
    id: "floette_white_flower",
    name: "White Flower Floette",
    dex: 670,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/floette-white.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/floette-white.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/floette-white.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/floette-white.png"
  },
  {
    id: "floette_eternal_flower",
    name: "Eternal Flower Floette",
    dex: 670,
    spriteM: "https://img.pokemondb.net/sprites/bank/normal/floette-eternal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/bank/shiny/floette-eternal.png",
    spriteF: "https://img.pokemondb.net/sprites/bank/normal/floette-eternal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/bank/shiny/floette-eternal.png"
  },
  {
    id: "mega_floette",
    name: "Mega Floette Eternal Flower",
    dex: 670,
    spriteM: "https://archives.bulbagarden.net/media/upload/a/a9/HOME0670M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/a/a9/HOME0670M.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/a/a9/HOME0670M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/a/a9/HOME0670M.png"
  },
  {
    id: "florges_red_flower",
    name: "Red Flower Florges",
    dex: 671,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/florges-red.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/florges-red.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/florges-red.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/florges-red.png"
  },
  {
    id: "florges_yellow_flower",
    name: "Yellow Flower Florges",
    dex: 671,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/florges-yellow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/florges-yellow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/florges-yellow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/florges-yellow.png"
  },
  {
    id: "florges_orange_flower",
    name: "Orange Flower Florges",
    dex: 671,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/florges-orange.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/florges-orange.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/florges-orange.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/florges-orange.png"
  },
  {
    id: "florges_blue_flower",
    name: "Blue Flower Florges",
    dex: 671,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/florges-blue.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/florges-blue.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/florges-blue.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/florges-blue.png"
  },
  {
    id: "florges_white_flower",
    name: "White Flower Florges",
    dex: 671,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/florges-white.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/florges-white.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/florges-white.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/florges-white.png"
  },
  {
    id: "skiddo",
    name: "Skiddo",
    dex: 672,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skiddo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skiddo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skiddo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skiddo.png"
  },
  {
    id: "gogoat",
    name: "Gogoat",
    dex: 673,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gogoat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gogoat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gogoat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gogoat.png"
  },
  {
    id: "pancham",
    name: "Pancham",
    dex: 674,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pancham.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pancham.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pancham.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pancham.png"
  },
  {
    id: "pangoro",
    name: "Pangoro",
    dex: 675,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pangoro.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pangoro.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pangoro.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pangoro.png"
  },
  {
    id: "furfrou",
    name: "Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou.png"
  },
  {
    id: "furfrou_heart_trim",
    name: "Heart Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-heart.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-heart.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-heart.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-heart.png"
  },
  {
    id: "furfrou_star_trim",
    name: "Star Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-star.png"
  },
  {
    id: "furfrou_diamond_trim",
    name: "Diamond Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-diamond.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-diamond.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-diamond.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-diamond.png"
  },
  {
    id: "furfrou_debutante_trim",
    name: "Debutante Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-debutante.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-debutante.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-debutante.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-debutante.png"
  },
  {
    id: "furfrou_matron_trim",
    name: "Matron Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-matron.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-matron.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-matron.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-matron.png"
  },
  {
    id: "furfrou_dandy_trim",
    name: "Dandy Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-dandy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-dandy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-dandy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-dandy.png"
  },
  {
    id: "furfrou_la_reine_trim",
    name: "La Reine Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-la-reine.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-la-reine.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-la-reine.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-la-reine.png"
  },
  {
    id: "furfrou_kabuki_trim",
    name: "Kabuki Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-kabuki.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-kabuki.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-kabuki.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-kabuki.png"
  },
  {
    id: "furfrou_pharaoh_trim",
    name: "Pharaoh Trim Furfrou",
    dex: 676,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/furfrou-pharaoh.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/furfrou-pharaoh.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/furfrou-pharaoh.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/furfrou-pharaoh.png"
  },
  {
    id: "espurr",
    name: "Espurr",
    dex: 677,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/espurr.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/espurr.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/espurr.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/espurr.png"
  },
  {
    id: "meowstic",
    name: "Meowstic",
    dex: 678,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meowstic.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meowstic.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meowstic-female.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meowstic-female.png"
  },
  {
    id: "mega_meowstic",
    name: "Mega Meowstic",
    dex: 678,
    spriteM: "https://archives.bulbagarden.net/media/upload/e/e5/HOME0678M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/d/d9/HOME0678M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/e/e5/HOME0678M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/d/d9/HOME0678M_s.png"
  },
  {
    id: "honedge",
    name: "Honedge",
    dex: 679,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/honedge.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/honedge.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/honedge.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/honedge.png"
  },
  {
    id: "doublade",
    name: "Doublade",
    dex: 680,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/doublade.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/doublade.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/doublade.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/doublade.png"
  },
  {
    id: "aegislash_shield_forme",
    name: "Shield Forme Aegislash",
    dex: 681,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aegislash.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aegislash.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aegislash.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aegislash.png"
  },
  {
    id: "spritzee",
    name: "Spritzee",
    dex: 682,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spritzee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spritzee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spritzee.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spritzee.png"
  },
  {
    id: "aromatisse",
    name: "Aromatisse",
    dex: 683,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aromatisse.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aromatisse.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aromatisse.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aromatisse.png"
  },
  {
    id: "swirlix",
    name: "Swirlix",
    dex: 684,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/swirlix.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/swirlix.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/swirlix.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/swirlix.png"
  },
  {
    id: "slurpuff",
    name: "Slurpuff",
    dex: 685,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slurpuff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slurpuff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slurpuff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slurpuff.png"
  },
  {
    id: "inkay",
    name: "Inkay",
    dex: 686,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/inkay.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/inkay.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/inkay.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/inkay.png"
  },
  {
    id: "malamar",
    name: "Malamar",
    dex: 687,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/malamar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/malamar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/malamar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/malamar.png"
  },
  {
    id: "mega_malamar",
    name: "Mega Malamar",
    dex: 687,
    spriteM: "https://archives.bulbagarden.net/media/upload/e/e4/HOME0687M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/f/fd/HOME0687M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/e/e4/HOME0687M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/f/fd/HOME0687M_s.png"
  },
  {
    id: "binacle",
    name: "Binacle",
    dex: 688,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/binacle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/binacle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/binacle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/binacle.png"
  },
  {
    id: "barbaracle",
    name: "Barbaracle",
    dex: 689,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/barbaracle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/barbaracle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/barbaracle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/barbaracle.png"
  },
  {
    id: "mega_barbaracle",
    name: "Mega Barbaracle",
    dex: 689,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/2/2a/HOME0689M.png/400px-HOME0689M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/0/00/HOME0689M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/2/2a/HOME0689M.png/400px-HOME0689M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/0/00/HOME0689M_s.png"
  },
  {
    id: "skrelp",
    name: "Skrelp",
    dex: 690,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skrelp.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skrelp.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skrelp.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skrelp.png"
  },
  {
    id: "dragalge",
    name: "Dragalge",
    dex: 691,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dragalge.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dragalge.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dragalge.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dragalge.png"
  },
  {
    id: "mega_dragalge",
    name: "Mega Dragalge",
    dex: 691,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/e/e8/HOME0691M.png/400px-HOME0691M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/4/4f/HOME0691M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/e/e8/HOME0691M.png/400px-HOME0691M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/4/4f/HOME0691M_s.png"
  },
  {
    id: "clauncher",
    name: "Clauncher",
    dex: 692,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/clauncher.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/clauncher.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/clauncher.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/clauncher.png"
  },
  {
    id: "clawitzer",
    name: "Clawitzer",
    dex: 693,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/clawitzer.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/clawitzer.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/clawitzer.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/clawitzer.png"
  },
  {
    id: "helioptile",
    name: "Helioptile",
    dex: 694,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/helioptile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/helioptile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/helioptile.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/helioptile.png"
  },
  {
    id: "heliolisk",
    name: "Heliolisk",
    dex: 695,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/heliolisk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/heliolisk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/heliolisk.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/heliolisk.png"
  },
  {
    id: "tyrunt",
    name: "Tyrunt",
    dex: 696,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tyrunt.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tyrunt.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tyrunt.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tyrunt.png"
  },
  {
    id: "tyrantrum",
    name: "Tyrantrum",
    dex: 697,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tyrantrum.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tyrantrum.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tyrantrum.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tyrantrum.png"
  },
  {
    id: "amaura",
    name: "Amaura",
    dex: 698,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/amaura.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/amaura.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/amaura.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/amaura.png"
  },
  {
    id: "aurorus",
    name: "Aurorus",
    dex: 699,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/aurorus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/aurorus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/aurorus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/aurorus.png"
  },
  {
    id: "sylveon",
    name: "Sylveon",
    dex: 700,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sylveon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sylveon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sylveon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sylveon.png"
  },
  {
    id: "hawlucha",
    name: "Hawlucha",
    dex: 701,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hawlucha.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hawlucha.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hawlucha.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hawlucha.png"
  },
  {
    id: "mega_hawlucha",
    name: "Mega Hawlucha",
    dex: 701,
    spriteM: "https://archives.bulbagarden.net/media/upload/9/97/HOME0701M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/6/60/HOME0701M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/9/97/HOME0701M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/6/60/HOME0701M_s.png"
  },
  {
    id: "dedenne",
    name: "Dedenne",
    dex: 702,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dedenne.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dedenne.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dedenne.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dedenne.png"
  },
  {
    id: "carbink",
    name: "Carbink",
    dex: 703,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/carbink.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/carbink.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/carbink.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/carbink.png"
  },
  {
    id: "goomy",
    name: "Goomy",
    dex: 704,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/goomy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/goomy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/goomy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/goomy.png"
  },
  {
    id: "sliggoo",
    name: "Sliggoo",
    dex: 705,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sliggoo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sliggoo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sliggoo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sliggoo.png"
  },
  {
    id: "hisuian_sliggoo",
    name: "Hisuian Sliggoo",
    dex: 705,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sliggoo-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sliggoo-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sliggoo-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sliggoo-hisuian.png"
  },
  {
    id: "goodra",
    name: "Goodra",
    dex: 706,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/goodra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/goodra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/goodra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/goodra.png"
  },
  {
    id: "hisuian_goodra",
    name: "Hisuian Goodra",
    dex: 706,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/goodra-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/goodra-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/goodra-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/goodra-hisuian.png"
  },
  {
    id: "klefki",
    name: "Klefki",
    dex: 707,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/klefki.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/klefki.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/klefki.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/klefki.png"
  },
  {
    id: "phantump",
    name: "Phantump",
    dex: 708,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/phantump.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/phantump.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/phantump.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/phantump.png"
  },
  {
    id: "trevenant",
    name: "Trevenant",
    dex: 709,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/trevenant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/trevenant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/trevenant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/trevenant.png"
  },
  {
    id: "pumpkaboo_small_variety",
    name: "Small Variety Pumpkaboo",
    dex: 710,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pumpkaboo-small.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pumpkaboo-small.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pumpkaboo-small.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pumpkaboo-small.png"
  },
  {
    id: "pumpkaboo_medium_variety",
    name: "Medium Variety Pumpkaboo",
    dex: 710,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pumpkaboo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pumpkaboo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pumpkaboo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pumpkaboo.png"
  },
  {
    id: "pumpkaboo_large_variety",
    name: "Large Variety Pumpkaboo",
    dex: 710,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pumpkaboo-large.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pumpkaboo-large.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pumpkaboo-large.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pumpkaboo-large.png"
  },
  {
    id: "pumpkaboo_jumbo_variety",
    name: "Jumbo Variety Pumpkaboo",
    dex: 710,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pumpkaboo-super.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pumpkaboo-super.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pumpkaboo-super.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pumpkaboo-super.png"
  },
  {
    id: "gourgeist_small_variety",
    name: "Small Variety Gourgeist",
    dex: 711,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gourgeist-small.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gourgeist-small.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gourgeist-small.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gourgeist-small.png"
  },
  {
    id: "gourgeist_medium_variety",
    name: "Medium Variety Gourgeist",
    dex: 711,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gourgeist.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gourgeist.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gourgeist.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gourgeist.png"
  },
  {
    id: "gourgeist_large_variety",
    name: "Large Variety Gourgeist",
    dex: 711,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gourgeist-large.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gourgeist-large.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gourgeist-large.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gourgeist-large.png"
  },
  {
    id: "gourgeist_jumbo_variety",
    name: "Jumbo Variety Gourgeist",
    dex: 711,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gourgeist-super.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gourgeist-super.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gourgeist-super.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gourgeist-super.png"
  },
  {
    id: "bergmite",
    name: "Bergmite",
    dex: 712,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bergmite.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bergmite.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bergmite.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bergmite.png"
  },
  {
    id: "avalugg",
    name: "Avalugg",
    dex: 713,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/avalugg.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/avalugg.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/avalugg.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/avalugg.png"
  },
  {
    id: "hisuian_avalugg",
    name: "Hisuian Avalugg",
    dex: 713,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/avalugg-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/avalugg-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/avalugg-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/avalugg-hisuian.png"
  },
  {
    id: "noibat",
    name: "Noibat",
    dex: 714,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/noibat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/noibat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/noibat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/noibat.png"
  },
  {
    id: "noivern",
    name: "Noivern",
    dex: 715,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/noivern.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/noivern.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/noivern.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/noivern.png"
  },
  {
    id: "xerneas_neutral_mode",
    name: "Neutral Mode Xerneas",
    dex: 716,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/xerneas.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/xerneas.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/xerneas.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/xerneas.png"
  },
  {
    id: "yveltal",
    name: "Yveltal",
    dex: 717,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/yveltal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/yveltal.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/yveltal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/yveltal.png"
  },
  {
    id: "zygarde_50_forme",
    name: "50% Forme Zygarde",
    dex: 718,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zygarde.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zygarde.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zygarde.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zygarde.png"
  },
  {
    id: "zygarde_10_forme",
    name: "10% Forme Zygarde",
    dex: 718,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zygarde-10.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zygarde-10.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zygarde-10.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zygarde-10.png"
  },
  {
    id: "zygarde_complete_forme",
    name: "Complete Forme Zygarde",
    dex: 718,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zygarde-complete.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zygarde-complete.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zygarde-complete.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zygarde-complete.png"
  },
  {
    id: "mega_zygarde",
    name: "Mega Zygarde Complete Forme",
    dex: 718,
    spriteM: "https://archives.bulbagarden.net/media/upload/c/cf/HOME0718M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/5/53/HOME0718M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/c/cf/HOME0718M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/5/53/HOME0718M_s.png"
  },
  {
    id: "diancie",
    name: "Diancie",
    dex: 719,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/diancie.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/diancie.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/diancie.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/diancie.png"
  },
  {
    id: "mega_diancie",
    name: "Mega Diancie",
    dex: 719,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/diancie-mega.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/diancie-mega.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/diancie-mega.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/diancie-mega.png"
  },
  {
    id: "hoopa_confined",
    name: "Hoopa Confined",
    dex: 720,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hoopa.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hoopa.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hoopa.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hoopa.png"
  },
  {
    id: "hoopa_unbound",
    name: "Hoopa Unbound",
    dex: 720,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hoopa-unbound.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hoopa-unbound.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hoopa-unbound.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hoopa-unbound.png"
  },
  {
    id: "volcanion",
    name: "Volcanion",
    dex: 721,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/volcanion.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/volcanion.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/volcanion.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/volcanion.png"
  },
  {
    id: "rowlet",
    name: "Rowlet",
    dex: 722,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rowlet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rowlet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rowlet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rowlet.png"
  },
  {
    id: "dartrix",
    name: "Dartrix",
    dex: 723,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dartrix.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dartrix.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dartrix.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dartrix.png"
  },
  {
    id: "decidueye",
    name: "Decidueye",
    dex: 724,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/decidueye.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/decidueye.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/decidueye.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/decidueye.png"
  },
  {
    id: "hisuian_decidueye",
    name: "Hisuian Decidueye",
    dex: 724,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/decidueye-hisuian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/decidueye-hisuian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/decidueye-hisuian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/decidueye-hisuian.png"
  },
  {
    id: "litten",
    name: "Litten",
    dex: 725,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/litten.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/litten.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/litten.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/litten.png"
  },
  {
    id: "torracat",
    name: "Torracat",
    dex: 726,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/torracat.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/torracat.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/torracat.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/torracat.png"
  },
  {
    id: "incineroar",
    name: "Incineroar",
    dex: 727,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/incineroar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/incineroar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/incineroar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/incineroar.png"
  },
  {
    id: "popplio",
    name: "Popplio",
    dex: 728,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/popplio.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/popplio.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/popplio.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/popplio.png"
  },
  {
    id: "brionne",
    name: "Brionne",
    dex: 729,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/brionne.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/brionne.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/brionne.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/brionne.png"
  },
  {
    id: "primarina",
    name: "Primarina",
    dex: 730,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/primarina.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/primarina.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/primarina.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/primarina.png"
  },
  {
    id: "pikipek",
    name: "Pikipek",
    dex: 731,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pikipek.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pikipek.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pikipek.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pikipek.png"
  },
  {
    id: "trumbeak",
    name: "Trumbeak",
    dex: 732,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/trumbeak.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/trumbeak.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/trumbeak.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/trumbeak.png"
  },
  {
    id: "toucannon",
    name: "Toucannon",
    dex: 733,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toucannon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toucannon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toucannon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toucannon.png"
  },
  {
    id: "yungoos",
    name: "Yungoos",
    dex: 734,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/yungoos.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/yungoos.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/yungoos.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/yungoos.png"
  },
  {
    id: "gumshoos",
    name: "Gumshoos",
    dex: 735,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gumshoos.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gumshoos.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gumshoos.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gumshoos.png"
  },
  {
    id: "grubbin",
    name: "Grubbin",
    dex: 736,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grubbin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grubbin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grubbin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grubbin.png"
  },
  {
    id: "charjabug",
    name: "Charjabug",
    dex: 737,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/charjabug.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/charjabug.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/charjabug.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/charjabug.png"
  },
  {
    id: "vikavolt",
    name: "Vikavolt",
    dex: 738,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/vikavolt.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/vikavolt.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/vikavolt.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/vikavolt.png"
  },
  {
    id: "crabrawler",
    name: "Crabrawler",
    dex: 739,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/crabrawler.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/crabrawler.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/crabrawler.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/crabrawler.png"
  },
  {
    id: "crabominable",
    name: "Crabominable",
    dex: 740,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/crabominable.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/crabominable.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/crabominable.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/crabominable.png"
  },
  {
    id: "mega_crabominable",
    name: "Mega Crabominable",
    dex: 740,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/f/fe/HOME0740M.png/400px-HOME0740M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/4/41/HOME0740M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/f/fe/HOME0740M.png/400px-HOME0740M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/4/41/HOME0740M_s.png"
  },
  {
    id: "oricorio_baile_style",
    name: "Baile Style Oricorio",
    dex: 741,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/oricorio-baile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/oricorio-baile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/oricorio-baile.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/oricorio-baile.png"
  },
  {
    id: "oricorio_pom_pom_style",
    name: "Pom-Pom Style Oricorio",
    dex: 741,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/oricorio-pom-pom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/oricorio-pom-pom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/oricorio-pom-pom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/oricorio-pom-pom.png"
  },
  {
    id: "oricorio_pau_style",
    name: "Pa'u Style Oricorio",
    dex: 741,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/oricorio-pau.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/oricorio-pau.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/oricorio-pau.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/oricorio-pau.png"
  },
  {
    id: "oricorio_sensu_style",
    name: "Sensu Style Oricorio",
    dex: 741,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/oricorio-sensu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/oricorio-sensu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/oricorio-sensu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/oricorio-sensu.png"
  },
  {
    id: "cutiefly",
    name: "Cutiefly",
    dex: 742,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cutiefly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cutiefly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cutiefly.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cutiefly.png"
  },
  {
    id: "ribombee",
    name: "Ribombee",
    dex: 743,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ribombee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ribombee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ribombee.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ribombee.png"
  },
  {
    id: "rockruff",
    name: "Rockruff",
    dex: 744,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rockruff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rockruff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rockruff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rockruff.png"
  },
  {
    id: "lycanroc_midday_form",
    name: "Midday Form Lycanroc",
    dex: 745,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lycanroc-midday.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lycanroc-midday.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lycanroc-midday.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lycanroc-midday.png"
  },
  {
    id: "lycanroc_midnight_form",
    name: "Midnight Form Lycanroc",
    dex: 745,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lycanroc-midnight.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lycanroc-midnight.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lycanroc-midnight.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lycanroc-midnight.png"
  },
  {
    id: "lycanroc_dusk_form",
    name: "Dusk Form Lycanroc",
    dex: 745,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lycanroc-dusk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lycanroc-dusk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lycanroc-dusk.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lycanroc-dusk.png"
  },
  {
    id: "wishiwashi_school_form",
    name: "School Form Wishiwashi",
    dex: 746,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wishiwashi-school.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wishiwashi-school.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wishiwashi-school.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wishiwashi-school.png"
  },
  {
    id: "mareanie",
    name: "Mareanie",
    dex: 747,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mareanie.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mareanie.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mareanie.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mareanie.png"
  },
  {
    id: "toxapex",
    name: "Toxapex",
    dex: 748,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toxapex.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toxapex.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toxapex.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toxapex.png"
  },
  {
    id: "mudbray",
    name: "Mudbray",
    dex: 749,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mudbray.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mudbray.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mudbray.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mudbray.png"
  },
  {
    id: "mudsdale",
    name: "Mudsdale",
    dex: 750,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mudsdale.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mudsdale.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mudsdale.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mudsdale.png"
  },
  {
    id: "dewpider",
    name: "Dewpider",
    dex: 751,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dewpider.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dewpider.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dewpider.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dewpider.png"
  },
  {
    id: "araquanid",
    name: "Araquanid",
    dex: 752,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/araquanid.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/araquanid.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/araquanid.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/araquanid.png"
  },
  {
    id: "fomantis",
    name: "Fomantis",
    dex: 753,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/fomantis.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/fomantis.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/fomantis.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/fomantis.png"
  },
  {
    id: "lurantis",
    name: "Lurantis",
    dex: 754,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lurantis.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lurantis.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lurantis.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lurantis.png"
  },
  {
    id: "morelull",
    name: "Morelull",
    dex: 755,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/morelull.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/morelull.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/morelull.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/morelull.png"
  },
  {
    id: "shiinotic",
    name: "Shiinotic",
    dex: 756,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shiinotic.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shiinotic.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shiinotic.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shiinotic.png"
  },
  {
    id: "salandit",
    name: "Salandit",
    dex: 757,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/salandit.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/salandit.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/salandit.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/salandit.png"
  },
  {
    id: "salazzle",
    name: "Salazzle",
    dex: 758,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/salazzle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/salazzle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/salazzle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/salazzle.png"
  },
  {
    id: "stufful",
    name: "Stufful",
    dex: 759,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/stufful.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/stufful.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/stufful.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/stufful.png"
  },
  {
    id: "bewear",
    name: "Bewear",
    dex: 760,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bewear.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bewear.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bewear.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bewear.png"
  },
  {
    id: "bounsweet",
    name: "Bounsweet",
    dex: 761,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bounsweet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bounsweet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bounsweet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bounsweet.png"
  },
  {
    id: "steenee",
    name: "Steenee",
    dex: 762,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/steenee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/steenee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/steenee.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/steenee.png"
  },
  {
    id: "tsareena",
    name: "Tsareena",
    dex: 763,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tsareena.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tsareena.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tsareena.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tsareena.png"
  },
  {
    id: "comfey",
    name: "Comfey",
    dex: 764,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/comfey.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/comfey.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/comfey.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/comfey.png"
  },
  {
    id: "oranguru",
    name: "Oranguru",
    dex: 765,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/oranguru.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/oranguru.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/oranguru.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/oranguru.png"
  },
  {
    id: "passimian",
    name: "Passimian",
    dex: 766,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/passimian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/passimian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/passimian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/passimian.png"
  },
  {
    id: "wimpod",
    name: "Wimpod",
    dex: 767,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wimpod.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wimpod.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wimpod.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wimpod.png"
  },
  {
    id: "golisopod",
    name: "Golisopod",
    dex: 768,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/golisopod.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/golisopod.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/golisopod.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/golisopod.png"
  },
  {
    id: "mega_golisopod",
    name: "Mega Golisopod",
    dex: 768,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/9/95/HOME0768M.png/400px-HOME0768M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/d/da/HOME0768M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/9/95/HOME0768M.png/400px-HOME0768M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/d/da/HOME0768M_s.png"
  },
  {
    id: "sandygast",
    name: "Sandygast",
    dex: 769,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandygast.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandygast.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandygast.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandygast.png"
  },
  {
    id: "palossand",
    name: "Palossand",
    dex: 770,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/palossand.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/palossand.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/palossand.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/palossand.png"
  },
  {
    id: "pyukumuku",
    name: "Pyukumuku",
    dex: 771,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pyukumuku.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pyukumuku.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pyukumuku.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pyukumuku.png"
  },
  {
    id: "type_null",
    name: "Type: Null",
    dex: 772,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/type-null.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/type-null.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/type-null.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/type-null.png"
  },
  {
    id: "silvally",
    name: "Silvally",
    dex: 773,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/silvally.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/silvally.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/silvally.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/silvally.png"
  },
  {
    id: "minior_meteor_form",
    name: "Meteor Form Minior",
    dex: 774,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minior-meteor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minior-meteor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minior-meteor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minior-meteor.png"
  },
  {
    id: "minior_red_core",
    name: "Red Core Minior",
    dex: 774,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minior-red-core.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minior-red-core.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png"
  },
  {
    id: "minior_orange_core",
    name: "Orange Core Minior",
    dex: 774,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minior-orange-core.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minior-orange-core.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png"
  },
  {
    id: "minior_yellow_core",
    name: "Yellow Core Minior",
    dex: 774,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minior-yellow-core.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minior-yellow-core.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png"
  },
  {
    id: "minior_green_core",
    name: "Green Core Minior",
    dex: 774,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minior-green-core.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minior-green-core.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png"
  },
  {
    id: "minior_blue_core",
    name: "Blue Core Minior",
    dex: 774,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minior-blue-core.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minior-blue-core.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png"
  },
  {
    id: "minior_indigo_core",
    name: "Indigo Core Minior",
    dex: 774,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minior-indigo-core.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minior-indigo-core.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png"
  },
  {
    id: "minior_violet_core",
    name: "Violet Core Minior",
    dex: 774,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/minior-violet-core.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/minior-violet-core.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/minior-core.png"
  },
  {
    id: "komala",
    name: "Komala",
    dex: 775,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/komala.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/komala.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/komala.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/komala.png"
  },
  {
    id: "turtonator",
    name: "Turtonator",
    dex: 776,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/turtonator.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/turtonator.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/turtonator.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/turtonator.png"
  },
  {
    id: "togedemaru",
    name: "Togedemaru",
    dex: 777,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/togedemaru.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/togedemaru.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/togedemaru.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/togedemaru.png"
  },
  {
    id: "mimikyu_disguised_form",
    name: "Disguised Form Mimikyu",
    dex: 778,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mimikyu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mimikyu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mimikyu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mimikyu.png"
  },
  {
    id: "bruxish",
    name: "Bruxish",
    dex: 779,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bruxish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bruxish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bruxish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bruxish.png"
  },
  {
    id: "drampa",
    name: "Drampa",
    dex: 780,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drampa.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drampa.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drampa.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drampa.png"
  },
  {
    id: "mega_drampa",
    name: "Mega Drampa",
    dex: 780,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/e/e5/HOME0780M.png/400px-HOME0780M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/e/eb/HOME0780M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/e/e5/HOME0780M.png/400px-HOME0780M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/e/eb/HOME0780M_s.png"
  },
  {
    id: "dhelmise",
    name: "Dhelmise",
    dex: 781,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dhelmise.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dhelmise.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dhelmise.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dhelmise.png"
  },
  {
    id: "jangmo_o",
    name: "Jangmo-o",
    dex: 782,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/jangmo-o.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/jangmo-o.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/jangmo-o.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/jangmo-o.png"
  },
  {
    id: "hakamo_o",
    name: "Hakamo-o",
    dex: 783,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hakamo-o.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hakamo-o.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hakamo-o.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hakamo-o.png"
  },
  {
    id: "kommo_o",
    name: "Kommo-o",
    dex: 784,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kommo-o.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kommo-o.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kommo-o.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kommo-o.png"
  },
  {
    id: "tapu_koko",
    name: "Tapu Koko",
    dex: 785,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tapu-koko.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tapu-koko.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tapu-koko.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tapu-koko.png"
  },
  {
    id: "tapu_lele",
    name: "Tapu Lele",
    dex: 786,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tapu-lele.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tapu-lele.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tapu-lele.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tapu-lele.png"
  },
  {
    id: "tapu_bulu",
    name: "Tapu Bulu",
    dex: 787,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tapu-bulu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tapu-bulu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tapu-bulu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tapu-bulu.png"
  },
  {
    id: "tapu_fini",
    name: "Tapu Fini",
    dex: 788,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tapu-fini.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tapu-fini.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tapu-fini.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tapu-fini.png"
  },
  {
    id: "cosmog",
    name: "Cosmog",
    dex: 789,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cosmog.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cosmog.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cosmog.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cosmog.png"
  },
  {
    id: "cosmoem",
    name: "Cosmoem",
    dex: 790,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cosmoem.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cosmoem.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cosmoem.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cosmoem.png"
  },
  {
    id: "solgaleo",
    name: "Solgaleo",
    dex: 791,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/solgaleo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/solgaleo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/solgaleo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/solgaleo.png"
  },
  {
    id: "lunala",
    name: "Lunala",
    dex: 792,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lunala.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lunala.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lunala.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lunala.png"
  },
  {
    id: "nihilego",
    name: "Nihilego",
    dex: 793,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nihilego.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nihilego.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nihilego.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nihilego.png"
  },
  {
    id: "buzzwole",
    name: "Buzzwole",
    dex: 794,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/buzzwole.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/buzzwole.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/buzzwole.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/buzzwole.png"
  },
  {
    id: "pheromosa",
    name: "Pheromosa",
    dex: 795,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pheromosa.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pheromosa.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pheromosa.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pheromosa.png"
  },
  {
    id: "xurkitree",
    name: "Xurkitree",
    dex: 796,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/xurkitree.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/xurkitree.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/xurkitree.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/xurkitree.png"
  },
  {
    id: "celesteela",
    name: "Celesteela",
    dex: 797,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/celesteela.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/celesteela.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/celesteela.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/celesteela.png"
  },
  {
    id: "kartana",
    name: "Kartana",
    dex: 798,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kartana.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kartana.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kartana.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kartana.png"
  },
  {
    id: "guzzlord",
    name: "Guzzlord",
    dex: 799,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/guzzlord.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/guzzlord.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/guzzlord.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/guzzlord.png"
  },
  {
    id: "necrozma",
    name: "Necrozma",
    dex: 800,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/necrozma.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/necrozma.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/necrozma.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/necrozma.png"
  },
  {
    id: "dusk_mane_necrozma",
    name: "Dusk Mane Necrozma",
    dex: 800,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/necrozma-dusk-mane.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/necrozma-dusk-mane.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/necrozma-dusk-mane.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/necrozma-dusk-mane.png"
  },
  {
    id: "dawn_wings_necrozma",
    name: "Dawn Wings Necrozma",
    dex: 800,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/necrozma-dawn-wings.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/necrozma-dawn-wings.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/necrozma-dawn-wings.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/necrozma-dawn-wings.png"
  },
  {
    id: "ultra_necrozma",
    name: "Ultra Necrozma",
    dex: 800,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/necrozma-ultra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/necrozma-ultra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/necrozma-ultra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/necrozma-ultra.png"
  },
  {
    id: "magearna",
    name: "Magearna",
    dex: 801,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magearna.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magearna.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magearna.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magearna.png"
  },
  {
    id: "original_color_magearna",
    name: "Original Color Magearna",
    dex: 801,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/magearna-original.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/magearna-original.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/magearna-original.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/magearna-original.png"
  },
  {
    id: "mega_magearna",
    name: "Mega Magearna",
    dex: 801,
    spriteM: "https://archives.bulbagarden.net/media/upload/4/42/HOME0801M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/0/03/HOME0801M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/4/42/HOME0801M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/0/03/HOME0801M_s.png"
  },
  {
    id: "mega_original_color_magearna",
    name: "Mega Magearna Original Color",
    dex: 801,
    spriteM: "https://archives.bulbagarden.net/media/upload/2/22/HOME0801MO.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/2/2f/HOME0801MO_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/2/22/HOME0801MO.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/2/2f/HOME0801MO_s.png"
  },
  {
    id: "marshadow",
    name: "Marshadow",
    dex: 802,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/marshadow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/marshadow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/marshadow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/marshadow.png"
  },
  {
    id: "poipole",
    name: "Poipole",
    dex: 803,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/poipole.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/poipole.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/poipole.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/poipole.png"
  },
  {
    id: "naganadel",
    name: "Naganadel",
    dex: 804,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/naganadel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/naganadel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/naganadel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/naganadel.png"
  },
  {
    id: "stakataka",
    name: "Stakataka",
    dex: 805,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/stakataka.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/stakataka.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/stakataka.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/stakataka.png"
  },
  {
    id: "blacephalon",
    name: "Blacephalon",
    dex: 806,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blacephalon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blacephalon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blacephalon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blacephalon.png"
  },
  {
    id: "zeraora",
    name: "Zeraora",
    dex: 807,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zeraora.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zeraora.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zeraora.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zeraora.png"
  },
  {
    id: "mega_zeraora",
    name: "Mega Zeraora",
    dex: 807,
    spriteM: "https://archives.bulbagarden.net/media/upload/8/85/HOME0807M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/d/d6/HOME0807M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/8/85/HOME0807M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/d/d6/HOME0807M_s.png"
  },
  {
    id: "meltan",
    name: "Meltan",
    dex: 808,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meltan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meltan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meltan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meltan.png"
  },
  {
    id: "melmetal",
    name: "Melmetal",
    dex: 809,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/melmetal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/melmetal.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/melmetal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/melmetal.png"
  },
  {
    id: "gigantamax_melmetal",
    name: "Gigantamax Melmetal",
    dex: 809,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/melmetal-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/melmetal-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/melmetal-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/melmetal-gigantamax.png"
  },
  {
    id: "grookey",
    name: "Grookey",
    dex: 810,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grookey.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grookey.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grookey.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grookey.png"
  },
  {
    id: "thwackey",
    name: "Thwackey",
    dex: 811,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/thwackey.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/thwackey.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/thwackey.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/thwackey.png"
  },
  {
    id: "rillaboom",
    name: "Rillaboom",
    dex: 812,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rillaboom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rillaboom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rillaboom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rillaboom.png"
  },
  {
    id: "gigantamax_rillaboom",
    name: "Gigantamax Rillaboom",
    dex: 812,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rillaboom-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rillaboom-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rillaboom-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rillaboom-gigantamax.png"
  },
  {
    id: "scorbunny",
    name: "Scorbunny",
    dex: 813,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scorbunny.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scorbunny.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scorbunny.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scorbunny.png"
  },
  {
    id: "raboot",
    name: "Raboot",
    dex: 814,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/raboot.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/raboot.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/raboot.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/raboot.png"
  },
  {
    id: "cinderace",
    name: "Cinderace",
    dex: 815,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cinderace.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cinderace.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cinderace.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cinderace.png"
  },
  {
    id: "gigantamax_cinderace",
    name: "Gigantamax Cinderace",
    dex: 815,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cinderace-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cinderace-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cinderace-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cinderace-gigantamax.png"
  },
  {
    id: "sobble",
    name: "Sobble",
    dex: 816,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sobble.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sobble.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sobble.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sobble.png"
  },
  {
    id: "drizzile",
    name: "Drizzile",
    dex: 817,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drizzile.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drizzile.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drizzile.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drizzile.png"
  },
  {
    id: "inteleon",
    name: "Inteleon",
    dex: 818,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/inteleon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/inteleon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/inteleon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/inteleon.png"
  },
  {
    id: "gigantamax_inteleon",
    name: "Gigantamax Inteleon",
    dex: 818,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/inteleon-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/inteleon-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/inteleon-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/inteleon-gigantamax.png"
  },
  {
    id: "skwovet",
    name: "Skwovet",
    dex: 819,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skwovet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skwovet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skwovet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skwovet.png"
  },
  {
    id: "greedent",
    name: "Greedent",
    dex: 820,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/greedent.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/greedent.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/greedent.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/greedent.png"
  },
  {
    id: "rookidee",
    name: "Rookidee",
    dex: 821,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rookidee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rookidee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rookidee.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rookidee.png"
  },
  {
    id: "corvisquire",
    name: "Corvisquire",
    dex: 822,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/corvisquire.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/corvisquire.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/corvisquire.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/corvisquire.png"
  },
  {
    id: "corviknight",
    name: "Corviknight",
    dex: 823,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/corviknight.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/corviknight.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/corviknight.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/corviknight.png"
  },
  {
    id: "gigantamax_corviknight",
    name: "Gigantamax Corviknight",
    dex: 823,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/corviknight-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/corviknight-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/corviknight-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/corviknight-gigantamax.png"
  },
  {
    id: "blipbug",
    name: "Blipbug",
    dex: 824,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/blipbug.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/blipbug.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/blipbug.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/blipbug.png"
  },
  {
    id: "dottler",
    name: "Dottler",
    dex: 825,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dottler.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dottler.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dottler.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dottler.png"
  },
  {
    id: "orbeetle",
    name: "Orbeetle",
    dex: 826,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/orbeetle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/orbeetle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/orbeetle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/orbeetle.png"
  },
  {
    id: "gigantamax_orbeetle",
    name: "Gigantamax Orbeetle",
    dex: 826,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/orbeetle-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/orbeetle-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/orbeetle-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/orbeetle-gigantamax.png"
  },
  {
    id: "nickit",
    name: "Nickit",
    dex: 827,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nickit.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nickit.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nickit.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nickit.png"
  },
  {
    id: "thievul",
    name: "Thievul",
    dex: 828,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/thievul.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/thievul.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/thievul.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/thievul.png"
  },
  {
    id: "gossifleur",
    name: "Gossifleur",
    dex: 829,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gossifleur.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gossifleur.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gossifleur.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gossifleur.png"
  },
  {
    id: "eldegoss",
    name: "Eldegoss",
    dex: 830,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eldegoss.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eldegoss.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eldegoss.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eldegoss.png"
  },
  {
    id: "wooloo",
    name: "Wooloo",
    dex: 831,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wooloo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wooloo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wooloo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wooloo.png"
  },
  {
    id: "dubwool",
    name: "Dubwool",
    dex: 832,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dubwool.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dubwool.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dubwool.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dubwool.png"
  },
  {
    id: "chewtle",
    name: "Chewtle",
    dex: 833,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chewtle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chewtle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chewtle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chewtle.png"
  },
  {
    id: "drednaw",
    name: "Drednaw",
    dex: 834,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drednaw.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drednaw.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drednaw.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drednaw.png"
  },
  {
    id: "gigantamax_drednaw",
    name: "Gigantamax Drednaw",
    dex: 834,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drednaw-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drednaw-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drednaw-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drednaw-gigantamax.png"
  },
  {
    id: "yamper",
    name: "Yamper",
    dex: 835,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/yamper.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/yamper.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/yamper.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/yamper.png"
  },
  {
    id: "boltund",
    name: "Boltund",
    dex: 836,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/boltund.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/boltund.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/boltund.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/boltund.png"
  },
  {
    id: "rolycoly",
    name: "Rolycoly",
    dex: 837,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rolycoly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rolycoly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rolycoly.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rolycoly.png"
  },
  {
    id: "carkol",
    name: "Carkol",
    dex: 838,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/carkol.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/carkol.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/carkol.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/carkol.png"
  },
  {
    id: "coalossal",
    name: "Coalossal",
    dex: 839,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/coalossal.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/coalossal.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/coalossal.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/coalossal.png"
  },
  {
    id: "gigantamax_coalossal",
    name: "Gigantamax Coalossal",
    dex: 839,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/coalossal-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/coalossal-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/coalossal-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/coalossal-gigantamax.png"
  },
  {
    id: "applin",
    name: "Applin",
    dex: 840,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/applin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/applin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/applin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/applin.png"
  },
  {
    id: "flapple",
    name: "Flapple",
    dex: 841,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flapple.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flapple.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flapple.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flapple.png"
  },
  {
    id: "gigantamax_flapple",
    name: "Gigantamax Flapple",
    dex: 841,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flapple-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flapple-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flapple-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flapple-gigantamax.png"
  },
  {
    id: "appletun",
    name: "Appletun",
    dex: 842,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/appletun.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/appletun.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/appletun.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/appletun.png"
  },
  {
    id: "gigantamax_appletun",
    name: "Gigantamax Appletun",
    dex: 842,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/appletun-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/appletun-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/appletun-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/appletun-gigantamax.png"
  },
  {
    id: "silicobra",
    name: "Silicobra",
    dex: 843,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/silicobra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/silicobra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/silicobra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/silicobra.png"
  },
  {
    id: "sandaconda",
    name: "Sandaconda",
    dex: 844,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandaconda.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandaconda.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandaconda.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandaconda.png"
  },
  {
    id: "gigantamax_sandaconda",
    name: "Gigantamax Sandaconda",
    dex: 844,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandaconda-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandaconda-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandaconda-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandaconda-gigantamax.png"
  },
  {
    id: "cramorant",
    name: "Cramorant",
    dex: 845,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cramorant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cramorant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cramorant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cramorant.png"
  },
  {
    id: "arrokuda",
    name: "Arrokuda",
    dex: 846,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arrokuda.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arrokuda.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arrokuda.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arrokuda.png"
  },
  {
    id: "barraskewda",
    name: "Barraskewda",
    dex: 847,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/barraskewda.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/barraskewda.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/barraskewda.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/barraskewda.png"
  },
  {
    id: "toxel",
    name: "Toxel",
    dex: 848,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toxel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toxel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toxel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toxel.png"
  },
  {
    id: "toxtricity_amped_form",
    name: "Amped Form Toxtricity",
    dex: 849,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toxtricity-amped.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toxtricity-amped.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toxtricity-amped.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toxtricity-amped.png"
  },
  {
    id: "toxtricity_low_key_form",
    name: "Low Key Form Toxtricity",
    dex: 849,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toxtricity-low-key.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toxtricity-low-key.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toxtricity-low-key.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toxtricity-low-key.png"
  },
  {
    id: "gigantamax_toxtricity_amped_form",
    name: "Gigantamax Toxtricity Amped Form",
    dex: 849,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toxtricity-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toxtricity-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toxtricity-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toxtricity-gigantamax.png"
  },
  {
    id: "gigantamax_toxtricity_low_key_form",
    name: "Gigantamax Toxtricity Low Key Form",
    dex: 849,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toxtricity-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toxtricity-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toxtricity-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toxtricity-gigantamax.png"
  },
  {
    id: "sizzlipede",
    name: "Sizzlipede",
    dex: 850,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sizzlipede.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sizzlipede.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sizzlipede.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sizzlipede.png"
  },
  {
    id: "centiskorch",
    name: "Centiskorch",
    dex: 851,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/centiskorch.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/centiskorch.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/centiskorch.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/centiskorch.png"
  },
  {
    id: "gigantamax_centiskorch",
    name: "Gigantamax Centiskorch",
    dex: 851,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/centiskorch-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/centiskorch-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/centiskorch-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/centiskorch-gigantamax.png"
  },
  {
    id: "clobbopus",
    name: "Clobbopus",
    dex: 852,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/clobbopus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/clobbopus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/clobbopus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/clobbopus.png"
  },
  {
    id: "grapploct",
    name: "Grapploct",
    dex: 853,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grapploct.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grapploct.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grapploct.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grapploct.png"
  },
  {
    id: "sinistea_phony_form",
    name: "Phony Form Sinistea",
    dex: 854,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sinistea.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sinistea.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sinistea.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sinistea.png"
  },
  {
    id: "sinistea_antique_form",
    name: "Antique Form Sinistea",
    dex: 854,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sinistea.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sinistea.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sinistea.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sinistea.png"
  },
  {
    id: "polteageist_phony_form",
    name: "Phony Form Polteageist",
    dex: 855,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/polteageist.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/polteageist.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/polteageist.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/polteageist.png"
  },
  {
    id: "polteageist_antique_form",
    name: "Antique Form Polteageist",
    dex: 855,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/polteageist.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/polteageist.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/polteageist.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/polteageist.png"
  },
  {
    id: "hatenna",
    name: "Hatenna",
    dex: 856,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hatenna.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hatenna.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hatenna.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hatenna.png"
  },
  {
    id: "hattrem",
    name: "Hattrem",
    dex: 857,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hattrem.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hattrem.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hattrem.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hattrem.png"
  },
  {
    id: "hatterene",
    name: "Hatterene",
    dex: 858,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hatterene.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hatterene.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hatterene.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hatterene.png"
  },
  {
    id: "gigantamax_hatterene",
    name: "Gigantamax Hatterene",
    dex: 858,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/hatterene-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/hatterene-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/hatterene-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/hatterene-gigantamax.png"
  },
  {
    id: "impidimp",
    name: "Impidimp",
    dex: 859,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/impidimp.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/impidimp.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/impidimp.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/impidimp.png"
  },
  {
    id: "morgrem",
    name: "Morgrem",
    dex: 860,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/morgrem.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/morgrem.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/morgrem.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/morgrem.png"
  },
  {
    id: "grimmsnarl",
    name: "Grimmsnarl",
    dex: 861,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grimmsnarl.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grimmsnarl.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grimmsnarl.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grimmsnarl.png"
  },
  {
    id: "gigantamax_grimmsnarl",
    name: "Gigantamax Grimmsnarl",
    dex: 861,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grimmsnarl-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grimmsnarl-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grimmsnarl-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grimmsnarl-gigantamax.png"
  },
  {
    id: "obstagoon",
    name: "Obstagoon",
    dex: 862,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/obstagoon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/obstagoon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/obstagoon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/obstagoon.png"
  },
  {
    id: "perrserker",
    name: "Perrserker",
    dex: 863,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/perrserker.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/perrserker.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/perrserker.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/perrserker.png"
  },
  {
    id: "cursola",
    name: "Cursola",
    dex: 864,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cursola.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cursola.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cursola.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cursola.png"
  },
  {
    id: "sirfetchd",
    name: "Sirfetch’d",
    dex: 865,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sirfetchd.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sirfetchd.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sirfetchd.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sirfetchd.png"
  },
  {
    id: "mr_rime",
    name: "Mr. Rime",
    dex: 866,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mr-rime.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mr-rime.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mr-rime.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mr-rime.png"
  },
  {
    id: "runerigus",
    name: "Runerigus",
    dex: 867,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/runerigus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/runerigus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/runerigus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/runerigus.png"
  },
  {
    id: "milcery",
    name: "Milcery",
    dex: 868,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/milcery.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/milcery.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/milcery.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/milcery.png"
  },
  {
    id: "vanilla_cream_alcremie_strawberry_sweet",
    name: "Vanilla Cream Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-strawberry.png"
  },
  {
    id: "vanilla_cream_alcremie_love_sweet",
    name: "Vanilla Cream Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-love.png"
  },
  {
    id: "vanilla_cream_alcremie_berry_sweet",
    name: "Vanilla Cream Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-berry.png"
  },
  {
    id: "vanilla_cream_alcremie_clover_sweet",
    name: "Vanilla Cream Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-clover.png"
  },
  {
    id: "vanilla_cream_alcremie_flower_sweet",
    name: "Vanilla Cream Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-flower.png"
  },
  {
    id: "vanilla_cream_alcremie_star_sweet",
    name: "Vanilla Cream Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-star.png"
  },
  {
    id: "vanilla_cream_alcremie_ribbon_sweet",
    name: "Vanilla Cream Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-vanilla-cream-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-vanilla-cream-ribbon.png"
  },
  {
    id: "ruby_cream_alcremie_strawberry_sweet",
    name: "Ruby Cream Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-strawberry.png"
  },
  {
    id: "ruby_cream_alcremie_love_sweet",
    name: "Ruby Cream Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-love.png"
  },
  {
    id: "ruby_cream_alcremie_berry_sweet",
    name: "Ruby Cream Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-berry.png"
  },
  {
    id: "ruby_cream_alcremie_clover_sweet",
    name: "Ruby Cream Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-clover.png"
  },
  {
    id: "ruby_cream_alcremie_flower_sweet",
    name: "Ruby Cream Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-flower.png"
  },
  {
    id: "ruby_cream_alcremie_star_sweet",
    name: "Ruby Cream Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-star.png"
  },
  {
    id: "ruby_cream_alcremie_ribbon_sweet",
    name: "Ruby Cream Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-cream-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-cream-ribbon.png"
  },
  {
    id: "matcha_cream_alcremie_strawberry_sweet",
    name: "Matcha Cream Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-strawberry.png"
  },
  {
    id: "matcha_cream_alcremie_love_sweet",
    name: "Matcha Cream Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-love.png"
  },
  {
    id: "matcha_cream_alcremie_berry_sweet",
    name: "Matcha Cream Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-berry.png"
  },
  {
    id: "matcha_cream_alcremie_clover_sweet",
    name: "Matcha Cream Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-clover.png"
  },
  {
    id: "matcha_cream_alcremie_flower_sweet",
    name: "Matcha Cream Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-flower.png"
  },
  {
    id: "matcha_cream_alcremie_star_sweet",
    name: "Matcha Cream Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-star.png"
  },
  {
    id: "matcha_cream_alcremie_ribbon_sweet",
    name: "Matcha Cream Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-matcha-cream-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-matcha-cream-ribbon.png"
  },
  {
    id: "mint_cream_alcremie_strawberry_sweet",
    name: "Mint Cream Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-strawberry.png"
  },
  {
    id: "mint_cream_alcremie_love_sweet",
    name: "Mint Cream Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-love.png"
  },
  {
    id: "mint_cream_alcremie_berry_sweet",
    name: "Mint Cream Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-berry.png"
  },
  {
    id: "mint_cream_alcremie_clover_sweet",
    name: "Mint Cream Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-clover.png"
  },
  {
    id: "mint_cream_alcremie_flower_sweet",
    name: "Mint Cream Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-flower.png"
  },
  {
    id: "mint_cream_alcremie_star_sweet",
    name: "Mint Cream Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-star.png"
  },
  {
    id: "mint_cream_alcremie_ribbon_sweet",
    name: "Mint Cream Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-mint-cream-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-mint-cream-ribbon.png"
  },
  {
    id: "lemon_cream_alcremie_strawberry_sweet",
    name: "Lemon Cream Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-strawberry.png"
  },
  {
    id: "lemon_cream_alcremie_love_sweet",
    name: "Lemon Cream Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-love.png"
  },
  {
    id: "lemon_cream_alcremie_berry_sweet",
    name: "Lemon Cream Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-berry.png"
  },
  {
    id: "lemon_cream_alcremie_clover_sweet",
    name: "Lemon Cream Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-clover.png"
  },
  {
    id: "lemon_cream_alcremie_flower_sweet",
    name: "Lemon Cream Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-flower.png"
  },
  {
    id: "lemon_cream_alcremie_star_sweet",
    name: "Lemon Cream Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-star.png"
  },
  {
    id: "lemon_cream_alcremie_ribbon_sweet",
    name: "Lemon Cream Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-lemon-cream-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-lemon-cream-ribbon.png"
  },
  {
    id: "salted_cream_alcremie_strawberry_sweet",
    name: "Salted Cream Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-strawberry.png"
  },
  {
    id: "salted_cream_alcremie_love_sweet",
    name: "Salted Cream Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-love.png"
  },
  {
    id: "salted_cream_alcremie_berry_sweet",
    name: "Salted Cream Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-berry.png"
  },
  {
    id: "salted_cream_alcremie_clover_sweet",
    name: "Salted Cream Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-clover.png"
  },
  {
    id: "salted_cream_alcremie_flower_sweet",
    name: "Salted Cream Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-flower.png"
  },
  {
    id: "salted_cream_alcremie_star_sweet",
    name: "Salted Cream Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-star.png"
  },
  {
    id: "salted_cream_alcremie_ribbon_sweet",
    name: "Salted Cream Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-salted-cream-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-salted-cream-ribbon.png"
  },
  {
    id: "ruby_swirl_alcremie_strawberry_sweet",
    name: "Ruby Swirl Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-strawberry.png"
  },
  {
    id: "ruby_swirl_alcremie_love_sweet",
    name: "Ruby Swirl Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-love.png"
  },
  {
    id: "ruby_swirl_alcremie_berry_sweet",
    name: "Ruby Swirl Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-berry.png"
  },
  {
    id: "ruby_swirl_alcremie_clover_sweet",
    name: "Ruby Swirl Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-clover.png"
  },
  {
    id: "ruby_swirl_alcremie_flower_sweet",
    name: "Ruby Swirl Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-flower.png"
  },
  {
    id: "ruby_swirl_alcremie_star_sweet",
    name: "Ruby Swirl Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-star.png"
  },
  {
    id: "ruby_swirl_alcremie_ribbon_sweet",
    name: "Ruby Swirl Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-ruby-swirl-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-ruby-swirl-ribbon.png"
  },
  {
    id: "caramel_swirl_alcremie_strawberry_sweet",
    name: "Caramel Swirl Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-strawberry.png"
  },
  {
    id: "caramel_swirl_alcremie_love_sweet",
    name: "Caramel Swirl Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-love.png"
  },
  {
    id: "caramel_swirl_alcremie_berry_sweet",
    name: "Caramel Swirl Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-berry.png"
  },
  {
    id: "caramel_swirl_alcremie_clover_sweet",
    name: "Caramel Swirl Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-clover.png"
  },
  {
    id: "caramel_swirl_alcremie_flower_sweet",
    name: "Caramel Swirl Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-flower.png"
  },
  {
    id: "caramel_swirl_alcremie_star_sweet",
    name: "Caramel Swirl Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-star.png"
  },
  {
    id: "caramel_swirl_alcremie_ribbon_sweet",
    name: "Caramel Swirl Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-caramel-swirl-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-caramel-swirl-ribbon.png"
  },
  {
    id: "rainbow_swirl_alcremie_strawberry_sweet",
    name: "Rainbow Swirl Alcremie Strawberry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-strawberry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-strawberry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-strawberry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-strawberry.png"
  },
  {
    id: "rainbow_swirl_alcremie_love_sweet",
    name: "Rainbow Swirl Alcremie Love Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-love.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-love.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-love.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-love.png"
  },
  {
    id: "rainbow_swirl_alcremie_berry_sweet",
    name: "Rainbow Swirl Alcremie Berry Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-berry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-berry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-berry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-berry.png"
  },
  {
    id: "rainbow_swirl_alcremie_clover_sweet",
    name: "Rainbow Swirl Alcremie Clover Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-clover.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-clover.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-clover.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-clover.png"
  },
  {
    id: "rainbow_swirl_alcremie_flower_sweet",
    name: "Rainbow Swirl Alcremie Flower Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-flower.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-flower.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-flower.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-flower.png"
  },
  {
    id: "rainbow_swirl_alcremie_star_sweet",
    name: "Rainbow Swirl Alcremie Star Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-star.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-star.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-star.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-star.png"
  },
  {
    id: "rainbow_swirl_alcremie_ribbon_sweet",
    name: "Rainbow Swirl Alcremie Ribbon Sweet",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-ribbon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-ribbon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-rainbow-swirl-ribbon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-rainbow-swirl-ribbon.png"
  },
  {
    id: "gigantamax_alcremie",
    name: "Gigantamax Alcremie",
    dex: 869,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/alcremie-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/alcremie-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/alcremie-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/alcremie-gigantamax.png"
  },
  {
    id: "falinks",
    name: "Falinks",
    dex: 870,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/falinks.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/falinks.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/falinks.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/falinks.png"
  },
  {
    id: "mega_falinks",
    name: "Mega Falinks",
    dex: 870,
    spriteM: "https://archives.bulbagarden.net/media/upload/7/75/HOME0870M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/9/91/HOME0870M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/7/75/HOME0870M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/9/91/HOME0870M_s.png"
  },
  {
    id: "pincurchin",
    name: "Pincurchin",
    dex: 871,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pincurchin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pincurchin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pincurchin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pincurchin.png"
  },
  {
    id: "snom",
    name: "Snom",
    dex: 872,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/snom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/snom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/snom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/snom.png"
  },
  {
    id: "frosmoth",
    name: "Frosmoth",
    dex: 873,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/frosmoth.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/frosmoth.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/frosmoth.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/frosmoth.png"
  },
  {
    id: "stonjourner",
    name: "Stonjourner",
    dex: 874,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/stonjourner.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/stonjourner.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/stonjourner.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/stonjourner.png"
  },
  {
    id: "eiscue_ice_face",
    name: "Ice Face Eiscue",
    dex: 875,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eiscue.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eiscue.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eiscue.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eiscue.png"
  },
  {
    id: "eiscue_noice_face",
    name: "Noice Face Eiscue",
    dex: 875,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eiscue-noice.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eiscue-noice.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eiscue-noice.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eiscue-noice.png"
  },
  {
    id: "indeedee",
    name: "Indeedee",
    dex: 876,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/indeedee.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/indeedee.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/indeedee-female.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/indeedee-female.png"
  },
  {
    id: "morpeko_full_belly_mode",
    name: "Full Belly Mode Morpeko",
    dex: 877,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/morpeko.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/morpeko.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/morpeko.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/morpeko.png"
  },
  {
    id: "morpeko_hangry_mode",
    name: "Hangry Mode Morpeko",
    dex: 877,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/morpeko-hangry.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/morpeko-hangry.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/morpeko-hangry.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/morpeko-hangry.png"
  },
  {
    id: "cufant",
    name: "Cufant",
    dex: 878,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cufant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cufant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cufant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cufant.png"
  },
  {
    id: "copperajah",
    name: "Copperajah",
    dex: 879,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/copperajah.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/copperajah.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/copperajah.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/copperajah.png"
  },
  {
    id: "gigantamax_copperajah",
    name: "Gigantamax Copperajah",
    dex: 879,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/copperajah-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/copperajah-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/copperajah-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/copperajah-gigantamax.png"
  },
  {
    id: "dracozolt",
    name: "Dracozolt",
    dex: 880,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dracozolt.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dracozolt.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dracozolt.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dracozolt.png"
  },
  {
    id: "arctozolt",
    name: "Arctozolt",
    dex: 881,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arctozolt.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arctozolt.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arctozolt.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arctozolt.png"
  },
  {
    id: "dracovish",
    name: "Dracovish",
    dex: 882,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dracovish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dracovish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dracovish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dracovish.png"
  },
  {
    id: "arctovish",
    name: "Arctovish",
    dex: 883,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arctovish.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arctovish.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arctovish.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arctovish.png"
  },
  {
    id: "duraludon",
    name: "Duraludon",
    dex: 884,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/duraludon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/duraludon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/duraludon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/duraludon.png"
  },
  {
    id: "gigantamax_duraludon",
    name: "Gigantamax Duraludon",
    dex: 884,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/duraludon-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/duraludon-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/duraludon-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/duraludon-gigantamax.png"
  },
  {
    id: "dreepy",
    name: "Dreepy",
    dex: 885,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dreepy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dreepy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dreepy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dreepy.png"
  },
  {
    id: "drakloak",
    name: "Drakloak",
    dex: 886,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/drakloak.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/drakloak.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/drakloak.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/drakloak.png"
  },
  {
    id: "dragapult",
    name: "Dragapult",
    dex: 887,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dragapult.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dragapult.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dragapult.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dragapult.png"
  },
  {
    id: "zacian_hero_of_many_battles",
    name: "Hero of Many Battles Zacian",
    dex: 888,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zacian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zacian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zacian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zacian.png"
  },
  {
    id: "zacian_crowned_sword",
    name: "Crowned Sword Zacian",
    dex: 888,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zacian-crowned.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zacian-crowned.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zacian-crowned.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zacian-crowned.png"
  },
  {
    id: "zamazenta_hero_of_many_battles",
    name: "Hero of Many Battles Zamazenta",
    dex: 889,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zamazenta.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zamazenta.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zamazenta.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zamazenta.png"
  },
  {
    id: "zamazenta_crowned_shield",
    name: "Crowned Shield Zamazenta",
    dex: 889,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zamazenta-crowned.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zamazenta-crowned.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zamazenta-crowned.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zamazenta-crowned.png"
  },
  {
    id: "eternatus",
    name: "Eternatus",
    dex: 890,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eternatus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eternatus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eternatus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eternatus.png"
  },
  {
    id: "eternamax_eternatus",
    name: "Eternamax Eternatus",
    dex: 890,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/eternatus-eternamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/eternatus-eternamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/eternatus-eternamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/eternatus-eternamax.png"
  },
  {
    id: "kubfu",
    name: "Kubfu",
    dex: 891,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kubfu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kubfu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kubfu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kubfu.png"
  },
  {
    id: "urshifu_single_strike_style",
    name: "Single Strike Style Urshifu",
    dex: 892,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/urshifu-single-strike.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/urshifu-single-strike.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/urshifu-single-strike.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/urshifu-single-strike.png"
  },
  {
    id: "urshifu_rapid_strike_style",
    name: "Rapid Strike Style Urshifu",
    dex: 892,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/urshifu-rapid-strike.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/urshifu-rapid-strike.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/urshifu-rapid-strike.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/urshifu-rapid-strike.png"
  },
  {
    id: "gigantamax_urshifu_single_strike_style",
    name: "Gigantamax Urshifu Single Strike Style",
    dex: 892,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/urshifu-single-strike-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/urshifu-single-strike-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/urshifu-single-strike-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/urshifu-single-strike-gigantamax.png"
  },
  {
    id: "gigantamax_urshifu_rapid_strike_style",
    name: "Gigantamax Urshifu Rapid Strike Style",
    dex: 892,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/urshifu-rapid-strike-gigantamax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/urshifu-rapid-strike-gigantamax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/urshifu-rapid-strike-gigantamax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/urshifu-rapid-strike-gigantamax.png"
  },
  {
    id: "zarude",
    name: "Zarude",
    dex: 893,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zarude.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zarude.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zarude.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zarude.png"
  },
  {
    id: "dada_zarude",
    name: "Dada Zarude",
    dex: 893,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/zarude-dada.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/zarude-dada.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/zarude-dada.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/zarude-dada.png"
  },
  {
    id: "regieleki",
    name: "Regieleki",
    dex: 894,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/regieleki.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/regieleki.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/regieleki.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/regieleki.png"
  },
  {
    id: "regidrago",
    name: "Regidrago",
    dex: 895,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/regidrago.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/regidrago.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/regidrago.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/regidrago.png"
  },
  {
    id: "glastrier",
    name: "Glastrier",
    dex: 896,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/glastrier.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/glastrier.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/glastrier.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/glastrier.png"
  },
  {
    id: "spectrier",
    name: "Spectrier",
    dex: 897,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spectrier.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spectrier.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spectrier.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spectrier.png"
  },
  {
    id: "calyrex",
    name: "Calyrex",
    dex: 898,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/calyrex.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/calyrex.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/calyrex.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/calyrex.png"
  },
  {
    id: "ice_rider_calyrex",
    name: "Ice Rider Calyrex",
    dex: 898,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/calyrex-ice-rider.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/calyrex-ice-rider.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/calyrex-ice-rider.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/calyrex-ice-rider.png"
  },
  {
    id: "shadow_rider_calyrex",
    name: "Shadow Rider Calyrex",
    dex: 898,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/calyrex-shadow-rider.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/calyrex-shadow-rider.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/calyrex-shadow-rider.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/calyrex-shadow-rider.png"
  },
  {
    id: "wyrdeer",
    name: "Wyrdeer",
    dex: 899,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wyrdeer.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wyrdeer.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wyrdeer.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wyrdeer.png"
  },
  {
    id: "kleavor",
    name: "Kleavor",
    dex: 900,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kleavor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kleavor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kleavor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kleavor.png"
  },
  {
    id: "ursaluna",
    name: "Ursaluna",
    dex: 901,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ursaluna.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ursaluna.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ursaluna.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ursaluna.png"
  },
  {
    id: "bloodmoon_ursaluna",
    name: "Bloodmoon Ursaluna",
    dex: 901,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ursaluna-blood-moon.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ursaluna-blood-moon.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ursaluna-blood-moon.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ursaluna-blood-moon.png"
  },
  {
    id: "basculegion",
    name: "Basculegion",
    dex: 902,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/basculegion.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/basculegion.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/basculegion-female.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/basculegion-female.png"
  },
  {
    id: "sneasler",
    name: "Sneasler",
    dex: 903,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sneasler.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sneasler.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sneasler.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sneasler.png"
  },
  {
    id: "overqwil",
    name: "Overqwil",
    dex: 904,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/overqwil.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/overqwil.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/overqwil.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/overqwil.png"
  },
  {
    id: "enamorus_incarnate_forme",
    name: "Incarnate Forme Enamorus",
    dex: 905,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/enamorus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/enamorus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/enamorus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/enamorus.png"
  },
  {
    id: "enamorus_therian_forme",
    name: "Therian Forme Enamorus",
    dex: 905,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/enamorus-therian.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/enamorus-therian.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/enamorus-therian.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/enamorus-therian.png"
  },
  {
    id: "sprigatito",
    name: "Sprigatito",
    dex: 906,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sprigatito.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sprigatito.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sprigatito.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sprigatito.png"
  },
  {
    id: "floragato",
    name: "Floragato",
    dex: 907,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/floragato.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/floragato.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/floragato.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/floragato.png"
  },
  {
    id: "meowscarada",
    name: "Meowscarada",
    dex: 908,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/meowscarada.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/meowscarada.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/meowscarada.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/meowscarada.png"
  },
  {
    id: "fuecoco",
    name: "Fuecoco",
    dex: 909,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/fuecoco.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/fuecoco.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/fuecoco.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/fuecoco.png"
  },
  {
    id: "crocalor",
    name: "Crocalor",
    dex: 910,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/crocalor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/crocalor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/crocalor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/crocalor.png"
  },
  {
    id: "skeledirge",
    name: "Skeledirge",
    dex: 911,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/skeledirge.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/skeledirge.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/skeledirge.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/skeledirge.png"
  },
  {
    id: "quaxly",
    name: "Quaxly",
    dex: 912,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/quaxly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/quaxly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/quaxly.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/quaxly.png"
  },
  {
    id: "quaxwell",
    name: "Quaxwell",
    dex: 913,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/quaxwell.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/quaxwell.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/quaxwell.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/quaxwell.png"
  },
  {
    id: "quaquaval",
    name: "Quaquaval",
    dex: 914,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/quaquaval.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/quaquaval.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/quaquaval.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/quaquaval.png"
  },
  {
    id: "lechonk",
    name: "Lechonk",
    dex: 915,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lechonk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lechonk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lechonk.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lechonk.png"
  },
  {
    id: "oinkologne",
    name: "Oinkologne",
    dex: 916,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/oinkologne.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/oinkologne.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/oinkologne-female.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/oinkologne-female.png"
  },
  {
    id: "tarountula",
    name: "Tarountula",
    dex: 917,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tarountula.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tarountula.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tarountula.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tarountula.png"
  },
  {
    id: "spidops",
    name: "Spidops",
    dex: 918,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/spidops.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/spidops.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/spidops.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/spidops.png"
  },
  {
    id: "nymble",
    name: "Nymble",
    dex: 919,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nymble.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nymble.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nymble.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nymble.png"
  },
  {
    id: "lokix",
    name: "Lokix",
    dex: 920,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/lokix.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/lokix.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/lokix.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/lokix.png"
  },
  {
    id: "pawmi",
    name: "Pawmi",
    dex: 921,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pawmi.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pawmi.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pawmi.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pawmi.png"
  },
  {
    id: "pawmo",
    name: "Pawmo",
    dex: 922,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pawmo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pawmo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pawmo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pawmo.png"
  },
  {
    id: "pawmot",
    name: "Pawmot",
    dex: 923,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/pawmot.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/pawmot.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/pawmot.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/pawmot.png"
  },
  {
    id: "tandemaus",
    name: "Tandemaus",
    dex: 924,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tandemaus.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tandemaus.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tandemaus.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tandemaus.png"
  },
  {
    id: "maushold_family_of_three",
    name: "Family of Three Maushold",
    dex: 925,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/maushold-family3.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/maushold-family3.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/maushold-family3.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/maushold-family3.png"
  },
  {
    id: "maushold_family_of_four",
    name: "Family of Four Maushold",
    dex: 925,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/maushold-family4.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/maushold-family4.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/maushold-family4.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/maushold-family4.png"
  },
  {
    id: "fidough",
    name: "Fidough",
    dex: 926,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/fidough.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/fidough.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/fidough.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/fidough.png"
  },
  {
    id: "dachsbun",
    name: "Dachsbun",
    dex: 927,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dachsbun.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dachsbun.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dachsbun.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dachsbun.png"
  },
  {
    id: "smoliv",
    name: "Smoliv",
    dex: 928,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/smoliv.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/smoliv.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/smoliv.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/smoliv.png"
  },
  {
    id: "dolliv",
    name: "Dolliv",
    dex: 929,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dolliv.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dolliv.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dolliv.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dolliv.png"
  },
  {
    id: "arboliva",
    name: "Arboliva",
    dex: 930,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arboliva.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arboliva.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arboliva.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arboliva.png"
  },
  {
    id: "squawkabilly_green_plumage",
    name: "Green Plumage Squawkabilly",
    dex: 931,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/squawkabilly-green.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/squawkabilly-green.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/squawkabilly-green.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/squawkabilly-green.png"
  },
  {
    id: "squawkabilly_blue_plumage",
    name: "Blue Plumage Squawkabilly",
    dex: 931,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/squawkabilly-blue.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/squawkabilly-blue.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/squawkabilly-blue.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/squawkabilly-blue.png"
  },
  {
    id: "squawkabilly_yellow_plumage",
    name: "Yellow Plumage Squawkabilly",
    dex: 931,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/squawkabilly-yellow.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/squawkabilly-yellow.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/squawkabilly-yellow.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/squawkabilly-yellow.png"
  },
  {
    id: "squawkabilly_white_plumage",
    name: "White Plumage Squawkabilly",
    dex: 931,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/squawkabilly-white.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/squawkabilly-white.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/squawkabilly-white.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/squawkabilly-white.png"
  },
  {
    id: "nacli",
    name: "Nacli",
    dex: 932,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/nacli.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/nacli.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/nacli.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/nacli.png"
  },
  {
    id: "naclstack",
    name: "Naclstack",
    dex: 933,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/naclstack.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/naclstack.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/naclstack.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/naclstack.png"
  },
  {
    id: "garganacl",
    name: "Garganacl",
    dex: 934,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/garganacl.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/garganacl.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/garganacl.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/garganacl.png"
  },
  {
    id: "charcadet",
    name: "Charcadet",
    dex: 935,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/charcadet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/charcadet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/charcadet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/charcadet.png"
  },
  {
    id: "armarouge",
    name: "Armarouge",
    dex: 936,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/armarouge.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/armarouge.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/armarouge.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/armarouge.png"
  },
  {
    id: "ceruledge",
    name: "Ceruledge",
    dex: 937,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ceruledge.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ceruledge.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ceruledge.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ceruledge.png"
  },
  {
    id: "tadbulb",
    name: "Tadbulb",
    dex: 938,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tadbulb.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tadbulb.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tadbulb.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tadbulb.png"
  },
  {
    id: "bellibolt",
    name: "Bellibolt",
    dex: 939,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bellibolt.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bellibolt.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bellibolt.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bellibolt.png"
  },
  {
    id: "wattrel",
    name: "Wattrel",
    dex: 940,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wattrel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wattrel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wattrel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wattrel.png"
  },
  {
    id: "kilowattrel",
    name: "Kilowattrel",
    dex: 941,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kilowattrel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kilowattrel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kilowattrel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kilowattrel.png"
  },
  {
    id: "maschiff",
    name: "Maschiff",
    dex: 942,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/maschiff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/maschiff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/maschiff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/maschiff.png"
  },
  {
    id: "mabosstiff",
    name: "Mabosstiff",
    dex: 943,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/mabosstiff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/mabosstiff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/mabosstiff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/mabosstiff.png"
  },
  {
    id: "shroodle",
    name: "Shroodle",
    dex: 944,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/shroodle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/shroodle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/shroodle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/shroodle.png"
  },
  {
    id: "grafaiai",
    name: "Grafaiai",
    dex: 945,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/grafaiai.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/grafaiai.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/grafaiai.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/grafaiai.png"
  },
  {
    id: "bramblin",
    name: "Bramblin",
    dex: 946,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bramblin.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bramblin.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bramblin.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bramblin.png"
  },
  {
    id: "brambleghast",
    name: "Brambleghast",
    dex: 947,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/brambleghast.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/brambleghast.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/brambleghast.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/brambleghast.png"
  },
  {
    id: "toedscool",
    name: "Toedscool",
    dex: 948,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toedscool.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toedscool.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toedscool.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toedscool.png"
  },
  {
    id: "toedscruel",
    name: "Toedscruel",
    dex: 949,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/toedscruel.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/toedscruel.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/toedscruel.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/toedscruel.png"
  },
  {
    id: "klawf",
    name: "Klawf",
    dex: 950,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/klawf.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/klawf.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/klawf.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/klawf.png"
  },
  {
    id: "capsakid",
    name: "Capsakid",
    dex: 951,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/capsakid.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/capsakid.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/capsakid.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/capsakid.png"
  },
  {
    id: "scovillain",
    name: "Scovillain",
    dex: 952,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scovillain.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scovillain.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scovillain.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scovillain.png"
  },
  {
    id: "mega_scovillain",
    name: "Mega Scovillain",
    dex: 952,
    spriteM: "https://archives.bulbagarden.net/media/upload/0/00/HOME0952M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/1/19/HOME0952M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/0/00/HOME0952M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/1/19/HOME0952M_s.png"
  },
  {
    id: "rellor",
    name: "Rellor",
    dex: 953,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rellor.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rellor.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rellor.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rellor.png"
  },
  {
    id: "rabsca",
    name: "Rabsca",
    dex: 954,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/rabsca.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/rabsca.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/rabsca.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/rabsca.png"
  },
  {
    id: "flittle",
    name: "Flittle",
    dex: 955,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flittle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flittle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flittle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flittle.png"
  },
  {
    id: "espathra",
    name: "Espathra",
    dex: 956,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/espathra.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/espathra.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/espathra.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/espathra.png"
  },
  {
    id: "tinkatink",
    name: "Tinkatink",
    dex: 957,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tinkatink.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tinkatink.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tinkatink.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tinkatink.png"
  },
  {
    id: "tinkatuff",
    name: "Tinkatuff",
    dex: 958,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tinkatuff.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tinkatuff.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tinkatuff.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tinkatuff.png"
  },
  {
    id: "tinkaton",
    name: "Tinkaton",
    dex: 959,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tinkaton.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tinkaton.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tinkaton.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tinkaton.png"
  },
  {
    id: "wiglett",
    name: "Wiglett",
    dex: 960,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wiglett.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wiglett.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wiglett.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wiglett.png"
  },
  {
    id: "wugtrio",
    name: "Wugtrio",
    dex: 961,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wugtrio.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wugtrio.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wugtrio.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wugtrio.png"
  },
  {
    id: "bombirdier",
    name: "Bombirdier",
    dex: 962,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/bombirdier.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/bombirdier.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/bombirdier.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/bombirdier.png"
  },
  {
    id: "finizen",
    name: "Finizen",
    dex: 963,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/finizen.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/finizen.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/finizen.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/finizen.png"
  },
  {
    id: "palafin_zero_form",
    name: "Zero Form Palafin",
    dex: 964,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/palafin-zero.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/palafin-zero.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/palafin-zero.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/palafin-zero.png"
  },
  {
    id: "palafin_hero_form",
    name: "Hero Form Palafin",
    dex: 964,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/palafin-hero.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/palafin-hero.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/palafin-hero.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/palafin-hero.png"
  },
  {
    id: "varoom",
    name: "Varoom",
    dex: 965,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/varoom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/varoom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/varoom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/varoom.png"
  },
  {
    id: "revavroom",
    name: "Revavroom",
    dex: 966,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/revavroom.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/revavroom.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/revavroom.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/revavroom.png"
  },
  {
    id: "cyclizar",
    name: "Cyclizar",
    dex: 967,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cyclizar.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cyclizar.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cyclizar.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cyclizar.png"
  },
  {
    id: "orthworm",
    name: "Orthworm",
    dex: 968,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/orthworm.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/orthworm.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/orthworm.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/orthworm.png"
  },
  {
    id: "glimmet",
    name: "Glimmet",
    dex: 969,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/glimmet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/glimmet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/glimmet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/glimmet.png"
  },
  {
    id: "glimmora",
    name: "Glimmora",
    dex: 970,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/glimmora.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/glimmora.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/glimmora.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/glimmora.png"
  },
  {
    id: "mega_glimmora",
    name: "Mega Glimmora",
    dex: 970,
    spriteM: "https://archives.bulbagarden.net/media/upload/e/ec/HOME0970M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/d/de/HOME0970M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/e/ec/HOME0970M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/d/de/HOME0970M_s.png"
  },
  {
    id: "greavard",
    name: "Greavard",
    dex: 971,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/greavard.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/greavard.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/greavard.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/greavard.png"
  },
  {
    id: "houndstone",
    name: "Houndstone",
    dex: 972,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/houndstone.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/houndstone.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/houndstone.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/houndstone.png"
  },
  {
    id: "flamigo",
    name: "Flamigo",
    dex: 973,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flamigo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flamigo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flamigo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flamigo.png"
  },
  {
    id: "cetoddle",
    name: "Cetoddle",
    dex: 974,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cetoddle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cetoddle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cetoddle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cetoddle.png"
  },
  {
    id: "cetitan",
    name: "Cetitan",
    dex: 975,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/cetitan.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/cetitan.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/cetitan.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/cetitan.png"
  },
  {
    id: "veluza",
    name: "Veluza",
    dex: 976,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/veluza.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/veluza.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/veluza.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/veluza.png"
  },
  {
    id: "dondozo",
    name: "Dondozo",
    dex: 977,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dondozo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dondozo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dondozo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dondozo.png"
  },
  {
    id: "tatsugiri_curly_form",
    name: "Curly Form Tatsugiri",
    dex: 978,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tatsugiri-curly.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tatsugiri-curly.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tatsugiri-curly.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tatsugiri-curly.png"
  },
  {
    id: "tatsugiri_droopy_form",
    name: "Droopy Form Tatsugiri",
    dex: 978,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tatsugiri-droopy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tatsugiri-droopy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tatsugiri-droopy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tatsugiri-droopy.png"
  },
  {
    id: "tatsugiri_stretchy_form",
    name: "Stretchy Form Tatsugiri",
    dex: 978,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/tatsugiri-stretchy.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/tatsugiri-stretchy.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/tatsugiri-stretchy.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/tatsugiri-stretchy.png"
  },
  {
    id: "mega_tatsugiri_curly_form",
    name: "Mega Tatsugiri Curly Form",
    dex: 978,
    spriteM: "https://archives.bulbagarden.net/media/upload/thumb/a/a1/HOME0978M.png/400px-HOME0978M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/7/79/HOME0978M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/thumb/a/a1/HOME0978M.png/400px-HOME0978M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/7/79/HOME0978M_s.png"
  },
  {
    id: "mega_tatsugiri_droopy_form",
    name: "Mega Tatsugiri Droopy Form",
    dex: 978,
    spriteM: "https://archives.bulbagarden.net/media/upload/9/97/HOME0978DM.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/d/d8/HOME0978DM_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/9/97/HOME0978DM.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/d/d8/HOME0978DM_s.png"
  },
  {
    id: "mega_tatsugiri_stretchy_form",
    name: "Mega Tatsugiri Stretchy Form",
    dex: 978,
    spriteM: "https://archives.bulbagarden.net/media/upload/8/82/HOME0978SM.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/f/fa/HOME0978SM_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/8/82/HOME0978SM.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/f/fa/HOME0978SM_s.png"
  },
  {
    id: "annihilape",
    name: "Annihilape",
    dex: 979,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/annihilape.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/annihilape.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/annihilape.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/annihilape.png"
  },
  {
    id: "clodsire",
    name: "Clodsire",
    dex: 980,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/clodsire.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/clodsire.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/clodsire.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/clodsire.png"
  },
  {
    id: "farigiraf",
    name: "Farigiraf",
    dex: 981,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/farigiraf.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/farigiraf.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/farigiraf.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/farigiraf.png"
  },
  {
    id: "dudunsparce_two_segment_form",
    name: "Two-Segment Form Dudunsparce",
    dex: 982,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dudunsparce-two-segment.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dudunsparce-two-segment.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dudunsparce-two-segment.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dudunsparce-two-segment.png"
  },
  {
    id: "dudunsparce_three_segment_form",
    name: "Three-Segment Form Dudunsparce",
    dex: 982,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/dudunsparce-three-segment.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/dudunsparce-three-segment.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/dudunsparce-three-segment.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/dudunsparce-three-segment.png"
  },
  {
    id: "kingambit",
    name: "Kingambit",
    dex: 983,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/kingambit.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/kingambit.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/kingambit.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/kingambit.png"
  },
  {
    id: "great_tusk",
    name: "Great Tusk",
    dex: 984,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/great-tusk.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/great-tusk.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/great-tusk.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/great-tusk.png"
  },
  {
    id: "scream_tail",
    name: "Scream Tail",
    dex: 985,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/scream-tail.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/scream-tail.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/scream-tail.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/scream-tail.png"
  },
  {
    id: "brute_bonnet",
    name: "Brute Bonnet",
    dex: 986,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/brute-bonnet.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/brute-bonnet.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/brute-bonnet.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/brute-bonnet.png"
  },
  {
    id: "flutter_mane",
    name: "Flutter Mane",
    dex: 987,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/flutter-mane.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/flutter-mane.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/flutter-mane.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/flutter-mane.png"
  },
  {
    id: "slither_wing",
    name: "Slither Wing",
    dex: 988,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/slither-wing.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/slither-wing.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/slither-wing.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/slither-wing.png"
  },
  {
    id: "sandy_shocks",
    name: "Sandy Shocks",
    dex: 989,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/sandy-shocks.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/sandy-shocks.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/sandy-shocks.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/sandy-shocks.png"
  },
  {
    id: "iron_treads",
    name: "Iron Treads",
    dex: 990,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/iron-treads.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/iron-treads.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/iron-treads.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/iron-treads.png"
  },
  {
    id: "iron_bundle",
    name: "Iron Bundle",
    dex: 991,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/iron-bundle.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/iron-bundle.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/iron-bundle.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/iron-bundle.png"
  },
  {
    id: "iron_hands",
    name: "Iron Hands",
    dex: 992,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/iron-hands.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/iron-hands.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/iron-hands.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/iron-hands.png"
  },
  {
    id: "iron_jugulis",
    name: "Iron Jugulis",
    dex: 993,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/iron-jugulis.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/iron-jugulis.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/iron-jugulis.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/iron-jugulis.png"
  },
  {
    id: "iron_moth",
    name: "Iron Moth",
    dex: 994,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/iron-moth.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/iron-moth.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/iron-moth.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/iron-moth.png"
  },
  {
    id: "iron_thorns",
    name: "Iron Thorns",
    dex: 995,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/iron-thorns.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/iron-thorns.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/iron-thorns.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/iron-thorns.png"
  },
  {
    id: "frigibax",
    name: "Frigibax",
    dex: 996,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/frigibax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/frigibax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/frigibax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/frigibax.png"
  },
  {
    id: "arctibax",
    name: "Arctibax",
    dex: 997,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/arctibax.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/arctibax.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/arctibax.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/arctibax.png"
  },
  {
    id: "baxcalibur",
    name: "Baxcalibur",
    dex: 998,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/baxcalibur.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/baxcalibur.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/baxcalibur.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/baxcalibur.png"
  },
  {
    id: "mega_baxcalibur",
    name: "Mega Baxcalibur",
    dex: 998,
    spriteM: "https://archives.bulbagarden.net/media/upload/a/a3/HOME0998M.png",
    spriteShinyM: "https://archives.bulbagarden.net/media/upload/b/bf/HOME0998M_s.png",
    spriteF: "https://archives.bulbagarden.net/media/upload/a/a3/HOME0998M.png",
    spriteShinyF: "https://archives.bulbagarden.net/media/upload/b/bf/HOME0998M_s.png"
  },
  {
    id: "gimmighoul_roaming_form",
    name: "Roaming Form Gimmighoul",
    dex: 999,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gimmighoul-roaming.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gimmighoul-roaming.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gimmighoul-roaming.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gimmighoul-roaming.png"
  },
  {
    id: "gimmighoul_chest_form",
    name: "Chest Form Gimmighoul",
    dex: 999,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gimmighoul-chest.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gimmighoul-chest.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gimmighoul-chest.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gimmighoul-chest.png"
  },
  {
    id: "gholdengo",
    name: "Gholdengo",
    dex: 1000,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/gholdengo.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/gholdengo.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/gholdengo.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/gholdengo.png"
  },
  {
    id: "wo_chien",
    name: "Wo-Chien",
    dex: 1001,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/wo-chien.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/wo-chien.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/wo-chien.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/wo-chien.png"
  },
  {
    id: "chien_pao",
    name: "Chien-Pao",
    dex: 1002,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chien-pao.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chien-pao.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chien-pao.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chien-pao.png"
  },
  {
    id: "ting_lu",
    name: "Ting-Lu",
    dex: 1003,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/ting-lu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/ting-lu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/ting-lu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/ting-lu.png"
  },
  {
    id: "chi_yu",
    name: "Chi-Yu",
    dex: 1004,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/chi-yu.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/chi-yu.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/chi-yu.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/chi-yu.png"
  },
  {
    id: "roaring_moon",
    name: "Roaring Moon",
    dex: 1005,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/roaring-moon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/roaring-moon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/roaring-moon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/roaring-moon.png"
  },
  {
    id: "iron_valiant",
    name: "Iron Valiant",
    dex: 1006,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/iron-valiant.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/iron-valiant.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/iron-valiant.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/iron-valiant.png"
  },
  {
    id: "koraidon",
    name: "Koraidon",
    dex: 1007,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/koraidon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/koraidon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/koraidon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/koraidon.png"
  },
  {
    id: "miraidon",
    name: "Miraidon",
    dex: 1008,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/miraidon.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/miraidon.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/miraidon.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/miraidon.png"
  },
  {
    id: "walking_wake",
    name: "Walking Wake",
    dex: 1009,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/walking-wake.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/walking-wake.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/walking-wake.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/walking-wake.png"
  },
  {
    id: "iron_leaves",
    name: "Iron Leaves",
    dex: 1010,
    spriteM: "https://img.pokemondb.net/sprites/home/normal/iron-leaves.png",
    spriteShinyM: "https://img.pokemondb.net/sprites/home/shiny/iron-leaves.png",
    spriteF: "https://img.pokemondb.net/sprites/home/normal/iron-leaves.png",
    spriteShinyF: "https://img.pokemondb.net/sprites/home/shiny/iron-leaves.png"
  },
  {
    id: "dipplin",
    name: "Dipplin",
    dex: 1011,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/dipplin.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/dipplin.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/dipplin.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/dipplin.png"
  },
  {
    id: "poltchageist_counterfeit_form",
    name: "Counterfeit Form Poltchageist",
    dex: 1012,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/poltchageist-counterfeit.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/poltchageist-counterfeit.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/poltchageist-counterfeit.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/poltchageist-counterfeit.png"
  },
  {
    id: "poltchageist_artisan_form",
    name: "Artisan Form Poltchageist",
    dex: 1012,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/poltchageist-artisan.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/poltchageist-artisan.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/poltchageist-artisan.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/poltchageist-artisan.png"
  },
  {
    id: "sinistcha_unremarkable_form",
    name: "Unremarkable Form Sinistcha",
    dex: 1013,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/sinistcha-unremarkable.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/sinistcha-unremarkable.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/sinistcha-unremarkable.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/sinistcha-unremarkable.png"
  },
  {
    id: "sinistcha_masterpiece_form",
    name: "Masterpiece Form Sinistcha",
    dex: 1013,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/sinistcha-masterpiece.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/sinistcha-masterpiece.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/sinistcha-masterpiece.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/sinistcha-masterpiece.png"
  },
  {
    id: "okidogi",
    name: "Okidogi",
    dex: 1014,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/okidogi.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/okidogi.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/okidogi.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/okidogi.png"
  },
  {
    id: "munkidori",
    name: "Munkidori",
    dex: 1015,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/munkidori.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/munkidori.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/munkidori.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/munkidori.png"
  },
  {
    id: "fezandipiti",
    name: "Fezandipiti",
    dex: 1016,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/fezandipiti.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/fezandipiti.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/fezandipiti.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/fezandipiti.png"
  },
  {
    id: "ogerpon_teal_mask",
    name: "Teal Mask Ogerpon",
    dex: 1017,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ogerpon.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ogerpon.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ogerpon.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ogerpon.png"
  },
  {
    id: "ogerpon_wellspring_mask",
    name: "Wellspring Mask Ogerpon",
    dex: 1017,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ogerpon-wellspring.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ogerpon-wellspring.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ogerpon-wellspring.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ogerpon-wellspring.png"
  },
  {
    id: "ogerpon_hearthflame_mask",
    name: "Hearthflame Mask Ogerpon",
    dex: 1017,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ogerpon-hearthflame.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ogerpon-hearthflame.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ogerpon-hearthflame.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ogerpon-hearthflame.png"
  },
  {
    id: "ogerpon_cornerstone_mask",
    name: "Cornerstone Mask Ogerpon",
    dex: 1017,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ogerpon-cornerstone.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ogerpon-cornerstone.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/ogerpon-cornerstone.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/ogerpon-cornerstone.png"
  },
  {
    id: "archaludon",
    name: "Archaludon",
    dex: 1018,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/archaludon.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/archaludon.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/archaludon.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/archaludon.png"
  },
  {
    id: "hydrapple",
    name: "Hydrapple",
    dex: 1019,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/hydrapple.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/hydrapple.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/hydrapple.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/hydrapple.png"
  },
  {
    id: "gouging_fire",
    name: "Gouging Fire",
    dex: 1020,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/gouging-fire.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/gouging-fire.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/gouging-fire.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/gouging-fire.png"
  },
  {
    id: "raging_bolt",
    name: "Raging Bolt",
    dex: 1021,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/raging-bolt.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/raging-bolt.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/raging-bolt.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/raging-bolt.png"
  },
  {
    id: "iron_boulder",
    name: "Iron Boulder",
    dex: 1022,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/iron-boulder.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/iron-boulder.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/iron-boulder.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/iron-boulder.png"
  },
  {
    id: "iron_crown",
    name: "Iron Crown",
    dex: 1023,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/iron-crown.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/iron-crown.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/iron-crown.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/iron-crown.png"
  },
  {
    id: "terapagos_normal_form",
    name: "Normal Form Terapagos",
    dex: 1024,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/terapagos.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/terapagos.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/terapagos.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/terapagos.png"
  },
  {
    id: "pecharunt",
    name: "Pecharunt",
    dex: 1025,
    spriteM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/pecharunt.png",
    spriteShinyM: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/pecharunt.png",
    spriteF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Regular/pecharunt.png",
    spriteShinyF: "https://raw.githubusercontent.com/Tatertot74/SpriteDatabase/main/HOME%20Renders/Shiny/pecharunt.png"
  }
];
