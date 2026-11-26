/* ============== APPEND FROM GAME SAVE (UI) ==============
 * Import (JSON) replaces the whole roster; Import Game Saves adds Pokémon from a real game save.
 * Hover Import to reveal the Import Game Saves menu. Reading is in js/save-import.js.
 */
const GENDER_FROM_SAVE = ['Male', 'Female', 'Genderless'];
let saveImportSession = null; // { result, rows, fileName }

/* ---- hover menu (touch devices get a caret button instead) ---- */
(function(){
  const wrap = document.getElementById('importWrap');
  const menu = document.getElementById('importMenu');
  const caret = document.getElementById('importCaret');
  if(!wrap) return;
  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    if(caret) caret.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  if(caret) caret.addEventListener('click', (e) => { e.stopPropagation(); setOpen(!menu.classList.contains('open')); });
  document.getElementById('btnAppendSave').addEventListener('click', () => {
    setOpen(false);
    document.activeElement && document.activeElement.blur && document.activeElement.blur();
    document.getElementById('saveFileInput').click();
  });
  const input = document.getElementById('saveFileInput');
  input.multiple = true; // Pokémon files (.pk*) can be picked several at a time
  input.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';
    if(!files.length) return;
    await openSaveImport(files.length === 1 ? files[0] : files);
  });
})();

/* ---- Import (JSON) replaces everything: warn first when there is something to lose ---- */
function confirmReplaceBeforeImport(proceed){
  if(!state.pokemon.length){ proceed(); return; }
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'importWarnOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeImportWarn(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:460px;">
      <div class="modal-head">
        <div style="font-family:var(--sans); font-weight:800; font-size:19px;">Replace your Pokédex?</div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeImportWarn()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        <div class="warning-banner">
          <svg class="warning-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div class="warning-banner-text">Importing a Pokédex file <b>replaces</b> the ${state.pokemon.length} Pokémon you have now. Export first if you want to keep them.<br><br>Want to add Pokémon from a game save instead? Cancel, hover <b>Import</b> and pick <b>Import Game Saves</b>. That keeps everything you have.</div>
        </div>
      </div>
      <div class="modal-foot">
        <button type="button" class="btn ghost" onclick="closeImportWarn()">Cancel</button>
        <button type="button" class="btn danger" id="importWarnGo">Replace and Import</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('importWarnGo').onclick = () => { closeImportWarn(); proceed(); };
}
function closeImportWarn(){ const el = document.getElementById('importWarnOverlay'); if(el) el.remove(); }

/* ---- reading a save ---- */
async function openSaveImport(file, want){
  const many = Array.isArray(file) ? file : null;
  const first = many ? many[0] : file;
  const pkmMode = many ? many.every(f => SaveImport.isPkmFileName(f.name)) : SaveImport.isPkmFileName(first.name);
  if(many && !pkmMode){ showToast('Pick one save file, or any number of Pokémon files (.pk3 to .pk9, .ek*, and so on).'); return; }
  if((many || [first]).some(f => f.size > 64 * 1024 * 1024)){ showToast('That file is too large to be a Pokémon save.'); return; }
  let result;
  try{
    if(pkmMode){
      const list = many || [first];
      result = SaveImport.readPKM(await Promise.all(list.map(async f => ({ name: f.name, bytes: await f.arrayBuffer() }))));
    } else {
      result = SaveImport.read(await first.arrayBuffer(), want);
    }
  } catch(err){
    showToast(err && err.unsupported ? err.message : 'Could not read that save file.');
    return;
  }
  if(!result.mons.length){
    showToast(`No Pokémon found in that ${result.name}.`);
    return;
  }
  const lastLabel = result.gcKey ? labelForKey(result.gcKey) : presetLabelForVersion(result.saveVersion);
  const rows = result.mons.map((m, i) => {
    const uid = saveUidOf(m);
    return { i, m, uid, dupe: findDuplicate(m, uid), selected: false };
  });
  // A Pokémon already imported from another save is updated rather than added again, so it stays checked.
  rows.forEach(r => { r.selected = !r.dupe || r.dupe.kind === 'exact'; });
  saveImportSession = { result, rows, file, fileName: first.name, lastLabel, filter: '' };
  renderSaveImportModal();
}

function saveUidOf(m){ return `${m.gen}:${m.pid.toString(16)}:${m.tid}:${m.sid}:${m.species}`; }
// Ignore the generation prefix when comparing records across games.
const coreSaveUid = uid => String(uid || '').split(':').slice(1).join(':');
// PID, trainer ID and secret ID only, so the same Pokémon still matches after its species changes.
const saveIdOf = uid => String(uid || '').split(':').slice(1, 4).join(':');
// True when the record is an earlier stage of the Pokémon in the save, meaning it has evolved since it was last imported.
function hasEvolvedSince(rec, m){
  return !!rec.speciesEntryId && rec.speciesEntryId !== m.entry.id
    && speciesLineageIds(m.entry.id).includes(rec.speciesEntryId);
}
function labelForKey(key){ return key && GAME_PRESET_INDEX[key] ? GAME_PRESET_INDEX[key].label : ''; }
function presetLabelForVersion(v, m){ return labelForKey((m && m.originKey) || SaveImport.VERSION_KEY[v]); }
// 'exact' = this very Pokémon was imported from a save before; 'possible' = same species/nickname/origin/nature already in the dex
function findDuplicate(m, uid){
  const nickLower = displayNickname(m).toLowerCase();
  const origin = presetLabelForVersion(m.version, m);
  const core = coreSaveUid(uid), identity = saveIdOf(uid);
  const related = [];
  for(const p of state.pokemon){
    if(!p.saveUid) continue;
    if(coreSaveUid(p.saveUid) === core) return { kind: 'exact', with: p };
    if(saveIdOf(p.saveUid) !== identity) continue;
    // Shedinja can coexist with the Ninjask produced by the same evolution.
    if(p.speciesEntryId === 'shedinja' || m.entry.id === 'shedinja') continue;
    if(hasEvolvedSince(p, m) || speciesLineageIds(p.speciesEntryId).includes(m.entry.id)) related.push(p);
  }
  if(related.length) return { kind: related.length === 1 ? 'exact' : 'possible', with: related[0] };
  for(const p of state.pokemon){
    if(p.saveUid) continue;
    if(p.speciesEntryId === m.entry.id && (p.nickname || '').toLowerCase() === nickLower
       && (!origin || !p.originGame || p.originGame === origin)
       && (!m.nature || !p.nature || p.nature === m.nature)) return { kind: 'possible', with: p };
  }
  return null;
}
function displayNickname(m){
  const n = (m.nickname || '').trim();
  if(!n || m.nicknamedFlag === false || n.toLowerCase() === m.entry.species.toLowerCase()) return m.entry.species;
  return n;
}
function whereText(w){ return w.file ? w.file : w.party ? `Party ${w.party}` : `Box ${w.box} · Slot ${w.slot}`; }

/* ---- the selection modal ---- */
function renderSaveImportModal(){
  closeSaveImport();
  const S = saveImportSession;
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'saveImportOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeSaveImport(); };
  overlay.innerHTML = `
    <div class="modal save-import-modal">
      <div class="modal-head">
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeSaveImport()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div style="font-family:var(--sans); font-weight:800; font-size:22px; letter-spacing:-0.02em;">Import Game Saves</div>
        <div class="si-sub" id="siSub"></div>
      </div>
      <div class="modal-body" id="siBody">
        <div id="siWarnings"></div>
        <div class="si-toolbar">
          <input type="text" id="siSearch" class="si-search" placeholder="Filter by name, species or location" aria-label="Filter Pokémon">
          <div class="si-bulk">
            <button type="button" class="btn ghost si-btn" data-bulk="all">Select all</button>
            <button type="button" class="btn ghost si-btn" data-bulk="none">Select none</button>
            <button type="button" class="btn ghost si-btn" data-bulk="new">New only</button>
            <button type="button" class="btn ghost si-btn" data-bulk="party">Party</button>
            <button type="button" class="btn ghost si-btn" data-bulk="shiny">Shiny</button>
          </div>
        </div>
        <div id="siList" class="si-list"></div>
      </div>
      <div class="modal-foot si-foot">
        <div class="si-foot-note" id="siFootNote"></div>
        <button type="button" class="btn ghost" onclick="closeSaveImport()">Cancel</button>
        <button type="button" class="btn primary" id="siAdd">Add to Pokédex</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#siSearch').addEventListener('input', (e) => { S.filter = e.target.value.trim().toLowerCase(); renderSaveImportList(); });
  overlay.querySelectorAll('[data-bulk]').forEach(b => b.addEventListener('click', () => bulkSelect(b.dataset.bulk)));
  overlay.querySelector('#siAdd').onclick = confirmSaveImport;
  renderSaveImportHeader();
  renderSaveImportList();
}
function closeSaveImport(){ const el = document.getElementById('saveImportOverlay'); if(el) el.remove(); }

function renderSaveImportHeader(){
  const S = saveImportSession, R = S.result;
  const dupes = S.rows.filter(r => r.dupe), exact = dupes.filter(r => r.dupe.kind === 'exact').length;
  const party = S.rows.filter(r => r.m.where.party).length;
  document.getElementById('siSub').textContent = R.fromFiles
    ? `${S.rows.length} Pokémon from ${S.rows.length === 1 ? 'file' : 'files'}` + (R.skipped ? ` · ${R.skipped} unreadable file${R.skipped === 1 ? '' : 's'} skipped` : '') + (R.eggs ? ` · ${R.eggs} egg${R.eggs === 1 ? '' : 's'} skipped` : '')
    : `${R.name} · ${S.rows.length} Pokémon found (${party} in party, ${S.rows.length - party} in boxes)` + (R.eggs ? ` · ${R.eggs} egg${R.eggs === 1 ? '' : 's'} skipped` : '');
  const warn = [];
  const icon = '<svg class="warning-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  if(dupes.length){
    warn.push(`<div class="warning-banner">${icon}<div class="warning-banner-text"><b>${dupes.length} duplicate${dupes.length === 1 ? '' : 's'} found.</b> ${
      exact ? `${exact} ${exact === 1 ? 'was' : 'were'} imported from a save before, so ${exact === 1 ? 'it updates' : 'they update'} the existing Pokémon (Moveset by Game, Characteristic, ribbons and Last Game) instead of adding a copy. ` : ''}${
      dupes.length - exact ? `${dupes.length - exact} look${dupes.length - exact === 1 ? 's' : ''} like Pokémon already in your Pokédex and ${dupes.length - exact === 1 ? 'is' : 'are'} unchecked so you don't add ${dupes.length - exact === 1 ? 'it' : 'them'} twice.` : ''
    }</div></div>`);
  }
  if(R.alsoFound) warn.push(`<div class="warning-banner">${icon}<div class="warning-banner-text">This memory card also holds a <b>${R.alsoFound === 'xd' ? 'Pokémon XD' : 'Pokémon Colosseum'}</b> save, but only ${R.gcKey === 'xdgaleofdarkness' ? 'XD' : 'Colosseum'} was read. <button type="button" class="btn ghost si-btn" id="siSwitchGame" style="margin-left:6px;">Read ${R.alsoFound === 'xd' ? 'XD' : 'Colosseum'} instead</button></div></div>`);
  if(R.ambiguous) warn.push(`<div class="warning-banner">${icon}<div class="warning-banner-text">This save file doesn't say which exact game it came from, so Last Game was set to <b>${escapeHTML(S.lastLabel)}</b>. You can change it after importing.</div></div>`);
  if(R.formGuess) warn.push(`<div class="warning-banner">${icon}<div class="warning-banner-text">${R.formGuess} Pokémon have an alternate form that couldn't be matched, so they were added in their base form. They're marked <b>Form?</b> below.</div></div>`);
  document.getElementById('siWarnings').innerHTML = warn.join('');
  const sw = document.getElementById('siSwitchGame');
  if(sw) sw.onclick = () => openSaveImport(S.file, R.alsoFound);
}

function visibleRows(){
  const S = saveImportSession, q = S.filter;
  if(!q) return S.rows;
  return S.rows.filter(r => `${displayNickname(r.m)} ${r.m.entry.species} ${r.m.metLoc} ${whereText(r.m.where)}`.toLowerCase().includes(q));
}
function groupKey(w){ return w.file ? 'Files' : w.party ? 'Party' : `Box ${w.box}`; }

function renderSaveImportList(){
  const S = saveImportSession, list = document.getElementById('siList');
  const rows = visibleRows();
  if(!rows.length){ list.innerHTML = '<div class="si-empty">No Pokémon match that filter.</div>'; updateSaveImportFooter(); return; }
  const groups = [];
  rows.forEach(r => {
    const k = groupKey(r.m.where);
    let g = groups[groups.length - 1];
    if(!g || g.key !== k){ g = { key: k, rows: [] }; groups.push(g); }
    g.rows.push(r);
  });
  list.innerHTML = groups.map((g, gi) => {
    const all = g.rows.every(r => r.selected), some = g.rows.some(r => r.selected);
    return `<div class="si-group">
      <label class="si-group-head"><input type="checkbox" data-group="${gi}" ${all ? 'checked' : ''} ${!all && some ? 'data-indeterminate="1"' : ''}>
        <span>${escapeHTML(g.key)}</span><span class="si-group-count">${g.rows.filter(r => r.selected).length}/${g.rows.length}</span></label>
      ${g.rows.map(r => rowHTML(r)).join('')}
    </div>`;
  }).join('');
  list.querySelectorAll('input[data-indeterminate]').forEach(el => { el.indeterminate = true; });
  list.querySelectorAll('input[data-group]').forEach(el => el.addEventListener('change', () => {
    const g = groups[+el.dataset.group];
    g.rows.forEach(r => { r.selected = el.checked; });
    renderSaveImportList();
  }));
  // click toggles; shift+click selects the range from the last click
  let lastIndex = S.lastClicked;
  list.querySelectorAll('input[data-row]').forEach(el => el.addEventListener('click', (e) => {
    const idx = +el.dataset.row;
    if(e.shiftKey && typeof lastIndex === 'number'){
      const [a, b] = [Math.min(lastIndex, idx), Math.max(lastIndex, idx)];
      rows.filter(r => r.i >= a && r.i <= b).forEach(r => { r.selected = el.checked; });
    } else {
      S.rows[idx].selected = el.checked;
    }
    S.lastClicked = idx;
    renderSaveImportList();
  }));
  updateSaveImportFooter();
}
function rowHTML(r){
  const m = r.m, nick = displayNickname(m), species = m.entry.species;
  const badges = [];
  if(m.shiny) badges.push('<span class="si-badge shiny">★ Shiny</span>');
  if(r.dupe) badges.push(`<span class="si-badge dupe" title="${r.dupe.kind === 'exact' ? 'Imported from a save before. Importing it again updates the existing Pokémon.' : 'Looks like one already in your Pokédex'}">${r.dupe.kind === 'exact' ? 'Updates existing' : 'Possible duplicate'}</span>`);
  const memSkip = memoryRibbonsSkipped(m, r.dupe && r.dupe.kind === 'exact' ? r.dupe.with : null);
  if(memSkip.length) badges.push(`<span class="si-badge form" title="This save only records that a ${memSkip.join(' and ')} Memory Ribbon exists, not which sub-ribbons were earned, so it won't be imported">Memory Ribbon skipped</span>`);
  if(!m.formKnown) badges.push('<span class="si-badge form" title="Alternate form could not be matched; added as the base form">Form?</span>');
  const sub = [nick !== species ? species : '', m.nature, m.metLoc, presetLabelForVersion(m.version, m).replace(/^Pokémon /, '')].filter(Boolean).join(' · ');
  return `<label class="si-row ${r.selected ? 'on' : ''} ${r.dupe ? 'is-dupe' : ''}">
    <input type="checkbox" data-row="${r.i}" ${r.selected ? 'checked' : ''}>
    <span class="si-row-main"><span class="si-row-name">${escapeHTML(nick)}</span>${badges.join('')}<span class="si-row-sub">${escapeHTML(sub)}</span></span>
    <span class="si-row-where">${escapeHTML(whereText(m.where))}</span>
  </label>`;
}
function bulkSelect(kind){
  const S = saveImportSession;
  const target = visibleRows();
  if(kind === 'all') target.forEach(r => { r.selected = true; });
  else if(kind === 'none') S.rows.forEach(r => { r.selected = false; });
  else if(kind === 'new'){ S.rows.forEach(r => { r.selected = false; }); target.forEach(r => { r.selected = !r.dupe; }); }
  else if(kind === 'party'){ S.rows.forEach(r => { r.selected = false; }); target.forEach(r => { r.selected = !!r.m.where.party; }); }
  else if(kind === 'shiny'){ S.rows.forEach(r => { r.selected = false; }); target.forEach(r => { r.selected = r.m.shiny; }); }
  renderSaveImportList();
}
function updateSaveImportFooter(){
  const S = saveImportSession, sel = S.rows.filter(r => r.selected);
  const upd = sel.filter(r => r.dupe && r.dupe.kind === 'exact').length, dupSel = sel.filter(r => r.dupe && r.dupe.kind !== 'exact').length;
  const adding = sel.length - upd;
  const btn = document.getElementById('siAdd');
  btn.disabled = !sel.length;
  btn.textContent = !sel.length ? 'Add to Pokédex' : !upd ? `Add ${sel.length} Pokémon` : !adding ? `Update ${upd} Pokémon` : `Add ${adding} and update ${upd}`;
  document.getElementById('siFootNote').innerHTML = `${sel.length} of ${S.rows.length} selected` +
    (upd ? ` · ${upd} will update an existing Pokémon` : '') +
    (dupSel ? ` · <span class="si-foot-warn">${dupSel} already in your Pokédex, will be added again</span>` : '');
}

/* ---- building records ---- */
// The Characteristic dropdown is editable, so prefer the app's own spelling of the same phrase.
function appCharacteristic(name){
  if(!name) return '';
  const hit = (typeof CHARACTERISTICS !== 'undefined' ? CHARACTERISTICS : []).find(c => c.toLowerCase() === name.toLowerCase());
  return hit || name;
}
// A Pokémon that was imported from another save keeps its record; this save adds or refreshes its game entry.
// Memory Ribbons from Gen 6 and later can't be matched to sub-ribbons, so they are never imported.
// This lists which kinds the save had that the Pokémon's record still has no sub-ribbons for.
function memoryRibbonsSkipped(m, rec){
  const f = m.memoryFlags;
  if(!f) return [];
  const out = [];
  if(f.contest && !(rec && rec.contestMemorySubKeys && rec.contestMemorySubKeys.length)) out.push('Contest');
  if(f.battle && !(rec && rec.battleMemorySubKeys && rec.battleMemorySubKeys.length)) out.push('Battle');
  return out;
}
function lastGameKeyFor(saveVersion){
  return (saveImportSession && saveImportSession.result.gcKey) || SaveImport.VERSION_KEY[saveVersion] || '';
}
// Last Game follows the app's Game Travel rules (Travels To lists): the save's game has to be reachable from the games
// the Pokémon already has on record, ignoring its current Last Game. It may move forward or back within that set.
function lastGameAllowed(rec, newKey){
  if(!newKey || typeof forwardReachableGamesFrom !== 'function' || typeof gameKeysForPokemon !== 'function') return true;
  const start = gameKeysForPokemon({ ...rec, lastGame: '' });
  if(!start.size) return true;
  return forwardReachableGamesFrom(rec, start).has(newKey);
}
function updateRecordFromSave(rec, m, saveVersion, notes){
  notes = notes || [];
  const fresh = recordFromSave(m, saveVersion);
  if(hasEvolvedSince(rec, m)){
    const oldSpecies = rec.species;
    // A Pokémon that was never nicknamed is renamed by the game when it evolves.
    if((rec.nickname || '').trim().toLowerCase() === oldSpecies.toLowerCase()) rec.nickname = fresh.nickname;
    rec.species = fresh.species;
    rec.speciesEntryId = fresh.speciesEntryId;
    rec.types = [...fresh.types];
    notes.push({ kind: 'evolved', text: `${rec.nickname}: evolved from ${oldSpecies} into ${fresh.species}, so its existing entry was updated.` });
  }
  const entry = fresh.games[0];
  const newKey = lastGameKeyFor(saveVersion);
  const allowLast = lastGameAllowed(rec, newKey);
  if(entry){
    const at = rec.games.findIndex(g => (entry.gameKey && g.gameKey === entry.gameKey) || (g.tag && g.tag === entry.tag));
    if(at >= 0){
      const old = rec.games[at];
      rec.games[at] = { ...old, ability: entry.ability, moves: entry.moves, moveIds: entry.moveIds, tag: entry.tag, gameKey: entry.gameKey };
    } else rec.games.push(entry);
  }
  // A save that has no characteristic (Gen 3, Let's Go, Legends) never clears one; a different one replaces it and gets reported.
  if(fresh.characteristic){
    if(rec.characteristic && rec.characteristic.toLowerCase() !== fresh.characteristic.toLowerCase())
      notes.push({ kind: 'characteristic', text: `${rec.nickname}: Characteristic changed from "${rec.characteristic}" to "${fresh.characteristic}".` });
    rec.characteristic = fresh.characteristic;
  }
  if(fresh.lastGame && fresh.lastGame !== rec.lastGame){
    if(allowLast) rec.lastGame = fresh.lastGame;
    else notes.push({ kind: 'lastgame', text: `${rec.nickname}: Last Game stays ${rec.lastGame || 'unset'} because ${fresh.lastGame} can't be reached from its games under the Game Travel rules. Its Moveset by Game was still updated.` });
  }
  // Ribbons and marks only ever get earned, so keep what the record has and add what this save knows about.
  const merge = (a, b) => { b.forEach(k => { if(!a.includes(k)) a.push(k); }); };
  merge(rec.achievementKeys, fresh.achievementKeys);
  merge(rec.contestMemorySubKeys, fresh.contestMemorySubKeys);
  merge(rec.battleMemorySubKeys, fresh.battleMemorySubKeys);
  if(fresh.isGigantamax) rec.isGigantamax = true;
  if(rec.speciesEntryId === fresh.speciesEntryId) rec.saveUid = fresh.saveUid;
  const skipped = memoryRibbonsSkipped(m, rec);
  if(skipped.length) notes.push({ kind: 'memory', text: rec.nickname, detail: skipped });
  return normalizePokemon(rec);
}
// Results dialog for things the import did differently than a plain copy, so none of it happens silently.
function showImportNotes(notes){
  if(!notes.length) return;
  const memory = notes.filter(n => n.kind === 'memory');
  const lines = [];
  if(memory.length){
    const names = memory.map(n => `${escapeHTML(n.text)} (${n.detail.join(' and ')})`);
    const shown = names.slice(0, 6).join(', ') + (names.length > 6 ? `, and ${names.length - 6} more` : '');
    lines.push(`<b>Memory Ribbons skipped.</b> ${shown}: saves from Gen 6 and later only record that a Memory Ribbon exists, not which Contest or Battle sub-ribbons were earned, so they can't be added. You can tick the sub-ribbons yourself on the Pokémon.`);
  }
  notes.filter(n => n.kind !== 'memory').slice(0, 12).forEach(n => lines.push(escapeHTML(n.text)));
  const rest = notes.filter(n => n.kind !== 'memory').length - 12;
  if(rest > 0) lines.push(`And ${rest} more.`);
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'importNotesOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeImportNotes(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:480px;">
      <div class="modal-head">
        <div style="font-family:var(--sans); font-weight:800; font-size:19px;">Import notes</div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeImportNotes()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">${lines.map(l => `<div class="warning-banner" style="margin-bottom:8px;"><div class="warning-banner-text">${l}</div></div>`).join('')}</div>
      <div class="modal-foot"><button type="button" class="btn primary" onclick="closeImportNotes()">Got it</button></div>
    </div>`;
  document.body.appendChild(overlay);
}
function closeImportNotes(){ const el = document.getElementById('importNotesOverlay'); if(el) el.remove(); }
function recordFromSave(m, saveVersion){
  const species = m.entry.species;
  const originLabel = presetLabelForVersion(m.version, m);
  const lastKey = (saveImportSession && saveImportSession.result.gcKey) || SaveImport.VERSION_KEY[saveVersion] || '';
  const lastLabel = labelForKey(lastKey);
  const moves = [0, 1, 2, 3].map(i => m.moves[i] || '');
  const games = (moves.some(Boolean) || m.ability) ? [{
    id: cryptoId(), tag: lastLabel, ability: m.ability || '', moves, moveIds: normalizeMoveIds(moves),
    zMoveSlot: -1, zMoveMode: 'basic', maxMoveModes: ['', '', '', ''], gameKey: lastKey, useMegaAbility: false
  }] : [];
  const rec = {
    id: cryptoId(),
    nickname: displayNickname(m),
    species,
    speciesEntryId: m.entry.id,
    types: [...m.entry.types],
    nature: m.nature || '',
    gender: GENDER_FROM_SAVE[m.gender] || '',
    shiny: !!m.shiny,
    pokerus: m.pokerus || 'none',
    metLocation: escapeHTML(m.metLoc || ''),
    metDate: m.metDate || '',
    ball: m.ball || '',
    originGame: originLabel,
    lastGame: lastLabel,
    notes: '',
    metLevel: m.metLevel >= 1 && m.metLevel <= 100 ? m.metLevel : null,
    games,
    saveUid: saveUidOf(m),
    achievementKeys: [...(m.ribbons || [])],
    contestMemorySubKeys: [...(m.contestSub || [])],
    battleMemorySubKeys: [...(m.battleSub || [])],
    characteristic: appCharacteristic(m.characteristic)
  };
  if(m.gmax && getGigantamaxFormDisplay(m.entry.id)) rec.isGigantamax = true;
  if(m.teraType && m.teraType !== 'Stellar'){ rec.teraType = m.teraType; }
  return normalizePokemon(rec);
}

function confirmSaveImport(){
  const S = saveImportSession;
  const picked = S.rows.filter(r => r.selected);
  if(!picked.length) return;
  const added = [], notes = [];
  let updated = 0;
  picked.forEach(r => {
    const duplicate = findDuplicate(r.m, r.uid);
    const existing = duplicate?.kind === 'exact' ? duplicate.with : null;
    if(existing){
      const before = JSON.parse(JSON.stringify(existing));
      const idx = state.pokemon.indexOf(existing);
      const next = updateRecordFromSave(existing, r.m, S.result.saveVersion, notes);
      logHistoryEntry('edited', before, { after: next, idx });
      updated++;
    } else {
      const rec = recordFromSave(r.m, S.result.saveVersion);
      state.pokemon.push(rec); logHistoryEntry('added', rec); added.push(rec);
      const skipped = memoryRibbonsSkipped(r.m, rec);
      if(skipped.length) notes.push({ kind: 'memory', text: rec.nickname, detail: skipped });
    }
  });
  closeSaveImport();
  saveImportSession = null;
  render();
  const source = S.result.fromFiles ? (picked.length === 1 ? 'your file' : 'your files') : `your ${S.result.name} save`;
  showToast(`${added.length ? `Added ${added.length} Pokémon` : ''}${added.length && updated ? ' and updated ' : added.length ? '' : 'Updated '}${updated ? `${updated} Pokémon` : ''} from ${source}.`);
  showImportNotes(notes);
}
