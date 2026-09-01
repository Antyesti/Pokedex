/**
 * Changelog (data)
 * -----------------
 * Version history shown in the in-app changelog modal.
 */

/**
 * Credits (data)
 * --------------
 * Sources and resources this Pokédex relies on, shown in the in-app Credits modal.
 */
const CREDITS = [
  {
    title: "Icons & Artwork",
    items: [
      "Poké Ball, Ribbon, and Mega Evolution / Gigantamax icons are provided by <a href=\"https://github.com/msikma/pokesprite\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-github-link\">msikma/pokesprite</a> and <b class=\"species-link-static\">Bulbapedia</b>.",
      "Pokémon Sprites are taken from the <a href=\"https://docs.google.com/spreadsheets/d/11arweTtnP9eygbLsQp7Kzdafqy7OBg8YrdCK7FeKEoA/edit?usp=sharing\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-github-link\">Ribbon Master Progress Tracking Spreadsheet</a> by Reddit user <a href=\"https://www.reddit.com/user/Tatertot74/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-discord-link\">u/Tatertot74</a>. It uses sprites hosted at <b class=\"species-link-static\">Pokémon Database</b>.",
      "The Ultra Burst icon is by <a href=\"https://www.deviantart.com/jormxdos\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-github-link\">JorMxDos</a>.",
      "Game version icons until Gen 3 are by <a href=\"https://steamcommunity.com/id/WildCh1mera/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-discord-link\">WildCh1mera</a> and sourced from <b>steamgriddb</b>."
    ]
  },
  {
    title: "Libraries",
    items: [
      "Animated-PNG share exports are built with <a href=\"https://github.com/photopea/UPNG.js\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-github-link\">UPNG.js</a> and <a href=\"https://github.com/nodeca/pako\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-github-link\">pako</a>; GIF exports and animated GIF sprite reading use <a href=\"https://github.com/matt-way/gifuct-js\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-github-link\">gifuct-js</a> and <a href=\"https://github.com/mattdesl/gifenc\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"footer-github-link\">gifenc</a>. All MIT-licensed."
    ]
  },
  {
    title: "Research & References",
    items: [
      "A significant amount of information was researched and verified using Bulbapedia. As a small thank you to Bulbapedia for being an invaluable resource over the years, every Pokémon species in this Pokédex includes a direct link to its corresponding Bulbapedia page, making it easy to jump to more detailed information whenever you need it."
    ]
  }
];

const CHANGELOG = [
  {
    version: "v29",
    entries: [
      {
        title: "Strange Ball",
        items: [
          "Strange Ball can no longer be selected from the ball list.",
          "Added a global Strange Ball display toggle at the top of Settings, with a tooltip explaining that it can be overridden per Pokémon.",
          "Added per-Pokémon Strange Ball overrides in the Edit screen.",
          "Fixed per-Pokémon overrides so they remain unchanged when the global setting is modified.",
          "Updated Poké Ball statistics to reflect the ball currently displayed, including Strange Ball and individual overrides."
        ],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADPElEQVRYw+2V7U9TVxzHD8+VJwdDtyXbn7MXajKcurgsmzHbEmXJljhcEMGBzzgoJrpQTWwRaQE7sgUYFdpCe0ut0PYCyzaKlmgGLQGH1IdliXPm47nXRNdkryh9YdJv8sm999yc8/3em9/5HSEyyiijV1EbRA5vFr2ehDaWfufSXN4QheyODbJ7tjcZOaa9E4W5aQqSLWgxm9kW/YHtqo0PJpPZrlp5f+5HzlnatQDrHoKG+30oD6fpXw5TqZrY9T8hdqmdfKQMsX9mfB1DyC93jHkYSUwBT3T6ZIj3Qh3S1PqCHfIPVIY7OXq7lw+9AzgmQojsdaiLElGA8YEbz72XAfyrU2wLdUrTLp3KsI0jUTt10asSO3tdo3yjBigT+akFyJeV3fYkQMv8IF9FLqFIY42vIxYOz9l1Mx15fyjaQ020mz3Do+x1u6lWXNTPTGNIZXeUGcoJ/TOJad7B5dgwB363cTDSRe3s1SRqZns4Mu3Gem+AWmWMer+P2jE/36oqm4tfW3uAchkg8DiIb9VHmwxxKTbExQWHzgWJOT6ERY61x69xZaWfqutuan0+anwKptAUF36NUFFUlsIf2LCR8USc/rlZhlc8/PynR1bAIn8Tl7WwiPk3BfOik0bXNNXeMUzBKc5PqDp1Lg+R1ftoa6w5wDsbKxDHzhJYus1jYtJ0GXHoFKLuO0TjKfm8QkPAT5N6nfPjKsYbIfy34nhvLjCzdJes0628ra2x5sYncilV/BQfqEYcb5acoeeil3//StA9EkQcrEedX0aZi0kWCP+xJIOdJPtkC0VyTomcq62R0k7YVGAg/5qT4q4eGaCJp48SxJbiPL2TIKvhBHnHjZJWnZzGZirsdkptNvIcTrS5qTeiojy+l+21+e5PiMMm+eUTurm1N4A4Y6Sw20Zhl/UFOVc6+FLugrbLFrS569aK3x0dxLjSJ2vgKKL+GKKphbqOIfZ5Xez3uKiS1yqPk32Kl63jN9JzHrSaLeyZCPOJrPAvpOFn0vDzkefsGHCwU/aAc+3mtJg/lzxqN2UV8OnkL2xxetjq8upscXr5OBhkc5Yhjcfxf2QQ2bxVUp6ENiYyyiijV1HPAP1NmjOzNt9hAAAAAElFTkSuQmCC"
      },
      {
        title: "Added brand new abilities",
        items: [
          "Added abilities for <b>Mega Lucario Z</b>, <b>Mega Absol Z</b> and <b>Mega Garchomp Z</b>."
        ]
      },
      {
        title: "Footer Redesign",
        items: [
          "Redesigned the footer with a more polished and aesthetic layout. The footer had remained largely untouched since the beginning of the project, so it was time to give it some attention.",
          "Updated the Poké Ball symbol to a colorful new design.",
          "The customizable app title now defaults to All Caps. Clicking the title toggles between All Caps and Sentence case.",
          "Added permanent footer decoration featuring a running Pikachu. Occasionally, Pikachu might take a break and let someone else take its place.👀"
        ]
      },
      {
        title: "Toolbar layout",
        items: [
          "Updated the toolbar so Grid Density and Sort remain pinned to the right, while Type, Game, and Form filters appear to their left.",
          "The Search field now fills the remaining space and automatically shrinks when additional filters are added."
        ]
      },
      {
        title: "Fixes",
        items: [
          "Reduced the font size of tooltip text.",
          "The History icon now appears to the left of the History heading when the panel is opened.",
          "Cleaned up the label for the empty option in the Poké Ball dropdown."
        ]
      }
    ]
  },
  {
    version: "v28",
    entries: [
      {
        title: "Added Moves",
        items: [
          "Added a searchable <b>Move List</b>. Moves in Moveset by Game can now be selected from a list, similar to the Species picker, displaying each move's name and type. Selected moves are displayed as type-colored pills, while unmatched typed names continue to be saved as custom moves.",
          "Moves are displayed in bold when they share a type with the Pokémon's currently displayed typing, including its Stellar or Tera type.",
          "Moves are displayed in italic when they share a type with the Pokémon's Mega Evolution typing while Mega Evolution is not the currently displayed form, and in bold when Mega Evolution is currently displayed.",
          "Added support for Z-Moves, including a toggle that allows one move per row to be designated as the Z-Move.",
          "Max Moves and G-Max Moves now automatically replace Normal Moves when Gigantamax is enabled and the Gigantamax form is currently displayed, with species-specific G-Max Moves taking precedence over generic Max Moves.",
          "Added Max Guard/Max Strike and G-Max Move/Max Move swap controls where applicable."
        ]
      },
      {
        title: "Added built-in Pokémon sprites",
        items: [
          "Pokémon sprites are now provided automatically instead of requiring users to upload their own artwork. The new sprite system includes comprehensive species and form coverage, with automatic selection of the appropriate artwork. This is in contrary to v25's changelog that said placeholder sprites will never be added. The decision was changed so it is easier to the eyes.",
          "Added Species Database entries for Unown's 26 letters plus ! and ?, all 19 remaining Vivillon patterns, all 9 remaining Furfrou trims, Medium/Large/Jumbo Pumpkaboo and Gourgeist, Antique Form Sinistea and Polteageist, Masterpiece Form Sinistcha, Artisan Form Poltchageist, Ash-Greninja, Dada Zarude, and all 63 Alcremie forms.",
          "Added form-specific sprite selection for species with distinct artwork for different forms, including Necrozma, Giratina, Castform, Rotom, Dialga and Palkia's Origin Formes, Kyurem Black and White, Calyrex's Riders, Bloodmoon Ursaluna, and Pikachu's cap and costume forms.",
          "Added automatic gender-aware sprite selection for Meowstic, Indeedee, Basculegion, and Oinkologne.",
          "Mega Evolution and Gigantamax forms now use distinct form names where required, correctly identifying forms such as Mega Magearna Original Color and Gigantamax Toxtricity Amped Form."
        ]
      },
      {
        title: "Added Characterstic selection",
        items: [
          "The Detail View's Profile section now displays Characteristic instead of Games Logged. Games Logged has been moved alongside the Moveset by Game heading."
        ]
      },
      {
        title: "History now tracks every change",
        items: [
          "Previously limited to deletions, History now records Pokémon additions and edits as well, allowing any roster change to be reviewed or undone from the History panel.",
          "Adding or editing a Pokémon is recorded directly in History without displaying a toast, since there is no time-sensitive action requiring confirmation. Deletions continue to display the Undo toast first, with the deletion also being recorded in History as before.",
          "History entries now provide an action appropriate to the change: Restore for deletions, Revert for edits to return the Pokémon to its previous saved state, and Remove for additions."
        ]
      },
      {
        title: "Shiny, Mega, and Gigantamax filters now match the rest of the toolbar",
        items: [
          "The three filters are grouped into a single control, matching the grid density and Pokérus toggles instead of appearing as separate buttons.",
          "On narrow screens, the filters now show icons only, matching the grid density toggle and preventing their text labels from becoming cramped."
        ]
      },
      {
        title: "Origin Games now sort by Generation",
        items: [
          "Origin Games are now grouped and ordered by Generation instead of alphabetically.",
          "Alphabetical sorting is still available. The Poké Ball Order setting has been renamed to Sort Alphabetically and now controls the sorting of both Poké Balls and Origin Games."
        ]
      },
      {
        title: "Added the GO Safari Ball",
        items: [
          "<b>Pokémon GO</b>'s Safari Ball is now available as a separate Poké Ball, using its in-game name and artwork. The GO Safari Ball is an event-exclusive ball used during GO Wild Area events."
        ],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjggKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNi0wNi0zMFQwODoyNzo0NCswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMjYtMDgtMjVUMjA6MTc6MjIrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjYtMDgtMjVUMjA6MTc6MjIrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmFjNjU4OWQ5LWFmOTgtODA0MC1hOGRmLWEzY2U5YjEzNjMzNiIgeG1wTU06RG9jdW1lbnRJRD0i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"
      },
      {
        title: "Added a Monospace Font setting",
        items: [
          "Users can now choose their preferred monospace font for stat labels, tags, Pokédex numbers, and other monospace text throughout the app."
        ]
      },
      {
        title: "Fixed",
        items: [
          "Fixed Mega Evolution typing not updating when the species was changed after a Mega Type had already been selected.",
          "Fixed the Stellar type pill on mobile so that its rounded corners render correctly without color bleeding beyond its edges.",
          "Special Z-Moves and G-Max Moves can now correctly apply to Mega Evolution, Primal Reversion, Ultra Burst, and Gigantamax forms by matching their alternate form names, such as \"Ultra Necrozma\" and \"Mega Charizard X\", when no separate Species Database entry exists for the form.",
          "Fixed Mega Zygarde being associated with Zygarde's 50% Forme instead of its Complete Forme in the Mega Types data.",
          "Fixed the hover glow on Shiny cards losing its distinct color when the Pokémon was also marked as Infected or Cured of Pokérus."
        ]
      },
      {
        title: "Under the hood",
        items: [
          "Reorganized the app's internal code for clarity. No user-facing changes.",
          "Identified several bugs that are currently being investigated and addressed."
        ],
        knownIssue: true
      }
    ]
  },
  {
    version: "v27",
    entries: [
      {
        title: "New",
        items: [
          "Added Terastallization as a new Forms toggle alongside Mega Evolution and Gigantamax. When enabled, choose a Tera Type to add as a third type alongside a Pokémon's default typing, reusing its existing Default sprite rather than requiring a separate one.",
          "Added the Stellar type as a Tera Type option, available only through Terastallization.",
          "Each of Ogerpon's masks and Terapagos now Terastallize to one fixed type rather than a free choice. Terapagos always goes Stellar.",
          "Groudon, Kyogre, and both of Necrozma's fused forms now display their proper name and icon, Primal Reversion or Ultra Burst, instead of the generic Mega Evolution label wherever the Mega toggle appears. Eternatus receives the same treatment for Gigantamax, appearing as Eternamax.",
          "The Moveset by Game section now shows a Mega Ability in place of the normal Ability for species whose Mega Evolution has a fixed ability of its own, for any game that supports Mega Evolution.",
          "Added all of Pikachu's forms.",
          "<b>Pokémon GO</b>, <b>Pokémon Colosseum</b> and <b>Pokémon XD: Gale of Darkness</b> has been added as preset game."
        ],
        icon: "data:image/gif;base64,R0lGODlhIgAiAPfgACkpMSmU/8al3jGM90K1/zlKUjmc/0Kt/+/G/yGE9zk5QimM9xAYITml/0o5WjFKUpx7ree9///O/yF79yl792tSeyExQvfO/9at5zGc9whC9zlCSjE5QjExQimM/7WUziFz99a174RrlEJSWt619yEhKTFCSmsYcxghKQAACM6E1jExOSEpMXtjjJyEtbWUxv/W///e/0JSUjGU/xAIIVJaYxgpMSkxOee990JKUjlSazlCUpR7pXtjlGNra84IEAhK9zlSUimc/1pjY1JjYzmt/5x7tc6l3t6179at70paWlpCYwgIGK2Mxr2czs6t5//v/2MA1sac1koAADml90JCSufWY5RzpWtjhEpaYzGl/6UIGKWEtUJ7zkJrjClShDEpMSGM9+8QEFpKc4xznCGM/zmc7zlCjFJScyFr90Kt9zE5SimE7wAAOVpSIZSMUjk5SiEASr2l1lpra0Jje4RrrTFKtSE5Y0pSWkpjY2NSe1KUxlo5c+/n1jGc/0qc3iEhOUql5///7ylz75R7vWtSc0JCY72c1u+9/62Mve+191Jztf///1pja62cSr29vWtje///rVJja1pKY///SufG/3NzQiFa55RznEJjnDE5Wsa9lBBS93NahGtzc1JjjBhS71Kc1kpznDlCWjGE51KEpSlKhDljlDFCUjExSkql3iEAa+f3/0KEvYQpjFp7hEqErUKUzlqMvSEIKUpCexgAWs6t72tjlDmE3mNSc1paUilCWiFS3ikxUhBC50qM3mMxe86l7+e1/1qExtat9zhHVyw7TLVCe97OQjk5GIGLlXNzc01aaZyUYy8+T7Wtc1JKWoSMjP//Y9a9MWNSY2taa//3hHt7hKWcY/fnrefenOfWQjGU9ymE9yk5SgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZFMEEwNEVDOTU4NTExRjFBMjhGOTFBMEE5MTI3RDdFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZFMEEwNEVEOTU4NTExRjFBMjhGOTFBMEE5MTI3RDdFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkUwQTA0RUE5NTg1MTFGMUEyOEY5MUEwQTkxMjdEN0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkUwQTA0RUI5NTg1MTFGMUEyOEY5MUEwQTkxMjdEN0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3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"
      },
      {
        title: "Fixed",
        items: [
          "Removed the separate Terapagos Terastal Form species entry now that Terastallization is handled by the Forms toggle.",
          "Moveset by Game Move fields no longer support rich text formatting. Existing entries with Bold or Italic formatting are cleaned up to plain text automatically when a save loads or is imported. This is done so that support for STAB moves which are signified by Bold text and Mega Moves which are signified by Italicized text can be added later."
        ]
      }
    ]
  },
  {
    version: "v26",
    entries: [
      {
        title: "New",
        items: [
          "Added a \"<b>New</b>\" option next to Import/Export to start a fresh, empty Pokédex. It warns you to save your current roster first, and offers an Undo right after in case you change your mind.",
          "Added a ✕ button inside the search box to instantly clear whatever you've typed.",
          "Added a \"Clear Filters\" button to the no-matches empty state, so an overly narrow search/filter combo is one click to reset.",
          "Added a back-to-top button that appears once you've scrolled down, for quickly returning to the header on long rosters.",
          "Deleting a Pokémon now also drops it into a <b>History</b> button that appears once its Undo toast has expired, so an accidental deletion is still recoverable after the toast is gone.",
          "Reworked the Sort control into a compact ⇅ menu with three keys (Added, Species, Nickname), each remembering its own direction (Oldest/Newest, A–Z/Z–A) independently.",
          "Added Pokérus as a status: Infected, None, or Cured, set from the edit form. Infected and Cured each get their own badge on the card, next to Shiny, and their own card glow color."
        ]
      },
      {
        title: "Visual",
        items: [
          "The sprite pedestal on cards now picks up a soft glow of the Pokémon's own type color, instead of the same neutral tint for every Pokémon.",
          "The empty-Pokédex screen now uses the same Poké Ball mark as the header, instead of a plain placeholder icon.",
          "Stats dashboard numbers now use the same monospace font as the rest of the app's data readouts.",
          "Reworked the shared card and roster images: color-coded gender, icon-only Ball/Origin/Last Game/Achievements, a Met Date chip, and a modern aurora-style background with a floating drop shadow instead of a flat gradient panel.",
          "On mobile, Settings, Theme, Import, Export, New, and Share now sit as 6 icon-only buttons in a single row instead of wrapping across several lines with labels.",
          "Reworked the shared card and roster images: type-tinted sprite glows, gradient-sheen type badges, a Poké Ball watermark, the dex number, and a glass-chip meta row instead of flat text lines and solid colors.",
          "Removed Total Game Appearances from the home screen summary. It's still in Full Stats as Game Rows Logged; the mobile summary now keeps Roster, Shiny, and Full Stats on one line.",
          "The Origin Game filter now shows each game's icon next to its name, matching the icons already used for Origin/Last Game elsewhere in the app.",
          "The Type filter now shows each type as its own colored pill (matching the badges used on cards) instead of plain text.",
          "The font preview in Settings now shows an actual card like the sprite, dex number, type badges, and footer instead of a generic mock-up, so it accurately reflects where each font will actually show up.",
          "Setting the Original Trainer name now uses an in-app dialog instead of the browser's native prompt, matching the rest of the app.",
          "Opening a modal now focuses its first real field or button instead of always landing on the close ❌ button.",
          "Settings switches now settle into place with a little bounce instead of just sliding. Shiny and Forms now bounce the same way.",
          "A required field that fails validation now shakes briefly along with its red border, so it's obvious at a glance which one needs attention.",
          "The autosave notice in the footer now scrolls by as a continuous ticker with no visible seam, instead of cutting off partway through.",
          "Reworked the Pokérus card effect: Infected weaves its color into the card's own type gradient instead of a separate overlay, and both Infected and Cured now tint the card's border the same way Shiny does.",
          "The Pokérus toggle in the edit form now matches the grid density control's look instead of the gender toggle's.",
          "Infected and Cured Pokémon now show their Pokérus badge in the detail view too, not just on the card.",
          "Default Sort in Settings now reads \"Sort by ...\" and includes Z–A options for Nickname and Species. Also renamed \"Name\" to \"Nickname\" to match what's actually being sorted.",
          "Clearing the search box now flies the old text away with a soft light streak instead of just blanking the field.",
          "The Roster and Shiny counts in the stats bar now spin like an odometer when they change, instead of just jumping to the new number."
        ]
      },
      {
        title: "Bug fixes",
        items: [
          "Fixed the Pokérus border tint not showing up on the card.",
          "Fixed Settings opening a native picker (Default Sort) automatically on mobile the instant the modal appeared.",
          "Fixed the Roster/Shiny stat counters rendering misaligned on mobile.",
          "Fixed the grid density and sort controls wrapping onto separate lines on mobile, with a lot of empty space around the density control.",
          "Fixed Nature, Shiny, and Forms being squeezed into a half-width column in the edit form on mobile.",
          "Fixed the footer ticker still showing a visible seam and a repaint hitch each time it looped.",
          "Fixed black bars flashing in during fast scrolling in the Beast Ball theme.",
          "Fixed the Species field and its autocomplete picker being cramped and hard to use on mobile.",
          "Fixed the page scrolling behind an open modal on mobile.",
          "Fixed Pokémon cards staying visually \"stuck\" in their hover state after a tap on touch devices.",
          "Increased the size of small touch targets (card edit/delete, trainer name edit) that were easy to mis-tap on mobile.",
          "Reworked the toolbar and header actions into a proper mobile layout instead of letting them wrap unpredictably.",
          "Restyled the filter/sort dropdowns' arrow to match the rest of the UI instead of the browser default.",
          "Improved the Species picker's visibility in the Beast Ball theme with a proper frosted-glass background.",
          "Escape now also closes the Settings and Credits modals, matching the other modals in the app.",
          "Modals now trap keyboard focus while open and return focus to what you were on when closed, instead of letting Tab wander into the page behind them.",
          "Several icon-only controls like modal close buttons and card actions, and Toast notifications are now announced to screen readers.",
          "The Add/Edit form now highlights, focuses, and scrolls to whichever field actually failed validation instead of just showing a message.",
          "Replaced the placeholder icon shown when a Pokémon has no sprite with a small, static version of the header's Poké Ball mark.",
          "Card footer and shared card images no longer show a redundant \"Game → Game\" when Origin Game and Last Game are the same.",
          "Shared card/roster images now show a Pokémon's Mega Evolution typing when set, instead of always falling back to its default typing."
        ]
      }
    ]
  },
  {
    version: "v25",
    entries: [
      {
        title: "Pokémon Species Picker",
        items: [
          "All this time, users had to manually type names for Pokémon and select their types. With this feature, the species field will autocomplete everything for you once you select the Pokémon from the species picker.",
          "The database has National Pokédex species with all regional variants with typings.",
          "Demonyms show up for all Pokémon with a regional variant. Selected form from the picker are preserved.",
          "Users can still enter any Pokémon name manually. This helps with future Pokémon if it is not updated or even fan content or custom entires."
        ]
      },
      {
        title: "Mega Pokémon Type",
        items: [
          "Even though Mega Evolution could be enabled before, the types shown would be of the base Pokémon form.",
          "Now, Mega Pokémon will show their correct types separately from their base form."
        ]
      },
      {
        title: "Dex Number Display",
        items: [
          "National Dex Number will now be displayed when picking a Pokémon from the species list.",
          "This is not a separate labeled field.",
          "Dex Numbers are displayed in two places. Card/Detailed view and the Species picker."
        ]
      },
      {
        title: "Sprites/Avatar",
        items: [
          "Sprites and Avatars are still not automatic and that is a design choice. There are plenty of fanarts, alternate official arts that fans love. This tool will never add generic sprites/avatars for Pokémon by itself."
        ],
        knownIssue: true
      }
    ]
  },
  {
    version: "v24",
    entries: [
      {
        title: "Card hover effects",
        items: [
          "Cards now tilt in 3D toward the cursor on hover.",
          "Added a soft border glow in each Pokémon's type colors, brightening as the cursor nears the card's edges.",
          "Shiny Pokémon get a noticeably brighter, wider glow."
        ]
      },
      {
        title: "Dex Stats redesign",
        items: [
          "Added Highlights at the top of the panel most common type, shiny rate, most-awarded Ribbon, and more, summarizing the standout numbers in your roster.",
          "Every section (Overview, Achievements, and the Top Origin Games/Natures/Poké Balls/Record Completeness lists) now shares one consistent card style.",
          "The panel now slides open/closed, and its bars and big numbers animate in instead of snapping into place.",
          "Trainer Notes is no longer tracked as a stat, since it's just a personal convenience field.",
          "Top Origin Games now shows each game's icon.",
          "Moves Logged and Abilities Logged now also show how many distinct moves/abilities that covers, since the raw logged count barely varies between rosters."
        ]
      },
      {
        title: "Achievements section",
        items: [
          "Ribbon/Mark/Misc categories and subcategories in the detail and edit views can now be collapsed and expanded by clicking their header, using the same open/close animation as the Dex Stats panel."
        ]
      },
      {
        title: "New Bonus Achievement added",
        items: [
          "Added the unique Pokémon Champions achievement for winning a match in Champion Tier. Grants <b>the Champion-Tiered</b> title."
        ]
      },
      {
        title: "Bug fixes",
        items: [
          "Fixed generation labels for future games showing as a plain number instead of a Roman numeral once past Generation IX."
        ]
      }
    ]
  },
  {
    version: "v23",
    entries: [
      {
        title: "Card footer info setting",
        items: [
          "Added a Settings option for what shows in each card's footer, next to the Share/Edit/Delete buttons: Origin Game → Last Game (default), Origin Game → Last Game (Icons Only), Age, Age with Met Date, Trainer Notes, Just Origin Game, Just Last Game, or None.",
          "Choosing None, or leaving the info blank for a given Pokémon, centers those buttons instead.",
          "The 6-per-row (desktop) and 2-per-row (mobile) dense grid view no longer shows footer info by default, keeping cards uncluttered at that size."
        ]
      },
      {
        title: "Poké Ball order setting",
        items: [
          "Added a Settings option to sort the Poké Ball picker alphabetically."
        ]
      },
      {
        title: "Settings layout",
        items: [
          "Moved Animated Sprite Format above Default Theme and Fonts.",
          "Widened the Settings modal so the Master Ball custom color pickers have room to breathe."
        ]
      },
      {
        title: "Bug fixes",
        items: [
          "Fixed the Settings modal clipping button labels that ran wider than their button.",
          "Fixed the Age display running the number and unit together with no space (e.g. \"21Years\" instead of \"21 Years\")."
        ]
      }
    ]
  },
  {
    version: "v22",
    entries: [
      {
        title: "Pokéathlon medals",
        items: [
          "Added the five Pokéathlon medals (Speed, Power, Skill, Stamina, Jump) to Achievements, and moved Pokéathlon Achievements above Bonus Achievements in the Miscellaneous section."
        ],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAbUExURf/vUggAOaVrGO8xUpwQShA5lMYhUtatMQAAAPbAEhgAAAAJdFJOU///////////AFNPeBIAAADASURBVHjajNNZEsQgCARQbDHm/iceQECNfkyXNUteSsUQej2tZFpco9OmUho/ElhCKa3WCpAFaBPDKDOUruZKaR/UdeluQynsxNIoTBA9pMsfLkXwSQztUhOeLxp3/T7QND835L0UDkTE5rSFUR2Rd8tSpEN+OmKZC37wUt5AmSuGqIa19EDkkOvM41T0ENqGshEP6/G9DTdUs0eGMkvBYvmwmX2/i802YRy2NJhWsdvamhLtziftr6a+vw4/AQYAW0AJUJMIH7MAAAAASUVORK5CYII="
      },
      {
        title: "Autosave",
        items: [
          "Your roster, trainer name, and settings now save to this browser automatically, so a reload picks up right where you left off.",
          "Export is still there for making a portable backup or moving your dex to another browser or device."
        ]
      },
      {
        title: "Faster loading for large rosters",
        items: [
          "The grid now loads Pokémon in batches instead of all at once, and loads more automatically as you scroll (or via a Load More button)."
        ]
      },
      {
        title: "Search by achievement",
        items: [
          "Search now matches earned ribbons, marks, and other achievements, alongside nickname, species, moves, and notes."
        ]
      },
      {
        title: "Share as image",
        items: [
          "Each card can now be shared or downloaded as an image, achievements and all.",
          "Added a Share button in the header to export your whole roster as a single image.",
          "Cards with an animated (APNG or GIF) sprite export as an animated image instead of a single frame.",
          "Added a Settings option to choose the animated export format: Animated PNG or GIF.",
          "On desktop, sharing downloads the image directly instead of opening a share dialog."
        ]
      },
      {
        title: "Kode Mono replaces JetBrains Mono",
        items: [
          "Switched the monospace font used throughout the Pokédex from JetBrains Mono to Kode Mono."
        ]
      }
    ]
  },
  {
    version: "v21",
    entries: [
      {
        title: "Stats page and Master Ball updates",
        items: [
          "The Stats page now shows your most awarded ribbon, plus how many Pokémon have a Contest Memory Ribbon and a Battle Memory Ribbon.",
          "Master Ball theme colors can now be typed in as a hex code, not just picked visually.",
          "General cleanup and small fixes under the hood."
        ]
      },
      {
        title: "Fonts split into General and Nickname",
        items: [
          "Settings now has separate General Font and Nickname Font pickers instead of one font for everything.",
          "This lets you keep the rest of the Pokédex easy to read while giving Pokémon nicknames their own more stylish look."
        ]
      },
      {
        title: "Small cleanup",
        items: [
          "Renamed an internal footer element that was being flagged by some browser extensions.",
          "Removed a redundant reset button now that the existing Default option already resets things properly."
        ]
      },
      {
        title: "Custom achievement icons",
        items: [
          "Creating a custom achievement now lets you pick which placeholder icon it uses (Ribbon, Mark, Diploma, or Star) instead of always defaulting to a Ribbon.",
          "The four icon choices are shown side-by-side so you can see and pick the one you want at a glance, rather than digging through a dropdown."
        ]
      },
      {
        title: "Unreleased Achievements can now be force-enabled",
        items: [
          "Unreleased Ribbons, Marks, and other achievements are still shown greyed out, just like before.",
          "Clicking one now shows a warning that it isn't available in any official Pokémon game yet, with the option to enable it anyway if you want to track it early. Turning it back off never needs a second warning.",
          "Once force-enabled, an achievement now looks, behaves, and displays exactly like any other earned achievement, instead of still showing an \"(Unreleased, force-enabled)\" note.",
          "Force-enabled achievements now correctly grant their title, just like a normally earned achievement."
        ]
      },
      {
        title: "Preset games in Moveset by Game",
        items: [
          "Each row in the Moveset by Game editor now has an icon picker next to the Tag field, letting you choose from every mainline Pokémon game grouped by generation, complete with that game's own icon.",
          "Picking a preset fills in the Tag field with the full game name (e.g. \"Pokémon Legends: Z-A\") and shows that game's icon next to it in the Pokémon's detail view.",
          "Typing a game's full name into the Tag field by hand links it up automatically too, so older tags (or anything just typed out) still pick up the right icon.",
          "The Tag field can still be typed into freely at any time for custom or non-standard tags."
        ],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAMDUlEQVR42r2ZeZAU133HP++97unpnYNlD5ZrF7GwlkRJAWklRRcrW7IiooosUpUEyYr/QKqyMSrHxNEfKSepcqKUKhXrIHLJJvnDUIWUksE2R0rYEcRWwELENi7QAeIQy7WIZZdhd87u6X7v5Y+e3ewu6MCp5FX1zPTx3u/bv/c7vyN+uPo9y9UMAYLfbtjxj08/nPHJduzjCogm/LTaJkLEb4FOgJBiCsgryBQCISYAtNbiphWOJy973lo7fs1acNMSx1NYc5WKl4I41ESBGReOACHEZfqIQ0MUaIQQDQ1acD1Jepo7WbC1CClQrkxOjcXLOKTzDlKJj9PBVN1jtCUoxoSVONEioCOTyJsAUkhBMBoR1TSIKVtsjZ0E0AIpR5BtcUnWEYlGAb/ZaQCzV7YMxuQKBFC5GOGkJa7vYa1FCihfrFMPLWLKAhNPnY80GW1J513SeRetExCZNgfHFZjYEmtNfraH56ZRQl2mRQFoqwmjgOK5EC+r8B2HOLJUhiOsgKYWD1mMCIoRQomPdxKmbEdTs4vrKaQS+K0OJk605eYkudYMTuRxaneJjQefp794CE/5WGsampOEusb8/CK+tHg18/raiN2Q0sUqccGQaXGRDtRGNClfISRUR6JJZnNlgA2HSOddHE/hZiQpX+KkJG6LpMn3CS9K3tlznN1nfsrg25qd/bsYKJ/BIYVt6FEgiKkzJ3uO6gWHjkFFX+cyeroXku00VGs1orLBy1qESmal81Avx5dFEmeiwQkpcFICP+8iFaSaFF7WQSpI+2mOXXif4/uG2L17P5s++B4zm2I6VRM3tTt46RhrRUODljBQDFdPs+vYWs4fdDizoE5fXy8Lb29nwYxrMfUannIaoQuUK7GxQcd2kteJH65+z1oD6ZwiN8Mj2+KiNWTbXZyURHoSNwuVwTp//uIa9h/bS9u0ZpqVoNce4vP1mDvnQcc8sFFjURcGT8HeU7Ar5bBfLGJEW4ZHR+jtuZMX/mwtmY4UURlMaIjrhvJQhFJQLkSULoQEJY2QV7BBa5PDxOC2SHw/zcUPi6x69nFOFArMS8Py9GGeXATaaFzAkVCpT4g3dch0wOfa4W40Sh7ipUOwNZzFu+dP8pVnH2fdU9+ndVaeWi2gfsGMy5065GRgSUzKtLkgLb7vc3zoCN/4zhpOFAo8Ifp5fu4gjy2MyamYvGtJuyBlAs4isCSZQkpIu5B3LTkV89jCmOfnDvKE6OdEocA3vrOG40NH8H0fpE1kNsLYpDAjxFiGUHhNSYZwUhI3K6gPS469NcT+o3uZl4b75l7inlkRkS+oxxYhkljnKnCnhOwIiA0YC7GFzoyge1YduMRrZz32Hz3HsbeG6LpzEX6LQ1ROYrDXpAjSirCkEWJCqnPSknTOBQEmNuTasryz+zh7du+nLd/Mcv9dOjsssQ9hZFEyCXYmgA/rMGgUFdEEQMZW6ZCa1hTIdBITw8gifOjsiFheOssrqRvYs3s/XbPmcGPffIZHyjheEjEqI3EjIYylukYRIB2B3+wQa42qe+w+8+9sPrGOG1qbeXKRIq9iQg1KJlrXBs5/qNgxLNhaz3FEfgaAa81RlqdKPNhmmdmlUSKZE2ro8uHJRYodBwSbT6yj84zHkvrXQZXItLrURuKkIBEfEagtkJ/tcXpPicG3NR3pmJs5hDYxRjXmCdAWqifhb0fm8aZuRhFia6MAnPFms1Z7/KowwnPmBE3zwREgLBhAm2TNofQMBt/WnJ5Zov1uj8pg/NFOMgbOWovn+mw88BI7+3cwV/ncW49RVhBbgRECHQjOn1I8NbKAfbUMbsrlgfvv48evbuTHr27kgfvvw0257KtleGpkAedPKXSQzI2tQFnBvfWYucpnZ/8ONh54Cc/1Ewf5NKlOCkn/6GEGyme5ZYbDspnQlEqcAgeGKrBjyPCmyeP6KR6+fymPrHiEm3t7AfAcQcZPse31PbwZOewYMnxxhqXdBWLwU7CsGzadd9h34Sz9o4eRQn76XJwI8fFEiqqC93I5KqOJ3aUVHC/B9kghRcR9dy/lsS+uYPGSXqKoCMDNvb0oZSlX67z+Hz9ju57G9FHNQgOBTjw/k4PqkMITCs/xP7minjpia/Gk5t1Kji8cuC6xhUZIUgI8F8rlEitXrmTxkiVEURHXTYJNFBVZvOQWVq50+NFrr3My28M3TyV2K0RiSwbwlcWTJWJrrx7ghNIGEdQm2YZVEuE3XUUbY7H1Kmgzvo4A8P1P35NcdkMqgiDkd3tv4i//4uuN0AtSpjnZf5R1/7yBc8D69etJqS+xeMkt41vsunkOHvg169dvJJ/NMrutmVVfWcM18z+DMUFDgss/PPdP/Oeb+3CkunqAoQmo1avMaGvnrjtun3Rv8Q09YBV/9fQ/suuNX5DLpNFajDvJb/bv5webNrPrjV+gjWXVl5/g4YeW0ZRpnrTOjLZ/pVavEo6D/rQFqzV0569nTv4ww4WLHD1ylHnXdOC4LtZomjI5Hnl0BW/s/RU/37OXLa/tpFwNCONkA19+eSM7f74HHI/7l97JI4+uQGCI4xJCKuIo4tTJQYYLF5mTn0d3/npMo9idOtSK2578VlJuOWRbUri+QvqGheGtjI6U2HfyZwydHuDez99DOu03+gyN1nUe/oOHOHT4fY5+0E//mQE2vrqZH/xoK2fOnSfWlt+79x7WvfgcOq4ghEFKiZQOtVqNp7/1DG8d/DUPzP8jHr9rNd7ciKhi0YGhUogISjFSiss1KIDiuZCupW10nE8z+HaBA0f7cdwc1kqsNUipcBxFFJX49jN/R9/tt/Lddf/C8WoNgJnT86xe9WUe+sJDRFEJ103EGKMBiePmOHC0n8HhAh0PpulammVwYBhHqY/YYgtCJc1Q5WKEl1PoVEhf5zJOd1d5q/RvPPftZ/nq6sdpbZ2F1iWUcnAcheumWLbsHhYt6qYa1AFoSqfo6uokm0lhbXJN6xilcly8+CHf++73uVS6xB93r6Kvcxk6FYIWVEaicSxj7u4kJbogDgxBKcLxFP50l9JwjZ75C+j77G1sf3k923+yk2yuiT9c/jDzrulG6wpSSqytM316C9Onz5zy7vUGOIHWBqVynDp5gi1bt7H9JzsZKgzT9+Bt9MxfQGm4jHQkcRgRh5o4MOMNvWxUNUSBJqzqhAGoG2qFmFSboeeOdnoX3srQSIkNL29my9ZtDAwMoFQKISRCSKyNMaaC1slhTAVr4/H7SqUYGBhgy9ZtbHh5M0MjJXoX3krPHe2k2hJZcd0gpCCsaqJAjycFObHJFo3qtTIcgRHUajUWtl/LC19by5y2WYxWQ17ZtI0N6zdQLAaUSkXiOGpUwGK8gAWBtRDHEaVSkWIxYMP6DbyyaRuj1ZA5bbN44WtrWdh+LbVaDYxIZFqLmMDLXHXTtObFNfzmg1/S1tLG9FwLi3uu4a//5pvM7eqaQoIkEs6ePs3fP/0MB4+d5FKpwHBhmJsX3Mbaq2iaGgAtft7Fb3ZQjkg6fgVe7n/azqZpPh9cOJK0nW/8kk0n1tHR1sIN191IPjsNaw1CNMgQKxBCUiyP8u777zA4XOBPulfR99nbxtvO6mgNoyEsx4QljdFQLYTo2FIbiakVo6QNnkStGUsUWGrFKOn4VaKUVJMiqAX0zLiOrrsW0Tl7Lp2nfQYP1Pnpf23hw/JpXJliLNNKBJGpMyvbxbLrH6XjwRR9Xb9Pz/wFeK1J467rlnpVU68ljNfYt5CTWSfnMrZHWIJihJTJc1YLpCOoXzBUZBG/RXHj3ddwU7SGUzPLZGYLThQPX5H66M5fz5/+zleZtzTboD5KFM9oMALpQFg2xIEhDnUiU4lJTNcEG7T401zSeWec3ZpIHlkzRh654+QRjr0q8og4edEx8kg0yMxgCnmUXIupjU7d4qkClCCoxJjYkG1NYSwEjW7LSUkyrS6VwZgKpU+k3xylqIxESSgRAqlo0G8h9dB8JLM1aYvH3miSAGvRsaVciCYRmE5KUhuJr4rABIgDM5nAjBOecCqBKS6zQQFRaLCj0SdSwEEppnLp/54CntR2CiGIApPQrp9Aogel+P+JRBeXb/FUD7qiJhzxv/8bQnycIUwe/w13tw9CVkbLkAAAAABJRU5ErkJggg=="
      },
      {
        title: "Custom fonts",
        items: [
          "Settings now has a Fonts section where you can set the font used across the whole Pokédex.",
          "Pick a Google Font by typing its exact name, or load a font file straight from your own computer (.ttf, .otf, .woff, .woff2).",
          "A live preview card shows a sample name, species line, and sentence in the chosen font before you save, so you can check how it will look first.",
          "A font loaded from your computer is stored inside your exported JSON file, so it carries over the next time you import that file, even on a different device.",
          "A Reset Font to Default button clears the custom font and returns to the built-in Outfit font."
        ]
      },
      {
        title: "Reset options for Settings",
        items: [
          "The Master Ball theme panel now has its own Reset Master Ball Colors to Default button, separate from resetting the rest of Settings.",
          "Settings now has a Reset to Default button that restores Default Sort, Default Theme, the Master Ball colors, and the font all at once, with an Undo option in case it was tapped by mistake."
        ]
      },
      {
        title: "Removed a redundant Settings option",
        items: [
          "The Show Unreleased Achievements checkbox has been removed from Settings. It's no longer needed now that any unreleased achievement can be force-enabled individually just by clicking on it."
        ]
      },
      {
        title: "Preset games in Origin Game and Last Game",
        items: [
          "The Origin Game and Last Game fields now have the same icon picker used by Moveset by Game, letting you choose from every mainline Pokémon game grouped by generation.",
          "Picking a preset fills in the field with the full game name and shows that game's icon next to it.",
          "Typing a game's full name into either field by hand links it up automatically too, so existing entries still pick up the right icon.",
          "Both fields can still be typed into freely at any time for custom entries."
        ],
        icon: "data:image/png;base64,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"
      },
      {
        title: "Fixed Contest and Battle Memory Ribbons collapsing each other",
        items: [
          "Opening the sub-ribbon list for Contest Memory Ribbon used to close Battle Memory Ribbon's list, and vice versa.",
          "Both can now be expanded and viewed at the same time."
        ]
      },
      {
        title: "Added a Credits section",
        items: [
          "A new Credits link in the footer opens a modal crediting the sources this Pokédex relies on."
        ]
      }
    ]
  },
  {
    version: "v20",
    entries: [
      {
        title: "Added Achievements, Ribbons, Marks & Titles",
        items: [
          "Each Pokémon can now track Ribbons, Marks, and other miscellaneous achievements, organized into categories and subcategories pulled from the official in-game lists (Contest Ribbons, Battle Tower Ribbons, Marks, and more).",
          "Memory Ribbons (Contest Memory Ribbon and Battle Memory Ribbon) support their own sub-collections, letting you record which specific memories have been earned rather than just an on/off toggle.",
          "The Contest Star Ribbon is auto-awarded based on a Pokémon's other contest ribbons, instead of needing to be selected manually.",
          "Added support for fully custom, user-defined achievements: give it a name, an icon, and a category tag, and it shows up alongside the official ones.",
          "Achievement-based titles (including a dynamic Partner Ribbon title that uses your partner trainer's name) are now computed automatically from whichever ribbons and marks a Pokémon has earned.",
          "Older exported .json files without achievement data still import correctly: missing fields are filled in with safe defaults."
        ],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABVUlEQVRYw+2XsQ4CMQhAb/UvHB1cjW7GyR/SX9D4PSb+gj/j4nKTiQYTLqRS2h7QcygJyXm08KSFa7uuSZMmfrJZb985+rdgk4CGQfu+F7U6ZAj2eO5EDUFds0XfcTDX2/6rnI3zoYJO7ScMfLrMBjh4BkVItFFAs/2JE1+rxaAhIAJJgGinczmfJoD3+ZIFRCC6xBSYAoKPaoBc1mLvJwGkWYxpuAerAdLgKTh4dgcExzFAabk5QAqpBqROU5CccnChn1GAx8P5p1eVQsbgQr8Qy/VgwO05Cud+gMg9rZSAmX6XacFISxVTOkdVGCWAEohkcwVMAaV+uy0xV9E5AJJdVbmaBm7ekC2PYZAVmm2TT5oWjgueO84FEDIEd4xU0BAS5mB2XbMXu7Vpx5svL80IV5HUlpPxKnvPap66UY8FdL/Ecw279M+5NehYQOvxTZo0KZQPQd4IKklwv8QAAAAASUVORK5CYII="
      }
    ]
  },
  {
    version: "v19",
    entries: [
      {
        title: "Redesigned the Met Date field and added a year picker",
        items: [
          "The Met Date field now shows Day, Month, and Year as separate boxes inside one field, instead of a single free text box.",
          "The ordinal suffix after the day (1st, 2nd, 3rd, 4th, and so on) is now always computed and shown as a true superscript. It is never something you type yourself, it just appears and updates as soon as you enter a day.",
          "Picking a year used to mean clicking Previous Month over and over. Clicking the month and year label at the top of the calendar now opens a year grid instead, so you can jump straight to a year, then drop back into the day view already on that year.",
          "The year grid moves a dozen years at a time with Previous Years and Next Years buttons, and future years past today are disabled, same as future days already were.",
          "Typing directly into the Day, Month, or Year boxes still works and updates the calendar to match as you go."
        ]
      },
      {
        title: "Fixed the date picker being unreliable to click",
        items: [
          "The Met Date calendar popover could get clipped or visually cut off by the edit form's scrolling container, which made parts of it unclickable and made it look like it was closing on its own.",
          "The calendar now positions itself against the screen directly instead of the form panel, so it always renders fully visible regardless of scroll position or which column the field sits in.",
          "The calendar flips to open above the field instead of below when there is not enough room beneath it.",
          "The calendar now closes cleanly when the form is scrolled or the window is resized, instead of drifting out of place."
        ]
      },
      {
        title: "Fixed Mega and Gigantamax being editable from the detail view by mistake",
        items: [
          "The detail view was showing Mega Evolution and Gigantamax switches even for Pokémon that did not have those forms enabled, and clicking them would incorrectly turn the form on.",
          "Enabling or disabling Mega Evolution and Gigantamax is only possible from the edit form now, exactly as intended.",
          "The detail view only shows a switch for a form once it has actually been enabled, and clicking it just changes which sprite is displayed."
        ]
      },
      {
        title: "Mega and Gigantamax filters",
        items: [
          "Added Mega and Gigantamax filter buttons next to the Shiny filter, each with its own icon.",
          "Renamed the \"Shiny Only\" filter label to just \"Shiny\"."
        ]
      },
      {
        title: "Card and detail view improvements",
        items: [
          "Restored the clickable Mega and Gigantamax badges on each card, which had been mistakenly removed in an earlier update.",
          "When Mega Evolution or Gigantamax is the active form, the species name now shows a \"MEGA\" or \"GIGANTAMAX\" prefix both on the card and in the detail view. This is a display label only and does not change the stored Species field."
        ]
      },
      {
        title: "Edit form polish",
        items: [
          "The Mega Evolution and Gigantamax toggle labels now show their icon next to the name.",
          "The Shiny toggle label was shortened from \"This Pokémon is shiny\" to just the shiny icon and \"SHINY\".",
          "The sprite preview boxes for Default, Mega Evolution, and Gigantamax were returned to their original smaller size after briefly stretching to fill the row.",
          "The sprite section's explanation text is now a hover tooltip instead of sitting inline next to the heading."
        ]
      }
    ]
  },
  {
    version: "v18",
    entries: [
      {
        title: "Added Mega Evolution and Gigantamax forms",
        items: [
          "Added two independent toggles per Pokémon, Mega Evolution and Gigantamax, that can be on, off, or both at once.",
          "Each Pokémon now supports up to three sprites: Default (always available), Mega Evolution, and Gigantamax. The latter two only become available once their toggle is enabled.",
          "Added Mega and Gigantamax badge icons in the same corner as the Shiny indicator on every card. Clicking a badge switches that card to show the corresponding sprite; clicking it again switches back to Default.",
          "If a form is enabled but has no sprite uploaded for it, the card automatically falls back to showing the Default sprite instead of a broken image.",
          "Turning a form toggle off clears its uploaded sprite and resets the displayed sprite back to Default, so re-enabling it later starts from a clean slate.",
          "Added a matching Forms switcher in the detail view for Pokémon with at least one form enabled.",
          "Older exported .json files without these fields still import correctly: missing fields are filled in with safe defaults."
        ]
      },
      {
        title: "Replaced the native date picker",
        items: [
          "The Met Date field no longer uses the browser's native calendar control, which couldn't be restyled to match the app and looked out of place.",
          "Built a custom calendar popover with month navigation, quick \"Today\", \"−1 Year\" and \"−5 Years\" shortcuts, and a \"Clear date\" option.",
          "Future dates are disabled in the calendar, consistent with the existing rule that a Pokémon can't be met in the future.",
          "Matches all three themes: Beast Ball, Poké Ball, and Master Ball (both Glassmorphic and Neumorphic styles)."
        ]
      },
      {
        title: "Fixed unreadable dropdown menus on Master Ball theme",
        items: [
          "Dropdown menu options (Type, Game, Sort, Nature, etc.) were hardcoded to a dark background, which made the text unreadable against itself whenever a Master Ball color combination didn't happen to match.",
          "Dropdown option colors now adapt to the actual background and text colors chosen in the Master Ball theme, for both Glassmorphic and Neumorphic styles.",
          "Switching away from Master Ball back to Beast Ball or Poké Ball no longer leaves a stale dropdown color behind."
        ]
      }
    ]
  },
  {
    version: "v17",
    entries: [
      {
        title: "Fixed Save / Add Pokémon being broken",
        items: [
          "Restored a missing closeForm function that had been accidentally deleted, which caused clicking \"Save Pokémon\" on both Add and Edit to throw an error and leave the form open without saving."
        ]
      },
      {
        title: "Fixed Delete losing data on rapid successive deletes",
        items: [
          "Deleting a second Pokémon before clicking \"Undo\" on the first used to permanently destroy the first Pokémon and only the most recent deletion could ever be restored.",
          "Rebuilt deletion/undo to use a stack of pending deletions instead of a single remembered slot, so deleting several Pokémon in a row now lets every one of them be undone, one at a time, most-recent-first.",
          "Pending deletions are now cleared on Import to avoid restoring a deleted Pokémon into the wrong, freshly-loaded roster."
        ]
      },
      {
        title: "Added a Changelog",
        items: [
          "Added a \"Changelog\" link in the footer that opens a scrollable history of every release."
        ]
      },
      {
        title: "Added a Favicon",
        items: [
          "Added a browser tab icon."
        ]
      },
      {
        title: "Bug hunt",
        items: [
          "Ran a full pass over every interactive feature (forms, modals, filters, sorting, theming, settings, import/export, sprite upload, rich text, stats dashboard, mobile layout) to check for errors; the two fixes above were the issues found."
        ]
      }
    ]
  },
  {
    version: "v16",
    entries: [
      {
        title: "Improved the Age module",
        items: [
          "Centered the Years / Months / Days unit labels alongside the large numerals instead of allowing them to sink to the text baseline.",
          "Corrected the alignment of the clock icon beside \"Met on\".",
          "Moved the Age section above Trainer Notes in the detail view.",
          "Made the met date bold while keeping the \"Met on\" label at regular weight (e.g. 1st October 2004).",
          "Added spacing between the age and met-date lines for a cleaner layout.",
          "Added a small clock icon before \"Met on\" for improved readability."
        ]
      }
    ]
  },
  {
    version: "v15",
    entries: [
      {
        title: "Improved the Age module",
        items: [
          "Rewrote the age calculation to eliminate negative day values that could occur across varying month lengths (for example, Pokémon met on the 31st and viewed during shorter months).",
          "Replaced the original implementation with a more robust calendar-anchor method and verified it across a wide range of dates, including leap years.",
          "Redesigned the display into two lines: a large age display (e.g. 10 Years 4 Months 9 Days) with a smaller \"Met on\" date underneath."
        ]
      }
    ]
  },
  {
    version: "v14",
    entries: [
      {
        title: "Added the Age module",
        items: [
          "Added a Met Date field to Edit Pokémon → History.",
          "Added an Age section to the detail view showing the elapsed time since the Pokémon was met."
        ]
      },
      {
        title: "Added the Master Ball theme (experimental)",
        items: [
          "Added a new custom theme with Glassmorphic and Neumorphic surface styles.",
          "Added four customizable color pickers: Background, Text, Accent, Accent/Highlight.",
          "Included theme settings in exported .json files."
        ]
      },
      {
        title: "Fixed Master Ball theme issues",
        items: [
          "Replaced several hardcoded shadow colors so cards, modals, and buttons now use the selected palette."
        ]
      },
      {
        title: "Known Issue",
        knownIssue: true,
        items: [
          "The quick header theme toggle still did not recognize the Master Ball theme."
        ]
      }
    ]
  },
  {
    version: "v13",
    entries: [
      {
        title: "Improved the Master Ball theme",
        items: [
          "Fixed several visual issues introduced in v12."
        ]
      },
      {
        title: "Known Issues",
        knownIssue: true,
        items: [
          "Neumorphic shadows and theme switching were still not functioning correctly."
        ]
      }
    ]
  },
  {
    version: "v12",
    entries: [
      {
        title: "Added the Master Ball theme (experimental)",
        items: [
          "Added a fully customizable theme option in Settings.",
          "Theme preferences are saved and restored through exported .json files."
        ]
      },
      {
        title: "Known Issues",
        knownIssue: true,
        items: [
          "The theme was missing from the quick header theme switcher.",
          "Neumorphic shadows rendered incorrectly on dark custom backgrounds, producing bright white shadows."
        ]
      }
    ]
  },
  {
    version: "v11",
    entries: [
      {
        title: "Improved the Gender module",
        items: [
          "Replaced the Gender dropdown with three selectable buttons: ♂ Male (blue), ♀ Female (pink), ○ Genderless (purple).",
          "Clicking an already-selected button now clears the value.",
          "Removed the explicit \"Unset\" option while still allowing the field to remain blank.",
          "Updated the Stats Dashboard to display gender percentages based only on Pokémon with a recorded gender."
        ]
      }
    ]
  },
  {
    version: "v10",
    entries: [
      {
        title: "Added Settings Persistence",
        items: [
          "Added a new Settings panel for Default Sort and Default Theme.",
          "Settings are now saved to exported .json files and restored automatically when imported."
        ]
      }
    ]
  },
  {
    version: "v9",
    entries: [
      {
        title: "Expanded Search",
        items: [
          "Search now matches nickname, species, nature, gender, ball, ability, met location, and move names."
        ]
      },
      {
        title: "Added Shiny Filter",
        items: [
          "Added a Shiny Only toggle.",
          "Can be combined with existing Type and Game filters."
        ]
      }
    ]
  },
  {
    version: "v8",
    entries: [
      {
        title: "Added Undo Delete",
        items: [
          "Pokémon are now deleted immediately without a confirmation dialog.",
          "A temporary toast notification provides an Undo button that restores the Pokémon to its original position."
        ]
      }
    ]
  },
  {
    version: "v7",
    entries: [
      {
        title: "Added the Stats Dashboard",
        items: [
          "Expandable dashboard showing type distribution, shiny count, games represented, most common natures, most common Poké Balls, and record completeness."
        ]
      }
    ]
  },
  {
    version: "v6",
    entries: [
      {
        title: "Added Sorting",
        items: [
          "Recently Added, Oldest Added, Name (A–Z), Species (A–Z)."
        ]
      },
      {
        title: "Added Original Trainer Support",
        items: [
          "Set an Original Trainer name.",
          "The page title updates to \"[Trainer]'s Pokédex\"."
        ]
      }
    ]
  },
  {
    version: "v5",
    entries: [
      {
        title: "Added Import / Export",
        items: [
          "Import and export the Pokédex as .json.",
          "Remembers the most recently opened file."
        ]
      }
    ]
  },
  {
    version: "v4",
    entries: [
      {
        title: "Added Moveset by Game",
        items: [
          "Track a Pokémon's Ability and up to four moves for each game appearance."
        ]
      }
    ]
  },
  {
    version: "v3",
    entries: [
      {
        title: "Added Shiny Tracking",
        items: [
          "Added a sparkle badge and animated shimmer effect for shiny Pokémon."
        ]
      },
      {
        title: "Added Filtering",
        items: [
          "Filter by Type.",
          "Filter by Game."
        ]
      }
    ]
  },
  {
    version: "v2",
    entries: [
      {
        title: "Added Detail View",
        items: [
          "Click a Pokémon card to view its Nature, Gender, Met Location, Ball, Origin Game, and Last Game."
        ]
      },
      {
        title: "Added Edit Pokémon",
        items: [
          "Create and edit Pokémon entries."
        ]
      }
    ]
  },
  {
    version: "v1",
    entries: [
      {
        title: "Initial Release",
        items: [
          "Card-based roster displaying each Pokémon's Nickname, Species, and Type(s).",
          "Type-tinted card styling."
        ],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtElEQVRYhe2WQQ5AMBBFHaXXcAVHcBVL17B0FUtXcAxbMpKRj6mg0wqZn/xIo/FeK6RZZrFYvhjn3CQ1GdiXqCJnYMzQj/oSV+FRJO7CWUBN4lWBJ3AUCJYIWf1/BNq2ewyvqjpcoCnyjQSNuT4ww2mOigCWZehKYwmKVfkS8MGYPQwbvP0oQKtbtro87oAEpvl0X/VviBJrhXevDkcJerAPyuAocJRgEanJzwXJDyQWiyVGZoHGGxJrvY0hAAAAAElFTkSuQmCC"
      }
    ]
  }
];
