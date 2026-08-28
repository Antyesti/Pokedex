/**
 * Move List
 * ---------
 * MOVE_LIST is the full roster of normal, selectable moves used by the Move picker in
 * Moveset by Game (name + type only, like POKEMON_SPECIES backs the Species picker).
 *
 * The other four lists/tables below are never picked directly. They describe how a
 * normal move already entered in a slot is displayed once a Forms toggle is on:
 *
 * - BASIC_Z_MOVES: one Z-Move per type. Replaces any move of that type in a slot once
 *   that slot's Z-Move toggle is on, unless a Special Z-Move applies instead (see below).
 * - SPECIAL_Z_MOVES: replaces one specific move for one or more specific species, taking
 *   priority over that move's Basic Z-Move. `replaces` is matched against the move name
 *   already in the slot (case-insensitive); `pokemon` is matched against the Pokémon's
 *   species name the same way.
 * - MAX_MOVES: one Max Move per type, shown for every damaging move in a row once
 *   Gigantamax is enabled and is the Pokémon's currently shown form. Status moves all
 *   become Max Guard regardless of type; since the move list doesn't track move category
 *   yet, Max Guard isn't auto-applied and has to be picked by hand for now.
 * - GMAX_MOVES: a species' exclusive move for one type, taking priority over that type's
 *   normal Max Move whenever Gigantamax is shown, matched the same way as Special Z-Moves.
 */

const MOVE_LIST = [
  {
    id: "absorb",
    name: "Absorb",
    type: "Grass"
  },
  {
    id: "accelerock",
    name: "Accelerock",
    type: "Rock"
  },
  {
    id: "acid",
    name: "Acid",
    type: "Poison"
  },
  {
    id: "acid_armor",
    name: "Acid Armor",
    type: "Poison"
  },
  {
    id: "acid_spray",
    name: "Acid Spray",
    type: "Poison"
  },
  {
    id: "acrobatics",
    name: "Acrobatics",
    type: "Flying"
  },
  {
    id: "acupressure",
    name: "Acupressure",
    type: "Normal"
  },
  {
    id: "aerial_ace",
    name: "Aerial Ace",
    type: "Flying"
  },
  {
    id: "aeroblast",
    name: "Aeroblast",
    type: "Flying"
  },
  {
    id: "after_you",
    name: "After You",
    type: "Normal"
  },
  {
    id: "agility",
    name: "Agility",
    type: "Psychic"
  },
  {
    id: "air_cutter",
    name: "Air Cutter",
    type: "Flying"
  },
  {
    id: "air_slash",
    name: "Air Slash",
    type: "Flying"
  },
  {
    id: "alluring_voice",
    name: "Alluring Voice",
    type: "Fairy"
  },
  {
    id: "ally_switch",
    name: "Ally Switch",
    type: "Psychic"
  },
  {
    id: "amnesia",
    name: "Amnesia",
    type: "Psychic"
  },
  {
    id: "anchor_shot",
    name: "Anchor Shot",
    type: "Steel"
  },
  {
    id: "ancient_power",
    name: "Ancient Power",
    type: "Rock"
  },
  {
    id: "apple_acid",
    name: "Apple Acid",
    type: "Grass"
  },
  {
    id: "aqua_cutter",
    name: "Aqua Cutter",
    type: "Water"
  },
  {
    id: "aqua_jet",
    name: "Aqua Jet",
    type: "Water"
  },
  {
    id: "aqua_ring",
    name: "Aqua Ring",
    type: "Water"
  },
  {
    id: "aqua_step",
    name: "Aqua Step",
    type: "Water"
  },
  {
    id: "aqua_tail",
    name: "Aqua Tail",
    type: "Water"
  },
  {
    id: "arm_thrust",
    name: "Arm Thrust",
    type: "Fighting"
  },
  {
    id: "armor_cannon",
    name: "Armor Cannon",
    type: "Fire"
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy",
    type: "Grass"
  },
  {
    id: "aromatic_mist",
    name: "Aromatic Mist",
    type: "Fairy"
  },
  {
    id: "assist",
    name: "Assist",
    type: "Normal"
  },
  {
    id: "assurance",
    name: "Assurance",
    type: "Dark"
  },
  {
    id: "astonish",
    name: "Astonish",
    type: "Ghost"
  },
  {
    id: "astral_barrage",
    name: "Astral Barrage",
    type: "Ghost"
  },
  {
    id: "attack_order",
    name: "Attack Order",
    type: "Bug"
  },
  {
    id: "attract",
    name: "Attract",
    type: "Normal"
  },
  {
    id: "aura_sphere",
    name: "Aura Sphere",
    type: "Fighting"
  },
  {
    id: "aura_wheel",
    name: "Aura Wheel",
    type: "Electric"
  },
  {
    id: "aurora_beam",
    name: "Aurora Beam",
    type: "Ice"
  },
  {
    id: "aurora_veil",
    name: "Aurora Veil",
    type: "Ice"
  },
  {
    id: "autotomize",
    name: "Autotomize",
    type: "Steel"
  },
  {
    id: "avalanche",
    name: "Avalanche",
    type: "Ice"
  },
  {
    id: "axe_kick",
    name: "Axe Kick",
    type: "Fighting"
  },
  {
    id: "baby_doll_eyes",
    name: "Baby-Doll Eyes",
    type: "Fairy"
  },
  {
    id: "baddy_bad",
    name: "Baddy Bad",
    type: "Dark"
  },
  {
    id: "baneful_bunker",
    name: "Baneful Bunker",
    type: "Poison"
  },
  {
    id: "barb_barrage",
    name: "Barb Barrage",
    type: "Poison"
  },
  {
    id: "barrage",
    name: "Barrage",
    type: "Normal"
  },
  {
    id: "barrier",
    name: "Barrier",
    type: "Psychic"
  },
  {
    id: "baton_pass",
    name: "Baton Pass",
    type: "Normal"
  },
  {
    id: "beak_blast",
    name: "Beak Blast",
    type: "Flying"
  },
  {
    id: "beat_up",
    name: "Beat Up",
    type: "Dark"
  },
  {
    id: "behemoth_bash",
    name: "Behemoth Bash",
    type: "Steel"
  },
  {
    id: "behemoth_blade",
    name: "Behemoth Blade",
    type: "Steel"
  },
  {
    id: "belch",
    name: "Belch",
    type: "Poison"
  },
  {
    id: "belly_drum",
    name: "Belly Drum",
    type: "Normal"
  },
  {
    id: "bestow",
    name: "Bestow",
    type: "Normal"
  },
  {
    id: "bide",
    name: "Bide",
    type: "Normal"
  },
  {
    id: "bind",
    name: "Bind",
    type: "Normal"
  },
  {
    id: "bite",
    name: "Bite",
    type: "Dark"
  },
  {
    id: "bitter_blade",
    name: "Bitter Blade",
    type: "Fire"
  },
  {
    id: "bitter_malice",
    name: "Bitter Malice",
    type: "Ghost"
  },
  {
    id: "blast_burn",
    name: "Blast Burn",
    type: "Fire"
  },
  {
    id: "blaze_kick",
    name: "Blaze Kick",
    type: "Fire"
  },
  {
    id: "blazing_torque",
    name: "Blazing Torque",
    type: "Fire"
  },
  {
    id: "bleakwind_storm",
    name: "Bleakwind Storm",
    type: "Flying"
  },
  {
    id: "blizzard",
    name: "Blizzard",
    type: "Ice"
  },
  {
    id: "block",
    name: "Block",
    type: "Normal"
  },
  {
    id: "blood_moon",
    name: "Blood Moon",
    type: "Normal"
  },
  {
    id: "blue_flare",
    name: "Blue Flare",
    type: "Fire"
  },
  {
    id: "body_press",
    name: "Body Press",
    type: "Fighting"
  },
  {
    id: "body_slam",
    name: "Body Slam",
    type: "Normal"
  },
  {
    id: "bolt_beak",
    name: "Bolt Beak",
    type: "Electric"
  },
  {
    id: "bolt_strike",
    name: "Bolt Strike",
    type: "Electric"
  },
  {
    id: "bone_club",
    name: "Bone Club",
    type: "Ground"
  },
  {
    id: "bone_rush",
    name: "Bone Rush",
    type: "Ground"
  },
  {
    id: "bonemerang",
    name: "Bonemerang",
    type: "Ground"
  },
  {
    id: "boomburst",
    name: "Boomburst",
    type: "Normal"
  },
  {
    id: "bounce",
    name: "Bounce",
    type: "Flying"
  },
  {
    id: "bouncy_bubble",
    name: "Bouncy Bubble",
    type: "Water"
  },
  {
    id: "branch_poke",
    name: "Branch Poke",
    type: "Grass"
  },
  {
    id: "brave_bird",
    name: "Brave Bird",
    type: "Flying"
  },
  {
    id: "breaking_swipe",
    name: "Breaking Swipe",
    type: "Dragon"
  },
  {
    id: "brick_break",
    name: "Brick Break",
    type: "Fighting"
  },
  {
    id: "brine",
    name: "Brine",
    type: "Water"
  },
  {
    id: "brutal_swing",
    name: "Brutal Swing",
    type: "Dark"
  },
  {
    id: "bubble",
    name: "Bubble",
    type: "Water"
  },
  {
    id: "bubble_beam",
    name: "Bubble Beam",
    type: "Water"
  },
  {
    id: "bug_bite",
    name: "Bug Bite",
    type: "Bug"
  },
  {
    id: "bug_buzz",
    name: "Bug Buzz",
    type: "Bug"
  },
  {
    id: "bulk_up",
    name: "Bulk Up",
    type: "Fighting"
  },
  {
    id: "bulldoze",
    name: "Bulldoze",
    type: "Ground"
  },
  {
    id: "bullet_punch",
    name: "Bullet Punch",
    type: "Steel"
  },
  {
    id: "bullet_seed",
    name: "Bullet Seed",
    type: "Grass"
  },
  {
    id: "burn_up",
    name: "Burn Up",
    type: "Fire"
  },
  {
    id: "burning_bulwark",
    name: "Burning Bulwark",
    type: "Fire"
  },
  {
    id: "burning_jealousy",
    name: "Burning Jealousy",
    type: "Fire"
  },
  {
    id: "buzzy_buzz",
    name: "Buzzy Buzz",
    type: "Electric"
  },
  {
    id: "calm_mind",
    name: "Calm Mind",
    type: "Psychic"
  },
  {
    id: "camouflage",
    name: "Camouflage",
    type: "Normal"
  },
  {
    id: "captivate",
    name: "Captivate",
    type: "Normal"
  },
  {
    id: "ceaseless_edge",
    name: "Ceaseless Edge",
    type: "Dark"
  },
  {
    id: "celebrate",
    name: "Celebrate",
    type: "Normal"
  },
  {
    id: "charge",
    name: "Charge",
    type: "Electric"
  },
  {
    id: "charge_beam",
    name: "Charge Beam",
    type: "Electric"
  },
  {
    id: "charm",
    name: "Charm",
    type: "Fairy"
  },
  {
    id: "chatter",
    name: "Chatter",
    type: "Flying"
  },
  {
    id: "chilling_water",
    name: "Chilling Water",
    type: "Water"
  },
  {
    id: "chilly_reception",
    name: "Chilly Reception",
    type: "Ice"
  },
  {
    id: "chip_away",
    name: "Chip Away",
    type: "Normal"
  },
  {
    id: "chloroblast",
    name: "Chloroblast",
    type: "Grass"
  },
  {
    id: "circle_throw",
    name: "Circle Throw",
    type: "Fighting"
  },
  {
    id: "clamp",
    name: "Clamp",
    type: "Water"
  },
  {
    id: "clanging_scales",
    name: "Clanging Scales",
    type: "Dragon"
  },
  {
    id: "clangorous_soul",
    name: "Clangorous Soul",
    type: "Dragon"
  },
  {
    id: "clear_smog",
    name: "Clear Smog",
    type: "Poison"
  },
  {
    id: "close_combat",
    name: "Close Combat",
    type: "Fighting"
  },
  {
    id: "coaching",
    name: "Coaching",
    type: "Fighting"
  },
  {
    id: "coil",
    name: "Coil",
    type: "Poison"
  },
  {
    id: "collision_course",
    name: "Collision Course",
    type: "Fighting"
  },
  {
    id: "combat_torque",
    name: "Combat Torque",
    type: "Fighting"
  },
  {
    id: "comet_punch",
    name: "Comet Punch",
    type: "Normal"
  },
  {
    id: "comeuppance",
    name: "Comeuppance",
    type: "Dark"
  },
  {
    id: "confide",
    name: "Confide",
    type: "Normal"
  },
  {
    id: "confuse_ray",
    name: "Confuse Ray",
    type: "Ghost"
  },
  {
    id: "confusion",
    name: "Confusion",
    type: "Psychic"
  },
  {
    id: "constrict",
    name: "Constrict",
    type: "Normal"
  },
  {
    id: "conversion",
    name: "Conversion",
    type: "Normal"
  },
  {
    id: "conversion_2",
    name: "Conversion 2",
    type: "Normal"
  },
  {
    id: "copycat",
    name: "Copycat",
    type: "Normal"
  },
  {
    id: "core_enforcer",
    name: "Core Enforcer",
    type: "Dragon"
  },
  {
    id: "corrosive_gas",
    name: "Corrosive Gas",
    type: "Poison"
  },
  {
    id: "cosmic_power",
    name: "Cosmic Power",
    type: "Psychic"
  },
  {
    id: "cotton_guard",
    name: "Cotton Guard",
    type: "Grass"
  },
  {
    id: "cotton_spore",
    name: "Cotton Spore",
    type: "Grass"
  },
  {
    id: "counter",
    name: "Counter",
    type: "Fighting"
  },
  {
    id: "court_change",
    name: "Court Change",
    type: "Normal"
  },
  {
    id: "covet",
    name: "Covet",
    type: "Normal"
  },
  {
    id: "crabhammer",
    name: "Crabhammer",
    type: "Water"
  },
  {
    id: "crafty_shield",
    name: "Crafty Shield",
    type: "Fairy"
  },
  {
    id: "cross_chop",
    name: "Cross Chop",
    type: "Fighting"
  },
  {
    id: "cross_poison",
    name: "Cross Poison",
    type: "Poison"
  },
  {
    id: "crunch",
    name: "Crunch",
    type: "Dark"
  },
  {
    id: "crush_claw",
    name: "Crush Claw",
    type: "Normal"
  },
  {
    id: "crush_grip",
    name: "Crush Grip",
    type: "Normal"
  },
  {
    id: "curse",
    name: "Curse",
    type: "Ghost"
  },
  {
    id: "cut",
    name: "Cut",
    type: "Normal"
  },
  {
    id: "dark_pulse",
    name: "Dark Pulse",
    type: "Dark"
  },
  {
    id: "dark_void",
    name: "Dark Void",
    type: "Dark"
  },
  {
    id: "darkest_lariat",
    name: "Darkest Lariat",
    type: "Dark"
  },
  {
    id: "dazzling_gleam",
    name: "Dazzling Gleam",
    type: "Fairy"
  },
  {
    id: "decorate",
    name: "Decorate",
    type: "Fairy"
  },
  {
    id: "defend_order",
    name: "Defend Order",
    type: "Bug"
  },
  {
    id: "defense_curl",
    name: "Defense Curl",
    type: "Normal"
  },
  {
    id: "defog",
    name: "Defog",
    type: "Flying"
  },
  {
    id: "destiny_bond",
    name: "Destiny Bond",
    type: "Ghost"
  },
  {
    id: "detect",
    name: "Detect",
    type: "Fighting"
  },
  {
    id: "diamond_storm",
    name: "Diamond Storm",
    type: "Rock"
  },
  {
    id: "dig",
    name: "Dig",
    type: "Ground"
  },
  {
    id: "dire_claw",
    name: "Dire Claw",
    type: "Poison"
  },
  {
    id: "disable",
    name: "Disable",
    type: "Normal"
  },
  {
    id: "disarming_voice",
    name: "Disarming Voice",
    type: "Fairy"
  },
  {
    id: "discharge",
    name: "Discharge",
    type: "Electric"
  },
  {
    id: "dive",
    name: "Dive",
    type: "Water"
  },
  {
    id: "dizzy_punch",
    name: "Dizzy Punch",
    type: "Normal"
  },
  {
    id: "doodle",
    name: "Doodle",
    type: "Normal"
  },
  {
    id: "doom_desire",
    name: "Doom Desire",
    type: "Steel"
  },
  {
    id: "double_hit",
    name: "Double Hit",
    type: "Normal"
  },
  {
    id: "double_iron_bash",
    name: "Double Iron Bash",
    type: "Steel"
  },
  {
    id: "double_kick",
    name: "Double Kick",
    type: "Fighting"
  },
  {
    id: "double_shock",
    name: "Double Shock",
    type: "Electric"
  },
  {
    id: "double_slap",
    name: "Double Slap",
    type: "Normal"
  },
  {
    id: "double_team",
    name: "Double Team",
    type: "Normal"
  },
  {
    id: "double_edge",
    name: "Double-Edge",
    type: "Normal"
  },
  {
    id: "draco_meteor",
    name: "Draco Meteor",
    type: "Dragon"
  },
  {
    id: "dragon_ascent",
    name: "Dragon Ascent",
    type: "Flying"
  },
  {
    id: "dragon_breath",
    name: "Dragon Breath",
    type: "Dragon"
  },
  {
    id: "dragon_cheer",
    name: "Dragon Cheer",
    type: "Dragon"
  },
  {
    id: "dragon_claw",
    name: "Dragon Claw",
    type: "Dragon"
  },
  {
    id: "dragon_dance",
    name: "Dragon Dance",
    type: "Dragon"
  },
  {
    id: "dragon_darts",
    name: "Dragon Darts",
    type: "Dragon"
  },
  {
    id: "dragon_energy",
    name: "Dragon Energy",
    type: "Dragon"
  },
  {
    id: "dragon_hammer",
    name: "Dragon Hammer",
    type: "Dragon"
  },
  {
    id: "dragon_pulse",
    name: "Dragon Pulse",
    type: "Dragon"
  },
  {
    id: "dragon_rage",
    name: "Dragon Rage",
    type: "Dragon"
  },
  {
    id: "dragon_rush",
    name: "Dragon Rush",
    type: "Dragon"
  },
  {
    id: "dragon_tail",
    name: "Dragon Tail",
    type: "Dragon"
  },
  {
    id: "drain_punch",
    name: "Drain Punch",
    type: "Fighting"
  },
  {
    id: "draining_kiss",
    name: "Draining Kiss",
    type: "Fairy"
  },
  {
    id: "dream_eater",
    name: "Dream Eater",
    type: "Psychic"
  },
  {
    id: "drill_peck",
    name: "Drill Peck",
    type: "Flying"
  },
  {
    id: "drill_run",
    name: "Drill Run",
    type: "Ground"
  },
  {
    id: "drum_beating",
    name: "Drum Beating",
    type: "Grass"
  },
  {
    id: "dual_chop",
    name: "Dual Chop",
    type: "Dragon"
  },
  {
    id: "dual_wingbeat",
    name: "Dual Wingbeat",
    type: "Flying"
  },
  {
    id: "dynamax_cannon",
    name: "Dynamax Cannon",
    type: "Dragon"
  },
  {
    id: "dynamic_punch",
    name: "Dynamic Punch",
    type: "Fighting"
  },
  {
    id: "earth_power",
    name: "Earth Power",
    type: "Ground"
  },
  {
    id: "earthquake",
    name: "Earthquake",
    type: "Ground"
  },
  {
    id: "echoed_voice",
    name: "Echoed Voice",
    type: "Normal"
  },
  {
    id: "eerie_impulse",
    name: "Eerie Impulse",
    type: "Electric"
  },
  {
    id: "eerie_spell",
    name: "Eerie Spell",
    type: "Psychic"
  },
  {
    id: "egg_bomb",
    name: "Egg Bomb",
    type: "Normal"
  },
  {
    id: "electric_terrain",
    name: "Electric Terrain",
    type: "Electric"
  },
  {
    id: "electrify",
    name: "Electrify",
    type: "Electric"
  },
  {
    id: "electro_ball",
    name: "Electro Ball",
    type: "Electric"
  },
  {
    id: "electro_drift",
    name: "Electro Drift",
    type: "Electric"
  },
  {
    id: "electro_shot",
    name: "Electro Shot",
    type: "Electric"
  },
  {
    id: "electroweb",
    name: "Electroweb",
    type: "Electric"
  },
  {
    id: "embargo",
    name: "Embargo",
    type: "Dark"
  },
  {
    id: "ember",
    name: "Ember",
    type: "Fire"
  },
  {
    id: "encore",
    name: "Encore",
    type: "Normal"
  },
  {
    id: "endeavor",
    name: "Endeavor",
    type: "Normal"
  },
  {
    id: "endure",
    name: "Endure",
    type: "Normal"
  },
  {
    id: "energy_ball",
    name: "Energy Ball",
    type: "Grass"
  },
  {
    id: "entrainment",
    name: "Entrainment",
    type: "Normal"
  },
  {
    id: "eruption",
    name: "Eruption",
    type: "Fire"
  },
  {
    id: "esper_wing",
    name: "Esper Wing",
    type: "Psychic"
  },
  {
    id: "eternabeam",
    name: "Eternabeam",
    type: "Dragon"
  },
  {
    id: "expanding_force",
    name: "Expanding Force",
    type: "Psychic"
  },
  {
    id: "explosion",
    name: "Explosion",
    type: "Normal"
  },
  {
    id: "extrasensory",
    name: "Extrasensory",
    type: "Psychic"
  },
  {
    id: "extreme_speed",
    name: "Extreme Speed",
    type: "Normal"
  },
  {
    id: "facade",
    name: "Facade",
    type: "Normal"
  },
  {
    id: "fairy_lock",
    name: "Fairy Lock",
    type: "Fairy"
  },
  {
    id: "fairy_wind",
    name: "Fairy Wind",
    type: "Fairy"
  },
  {
    id: "fake_out",
    name: "Fake Out",
    type: "Normal"
  },
  {
    id: "fake_tears",
    name: "Fake Tears",
    type: "Dark"
  },
  {
    id: "false_surrender",
    name: "False Surrender",
    type: "Dark"
  },
  {
    id: "false_swipe",
    name: "False Swipe",
    type: "Normal"
  },
  {
    id: "feather_dance",
    name: "Feather Dance",
    type: "Flying"
  },
  {
    id: "feint",
    name: "Feint",
    type: "Normal"
  },
  {
    id: "feint_attack",
    name: "Feint Attack",
    type: "Dark"
  },
  {
    id: "fell_stinger",
    name: "Fell Stinger",
    type: "Bug"
  },
  {
    id: "fickle_beam",
    name: "Fickle Beam",
    type: "Dragon"
  },
  {
    id: "fiery_dance",
    name: "Fiery Dance",
    type: "Fire"
  },
  {
    id: "fiery_wrath",
    name: "Fiery Wrath",
    type: "Dark"
  },
  {
    id: "fillet_away",
    name: "Fillet Away",
    type: "Normal"
  },
  {
    id: "final_gambit",
    name: "Final Gambit",
    type: "Fighting"
  },
  {
    id: "fire_blast",
    name: "Fire Blast",
    type: "Fire"
  },
  {
    id: "fire_fang",
    name: "Fire Fang",
    type: "Fire"
  },
  {
    id: "fire_lash",
    name: "Fire Lash",
    type: "Fire"
  },
  {
    id: "fire_pledge",
    name: "Fire Pledge",
    type: "Fire"
  },
  {
    id: "fire_punch",
    name: "Fire Punch",
    type: "Fire"
  },
  {
    id: "fire_spin",
    name: "Fire Spin",
    type: "Fire"
  },
  {
    id: "first_impression",
    name: "First Impression",
    type: "Bug"
  },
  {
    id: "fishious_rend",
    name: "Fishious Rend",
    type: "Water"
  },
  {
    id: "fissure",
    name: "Fissure",
    type: "Ground"
  },
  {
    id: "flail",
    name: "Flail",
    type: "Normal"
  },
  {
    id: "flame_burst",
    name: "Flame Burst",
    type: "Fire"
  },
  {
    id: "flame_charge",
    name: "Flame Charge",
    type: "Fire"
  },
  {
    id: "flame_wheel",
    name: "Flame Wheel",
    type: "Fire"
  },
  {
    id: "flamethrower",
    name: "Flamethrower",
    type: "Fire"
  },
  {
    id: "flare_blitz",
    name: "Flare Blitz",
    type: "Fire"
  },
  {
    id: "flash",
    name: "Flash",
    type: "Normal"
  },
  {
    id: "flash_cannon",
    name: "Flash Cannon",
    type: "Steel"
  },
  {
    id: "flatter",
    name: "Flatter",
    type: "Dark"
  },
  {
    id: "fleur_cannon",
    name: "Fleur Cannon",
    type: "Fairy"
  },
  {
    id: "fling",
    name: "Fling",
    type: "Dark"
  },
  {
    id: "flip_turn",
    name: "Flip Turn",
    type: "Water"
  },
  {
    id: "floaty_fall",
    name: "Floaty Fall",
    type: "Flying"
  },
  {
    id: "floral_healing",
    name: "Floral Healing",
    type: "Fairy"
  },
  {
    id: "flower_shield",
    name: "Flower Shield",
    type: "Fairy"
  },
  {
    id: "flower_trick",
    name: "Flower Trick",
    type: "Grass"
  },
  {
    id: "fly",
    name: "Fly",
    type: "Flying"
  },
  {
    id: "flying_press",
    name: "Flying Press",
    type: "Fighting"
  },
  {
    id: "focus_blast",
    name: "Focus Blast",
    type: "Fighting"
  },
  {
    id: "focus_energy",
    name: "Focus Energy",
    type: "Normal"
  },
  {
    id: "focus_punch",
    name: "Focus Punch",
    type: "Fighting"
  },
  {
    id: "follow_me",
    name: "Follow Me",
    type: "Normal"
  },
  {
    id: "force_palm",
    name: "Force Palm",
    type: "Fighting"
  },
  {
    id: "foresight",
    name: "Foresight",
    type: "Normal"
  },
  {
    id: "forests_curse",
    name: "Forest's Curse",
    type: "Grass"
  },
  {
    id: "foul_play",
    name: "Foul Play",
    type: "Dark"
  },
  {
    id: "freeze_shock",
    name: "Freeze Shock",
    type: "Ice"
  },
  {
    id: "freeze_dry",
    name: "Freeze-Dry",
    type: "Ice"
  },
  {
    id: "freezing_glare",
    name: "Freezing Glare",
    type: "Psychic"
  },
  {
    id: "freezy_frost",
    name: "Freezy Frost",
    type: "Ice"
  },
  {
    id: "frenzy_plant",
    name: "Frenzy Plant",
    type: "Grass"
  },
  {
    id: "frost_breath",
    name: "Frost Breath",
    type: "Ice"
  },
  {
    id: "frustration",
    name: "Frustration",
    type: "Normal"
  },
  {
    id: "fury_attack",
    name: "Fury Attack",
    type: "Normal"
  },
  {
    id: "fury_cutter",
    name: "Fury Cutter",
    type: "Bug"
  },
  {
    id: "fury_swipes",
    name: "Fury Swipes",
    type: "Normal"
  },
  {
    id: "fusion_bolt",
    name: "Fusion Bolt",
    type: "Electric"
  },
  {
    id: "fusion_flare",
    name: "Fusion Flare",
    type: "Fire"
  },
  {
    id: "future_sight",
    name: "Future Sight",
    type: "Psychic"
  },
  {
    id: "gastro_acid",
    name: "Gastro Acid",
    type: "Poison"
  },
  {
    id: "gear_grind",
    name: "Gear Grind",
    type: "Steel"
  },
  {
    id: "gear_up",
    name: "Gear Up",
    type: "Steel"
  },
  {
    id: "geomancy",
    name: "Geomancy",
    type: "Fairy"
  },
  {
    id: "giga_drain",
    name: "Giga Drain",
    type: "Grass"
  },
  {
    id: "giga_impact",
    name: "Giga Impact",
    type: "Normal"
  },
  {
    id: "gigaton_hammer",
    name: "Gigaton Hammer",
    type: "Steel"
  },
  {
    id: "glacial_lance",
    name: "Glacial Lance",
    type: "Ice"
  },
  {
    id: "glaciate",
    name: "Glaciate",
    type: "Ice"
  },
  {
    id: "glaive_rush",
    name: "Glaive Rush",
    type: "Dragon"
  },
  {
    id: "glare",
    name: "Glare",
    type: "Normal"
  },
  {
    id: "glitzy_glow",
    name: "Glitzy Glow",
    type: "Psychic"
  },
  {
    id: "grass_knot",
    name: "Grass Knot",
    type: "Grass"
  },
  {
    id: "grass_pledge",
    name: "Grass Pledge",
    type: "Grass"
  },
  {
    id: "grass_whistle",
    name: "Grass Whistle",
    type: "Grass"
  },
  {
    id: "grassy_glide",
    name: "Grassy Glide",
    type: "Grass"
  },
  {
    id: "grassy_terrain",
    name: "Grassy Terrain",
    type: "Grass"
  },
  {
    id: "grav_apple",
    name: "Grav Apple",
    type: "Grass"
  },
  {
    id: "gravity",
    name: "Gravity",
    type: "Psychic"
  },
  {
    id: "growl",
    name: "Growl",
    type: "Normal"
  },
  {
    id: "growth",
    name: "Growth",
    type: "Grass"
  },
  {
    id: "grudge",
    name: "Grudge",
    type: "Ghost"
  },
  {
    id: "guard_split",
    name: "Guard Split",
    type: "Psychic"
  },
  {
    id: "guard_swap",
    name: "Guard Swap",
    type: "Psychic"
  },
  {
    id: "guillotine",
    name: "Guillotine",
    type: "Normal"
  },
  {
    id: "gunk_shot",
    name: "Gunk Shot",
    type: "Poison"
  },
  {
    id: "gust",
    name: "Gust",
    type: "Flying"
  },
  {
    id: "gyro_ball",
    name: "Gyro Ball",
    type: "Steel"
  },
  {
    id: "hail",
    name: "Hail",
    type: "Ice"
  },
  {
    id: "hammer_arm",
    name: "Hammer Arm",
    type: "Fighting"
  },
  {
    id: "happy_hour",
    name: "Happy Hour",
    type: "Normal"
  },
  {
    id: "hard_press",
    name: "Hard Press",
    type: "Steel"
  },
  {
    id: "harden",
    name: "Harden",
    type: "Normal"
  },
  {
    id: "haze",
    name: "Haze",
    type: "Ice"
  },
  {
    id: "head_charge",
    name: "Head Charge",
    type: "Normal"
  },
  {
    id: "head_smash",
    name: "Head Smash",
    type: "Rock"
  },
  {
    id: "headbutt",
    name: "Headbutt",
    type: "Normal"
  },
  {
    id: "headlong_rush",
    name: "Headlong Rush",
    type: "Ground"
  },
  {
    id: "heal_bell",
    name: "Heal Bell",
    type: "Normal"
  },
  {
    id: "heal_block",
    name: "Heal Block",
    type: "Psychic"
  },
  {
    id: "heal_order",
    name: "Heal Order",
    type: "Bug"
  },
  {
    id: "heal_pulse",
    name: "Heal Pulse",
    type: "Psychic"
  },
  {
    id: "healing_wish",
    name: "Healing Wish",
    type: "Psychic"
  },
  {
    id: "heart_stamp",
    name: "Heart Stamp",
    type: "Psychic"
  },
  {
    id: "heart_swap",
    name: "Heart Swap",
    type: "Psychic"
  },
  {
    id: "heat_crash",
    name: "Heat Crash",
    type: "Fire"
  },
  {
    id: "heat_wave",
    name: "Heat Wave",
    type: "Fire"
  },
  {
    id: "heavy_slam",
    name: "Heavy Slam",
    type: "Steel"
  },
  {
    id: "helping_hand",
    name: "Helping Hand",
    type: "Normal"
  },
  {
    id: "hex",
    name: "Hex",
    type: "Ghost"
  },
  {
    id: "hidden_power",
    name: "Hidden Power",
    type: "Normal"
  },
  {
    id: "high_horsepower",
    name: "High Horsepower",
    type: "Ground"
  },
  {
    id: "high_jump_kick",
    name: "High Jump Kick",
    type: "Fighting"
  },
  {
    id: "hold_back",
    name: "Hold Back",
    type: "Normal"
  },
  {
    id: "hold_hands",
    name: "Hold Hands",
    type: "Normal"
  },
  {
    id: "hone_claws",
    name: "Hone Claws",
    type: "Dark"
  },
  {
    id: "horn_attack",
    name: "Horn Attack",
    type: "Normal"
  },
  {
    id: "horn_drill",
    name: "Horn Drill",
    type: "Normal"
  },
  {
    id: "horn_leech",
    name: "Horn Leech",
    type: "Grass"
  },
  {
    id: "howl",
    name: "Howl",
    type: "Normal"
  },
  {
    id: "hurricane",
    name: "Hurricane",
    type: "Flying"
  },
  {
    id: "hydro_cannon",
    name: "Hydro Cannon",
    type: "Water"
  },
  {
    id: "hydro_pump",
    name: "Hydro Pump",
    type: "Water"
  },
  {
    id: "hydro_steam",
    name: "Hydro Steam",
    type: "Water"
  },
  {
    id: "hyper_beam",
    name: "Hyper Beam",
    type: "Normal"
  },
  {
    id: "hyper_drill",
    name: "Hyper Drill",
    type: "Normal"
  },
  {
    id: "hyper_fang",
    name: "Hyper Fang",
    type: "Normal"
  },
  {
    id: "hyper_voice",
    name: "Hyper Voice",
    type: "Normal"
  },
  {
    id: "hyperspace_fury",
    name: "Hyperspace Fury",
    type: "Dark"
  },
  {
    id: "hyperspace_hole",
    name: "Hyperspace Hole",
    type: "Psychic"
  },
  {
    id: "hypnosis",
    name: "Hypnosis",
    type: "Psychic"
  },
  {
    id: "ice_ball",
    name: "Ice Ball",
    type: "Ice"
  },
  {
    id: "ice_beam",
    name: "Ice Beam",
    type: "Ice"
  },
  {
    id: "ice_burn",
    name: "Ice Burn",
    type: "Ice"
  },
  {
    id: "ice_fang",
    name: "Ice Fang",
    type: "Ice"
  },
  {
    id: "ice_hammer",
    name: "Ice Hammer",
    type: "Ice"
  },
  {
    id: "ice_punch",
    name: "Ice Punch",
    type: "Ice"
  },
  {
    id: "ice_shard",
    name: "Ice Shard",
    type: "Ice"
  },
  {
    id: "ice_spinner",
    name: "Ice Spinner",
    type: "Ice"
  },
  {
    id: "icicle_crash",
    name: "Icicle Crash",
    type: "Ice"
  },
  {
    id: "icicle_spear",
    name: "Icicle Spear",
    type: "Ice"
  },
  {
    id: "icy_wind",
    name: "Icy Wind",
    type: "Ice"
  },
  {
    id: "imprison",
    name: "Imprison",
    type: "Psychic"
  },
  {
    id: "incinerate",
    name: "Incinerate",
    type: "Fire"
  },
  {
    id: "infernal_parade",
    name: "Infernal Parade",
    type: "Ghost"
  },
  {
    id: "inferno",
    name: "Inferno",
    type: "Fire"
  },
  {
    id: "infestation",
    name: "Infestation",
    type: "Bug"
  },
  {
    id: "ingrain",
    name: "Ingrain",
    type: "Grass"
  },
  {
    id: "instruct",
    name: "Instruct",
    type: "Psychic"
  },
  {
    id: "ion_deluge",
    name: "Ion Deluge",
    type: "Electric"
  },
  {
    id: "iron_defense",
    name: "Iron Defense",
    type: "Steel"
  },
  {
    id: "iron_head",
    name: "Iron Head",
    type: "Steel"
  },
  {
    id: "iron_tail",
    name: "Iron Tail",
    type: "Steel"
  },
  {
    id: "ivy_cudgel_teal",
    name: "Ivy Cudgel",
    type: "Grass"
  },
  {
    id: "ivy_cudgel_wellspring",
    name: "Ivy Cudgel",
    type: "Water"
  },
  {
    id: "ivy_cudgel_hearthflame",
    name: "Ivy Cudgel",
    type: "Fire"
  },
  {
    id: "ivy_cudgel_cornerstone",
    name: "Ivy Cudgel",
    type: "Rock"
  },
  {
    id: "jaw_lock",
    name: "Jaw Lock",
    type: "Dark"
  },
  {
    id: "jet_punch",
    name: "Jet Punch",
    type: "Water"
  },
  {
    id: "judgment",
    name: "Judgment",
    type: "Normal"
  },
  {
    id: "judgment_fighting",
    name: "Judgment",
    type: "Fighting"
  },
  {
    id: "judgment_flying",
    name: "Judgment",
    type: "Flying"
  },
  {
    id: "judgment_poison",
    name: "Judgment",
    type: "Poison"
  },
  {
    id: "judgment_ground",
    name: "Judgment",
    type: "Ground"
  },
  {
    id: "judgment_rock",
    name: "Judgment",
    type: "Rock"
  },
  {
    id: "judgment_bug",
    name: "Judgment",
    type: "Bug"
  },
  {
    id: "judgment_ghost",
    name: "Judgment",
    type: "Ghost"
  },
  {
    id: "judgment_steel",
    name: "Judgment",
    type: "Steel"
  },
  {
    id: "judgment_fire",
    name: "Judgment",
    type: "Fire"
  },
  {
    id: "judgment_water",
    name: "Judgment",
    type: "Water"
  },
  {
    id: "judgment_grass",
    name: "Judgment",
    type: "Grass"
  },
  {
    id: "judgment_electric",
    name: "Judgment",
    type: "Electric"
  },
  {
    id: "judgment_psychic",
    name: "Judgment",
    type: "Psychic"
  },
  {
    id: "judgment_ice",
    name: "Judgment",
    type: "Ice"
  },
  {
    id: "judgment_dragon",
    name: "Judgment",
    type: "Dragon"
  },
  {
    id: "judgment_dark",
    name: "Judgment",
    type: "Dark"
  },
  {
    id: "judgment_fairy",
    name: "Judgment",
    type: "Fairy"
  },
  {
    id: "jump_kick",
    name: "Jump Kick",
    type: "Fighting"
  },
  {
    id: "jungle_healing",
    name: "Jungle Healing",
    type: "Grass"
  },
  {
    id: "karate_chop",
    name: "Karate Chop",
    type: "Fighting"
  },
  {
    id: "kinesis",
    name: "Kinesis",
    type: "Psychic"
  },
  {
    id: "kings_shield",
    name: "King's Shield",
    type: "Steel"
  },
  {
    id: "knock_off",
    name: "Knock Off",
    type: "Dark"
  },
  {
    id: "kowtow_cleave",
    name: "Kowtow Cleave",
    type: "Dark"
  },
  {
    id: "lands_wrath",
    name: "Land's Wrath",
    type: "Ground"
  },
  {
    id: "laser_focus",
    name: "Laser Focus",
    type: "Normal"
  },
  {
    id: "lash_out",
    name: "Lash Out",
    type: "Dark"
  },
  {
    id: "last_resort",
    name: "Last Resort",
    type: "Normal"
  },
  {
    id: "last_respects",
    name: "Last Respects",
    type: "Ghost"
  },
  {
    id: "lava_plume",
    name: "Lava Plume",
    type: "Fire"
  },
  {
    id: "leaf_blade",
    name: "Leaf Blade",
    type: "Grass"
  },
  {
    id: "leaf_storm",
    name: "Leaf Storm",
    type: "Grass"
  },
  {
    id: "leaf_tornado",
    name: "Leaf Tornado",
    type: "Grass"
  },
  {
    id: "leafage",
    name: "Leafage",
    type: "Grass"
  },
  {
    id: "leech_life",
    name: "Leech Life",
    type: "Bug"
  },
  {
    id: "leech_seed",
    name: "Leech Seed",
    type: "Grass"
  },
  {
    id: "leer",
    name: "Leer",
    type: "Normal"
  },
  {
    id: "lick",
    name: "Lick",
    type: "Ghost"
  },
  {
    id: "life_dew",
    name: "Life Dew",
    type: "Water"
  },
  {
    id: "light_of_ruin",
    name: "Light of Ruin",
    type: "Fairy"
  },
  {
    id: "light_screen",
    name: "Light Screen",
    type: "Psychic"
  },
  {
    id: "liquidation",
    name: "Liquidation",
    type: "Water"
  },
  {
    id: "lock_on",
    name: "Lock-On",
    type: "Normal"
  },
  {
    id: "lovely_kiss",
    name: "Lovely Kiss",
    type: "Normal"
  },
  {
    id: "low_kick",
    name: "Low Kick",
    type: "Fighting"
  },
  {
    id: "low_sweep",
    name: "Low Sweep",
    type: "Fighting"
  },
  {
    id: "lucky_chant",
    name: "Lucky Chant",
    type: "Normal"
  },
  {
    id: "lumina_crash",
    name: "Lumina Crash",
    type: "Psychic"
  },
  {
    id: "lunar_blessing",
    name: "Lunar Blessing",
    type: "Psychic"
  },
  {
    id: "lunar_dance",
    name: "Lunar Dance",
    type: "Psychic"
  },
  {
    id: "lunge",
    name: "Lunge",
    type: "Bug"
  },
  {
    id: "luster_purge",
    name: "Luster Purge",
    type: "Psychic"
  },
  {
    id: "mach_punch",
    name: "Mach Punch",
    type: "Fighting"
  },
  {
    id: "magic_coat",
    name: "Magic Coat",
    type: "Psychic"
  },
  {
    id: "magic_powder",
    name: "Magic Powder",
    type: "Psychic"
  },
  {
    id: "magic_room",
    name: "Magic Room",
    type: "Psychic"
  },
  {
    id: "magical_leaf",
    name: "Magical Leaf",
    type: "Grass"
  },
  {
    id: "magical_torque",
    name: "Magical Torque",
    type: "Fairy"
  },
  {
    id: "magma_storm",
    name: "Magma Storm",
    type: "Fire"
  },
  {
    id: "magnet_bomb",
    name: "Magnet Bomb",
    type: "Steel"
  },
  {
    id: "magnet_rise",
    name: "Magnet Rise",
    type: "Electric"
  },
  {
    id: "magnetic_flux",
    name: "Magnetic Flux",
    type: "Electric"
  },
  {
    id: "magnitude",
    name: "Magnitude",
    type: "Ground"
  },
  {
    id: "make_it_rain",
    name: "Make It Rain",
    type: "Steel"
  },
  {
    id: "malignant_chain",
    name: "Malignant Chain",
    type: "Poison"
  },
  {
    id: "mat_block",
    name: "Mat Block",
    type: "Fighting"
  },
  {
    id: "matcha_gotcha",
    name: "Matcha Gotcha",
    type: "Grass"
  },
  {
    id: "me_first",
    name: "Me First",
    type: "Normal"
  },
  {
    id: "mean_look",
    name: "Mean Look",
    type: "Normal"
  },
  {
    id: "meditate",
    name: "Meditate",
    type: "Psychic"
  },
  {
    id: "mega_drain",
    name: "Mega Drain",
    type: "Grass"
  },
  {
    id: "mega_kick",
    name: "Mega Kick",
    type: "Normal"
  },
  {
    id: "mega_punch",
    name: "Mega Punch",
    type: "Normal"
  },
  {
    id: "megahorn",
    name: "Megahorn",
    type: "Bug"
  },
  {
    id: "memento",
    name: "Memento",
    type: "Dark"
  },
  {
    id: "metal_burst",
    name: "Metal Burst",
    type: "Steel"
  },
  {
    id: "metal_claw",
    name: "Metal Claw",
    type: "Steel"
  },
  {
    id: "metal_sound",
    name: "Metal Sound",
    type: "Steel"
  },
  {
    id: "meteor_assault",
    name: "Meteor Assault",
    type: "Fighting"
  },
  {
    id: "meteor_beam",
    name: "Meteor Beam",
    type: "Rock"
  },
  {
    id: "meteor_mash",
    name: "Meteor Mash",
    type: "Steel"
  },
  {
    id: "metronome",
    name: "Metronome",
    type: "Normal"
  },
  {
    id: "mighty_cleave",
    name: "Mighty Cleave",
    type: "Rock"
  },
  {
    id: "milk_drink",
    name: "Milk Drink",
    type: "Normal"
  },
  {
    id: "mimic",
    name: "Mimic",
    type: "Normal"
  },
  {
    id: "mind_blown",
    name: "Mind Blown",
    type: "Fire"
  },
  {
    id: "mind_reader",
    name: "Mind Reader",
    type: "Normal"
  },
  {
    id: "minimize",
    name: "Minimize",
    type: "Normal"
  },
  {
    id: "miracle_eye",
    name: "Miracle Eye",
    type: "Psychic"
  },
  {
    id: "mirror_coat",
    name: "Mirror Coat",
    type: "Psychic"
  },
  {
    id: "mirror_move",
    name: "Mirror Move",
    type: "Flying"
  },
  {
    id: "mirror_shot",
    name: "Mirror Shot",
    type: "Steel"
  },
  {
    id: "mist",
    name: "Mist",
    type: "Ice"
  },
  {
    id: "mist_ball",
    name: "Mist Ball",
    type: "Psychic"
  },
  {
    id: "misty_explosion",
    name: "Misty Explosion",
    type: "Fairy"
  },
  {
    id: "misty_terrain",
    name: "Misty Terrain",
    type: "Fairy"
  },
  {
    id: "moonblast",
    name: "Moonblast",
    type: "Fairy"
  },
  {
    id: "moongeist_beam",
    name: "Moongeist Beam",
    type: "Ghost"
  },
  {
    id: "moonlight",
    name: "Moonlight",
    type: "Fairy"
  },
  {
    id: "morning_sun",
    name: "Morning Sun",
    type: "Normal"
  },
  {
    id: "mortal_spin",
    name: "Mortal Spin",
    type: "Poison"
  },
  {
    id: "mountain_gale",
    name: "Mountain Gale",
    type: "Ice"
  },
  {
    id: "mud_bomb",
    name: "Mud Bomb",
    type: "Ground"
  },
  {
    id: "mud_shot",
    name: "Mud Shot",
    type: "Ground"
  },
  {
    id: "mud_sport",
    name: "Mud Sport",
    type: "Ground"
  },
  {
    id: "mud_slap",
    name: "Mud-Slap",
    type: "Ground"
  },
  {
    id: "muddy_water",
    name: "Muddy Water",
    type: "Water"
  },
  {
    id: "multi_attack",
    name: "Multi-Attack",
    type: "Normal"
  },
  {
    id: "multi_attack_fighting",
    name: "Multi-Attack",
    type: "Fighting"
  },
  {
    id: "multi_attack_flying",
    name: "Multi-Attack",
    type: "Flying"
  },
  {
    id: "multi_attack_poison",
    name: "Multi-Attack",
    type: "Poison"
  },
  {
    id: "multi_attack_ground",
    name: "Multi-Attack",
    type: "Ground"
  },
  {
    id: "multi_attack_rock",
    name: "Multi-Attack",
    type: "Rock"
  },
  {
    id: "multi_attack_bug",
    name: "Multi-Attack",
    type: "Bug"
  },
  {
    id: "multi_attack_ghost",
    name: "Multi-Attack",
    type: "Ghost"
  },
  {
    id: "multi_attack_steel",
    name: "Multi-Attack",
    type: "Steel"
  },
  {
    id: "multi_attack_fire",
    name: "Multi-Attack",
    type: "Fire"
  },
  {
    id: "multi_attack_water",
    name: "Multi-Attack",
    type: "Water"
  },
  {
    id: "multi_attack_grass",
    name: "Multi-Attack",
    type: "Grass"
  },
  {
    id: "multi_attack_electric",
    name: "Multi-Attack",
    type: "Electric"
  },
  {
    id: "multi_attack_psychic",
    name: "Multi-Attack",
    type: "Psychic"
  },
  {
    id: "multi_attack_ice",
    name: "Multi-Attack",
    type: "Ice"
  },
  {
    id: "multi_attack_dragon",
    name: "Multi-Attack",
    type: "Dragon"
  },
  {
    id: "multi_attack_dark",
    name: "Multi-Attack",
    type: "Dark"
  },
  {
    id: "multi_attack_fairy",
    name: "Multi-Attack",
    type: "Fairy"
  },
  {
    id: "mystical_fire",
    name: "Mystical Fire",
    type: "Fire"
  },
  {
    id: "mystical_power",
    name: "Mystical Power",
    type: "Psychic"
  },
  {
    id: "nasty_plot",
    name: "Nasty Plot",
    type: "Dark"
  },
  {
    id: "natural_gift",
    name: "Natural Gift",
    type: "Normal"
  },
  {
    id: "natural_gift_fighting",
    name: "Natural Gift",
    type: "Fighting"
  },
  {
    id: "natural_gift_flying",
    name: "Natural Gift",
    type: "Flying"
  },
  {
    id: "natural_gift_poison",
    name: "Natural Gift",
    type: "Poison"
  },
  {
    id: "natural_gift_ground",
    name: "Natural Gift",
    type: "Ground"
  },
  {
    id: "natural_gift_rock",
    name: "Natural Gift",
    type: "Rock"
  },
  {
    id: "natural_gift_bug",
    name: "Natural Gift",
    type: "Bug"
  },
  {
    id: "natural_gift_ghost",
    name: "Natural Gift",
    type: "Ghost"
  },
  {
    id: "natural_gift_steel",
    name: "Natural Gift",
    type: "Steel"
  },
  {
    id: "natural_gift_fire",
    name: "Natural Gift",
    type: "Fire"
  },
  {
    id: "natural_gift_water",
    name: "Natural Gift",
    type: "Water"
  },
  {
    id: "natural_gift_grass",
    name: "Natural Gift",
    type: "Grass"
  },
  {
    id: "natural_gift_electric",
    name: "Natural Gift",
    type: "Electric"
  },
  {
    id: "natural_gift_psychic",
    name: "Natural Gift",
    type: "Psychic"
  },
  {
    id: "natural_gift_ice",
    name: "Natural Gift",
    type: "Ice"
  },
  {
    id: "natural_gift_dragon",
    name: "Natural Gift",
    type: "Dragon"
  },
  {
    id: "natural_gift_dark",
    name: "Natural Gift",
    type: "Dark"
  },
  {
    id: "natural_gift_fairy",
    name: "Natural Gift",
    type: "Fairy"
  },
  {
    id: "nature_power",
    name: "Nature Power",
    type: "Normal"
  },
  {
    id: "natures_madness",
    name: "Nature's Madness",
    type: "Fairy"
  },
  {
    id: "needle_arm",
    name: "Needle Arm",
    type: "Grass"
  },
  {
    id: "night_daze",
    name: "Night Daze",
    type: "Dark"
  },
  {
    id: "night_shade",
    name: "Night Shade",
    type: "Ghost"
  },
  {
    id: "night_slash",
    name: "Night Slash",
    type: "Dark"
  },
  {
    id: "nightmare",
    name: "Nightmare",
    type: "Ghost"
  },
  {
    id: "nihil_light",
    name: "Nihil Light",
    type: "Dragon"
  },
  {
    id: "no_retreat",
    name: "No Retreat",
    type: "Fighting"
  },
  {
    id: "noble_roar",
    name: "Noble Roar",
    type: "Normal"
  },
  {
    id: "noxious_torque",
    name: "Noxious Torque",
    type: "Poison"
  },
  {
    id: "nuzzle",
    name: "Nuzzle",
    type: "Electric"
  },
  {
    id: "oblivion_wing",
    name: "Oblivion Wing",
    type: "Flying"
  },
  {
    id: "obstruct",
    name: "Obstruct",
    type: "Dark"
  },
  {
    id: "octazooka",
    name: "Octazooka",
    type: "Water"
  },
  {
    id: "octolock",
    name: "Octolock",
    type: "Fighting"
  },
  {
    id: "odor_sleuth",
    name: "Odor Sleuth",
    type: "Normal"
  },
  {
    id: "ominous_wind",
    name: "Ominous Wind",
    type: "Ghost"
  },
  {
    id: "order_up",
    name: "Order Up",
    type: "Dragon"
  },
  {
    id: "origin_pulse",
    name: "Origin Pulse",
    type: "Water"
  },
  {
    id: "outrage",
    name: "Outrage",
    type: "Dragon"
  },
  {
    id: "overdrive",
    name: "Overdrive",
    type: "Electric"
  },
  {
    id: "overheat",
    name: "Overheat",
    type: "Fire"
  },
  {
    id: "pain_split",
    name: "Pain Split",
    type: "Normal"
  },
  {
    id: "parabolic_charge",
    name: "Parabolic Charge",
    type: "Electric"
  },
  {
    id: "parting_shot",
    name: "Parting Shot",
    type: "Dark"
  },
  {
    id: "pay_day",
    name: "Pay Day",
    type: "Normal"
  },
  {
    id: "payback",
    name: "Payback",
    type: "Dark"
  },
  {
    id: "peck",
    name: "Peck",
    type: "Flying"
  },
  {
    id: "perish_song",
    name: "Perish Song",
    type: "Normal"
  },
  {
    id: "petal_blizzard",
    name: "Petal Blizzard",
    type: "Grass"
  },
  {
    id: "petal_dance",
    name: "Petal Dance",
    type: "Grass"
  },
  {
    id: "phantom_force",
    name: "Phantom Force",
    type: "Ghost"
  },
  {
    id: "photon_geyser",
    name: "Photon Geyser",
    type: "Psychic"
  },
  {
    id: "pika_papow",
    name: "Pika Papow",
    type: "Electric"
  },
  {
    id: "pin_missile",
    name: "Pin Missile",
    type: "Bug"
  },
  {
    id: "plasma_fists",
    name: "Plasma Fists",
    type: "Electric"
  },
  {
    id: "play_nice",
    name: "Play Nice",
    type: "Normal"
  },
  {
    id: "play_rough",
    name: "Play Rough",
    type: "Fairy"
  },
  {
    id: "pluck",
    name: "Pluck",
    type: "Flying"
  },
  {
    id: "poison_fang",
    name: "Poison Fang",
    type: "Poison"
  },
  {
    id: "poison_gas",
    name: "Poison Gas",
    type: "Poison"
  },
  {
    id: "poison_jab",
    name: "Poison Jab",
    type: "Poison"
  },
  {
    id: "poison_powder",
    name: "Poison Powder",
    type: "Poison"
  },
  {
    id: "poison_sting",
    name: "Poison Sting",
    type: "Poison"
  },
  {
    id: "poison_tail",
    name: "Poison Tail",
    type: "Poison"
  },
  {
    id: "pollen_puff",
    name: "Pollen Puff",
    type: "Bug"
  },
  {
    id: "poltergeist",
    name: "Poltergeist",
    type: "Ghost"
  },
  {
    id: "population_bomb",
    name: "Population Bomb",
    type: "Normal"
  },
  {
    id: "pounce",
    name: "Pounce",
    type: "Bug"
  },
  {
    id: "pound",
    name: "Pound",
    type: "Normal"
  },
  {
    id: "powder",
    name: "Powder",
    type: "Bug"
  },
  {
    id: "powder_snow",
    name: "Powder Snow",
    type: "Ice"
  },
  {
    id: "power_gem",
    name: "Power Gem",
    type: "Rock"
  },
  {
    id: "power_shift",
    name: "Power Shift",
    type: "Normal"
  },
  {
    id: "power_split",
    name: "Power Split",
    type: "Psychic"
  },
  {
    id: "power_swap",
    name: "Power Swap",
    type: "Psychic"
  },
  {
    id: "power_trick",
    name: "Power Trick",
    type: "Psychic"
  },
  {
    id: "power_trip",
    name: "Power Trip",
    type: "Dark"
  },
  {
    id: "power_whip",
    name: "Power Whip",
    type: "Grass"
  },
  {
    id: "power_up_punch",
    name: "Power-Up Punch",
    type: "Fighting"
  },
  {
    id: "precipice_blades",
    name: "Precipice Blades",
    type: "Ground"
  },
  {
    id: "present",
    name: "Present",
    type: "Normal"
  },
  {
    id: "prismatic_laser",
    name: "Prismatic Laser",
    type: "Psychic"
  },
  {
    id: "protect",
    name: "Protect",
    type: "Normal"
  },
  {
    id: "psybeam",
    name: "Psybeam",
    type: "Psychic"
  },
  {
    id: "psyblade",
    name: "Psyblade",
    type: "Psychic"
  },
  {
    id: "psych_up",
    name: "Psych Up",
    type: "Normal"
  },
  {
    id: "psychic",
    name: "Psychic",
    type: "Psychic"
  },
  {
    id: "psychic_fangs",
    name: "Psychic Fangs",
    type: "Psychic"
  },
  {
    id: "psychic_noise",
    name: "Psychic Noise",
    type: "Psychic"
  },
  {
    id: "psychic_terrain",
    name: "Psychic Terrain",
    type: "Psychic"
  },
  {
    id: "psycho_boost",
    name: "Psycho Boost",
    type: "Psychic"
  },
  {
    id: "psycho_cut",
    name: "Psycho Cut",
    type: "Psychic"
  },
  {
    id: "psycho_shift",
    name: "Psycho Shift",
    type: "Psychic"
  },
  {
    id: "psyshield_bash",
    name: "Psyshield Bash",
    type: "Psychic"
  },
  {
    id: "psyshock",
    name: "Psyshock",
    type: "Psychic"
  },
  {
    id: "psystrike",
    name: "Psystrike",
    type: "Psychic"
  },
  {
    id: "psywave",
    name: "Psywave",
    type: "Psychic"
  },
  {
    id: "punishment",
    name: "Punishment",
    type: "Dark"
  },
  {
    id: "purify",
    name: "Purify",
    type: "Poison"
  },
  {
    id: "pursuit",
    name: "Pursuit",
    type: "Dark"
  },
  {
    id: "pyro_ball",
    name: "Pyro Ball",
    type: "Fire"
  },
  {
    id: "quash",
    name: "Quash",
    type: "Dark"
  },
  {
    id: "quick_attack",
    name: "Quick Attack",
    type: "Normal"
  },
  {
    id: "quick_guard",
    name: "Quick Guard",
    type: "Fighting"
  },
  {
    id: "quiver_dance",
    name: "Quiver Dance",
    type: "Bug"
  },
  {
    id: "rage",
    name: "Rage",
    type: "Normal"
  },
  {
    id: "rage_fist",
    name: "Rage Fist",
    type: "Ghost"
  },
  {
    id: "rage_powder",
    name: "Rage Powder",
    type: "Bug"
  },
  {
    id: "raging_bull",
    name: "Raging Bull",
    type: "Normal"
  },
  {
    id: "raging_bull_combat",
    name: "Raging Bull",
    type: "Fighting"
  },
  {
    id: "raging_bull_blaze",
    name: "Raging Bull",
    type: "Fire"
  },
  {
    id: "raging_bull_aqua",
    name: "Raging Bull",
    type: "Water"
  },
  {
    id: "raging_fury",
    name: "Raging Fury",
    type: "Fire"
  },
  {
    id: "rain_dance",
    name: "Rain Dance",
    type: "Water"
  },
  {
    id: "rapid_spin",
    name: "Rapid Spin",
    type: "Normal"
  },
  {
    id: "razor_leaf",
    name: "Razor Leaf",
    type: "Grass"
  },
  {
    id: "razor_shell",
    name: "Razor Shell",
    type: "Water"
  },
  {
    id: "razor_wind",
    name: "Razor Wind",
    type: "Normal"
  },
  {
    id: "recover",
    name: "Recover",
    type: "Normal"
  },
  {
    id: "recycle",
    name: "Recycle",
    type: "Normal"
  },
  {
    id: "reflect",
    name: "Reflect",
    type: "Psychic"
  },
  {
    id: "reflect_type",
    name: "Reflect Type",
    type: "Normal"
  },
  {
    id: "refresh",
    name: "Refresh",
    type: "Normal"
  },
  {
    id: "relic_song",
    name: "Relic Song",
    type: "Normal"
  },
  {
    id: "rest",
    name: "Rest",
    type: "Psychic"
  },
  {
    id: "retaliate",
    name: "Retaliate",
    type: "Normal"
  },
  {
    id: "return",
    name: "Return",
    type: "Normal"
  },
  {
    id: "revelation_dance",
    name: "Revelation Dance",
    type: "Normal"
  },
  {
    id: "revelation_dance_baile",
    name: "Revelation Dance",
    type: "Fire"
  },
  {
    id: "revelation_dance_pompom",
    name: "Revelation Dance",
    type: "Electric"
  },
  {
    id: "revelation_dance_pau",
    name: "Revelation Dance",
    type: "Psychic"
  },
  {
    id: "revelation_dance_sensu",
    name: "Revelation Dance",
    type: "Ghost"
  },
  {
    id: "revenge",
    name: "Revenge",
    type: "Fighting"
  },
  {
    id: "reversal",
    name: "Reversal",
    type: "Fighting"
  },
  {
    id: "revival_blessing",
    name: "Revival Blessing",
    type: "Normal"
  },
  {
    id: "rising_voltage",
    name: "Rising Voltage",
    type: "Electric"
  },
  {
    id: "roar",
    name: "Roar",
    type: "Normal"
  },
  {
    id: "roar_of_time",
    name: "Roar of Time",
    type: "Dragon"
  },
  {
    id: "rock_blast",
    name: "Rock Blast",
    type: "Rock"
  },
  {
    id: "rock_climb",
    name: "Rock Climb",
    type: "Normal"
  },
  {
    id: "rock_polish",
    name: "Rock Polish",
    type: "Rock"
  },
  {
    id: "rock_slide",
    name: "Rock Slide",
    type: "Rock"
  },
  {
    id: "rock_smash",
    name: "Rock Smash",
    type: "Fighting"
  },
  {
    id: "rock_throw",
    name: "Rock Throw",
    type: "Rock"
  },
  {
    id: "rock_tomb",
    name: "Rock Tomb",
    type: "Rock"
  },
  {
    id: "rock_wrecker",
    name: "Rock Wrecker",
    type: "Rock"
  },
  {
    id: "role_play",
    name: "Role Play",
    type: "Psychic"
  },
  {
    id: "rolling_kick",
    name: "Rolling Kick",
    type: "Fighting"
  },
  {
    id: "rollout",
    name: "Rollout",
    type: "Rock"
  },
  {
    id: "roost",
    name: "Roost",
    type: "Flying"
  },
  {
    id: "rototiller",
    name: "Rototiller",
    type: "Ground"
  },
  {
    id: "round",
    name: "Round",
    type: "Normal"
  },
  {
    id: "ruination",
    name: "Ruination",
    type: "Dark"
  },
  {
    id: "sacred_fire",
    name: "Sacred Fire",
    type: "Fire"
  },
  {
    id: "sacred_sword",
    name: "Sacred Sword",
    type: "Fighting"
  },
  {
    id: "safeguard",
    name: "Safeguard",
    type: "Normal"
  },
  {
    id: "salt_cure",
    name: "Salt Cure",
    type: "Rock"
  },
  {
    id: "sand_attack",
    name: "Sand Attack",
    type: "Ground"
  },
  {
    id: "sand_tomb",
    name: "Sand Tomb",
    type: "Ground"
  },
  {
    id: "sandsear_storm",
    name: "Sandsear Storm",
    type: "Ground"
  },
  {
    id: "sandstorm",
    name: "Sandstorm",
    type: "Rock"
  },
  {
    id: "sappy_seed",
    name: "Sappy Seed",
    type: "Grass"
  },
  {
    id: "scald",
    name: "Scald",
    type: "Water"
  },
  {
    id: "scale_shot",
    name: "Scale Shot",
    type: "Dragon"
  },
  {
    id: "scary_face",
    name: "Scary Face",
    type: "Normal"
  },
  {
    id: "scorching_sands",
    name: "Scorching Sands",
    type: "Ground"
  },
  {
    id: "scratch",
    name: "Scratch",
    type: "Normal"
  },
  {
    id: "screech",
    name: "Screech",
    type: "Normal"
  },
  {
    id: "searing_shot",
    name: "Searing Shot",
    type: "Fire"
  },
  {
    id: "secret_power",
    name: "Secret Power",
    type: "Normal"
  },
  {
    id: "secret_sword",
    name: "Secret Sword",
    type: "Fighting"
  },
  {
    id: "seed_bomb",
    name: "Seed Bomb",
    type: "Grass"
  },
  {
    id: "seed_flare",
    name: "Seed Flare",
    type: "Grass"
  },
  {
    id: "seismic_toss",
    name: "Seismic Toss",
    type: "Fighting"
  },
  {
    id: "self_destruct",
    name: "Self-Destruct",
    type: "Normal"
  },
  {
    id: "shadow_ball",
    name: "Shadow Ball",
    type: "Ghost"
  },
  {
    id: "shadow_bone",
    name: "Shadow Bone",
    type: "Ghost"
  },
  {
    id: "shadow_claw",
    name: "Shadow Claw",
    type: "Ghost"
  },
  {
    id: "shadow_force",
    name: "Shadow Force",
    type: "Ghost"
  },
  {
    id: "shadow_punch",
    name: "Shadow Punch",
    type: "Ghost"
  },
  {
    id: "shadow_sneak",
    name: "Shadow Sneak",
    type: "Ghost"
  },
  {
    id: "sharpen",
    name: "Sharpen",
    type: "Normal"
  },
  {
    id: "shed_tail",
    name: "Shed Tail",
    type: "Normal"
  },
  {
    id: "sheer_cold",
    name: "Sheer Cold",
    type: "Ice"
  },
  {
    id: "shell_side_arm",
    name: "Shell Side Arm",
    type: "Poison"
  },
  {
    id: "shell_smash",
    name: "Shell Smash",
    type: "Normal"
  },
  {
    id: "shell_trap",
    name: "Shell Trap",
    type: "Fire"
  },
  {
    id: "shelter",
    name: "Shelter",
    type: "Steel"
  },
  {
    id: "shift_gear",
    name: "Shift Gear",
    type: "Steel"
  },
  {
    id: "shock_wave",
    name: "Shock Wave",
    type: "Electric"
  },
  {
    id: "shore_up",
    name: "Shore Up",
    type: "Ground"
  },
  {
    id: "signal_beam",
    name: "Signal Beam",
    type: "Bug"
  },
  {
    id: "silk_trap",
    name: "Silk Trap",
    type: "Bug"
  },
  {
    id: "silver_wind",
    name: "Silver Wind",
    type: "Bug"
  },
  {
    id: "simple_beam",
    name: "Simple Beam",
    type: "Normal"
  },
  {
    id: "sing",
    name: "Sing",
    type: "Normal"
  },
  {
    id: "sizzly_slide",
    name: "Sizzly Slide",
    type: "Fire"
  },
  {
    id: "sketch",
    name: "Sketch",
    type: "Normal"
  },
  {
    id: "skill_swap",
    name: "Skill Swap",
    type: "Psychic"
  },
  {
    id: "skitter_smack",
    name: "Skitter Smack",
    type: "Bug"
  },
  {
    id: "skull_bash",
    name: "Skull Bash",
    type: "Normal"
  },
  {
    id: "sky_attack",
    name: "Sky Attack",
    type: "Flying"
  },
  {
    id: "sky_drop",
    name: "Sky Drop",
    type: "Flying"
  },
  {
    id: "sky_uppercut",
    name: "Sky Uppercut",
    type: "Fighting"
  },
  {
    id: "slack_off",
    name: "Slack Off",
    type: "Normal"
  },
  {
    id: "slam",
    name: "Slam",
    type: "Normal"
  },
  {
    id: "slash",
    name: "Slash",
    type: "Normal"
  },
  {
    id: "sleep_powder",
    name: "Sleep Powder",
    type: "Grass"
  },
  {
    id: "sleep_talk",
    name: "Sleep Talk",
    type: "Normal"
  },
  {
    id: "sludge",
    name: "Sludge",
    type: "Poison"
  },
  {
    id: "sludge_bomb",
    name: "Sludge Bomb",
    type: "Poison"
  },
  {
    id: "sludge_wave",
    name: "Sludge Wave",
    type: "Poison"
  },
  {
    id: "smack_down",
    name: "Smack Down",
    type: "Rock"
  },
  {
    id: "smart_strike",
    name: "Smart Strike",
    type: "Steel"
  },
  {
    id: "smelling_salts",
    name: "Smelling Salts",
    type: "Normal"
  },
  {
    id: "smog",
    name: "Smog",
    type: "Poison"
  },
  {
    id: "smokescreen",
    name: "Smokescreen",
    type: "Normal"
  },
  {
    id: "snap_trap",
    name: "Snap Trap",
    type: "Steel"
  },
  {
    id: "snarl",
    name: "Snarl",
    type: "Dark"
  },
  {
    id: "snatch",
    name: "Snatch",
    type: "Dark"
  },
  {
    id: "snipe_shot",
    name: "Snipe Shot",
    type: "Water"
  },
  {
    id: "snore",
    name: "Snore",
    type: "Normal"
  },
  {
    id: "snowscape",
    name: "Snowscape",
    type: "Ice"
  },
  {
    id: "soak",
    name: "Soak",
    type: "Water"
  },
  {
    id: "soft_boiled",
    name: "Soft-Boiled",
    type: "Normal"
  },
  {
    id: "solar_beam",
    name: "Solar Beam",
    type: "Grass"
  },
  {
    id: "solar_blade",
    name: "Solar Blade",
    type: "Grass"
  },
  {
    id: "sonic_boom",
    name: "Sonic Boom",
    type: "Normal"
  },
  {
    id: "spacial_rend",
    name: "Spacial Rend",
    type: "Dragon"
  },
  {
    id: "spark",
    name: "Spark",
    type: "Electric"
  },
  {
    id: "sparkling_aria",
    name: "Sparkling Aria",
    type: "Water"
  },
  {
    id: "sparkly_swirl",
    name: "Sparkly Swirl",
    type: "Fairy"
  },
  {
    id: "spectral_thief",
    name: "Spectral Thief",
    type: "Ghost"
  },
  {
    id: "speed_swap",
    name: "Speed Swap",
    type: "Psychic"
  },
  {
    id: "spicy_extract",
    name: "Spicy Extract",
    type: "Grass"
  },
  {
    id: "spider_web",
    name: "Spider Web",
    type: "Bug"
  },
  {
    id: "spike_cannon",
    name: "Spike Cannon",
    type: "Normal"
  },
  {
    id: "spikes",
    name: "Spikes",
    type: "Ground"
  },
  {
    id: "spiky_shield",
    name: "Spiky Shield",
    type: "Grass"
  },
  {
    id: "spin_out",
    name: "Spin Out",
    type: "Steel"
  },
  {
    id: "spirit_break",
    name: "Spirit Break",
    type: "Fairy"
  },
  {
    id: "spirit_shackle",
    name: "Spirit Shackle",
    type: "Ghost"
  },
  {
    id: "spit_up",
    name: "Spit Up",
    type: "Normal"
  },
  {
    id: "spite",
    name: "Spite",
    type: "Ghost"
  },
  {
    id: "splash",
    name: "Splash",
    type: "Normal"
  },
  {
    id: "splishy_splash",
    name: "Splishy Splash",
    type: "Water"
  },
  {
    id: "spore",
    name: "Spore",
    type: "Grass"
  },
  {
    id: "spotlight",
    name: "Spotlight",
    type: "Normal"
  },
  {
    id: "springtide_storm",
    name: "Springtide Storm",
    type: "Fairy"
  },
  {
    id: "stealth_rock",
    name: "Stealth Rock",
    type: "Rock"
  },
  {
    id: "steam_eruption",
    name: "Steam Eruption",
    type: "Water"
  },
  {
    id: "steamroller",
    name: "Steamroller",
    type: "Bug"
  },
  {
    id: "steel_beam",
    name: "Steel Beam",
    type: "Steel"
  },
  {
    id: "steel_roller",
    name: "Steel Roller",
    type: "Steel"
  },
  {
    id: "steel_wing",
    name: "Steel Wing",
    type: "Steel"
  },
  {
    id: "sticky_web",
    name: "Sticky Web",
    type: "Bug"
  },
  {
    id: "stockpile",
    name: "Stockpile",
    type: "Normal"
  },
  {
    id: "stomp",
    name: "Stomp",
    type: "Normal"
  },
  {
    id: "stomping_tantrum",
    name: "Stomping Tantrum",
    type: "Ground"
  },
  {
    id: "stone_axe",
    name: "Stone Axe",
    type: "Rock"
  },
  {
    id: "stone_edge",
    name: "Stone Edge",
    type: "Rock"
  },
  {
    id: "stored_power",
    name: "Stored Power",
    type: "Psychic"
  },
  {
    id: "storm_throw",
    name: "Storm Throw",
    type: "Fighting"
  },
  {
    id: "strange_steam",
    name: "Strange Steam",
    type: "Fairy"
  },
  {
    id: "strength",
    name: "Strength",
    type: "Normal"
  },
  {
    id: "strength_sap",
    name: "Strength Sap",
    type: "Grass"
  },
  {
    id: "string_shot",
    name: "String Shot",
    type: "Bug"
  },
  {
    id: "struggle",
    name: "Struggle",
    type: "Normal"
  },
  {
    id: "struggle_bug",
    name: "Struggle Bug",
    type: "Bug"
  },
  {
    id: "stuff_cheeks",
    name: "Stuff Cheeks",
    type: "Normal"
  },
  {
    id: "stun_spore",
    name: "Stun Spore",
    type: "Grass"
  },
  {
    id: "submission",
    name: "Submission",
    type: "Fighting"
  },
  {
    id: "substitute",
    name: "Substitute",
    type: "Normal"
  },
  {
    id: "sucker_punch",
    name: "Sucker Punch",
    type: "Dark"
  },
  {
    id: "sunny_day",
    name: "Sunny Day",
    type: "Fire"
  },
  {
    id: "sunsteel_strike",
    name: "Sunsteel Strike",
    type: "Steel"
  },
  {
    id: "super_fang",
    name: "Super Fang",
    type: "Normal"
  },
  {
    id: "supercell_slam",
    name: "Supercell Slam",
    type: "Electric"
  },
  {
    id: "superpower",
    name: "Superpower",
    type: "Fighting"
  },
  {
    id: "supersonic",
    name: "Supersonic",
    type: "Normal"
  },
  {
    id: "surf",
    name: "Surf",
    type: "Water"
  },
  {
    id: "surging_strikes",
    name: "Surging Strikes",
    type: "Water"
  },
  {
    id: "swagger",
    name: "Swagger",
    type: "Normal"
  },
  {
    id: "swallow",
    name: "Swallow",
    type: "Normal"
  },
  {
    id: "sweet_kiss",
    name: "Sweet Kiss",
    type: "Fairy"
  },
  {
    id: "sweet_scent",
    name: "Sweet Scent",
    type: "Normal"
  },
  {
    id: "swift",
    name: "Swift",
    type: "Normal"
  },
  {
    id: "switcheroo",
    name: "Switcheroo",
    type: "Dark"
  },
  {
    id: "swords_dance",
    name: "Swords Dance",
    type: "Normal"
  },
  {
    id: "synchronoise",
    name: "Synchronoise",
    type: "Psychic"
  },
  {
    id: "synthesis",
    name: "Synthesis",
    type: "Grass"
  },
  {
    id: "syrup_bomb",
    name: "Syrup Bomb",
    type: "Grass"
  },
  {
    id: "tachyon_cutter",
    name: "Tachyon Cutter",
    type: "Steel"
  },
  {
    id: "tackle",
    name: "Tackle",
    type: "Normal"
  },
  {
    id: "tail_glow",
    name: "Tail Glow",
    type: "Bug"
  },
  {
    id: "tail_slap",
    name: "Tail Slap",
    type: "Normal"
  },
  {
    id: "tail_whip",
    name: "Tail Whip",
    type: "Normal"
  },
  {
    id: "tailwind",
    name: "Tailwind",
    type: "Flying"
  },
  {
    id: "take_down",
    name: "Take Down",
    type: "Normal"
  },
  {
    id: "take_heart",
    name: "Take Heart",
    type: "Psychic"
  },
  {
    id: "tar_shot",
    name: "Tar Shot",
    type: "Rock"
  },
  {
    id: "taunt",
    name: "Taunt",
    type: "Dark"
  },
  {
    id: "tearful_look",
    name: "Tearful Look",
    type: "Normal"
  },
  {
    id: "teatime",
    name: "Teatime",
    type: "Normal"
  },
  {
    id: "techno_blast",
    name: "Techno Blast",
    type: "Normal"
  },
  {
    id: "techno_blast_douse",
    name: "Techno Blast",
    type: "Water"
  },
  {
    id: "techno_blast_shock",
    name: "Techno Blast",
    type: "Electric"
  },
  {
    id: "techno_blast_burn",
    name: "Techno Blast",
    type: "Fire"
  },
  {
    id: "techno_blast_chill",
    name: "Techno Blast",
    type: "Ice"
  },
  {
    id: "teeter_dance",
    name: "Teeter Dance",
    type: "Normal"
  },
  {
    id: "telekinesis",
    name: "Telekinesis",
    type: "Psychic"
  },
  {
    id: "teleport",
    name: "Teleport",
    type: "Psychic"
  },
  {
    id: "temper_flare",
    name: "Temper Flare",
    type: "Fire"
  },
  {
    id: "tera_blast",
    name: "Tera Blast",
    type: "Normal"
  },
  {
    id: "tera_blast_fighting",
    name: "Tera Blast",
    type: "Fighting"
  },
  {
    id: "tera_blast_flying",
    name: "Tera Blast",
    type: "Flying"
  },
  {
    id: "tera_blast_poison",
    name: "Tera Blast",
    type: "Poison"
  },
  {
    id: "tera_blast_ground",
    name: "Tera Blast",
    type: "Ground"
  },
  {
    id: "tera_blast_rock",
    name: "Tera Blast",
    type: "Rock"
  },
  {
    id: "tera_blast_bug",
    name: "Tera Blast",
    type: "Bug"
  },
  {
    id: "tera_blast_ghost",
    name: "Tera Blast",
    type: "Ghost"
  },
  {
    id: "tera_blast_steel",
    name: "Tera Blast",
    type: "Steel"
  },
  {
    id: "tera_blast_fire",
    name: "Tera Blast",
    type: "Fire"
  },
  {
    id: "tera_blast_water",
    name: "Tera Blast",
    type: "Water"
  },
  {
    id: "tera_blast_grass",
    name: "Tera Blast",
    type: "Grass"
  },
  {
    id: "tera_blast_electric",
    name: "Tera Blast",
    type: "Electric"
  },
  {
    id: "tera_blast_psychic",
    name: "Tera Blast",
    type: "Psychic"
  },
  {
    id: "tera_blast_ice",
    name: "Tera Blast",
    type: "Ice"
  },
  {
    id: "tera_blast_dragon",
    name: "Tera Blast",
    type: "Dragon"
  },
  {
    id: "tera_blast_dark",
    name: "Tera Blast",
    type: "Dark"
  },
  {
    id: "tera_blast_fairy",
    name: "Tera Blast",
    type: "Fairy"
  },
  {
    id: "tera_starstorm",
    name: "Tera Starstorm",
    type: "Normal"
  },
  {
    id: "terrain_pulse",
    name: "Terrain Pulse",
    type: "Normal"
  },
  {
    id: "terrain_pulse_electric",
    name: "Terrain Pulse",
    type: "Electric"
  },
  {
    id: "terrain_pulse_grassy",
    name: "Terrain Pulse",
    type: "Grass"
  },
  {
    id: "terrain_pulse_misty",
    name: "Terrain Pulse",
    type: "Fairy"
  },
  {
    id: "terrain_pulse_psychic",
    name: "Terrain Pulse",
    type: "Psychic"
  },
  {
    id: "thief",
    name: "Thief",
    type: "Dark"
  },
  {
    id: "thousand_arrows",
    name: "Thousand Arrows",
    type: "Ground"
  },
  {
    id: "thousand_waves",
    name: "Thousand Waves",
    type: "Ground"
  },
  {
    id: "thrash",
    name: "Thrash",
    type: "Normal"
  },
  {
    id: "throat_chop",
    name: "Throat Chop",
    type: "Dark"
  },
  {
    id: "thunder",
    name: "Thunder",
    type: "Electric"
  },
  {
    id: "thunder_cage",
    name: "Thunder Cage",
    type: "Electric"
  },
  {
    id: "thunder_fang",
    name: "Thunder Fang",
    type: "Electric"
  },
  {
    id: "thunder_punch",
    name: "Thunder Punch",
    type: "Electric"
  },
  {
    id: "thunder_shock",
    name: "Thunder Shock",
    type: "Electric"
  },
  {
    id: "thunder_wave",
    name: "Thunder Wave",
    type: "Electric"
  },
  {
    id: "thunderbolt",
    name: "Thunderbolt",
    type: "Electric"
  },
  {
    id: "thunderclap",
    name: "Thunderclap",
    type: "Electric"
  },
  {
    id: "thunderous_kick",
    name: "Thunderous Kick",
    type: "Fighting"
  },
  {
    id: "tickle",
    name: "Tickle",
    type: "Normal"
  },
  {
    id: "tidy_up",
    name: "Tidy Up",
    type: "Normal"
  },
  {
    id: "topsy_turvy",
    name: "Topsy-Turvy",
    type: "Dark"
  },
  {
    id: "torch_song",
    name: "Torch Song",
    type: "Fire"
  },
  {
    id: "torment",
    name: "Torment",
    type: "Dark"
  },
  {
    id: "toxic",
    name: "Toxic",
    type: "Poison"
  },
  {
    id: "toxic_spikes",
    name: "Toxic Spikes",
    type: "Poison"
  },
  {
    id: "toxic_thread",
    name: "Toxic Thread",
    type: "Poison"
  },
  {
    id: "trailblaze",
    name: "Trailblaze",
    type: "Grass"
  },
  {
    id: "transform",
    name: "Transform",
    type: "Normal"
  },
  {
    id: "tri_attack",
    name: "Tri Attack",
    type: "Normal"
  },
  {
    id: "trick",
    name: "Trick",
    type: "Psychic"
  },
  {
    id: "trick_room",
    name: "Trick Room",
    type: "Psychic"
  },
  {
    id: "trick_or_treat",
    name: "Trick-or-Treat",
    type: "Ghost"
  },
  {
    id: "triple_arrows",
    name: "Triple Arrows",
    type: "Fighting"
  },
  {
    id: "triple_axel",
    name: "Triple Axel",
    type: "Ice"
  },
  {
    id: "triple_dive",
    name: "Triple Dive",
    type: "Water"
  },
  {
    id: "triple_kick",
    name: "Triple Kick",
    type: "Fighting"
  },
  {
    id: "trop_kick",
    name: "Trop Kick",
    type: "Grass"
  },
  {
    id: "trump_card",
    name: "Trump Card",
    type: "Normal"
  },
  {
    id: "twin_beam",
    name: "Twin Beam",
    type: "Psychic"
  },
  {
    id: "twineedle",
    name: "Twineedle",
    type: "Bug"
  },
  {
    id: "twister",
    name: "Twister",
    type: "Dragon"
  },
  {
    id: "u_turn",
    name: "U-turn",
    type: "Bug"
  },
  {
    id: "upper_hand",
    name: "Upper Hand",
    type: "Fighting"
  },
  {
    id: "uproar",
    name: "Uproar",
    type: "Normal"
  },
  {
    id: "v_create",
    name: "V-create",
    type: "Fire"
  },
  {
    id: "vacuum_wave",
    name: "Vacuum Wave",
    type: "Fighting"
  },
  {
    id: "veevee_volley",
    name: "Veevee Volley",
    type: "Normal"
  },
  {
    id: "venom_drench",
    name: "Venom Drench",
    type: "Poison"
  },
  {
    id: "venoshock",
    name: "Venoshock",
    type: "Poison"
  },
  {
    id: "victory_dance",
    name: "Victory Dance",
    type: "Fighting"
  },
  {
    id: "vine_whip",
    name: "Vine Whip",
    type: "Grass"
  },
  {
    id: "vise_grip",
    name: "Vise Grip",
    type: "Normal"
  },
  {
    id: "vital_throw",
    name: "Vital Throw",
    type: "Fighting"
  },
  {
    id: "volt_switch",
    name: "Volt Switch",
    type: "Electric"
  },
  {
    id: "volt_tackle",
    name: "Volt Tackle",
    type: "Electric"
  },
  {
    id: "wake_up_slap",
    name: "Wake-Up Slap",
    type: "Fighting"
  },
  {
    id: "water_gun",
    name: "Water Gun",
    type: "Water"
  },
  {
    id: "water_pledge",
    name: "Water Pledge",
    type: "Water"
  },
  {
    id: "water_pulse",
    name: "Water Pulse",
    type: "Water"
  },
  {
    id: "water_shuriken",
    name: "Water Shuriken",
    type: "Water"
  },
  {
    id: "water_sport",
    name: "Water Sport",
    type: "Water"
  },
  {
    id: "water_spout",
    name: "Water Spout",
    type: "Water"
  },
  {
    id: "waterfall",
    name: "Waterfall",
    type: "Water"
  },
  {
    id: "wave_crash",
    name: "Wave Crash",
    type: "Water"
  },
  {
    id: "weather_ball",
    name: "Weather Ball",
    type: "Normal"
  },
  {
    id: "weather_ball_sunny",
    name: "Weather Ball",
    type: "Fire"
  },
  {
    id: "weather_ball_raining",
    name: "Weather Ball",
    type: "Water"
  },
  {
    id: "weather_ball_snowing",
    name: "Weather Ball",
    type: "Ice"
  },
  {
    id: "weather_ball_sandstorm",
    name: "Weather Ball",
    type: "Rock"
  },
  {
    id: "whirlpool",
    name: "Whirlpool",
    type: "Water"
  },
  {
    id: "whirlwind",
    name: "Whirlwind",
    type: "Normal"
  },
  {
    id: "wicked_blow",
    name: "Wicked Blow",
    type: "Dark"
  },
  {
    id: "wicked_torque",
    name: "Wicked Torque",
    type: "Dark"
  },
  {
    id: "wide_guard",
    name: "Wide Guard",
    type: "Rock"
  },
  {
    id: "wild_charge",
    name: "Wild Charge",
    type: "Electric"
  },
  {
    id: "wildbolt_storm",
    name: "Wildbolt Storm",
    type: "Electric"
  },
  {
    id: "will_o_wisp",
    name: "Will-O-Wisp",
    type: "Fire"
  },
  {
    id: "wing_attack",
    name: "Wing Attack",
    type: "Flying"
  },
  {
    id: "wish",
    name: "Wish",
    type: "Normal"
  },
  {
    id: "withdraw",
    name: "Withdraw",
    type: "Water"
  },
  {
    id: "wonder_room",
    name: "Wonder Room",
    type: "Psychic"
  },
  {
    id: "wood_hammer",
    name: "Wood Hammer",
    type: "Grass"
  },
  {
    id: "work_up",
    name: "Work Up",
    type: "Normal"
  },
  {
    id: "worry_seed",
    name: "Worry Seed",
    type: "Grass"
  },
  {
    id: "wrap",
    name: "Wrap",
    type: "Normal"
  },
  {
    id: "wring_out",
    name: "Wring Out",
    type: "Normal"
  },
  {
    id: "x_scissor",
    name: "X-Scissor",
    type: "Bug"
  },
  {
    id: "yawn",
    name: "Yawn",
    type: "Normal"
  },
  {
    id: "zap_cannon",
    name: "Zap Cannon",
    type: "Electric"
  },
  {
    id: "zen_headbutt",
    name: "Zen Headbutt",
    type: "Psychic"
  },
  {
    id: "zing_zap",
    name: "Zing Zap",
    type: "Electric"
  },
  {
    id: "zippy_zap",
    name: "Zippy Zap",
    type: "Electric"
  }
];

const BASIC_Z_MOVES = {
  Normal: "Breakneck Blitz",
  Fighting: "All-Out Pummeling",
  Flying: "Supersonic Skystrike",
  Poison: "Acid Downpour",
  Ground: "Tectonic Rage",
  Rock: "Continental Crush",
  Bug: "Savage Spin-Out",
  Ghost: "Never-Ending Nightmare",
  Steel: "Corkscrew Crash",
  Fire: "Inferno Overdrive",
  Water: "Hydro Vortex",
  Grass: "Bloom Doom",
  Electric: "Gigavolt Havoc",
  Psychic: "Shattered Psyche",
  Ice: "Subzero Slammer",
  Dragon: "Devastating Drake",
  Dark: "Black Hole Eclipse",
  Fairy: "Twinkle Tackle"
};

const SPECIAL_Z_MOVES = [
  {
    name: "Catastropika",
    type: "Electric",
    replaces: "Volt Tackle",
    pokemon: [
      "pikachu"
    ]
  },
  {
    name: "Sinister Arrow Raid",
    type: "Ghost",
    replaces: "Spirit Shackle",
    pokemon: [
      "decidueye-alolan"
    ]
  },
  {
    name: "Malicious Moonsault",
    type: "Dark",
    replaces: "Darkest Lariat",
    pokemon: [
      "incineroar"
    ]
  },
  {
    name: "Oceanic Operetta",
    type: "Water",
    replaces: "Sparkling Aria",
    pokemon: [
      "primarina"
    ]
  },
  {
    name: "Guardian of Alola",
    type: "Fairy",
    replaces: "Nature's Madness",
    pokemon: [
      "tapu-koko",
      "tapu-lele",
      "tapu-bulu",
      "tapu-fini"
    ]
  },
  {
    name: "Soul-Stealing 7-Star Strike",
    type: "Ghost",
    replaces: "Spectral Thief",
    pokemon: [
      "marshadow"
    ]
  },
  {
    name: "Stoked Sparksurfer",
    type: "Electric",
    replaces: "Thunderbolt",
    pokemon: [
      "raichu-alolan"
    ]
  },
  {
    name: "Pulverizing Pancake",
    type: "Normal",
    replaces: "Giga Impact",
    pokemon: [
      "snorlax"
    ]
  },
  {
    name: "Extreme Evoboost",
    type: "Normal",
    replaces: "Last Resort",
    pokemon: [
      "eevee"
    ]
  },
  {
    name: "Genesis Supernova",
    type: "Psychic",
    replaces: "Psychic",
    pokemon: [
      "mew"
    ]
  },
  {
    name: "10,000,000 Volt Thunderbolt",
    type: "Electric",
    replaces: "Thunderbolt",
    pokemon: [
      "pikachu-original-cap",
      "pikachu-hoenn-cap",
      "pikachu-sinnoh-cap",
      "pikachu-unova-cap",
      "pikachu-kalos-cap",
      "pikachu-alola-cap",
      "pikachu-partner-cap",
      "pikachu-world-cap"
    ]
  },
  {
    name: "Light That Burns the Sky",
    type: "Psychic",
    replaces: "Photon Geyser",
    pokemon: [
      "Ultra Necrozma"
    ]
  },
  {
    name: "Searing Sunraze Smash",
    type: "Steel",
    replaces: "Sunsteel Strike",
    pokemon: [
      "necrozma-dusk-mane",
      "solgaleo"
    ]
  },
  {
    name: "Menacing Moonraze Maelstrom",
    type: "Ghost",
    replaces: "Moongeist Beam",
    pokemon: [
      "necrozma-dawn-wings",
      "lunala"
    ]
  },
  {
    name: "Let's Snuggle Forever",
    type: "Fairy",
    replaces: "Play Rough",
    pokemon: [
      "mimikyu"
    ]
  },
  {
    name: "Splintered Stormshards",
    type: "Rock",
    replaces: "Stone Edge",
    pokemon: [
      "lycanroc-midday",
      "lycanroc-dusk",
      "lycanroc-midnight"
    ]
  },
  {
    name: "Clangorous Soulblaze",
    type: "Dragon",
    replaces: "Clanging Scales",
    pokemon: [
      "kommo-o"
    ]
  }
];

const MAX_MOVES = {
  Fire: "Max Flare",
  Bug: "Max Flutterby",
  Electric: "Max Lightning",
  Normal: "Max Strike",
  Fighting: "Max Knuckle",
  Ghost: "Max Phantasm",
  Ice: "Max Hailstorm",
  Poison: "Max Ooze",
  Water: "Max Geyser",
  Flying: "Max Airstream",
  Fairy: "Max Starfall",
  Dragon: "Max Wyrmwind",
  Psychic: "Max Mindstorm",
  Rock: "Max Rockfall",
  Ground: "Max Quake",
  Dark: "Max Darkness",
  Grass: "Max Overgrowth",
  Steel: "Max Steelspike"
};

const MAX_GUARD = "Max Guard";

const GMAX_MOVES = [
  {
    name: "G-Max Wildfire",
    type: "Fire",
    pokemon: [
      "charizard"
    ]
  },
  {
    name: "G-Max Befuddle",
    type: "Bug",
    pokemon: [
      "butterfree"
    ]
  },
  {
    name: "G-Max Volt Crash",
    type: "Electric",
    pokemon: [
      "pikachu"
    ]
  },
  {
    name: "G-Max Gold Rush",
    type: "Normal",
    pokemon: [
      "meowth-kantonian"
    ]
  },
  {
    name: "G-Max Chi Strike",
    type: "Fighting",
    pokemon: [
      "machamp"
    ]
  },
  {
    name: "G-Max Terror",
    type: "Ghost",
    pokemon: [
      "gengar"
    ]
  },
  {
    name: "G-Max Resonance",
    type: "Ice",
    pokemon: [
      "lapras"
    ]
  },
  {
    name: "G-Max Cuddle",
    type: "Normal",
    pokemon: [
      "eevee"
    ]
  },
  {
    name: "G-Max Replenish",
    type: "Normal",
    pokemon: [
      "snorlax"
    ]
  },
  {
    name: "G-Max Malodor",
    type: "Poison",
    pokemon: [
      "garbodor"
    ]
  },
  {
    name: "G-Max Stonesurge",
    type: "Water",
    pokemon: [
      "drednaw"
    ]
  },
  {
    name: "G-Max Wind Rage",
    type: "Flying",
    pokemon: [
      "corviknight"
    ]
  },
  {
    name: "G-Max Stun Shock",
    type: "Electric",
    pokemon: [
      "toxtricity-amped",
      "toxtricity-low-key"
    ]
  },
  {
    name: "G-Max Finale",
    type: "Fairy",
    pokemon: [
      "alcremie-vanilla-cream-strawberry-sweet",
      "alcremie-vanilla-cream-love-sweet",
      "alcremie-vanilla-cream-berry-sweet",
      "alcremie-vanilla-cream-clover-sweet",
      "alcremie-vanilla-cream-flower-sweet",
      "alcremie-vanilla-cream-star-sweet",
      "alcremie-vanilla-cream-ribbon-sweet",
      "alcremie-ruby-cream-strawberry-sweet",
      "alcremie-ruby-cream-love-sweet",
      "alcremie-ruby-cream-berry-sweet",
      "alcremie-ruby-cream-clover-sweet",
      "alcremie-ruby-cream-flower-sweet",
      "alcremie-ruby-cream-star-sweet",
      "alcremie-ruby-cream-ribbon-sweet",
      "alcremie-matcha-cream-strawberry-sweet",
      "alcremie-matcha-cream-love-sweet",
      "alcremie-matcha-cream-berry-sweet",
      "alcremie-matcha-cream-clover-sweet",
      "alcremie-matcha-cream-flower-sweet",
      "alcremie-matcha-cream-star-sweet",
      "alcremie-matcha-cream-ribbon-sweet",
      "alcremie-mint-cream-strawberry-sweet",
      "alcremie-mint-cream-love-sweet",
      "alcremie-mint-cream-berry-sweet",
      "alcremie-mint-cream-clover-sweet",
      "alcremie-mint-cream-flower-sweet",
      "alcremie-mint-cream-star-sweet",
      "alcremie-mint-cream-ribbon-sweet",
      "alcremie-lemon-cream-strawberry-sweet",
      "alcremie-lemon-cream-love-sweet",
      "alcremie-lemon-cream-berry-sweet",
      "alcremie-lemon-cream-clover-sweet",
      "alcremie-lemon-cream-flower-sweet",
      "alcremie-lemon-cream-star-sweet",
      "alcremie-lemon-cream-ribbon-sweet",
      "alcremie-salted-cream-strawberry-sweet",
      "alcremie-salted-cream-love-sweet",
      "alcremie-salted-cream-berry-sweet",
      "alcremie-salted-cream-clover-sweet",
      "alcremie-salted-cream-flower-sweet",
      "alcremie-salted-cream-star-sweet",
      "alcremie-salted-cream-ribbon-sweet",
      "alcremie-ruby-swirl-strawberry-sweet",
      "alcremie-ruby-swirl-love-sweet",
      "alcremie-ruby-swirl-berry-sweet",
      "alcremie-ruby-swirl-clover-sweet",
      "alcremie-ruby-swirl-flower-sweet",
      "alcremie-ruby-swirl-star-sweet",
      "alcremie-ruby-swirl-ribbon-sweet",
      "alcremie-caramel-swirl-strawberry-sweet",
      "alcremie-caramel-swirl-love-sweet",
      "alcremie-caramel-swirl-berry-sweet",
      "alcremie-caramel-swirl-clover-sweet",
      "alcremie-caramel-swirl-flower-sweet",
      "alcremie-caramel-swirl-star-sweet",
      "alcremie-caramel-swirl-ribbon-sweet",
      "alcremie-rainbow-swirl-strawberry-sweet",
      "alcremie-rainbow-swirl-love-sweet",
      "alcremie-rainbow-swirl-berry-sweet",
      "alcremie-rainbow-swirl-clover-sweet",
      "alcremie-rainbow-swirl-flower-sweet",
      "alcremie-rainbow-swirl-star-sweet",
      "alcremie-rainbow-swirl-ribbon-sweet"
    ]
  },
  {
    name: "G-Max Depletion",
    type: "Dragon",
    pokemon: [
      "duraludon"
    ]
  },
  {
    name: "G-Max Gravitas",
    type: "Psychic",
    pokemon: [
      "orbeetle"
    ]
  },
  {
    name: "G-Max Volcalith",
    type: "Rock",
    pokemon: [
      "coalossal"
    ]
  },
  {
    name: "G-Max Sandblast",
    type: "Ground",
    pokemon: [
      "sandaconda"
    ]
  },
  {
    name: "G-Max Snooze",
    type: "Dark",
    pokemon: [
      "grimmsnarl"
    ]
  },
  {
    name: "G-Max Tartness",
    type: "Grass",
    pokemon: [
      "flapple"
    ]
  },
  {
    name: "G-Max Sweetness",
    type: "Grass",
    pokemon: [
      "appletun"
    ]
  },
  {
    name: "G-Max Smite",
    type: "Fairy",
    pokemon: [
      "hatterene"
    ]
  },
  {
    name: "G-Max Steelsurge",
    type: "Steel",
    pokemon: [
      "copperajah"
    ]
  },
  {
    name: "G-Max Meltdown",
    type: "Steel",
    pokemon: [
      "melmetal"
    ]
  },
  {
    name: "G-Max Foam Burst",
    type: "Water",
    pokemon: [
      "kingler"
    ]
  },
  {
    name: "G-Max Centiferno",
    type: "Fire",
    pokemon: [
      "centiskorch"
    ]
  },
  {
    name: "G-Max Vine Lash",
    type: "Grass",
    pokemon: [
      "venusaur"
    ]
  },
  {
    name: "G-Max Cannonade",
    type: "Water",
    pokemon: [
      "blastoise"
    ]
  },
  {
    name: "G-Max Drum Solo",
    type: "Grass",
    pokemon: [
      "rillaboom"
    ]
  },
  {
    name: "G-Max Fireball",
    type: "Fire",
    pokemon: [
      "cinderace"
    ]
  },
  {
    name: "G-Max Hydrosnipe",
    type: "Water",
    pokemon: [
      "inteleon"
    ]
  },
  {
    name: "G-Max One Blow",
    type: "Dark",
    pokemon: [
      "urshifu-single-strike"
    ]
  },
  {
    name: "G-Max Rapid Flow",
    type: "Water",
    pokemon: [
      "urshifu-rapid-strike"
    ]
  }
];
