# ✨Pokédex

A single-page web app for keeping track of a personal Pokémon collection. It stores
nicknames, species, types, natures, met information, sprites, per-game moves and
abilities, and achievements and ribbons. Everything runs in the browser, so
`index.html` can be opened directly from disk without a build step or server.

<img width="1487" height="743" alt="image" src="https://github.com/user-attachments/assets/2f7ccb24-cfdb-46c8-a647-a51602549409" />

## Latest as on v24
https://github.com/user-attachments/assets/99e7a7d6-f54e-4556-bac1-09dd27ea0f24


## 🔖Features

### 🧬Roster & Pokémon records
- Add, edit, or delete Pokémon with a nickname, species, up to two types (with
  official type colors), nature (with stat up/down tooltip), gender, and a
  shiny toggle.
- **Pokérus** status: Infected / None / Cured, set from a segmented toggle
  in the edit form. Infected and Cured each get a badge (left of the Shiny
  badge) on the card and in the detail view. Infected blends its color into
  the card's own type gradient as a middle stop and tints the card border;
  Cured keeps the border tint but drops the gradient blend.
- **Memories** section per Pokémon: rich-text Met Location (supports
  superscript, e.g. for footnotes/ordinal marks), Met Date, Housed Poké Ball,
  Origin Game, Last Game, and rich-text Trainer Notes (bold, italic,
  underline, strikethrough, superscript, subscript).
- **Origin Game** and **Last Game** each have an icon dropdown (grouped by
  generation, Gen I-IX) next to the text field. Pick a game from the list to
  auto-fill its full name and badge, or type freehand and the icon still
  attaches automatically if the text matches a known game name (case- and
  punctuation-insensitive, "Pokémon" prefix optional).
- Mega Evolution and Gigantamax toggles, each with their own optional sprite
  slot in addition to the default sprite. A "preferred display form" can be
  set per Pokémon (used as the card artwork) once a form is enabled.
- Custom Original Trainer name and partner-trainer title prefix (e.g.
  "Ash's Pikachu") used when composing achievement titles.

### 📀Moveset by Game
- Log per-game playthrough data: an icon-picker dropdown of every mainline
  game (grouped by generation) plus a free-text Tag field, an Ability field,
  and 4 rich-text move slots (bold/italic) per row.
- Add or remove as many game rows as you need. Typing a full game name into the
  Tag field auto-links it to that game's badge, just like the Origin/Last Game
  fields.

### 🧮Achievements (Ribbons, Marks, Misc)
- Includes the full catalog of official Ribbons (League, Contest, Tower/Battle, and more),
  Marks, and miscellaneous achievements, each togglable per Pokémon with its
  own icon.
- **Memory Ribbons**: Contest Memory Ribbon (40 sub-ribbons split across
  Hoenn/Sinnoh) and Battle Memory Ribbon (8 sub-ribbons) expand into their
  own sub-grid for fine-grained tracking, with a separate gold variant once
  fully completed.
- Contest Star Ribbon auto-awards itself once all five Master Ribbons
  (Coolness/Beauty/Cuteness/Cleverness/Toughness) are earned, and Twinkling
  Star Ribbon unlocks only after that. Both stay in sync automatically if
  prerequisites are removed.
- You can also add your own achievements by tag or category alongside
  the official catalog.
- An active title can be selected from any earned title-granting achievement
  and is shown next to the Pokémon's name (e.g. "Champion Pikachu" or
  "Ash's Pikachu").
- Read-only detail view only shows sub-ribbons actually earned (plus a region
  header only when that region has ribbons). The edit form shows the
  full picker grid for toggling.

### 🌐Browsing, search & filtering
- Search nickname, species, nature, ball, moves, notes, and
  earned achievements (ribbons, marks, and other catalog/custom entries).
  An inline × button clears the search box.
- Filter by type, Origin Game (auto-populated from the roster), shiny
  only, Mega only, or Gigantamax only. Filters can be combined. A "Clear
  Filters" button appears on the no-matches empty state.
- Sort from the compact ⇅ menu using three options: Added, Species, Nickname.
  Each key remembers its own direction independently (Oldest/Newest for
  Added, A-Z/Z-A for Species and Nickname), so switching keys doesn't reset
  the direction picked for the others.
- Switch between a cozy 3-per-row grid and a denser 6-per-row grid with the toggle next to Sort.
- Card view shows type badges, ball/shiny/form/Pokérus icons, origin to last
  game label, and animated sparkle particles for shiny Pokémon.
- The grid loads 24 cards at a time and automatically loads more as
  you scroll, or via a "Load more" button, so large rosters stay responsive.
- A scroll-to-top button appears once you've scrolled past the header.

### 🖼️Share as image
- Each card has a Share button (grid view and detail view) that exports it
  as a PNG, including its full list of earned achievements.
- If a Pokémon's uploaded sprite is an animated PNG or GIF, the exported
  card is itself an animated image with the sprite playing in place.
  Settings has an Animated Sprite Format option (Animated PNG or GIF):
  APNG only animates reliably in browsers, GIF plays almost everywhere
  (phone galleries, Discord, Slack).
- On mobile, sharing uses the device's native share sheet (file sharing);
  on desktop it downloads directly.
- The header Share button exports the entire roster as a single image: a
  grid of every Pokémon with its sprite, name, and types.

### 📊Stats dashboard
- A summary bar and expandable dashboard show: top Origin
  Games, top Natures (with a "no nature set" count), top Poké Balls (with
  icons), and completeness metrics (Met Location / Sprite / Notes / ≥1 game
  logged, each as an "X of Y" count).

### 🧭Data & file handling
- Import and export the roster as JSON. On Chromium-based browsers this uses the File
  System Access API to save/reopen the same file directly (with a "Load last
  file" chip to reopen it next session), falling back to standard
  download/upload dialogs elsewhere.
- Deleting a Pokémon shows an "Undo" action in a toast notification. Once
  that toast expires with the deletion still pending, a History button
  appears above the footer to restore any pending deletion individually,
  not just the most recent one; it stays hidden otherwise.
- The roster, trainer name, and settings are saved automatically to the browser's
  `localStorage` after every change and are restored automatically on the
  next visit. Export remains the way to back up a roster or move it to
  another browser/device.

### 🔰Appearance & customization
- Poké Ball (light) and Beast Ball (dark) built-in themes, toggleable from
  the header.
- Master Ball custom theme: choose your own background, text, and two accent
  colors (glassmorphic or neumorphic surface style), applied live as you
  edit them in Settings.
- Settings lets you choose the default theme for future visits.

### ⚙️Other UI conveniences
- Custom date picker (met date) with typed-date parsing and formatted
  display (e.g. "March 3rd, 2024").
- Custom searchable/icon dropdowns for Poké Ball selection, sharing the same
  dropdown component styling as the game pickers.
- Changelog and Credits panels are available from the footer.
- `Escape` key closes any open detail view, edit form, or changelog panel.
- Toast notifications provide feedback for imports, exports, saves, and undos.
- Micro-interactions: switches (Shiny, Mega, Gigantamax, Settings) settle
  into place with a double-bounce; an invalid form field shakes along with
  its red border; clearing the search box flies the old text out with a
  directional light streak; the Roster/Shiny stat counters spin like an
  odometer digit reel on change; the footer's autosave notice scrolls as a
  continuous ticker. All respect `prefers-reduced-motion`.

## Project structure

```
index.html               Layout, imports, and modal markup
css/
  main.css               Header, layout, stats bar, toolbar, empty state, changelog modal
  pokemon.css            Card grid, detail modal, add/edit form, date picker, dropdowns
  achievements.css       Achievements section styling
  animations.css         Shared keyframe animations
  themes.css             Theme variables (including the Master Ball custom theme)
  card-effects.css       3D hover glow effects for cards
  species-picker.css       Styling for the Species database
js/
  state.js               Roster state, Pokémon record normalization, seed data
  app.js                 Type/stat color tables, changelog/credits modals, deletion/undo/History, keyboard shortcuts
  settings.js            Settings modal: theme, custom colors, fonts, share format
  achievements.js        Achievement catalog logic, title resolution, Memory Ribbon UI
  detail-view.js         Pokémon detail modal
  renderer.js            Card/grid rendering, stats dashboard (with digit-reel counters), sort/filter state, date picker, ball/type UI
  pokemon.js             Add/Edit form modal, form save/validation, import/export
  species-picker.js             Species picker logic
  card-effects.js             3D hover tilt + border glow, rAF-batched pointer tracking
  filters.js             Filtering, search, and search-clear transition
  utils.js               Autosave (localStorage), File System Access API helpers, toast/modal-focus/scroll-to-top
  share.js               Share-as-image: single-card and full-roster PNG/APNG export
  vendor/
    pako.min.js           Deflate/inflate (UPNG.js dependency)
    upng.js               PNG/APNG encoder-decoder, used for animated sprite export
    gifuct.js             GIF decoder, used to read animated GIF sprites for export
    gifenc.js             GIF encoder, lazy-loaded only when GIF export format is selected
data/
  achievements.js        ACHIEVEMENT_CATALOG (ribbons, marks, misc)
  changelog.js           CHANGELOG (in-app version history)
  pokemon.js             ROSTER_DATA seed (empty by default)
  pokemon-species.js        Pokemon list for the species picker
  types.js           Color codes for Pokemon types
  mega-types.js             Color codes for Mega Pokemon types  
icons/
  ui-icons.js            Poké Ball art, shiny/mega/gigantamax badges, placeholder icons
  achievement-icons.js   Contest/Battle Memory sub-ribbon icons and per-achievement artwork
  game-icons.js          Icons for official games
```

All artwork in the app is stored as Base64 icon data in `icons/`; there are no
plain image files, so there's no separate `images/` folder.

Data and icon files are loaded as plain `<script>` tags rather than being
fetched as JSON, so the app keeps working when opened directly from `file://`, where
`fetch()` of local JSON is blocked by browser CORS policy. Load order is
icons → data → app → achievements → renderer → utils → pokemon → filters →
`init()`, so each module has the globals it needs when it loads.

## Notes on data files

- `ROSTER_DATA` in `data/pokemon.js` is an empty seed array. The app starts
  with zero Pokémon and everything is added through the UI.
- Achievement icons: most achievements use one of four generic placeholder
  icons (ribbon/mark/diploma/star) unless real artwork has been supplied for
  that specific achievement, in which case it's stored in
  `icons/achievement-icons.js` under `window.ACHIEVEMENT_ICONS`. Two
  achievements (`time_travel_award`, `pokestar_studios_star`) currently have
  no dedicated artwork and fall back to the placeholder.
- Contest Memory Ribbon (40 sub-ribbons, split evenly across Hoenn and
  Sinnoh) and Battle Memory Ribbon (8 sub-ribbons) each have their own icon
  sets, `CONTEST_MEMORY_SUB_ICONS` and `BATTLE_MEMORY_SUB_ICONS`, kept
  separate from the main achievement catalog since they're rendered as an
  expandable sub-grid under their parent ribbon.

## Achievements: Memory Ribbons

Contest Star Ribbon is auto-awarded once all five standalone Master Ribbons
(Coolness/Beauty/Cuteness/Cleverness/Toughness) are selected, and isn't
independently togglable. Twinkling Star Ribbon becomes available only after
Contest Star has been auto-awarded, and is automatically removed again if
Contest Star's prerequisites stop being met.

In the read-only detail view, expanding a Memory Ribbon badge shows only the
sub-ribbon(s) actually earned by that Pokémon (plus, for Contest Memory, a
region header only when that region has at least one earned ribbon). The
editable add/edit form always shows the full picker grid, since every
sub-ribbon needs to be visible there for toggling on or off.

## Browser compatibility

The custom date picker, Master Ball theme color math, and File System
Access API helpers (`js/utils.js`) target Chromium-based browsers. The File
System Access API in particular has no effect outside Chromium. On other
browsers, saving/loading falls back to standard file download/upload
dialogs.

## Performance notes

- The ambient gradient behind the app (`body::after`) is `position: fixed`
  and sized to the viewport, not the page, so its cost stays constant
  regardless of roster size. Animating a large gradient directly on `body`
  scales with total page height and can outrun the compositor during a fast
  fling, leaving unpainted tiles that read as black bars against a dark
  theme's background.
- Card hover tilt (`js/card-effects.js`) batches pointer input to one
  `requestAnimationFrame` per card and re-measures `getBoundingClientRect()`
  fresh each frame rather than caching it, so it can't go stale if the page
  scrolls mid-hover while still avoiding a synchronous layout read on every
  raw `pointermove` event.
- Grid pagination (24 cards per batch via `IntersectionObserver`) keeps the
  number of simultaneously backdrop-filtered/glow-ringed card elements
  bounded regardless of roster size.
