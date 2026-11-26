/* ============== SAVE FILE READER ==============
 * Reads Pokémon out of real game save files (Import > Import Game Saves).
 * Pure parsing, no DOM: SaveImport.read(bytes) returns { game, mons[], skipped, notes[] }.
 * Layouts, offsets and ciphers follow the PKHeX reference (github.com/kwsch/PKHeX), ported to JS.
 *
 * Supported: Gen 3 (Ruby/Sapphire/Emerald/FireRed/LeafGreen), Gen 4 (Diamond/Pearl/Platinum/HeartGold/SoulSilver),
 * Gen 5 (Black/White/Black 2/White 2), Gen 6 (X/Y/Omega Ruby/Alpha Sapphire), Gen 7 (Sun/Moon/Ultra Sun/Ultra Moon),
 * Let's Go Pikachu/Eevee, Sword/Shield, Brilliant Diamond/Shining Pearl, Legends: Arceus, Scarlet/Violet, Legends: Z-A,
 * and Colosseum / XD (raw saves, .gci files, GameCube memory card images).
 * Not yet: Gen 1/2, Pokémon Box, Let's Go's GO Park storage.
 */
const SaveImport = (() => {
  const LK = SAVE_LOOKUP;
  const u8 = (b, o) => b[o];
  const u16 = (b, o) => b[o] | (b[o + 1] << 8);
  const u32 = (b, o) => ((b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0);

  // GameVersion ids (PKHeX) for the origin-game field.
  const V = { S:1, R:2, E:3, FR:4, LG:5, HG:7, SS:8, D:10, P:11, Pt:12, CXD:15, W:20, B:21, W2:22, B2:23, X:24, Y:25,
    AS:26, OR:27, SN:30, MN:31, US:32, UM:33, GO:34, RD:35, GN:36, BU:37, YW:38, GD:39, SI:40, C:41, GP:42, GE:43,
    SW:44, SH:45, PLA:47, BD:48, SP:49, SL:50, VL:51, ZA:52 };
  // version id -> Pokédex game preset key (icons/game-icons.js)
  const VERSION_KEY = { 1:'sapphire', 2:'ruby', 3:'emerald', 4:'firered', 5:'leafgreen', 7:'heartgold', 8:'soulsilver',
    10:'diamond', 11:'pearl', 12:'platinum', 15:'colosseum', 20:'white', 21:'black', 22:'white2', 23:'black2', 24:'x', 25:'y',
    26:'alphasapphire', 27:'omegaruby', 30:'sun', 31:'moon', 32:'ultrasun', 33:'ultramoon', 34:'go', 35:'red', 36:'green',
    37:'blue', 38:'yellow', 39:'gold', 40:'silver', 41:'crystal', 42:'letsgopikachu', 43:'letsgoeevee', 44:'sword',
    45:'shield', 47:'legendsarceus', 48:'brilliantdiamond', 49:'shiningpearl', 50:'scarlet', 51:'violet', 52:'legendsza' };

  const BALLS = [ '', 'Master Ball', 'Ultra Ball', 'Great Ball', 'Poké Ball', 'Safari Ball', 'Net Ball', 'Dive Ball', 'Nest Ball',
    'Repeat Ball', 'Timer Ball', 'Luxury Ball', 'Premier Ball', 'Dusk Ball', 'Heal Ball', 'Quick Ball', 'Cherish Ball',
    'Fast Ball', 'Level Ball', 'Lure Ball', 'Heavy Ball', 'Love Ball', 'Friend Ball', 'Moon Ball', 'Sport Ball', 'Dream Ball',
    'Beast Ball', 'Strange Ball', 'Hisuian Poké Ball', 'Hisuian Great Ball', 'Hisuian Ultra Ball', 'Feather Ball', 'Wing Ball',
    'Jet Ball', 'Hisuian Heavy Ball', 'Leaden Ball', 'Gigaton Ball', 'Origin Ball' ];
  const NATURES = ['Hardy','Lonely','Brave','Adamant','Naughty','Bold','Docile','Relaxed','Impish','Lax','Timid','Hasty','Serious',
    'Jolly','Naive','Modest','Mild','Quiet','Bashful','Rash','Calm','Gentle','Sassy','Careful','Quirky'];
  const TYPE_NAMES = ['Normal','Fighting','Flying','Poison','Ground','Rock','Bug','Ghost','Steel','Fire','Water','Grass','Electric',
    'Psychic','Ice','Dragon','Dark','Fairy'];

  // ---- ciphers (PokeCrypto) ----
  const BP = [0,1,2,3, 0,1,3,2, 0,2,1,3, 0,3,1,2, 0,2,3,1, 0,3,2,1, 1,0,2,3, 1,0,3,2, 2,0,1,3, 3,0,1,2, 2,0,3,1, 3,0,2,1,
    1,2,0,3, 1,3,0,2, 2,1,0,3, 3,1,0,2, 2,3,0,1, 3,2,0,1, 1,2,3,0, 1,3,2,0, 2,1,3,0, 3,1,2,0, 2,3,1,0, 3,2,1,0];
  function lcgCrypt(d, start, end, seed){
    seed = seed >>> 0;
    for(let i = start; i + 1 < end; i += 2){
      seed = (Math.imul(0x41C64E6D, seed) + 0x6073) >>> 0;
      const x = seed >>> 16;
      d[i] ^= x & 0xFF; d[i + 1] ^= x >>> 8;
    }
  }
  function unshuffle(d, start, blockSize, sv){
    const src = d.slice(start, start + blockSize * 4);
    for(let i = 0; i < 4; i++){
      const from = BP[(sv % 24) * 4 + i];
      d.set(src.subarray(from * blockSize, (from + 1) * blockSize), start + i * blockSize);
    }
  }
  const sum16 = (d, a, b) => { let s = 0; for(let i = a; i + 1 < b; i += 2) s = (s + (d[i] | (d[i + 1] << 8))) & 0xFFFF; return s; };

  // Each decrypt returns the decrypted copy, or null when the checksum fails (empty/corrupt slot).
  function dec3(raw){
    if(raw.length < 80) return null;
    const d = raw.slice(0, 80);
    const pid = u32(d, 0), key = (pid ^ u32(d, 4)) >>> 0;
    for(let i = 32; i < 80; i += 4){ const v = (u32(d, i) ^ key) >>> 0; d[i] = v & 255; d[i+1] = (v >>> 8) & 255; d[i+2] = (v >>> 16) & 255; d[i+3] = v >>> 24; }
    unshuffle(d, 32, 12, pid % 24);   // gen 3 uses PID % 24 and the same table
    return sum16(d, 32, 80) === u16(d, 0x1C) ? d : null;
  }
  function decXor(raw, stored, block, seedFromChecksum){
    if(raw.length < stored) return null;
    const d = raw.slice(0, stored);
    const pv = u32(d, 0);
    lcgCrypt(d, 8, stored, seedFromChecksum ? u16(d, 6) : pv);
    unshuffle(d, 8, block, (pv >>> 13) & 31);
    return sum16(d, 8, stored) === u16(d, 6) ? d : null;
  }
  const DEC = {
    pk3: dec3,
    pk4: r => decXor(r, 136, 32, true),
    pk5: r => decXor(r, 136, 32, true),
    pk6: r => decXor(r, 232, 56, false),
    pk7: r => decXor(r, 232, 56, false),
    pk8: r => decXor(r, 0x148, 80, false),
    pa8: r => decXor(r, 0x168, 88, false),
    pk9: r => decXor(r, 0x148, 80, false),
    pa9: r => decXor(r, 0x148, 80, false),
    pb7: r => decXor(r, 232, 56, false),
    pb8: r => decXor(r, 0x148, 80, false),
    ck3: r => r.length >= 312 && (r[0] | r[1]) ? r.slice(0, 312) : null,   // GameCube formats are not encrypted per Pokémon
    xk3: r => r.length >= 196 && (r[0] | r[1]) ? r.slice(0, 196) : null
  };
  const be16 = (b, o) => (b[o] << 8) | b[o + 1];
  const be32 = (b, o) => (((b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0);
  function strBE(d, o, n){ let s = ''; for(let i = 0; i + 1 < n; i += 2){ const v = be16(d, o + i); if(!v) break; s += v === 0xE08E ? '♂' : v === 0xE08F ? '♀' : String.fromCharCode(v); } return s; }

  // ---- strings ----
  // Japanese Gen 3 games use their own character table (hiragana, katakana and full-width forms).
  function str3(d, o, n, jp){
    let s = '';
    for(let i = 0; i < n; i++){
      const b = d[o + i]; if(b === 0xFF) break;
      const c = jp ? LK.g3jp[b] : LK.g3chars[b];
      s += !c || c === '\u0000' ? '' : c;
    }
    return s;
  }
  // Gen 3 has no "nicknamed" flag, so a name that matches the species name in the Pokémon's own language is not a nickname.
  const norm3 = s => (s || '').toUpperCase().replace(/[\s'’.\-·・･]/g, '');
  function defaultName3(nick, species, lang){
    const list = LK.g3Names && LK.g3Names[lang];
    if(!list) return null;
    const name = list.split('|')[species];
    return name ? norm3(name) === norm3(nick) : null;
  }
  function str4(d, o, n){
    let s = '';
    for(let i = 0; i + 1 < n; i += 2){
      const v = u16(d, o + i); if(v === 0xFFFF || v === 0) break;
      s += v >= 0x400 ? (LK.g4kor[v - 0x400] || '') : (LK.g4chars[v] || '');   // 0x400 and up is the Korean Hangul table
    }
    return s;
  }
  function strU16(d, o, n){
    let s = '';
    for(let i = 0; i + 1 < n; i += 2){
      const v = u16(d, o + i); if(v === 0xFFFF || v === 0) break;
      s += v === 0xE08E ? '♂' : v === 0xE08F ? '♀' : v === 0x246D ? '♂' : v === 0x246E ? '♀' : String.fromCharCode(v);
    }
    return s;
  }

  // ---- species / form mapping onto the app's species database ----
  const REGIONAL = ['Alolan Form', 'Galarian Form', 'Hisuian Form', 'Paldean Form'];
  const range = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const same = (n, id) => range(n, () => id);
  // Form number stored in the save -> entry id, in PKHeX's order. null or a missing slot means the base entry.
  // Species with a single entry never need a row: cosmetic, gender and battle-only forms all land on it.
  const FORM_IDS = {
    172: ['pichu', 'pichu-spiky-eared-pichu'],
    201: range(26, i => 'unown-' + String.fromCharCode(97 + i)).concat(['unown-exclamation', 'unown-question']),
    351: ['castform', 'castform-sunny', 'castform-rainy', 'castform-snowy'],
    386: ['deoxys-normal', 'deoxys-attack', 'deoxys-defense', 'deoxys-speed'],
    412: ['burmy-plant', 'burmy-sandy', 'burmy-trash'],
    413: ['wormadam-plant', 'wormadam-sandy', 'wormadam-trash'],
    422: ['shellos-west-sea', 'shellos-east-sea'], 423: ['gastrodon-west-sea', 'gastrodon-east-sea'],
    479: ['rotom', 'rotom-heat', 'rotom-wash', 'rotom-frost', 'rotom-fan', 'rotom-mow'],
    483: ['dialga', 'dialga-origin'], 484: ['palkia', 'palkia-origin'],
    487: ['giratina-altered', 'giratina-origin'],
    492: ['shaymin-land', 'shaymin-sky'],
    550: ['basculin-red-striped', 'basculin-blue-striped', 'basculin-white-striped'],
    555: ['darmanitan-unovan-standard', 'darmanitan-unovan-zen', 'darmanitan-galarian-standard', 'darmanitan-galarian-zen'],
    585: ['deerling-spring', 'deerling-summer', 'deerling-autumn', 'deerling-winter'],
    586: ['sawsbuck-spring', 'sawsbuck-summer', 'sawsbuck-autumn', 'sawsbuck-winter'],
    641: ['tornadus-incarnate', 'tornadus-therian'], 642: ['thundurus-incarnate', 'thundurus-therian'],
    645: ['landorus-incarnate', 'landorus-therian'],
    646: ['kyurem', 'kyurem-white', 'kyurem-black'],
    647: ['keldeo-ordinary', 'keldeo-resolute'],
    648: ['meloetta-aria', 'meloetta-pirouette'],
    658: ['greninja', 'greninja-ash-greninja', 'greninja-ash-greninja'],   // Battle Bond and Ash both use the Ash-Greninja entry
    666: ['icy-snow', 'polar', 'tundra', 'continental', 'garden', 'elegant', 'meadow', 'modern', 'marine', 'archipelago',
      'high-plains', 'sandstorm', 'river', 'monsoon', 'savanna', 'sun', 'ocean', 'jungle', 'fancy', 'pok-ball'].map(n => 'vivillon-' + n + '-pattern'),
    669: ['red', 'yellow', 'orange', 'blue', 'white'].map(c => 'flabebe-' + c + '-flower'),
    670: ['red', 'yellow', 'orange', 'blue', 'white', 'eternal'].map(c => 'floette-' + c + '-flower'),
    671: ['red', 'yellow', 'orange', 'blue', 'white'].map(c => 'florges-' + c + '-flower'),
    676: ['furfrou'].concat(['heart', 'star', 'diamond', 'debutante', 'matron', 'dandy', 'la-reine', 'kabuki', 'pharaoh'].map(t => 'furfrou-' + t + '-trim')),
    710: ['pumpkaboo-medium', 'pumpkaboo', 'pumpkaboo-large', 'pumpkaboo-jumbo'],
    711: ['gourgeist-medium', 'gourgeist', 'gourgeist-large', 'gourgeist-jumbo'],
    718: ['zygarde-50', 'zygarde-10', 'zygarde-10', 'zygarde-50', 'zygarde-complete', 'zygarde-complete'],   // slots 2 and 3 are the Power Construct (-C) formes
    720: ['hoopa-confined', 'hoopa-unbound'],
    741: ['oricorio-baile', 'oricorio-pom-pom', 'oricorio-pau', 'oricorio-sensu'],
    745: ['lycanroc-midday', 'lycanroc-midnight', 'lycanroc-dusk'],
    774: same(7, 'minior-meteor').concat(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].map(c => 'minior-' + c + '-core')),
    800: ['necrozma', 'necrozma-dusk-mane', 'necrozma-dawn-wings', 'necrozma'],   // slot 3 is Ultra Necrozma, a battle-only form
    801: ['magearna', 'magearna-original-color'],
    849: ['toxtricity-amped', 'toxtricity-low-key'],
    854: ['sinistea', 'sinistea-antique'], 855: ['polteageist', 'polteageist-antique'],
    875: ['eiscue-ice-face', 'eiscue-noice-face'],
    877: ['morpeko-full-belly', 'morpeko-hangry'],
    888: ['zacian-hero-of-many-battles', 'zacian-crowned-sword'],
    889: ['zamazenta-hero-of-many-battles', 'zamazenta-crowned-shield'],
    892: ['urshifu-single-strike', 'urshifu-rapid-strike'],
    893: ['zarude', 'zarude-dada'],
    898: ['calyrex', 'calyrex-ice-rider', 'calyrex-shadow-rider'],
    901: ['ursaluna', 'ursaluna-bloodmoon'],
    905: ['enamorus-incarnate', 'enamorus-therian'],
    925: ['maushold-family-of-three', 'maushold-family-of-four'],
    931: ['green', 'blue', 'yellow', 'white'].map(c => 'squawkabilly-' + c + '-plumage'),
    964: ['palafin-zero', 'palafin-hero'],
    978: ['tatsugiri-curly', 'tatsugiri-droopy', 'tatsugiri-stretchy'],
    982: ['dudunsparce-two-segment', 'dudunsparce-three-segment'],
    999: ['gimmighoul-chest', 'gimmighoul-roaming'],
    1012: ['poltchageist', 'poltchageist-artisan'],
    1013: ['sinistcha', 'sinistcha-masterpiece'],
    1017: ['teal', 'wellspring', 'hearthflame', 'cornerstone', 'teal', 'wellspring', 'hearthflame', 'cornerstone'].map(m => 'ogerpon-' + m + '-mask'),   // slots 4 to 7 are the Terastallized masks
    128: ['tauros-kantonian', 'tauros-paldean-combat-breed', 'tauros-paldean-blaze-breed', 'tauros-paldean-aqua-breed']
  };
  // Pikachu's form list depends on the game: Gen 6 stores the cosplay forms, later games the caps.
  const PIKACHU_COSPLAY = ['pikachu', 'pikachu-rock-star', 'pikachu-belle', 'pikachu-pop-star', 'pikachu-ph-d', 'pikachu-libre', 'pikachu-cosplay'];
  const PIKACHU_CAPS = ['pikachu', 'pikachu-original-cap', 'pikachu-hoenn-cap', 'pikachu-sinnoh-cap', 'pikachu-unova-cap',
    'pikachu-kalos-cap', 'pikachu-alola-cap', 'pikachu-partner-cap', 'pikachu', 'pikachu-world-cap'];   // slot 8 is the Let's Go starter, which has no entry of its own
  // Alcremie keeps the cream in the form number and the decoration in the form argument.
  const ALCREMIE_CREAMS = ['vanilla-cream', 'ruby-cream', 'matcha-cream', 'mint-cream', 'lemon-cream', 'salted-cream', 'ruby-swirl', 'caramel-swirl', 'rainbow-swirl'];
  const ALCREMIE_SWEETS = ['strawberry', 'berry', 'love', 'star', 'clover', 'flower', 'ribbon'];
  // Gen 3 derives an Unown's letter from its PID instead of storing it.
  const unownForm3 = pid => ((((pid & 0x3000000) >>> 18) | ((pid & 0x30000) >>> 12) | ((pid & 0x300) >>> 6) | (pid & 0x3)) % 28);
  let _byDex = null;
  function byDex(){
    if(_byDex) return _byDex;
    _byDex = {};
    POKEMON_SPECIES.forEach(e => { (_byDex[e.dex] = _byDex[e.dex] || []).push(e); });
    return _byDex;
  }
  // returns { entry, formKnown } for a National Dex number and the stored form index.
  // ctx is optional: { fmt: 'pk6'..., arg: form argument }
  function pickSpecies(dex, form, ctx){
    const list = byDex()[dex];
    if(!list) return null;
    ctx = ctx || {};
    const find = id => id && list.find(e => e.id === id);
    const base = list.find(e => !e.demonym || !REGIONAL.includes(e.demonym)) || list[0];
    const table = dex === 25 ? (ctx.fmt === 'pk6' ? PIKACHU_COSPLAY : PIKACHU_CAPS) : FORM_IDS[dex];
    if(dex === 869){
      const cream = form < ALCREMIE_CREAMS.length ? form : 0;
      const sweet = ctx.arg < ALCREMIE_SWEETS.length ? ctx.arg : 0;
      const hit = find(`alcremie-${ALCREMIE_CREAMS[cream]}-${ALCREMIE_SWEETS[sweet]}-sweet`);
      return { entry: hit || base, formKnown: !!hit };
    }
    if(table){
      const hit = find(table[form || 0]);
      if(hit) return { entry: hit, formKnown: true };
      if(!form) return { entry: base, formKnown: true };
      return { entry: base, formKnown: false };
    }
    if(!form) return { entry: base, formKnown: true };
    const regional = list.filter(e => e.demonym && REGIONAL.includes(e.demonym));
    if(regional.length){
      const pick = demonym => ({ entry: regional.find(e => e.demonym === demonym) || base, formKnown: true });
      if(dex === 52 && form === 2) return pick('Galarian Form');            // Meowth: 1 Alolan, 2 Galarian
      if(dex === 80) return form === 2 ? pick('Galarian Form') : { entry: base, formKnown: true };   // Slowbro: 1 is Mega, 2 is Galarian
      if(form === 2 && [59, 101, 549, 713].includes(dex)) return pick('Hisuian Form');   // Legends: Arceus Lord and Lady variants
      // Form 1 is the first regional variant that isn't the base entry (Decidueye's base is itself labeled Alolan).
      const variants = regional.filter(e => e !== base);
      if(form === 1 && variants.length) return { entry: variants[0], formKnown: true };
    }
    // One entry means there is nothing to choose: gender, cosmetic and battle-only forms all belong to it.
    return { entry: base, formKnown: list.length === 1 };
  }
  // Applies the per-format quirks that decide a form, then picks the entry.
  function resolveSpecies(m){
    let form = m.form;
    if(m.gen === 3 && m.species === 386) form = { 4: 1, 5: 2, 3: 3 }[m.version] || 0;   // Deoxys' forme follows the game
    if(m.gen === 3 && m.species === 201) form = unownForm3(m.pid);
    return pickSpecies(m.species, form, { fmt: m.fmt, arg: m.formArg });
  }

  // ---- location names ----
  function locName(key, id){
    const banks = LK.loc[key]; if(!banks || !id) return '';
    let best = 0;
    Object.keys(banks).forEach(b => { const n = +b; if(n <= id && n >= best) best = n; });
    return (banks[best] && banks[best][id - best]) || '';
  }

  // Gen 3 personal data (gender ratio + abilities), indexed by National Dex number, 28 bytes each.
  let _p3 = null;
  function personal3(dex){
    if(!_p3){ const bin = atob(LK.g3Personal); _p3 = new Uint8Array(bin.length); for(let i = 0; i < bin.length; i++) _p3[i] = bin.charCodeAt(i); }
    const o = dex * 28; if(o + 28 > _p3.length) return null;
    return { gender: _p3[o + 0x10], a1: _p3[o + 0x16], a2: _p3[o + 0x17] };
  }
  const nat3 = raw => raw < 252 ? raw : (raw >= 277 && raw - 277 < LK.g3ToNat.length ? raw + LK.g3ToNat[raw - 277] : 0);
  const nat9 = raw => (raw - 917 >= 0 && raw - 917 < LK.g9ToNat.length) ? raw + LK.g9ToNat[raw - 917] : raw;
  const moveNames = ids => ids.map(i => (i && LK.moves[i]) || '');
  const abilityName = i => (i && LK.abilities[i]) || '';

  // ---- per-format decoders: decrypted bytes -> plain description ----
  const PLAIN_SIZE = { pk3: 80, pk4: 136, pk5: 136, pk6: 232, pk7: 232, pb7: 232, pk8: 0x148, pb8: 0x148, pk9: 0x148, pa9: 0x148, pa8: 0x168, ck3: 312, xk3: 196 };
  function decodeBase(fmt, raw, plain){
    const d = plain ? (raw.length >= PLAIN_SIZE[fmt] ? raw.slice(0, PLAIN_SIZE[fmt]) : null) : DEC[fmt](raw);
    if(!d) return null;
    let m;
    if(fmt === 'pk3'){
      const pid = u32(d, 0), tid = u16(d, 4), sid = u16(d, 6), species = nat3(u16(d, 0x20));
      if(!species || species > 386) return null;
      const iv = u32(d, 0x48), origins = u16(d, 0x46), pers = personal3(species);
      const lang = d[0x12];
      let gender = 2;
      if(pers){ gender = pers.gender === 255 ? 2 : pers.gender === 254 ? 1 : pers.gender === 0 ? 0 : ((pid & 0xFF) < pers.gender ? 1 : 0); }
      const abilityId = pers ? (((iv >>> 31) && pers.a2) ? pers.a2 : pers.a1) : 0;
      const pk = d[0x44];
      m = { gen: 3, pid, tid, sid, species, form: 0, version: (origins >> 7) & 0xF,
        nickname: str3(d, 8, 10, lang === 1), ot: str3(d, 0x14, 7, lang === 1), egg: !!((iv >>> 30) & 1),
        nature: NATURES[pid % 25], gender, ability: abilityName(abilityId), moves: moveNames([u16(d,0x2C),u16(d,0x2E),u16(d,0x30),u16(d,0x32)]),
        ball: BALLS[(origins >> 11) & 0xF] || '', metLevel: origins & 0x7F, metLoc: locName('g3', d[0x45]), metDate: '',
        pokerus: pkrs(pk), shiny: ((tid ^ sid ^ (pid >>> 16) ^ (pid & 0xFFFF)) < 8), nicknamedFlag: null, lang };
      if(lang !== 2){ const isDefault = defaultName3(m.nickname, species, lang); if(isDefault !== null) m.nicknamedFlag = !isDefault; }
      if(m.version === 15) m.version = V.CXD;
      return m;
    }
    if(fmt === 'pk4' || fmt === 'pk5'){
      const pid = u32(d, 0), tid = u16(d, 0xC), sid = u16(d, 0xE), species = u16(d, 8);
      if(!species || species > (fmt === 'pk4' ? 493 : 649)) return null;
      const iv = u32(d, 0x38), version = d[0x5F], form = d[0x40] >> 3;
      const isHGSS = version === V.HG || version === V.SS;
      let loc;
      if(fmt === 'pk5') loc = locName('g5', u16(d, 0x80));
      else loc = locName('g4', isHGSS && u16(d, 0x46) ? u16(d, 0x46) : u16(d, 0x80));
      const ballId = fmt === 'pk4' ? (d[0x86] || d[0x83]) : d[0x83];
      const year = d[0x7B];
      const dateOk = year > 0 && d[0x7C] >= 1 && d[0x7C] <= 12 && d[0x7D] >= 1;
      m = { gen: fmt === 'pk4' ? 4 : 5, pid, tid, sid, species, form, version,
        nickname: fmt === 'pk4' ? str4(d, 0x48, 22) : strU16(d, 0x48, 22), ot: fmt === 'pk4' ? str4(d, 0x68, 16) : strU16(d, 0x68, 16),
        egg: !!((iv >>> 30) & 1), nature: NATURES[fmt === 'pk5' ? d[0x41] : pid % 25], gender: (d[0x40] >> 1) & 3,
        ability: abilityName(d[0x15]), moves: moveNames([u16(d,0x28),u16(d,0x2A),u16(d,0x2C),u16(d,0x2E)]),
        ball: BALLS[ballId] || '', metLevel: d[0x84] & 0x7F, metLoc: loc,
        metDate: dateOk ? `${2000 + year}-${String(d[0x7C]).padStart(2,'0')}-${String(d[0x7D]).padStart(2,'0')}` : '',
        pokerus: pkrs(d[0x82]), shiny: ((tid ^ sid ^ (pid >>> 16) ^ (pid & 0xFFFF)) < 8), nicknamedFlag: !!((iv >>> 31) & 1) };
      return m;
    }
    if(fmt === 'ck3' || fmt === 'xk3'){
      const x = fmt === 'xk3';
      const O = x ? { pid: 0x28, ver: 0x34, loc: 0x08, sid: 0x24, tid: 0x26, ot: 0x38, nick: 0x64, mv: 0x80, ab: d[0x1D] & 0x40, pkStrain: d[0x13] & 0xF, pkDays: d[0x15] }
                  : { pid: 0x04, ver: 0x08, loc: 0x0C, sid: 0x14, tid: 0x16, ot: 0x18, nick: 0x44, mv: 0x78, ab: d[0xCC] === 1, pkStrain: d[0xCA] & 0xF, pkDays: d[0xD0] };
      const species = nat3(be16(d, 0));
      if(!species || species > 386) return null;
      const pid = be32(d, O.pid), tid = be16(d, O.tid), sid = be16(d, O.sid), pers = personal3(species);
      let gender = 2;
      if(pers){ gender = pers.gender === 255 ? 2 : pers.gender === 254 ? 1 : pers.gender === 0 ? 0 : ((pid & 0xFF) < pers.gender ? 1 : 0); }
      const ver = { 1: V.FR, 2: V.LG, 8: V.S, 9: V.R, 10: V.E, 11: V.CXD }[d[O.ver]] || 0;
      const days = (O.pkDays << 24 >> 24) > 0 ? (O.pkDays & 0xF) : 0;
      m = { gen: 3, pid, tid, sid, species, form: 0, version: ver, nickname: strBE(d, O.nick, 22), ot: strBE(d, O.ot, 22), egg: false,
        nature: NATURES[pid % 25], gender, ability: pers ? abilityName(O.ab && pers.a2 ? pers.a2 : pers.a1) : '',
        moves: moveNames([be16(d, O.mv), be16(d, O.mv + 4), be16(d, O.mv + 8), be16(d, O.mv + 12)]),
        ball: BALLS[d[0x0F]] || '', metLevel: d[0x0E], metLoc: locName('gcxd', be16(d, O.loc)), metDate: '',
        pokerus: O.pkStrain && days ? 'infected' : O.pkStrain ? 'cured' : 'none', shiny: ((tid ^ sid ^ (pid >>> 16) ^ (pid & 0xFFFF)) < 8), nicknamedFlag: null };
      return m;
    }
    if(fmt === 'pk6' || fmt === 'pk7' || fmt === 'pb7'){
      const pid = u32(d, 0x18), tid = u16(d, 0xC), sid = u16(d, 0xE), species = u16(d, 8);
      if(!species || species > (fmt === 'pk6' ? 721 : fmt === 'pb7' ? 809 : 807)) return null;
      const iv = u32(d, 0x74);
      const y = d[0xD4];
      m = { gen: fmt === 'pk6' ? 6 : 7, pid, tid, sid, species, form: d[0x1D] >> 3, version: d[0xDF],
        nickname: strU16(d, 0x40, 24), ot: strU16(d, 0xB0, 24), egg: !!((iv >>> 30) & 1), nature: NATURES[d[0x1C]] || '',
        gender: (d[0x1D] >> 1) & 3, ability: abilityName(d[0x14]), moves: moveNames([u16(d,0x5A),u16(d,0x5C),u16(d,0x5E),u16(d,0x60)]),
        ball: BALLS[d[0xDC]] || '', metLevel: d[0xDD] & 0x7F, metLoc: locName(fmt === 'pk6' ? 'g6' : fmt === 'pb7' ? 'g7b' : 'g7', u16(d, 0xDA)),
        metDate: y ? `${2000 + y}-${String(d[0xD5]).padStart(2,'0')}-${String(d[0xD6]).padStart(2,'0')}` : '',
        pokerus: pkrs(d[0x2B]), shiny: (((tid ^ sid ^ (pid >>> 16) ^ (pid & 0xFFFF)) >>> 0) < 16), nicknamedFlag: !!((iv >>> 31) & 1) };
      return m;
    }
    // Gen 8 / 9 / Legends family
    const L = { pb8: { key:'g8b', ver:0xDE, lang:0xE2, nick:0x58, ot:0xF8, iv:0x8C, mv:0x72, gshift:2, date:0x11C, loc:0x122, ball:0x124, lvl:0x125 },
                pk8: { key:'g8', ver:0xDE, lang:0xE2, nick:0x58, ot:0xF8, iv:0x8C, mv:0x72, gshift:2, date:0x11C, loc:0x122, ball:0x124, lvl:0x125 },
                pk9: { key:'g9', ver:0xCE, lang:0xD5, nick:0x58, ot:0xF8, iv:0x8C, mv:0x72, gshift:1, date:0x11C, loc:0x122, ball:0x124, lvl:0x125 },
                pa9: { key:'g9a', ver:0xCE, lang:0xD5, nick:0x58, ot:0xF8, iv:0x8C, mv:0x72, gshift:1, date:0x11C, loc:0x122, ball:0x124, lvl:0x125 },
                pa8: { key:'g8a', ver:0xEE, lang:0xF2, nick:0x60, ot:0x110, iv:0x94, mv:0x54, gshift:2, date:0x134, loc:0x13A, ball:0x137, lvl:0x13D } }[fmt];
    const pid = u32(d, 0x1C), tid = u16(d, 0xC), sid = u16(d, 0xE);
    let species = u16(d, 8);
    if(fmt === 'pk9' || fmt === 'pa9') species = nat9(species);
    if(!species || species > 1100) return null;
    const iv = u32(d, L.iv), y = d[L.date];
    const gen = fmt === 'pk8' || fmt === 'pa8' || fmt === 'pb8' ? 8 : 9;
    m = { gen, pid, tid, sid, species, form: u16(d, 0x24), version: d[L.ver],
      nickname: strU16(d, L.nick, 26), ot: strU16(d, L.ot, 26), egg: !!((iv >>> 30) & 1), nature: NATURES[d[0x20]] || '',
      gender: (d[0x22] >> L.gshift) & 3, ability: abilityName(u16(d, 0x14)), moves: moveNames([u16(d,L.mv),u16(d,L.mv+2),u16(d,L.mv+4),u16(d,L.mv+6)]),
      ball: BALLS[d[L.ball]] || '', metLevel: d[L.lvl] & 0x7F, metLoc: locName(L.key, u16(d, L.loc)),
      metDate: y ? `${2000 + y}-${String(d[L.date + 1]).padStart(2,'0')}-${String(d[L.date + 2]).padStart(2,'0')}` : '',
      pokerus: pkrs(d[0x32]), shiny: (((tid ^ sid ^ (pid >>> 16) ^ (pid & 0xFFFF)) >>> 0) < 16), nicknamedFlag: !!((iv >>> 31) & 1) };
    if(fmt === 'pk9'){
      const ov = d[0x95], orig = d[0x94];
      const t = (ov !== 19 && ov !== 0xFF && ov < 19) ? ov : orig;
      m.teraType = t === 99 ? 'Stellar' : (t < 18 ? TYPE_NAMES[t] : '');
    }
    return m;
  }
  // ---- ribbons, marks, characteristic, Gigantamax factor ----
  const CHARACTERISTICS = [
    'Loves to eat', 'Takes plenty of siestas', 'Nods off a lot', 'Scatters things often', 'Likes to relax',
    'Proud of its power', 'Likes to thrash about', 'A little quick tempered', 'Likes to fight', 'Quick tempered',
    'Sturdy body', 'Capable of taking hits', 'Highly persistent', 'Good endurance', 'Good perseverance',
    'Highly curious', 'Mischievous', 'Thoroughly cunning', 'Often lost in thought', 'Very finicky',
    'Strong willed', 'Somewhat vain', 'Strongly defiant', 'Hates to lose', 'Somewhat stubborn',
    'Likes to run', 'Alert to sounds', 'Impetuous and silly', 'Somewhat of a clown', 'Quick to flee' ];
  // IVs are stored HP, Atk, Def, Spe, SpA, SpD; the characteristic text list is grouped HP, Atk, Def, SpA, SpD, Spe.
  const CHAR_GROUP = [0, 1, 2, 5, 3, 4];
  function characteristicOf(iv, seed){
    const ivs = [0, 5, 10, 15, 20, 25].map(s => (iv >>> s) & 31);
    const start = seed % 6;
    let best = -1, stat = 0;
    for(let i = 0; i < 6; i++){ const s = (start + i) % 6; if(ivs[s] > best){ best = ivs[s]; stat = s; } }
    return CHARACTERISTICS[CHAR_GROUP[stat] * 5 + (best % 5)];
  }
  const bitSet = (d, off, bit) => off < d.length && !!((d[off] >> bit) & 1);
  function ribbonsOf(fmt, d){
    const out = { ribbons: [], contest: [], battle: [] };
    if(fmt === 'pk3'){
      const r = u32(d, 0x4C);
      const tiers = ['base', 'super', 'hyper', 'master'];
      ['cool', 'beauty', 'cute', 'smart', 'tough'].forEach((stat, i) => {
        const n = (r >>> (i * 3)) & 7;
        for(let t = 0; t < Math.min(n, 4); t++) out.contest.push(`contestmem_hoenn_${tiers[t]}_${stat}`);
      });
      [[15, 'champion_ribbon'], [18, 'artist_ribbon'], [19, 'effort_ribbon'], [20, 'battle_champion_ribbon'], [21, 'regional_champion_ribbon'],
       [22, 'national_champion_ribbon'], [23, 'country_ribbon'], [24, 'national_ribbon'], [25, 'earth_ribbon'], [26, 'world_ribbon']]
        .forEach(([bit, key]) => { if((r >>> bit) & 1) out.ribbons.push(key); });
      if((r >>> 16) & 1) out.battle.push('battlemem_winning_ribbon');
      if((r >>> 17) & 1) out.battle.push('battlemem_victory_ribbon');
      return out;
    }
    const rows = (typeof SAVE_RIBBON_BITS !== 'undefined') && SAVE_RIBBON_BITS[fmt === 'pb8' ? 'pk8' : fmt];
    if(!rows) return out;
    rows.forEach(([kind, key, off, bit]) => {
      if(bitSet(d, off, bit)) (kind === 'c' ? out.contest : kind === 'b' ? out.battle : out.ribbons).push(key);
    });
    return out;
  }
  const bytesFor = (fmt, raw, plain) => plain ? (raw.length >= PLAIN_SIZE[fmt] ? raw.slice(0, PLAIN_SIZE[fmt]) : null) : DEC[fmt](raw);
  function decode(fmt, raw, plain){
    const m = decodeBase(fmt, raw, plain);
    if(!m) return null;
    m.fmt = fmt;
    const d = bytesFor(fmt, raw, plain);
    if(!d) return m;
    if(m.species === 869 && (fmt === 'pk8' || fmt === 'pb8' || fmt === 'pk9')) m.formArg = u32(d, fmt === 'pk9' ? 0xD0 : 0xE4);
    const r = ribbonsOf(fmt, d);
    m.ribbons = r.ribbons; m.contestSub = r.contest; m.battleSub = r.battle;
    // Characteristic exists from Gen 4 on (Gen 3 and Let's Go / Legends titles don't show it).
    const ivOff = { pk4: 0x38, pk5: 0x38, pk6: 0x74, pk7: 0x74, pk8: 0x8C, pb8: 0x8C, pk9: 0x8C }[fmt];
    if(ivOff !== undefined){
      // The seed is the PID in Gen 4/5 and the encryption constant after that; both sit at 0x00.
      m.characteristic = characteristicOf(u32(d, ivOff), u32(d, 0));
    }
    if(fmt === 'pk8') m.gmax = !!(d[0x16] & 16);
    // Gen 6 and later only keep a Memory Ribbon flag, not which sub-ribbons were earned.
    const memOff = { pk6: 0x34, pk7: 0x34, pb7: 0x34, pk8: 0x38, pb8: 0x38, pa8: 0x38, pk9: 0x38, pa9: 0x38 }[fmt];
    if(memOff !== undefined){
      const contest = bitSet(d, memOff, 5), battle = bitSet(d, memOff, 6);
      if(contest || battle) m.memoryFlags = { contest, battle };
    }
    return m;
  }
  function pkrs(b){ const strain = b >> 4, days = b & 0xF; return strain && days ? 'infected' : strain ? 'cured' : 'none'; }

  // ---- save layouts: each returns { game, fmt, slots: [{raw, where}] } ----
  function slotsFrom(buf, fmt, size, list){
    return list.filter(s => s.off + size <= buf.length).map(s => ({ raw: buf.subarray(s.off, s.off + size), where: s.where, fmt }));
  }
  function readGen3(buf){
    if(buf.length < 0x10000) return null;
    const slotCount = buf.length >= 0x20000 ? 2 : 1;
    const info = [];
    for(let s = 0; s < slotCount; s++){
      const base = s * 0xE000, ids = {}; let ok = true;
      for(let i = 0; i < 14; i++){
        const id = u16(buf, base + i * 0x1000 + 0xFF4);
        if(id >= 14 || ids[id] !== undefined){ ok = false; break; }
        ids[id] = base + i * 0x1000;
      }
      if(ok && Object.keys(ids).length === 14) info.push({ ids, counter: u32(buf, ids[0] + 0xFFC) });
    }
    if(!info.length) return null;
    let a = info[0];
    if(info[1] && info[1].counter > a.counter && info[1].counter !== 0xFFFFFFFF) a = info[1];
    const sect = id => buf.subarray(a.ids[id], a.ids[id] + 0xF80);
    const small = sect(0);
    const large = new Uint8Array(4 * 0xF80), storage = new Uint8Array(9 * 0xF80);
    for(let i = 1; i <= 4; i++) large.set(sect(i), (i - 1) * 0xF80);
    for(let i = 5; i <= 13; i++) storage.set(sect(i), (i - 5) * 0xF80);
    const k = u32(small, 0xAC);
    let kind = k === 1 ? 'frlg' : k === 0 ? 'rs' : 'rs';
    if(k !== 0 && k !== 1){ for(let i = 0x890; i < 0xF2C; i++) if(small[i]){ kind = 'e'; break; } }
    const list = [];
    const cntOff = kind === 'frlg' ? 0x34 : 0x234, partyOff = kind === 'frlg' ? 0x38 : 0x238;
    const count = Math.min(large[cntOff], 6);
    for(let i = 0; i < count; i++) list.push({ off: partyOff + 100 * i, where: { party: i + 1 } });
    const party = slotsFrom(large, 'pk3', 80, list);
    const boxes = [];
    for(let b = 0; b < 14; b++) for(let s = 0; s < 30; s++) boxes.push({ off: 4 + 80 * (b * 30 + s), where: { box: b + 1, slot: s + 1 } });
    const names = { rs: ['Pokémon Ruby', 'Pokémon Sapphire'], e: ['Pokémon Emerald'], frlg: ['Pokémon FireRed', 'Pokémon LeafGreen'] };
    return { gen: 3, name: { rs: 'Ruby / Sapphire', e: 'Emerald', frlg: 'FireRed / LeafGreen' }[kind],
      candidates: { rs: [V.R, V.S], e: [V.E], frlg: [V.FR, V.LG] }[kind],
      slots: party.concat(slotsFrom(storage, 'pk3', 80, boxes)) };
  }

  function cmpCounter(c1, c2){
    if(c1 === 0xFFFFFFFF && c2 !== 0xFFFFFFFE) return 1;
    if(c2 === 0xFFFFFFFF && c1 !== 0xFFFFFFFE) return 0;
    if(c1 > c2) return 0; if(c1 < c2) return 1; return 2;
  }
  function activeBlock4(buf, begin, length){
    const o = begin + length - 0x14;
    if(o + 0x40000 + 8 > buf.length) return 0;
    let r = cmpCounter(u32(buf, o), u32(buf, o + 0x40000));
    if(r === 2) r = cmpCounter(u32(buf, o + 4), u32(buf, o + 0x40004));
    return r === 1 ? 1 : 0;
  }
  const GEN4 = [
    { id: 'dp', name: 'Diamond / Pearl', g: 0xC100, s: 0x121E0, sStart: 0xC100, party: 0x98, boxBase: 4, boxLen: 0xFF0, cand: [V.D, V.P] },
    { id: 'pt', name: 'Platinum', g: 0xCF2C, s: 0x121E4, sStart: 0xCF2C, party: 0xA0, boxBase: 4, boxLen: 0xFF0, cand: [V.Pt] },
    { id: 'hgss', name: 'HeartGold / SoulSilver', g: 0xF628, s: 0x12310, sStart: 0xF700, party: 0x98, boxBase: 0, boxLen: 0x1000, cand: [V.HG, V.SS] }
  ];
  function readGen4(buf){
    if(buf.length < 0x80000) return null;
    for(const g of GEN4){
      const valid = p => {
        const o = p * 0x40000 + g.g;
        return u32(buf, o - 0xC) === g.g && (u32(buf, o - 8) === 0x20060623 || u32(buf, o - 8) === 0x20070903);
      };
      if(!valid(0) && !valid(1)) continue;
      const gbo = activeBlock4(buf, 0, g.g) ? 0x40000 : 0;
      const sbo = (activeBlock4(buf, g.sStart, g.s) ? 0x40000 : 0) + g.sStart;
      const count = Math.min(buf[gbo + g.party - 4], 6);
      const list = [];
      for(let i = 0; i < count; i++) list.push({ off: gbo + g.party + 236 * i, where: { party: i + 1 } });
      for(let b = 0; b < 18; b++) for(let s = 0; s < 30; s++) list.push({ off: sbo + g.boxBase + b * g.boxLen + s * 136, where: { box: b + 1, slot: s + 1 } });
      return { gen: 4, name: g.name, candidates: g.cand, slots: slotsFrom(buf, 'pk4', 136, list) };
    }
    return null;
  }
  function readGen5(buf){
    if(buf.length < 0x80000) return null;
    const count = buf[0x18E00 + 4];
    if(count > 6) return null;
    const list = [];
    for(let i = 0; i < count; i++) list.push({ off: 0x18E00 + 8 + 220 * i, where: { party: i + 1 } });
    for(let b = 0; b < 24; b++) for(let s = 0; s < 30; s++) list.push({ off: 0x400 + 136 * (b * 30 + s) + b * 0x10, where: { box: b + 1, slot: s + 1 } });
    const slots = slotsFrom(buf, 'pk5', 136, list);
    if(!slots.some(s => decode('pk5', s.raw))) return null;
    return { gen: 5, name: 'Black / White / Black 2 / White 2', candidates: [V.B, V.W, V.B2, V.W2], slots };
  }
  function read3DS(buf){
    const S = { 0x65600: ['pk6', 'X / Y', [V.X, V.Y], 0x14200, 0x22600, 31, 6], 0x76000: ['pk6', 'Omega Ruby / Alpha Sapphire', [V.OR, V.AS], 0x14200, 0x33000, 31, 6],
      0x6BE00: ['pk7', 'Sun / Moon', [V.SN, V.MN], 0x1400, 0x4E00, 32, 7], 0x6CC00: ['pk7', 'Ultra Sun / Ultra Moon', [V.US, V.UM], 0x1600, 0x5200, 32, 7] }[buf.length];
    if(!S) return null;
    const [fmt, name, cand, party, box, boxes, gen] = S;
    const count = Math.min(buf[party + 6 * 260], 6);
    const list = [];
    for(let i = 0; i < count; i++) list.push({ off: party + 260 * i, where: { party: i + 1 } });
    for(let b = 0; b < boxes; b++) for(let s = 0; s < 30; s++) list.push({ off: box + 232 * (b * 30 + s), where: { box: b + 1, slot: s + 1 } });
    return { gen, name, candidates: cand, slots: slotsFrom(buf, fmt, 232, list) };
  }


  // ---- Let's Go, Pikachu! / Eevee! ----
  function readLGPE(buf){
    if(buf.length !== 0x100000) return null;
    const partyIdx = {};
    for(let i = 0; i < 6; i++){ const v = u16(buf, 0x5A00 + i * 2); if(v < 1000 && partyIdx[v] === undefined) partyIdx[v] = Object.keys(partyIdx).length + 1; }
    const list = [];
    for(let i = 0; i < 1000; i++){
      list.push({ off: 0x5C00 + 260 * i, where: partyIdx[i] ? { party: partyIdx[i] } : { box: Math.floor(i / 25) + 1, slot: (i % 25) + 1 } });
    }
    const slots = slotsFrom(buf, 'pb7', 232, list);
    if(!slots.some(x => decode('pb7', x.raw))) return null;
    return { gen: 7, name: "Let's Go, Pikachu! / Eevee!", candidates: [V.GP, V.GE], slots };
  }

  // ---- Brilliant Diamond / Shining Pearl ----
  function readBDSP(buf){
    if(![0xE9828, 0xEDC20, 0xEED8C, 0xEF0A4].includes(buf.length)) return null;
    const count = Math.min(buf[0x14098 + 6 * 0x158], 6);
    const list = [];
    for(let i = 0; i < count; i++) list.push({ off: 0x14098 + 0x158 * i, where: { party: i + 1 } });
    for(let b = 0; b < 40; b++) for(let s = 0; s < 30; s++) list.push({ off: 0x14EF4 + 0x158 * (b * 30 + s), where: { box: b + 1, slot: s + 1 } });
    const slots = slotsFrom(buf, 'pb8', 0x148, list);
    if(!slots.some(x => decode('pb8', x.raw))) return null;
    return { gen: 8, name: 'Brilliant Diamond / Shining Pearl', candidates: [V.BD, V.SP], slots };
  }

  // ---- Pokémon Colosseum / XD: Gale of Darkness (GameCube) ----
  function sha1(msg){
    const h = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
    const len = msg.length, padLen = ((len + 8) >> 6 << 6) + 64;
    const m = new Uint8Array(padLen); m.set(msg); m[len] = 0x80;
    const dv = new DataView(m.buffer); dv.setUint32(padLen - 4, len << 3, false); dv.setUint32(padLen - 8, Math.floor(len / 0x20000000), false);
    const w = new Uint32Array(80), rol = (x, n) => (x << n) | (x >>> (32 - n));
    for(let o = 0; o < padLen; o += 64){
      for(let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4, false);
      for(let i = 16; i < 80; i++) w[i] = rol(w[i-3] ^ w[i-8] ^ w[i-14] ^ w[i-16], 1);
      let [a, b, c, d, e] = h;
      for(let i = 0; i < 80; i++){
        const [f, k] = i < 20 ? [(b & c) | (~b & d), 0x5A827999] : i < 40 ? [b ^ c ^ d, 0x6ED9EBA1] : i < 60 ? [(b & c) | (b & d) | (c & d), 0x8F1BBCDC] : [b ^ c ^ d, 0xCA62C1D6];
        const t = (rol(a, 5) + f + e + k + w[i]) | 0;
        e = d; d = c; c = rol(b, 30); b = a; a = t;
      }
      h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0; h[4] = (h[4] + e) | 0;
    }
    const out = new Uint8Array(20), ov = new DataView(out.buffer);
    h.forEach((v, i) => ov.setUint32(i * 4, v >>> 0, false));
    return out;
  }
  function colosseumDecrypt(slot){
    const d = slot.slice();
    let digest = d.slice(d.length - 20).map(x => ~x & 0xFF);
    for(let o = 0x18; o + 20 <= d.length - 20; o += 20){
      const next = sha1(d.subarray(o, o + 20));
      for(let j = 0; j < 20; j++) d[o + j] ^= digest[j];
      digest = next;
    }
    return d;
  }
  function geniusDecrypt(slot){
    const d = slot.slice();
    const keys = [be16(d, 8), be16(d, 10), be16(d, 12), be16(d, 14)];
    for(let i = 0x10; i + 1 < 0x27FD8; ){
      for(let k = 0; k < 4; k++, i += 2){ const v = (be16(d, i) - keys[k]) & 0xFFFF; d[i] = v >> 8; d[i + 1] = v & 0xFF; }
      const k3 = keys[3] + 0x13, k2 = keys[2] + 0x17, k1 = keys[1] + 0x29, k0 = keys[0] + 0x43;
      keys[3] = ((k0 >> 12) & 0xf) | ((k1 >> 8) & 0xf0) | ((k2 >> 4) & 0xf00) | (k3 & 0xf000);
      keys[2] = ((k0 >> 8) & 0xf) | ((k1 >> 4) & 0xf0) | (k2 & 0xf00) | ((k3 << 4) & 0xf000);
      keys[1] = ((k0 >> 4) & 0xf) | (k1 & 0xf0) | ((k2 << 4) & 0xf00) | ((k3 << 8) & 0xf000);
      keys[0] = (k0 & 0xf) | ((k1 << 4) & 0xf0) | ((k2 << 8) & 0xf00) | ((k3 << 12) & 0xf000);
    }
    return d;
  }
  function latestSlot(buf, count, size){
    let best = -1, idx = -1;
    for(let i = 0; i < count; i++){ const c = be32(buf, 0x6000 + i * size + 4) | 0; if(c > best){ best = c; idx = i; } }
    return idx;
  }
  function readColosseum(buf){
    if(buf.length !== 0x60000) return null;
    for(let i = 0; i < 3; i++) if(u32(buf, 0x6000 + 0x1E000 * i) !== 0x101) return null;
    const idx = latestSlot(buf, 3, 0x1E000);
    const d = colosseumDecrypt(buf.subarray(0x6000 + idx * 0x1E000, 0x6000 + (idx + 1) * 0x1E000));
    const list = [];
    for(let i = 0; i < 6; i++) list.push({ off: 0xA8 + 312 * i, where: { party: i + 1 } });
    for(let b = 0; b < 3; b++) for(let s = 0; s < 30; s++) list.push({ off: 0xB90 + (30 * 312 + 0x14) * b + 0x14 + 312 * s, where: { box: b + 1, slot: s + 1 } });
    const slots = slotsFrom(d, 'ck3', 312, list).filter(x => (x.raw[0] | x.raw[1]));
    return { gen: 3, name: 'Pokémon Colosseum', candidates: [V.CXD], gcKey: 'colosseum', slots };
  }
  function readXD(buf){
    if(buf.length !== 0x56000) return null;
    for(let i = 0; i < 2; i++) if((u32(buf, 0x6000 + 0x28000 * i) & 0xFFFEFFFF) !== 0x101) return null;
    const idx = latestSlot(buf, 2, 0x28000);
    const d = geniusDecrypt(buf.subarray(0x6000 + idx * 0x28000, 0x6000 + (idx + 1) * 0x28000));
    const sub = i => be16(d, 0x40 + 4 * i) | (be16(d, 0x40 + 4 * i + 2) << 16);
    const party = sub(1) + 0xA8 + 0x30, box = sub(2) + 0xA8;
    if(party < 0 || box < 0 || box + 8 * (30 * 196 + 0x14) > d.length) return null;
    const list = [];
    for(let i = 0; i < 6; i++) list.push({ off: party + 196 * i, where: { party: i + 1 } });
    for(let b = 0; b < 8; b++) for(let s = 0; s < 30; s++) list.push({ off: box + (30 * 196 + 0x14) * b + 0x14 + 196 * s, where: { box: b + 1, slot: s + 1 } });
    const slots = slotsFrom(d, 'xk3', 196, list).filter(x => (x.raw[0] | x.raw[1]));
    return { gen: 3, name: 'Pokémon XD: Gale of Darkness', candidates: [V.CXD], gcKey: 'xdgaleofdarkness', slots };
  }
  const isGCCode = (b, o) => { const c = String.fromCharCode(b[o], b[o+1], b[o+2], b[o+3]); return /^GC6[EJP]$/.test(c) ? 'colosseum' : /^GXX[EJP]$/.test(c) ? 'xd' : ''; };
  // GameCube memory card image: returns { colosseum, xd } raw save data blocks
  function memoryCardSaves(buf){
    const size = buf.length;
    if(size < 0x80000 || size > 0x4000000 || (size & (size - 1))) return null;
    if(be16(buf, 0x22) !== size / 0x2000 / 16) return null;
    const dirA = 0x2000, dirB = 0x4000;
    const dir = be16(buf, dirB + 0x1FFA) > be16(buf, dirA + 0x1FFA) ? dirB : dirA;
    const out = {};
    for(let i = 0; i < 127; i++){
      const e = dir + i * 0x40, kind = isGCCode(buf, e); if(!kind) continue;
      const first = be16(buf, e + 0x36), blocks = be16(buf, e + 0x38);
      if(first < 5 || (first + blocks) * 0x2000 > size) continue;
      out[kind] = buf.subarray(first * 0x2000, (first + blocks) * 0x2000);
    }
    return Object.keys(out).length ? out : null;
  }
  function readGC(buf, want){
    let raw = null, kind = '', other = '';
    if(buf.length === 0x60000 + 0x40 && isGCCode(buf, 0) === 'colosseum'){ raw = buf.subarray(0x40); kind = 'colosseum'; }
    else if(buf.length === 0x56000 + 0x40 && isGCCode(buf, 0) === 'xd'){ raw = buf.subarray(0x40); kind = 'xd'; }
    else if(buf.length === 0x60000){ raw = buf; kind = 'colosseum'; }
    else if(buf.length === 0x56000){ raw = buf; kind = 'xd'; }
    else {
      const card = memoryCardSaves(buf); if(!card) return null;
      kind = want && card[want] ? want : (card.xd ? 'xd' : 'colosseum');
      other = card.xd && card.colosseum ? (kind === 'xd' ? 'colosseum' : 'xd') : '';
      raw = card[kind];
    }
    const r = kind === 'xd' ? readXD(raw) : readColosseum(raw);
    if(r && other) r.alsoFound = other;
    return r;
  }

  // ---- Switch era (SwishCrypto blocks): Sword/Shield, Legends: Arceus, Scarlet/Violet, Legends: Z-A ----
  const XORPAD = [0xA0,0x92,0xD1,0x06,0x07,0xDB,0x32,0xA1,0xAE,0x01,0xF5,0xC5,0x1E,0x84,0x4F,0xE3,0x53,0xCA,0x37,0xF4,0xA7,0xB0,0x4D,0xA0,
    0x18,0xB7,0xC2,0x97,0xDA,0x5F,0x53,0x2B,0x75,0xFA,0x48,0x16,0xF8,0xD4,0x8A,0x6F,0x61,0x05,0xF4,0xE2,0xFD,0x04,0xB5,0xA3,0x0F,0xFC,0x44,0x92,
    0xCB,0x32,0xE6,0x1B,0xB9,0xB1,0x2E,0x01,0xB0,0x56,0x53,0x36,0xD2,0xD1,0x50,0x3D,0xDE,0x5B,0x2E,0x0E,0x52,0xFD,0xDF,0x2F,0x7B,0xCA,0x63,0x50,
    0xA4,0x67,0x5D,0x23,0x17,0xC0,0x52,0xE1,0xA6,0x30,0x7C,0x2B,0xB6,0x70,0x36,0x5B,0x2A,0x27,0x69,0x33,0xF5,0x63,0x7B,0x36,0x3F,0x26,0x9B,0xA3,
    0xED,0x7A,0x53,0x00,0xA4,0x48,0xB3,0x50,0x9E,0x14,0xA0,0x52,0xDE,0x7E,0x10,0x2B,0x1B,0x77,0x6E];
  function xorshift(seed){
    let state = seed >>> 0, counter = 0;
    let pop = 0; for(let s = state; s; s &= s - 1) pop++;
    const adv = () => { state = (state ^ (state << 2)) >>> 0; state = (state ^ (state >>> 15)) >>> 0; state = (state ^ (state << 13)) >>> 0; };
    for(let i = 0; i < pop; i++) adv();
    const next = () => { const r = (state >>> (counter << 3)) & 0xFF; if(counter === 3){ adv(); counter = 0; } else counter++; return r; };
    const next32 = () => (next() | (next() << 8) | (next() << 16) | (next() << 24)) | 0;
    return { next, next32 };
  }
  const SC_SIZE = { 8:1, 9:2, 10:4, 11:8, 12:1, 13:2, 14:4, 15:8, 16:4, 17:8 };
  // Returns Map(key -> Uint8Array) for the wanted keys, or null when the payload is not a block save.
  function readBlocks(buf, wanted){
    if(buf.length < 0x20000) return null;
    const payload = buf.slice(0, buf.length - 32);
    for(let i = 0; i < payload.length; i++) payload[i] ^= XORPAD[i % 127];
    const out = new Map(); let off = 0, blocks = 0;
    try{
      while(off < payload.length){
        if(off + 5 > payload.length) return null;
        const key = u32(payload, off); off += 4;
        const xk = xorshift(key);
        const type = payload[off++] ^ xk.next();
        let len = 0, dataOff;
        if(type === 1 || type === 2 || type === 3){ blocks++; continue; }
        else if(type === 4){ len = (u32(payload, off) ^ xk.next32()) | 0; off += 4; }
        else if(type === 5){ const n = (u32(payload, off) ^ xk.next32()) | 0; off += 4; const sub = payload[off++] ^ xk.next(); if(!SC_SIZE[sub] && sub !== 3) return null; len = n * (SC_SIZE[sub] || 1); }
        else if(SC_SIZE[type]) len = SC_SIZE[type];
        else return null;
        if(len < 0 || off + len > payload.length) return null;
        dataOff = off; off += len; blocks++;
        if(wanted.includes(key)){
          const arr = payload.slice(dataOff, dataOff + len);
          for(let i = 0; i < arr.length; i++) arr[i] ^= xk.next();
          out.set(key, arr);
        }
      }
    } catch(e){ return null; }
    return blocks > 50 && off === payload.length ? out : null;
  }
  const K = { BOX: 0x0d66012c, LA_BOX: 0x47E1CEAB, PARTY_SWSH: 0x2985fe5d, PARTY_SV: 0x3AA1A9AD };
  function scanSlots(data, fmt, stride, size, cap, label){
    const list = [];
    for(let o = 0, i = 0; o + size <= data.length && i < cap; o += stride, i++) list.push({ off: o, where: label(i) });
    return slotsFrom(data, fmt, size, list);
  }
  const countValid = (slots, fmt, n) => { let c = 0; for(let i = 0; i < Math.min(slots.length, n); i++) if(decode(fmt, slots[i].raw)) c++; return c; };
  function readSwitch(buf){
    const blocks = readBlocks(buf, [K.BOX, K.LA_BOX, K.PARTY_SWSH, K.PARTY_SV]);
    if(!blocks) return null;
    const boxLoc = i => ({ box: Math.floor(i / 30) + 1, slot: (i % 30) + 1 }), partyLoc = i => ({ party: i + 1 });
    if(blocks.has(K.LA_BOX)){
      const slots = (blocks.has(K.PARTY_SWSH) ? scanSlots(blocks.get(K.PARTY_SWSH), 'pa8', 0x178, 0x168, 6, partyLoc) : [])
        .concat(scanSlots(blocks.get(K.LA_BOX), 'pa8', 0x168, 0x168, 32 * 30, boxLoc));
      return { gen: 8, name: 'Legends: Arceus', candidates: [V.PLA], slots };
    }
    if(blocks.has(K.PARTY_SV) && blocks.has(K.BOX)){
      const bx = blocks.get(K.BOX);
      // Scarlet/Violet boxes are packed 0x158 apart; Legends: Z-A adds a 0x40 gap and a longer party stride.
      const sv = scanSlots(bx, 'pk9', 0x158, 0x148, 32 * 30, boxLoc);
      const za = scanSlots(bx, 'pa9', 0x198, 0x148, 32 * 30, boxLoc);
      const isZA = countValid(za, 'pa9', 400) > countValid(sv, 'pk9', 400);
      if(isZA){
        return { gen: 9, name: 'Legends: Z-A', candidates: [V.ZA], slots: scanSlots(blocks.get(K.PARTY_SV), 'pa9', 0x1E0, 0x148, 6, partyLoc).concat(za) };
      }
      return { gen: 9, name: 'Scarlet / Violet', candidates: [V.SL, V.VL], slots: scanSlots(blocks.get(K.PARTY_SV), 'pk9', 0x158, 0x148, 6, partyLoc).concat(sv) };
    }
    if(blocks.has(K.PARTY_SWSH) && blocks.has(K.BOX)){
      return { gen: 8, name: 'Sword / Shield', candidates: [V.SW, V.SH],
        slots: scanSlots(blocks.get(K.PARTY_SWSH), 'pk8', 0x158, 0x148, 6, partyLoc).concat(scanSlots(blocks.get(K.BOX), 'pk8', 0x158, 0x148, 32 * 30, boxLoc)) };
    }
    return null;
  }

  // ---- entry point ----
  function detect(buf, want){
    // strip emulator footers (DeSmuME .dsv etc.) and RTC trailers
    if(buf.length >= 0x80000 && buf.length < 0x80200) buf = buf.subarray(0, 0x80000);
    else if(buf.length > 0x20000 && buf.length < 0x20200) buf = buf.subarray(0, 0x20000);
    let r = null;
    if(buf.length === 0x20000 || buf.length === 0x10000) r = readGen3(buf);
    else if(buf.length === 0x80000) r = readGen4(buf) || readGen5(buf) || readGC(buf, want);
    else if([0x65600, 0x76000, 0x6BE00, 0x6CC00].includes(buf.length)) r = read3DS(buf);
    else if(buf.length === 0x100000) r = readLGPE(buf) || readGC(buf, want);
    else if([0xE9828, 0xEDC20, 0xEED8C, 0xEF0A4].includes(buf.length)) r = readBDSP(buf);
    else r = readGC(buf, want) || readSwitch(buf);
    return r;
  }

  function read(bytes, want){
    // always a plain Uint8Array so slice() copies (Node Buffers would alias)
    const buf = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.length);
    const found = detect(buf, want);
    if(!found){
      const hint = buf.length === 0x8000 || buf.length === 0x8010 ? 'This looks like a Gen 1 or Gen 2 save, which is not supported yet.'
        : buf.length === 0x76000 || buf.length === 0x76040 ? 'Pokémon Box Ruby & Sapphire saves are not supported.'
        : 'This does not look like a supported Pokémon save (Gen 3 to Gen 9, Legends: Arceus, Legends: Z-A).';
      const err = new Error(hint); err.unsupported = true; throw err;
    }
    const mons = []; let skipped = 0, eggs = 0, formGuess = 0;
    const own = {};
    found.slots.forEach(s => {
      const m = decode(s.fmt, s.raw);
      if(!m) return;
      if(m.egg){ eggs++; return; }
      const sp = resolveSpecies(m);
      if(!sp){ skipped++; return; }
      m.entry = sp.entry; m.formKnown = sp.formKnown; m.where = s.where;
      if(!sp.formKnown) formGuess++;
      if(found.candidates.includes(m.version)) own[m.version] = (own[m.version] || 0) + 1;
      mons.push(m);
    });
    // Which exact game is this save from? Majority of Pokémon whose origin game is one of the candidates.
    let saveVersion = found.candidates[0], best = 0;
    Object.keys(own).forEach(v => { if(own[v] > best){ best = own[v]; saveVersion = +v; } });
    const ambiguous = found.candidates.length > 1 && best === 0;
    if(found.gcKey) mons.forEach(m => { if(m.version === V.CXD) m.originKey = found.gcKey; });
    return { gen: found.gen, name: found.name, saveVersion, ambiguous: ambiguous && !found.gcKey, candidates: found.candidates, mons, skipped, eggs, formGuess, gcKey: found.gcKey || '', alsoFound: found.alsoFound || '' };
  }

  // ---- single-Pokémon files (.pk3-.pk9, .pa8/.pa9, .pb7/.pb8, .ck3/.xk3 decrypted; .ek3-.ek9 encrypted) ----
  const PK_EXT = /\.(p[kab][0-9]|ck3|xk3|ek[0-9])$/i;
  function fileFormat(name){
    const m = /\.([a-z0-9]+)$/i.exec(name || ''); if(!m) return null;
    let ext = m[1].toLowerCase(), enc = false;
    if(/^ek[0-9]$/.test(ext)){ enc = true; ext = 'pk' + ext[2]; }
    return PLAIN_SIZE[ext] ? { fmt: ext, enc } : null;
  }
  const isPkmFileName = name => PK_EXT.test(name || '');
  function readPKM(files){
    const mons = []; let bad = 0, skipped = 0;
    files.forEach(f => {
      const info = fileFormat(f.name);
      const bytes = f.bytes instanceof ArrayBuffer ? new Uint8Array(f.bytes) : new Uint8Array(f.bytes.buffer, f.bytes.byteOffset, f.bytes.length);
      const m = info && decode(info.fmt, bytes, !info.enc);
      if(!m){ bad++; return; }
      if(m.egg){ skipped++; return; }
      const sp = resolveSpecies(m);
      if(!sp){ bad++; return; }
      m.entry = sp.entry; m.formKnown = sp.formKnown; m.where = { file: f.name };
      if(m.version === V.CXD) m.originKey = info.fmt === 'xk3' ? 'xdgaleofdarkness' : 'colosseum';
      mons.push(m);
    });
    if(!mons.length){ const err = new Error(bad ? 'None of those files are valid Pokémon files (.pk3 to .pk9, .pa8, .pa9, .pb7, .pb8, .ck3, .xk3 or encrypted .ek* files).' : 'Those files only contained eggs.'); err.unsupported = true; throw err; }
    const counts = {}; mons.forEach(m => { counts[m.version] = (counts[m.version] || 0) + 1; });
    const saveVersion = +Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    const top = mons.find(m => m.version === saveVersion);
    return { gen: mons[0].gen, name: mons.length === 1 ? 'Pokémon file' : 'Pokémon files', saveVersion, saveKey: top.originKey || '', ambiguous: false, fromFiles: true,
      candidates: [], mons, skipped: bad, eggs: skipped, formGuess: mons.filter(m => !m.formKnown).length, gcKey: top.originKey || '', alsoFound: '' };
  }

  return { read, readPKM, isPkmFileName, decode, VERSION_KEY, V, BALLS, _internals: { sha1, geniusDecrypt, colosseumDecrypt, dec3, decXor, readBlocks, xorshift, pickSpecies, resolveSpecies, XORPAD } };
})();
