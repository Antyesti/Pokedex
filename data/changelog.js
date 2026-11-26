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
    "version": "v30",
    "entries": [
      {
        "title": "Import Game Saves",
        "items": [
          "Hover over <b>Import</b> and choose <b>Import Game Saves</b>. On a touch screen, tap the arrow beside <b>Import</b>.",
          "<b>Supported Saves</b><ul><li>Game Boy Advance &ndash; <b>Pokémon Ruby</b>, <b>Pokémon Sapphire</b>, <b>Pokémon Emerald</b>, <b>Pokémon FireRed</b>, <b>Pokémon LeafGreen</b></li><li>Nintendo DS &ndash; <b>Pokémon Diamond</b>, <b>Pokémon Pearl</b>, <b>Pokémon Platinum</b>, <b>Pokémon HeartGold</b>, <b>Pokémon SoulSilver</b>, <b>Pokémon Black</b>, <b>Pokémon White</b>, <b>Pokémon Black 2</b>, <b>Pokémon White 2</b></li><li>Nintendo 3DS &ndash; <b>Pokémon X</b>, <b>Pokémon Y</b>, <b>Pokémon Omega Ruby</b>, <b>Pokémon Alpha Sapphire</b>, <b>Pokémon Sun</b>, <b>Pokémon Moon</b>, <b>Pokémon Ultra Sun</b>, <b>Pokémon Ultra Moon</b></li><li>Nintendo Switch &ndash; <b>Pokémon Let’s Go, Pikachu!</b>, <b>Pokémon Let’s Go, Eevee!</b>, <b>Pokémon Sword</b>, <b>Pokémon Shield</b>, <b>Pokémon Brilliant Diamond</b>, <b>Pokémon Shining Pearl</b>, <b>Pokémon Legends: Arceus</b>, <b>Pokémon Scarlet</b>, <b>Pokémon Violet</b>, <b>Pokémon Legends: Z-A</b></li><li>Nintendo GameCube &ndash; <b>Pokémon Colosseum</b>, <b>Pokémon XD: Gale of Darkness</b></li></ul>",
          "The importer also reads <b>DeSmuME .dsv saves</b>, raw GameCube saves, <b>.gci</b> files and GameCube memory card images.",
          "Import several <b>individual Pokémon files</b> at once. Supported formats include <b>.pk3 through .pk9</b>, <b>.pa8</b>, <b>.pa9</b>, <b>.pb7</b>, <b>.pb8</b>, <b>.ck3</b>, <b>.xk3</b> and encrypted <b>.ek3 through .ek9</b>.",
          "Choose which Pokémon to import. Filter by nickname, species or location. Select a party or box by its header, Shift-click a range, or use <b>New only</b>, <b>Party</b> or <b>Shiny</b>.",
          "<b>Exact matches</b> are selected by default. Importing one updates its existing Pokédex entry with the information in the selected save. It adds or refreshes that game’s moves and ability, merges earned ribbons and marks, and records the Gigantamax Factor when present.",
          "<b>Possible matches</b> are unchecked for review. The importer compares species and nickname, plus origin game and nature when available, against entries without a save ID. Selecting a possible match adds a separate entry.",
          "<b>Last Game</b> changes on reimport when the save’s game is reachable under the Game Travel rules. <b>Moveset by Game</b> can still update when Last Game stays the same.",
          "New entries include the details available in the save, such as nickname, nature, gender, Shiny status, Poké Ball, Pokérus, met location, met date and origin game. The importer reads multilingual nicknames and uses the species name for Pokémon without a custom nickname.",
          "Supported alternate forms include Unown letters, Vivillon patterns, Alcremie decorations and Ogerpon masks. Forms without a separate species entry use the base form.",
          "A <b>Characteristic</b> in the save updates the existing entry. If the save has none, the Pokémon keeps its recorded Characteristic. The importer reports changes to an existing Characteristic.",
          "Memory Ribbons preserve known <b>Contest</b> and <b>Battle</b> achievements. The importer retains individual achievements from saves that record them. For Generation VI and later saves, it flags a Contest or Battle Memory Ribbon for review only when the entry has no individual achievements recorded in that category.",
          "<b>Reimports</b> recognize <b>evolution</b>. If you import <b>Bulbasaur</b> and later import the same Pokémon as <b>Ivysaur</b>, its existing entry updates to Ivysaur. If you then import the earlier Bulbasaur save, the entry stays Ivysaur."
        ],
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Added brand new Mega Abilities",
        "items": [
          "Added abilities for <b>Mega Heatran</b>, and <b>Mega Tatsugiri</b>."
        ],
        "knownIssue": false,
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Battle Memory Ribbon",
        "items": [
          "<b>World Ability Ribbon</b> is no longer a requirement to obtain the Golden Battle Memory Ribbon because this Ribbon is no longer officially available after DS WFC servers shut down in 2014."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABSElEQVRYhe2XMQ7DMAhFc4HeJ2uvkLWHytq7ZOwZMvYMGT2mIhISoYBdx8ZDjfSltqLwRDA4w9CtW7f6No73XVJrLhWsOSgHCCGIagKqgW3b9CUJ1A1QqpgEiaAugBSOVigG6AaJCWKPkfugqgLy6kmJl0c4pEFWqWJqZRCOQlpVvAyqzTQtacpvEmAWqDRK4PM83/Zl0ZNq31HwX4jB4/4MSeHoI4PgMUgJDvwRDgExblZf8qbnwkQIa+nkq8TLBgQ9p9chLXiuMG6RPqSgV2BpjOqnmUNbcrnppF6tUlUMzILkh0AS+LjAaZAIKsmtchJgrLd4rzYBjB0CyacJIGhd3ydpJ9kdjq4sKmv2uQDSAay9NPEh7QbIN4R0o+aAWTu3BGDsBLsB8oTWjLNAq0HSRKnDV4KsDpizFVw2SongriuvW7d/sQ+eX1TfBrOuKgAAAABJRU5ErkJggg=="
      },
      {
        "title": "Detailed View",
        "items": [
          "Choose <b>Floating</b> or <b>Full Screen</b> under <b>Settings → Card Interaction Style</b> for viewing and editing Pokémon. Floating is the default. Your selection takes effect immediately and is remembered on future visits.",
          "Full Screen centers the Pokémon header between <b>Back</b> and <b>Share</b>. The profile and edit form use a centered column on desktop. Movesets stack on narrow screens, and met locations display superscript annotations. Back returns to the same roster position, search and filters.",
          "Click the Has Met Location count in <b>Full Stats</b> → <b>Record Completeness</b> to show Pokémon missing a met location or simply type <b>missing:met-location</b> in the search bar."
        ]
      },
      {
        "title": "Settings is now its own page",
        "items": [
          "Settings opens as a full page at <b>#/settings</b> instead of a popup, so it can be bookmarked and the browser Back button works. The page is split into General, Appearance, Fonts and (once unlocked) Easter Egg sections.",
          "The Settings button in the header morphs into a <b>Home</b> button while you're there. Click it, press Esc, or use Cancel to return to your Pokédex.",
          "Fonts now opens with a live preview card, followed by the General, Nickname and Monospace font pickers."
        ],
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Custom Background",
        "items": [
          "New in Settings <b>></b> Appearance: paint the page with <b>1 to 5 colors</b>, using the same color picker as the Master Ball theme. Changes preview live and are saved in your export.",
          "Custom Background is part of the <b>Master Ball</b> theme only. It doesn't appear on Poké Ball or Beast Ball, and the Master Ball <b>Background</b> color option is hidden while it is on.",
          "Choose a <b>Linear, Radial or Conic</b> gradient and set its direction or center with the Center grid. Radial gradients can be an <b>Ellipse</b> or a <b>Circle</b>.",
          "Every color has its own <b>stop position</b> (for example 0, 38, 65 and 100). Saved backgrounds from before keep working.",
          "Tune <b>Color Intensity</b>, <b>Smoothness</b> (lower makes hard color bands), <b>Grain</b> and <b>Vignette</b>.",
          "<b>Card Style</b> (Light or Dark) gives the cards the Poké Ball or Beast Ball colors. While Custom Background is on, it replaces the Background and Text colors, and Surface Style still applies.",
          "Optional <b>Animation</b> with a speed slider from slow to fast (off when your device prefers reduced motion), <b>Surprise Me!</b> for a random palette, and <b>Reset</b>."
        ]
      },
      {
        "title": "Choose GIF or Animated PNG when you share",
        "items": [
          "Click or tap <b>Share as Image</b> on a Pokémon card to choose <b>GIF</b> or <b>Animated PNG</b>. On a computer, hover over <b>Share</b> in Detailed View or over the roster’s share button to see the same choices.",
          "The Animated Sprite Format preference now only shows in Settings on phones and tablets, where there is no hover. Your saved choice is kept, so it still applies if you switch to a mobile device."
        ],
        "icon": "data:image/gif;base64,R0lGODlhZABOAMQUABAQEL29vXu9/733/1p71oTe/wAAAN73/9YQEFIpjCtEk0hbmwAInHOU7zFCjFJSUjGM/zkxxpze/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDM0MiwgMjAxMC8wMS8xMC0xODowNjo0MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MEE3NjYxQzBGODYxMUU0ODA1MkFBOUNBMzU3MDVGOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0MEE3NjYxRDBGODYxMUU0ODA1MkFBOUNBMzU3MDVGOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwQTc2NjFBMEY4NjExRTQ4MDUyQUE5Q0EzNTcwNUY5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwQTc2NjFCMEY4NjExRTQ4MDUyQUE5Q0EzNTcwNUY5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNr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"
      },
      {
        "title": "New Color Picker",
        "items": [
          "Master Ball theme colors now use a full color picker with a saturation and brightness area, hue slider, hex field, eyedropper (where the browser supports it), suggested and recent colors, and a contrast check against your background or text color."
        ]
      },
      {
        "title": "Import now warns before replacing",
        "items": [
          "Importing a Pokédex file (or loading your last file) replaces the whole roster, so you now get a warning first whenever your Pokédex isn't empty, with a pointer to Import Game Saves for adding Pokémon from a game save."
        ]
      },
      {
        "title": "Trainer Avatars",
        "items": [
          "Some familiar faces in the avatar picker have a secret. Once you uncover it, look beside their usual portraits for a variant marked <b>(Hidden)</b>.",
          "A <b>Hidden Trainer Avatars</b> toggle will appear in Settings &gt; Easter Egg. Switch it off and the hidden faces slip out of sight. Any hidden Trainer Avatar already selected stays."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAKSWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAASImdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwAHGaQJmtwKOD/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0JXoS+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nD5LcUOsWI4kwJoiRSpJQSSjVlP+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjC4IWfL2QsFC4sLPYuHhZ8eAiv0W7FiOLUxd3LjFdUrpkeGnw0n3LaMuylv1Q4lhSVfJqedzyjlKD0qWlQyuCVzSVqZTJy26u9Fq5YxVhlWRV72qX1VtWfyoXlV+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zHjY3XHNY9XnqCdKD3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8OCYee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vPWPzY8Av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmSj8QP5Q89H6Y8en0E/3Pud8/vwv94Tz+y1HOM8AAAAJcEhZcwAAdTAAAHUwAd0zcs0AAAI9SURBVFiF7Ze9TgJBEMfnjOQstAILX4EnYKqzJPENbEh4CKUwISYW4kOY0PgM12i8an0CXoHCawgUEoq1OOeyt9x+zJ4oBf+KsLM7P2ZnZ4ZISgn7rKP/BnDpANhUB8CmOgA21QGwqfYe8Jg+IGKl5wkhor+GqWOojaCY5oCIUt+wSzBElGKab60d19jDaLIBMibIXUS0PPvH12iy2bKJ1GlGjZj+a3DQgd8C1cF0H6qfyhXbnItpXl59Uzg6y+hL4djKQVqsCzeBhkKa8kz1pwcpMg2stsMAiusQQkQ+sGTnc57+vRGQIMfDJfST9dZamsVw/3xmvSrVufMcQ3pZAQkSAIwOQkVgAPbcdwKSCDTpzuGydxoEm2YxvH+sIJtdOMHYgCqoz7Ua9xtyzaS978UsQHo0TTQeLlllih1Byj0cdCqV3ybVlpu7QVestD0n5E/OVfZxVDssuJR054VDRC97RCz3ALRYvoIi+HhbOEm6c2ehFtO8hKN9HLHqoAuGiq9PUfctN6wrltcFYPRSn0v9ZO0EozOg5ZeP7Ct+W7Th9UpCmsUAUJ166LWqj4HW0yyG1ysJb4s2yx8rgvrhaRbDZS+G0aRoX2oK4KBTtsU0qznH80GzWh0iyof8EzY3J957dLWevuCuc+7d7oJ6MUWGKxoU/qQXv3+sdmpPCirUFD1yaoumbpPNeL6CAEk6mBolWgtJBVXsR6JOM/1kXZYbm3Q724gfDFg3anEmE/2H+EIGPxLu2BT6f+Yb0otOqeN367QAAAAASUVORK5CYII="
      },
      {
        "title": "Redesigned Achievement Tooltip and Warning Dialogs",
        "items": [
          "Achievement badges now feature enhanced tooltips displaying the badge icon, name, a guide, and an Available in row indicating the games in which they can be earned.",
          "Redesigned the “New Pokédex” and “Force-enable an unreleased/restricted achievement” warning dialogs with properly scaled icons and readable text, replacing the tiny text and typed ⚠️ character that could render inconsistently, particularly on Windows."
        ],
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Interface tweaks",
        "items": [
          "All cards are now the same size. Long nicknames end with an ellipsis, and a card's details stay on one line and scroll like a ticker when they don't fit and it pauses while you hover the card.",
          "Badges, tags, toggles, buttons, and the search and filter controls are now pill shaped, like the footer links.",
          "In the Master Ball theme with the Neumorphic surface style, a card's detail chips and buttons now have a <b>25</b><i>%</i> background that rises to <b>40</b><i>%</i> on hover.",
          "Added an informational Event tag to some ribbons and marks."
        ]
      },
      {
        "title": "🐞Bug Fixes",
        "items": [
          "Fixed keyboard focus in stacked dialogs.",
          "Fixed shadow issues in the Master Ball Neumorphic style by tinting highlights on tooltips, dropdowns and toasts to match the background color and softening the overly bright shadow around Settings panels.",
          "Fixed the storage-full warning only appearing once per session.",
          "Fixed an issue that caused the Trainer Avatar picker to close unexpectedly on mobile.",
          "Improved the Met Date picker to prevent it from closing unexpectedly when opened.",
          "Fixed theme-specific filter and stat indicator colors to properly adapt to light and dark backgrounds.",
          "Fixed three General settings labels and clarified the Restricted Ribbons and color picker hints.",
          "Escape now closes only the top open panel or window instead of everything at once.",
          "Importing the same Pokémon before and after evolution updates its existing entry. Importing an earlier stage keeps the evolved species on the roster.",
          "Fixed moves with an apostrophe in the name, such as Land’s Wrath and Nature’s Madness, not getting their type after an import or when typed."
        ]
      }
    ]
  },
  {
    "version": "v29",
    "entries": [
      {
        "title": "Ribbons Eligibility Engine",
        "items": [
          "Added a comprehensive <b>Ribbon Eligibility Engine</b> that evaluates Ribbon eligibility based on game history, game connectivity, species availability, and Ribbon-specific restrictions.",
          "Added a <b>Ribbons Helper</b> that gives you a list of all ribbons a Pokemon can obtain based on its Origin Game, Last Game, or Moveset by Game entry.",
          "Games now have configurable Travels To paths, including separate connectivity for Virtual Console/re-release versions.",
          "When a game has a Virtual Console/re-release version, the version is determined per Moveset by Game entry, ensuring each Pokémon follows the correct transfer path.",
          "Species availability is used to determine whether a game can count toward Ribbon and Mark eligibility, restricting only impossible paths without adding or removing achievements from the tracker.",
          "Added a Ribbons filter to the Edit screen with support for Ribbon eligibility and Met Level restrictions.",
          "Added Met Level requirements for the Winning Ribbon and Footprint Ribbon, divided into three ranges: ≤50, 50–70, and >70. A badge indicates the range of the entered Met Level.",
          "Ribbons that are unavailable due to species availability, game history, or Met Level are shown as restricted with the reason provided in the tooltip. Restricted Ribbons can still be force-enabled, similar to Unreleased Ribbons.",
          "Eligibility now checks Origin Game, Last Game, and per-game Movesets against the games where each Ribbon can actually be earned, including valid transfers through later games.",
          "Ribbon eligibility considers a Pokémon's entire evolution history, allowing Ribbons earned by a valid pre-evolution in an older game to remain eligible after evolution.",
          "Species-specific Ribbon restrictions, including banned species, game-specific bans, and Mythical exclusions, are evaluated against the relevant evolutionary stage. Earlier stages can establish eligibility, while later evolutions cannot grant eligibility backward.",
          "Added a Settings option to hide Restricted Ribbons from the Edit screen. When hidden, Footprint Ribbon and Winning Ribbon require a Met Level before they can be selected. When restricted Ribbons are shown, Met Level remains optional.",
          "Added Give All Eligible Ribbons, allowing all Ribbons a Pokémon qualifies for from a selected game to be added at once. Marks remain manually assigned.",
          "Jumbo Mark and Mini Mark can no longer both be active on the same Pokémon."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABOUlEQVRYw+2WMQ6DMAxFe4GehZW1Y1cOxBU4EPfpyshIZaRfucEOpo0Dgy1ZIMcJjzixfbuFhIT4Sds+FoteGu40SHz49WyyGoAWyL4fNiHltrgke3Dj2C3zPH8p2dwh05DBjvANw32FmaZOVBojH23+X/CW0OXgOKTLMfiEr2lWTRekEKYwZNPsm/nJusXSCOz4OIUQEPROCkiMke6t5wIIoBwgxk8FBBAPMQc+DVDaNc3uBrh3SQCiqfslySm/KBoc373i1UZK1NzGIbRwI1FzkCKJWhOpMbDmPl5N3ASA0rnUFL5VANNDngOVfKo2qjlIPla1cZXymQZYvbPG+aMndSkSgPQD5Mvnuu9e2pymu2P1cw+vFbBamK31tHjd/bWyWAFdK8eR+nzUr8qNtgBWqSAhISEXlTcT7IXB2WNhRAAAAABJRU5ErkJggg=="
      },
      {
        "title": "Strange Ball",
        "items": [
          "Strange Ball can no longer be selected directly from the ball list.",
          "Added a global Strange Ball display toggle in Settings, with per-Pokémon overrides available from the Edit screen.",
          "Per-Pokémon overrides now remain unchanged when the global setting is modified.",
          "Poké Ball statistics now reflect the ball currently displayed, including Strange Ball and individual overrides."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADPElEQVRYw+2V7U9TVxzHD8+VJwdDtyXbn7MXajKcurgsmzHbEmXJljhcEMGBzzgoJrpQTWwRaQE7sgUYFdpCe0ut0PYCyzaKlmgGLQGH1IdliXPm47nXRNdkryh9YdJv8sm999yc8/3em9/5HSEyyiijV1EbRA5vFr2ehDaWfufSXN4QheyODbJ7tjcZOaa9E4W5aQqSLWgxm9kW/YHtqo0PJpPZrlp5f+5HzlnatQDrHoKG+30oD6fpXw5TqZrY9T8hdqmdfKQMsX9mfB1DyC93jHkYSUwBT3T6ZIj3Qh3S1PqCHfIPVIY7OXq7lw+9AzgmQojsdaiLElGA8YEbz72XAfyrU2wLdUrTLp3KsI0jUTt10asSO3tdo3yjBigT+akFyJeV3fYkQMv8IF9FLqFIY42vIxYOz9l1Mx15fyjaQ020mz3Do+x1u6lWXNTPTGNIZXeUGcoJ/TOJad7B5dgwB363cTDSRe3s1SRqZns4Mu3Gem+AWmWMer+P2jE/36oqm4tfW3uAchkg8DiIb9VHmwxxKTbExQWHzgWJOT6ERY61x69xZaWfqutuan0+anwKptAUF36NUFFUlsIf2LCR8USc/rlZhlc8/PynR1bAIn8Tl7WwiPk3BfOik0bXNNXeMUzBKc5PqDp1Lg+R1ftoa6w5wDsbKxDHzhJYus1jYtJ0GXHoFKLuO0TjKfm8QkPAT5N6nfPjKsYbIfy34nhvLjCzdJes0628ra2x5sYncilV/BQfqEYcb5acoeeil3//StA9EkQcrEedX0aZi0kWCP+xJIOdJPtkC0VyTomcq62R0k7YVGAg/5qT4q4eGaCJp48SxJbiPL2TIKvhBHnHjZJWnZzGZirsdkptNvIcTrS5qTeiojy+l+21+e5PiMMm+eUTurm1N4A4Y6Sw20Zhl/UFOVc6+FLugrbLFrS569aK3x0dxLjSJ2vgKKL+GKKphbqOIfZ5Xez3uKiS1yqPk32Kl63jN9JzHrSaLeyZCPOJrPAvpOFn0vDzkefsGHCwU/aAc+3mtJg/lzxqN2UV8OnkL2xxetjq8upscXr5OBhkc5Yhjcfxf2QQ2bxVUp6ENiYyyiijV1HPAP1NmjOzNt9hAAAAAElFTkSuQmCC"
      },
      {
        "title": "Trainer Avatars are here",
        "items": [
          "Added a Trainer Avatar option when selecting Trainer Name. It displays on the top on the page title."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACh0lEQVR42u2XL3ODQBDF+1EqKyORkUhkZGTkSWRkZGQlHyEyMjIysrIfI47m0T7mZbsHBI6paJh5Q4H988vu3c715eV5Pa/va7FY1Kk0C9whW9cfqzBZiJMckoDnfDMJDv7/G7AoijqEcKcuIGsL/9kAEfx0OtXX6/VOhLTQuFtb+CPOLICaCEkoQhIed8JZOyopIEeDwrFdXvIhdknHDQLlee5WxVZR7112iDcJ0BuuTBBL3PVs308e3nDASLBjJba27G4easccowDf34rJc2/IXESeUe1ONZxnHdqExK9MrWQDO8uyeru+ge5XrfBchaw+7vL681hFhe+w8/wRN8mYQSANzgQKEYPj3xYQmg1Q4R6RhUwCGGsvBi1FgOvl2Irv1G6WNnvtRbLD4VKXZdkmVzgK72kD++aess0Kd6rWjQiIoavViQG233/sbaxJkHBkMA2K1iDharVpZNurbaYN7NliG3MUoMJpUCQ5V7sGIGx3jTw4Sm3gB38v7sOQBLS/mIDexmDVvHeQBdT4owH3YfmrvYcyRAFjrYbgZ9vM+JMAGRDB8dxsnlsyhWDbY8+whx/8WUXEHQXI3ctANuAmf20C2goCirIVhD387A/mffBu5mDWluq6ISAh2e5Ya1k5+uiSYWwF7oVk9ewooJhIIRVU1xu/WZ9Y7EFVjI2XGKCtJuWBxQAfGjfaUjsS5gLUfNDg+ecBWkgcOOGjG4TCe3zva6+uw84KKpy3FnWBc9wsl8v2nyKF4zt853jx4nj5eiG9Q4LdeRauS4S0E8E7NAweNZxXFlLPcUjcB0kbPVd6cOzI6IOqt3YUskveqUjhRh9cWfLYSXgInFdBGyfZ/yZ/dX0Bg/xPDmbu74gAAAAASUVORK5CYII="
      },
      {
        "title": "Ability, Met Location, and Preferred Title pickers",
        "items": [
          "Ability and Met Location now suggest matches as you type, the same way Species already does, while still accepting custom text that isn't on the list.",
          "Met Location suggestions are grouped into Generic and in-game Locations.",
          "Active Title has been renamed to Preferred Title. The picker now shows the Ribbon or Mark each title comes from, along with its icon, making similarly named titles easier to distinguish."
        ]
      },
      {
        "title": "Games added",
        "items": [
          "Added <b>Pokémon Omega Ruby and Pokémon Alpha Sapphire Special Demo Version</b> and <b>Pokémon Sun and Pokémon Moon Special Demo Version</b>.",
          "<b>Pokémon Omega Ruby and Pokémon Alpha Sapphire Special Demo Version</b> has a <b>Steelix</b> in the Japanese version and <b>Glalie</b> in the rest after completing the first adventure.",
          "<b>Pokémon Sun and Pokémon Moon Special Demo Version</b> has a gift <b>Ash Greninja</b> after the game saves after completing Professor Kukui's trial and battling Plumeria. This Greninja can be transferred to the main games.",
          "Added <b>Pokémon HOME</b>, <b>Pokémon Champions</b>, and <b>Pokémon Bank</b> as games."
        ],
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Added brand new Mega Abilities",
        "items": [
          "Added abilities for <b>Mega Baxcalibur</b>, <b>Mega Golisopod</b>, <b>Mega Lucario Z</b>, <b>Mega Absol Z</b>, and <b>Mega Garchomp Z</b>."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAH6UlEQVRIx52WeXCV1RmHn/N9d8vNehNAKUuiYDZcWCUmRkA2xaHigstYliLSDKaCyjKCgOgIIgIJSijFFqVIy7AoKJVNrEDgAiaQQEiBhIRsZiFkveTe3Pt9b/8IOMq4Td+Z89d7zu95z/5T/PaIARKA7mgqQimlxDCbgCqgALj0W0TUr+RtwNjomOhJQ1OHJCfd1T8qrsftRDjDsWo6rT4PBWVFuPNzGr45evjkxQsXNwE7AM+vAkXkxwmlHk9MTJw1O23GfeOTxxCsh0GDgEegXcHVWuqvfUdUQh/obMMnrezKPciytatyc3JyMkVk4016Pw9USi2YN3vu4oVpc5X9qg7HqqC2HbBTXVnE1nN72XMpm8So21n+8FxMSwCtaxgM7o5xq7BycxZzFs7LQJglIsYvAnWL/lbmspWvp49Po+1YNa3n6wmxhlNSd5ndZ/bx+dl9VHvqsNgcTL33GV5MmUR9az2IgFUREd8FZ0o3Nu/fwtQZ09a1tXmni4j5k0Cl1KKM9zLe+NMz6Vz4shh/E+h2G3vdO9nu3kppbTH33DaArq6uuAuPMjb5CaaOmkZjawOIIAIYJk6Xg/gxvdl2cAuTpk5YaZoyGzBvPjSPzZo1Z8ec2UvJPlhOs1cnYBp8unUF7vwDhAVHMGz4HxjxwJNUXz7PytVpRN/Rj+f/+DaaYRAwAh2Fm2CaBhFhDlJHRLP+r0tZuOj1acD6HwIdcbGxh3d/c2rgkVI/35a0oGwWDm96h6LsLwh1hGKP7Ezy2Gl0SxmNYdX5avkMys5kM3xmJjF33Ufb1VqU0r5fLSNgcmePcMbe4+LpR+4vdrvdA4HGG8AnVq39cFu38VNYlF1JWUgk+pbVXNu1gdABQ9CjbqE9ey9eTxNBfQYT+cTzeFuaqV+7EHuvO1FzMrHoGsEtzRiaDkCzadJFwYKkbnBkN1Oe/P2LAlkKUDE9e36RceT0mHENFmg2ofwiLH0VAgFYnAX3JsKXX8Pe7XD8G7AHQZ9+0NwI1RWQ9CBMnw9mADwe0DQQwDQhMpgdMUG8OSLpxOm8vFQN6Jk0ZFhyQZQLWpohwg6X8qH9GoQ4Yes6OFUA44fDsgyY/Sb0jIYzJ6CxFjp1guP74B8rIMIBriCwBiBIwCHg9XDU4SB55Oi+QIIGJPYeNChiu5igCVgFPE2ga+Cwgfs/sHgGvLsKyi/D5Mdh9QZ4eT70ioOWJtB02PcZrFsOThuEB4NmglWBBu+ZAaIHDLQB/TSgh6tXL3L97YAXlBfCHdDaCAnxMPOVjsEbVsLcabD0HagrgefGQUYGzH0NUh+ASBds/wj+tgLsAjYTlK9Dz+PDGR2DXdejNZvSwvXwYPB7gEbw10BCNIQ7oTAX7u8PG7Jg6pSOgj56H2a/AHP+DHu3wuAEWL4AVrwNfWLhn+th+3oIMzr0aIBAI4Q4CHI4QjQQBQZIA6grcK0MYl2Q0heKCmH+TChww4xnIWsxTHq840nf8zm8tQBeToMPloNqhMnjICoU/r0NKvLA2dqhKQ2ICqCUUppfpNloaQJbM0glGJXgL4OJD8C9cXDhAix5C9LTofAkpD0EWenw2rOQHA9FFyEzC6ZOh52fQtcIqK+D/MPgqAepAmsTeJrwen2tmkBVU0kpLls7SCnIJWg5CxFXYM5QuPvWjutx4Twsex9mLoLjR2BoV1j2CGSMg7QUiI+AM/nQUAMWP1wpBinq0HT68FaU0xbwV2nAueJvT7dM1hRYvgN1CfRyaDwDrjpY0B8SQ8HXDpF2qKiAd7fAtAzI3AK2q5DWGzJTYN1QiLNDsweCm0AVgV7BczYL5bn5ASBXA0pOHsrO6d/iB5cFpAKkHFQVNJyH0FqYdxskhcLVVgjT4D4X+Nvhkzx4aSe88ilsPQb1NR0wp4LbfOAvhhCDoX4Lxw8cOgcUaIBxoejihvr9+bzafTDoNaAug1YBlkpoLgZnJcwPh8E2KG2GJB1Wd4YXIqGrgrwa+OgcvHkMCq7A/UFwdwNcK2NizwFo7hJyv83ZBLTd+CmC+/a9J++E57iMrHpKOIVwGiEPIU8JuQiXEQ45hAFWYaRNKNSFK7pQhrBeE1KtQpxVeNQu5CCcRxJKRsnJ9pMy7MFhl4EuN9uNiW8sWSC58rk8WqKkyznk9kIk9nqL/y/SqwYJeQWx/k5J3CZkmBfpsg/RJmjCHVZxPKTk1hxEr0ZGXkSOGptlxZplArz8UyZK0zR91V82rnxp6HOh7PxuCnXtNywHIBDSCU5/BgeXQOwIcN4CpzZDwKvoM1ZISYegKHC2wLgeGZz7MowJj734d6+vbTrg+9H0rlsM3RkUvHbjv1bLVdkoR1tvkR01yLZqZHsNsteHrDiMxA9HYgYinXshwyYiS/Ygu64huz3IoSakTtbJZ3s+FFdE5DbAcbNB+x54PWHRlL787SXzpM38WlokXUp8yNlGpMJEPt6PxNyNjH4K+WAbUuBBKgQpaUeaZLL4ZL+sWbNU7LagD4HgH+j+NPAHHV5ITU0p3LXrA2n1fyKGvCGGPCYl1d3lYLZNWgJIQDqLIQ+LIa+L1/xY9h1YJ6NHjyi+vmf6TXq/yQi7gKf79es/YdSo5P6DBsU4eseG0qmTjt8vNDaalJV6OHmi1H/gqxNn3O7jm0A+AWr/X+d9IyzAnUBfTbP1dDiCQgF8Pp/HMLyVwCngbMd38svxP+K7vsn1e3fmAAAAAElFTkSuQmCC"
      },
      {
        "title": "Footer redesign",
        "items": [
          "Redesigned the footer with a cleaner layout.",
          "Updated the Poké Ball symbol with a new full-color design.",
          "The customizable app title now defaults to ALL CAPS and can be toggled between ALL CAPS and Sentence case by clicking it.",
          "Added a permanent footer decoration featuring a running Pikachu, with occasional guest appearances."
        ],
        "icon": "data:image/gif;base64,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"
      },
      {
        "title": "Top action bar",
        "items": [
          "Reordered the action bar to Add Pokémon, New, Last File, Import, Export, Share, Theme, and Settings, with Add Pokémon separated on the left.",
          "Settings and Theme now show text labels on desktop, and Theme displays the currently selected theme."
        ]
      },
      {
        "title": "Toolbar layout",
        "items": [
          "Grid Density and Sort remain pinned to the right, while Type, Game, and Form filters appear to their left.",
          "The Search field fills the remaining space and automatically shrinks when additional filters are added."
        ]
      },
      {
        "title": "🐞Bug Fixes",
        "items": [
          "Reduced the font size of tooltip text.",
          "The History icon now appears to the left of the History heading when the panel is opened.",
          "Cleaned up the label for the empty option in the Poké Ball dropdown."
        ]
      }
    ]
  },
  {
    "version": "v28",
    "entries": [
      {
        "title": "Added Moves",
        "items": [
          "Added a searchable <b>Move List</b>. Moves in Moveset by Game can now be selected from a list, similar to the Species picker, displaying each move's name and type. Selected moves are displayed as type-colored pills, while unmatched typed names continue to be saved as custom moves.",
          "Moves are displayed in bold when they share a type with the Pokémon's currently displayed typing, including its Stellar or Tera type.",
          "Moves are displayed in italic when they share a type with the Pokémon's Mega Evolution typing while Mega Evolution is not the currently displayed form, and in bold when Mega Evolution is currently displayed.",
          "Added support for Z-Moves, including a toggle that allows one move per row to be designated as the Z-Move.",
          "Max Moves and G-Max Moves now automatically replace Normal Moves when Gigantamax is enabled and the Gigantamax form is currently displayed, with species-specific G-Max Moves taking precedence over generic Max Moves.",
          "Added Max Guard/Max Strike and G-Max Move/Max Move swap controls where applicable."
        ],
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Added built-in Pokémon sprites",
        "items": [
          "Pokémon sprites are now provided automatically instead of requiring users to upload their own artwork. The new sprite system includes comprehensive species and form coverage, with automatic selection of the appropriate artwork. This is in contrary to v25's changelog that said placeholder sprites will never be added. The decision was changed so it is easier to the eyes.",
          "Added Species Database entries for Unown's 26 letters plus ! and ?, all 19 remaining Vivillon patterns, all 9 remaining Furfrou trims, Medium/Large/Jumbo Pumpkaboo and Gourgeist, Antique Form Sinistea and Polteageist, Masterpiece Form Sinistcha, Artisan Form Poltchageist, Ash-Greninja, Dada Zarude, and all 63 Alcremie forms.",
          "Added form-specific sprite selection for species with distinct artwork for different forms, including Necrozma, Giratina, Castform, Rotom, Dialga and Palkia's Origin Formes, Kyurem Black and White, Calyrex's Riders, Bloodmoon Ursaluna, and Pikachu's cap and costume forms.",
          "Added automatic gender-aware sprite selection for Meowstic, Indeedee, Basculegion, and Oinkologne.",
          "Mega Evolution and Gigantamax forms now use distinct form names where required, correctly identifying forms such as Mega Magearna Original Color and Gigantamax Toxtricity Amped Form."
        ]
      },
      {
        "title": "Added Characterstic selection",
        "items": [
          "The Detail View's Profile section now displays Characteristic instead of Games Logged. Games Logged has been moved alongside the Moveset by Game heading."
        ]
      },
      {
        "title": "History now tracks every change",
        "items": [
          "Previously limited to deletions, History now records Pokémon additions and edits as well, allowing any roster change to be reviewed or undone from the History panel.",
          "Adding or editing a Pokémon is recorded directly in History without displaying a toast, since there is no time-sensitive action requiring confirmation. Deletions continue to display the Undo toast first, with the deletion also being recorded in History as before.",
          "History entries now provide an action appropriate to the change: Restore for deletions, Revert for edits to return the Pokémon to its previous saved state, and Remove for additions."
        ]
      },
      {
        "title": "Shiny, Mega, and Gigantamax filters now match the rest of the toolbar",
        "items": [
          "The three filters are grouped into a single control, matching the grid density and Pokérus toggles instead of appearing as separate buttons.",
          "On narrow screens, the filters now show icons only, matching the grid density toggle and preventing their text labels from becoming cramped."
        ]
      },
      {
        "title": "Origin Games now sort by Generation",
        "items": [
          "Origin Games are now grouped and ordered by Generation instead of alphabetically.",
          "Alphabetical sorting is still available. The Poké Ball Order setting has been renamed to Sort Alphabetically and now controls the sorting of both Poké Balls and Origin Games."
        ]
      },
      {
        "title": "Added the GO Safari Ball",
        "items": [
          "<b>Pokémon GO</b>'s Safari Ball is now available as a separate Poké Ball, using its in-game name and artwork. The GO Safari Ball is an event-exclusive ball used during GO Wild Area events."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjggKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNi0wNi0zMFQwODoyNzo0NCswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMjYtMDgtMjVUMjA6MTc6MjIrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjYtMDgtMjVUMjA6MTc6MjIrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmFjNjU4OWQ5LWFmOTgtODA0MC1hOGRmLWEzY2U5YjEzNjMzNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDphYzY1ODlkOS1hZjk4LTgwNDAtYThkZi1hM2NlOWIxMzYzMzYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYzY1ODlkOS1hZjk4LTgwNDAtYThkZi1hM2NlOWIxMzYzMzYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmFjNjU4OWQ5LWFmOTgtODA0MC1hOGRmLWEzY2U5YjEzNjMzNiIgc3RFdnQ6d2hlbj0iMjAyNi0wNi0zMFQwODoyNzo0NCswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjggKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuvFTGMAAASoSURBVFiF7dZbbNN1FMDx7//3771bu9LuPjZ2cwLCZEOGA0EBJUpCBAkEiIkJiTECxuiLJvqALxgTfdCEhDcTNUaNUQn3jMAchE2uig7GbrCt3dbSdZeuXfu//Hwg8cGHQkrifNh5Pb+c88nJSX5HkVIymyFmtfscYA7wfwBYMiX7O44yPDLIld8vk7JaiJjzRGQ8GaguCSzL8fF0bHzwcX1ixO1R3aFpo+TCvdBYRwmT/TlOV1rz+6hvasJms7H22W3ZAf4VuUY6uTERubH/9t3eNQUO8Mg0yr0oI3HJQFHN61L1jQac3kPS4fhKgf5HnsD9UBCqmh+Lhj4c6b64t8o1JfK9ufhkknQsQdRqZ2bhEqbwkQgFCzv6bx2oLKneWOpZ/paCuKIomas/cAcURfEMjgQ/Gu46s7+5VBd6fh090s+MzYnV58LmVLGEh7hz/hpXr0fo1D2c7htsvt7dc8g0Ugs1/REAiqKI8Hh068mr7W/4K+tQl+xg3YbdbG9eTB9FtMZ8JDWDwMQoKyxRmi33MPpDhMISkQiuiAx0vj82IXOyBmiaVnit89Kb1csboaQewz6PDQ1PUFm9mLASoHtCEE9J0iYUuKA6D9YtymFBwE6e207LqYtbxsfGV2fqkXEHwuGRhujY0FNbn2+iYGYS3TbNuV9/ZqL7EnVTd6n1TmNKKz0JJ4lkgu6wTqkwKRIprt5MkmcTOXdv924BTmYF6L/Z0ZgWUD1xk3zfPHqEl55LHYjBGxSqDmxFfozCCoJjDs62dBGaHmdoQGdZoYPasnwKqxahSPPJrCcwHOr1a0Mh2kY7KSv2UlhTwYI8OzOOpeDKZVL1MKDZGU+GsTkEVXU+hN2NvaKRmtoK5pdU0dfV68waEKzcKPp++ADVB6lYgslQGLsrF/L8zNTOZ1TauXC5j7vDKuVVqyAVJR4P4SsuRfUUcrXjGhGLO5U14JlNr8XOn/uN061HKE9AeWUORZE4gdAkNaU5jE2pTMVyeXn3Pp5btZze3iDfHT5I69FTXPEUE52Ks/udt7WsAZvrSttzP/2Cr79ppv1iGzdiI1hiQxRoUWqP3SJmeFm78yD79mzHaoGmJVX8ebmNP+78QklVNa9sepEdL60fyBpgRV554bHy9ob33l3ZObCTv7q6uB0cZjgcZiQU5Pb1a+wo8lFmBR2YmJ4GTx4HPjlIU0M9fp835RWcyBpgmGZECHE44LSsXFNXzqq6cqYMyXRaw0im+PbYSX48dpwCj5vFdVV8eeIs5ZXVbF6/Gt0wITXTkeO2H8/UQ8l0lBqGgSJEniHl5ynNeNVQQEFBCIFNCKbSab5vaaWt4xJ2p4ul9UtZ39iIUBXS6XSkzOPe5XfZWlRVzRLA/ZyUcn5S0z9L6XLbP8+lRFgEUhGMx+MkdROLxUpKMzBNY9RlFfsK3M6fPHarYckAeNjveFBF2WsT3Expxh4NWWKYIHUDQ0pMVBQUkpqetKucCeQ6P55O6e0SjAcVftgJkNIMkFg1w1gS181dibS+UjPMYs00rcCEVYhOm0UckYo8Mc9hG5uc0fA6bHjtVjJNICPgv4hZvwnnAHOAWQf8DSXwC+jAy3K5AAAAAElFTkSuQmCC"
      },
      {
        "title": "Added a Monospace Font setting",
        "items": [
          "Users can now choose their preferred monospace font for stat labels, tags, Pokédex numbers, and other monospace text throughout the app."
        ]
      },
      {
        "title": "🐞Bug Fixes",
        "items": [
          "Fixed Mega Evolution typing not updating when the species was changed after a Mega Type had already been selected.",
          "Fixed the Stellar type pill on mobile so that its rounded corners render correctly without color bleeding beyond its edges.",
          "Special Z-Moves and G-Max Moves can now correctly apply to Mega Evolution, Primal Reversion, Ultra Burst, and Gigantamax forms by matching their alternate form names, such as \"Ultra Necrozma\" and \"Mega Charizard X\", when no separate Species Database entry exists for the form.",
          "Fixed Mega Zygarde being associated with Zygarde's 50% Forme instead of its Complete Forme in the Mega Types data.",
          "Fixed the hover glow on Shiny cards losing its distinct color when the Pokémon was also marked as Infected or Cured of Pokérus."
        ]
      },
      {
        "title": "Under the hood",
        "items": [
          "Reorganized the app's internal code for clarity. No user-facing changes.",
          "Identified several bugs that are currently being investigated and addressed."
        ],
        "knownIssue": true
      }
    ]
  },
  {
    "version": "v27",
    "entries": [
      {
        "title": "New",
        "items": [
          "Added Terastallization as a new Forms toggle alongside Mega Evolution and Gigantamax. When enabled, choose a Tera Type to add as a third type alongside a Pokémon's default typing, reusing its existing Default sprite rather than requiring a separate one.",
          "Added the Stellar type as a Tera Type option, available only through Terastallization.",
          "Each of Ogerpon's masks and Terapagos now Terastallize to one fixed type rather than a free choice. Terapagos always goes Stellar.",
          "Groudon, Kyogre, and both of Necrozma's fused forms now display their proper name and icon, Primal Reversion or Ultra Burst, instead of the generic Mega Evolution label wherever the Mega toggle appears. Eternatus receives the same treatment for Gigantamax, appearing as Eternamax.",
          "The Moveset by Game section now shows a Mega Ability in place of the normal Ability for species whose Mega Evolution has a fixed ability of its own, for any game that supports Mega Evolution.",
          "Added all of Pikachu's forms.",
          "<b>Pokémon GO</b>, <b>Pokémon Colosseum</b> and <b>Pokémon XD: Gale of Darkness</b> has been added as preset game."
        ],
        "icon": "data:image/gif;base64,R0lGODlhIgAiAPfgACkpMSmU/8al3jGM90K1/zlKUjmc/0Kt/+/G/yGE9zk5QimM9xAYITml/0o5WjFKUpx7ree9///O/yF79yl792tSeyExQvfO/9at5zGc9whC9zlCSjE5QjExQimM/7WUziFz99a174RrlEJSWt619yEhKTFCSmsYcxghKQAACM6E1jExOSEpMXtjjJyEtbWUxv/W///e/0JSUjGU/xAIIVJaYxgpMSkxOee990JKUjlSazlCUpR7pXtjlGNra84IEAhK9zlSUimc/1pjY1JjYzmt/5x7tc6l3t6179at70paWlpCYwgIGK2Mxr2czs6t5//v/2MA1sac1koAADml90JCSufWY5RzpWtjhEpaYzGl/6UIGKWEtUJ7zkJrjClShDEpMSGM9+8QEFpKc4xznCGM/zmc7zlCjFJScyFr90Kt9zE5SimE7wAAOVpSIZSMUjk5SiEASr2l1lpra0Jje4RrrTFKtSE5Y0pSWkpjY2NSe1KUxlo5c+/n1jGc/0qc3iEhOUql5///7ylz75R7vWtSc0JCY72c1u+9/62Mve+191Jztf///1pja62cSr29vWtje///rVJja1pKY///SufG/3NzQiFa55RznEJjnDE5Wsa9lBBS93NahGtzc1JjjBhS71Kc1kpznDlCWjGE51KEpSlKhDljlDFCUjExSkql3iEAa+f3/0KEvYQpjFp7hEqErUKUzlqMvSEIKUpCexgAWs6t72tjlDmE3mNSc1paUilCWiFS3ikxUhBC50qM3mMxe86l7+e1/1qExtat9zhHVyw7TLVCe97OQjk5GIGLlXNzc01aaZyUYy8+T7Wtc1JKWoSMjP//Y9a9MWNSY2taa//3hHt7hKWcY/fnrefenOfWQjGU9ymE9yk5SgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZFMEEwNEVDOTU4NTExRjFBMjhGOTFBMEE5MTI3RDdFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZFMEEwNEVEOTU4NTExRjFBMjhGOTFBMEE5MTI3RDdFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkUwQTA0RUE5NTg1MTFGMUEyOEY5MUEwQTkxMjdEN0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkUwQTA0RUI5NTg1MTFGMUEyOEY5MUEwQTkxMjdEN0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3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"
      },
      {
        "title": "🐞Bug Fixes",
        "items": [
          "Removed the separate Terapagos Terastal Form species entry now that Terastallization is handled by the Forms toggle.",
          "Moveset by Game Move fields no longer support rich text formatting. Existing entries with Bold or Italic formatting are cleaned up to plain text automatically when a save loads or is imported. This is done so that support for STAB moves which are signified by Bold text and Mega Moves which are signified by Italicized text can be added later."
        ]
      }
    ]
  },
  {
    "version": "v26",
    "entries": [
      {
        "title": "New",
        "items": [
          "Added a \"<b>New</b>\" option next to Import/Export to start a fresh, empty Pokédex. It warns you to save your current roster first, and offers an Undo right after in case you change your mind.",
          "Added a <b>✕</b> button inside the search box to instantly clear whatever you've typed.",
          "Added a \"Clear Filters\" button to the no-matches empty state, so an overly narrow search/filter combo is one click to reset.",
          "Added a back-to-top button that appears once you've scrolled down, for quickly returning to the header on long rosters.",
          "Deleting a Pokémon now also drops it into a <b>History</b> button that appears once its Undo toast has expired, so an accidental deletion is still recoverable after the toast is gone.",
          "Reworked the Sort control into a compact <b>⇅</b> menu with three keys (Added, Species, Nickname), each remembering its own direction (Oldest/Newest, A–Z/Z–A) independently.",
          "Added Pokérus as a status: Infected, None, or Cured, set from the edit form. Infected and Cured each get their own badge on the card, next to Shiny, and their own card glow color."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAA2FBMVEXrPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK7rPK4NMDeIAAAAR3RSTlMAAQMHCQsMDxEUFxofODo8P0FCRUdTWGFiY2RmaGpscXR4iYyNjpqfsLGztLe4ur6/wMLDxcbP0NHU19na3uDj6ezu8vP0+8JrisoAAAGMSURBVHhetdVrb4IwGIbhTgq4k8d5BMQpimNuIMqGss3hpv3//2idfQuNJvST97cnvYIxmIoulmpNrAJQGow6ZZBvhBAPA9AbQ8d1Hbupc/lMjxNmLfLfUqFDMxYHAh38rkol9o+LfeyEgFWMFBi0N5HKJJnAU8EuyVlRBAO+jEekeYiFlzLpKwhSwMqk3Ia5zOnH/CcXvy8JG7FIDQZchO5SLj9v0ZXLhpFLDc5rdDxxOqejzkaqCQ8tpOJjFzK64FI/CHTG6YyOGh860AaR0irQoZxaQB05nQJ1Oe3REfDxSkebD/eUbqo3PZL1eH2/OaVjIs0BasupDbQpp5X8FcjSEOSLYLvdftFSUa4QryvINoLaAjUzqu4z+Y2ykkzuMMoySVadyweS1UdCUW7X6/U7LclljAWpRqSgUKDYJ4UFKpclkBILt6LUMjqAGcbnJA5htI50xIZ/fmnu+hgH4k+rwyRcxTlcmZieqoHwvsoJHZ6CWHrVmrru2K5obDObwCgX/22glmOii/UH3BMcpnGqzPwAAAAASUVORK5CYII="
      },
      {
        "title": "Visual",
        "items": [
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
        "title": "🐞Bug Fixes",
        "items": [
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
    "version": "v25",
    "entries": [
      {
        "title": "Pokémon Species Picker",
        "items": [
          "All this time, users had to manually type names for Pokémon and select their types. With this feature, the species field will autocomplete everything for you once you select the Pokémon from the species picker.",
          "The database has National Pokédex species with all regional variants with typings.",
          "Demonyms show up for all Pokémon with a regional variant. Selected form from the picker are preserved.",
          "Users can still enter any Pokémon name manually. This helps with future Pokémon if it is not updated or even fan content or custom entires."
        ]
      },
      {
        "title": "Mega Pokémon Type",
        "items": [
          "Even though Mega Evolution could be enabled before, the types shown would be of the base Pokémon form.",
          "Now, Mega Pokémon will show their correct types separately from their base form."
        ],
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Dex Number Display",
        "items": [
          "National Dex Number will now be displayed when picking a Pokémon from the species list.",
          "This is not a separate labeled field.",
          "Dex Numbers are displayed in two places. Card/Detailed view and the Species picker."
        ]
      },
      {
        "title": "Sprites/Avatar",
        "items": [
          "Sprites and Avatars are still not automatic and that is a design choice. There are plenty of fanarts, alternate official arts that fans love. This tool will never add generic sprites/avatars for Pokémon by itself."
        ],
        "knownIssue": true
      }
    ]
  },
  {
    "version": "v24",
    "entries": [
      {
        "title": "Card hover effects",
        "items": [
          "Cards now tilt in 3D toward the cursor on hover.",
          "Added a soft border glow in each Pokémon's type colors, brightening as the cursor nears the card's edges.",
          "Shiny Pokémon get a noticeably brighter, wider glow."
        ]
      },
      {
        "title": "Dex Stats redesign",
        "items": [
          "Added Highlights at the top of the panel most common type, shiny rate, most-awarded Ribbon, and more, summarizing the standout numbers in your roster.",
          "Every section (Overview, Achievements, and the Top Origin Games/Natures/Poké Balls/Record Completeness lists) now shares one consistent card style.",
          "The panel now slides open/closed, and its bars and big numbers animate in instead of snapping into place.",
          "Trainer Notes is no longer tracked as a stat, since it's just a personal convenience field.",
          "Top Origin Games now shows each game's icon.",
          "Moves Logged and Abilities Logged now also show how many distinct moves/abilities that covers, since the raw logged count barely varies between rosters."
        ]
      },
      {
        "title": "Achievements section",
        "items": [
          "Ribbon/Mark/Misc categories and subcategories in the detail and edit views can now be collapsed and expanded by clicking their header, using the same open/close animation as the Dex Stats panel."
        ]
      },
      {
        "title": "New Bonus Achievement added",
        "items": [
          "Added the unique Pokémon Champions achievement for winning a match in Champion Tier. Grants <b>the Champion-Tiered</b> title."
        ]
      },
      {
        "title": "🐞Bug Fixes",
        "items": [
          "Fixed generation labels for future games showing as a plain number instead of a Roman numeral once past Generation IX."
        ]
      }
    ]
  },
  {
    "version": "v23",
    "entries": [
      {
        "title": "Card footer info setting",
        "items": [
          "Added a Settings option for what shows in each card's footer, next to the Share/Edit/Delete buttons: Origin Game → Last Game (default), Origin Game → Last Game (Icons Only), Age, Age with Met Date, Trainer Notes, Just Origin Game, Just Last Game, or None.",
          "Choosing None, or leaving the info blank for a given Pokémon, centers those buttons instead.",
          "The 6-per-row (desktop) and 2-per-row (mobile) dense grid view no longer shows footer info by default, keeping cards uncluttered at that size."
        ]
      },
      {
        "title": "Poké Ball order setting",
        "items": [
          "Added a Settings option to sort the Poké Ball picker alphabetically."
        ]
      },
      {
        "title": "Settings layout",
        "items": [
          "Moved Animated Sprite Format above Default Theme and Fonts.",
          "Widened the Settings modal so the Master Ball custom color pickers have room to breathe."
        ]
      },
      {
        "title": "🐞Bug Fixes",
        "items": [
          "Fixed the Settings modal clipping button labels that ran wider than their button.",
          "Fixed the Age display running the number and unit together with no space (e.g. \"21Years\" instead of \"21 Years\")."
        ]
      }
    ]
  },
  {
    "version": "v22",
    "entries": [
      {
        "title": "Pokéathlon medals",
        "items": [
          "Added the five Pokéathlon medals (Speed, Power, Skill, Stamina, Jump) to Achievements, and moved Pokéathlon Achievements above Bonus Achievements in the Miscellaneous section."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAbUExURf/vUggAOaVrGO8xUpwQShA5lMYhUtatMQAAAPbAEhgAAAAJdFJOU///////////AFNPeBIAAADASURBVHjajNNZEsQgCARQbDHm/iceQECNfkyXNUteSsUQej2tZFpco9OmUho/ElhCKa3WCpAFaBPDKDOUruZKaR/UdeluQynsxNIoTBA9pMsfLkXwSQztUhOeLxp3/T7QND835L0UDkTE5rSFUR2Rd8tSpEN+OmKZC37wUt5AmSuGqIa19EDkkOvM41T0ENqGshEP6/G9DTdUs0eGMkvBYvmwmX2/i802YRy2NJhWsdvamhLtziftr6a+vw4/AQYAW0AJUJMIH7MAAAAASUVORK5CYII="
      },
      {
        "title": "Autosave",
        "items": [
          "Your roster, trainer name, and settings now save to this browser automatically, so a reload picks up right where you left off.",
          "Export is still there for making a portable backup or moving your dex to another browser or device."
        ]
      },
      {
        "title": "Faster loading for large rosters",
        "items": [
          "The grid now loads Pokémon in batches instead of all at once, and loads more automatically as you scroll (or via a Load More button)."
        ]
      },
      {
        "title": "Search by achievement",
        "items": [
          "Search now matches earned ribbons, marks, and other achievements, alongside nickname, species, moves, and notes."
        ]
      },
      {
        "title": "Share as image",
        "items": [
          "Each card can now be shared or downloaded as an image, achievements and all.",
          "Added a Share button in the header to export your whole roster as a single image.",
          "Cards with an animated (APNG or GIF) sprite export as an animated image instead of a single frame.",
          "Added a Settings option to choose the animated export format: Animated PNG or GIF.",
          "On desktop, sharing downloads the image directly instead of opening a share dialog."
        ]
      },
      {
        "title": "Kode Mono replaces JetBrains Mono",
        "items": [
          "Switched the monospace font used throughout the Pokédex from JetBrains Mono to Kode Mono."
        ]
      }
    ]
  },
  {
    "version": "v21",
    "entries": [
      {
        "title": "Stats page and Master Ball updates",
        "items": [
          "The Stats page now shows your most awarded ribbon, plus how many Pokémon have a Contest Memory Ribbon and a Battle Memory Ribbon.",
          "Master Ball theme colors can now be typed in as a hex code, not just picked visually.",
          "General cleanup and small fixes under the hood."
        ]
      },
      {
        "title": "Fonts split into General and Nickname",
        "items": [
          "Settings now has separate General Font and Nickname Font pickers instead of one font for everything.",
          "This lets you keep the rest of the Pokédex easy to read while giving Pokémon nicknames their own more stylish look."
        ]
      },
      {
        "title": "Small cleanup",
        "items": [
          "Renamed an internal footer element that was being flagged by some browser extensions.",
          "Removed a redundant reset button now that the existing Default option already resets things properly."
        ]
      },
      {
        "title": "Custom achievement icons",
        "items": [
          "Creating a custom achievement now lets you pick which placeholder icon it uses (Ribbon, Mark, Diploma, or Star) instead of always defaulting to a Ribbon.",
          "The four icon choices are shown side-by-side so you can see and pick the one you want at a glance, rather than digging through a dropdown."
        ]
      },
      {
        "title": "Unreleased Achievements can now be force-enabled",
        "items": [
          "Unreleased Ribbons, Marks, and other achievements are still shown greyed out, just like before.",
          "Clicking one now shows a warning that it isn't available in any official Pokémon game yet, with the option to enable it anyway if you want to track it early. Turning it back off never needs a second warning.",
          "Once force-enabled, an achievement now looks, behaves, and displays exactly like any other earned achievement, instead of still showing an \"(Unreleased, force-enabled)\" note.",
          "Force-enabled achievements now correctly grant their title, just like a normally earned achievement."
        ]
      },
      {
        "title": "Preset games in Moveset by Game",
        "items": [
          "Each row in the Moveset by Game editor now has an icon picker next to the Tag field, letting you choose from every mainline Pokémon game grouped by generation, complete with that game's own icon.",
          "Picking a preset fills in the Tag field with the full game name (e.g. \"Pokémon Legends: Z-A\") and shows that game's icon next to it in the Pokémon's detail view.",
          "Typing a game's full name into the Tag field by hand links it up automatically too, so older tags (or anything just typed out) still pick up the right icon.",
          "The Tag field can still be typed into freely at any time for custom or non-standard tags."
        ],
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Custom fonts",
        "items": [
          "Settings now has a Fonts section where you can set the font used across the whole Pokédex.",
          "Pick a Google Font by typing its exact name, or load a font file straight from your own computer (.ttf, .otf, .woff, .woff2).",
          "A live preview card shows a sample name, species line, and sentence in the chosen font before you save, so you can check how it will look first.",
          "A font loaded from your computer is stored inside your exported JSON file, so it carries over the next time you import that file, even on a different device.",
          "A Reset Font to Default button clears the custom font and returns to the built-in Outfit font."
        ]
      },
      {
        "title": "Reset options for Settings",
        "items": [
          "The Master Ball theme panel now has its own Reset Master Ball Colors to Default button, separate from resetting the rest of Settings.",
          "Settings now has a Reset to Default button that restores Default Sort, Default Theme, the Master Ball colors, and the font all at once, with an Undo option in case it was tapped by mistake."
        ]
      },
      {
        "title": "Removed a redundant Settings option",
        "items": [
          "The Show Unreleased Achievements checkbox has been removed from Settings. It's no longer needed now that any unreleased achievement can be force-enabled individually just by clicking on it."
        ]
      },
      {
        "title": "Preset games in Origin Game and Last Game",
        "items": [
          "The Origin Game and Last Game fields now have the same icon picker used by Moveset by Game, letting you choose from every mainline Pokémon game grouped by generation.",
          "Picking a preset fills in the field with the full game name and shows that game's icon next to it.",
          "Typing a game's full name into either field by hand links it up automatically too, so existing entries still pick up the right icon.",
          "Both fields can still be typed into freely at any time for custom entries."
        ],
        "icon": "data:image/png;base64,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"
      },
      {
        "title": "Fixed Contest and Battle Memory Ribbons collapsing each other",
        "items": [
          "Opening the sub-ribbon list for Contest Memory Ribbon used to close Battle Memory Ribbon's list, and vice versa.",
          "Both can now be expanded and viewed at the same time."
        ]
      },
      {
        "title": "Added a Credits section",
        "items": [
          "A new Credits link in the footer opens a modal crediting the sources this Pokédex relies on."
        ]
      }
    ]
  },
  {
    "version": "v20",
    "entries": [
      {
        "title": "Added Achievements, Ribbons, Marks & Titles",
        "items": [
          "Each Pokémon can now track Ribbons, Marks, and other miscellaneous achievements, organized into categories and subcategories pulled from the official in-game lists (Contest Ribbons, Battle Tower Ribbons, Marks, and more).",
          "Memory Ribbons (Contest Memory Ribbon and Battle Memory Ribbon) support their own sub-collections, letting you record which specific memories have been earned rather than just an on/off toggle.",
          "The Contest Star Ribbon is auto-awarded based on a Pokémon's other contest ribbons, instead of needing to be selected manually.",
          "Added support for fully custom, user-defined achievements: give it a name, an icon, and a category tag, and it shows up alongside the official ones.",
          "Achievement-based titles (including a dynamic Partner Ribbon title that uses your partner trainer's name) are now computed automatically from whichever ribbons and marks a Pokémon has earned.",
          "Older exported .json files without achievement data still import correctly: missing fields are filled in with safe defaults."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABVUlEQVRYw+2XsQ4CMQhAb/UvHB1cjW7GyR/SX9D4PSb+gj/j4nKTiQYTLqRS2h7QcygJyXm08KSFa7uuSZMmfrJZb985+rdgk4CGQfu+F7U6ZAj2eO5EDUFds0XfcTDX2/6rnI3zoYJO7ScMfLrMBjh4BkVItFFAs/2JE1+rxaAhIAJJgGinczmfJoD3+ZIFRCC6xBSYAoKPaoBc1mLvJwGkWYxpuAerAdLgKTh4dgcExzFAabk5QAqpBqROU5CccnChn1GAx8P5p1eVQsbgQr8Qy/VgwO05Cud+gMg9rZSAmX6XacFISxVTOkdVGCWAEohkcwVMAaV+uy0xV9E5AJJdVbmaBm7ekC2PYZAVmm2TT5oWjgueO84FEDIEd4xU0BAS5mB2XbMXu7Vpx5svL80IV5HUlpPxKnvPap66UY8FdL/Ecw279M+5NehYQOvxTZo0KZQPQd4IKklwv8QAAAAASUVORK5CYII="
      }
    ]
  },
  {
    "version": "v19",
    "entries": [
      {
        "title": "Redesigned the Met Date field and added a year picker",
        "items": [
          "The Met Date field now shows Day, Month, and Year as separate boxes inside one field, instead of a single free text box.",
          "The ordinal suffix after the day (1st, 2nd, 3rd, 4th, and so on) is now always computed and shown as a true superscript. It is never something you type yourself, it just appears and updates as soon as you enter a day.",
          "Picking a year used to mean clicking Previous Month over and over. Clicking the month and year label at the top of the calendar now opens a year grid instead, so you can jump straight to a year, then drop back into the day view already on that year.",
          "The year grid moves a dozen years at a time with Previous Years and Next Years buttons, and future years past today are disabled, same as future days already were.",
          "Typing directly into the Day, Month, or Year boxes still works and updates the calendar to match as you go."
        ]
      },
      {
        "title": "Fixed the date picker being unreliable to click",
        "items": [
          "The Met Date calendar popover could get clipped or visually cut off by the edit form's scrolling container, which made parts of it unclickable and made it look like it was closing on its own.",
          "The calendar now positions itself against the screen directly instead of the form panel, so it always renders fully visible regardless of scroll position or which column the field sits in.",
          "The calendar flips to open above the field instead of below when there is not enough room beneath it.",
          "The calendar now closes cleanly when the form is scrolled or the window is resized, instead of drifting out of place."
        ]
      },
      {
        "title": "Fixed Mega and Gigantamax being editable from the detail view by mistake",
        "items": [
          "The detail view was showing Mega Evolution and Gigantamax switches even for Pokémon that did not have those forms enabled, and clicking them would incorrectly turn the form on.",
          "Enabling or disabling Mega Evolution and Gigantamax is only possible from the edit form now, exactly as intended.",
          "The detail view only shows a switch for a form once it has actually been enabled, and clicking it just changes which sprite is displayed."
        ]
      },
      {
        "title": "Mega and Gigantamax filters",
        "items": [
          "Added Mega and Gigantamax filter buttons next to the Shiny filter, each with its own icon.",
          "Renamed the \"Shiny Only\" filter label to just \"Shiny\"."
        ]
      },
      {
        "title": "Card and detail view improvements",
        "items": [
          "Restored the clickable Mega and Gigantamax badges on each card, which had been mistakenly removed in an earlier update.",
          "When Mega Evolution or Gigantamax is the active form, the species name now shows a \"MEGA\" or \"GIGANTAMAX\" prefix both on the card and in the detail view. This is a display label only and does not change the stored Species field."
        ]
      },
      {
        "title": "Edit form polish",
        "items": [
          "The Mega Evolution and Gigantamax toggle labels now show their icon next to the name.",
          "The Shiny toggle label was shortened from \"This Pokémon is shiny\" to just the shiny icon and \"SHINY\".",
          "The sprite preview boxes for Default, Mega Evolution, and Gigantamax were returned to their original smaller size after briefly stretching to fill the row.",
          "The sprite section's explanation text is now a hover tooltip instead of sitting inline next to the heading."
        ]
      }
    ]
  },
  {
    "version": "v18",
    "entries": [
      {
        "title": "Added Mega Evolution and Gigantamax forms",
        "items": [
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
        "title": "Replaced the native date picker",
        "items": [
          "The Met Date field no longer uses the browser's native calendar control, which couldn't be restyled to match the app and looked out of place.",
          "Built a custom calendar popover with month navigation, quick \"Today\", \"−1 Year\" and \"−5 Years\" shortcuts, and a \"Clear date\" option.",
          "Future dates are disabled in the calendar, consistent with the existing rule that a Pokémon can't be met in the future.",
          "Matches all three themes: Beast Ball, Poké Ball, and Master Ball (both Glassmorphic and Neumorphic styles)."
        ]
      },
      {
        "title": "Fixed unreadable dropdown menus on Master Ball theme",
        "items": [
          "Dropdown menu options (Type, Game, Sort, Nature, etc.) were hardcoded to a dark background, which made the text unreadable against itself whenever a Master Ball color combination didn't happen to match.",
          "Dropdown option colors now adapt to the actual background and text colors chosen in the Master Ball theme, for both Glassmorphic and Neumorphic styles.",
          "Switching away from Master Ball back to Beast Ball or Poké Ball no longer leaves a stale dropdown color behind."
        ]
      }
    ]
  },
  {
    "version": "v17",
    "entries": [
      {
        "title": "Fixed Save / Add Pokémon being broken",
        "items": [
          "Restored a missing closeForm function that had been accidentally deleted, which caused clicking \"Save Pokémon\" on both Add and Edit to throw an error and leave the form open without saving."
        ]
      },
      {
        "title": "Fixed Delete losing data on rapid successive deletes",
        "items": [
          "Deleting a second Pokémon before clicking \"Undo\" on the first used to permanently destroy the first Pokémon and only the most recent deletion could ever be restored.",
          "Rebuilt deletion/undo to use a stack of pending deletions instead of a single remembered slot, so deleting several Pokémon in a row now lets every one of them be undone, one at a time, most-recent-first.",
          "Pending deletions are now cleared on Import to avoid restoring a deleted Pokémon into the wrong, freshly-loaded roster."
        ]
      },
      {
        "title": "Added a Changelog",
        "items": [
          "Added a \"Changelog\" link in the footer that opens a scrollable history of every release."
        ]
      },
      {
        "title": "Added a Favicon",
        "items": [
          "Added a browser tab icon."
        ]
      },
      {
        "title": "🐞Bug Hunt",
        "items": [
          "Ran a full pass over every interactive feature (forms, modals, filters, sorting, theming, settings, import/export, sprite upload, rich text, stats dashboard, mobile layout) to check for errors; the two fixes above were the issues found."
        ]
      }
    ]
  },
  {
    "version": "v16",
    "entries": [
      {
        "title": "Improved the Age module",
        "items": [
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
    "version": "v15",
    "entries": [
      {
        "title": "Improved the Age module",
        "items": [
          "Rewrote the age calculation to eliminate negative day values that could occur across varying month lengths (for example, Pokémon met on the 31st and viewed during shorter months).",
          "Replaced the original implementation with a more robust calendar-anchor method and verified it across a wide range of dates, including leap years.",
          "Redesigned the display into two lines: a large age display (e.g. 10 Years 4 Months 9 Days) with a smaller \"Met on\" date underneath."
        ]
      }
    ]
  },
  {
    "version": "v14",
    "entries": [
      {
        "title": "Added the Age module",
        "items": [
          "Added a Met Date field to Edit Pokémon → History.",
          "Added an Age section to the detail view showing the elapsed time since the Pokémon was met."
        ]
      },
      {
        "title": "Added the Master Ball theme (experimental)",
        "items": [
          "Added a new custom theme with Glassmorphic and Neumorphic surface styles.",
          "Added four customizable color pickers: Background, Text, Accent, Accent/Highlight.",
          "Included theme settings in exported .json files."
        ]
      },
      {
        "title": "Fixed Master Ball theme issues",
        "items": [
          "Replaced several hardcoded shadow colors so cards, modals, and buttons now use the selected palette."
        ]
      },
      {
        "title": "Known Issue",
        "knownIssue": true,
        "items": [
          "The quick header theme toggle still did not recognize the Master Ball theme."
        ]
      }
    ]
  },
  {
    "version": "v13",
    "entries": [
      {
        "title": "Improved the Master Ball theme",
        "items": [
          "Fixed several visual issues introduced in v12."
        ]
      },
      {
        "title": "Known Issues",
        "knownIssue": true,
        "items": [
          "Neumorphic shadows and theme switching were still not functioning correctly."
        ]
      }
    ]
  },
  {
    "version": "v12",
    "entries": [
      {
        "title": "Added the Master Ball theme (experimental)",
        "items": [
          "Added a fully customizable theme option in Settings.",
          "Theme preferences are saved and restored through exported .json files."
        ]
      },
      {
        "title": "Known Issues",
        "knownIssue": true,
        "items": [
          "The theme was missing from the quick header theme switcher.",
          "Neumorphic shadows rendered incorrectly on dark custom backgrounds, producing bright white shadows."
        ]
      }
    ]
  },
  {
    "version": "v11",
    "entries": [
      {
        "title": "Improved the Gender module",
        "items": [
          "Replaced the Gender dropdown with three selectable buttons: ♂ Male (blue), ♀ Female (pink), ○ Genderless (purple).",
          "Clicking an already-selected button now clears the value.",
          "Removed the explicit \"Unset\" option while still allowing the field to remain blank.",
          "Updated the Stats Dashboard to display gender percentages based only on Pokémon with a recorded gender."
        ]
      }
    ]
  },
  {
    "version": "v10",
    "entries": [
      {
        "title": "Added Settings Persistence",
        "items": [
          "Added a new Settings panel for Default Sort and Default Theme.",
          "Settings are now saved to exported .json files and restored automatically when imported."
        ]
      }
    ]
  },
  {
    "version": "v9",
    "entries": [
      {
        "title": "Expanded Search",
        "items": [
          "Search now matches nickname, species, nature, gender, ball, ability, met location, and move names."
        ]
      },
      {
        "title": "Added Shiny Filter",
        "items": [
          "Added a Shiny Only toggle.",
          "Can be combined with existing Type and Game filters."
        ]
      }
    ]
  },
  {
    "version": "v8",
    "entries": [
      {
        "title": "Added Undo Delete",
        "items": [
          "Pokémon are now deleted immediately without a confirmation dialog.",
          "A temporary toast notification provides an Undo button that restores the Pokémon to its original position."
        ]
      }
    ]
  },
  {
    "version": "v7",
    "entries": [
      {
        "title": "Added the Stats Dashboard",
        "items": [
          "Expandable dashboard showing type distribution, shiny count, games represented, most common natures, most common Poké Balls, and record completeness."
        ]
      }
    ]
  },
  {
    "version": "v6",
    "entries": [
      {
        "title": "Added Sorting",
        "items": [
          "Recently Added, Oldest Added, Name (A–Z), Species (A–Z)."
        ]
      },
      {
        "title": "Added Original Trainer Support",
        "items": [
          "Set an Original Trainer name.",
          "The page title updates to \"[Trainer]'s Pokédex\"."
        ]
      }
    ]
  },
  {
    "version": "v5",
    "entries": [
      {
        "title": "Added Import / Export",
        "items": [
          "Import and export the Pokédex as .json.",
          "Remembers the most recently opened file."
        ]
      }
    ]
  },
  {
    "version": "v4",
    "entries": [
      {
        "title": "Added Moveset by Game",
        "items": [
          "Track a Pokémon's Ability and up to four moves for each game appearance."
        ]
      }
    ]
  },
  {
    "version": "v3",
    "entries": [
      {
        "title": "Added Shiny Tracking",
        "items": [
          "Added a sparkle badge and animated shimmer effect for shiny Pokémon."
        ]
      },
      {
        "title": "Added Filtering",
        "items": [
          "Filter by Type.",
          "Filter by Game."
        ]
      }
    ]
  },
  {
    "version": "v2",
    "entries": [
      {
        "title": "Added Detail View",
        "items": [
          "Click a Pokémon card to view its Nature, Gender, Met Location, Ball, Origin Game, and Last Game."
        ]
      },
      {
        "title": "Added Edit Pokémon",
        "items": [
          "Create and edit Pokémon entries."
        ]
      }
    ]
  },
  {
    "version": "v1",
    "entries": [
      {
        "title": "Initial Release",
        "items": [
          "Card-based roster displaying each Pokémon's Nickname, Species, and Type(s).",
          "Type-tinted card styling."
        ],
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtElEQVRYhe2WQQ5AMBBFHaXXcAVHcBVL17B0FUtXcAxbMpKRj6mg0wqZn/xIo/FeK6RZZrFYvhjn3CQ1GdiXqCJnYMzQj/oSV+FRJO7CWUBN4lWBJ3AUCJYIWf1/BNq2ewyvqjpcoCnyjQSNuT4ww2mOigCWZehKYwmKVfkS8MGYPQwbvP0oQKtbtro87oAEpvl0X/VviBJrhXevDkcJerAPyuAocJRgEanJzwXJDyQWiyVGZoHGGxJrvY0hAAAAAElFTkSuQmCC"
      }
    ]
  }
];
