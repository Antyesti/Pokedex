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
    title: 'Icons & Artwork',
    items: [
      'Poké Ball, Ribbon, and Mega Evolution / Gigantamax icons are provided by <a href="https://github.com/msikma/pokesprite" target="_blank" rel="noopener noreferrer" class="footer-github-link">msikma/pokesprite</a> and <a class="species-link"><b>Bulbapedia</b></a>.',
      'Game version icons until Gen 3 are by <a href="https://steamcommunity.com/id/WildCh1mera/" target="_blank" rel="noopener noreferrer" class="footer-discord-link">WildCh1mera</a> and sourced from <b>steamgriddb</b>.'
    ]
  },
  {
    title: 'Libraries',
    items: [
      'Animated-PNG share exports are built with <a href="https://github.com/photopea/UPNG.js" target="_blank" rel="noopener noreferrer" class="footer-github-link">UPNG.js</a> and <a href="https://github.com/nodeca/pako" target="_blank" rel="noopener noreferrer" class="footer-github-link">pako</a>; GIF exports and animated GIF sprite reading use <a href="https://github.com/matt-way/gifuct-js" target="_blank" rel="noopener noreferrer" class="footer-github-link">gifuct-js</a> and <a href="https://github.com/mattdesl/gifenc" target="_blank" rel="noopener noreferrer" class="footer-github-link">gifenc</a>. All MIT-licensed.'
    ]
  },
  {
    title: 'Research & References',
    items: [
      'A significant amount of information was researched and verified using Bulbapedia. As a small thank you to Bulbapedia for being an invaluable resource over the years, every Pokémon species in this Pokédex includes a direct link to its corresponding Bulbapedia page, making it easy to jump to more detailed information whenever you need it.'
    ]
  }
];

const CHANGELOG = [
  { version:'v23', entries:[
    { title:'Card footer info setting', items:[
      'Added a Settings option for what shows in each card\'s footer, next to the Share/Edit/Delete buttons: Origin Game → Last Game (default), Origin Game → Last Game (Icons Only), Age, Age with Met Date, Trainer Notes, Just Origin Game, Just Last Game, or None.',
      'Choosing None, or leaving the info blank for a given Pokémon, centers those buttons instead.',
      'The 6-per-row (desktop) and 2-per-row (mobile) dense grid view no longer shows footer info by default, keeping cards uncluttered at that size.'
    ]},
    { title:'Poké Ball order setting', items:[
      'Added a Settings option to sort the Poké Ball picker alphabetically.'
    ]},
    { title:'Settings layout', items:[
      'Moved Animated Sprite Format above Default Theme and Fonts.',
      'Widened the Settings modal so the Master Ball custom color pickers have room to breathe.'
    ]},
    { title:'Bug fixes', items:[
      'Fixed the Settings modal clipping button labels that ran wider than their button.',
      'Fixed the Age display running the number and unit together with no space (e.g. "21Years" instead of "21 Years").'
    ]}
  ]},
  { version:'v22', entries:[
    { title:'Pokéathlon medals', items:[
      'Added the five Pokéathlon medals (Speed, Power, Skill, Stamina, Jump) to Achievements, and moved Pokéathlon Achievements above Bonus Achievements in the Miscellaneous section.'
    ]},
    { title:'Autosave', items:[
      'Your roster, trainer name, and settings now save to this browser automatically, so a reload picks up right where you left off.',
      'Export is still there for making a portable backup or moving your dex to another browser or device.'
    ]},
    { title:'Faster loading for large rosters', items:[
      'The grid now loads Pokémon in batches instead of all at once, and loads more automatically as you scroll (or via a Load More button).'
    ]},
    { title:'Search by achievement', items:[
      'Search now matches earned ribbons, marks, and other achievements, alongside nickname, species, moves, and notes.'
    ]},
    { title:'Share as image', items:[
      'Each card can now be shared or downloaded as an image, achievements and all.',
      'Added a Share button in the header to export your whole roster as a single image.',
      'Cards with an animated (APNG or GIF) sprite export as an animated image instead of a single frame.',
      'Added a Settings option to choose the animated export format: Animated PNG or GIF.',
      'On desktop, sharing downloads the image directly instead of opening a share dialog.'
    ]},
    { title:'Kode Mono replaces JetBrains Mono', items:[
      'Switched the monospace font used throughout the Pokédex from JetBrains Mono to Kode Mono.'
    ]}
  ]},
  { version:'v21.5', entries:[
    { title:'Stats page and Master Ball updates', items:[
      'The Stats page now shows your most awarded ribbon, plus how many Pokémon have a Contest Memory Ribbon and a Battle Memory Ribbon.',
      'Master Ball theme colors can now be typed in as a hex code, not just picked visually.',
      'General cleanup and small fixes under the hood.'
    ]},
    { title:'Fonts split into General and Nickname', items:[
      'Settings now has separate General Font and Nickname Font pickers instead of one font for everything.',
      'This lets you keep the rest of the Pokédex easy to read while giving Pokémon nicknames their own more stylish look.'
    ]},
    { title:'Small cleanup', items:[
      'Renamed an internal footer element that was being flagged by some browser extensions.',
      'Removed a redundant reset button now that the existing Default option already resets things properly.'
    ]}
  ]},
  { version:'v21', entries:[
    { title:'Custom achievement icons', items:[
      'Creating a custom achievement now lets you pick which placeholder icon it uses (Ribbon, Mark, Diploma, or Star) instead of always defaulting to a Ribbon.',
      'The four icon choices are shown side-by-side so you can see and pick the one you want at a glance, rather than digging through a dropdown.'
    ]},
    { title:'Unreleased Achievements can now be force-enabled', items:[
      'Unreleased Ribbons, Marks, and other achievements are still shown greyed out, just like before.',
      'Clicking one now shows a warning that it isn\'t available in any official Pokémon game yet, with the option to enable it anyway if you want to track it early. Turning it back off never needs a second warning.',
      'Once force-enabled, an achievement now looks, behaves, and displays exactly like any other earned achievement, instead of still showing an "(Unreleased, force-enabled)" note.',
      'Force-enabled achievements now correctly grant their title, just like a normally earned achievement.'
    ]},
    { title:'Preset games in Moveset by Game', items:[
      'Each row in the Moveset by Game editor now has an icon picker next to the Tag field, letting you choose from every mainline Pokémon game grouped by generation, complete with that game\'s own icon.',
      'Picking a preset fills in the Tag field with the full game name (e.g. "Pokémon Legends: Z-A") and shows that game\'s icon next to it in the Pokémon\'s detail view.',
      'Typing a game\'s full name into the Tag field by hand links it up automatically too, so older tags (or anything just typed out) still pick up the right icon.',
      'The Tag field can still be typed into freely at any time for custom or non-standard tags.'
    ]},
    { title:'Custom fonts', items:[
      'Settings now has a Fonts section where you can set the font used across the whole Pokédex.',
      'Pick a Google Font by typing its exact name, or load a font file straight from your own computer (.ttf, .otf, .woff, .woff2).',
      'A live preview card shows a sample name, species line, and sentence in the chosen font before you save, so you can check how it will look first.',
      'A font loaded from your computer is stored inside your exported JSON file, so it carries over the next time you import that file, even on a different device.',
      'A Reset Font to Default button clears the custom font and returns to the built-in Outfit font.'
    ]},
    { title:'Reset options for Settings', items:[
      'The Master Ball theme panel now has its own Reset Master Ball Colors to Default button, separate from resetting the rest of Settings.',
      'Settings now has a Reset to Default button that restores Default Sort, Default Theme, the Master Ball colors, and the font all at once, with an Undo option in case it was tapped by mistake.'
    ]},
    { title:'Removed a redundant Settings option', items:[
      'The Show Unreleased Achievements checkbox has been removed from Settings. It\'s no longer needed now that any unreleased achievement can be force-enabled individually just by clicking on it.'
    ]},
    { title:'Preset games in Origin Game and Last Game', items:[
      'The Origin Game and Last Game fields now have the same icon picker used by Moveset by Game, letting you choose from every mainline Pokémon game grouped by generation.',
      'Picking a preset fills in the field with the full game name and shows that game\'s icon next to it.',
      'Typing a game\'s full name into either field by hand links it up automatically too, so existing entries still pick up the right icon.',
      'Both fields can still be typed into freely at any time for custom entries.'
    ]},
    { title:'Fixed Contest and Battle Memory Ribbons collapsing each other', items:[
      'Opening the sub-ribbon list for Contest Memory Ribbon used to close Battle Memory Ribbon\'s list, and vice versa.',
      'Both can now be expanded and viewed at the same time.'
    ]},
    { title:'Added a Credits section', items:[
      'A new Credits link in the footer opens a modal crediting the sources this Pokédex relies on.'
    ]}
  ]},
  { version:'v20', entries:[
    { title:'Added Achievements, Ribbons, Marks & Titles', items:[
      'Each Pokémon can now track Ribbons, Marks, and other miscellaneous achievements, organized into categories and subcategories pulled from the official in-game lists (Contest Ribbons, Battle Tower Ribbons, Marks, and more).',
      'Memory Ribbons (Contest Memory Ribbon and Battle Memory Ribbon) support their own sub-collections, letting you record which specific memories have been earned rather than just an on/off toggle.',
      'The Contest Star Ribbon is auto-awarded based on a Pokémon\'s other contest ribbons, instead of needing to be selected manually.',
      'Added support for fully custom, user-defined achievements: give it a name, an icon, and a category tag, and it shows up alongside the official ones.',
      'Achievement-based titles (including a dynamic Partner Ribbon title that uses your partner trainer\'s name) are now computed automatically from whichever ribbons and marks a Pokémon has earned.',
      'Older exported .json files without achievement data still import correctly: missing fields are filled in with safe defaults.'
    ]}
  ]},
  { version:'v19', entries:[
    { title:'Redesigned the Met Date field and added a year picker', items:[
      'The Met Date field now shows Day, Month, and Year as separate boxes inside one field, instead of a single free text box.',
      'The ordinal suffix after the day (1st, 2nd, 3rd, 4th, and so on) is now always computed and shown as a true superscript. It is never something you type yourself, it just appears and updates as soon as you enter a day.',
      'Picking a year used to mean clicking Previous Month over and over. Clicking the month and year label at the top of the calendar now opens a year grid instead, so you can jump straight to a year, then drop back into the day view already on that year.',
      'The year grid moves a dozen years at a time with Previous Years and Next Years buttons, and future years past today are disabled, same as future days already were.',
      'Typing directly into the Day, Month, or Year boxes still works and updates the calendar to match as you go.'
    ]},
    { title:'Fixed the date picker being unreliable to click', items:[
      'The Met Date calendar popover could get clipped or visually cut off by the edit form\'s scrolling container, which made parts of it unclickable and made it look like it was closing on its own.',
      'The calendar now positions itself against the screen directly instead of the form panel, so it always renders fully visible regardless of scroll position or which column the field sits in.',
      'The calendar flips to open above the field instead of below when there is not enough room beneath it.',
      'The calendar now closes cleanly when the form is scrolled or the window is resized, instead of drifting out of place.'
    ]},
    { title:'Fixed Mega and Gigantamax being editable from the detail view by mistake', items:[
      'The detail view was showing Mega Evolution and Gigantamax switches even for Pokémon that did not have those forms enabled, and clicking them would incorrectly turn the form on.',
      'Enabling or disabling Mega Evolution and Gigantamax is only possible from the edit form now, exactly as intended.',
      'The detail view only shows a switch for a form once it has actually been enabled, and clicking it just changes which sprite is displayed.'
    ]},
    { title:'Mega and Gigantamax filters', items:[
      'Added Mega and Gigantamax filter buttons next to the Shiny filter, each with its own icon.',
      'Renamed the "Shiny Only" filter label to just "Shiny".'
    ]},
    { title:'Card and detail view improvements', items:[
      'Restored the clickable Mega and Gigantamax badges on each card, which had been mistakenly removed in an earlier update.',
      'When Mega Evolution or Gigantamax is the active form, the species name now shows a "MEGA" or "GIGANTAMAX" prefix both on the card and in the detail view. This is a display label only and does not change the stored Species field.'
    ]},
    { title:'Edit form polish', items:[
      'The Mega Evolution and Gigantamax toggle labels now show their icon next to the name.',
      'The Shiny toggle label was shortened from "This Pokémon is shiny" to just the shiny icon and "SHINY".',
      'The sprite preview boxes for Default, Mega Evolution, and Gigantamax were returned to their original smaller size after briefly stretching to fill the row.',
      'The sprite section\'s explanation text is now a hover tooltip instead of sitting inline next to the heading.'
    ]}
  ]},
  { version:'v18', entries:[
    { title:'Added Mega Evolution and Gigantamax forms', items:[
      'Added two independent toggles per Pokémon, Mega Evolution and Gigantamax, that can be on, off, or both at once.',
      'Each Pokémon now supports up to three sprites: Default (always available), Mega Evolution, and Gigantamax. The latter two only become available once their toggle is enabled.',
      'Added Mega and Gigantamax badge icons in the same corner as the Shiny indicator on every card. Clicking a badge switches that card to show the corresponding sprite; clicking it again switches back to Default.',
      'If a form is enabled but has no sprite uploaded for it, the card automatically falls back to showing the Default sprite instead of a broken image.',
      'Turning a form toggle off clears its uploaded sprite and resets the displayed sprite back to Default, so re-enabling it later starts from a clean slate.',
      'Added a matching Forms switcher in the detail view for Pokémon with at least one form enabled.',
      'Older exported .json files without these fields still import correctly: missing fields are filled in with safe defaults.'
    ]},
    { title:'Replaced the native date picker', items:[
      'The Met Date field no longer uses the browser\'s native calendar control, which couldn\'t be restyled to match the app and looked out of place.',
      'Built a custom calendar popover with month navigation, quick "Today", "−1 Year" and "−5 Years" shortcuts, and a "Clear date" option.',
      'Future dates are disabled in the calendar, consistent with the existing rule that a Pokémon can\'t be met in the future.',
      'Matches all three themes: Beast Ball, Poké Ball, and Master Ball (both Glassmorphic and Neumorphic styles).'
    ]},
    { title:'Fixed unreadable dropdown menus on Master Ball theme', items:[
      'Dropdown menu options (Type, Game, Sort, Nature, etc.) were hardcoded to a dark background, which made the text unreadable against itself whenever a Master Ball color combination didn\'t happen to match.',
      'Dropdown option colors now adapt to the actual background and text colors chosen in the Master Ball theme, for both Glassmorphic and Neumorphic styles.',
      'Switching away from Master Ball back to Beast Ball or Poké Ball no longer leaves a stale dropdown color behind.'
    ]}
  ]},
  { version:'v17', entries:[
    { title:'Fixed Save / Add Pokémon being broken', items:[
      'Restored a missing closeForm function that had been accidentally deleted, which caused clicking "Save Pokémon" on both Add and Edit to throw an error and leave the form open without saving.'
    ]},
    { title:'Fixed Delete losing data on rapid successive deletes', items:[
      'Deleting a second Pokémon before clicking "Undo" on the first used to permanently destroy the first Pokémon and only the most recent deletion could ever be restored.',
      'Rebuilt deletion/undo to use a stack of pending deletions instead of a single remembered slot, so deleting several Pokémon in a row now lets every one of them be undone, one at a time, most-recent-first.',
      'Pending deletions are now cleared on Import to avoid restoring a deleted Pokémon into the wrong, freshly-loaded roster.'
    ]},
    { title:'Added a Changelog', items:[
      'Added a "Changelog" link in the footer that opens a scrollable history of every release.'
    ]},
    { title:'Added a Favicon', items:[
      'Added a browser tab icon.'
    ]},
    { title:'Bug hunt', items:[
      'Ran a full pass over every interactive feature (forms, modals, filters, sorting, theming, settings, import/export, sprite upload, rich text, stats dashboard, mobile layout) to check for errors; the two fixes above were the issues found.'
    ]}
  ]},
  { version:'v16', entries:[
    { title:'Improved the Age module', items:[
      'Centered the Years / Months / Days unit labels alongside the large numerals instead of allowing them to sink to the text baseline.',
      'Corrected the alignment of the clock icon beside "Met on".',
      'Moved the Age section above Trainer Notes in the detail view.',
      'Made the met date bold while keeping the "Met on" label at regular weight (e.g. 1st October 2004).',
      'Added spacing between the age and met-date lines for a cleaner layout.',
      'Added a small clock icon before "Met on" for improved readability.'
    ]}
  ]},
  { version:'v15', entries:[
    { title:'Improved the Age module', items:[
      'Rewrote the age calculation to eliminate negative day values that could occur across varying month lengths (for example, Pokémon met on the 31st and viewed during shorter months).',
      'Replaced the original implementation with a more robust calendar-anchor method and verified it across a wide range of dates, including leap years.',
      'Redesigned the display into two lines: a large age display (e.g. 10 Years 4 Months 9 Days) with a smaller "Met on" date underneath.'
    ]}
  ]},
  { version:'v14', entries:[
    { title:'Added the Age module', items:[
      'Added a Met Date field to Edit Pokémon → History.',
      'Added an Age section to the detail view showing the elapsed time since the Pokémon was met.'
    ]},
    { title:'Added the Master Ball theme (experimental)', items:[
      'Added a new custom theme with Glassmorphic and Neumorphic surface styles.',
      'Added four customizable color pickers: Background, Text, Accent, Accent/Highlight.',
      'Included theme settings in exported .json files.'
    ]},
    { title:'Fixed Master Ball theme issues', items:[
      'Replaced several hardcoded shadow colors so cards, modals, and buttons now use the selected palette.'
    ]},
    { title:'Known Issue', knownIssue:true, items:[
      'The quick header theme toggle still did not recognize the Master Ball theme.'
    ]}
  ]},
  { version:'v13', entries:[
    { title:'Improved the Master Ball theme', items:[
      'Fixed several visual issues introduced in v12.'
    ]},
    { title:'Known Issues', knownIssue:true, items:[
      'Neumorphic shadows and theme switching were still not functioning correctly.'
    ]}
  ]},
  { version:'v12', entries:[
    { title:'Added the Master Ball theme (experimental)', items:[
      'Added a fully customizable theme option in Settings.',
      'Theme preferences are saved and restored through exported .json files.'
    ]},
    { title:'Known Issues', knownIssue:true, items:[
      'The theme was missing from the quick header theme switcher.',
      'Neumorphic shadows rendered incorrectly on dark custom backgrounds, producing bright white shadows.'
    ]}
  ]},
  { version:'v11', entries:[
    { title:'Improved the Gender module', items:[
      'Replaced the Gender dropdown with three selectable buttons: ♂ Male (blue), ♀ Female (pink), ○ Genderless (purple).',
      'Clicking an already-selected button now clears the value.',
      'Removed the explicit "Unset" option while still allowing the field to remain blank.',
      'Updated the Stats Dashboard to display gender percentages based only on Pokémon with a recorded gender.'
    ]}
  ]},
  { version:'v10', entries:[
    { title:'Added Settings Persistence', items:[
      'Added a new Settings panel for Default Sort and Default Theme.',
      'Settings are now saved to exported .json files and restored automatically when imported.'
    ]}
  ]},
  { version:'v9', entries:[
    { title:'Expanded Search', items:[
      'Search now matches nickname, species, nature, gender, ball, ability, met location, and move names.'
    ]},
    { title:'Added Shiny Filter', items:[
      'Added a Shiny Only toggle.',
      'Can be combined with existing Type and Game filters.'
    ]}
  ]},
  { version:'v8', entries:[
    { title:'Added Undo Delete', items:[
      'Pokémon are now deleted immediately without a confirmation dialog.',
      'A temporary toast notification provides an Undo button that restores the Pokémon to its original position.'
    ]}
  ]},
  { version:'v7', entries:[
    { title:'Added the Stats Dashboard', items:[
      'Expandable dashboard showing type distribution, shiny count, games represented, most common natures, most common Poké Balls, and record completeness.'
    ]}
  ]},
  { version:'v6', entries:[
    { title:'Added Sorting', items:[
      'Recently Added, Oldest Added, Name (A–Z), Species (A–Z).'
    ]},
    { title:'Added Original Trainer Support', items:[
      'Set an Original Trainer name.',
      'The page title updates to "[Trainer]\'s Pokédex".'
    ]}
  ]},
  { version:'v5', entries:[
    { title:'Added Import / Export', items:[
      'Import and export the Pokédex as .json.',
      'Remembers the most recently opened file.'
    ]}
  ]},
  { version:'v4', entries:[
    { title:'Added Moveset by Game', items:[
      'Track a Pokémon\'s Ability and up to four moves for each game appearance.'
    ]}
  ]},
  { version:'v3', entries:[
    { title:'Added Shiny Tracking', items:[
      'Added a sparkle badge and animated shimmer effect for shiny Pokémon.'
    ]},
    { title:'Added Filtering', items:[
      'Filter by Type.',
      'Filter by Game.'
    ]}
  ]},
  { version:'v2', entries:[
    { title:'Added Detail View', items:[
      'Click a Pokémon card to view its Nature, Gender, Met Location, Ball, Origin Game, and Last Game.'
    ]},
    { title:'Added Edit Pokémon', items:[
      'Create and edit Pokémon entries.'
    ]}
  ]},
  { version:'v1', entries:[
    { title:'Initial Release', items:[
      'Card-based roster displaying each Pokémon\'s Nickname, Species, and Type(s).',
      'Type-tinted card styling.'
    ]}
  ]}
];

