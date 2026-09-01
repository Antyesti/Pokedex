/* ============== DATA MODEL ============== */
const TYPE_COLOR = {
  Normal:"var(--t-normal)", Fire:"var(--t-fire)", Water:"var(--t-water)", Electric:"var(--t-electric)",
  Grass:"var(--t-grass)", Ice:"var(--t-ice)", Fighting:"var(--t-fighting)", Poison:"var(--t-poison)",
  Ground:"var(--t-ground)", Flying:"var(--t-flying)", Psychic:"var(--t-psychic)", Bug:"var(--t-bug)",
  Rock:"var(--t-rock)", Ghost:"var(--t-ghost)", Dragon:"var(--t-dragon)", Dark:"var(--t-dark)",
  Steel:"var(--t-steel)", Fairy:"var(--t-fairy)"
};


const STAT_COLOR = {
  "Attack":"#E8D24C", "Defense":"#E0954D", "Speed":"#D85FA8",
  "Sp. Attack":"#52C4D6", "Sp. Defense":"#7B8FE0"
};


/* ============== CHANGELOG ============== */

function changelogEntryHTML(entry){
  return `
    <div class="changelog-entry ${entry.knownIssue?'known-issue':''}">
      <div class="changelog-entry-title">${entry.icon ? `<img src="${entry.icon}" alt="" class="changelog-entry-icon">` : ''}${escapeHTML(entry.title)}</div>
      <ul class="changelog-list">
        ${entry.items.map(i=>`<li>${i}</li>`).join('')}
      </ul>
    </div>
  `;
}

function changelogVersionHTML(v, idx){
  return `
    <div class="changelog-version">
      <div class="changelog-version-head">
        <h3>Pokédex ${escapeHTML(v.version)}</h3>
        ${idx===0 ? '<span class="latest-tag">Latest</span>' : ''}
      </div>
      ${v.entries.map(changelogEntryHTML).join('')}
    </div>
    ${idx < CHANGELOG.length-1 ? '<hr class="changelog-divider">' : ''}
  `;
}

function openChangelog(){
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'changelogOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeChangelog(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:680px;">
      <div class="modal-head">
        <div>
          <h2 style="font-family:var(--sans); font-size:22px; font-weight:800; letter-spacing:-0.01em; margin:0;">Changelog</h2>
          <div class="hint" style="margin-top:4px;">What's new and what's changed in the Pokédex.</div>
        </div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeChangelog()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        ${CHANGELOG.map((v,idx)=>changelogVersionHTML(v,idx)).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
function closeChangelog(){
  const el = document.getElementById('changelogOverlay');
  if(el) el.remove();
}
document.getElementById('changelogLink').addEventListener('click', (e) => {
  e.preventDefault();
  openChangelog();
});


/* ============== CREDITS ============== */
// Credit source data (CREDITS) lives in data/changelog.js, alongside CHANGELOG.

function creditsEntryHTML(entry){
  return `
    <div class="changelog-entry">
      <div class="changelog-entry-title">${escapeHTML(entry.title)}</div>
      <ul class="changelog-list">
        ${entry.items.map(i=>`<li>${i}</li>`).join('')}
      </ul>
    </div>
  `;
}

function openCredits(){
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'creditsOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeCredits(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:560px;">
      <div class="modal-head">
        <div>
          <h2 style="font-family:var(--sans); font-size:22px; font-weight:800; letter-spacing:-0.01em; margin:0;">Credits</h2>
          <div class="hint" style="margin-top:4px;">Sources and resources this Pokédex relies on.</div>
        </div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeCredits()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body">
        ${CREDITS.map(creditsEntryHTML).join('')}
        <div class="hint" style="margin-top:4px;">Pokémon and related images are © Nintendo, Creatures Inc., Game Freak, and The Pokémon Company. This is an unofficial, non-commercial fan project and is not affiliated with or endorsed by Nintendo, Creatures Inc., Game Freak, or The Pokémon Company.</div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
function closeCredits(){
  const el = document.getElementById('creditsOverlay');
  if(el) el.remove();
}
document.getElementById('creditsLink').addEventListener('click', (e) => {
  e.preventDefault();
  openCredits();
});

/* ============== HISTORY (change log) ============== */
/* Every add, edit, and delete gets logged here. Deletions still show an Undo toast first,
   and stay out of the History list while that toast is live (same fallback behavior as
   before); adds and edits have no toast, so they land in History immediately. Each entry
   keeps a snapshot of the affected Pokémon so it can still be shown/acted on after the
   record itself has changed or been removed. */
let changeHistory = [];
let historyEntrySeq = 0;

function logHistoryEntry(type, pokemon, opts){
  opts = opts || {};
  const entry = {
    entryId: 'h_' + (++historyEntrySeq),
    type, // 'added' | 'edited' | 'deleted'
    pokemonId: pokemon.id,
    snapshot: JSON.parse(JSON.stringify(pokemon)), // the record before the change (an edit's revert target); the record itself for an add/delete
    after: opts.after ? JSON.parse(JSON.stringify(opts.after)) : null, // an edit's resulting record, kept so its diff stays accurate even if the Pokémon is edited again later
    idx: typeof opts.idx === 'number' ? opts.idx : null,
    revealed: opts.revealed !== undefined ? opts.revealed : true
  };
  changeHistory.push(entry);
  updateHistoryBar();
  return entry;
}

// Fields worth calling out when an edit is shown in History. Keyed to exactly what
// saveForm's payload writes, so this stays in sync with what an edit can actually change.
const HISTORY_DIFF_FIELDS = [
  { key: 'nickname', label: 'Nickname' },
  { key: 'species', label: 'Species' },
  { key: 'types', label: 'Type' },
  { key: 'nature', label: 'Nature' },
  { key: 'characteristic', label: 'Characteristic' },
  { key: 'gender', label: 'Gender' },
  { key: 'shiny', label: 'Shiny' },
  { key: 'pokerus', label: 'Pokérus' },
  { key: 'metLocation', label: 'Met location' },
  { key: 'metDate', label: 'Met date' },
  { key: 'ball', label: 'Ball' },
  { key: 'originGame', label: 'Origin game' },
  { key: 'lastGame', label: 'Last game' },
  { key: 'notes', label: 'Notes' },
  { key: 'sprite', label: 'Default avatar' },
  { key: 'isMega', label: 'Mega Evolution' },
  { key: 'megaForm', label: 'Mega form' },
  { key: 'megaTypes', label: 'Mega type' },
  { key: 'spriteMega', label: 'Mega avatar' },
  { key: 'isGigantamax', label: 'Gigantamax' },
  { key: 'spriteGigantamax', label: 'Gigantamax avatar' },
  { key: 'isTera', label: 'Terastallization' },
  { key: 'teraType', label: 'Tera type' },
  { key: 'preferredForm', label: 'Displayed form' },
  { key: 'games', label: 'Moveset by Game' }
];

function diffPokemonFields(before, after){
  return HISTORY_DIFF_FIELDS
    .filter(f => JSON.stringify(before[f.key]) !== JSON.stringify(after[f.key]))
    .map(f => f.label);
}

function visibleHistoryEntries(){
  return changeHistory.filter(e => e.revealed);
}

// What to show in the History list for a given entry: the live record's current name/
// sprite for adds and edits (so a later rename doesn't leave the list showing a stale
// name), falling back to the snapshot once the record itself has been deleted.
function historyDisplayPokemon(entry){
  return findPokemonById(entry.pokemonId) || entry.snapshot;
}

function deletePokemon(id){
  const idx = state.pokemon.findIndex(x=>x.id===id);
  if(idx === -1) return;
  const [removed] = state.pokemon.splice(idx, 1);
  const entry = logHistoryEntry('deleted', removed, { idx, revealed: false });
  render();
  const pendingCount = changeHistory.filter(e => e.type === 'deleted' && !e.revealed).length;
  const msg = pendingCount > 1
    ? `${removed.nickname} removed. (${pendingCount} to undo)`
    : `${removed.nickname} removed.`;
  showToast(msg, {
    label: 'Undo',
    onClick: () => undoDeletion(entry.entryId)
  }, {
    onVanish: () => {
      entry.revealed = true;
      updateHistoryBar();
    }
  });
}

// Shared restore logic for both "Undo" on the toast and "Restore" from the History panel.
function restoreDeletedEntry(entryId){
  const i = changeHistory.findIndex(e => e.entryId === entryId && e.type === 'deleted');
  if(i === -1) return null;
  const [entry] = changeHistory.splice(i, 1);
  const insertAt = Math.min(entry.idx, state.pokemon.length);
  state.pokemon.splice(insertAt, 0, entry.snapshot);
  render();
  updateHistoryBar();
  return entry;
}

function undoDeletion(entryId){
  const entry = restoreDeletedEntry(entryId);
  if(!entry) return;
  // Deletions made before this one may still be sitting behind their own toast; chain
  // into the next most recent one so repeatedly clicking Undo keeps working backwards.
  const stillPending = changeHistory.filter(e => e.type === 'deleted' && !e.revealed);
  if(stillPending.length > 0){
    const next = stillPending[stillPending.length - 1];
    const msg = stillPending.length > 1
      ? `${entry.snapshot.nickname} restored. (${stillPending.length} more to undo)`
      : `${entry.snapshot.nickname} restored. (1 more to undo)`;
    showToast(msg, {
      label: 'Undo',
      onClick: () => undoDeletion(next.entryId)
    }, {
      onVanish: () => {
        next.revealed = true;
        updateHistoryBar();
      }
    });
  } else {
    showToast(`${entry.snapshot.nickname} restored.`);
  }
}

function revertEdit(entryId){
  const i = changeHistory.findIndex(e => e.entryId === entryId && e.type === 'edited');
  if(i === -1) return;
  const entry = changeHistory[i];
  const idx = state.pokemon.findIndex(x => x.id === entry.pokemonId);
  if(idx === -1) return; // the Pokémon was deleted since this edit; nothing to revert
  const name = state.pokemon[idx].nickname;
  state.pokemon[idx] = JSON.parse(JSON.stringify(entry.snapshot));
  changeHistory.splice(i, 1);
  render();
  updateHistoryBar();
  showToast(`${name} reverted.`);
}

function removeAddedEntry(entryId){
  const i = changeHistory.findIndex(e => e.entryId === entryId && e.type === 'added');
  if(i === -1) return;
  const entry = changeHistory[i];
  const idx = state.pokemon.findIndex(x => x.id === entry.pokemonId);
  if(idx === -1) return;
  const [removed] = state.pokemon.splice(idx, 1);
  changeHistory.splice(i, 1);
  render();
  updateHistoryBar();
  showToast(`${removed.nickname} removed.`);
}

function handleHistoryAction(entryId){
  const entry = changeHistory.find(e => e.entryId === entryId);
  if(!entry) return;
  if(entry.type === 'deleted') undoDeletion(entryId);
  else if(entry.type === 'edited') revertEdit(entryId);
  else if(entry.type === 'added') removeAddedEntry(entryId);
}

/* Once a deletion toast expires without being undone, the History button becomes the
   fallback for it; adds and edits have no toast, so they show up here right away. It
   stays hidden the rest of the time so it doesn't clutter the page. */
function updateHistoryBar(){
  const bar = document.getElementById('historyBar');
  if(!bar) return;
  const visible = visibleHistoryEntries();
  bar.style.display = visible.length > 0 ? 'flex' : 'none';
  if(visible.length > 0) document.getElementById('historyCount').textContent = visible.length;
  if(visible.length === 0) closeHistory();
  else renderHistoryModalBody();
}

function historyActionLabel(type){
  if(type === 'deleted') return 'Restore';
  if(type === 'edited') return 'Revert';
  return 'Remove';
}

function historyTypeLabel(entry){
  if(entry.type === 'added') return 'Added';
  if(entry.type === 'deleted') return 'Deleted';
  if(!entry.after) return 'Edited';
  const changed = diffPokemonFields(entry.snapshot, entry.after);
  return changed.length ? `Edited: ${changed.join(', ')}` : 'Edited';
}

function historyEntryHTML(entry){
  const p = historyDisplayPokemon(entry);
  const sprite = resolveDisplaySprite(p);
  // Edits/adds lose their action once the Pokémon has since been deleted separately;
  // deletions can always be restored, since their snapshot is all Restore needs.
  const canAct = entry.type === 'deleted' || !!findPokemonById(entry.pokemonId);
  return `
    <div class="history-entry">
      <div class="history-entry-sprite">${sprite ? `<img src="${escapeAttr(sprite)}">` : '<div class="brand-mark mini"></div>'}</div>
      <div class="history-entry-info">
        <div class="history-entry-name">${escapeHTML(p.nickname)}</div>
        <div class="history-entry-species">${escapeHTML(p.species)} · ${historyTypeLabel(entry)}</div>
      </div>
      ${canAct ? `<button type="button" class="btn ghost" onclick="handleHistoryAction('${entry.entryId}')">${historyActionLabel(entry.type)}</button>` : ''}
    </div>
  `;
}

function renderHistoryModalBody(){
  const body = document.getElementById('historyModalBody');
  if(!body) return;
  body.innerHTML = [...visibleHistoryEntries()].reverse().map(historyEntryHTML).join('');
}

function openHistory(){
  if(visibleHistoryEntries().length === 0) return;
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'historyOverlay';
  overlay.onclick = (e) => { if(e.target === overlay) closeHistory(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:480px;">
      <div class="modal-head">
        <div>
          <h2 style="display:flex; align-items:center; gap:8px; font-family:var(--sans); font-size:22px; font-weight:800; letter-spacing:-0.01em; margin:0;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px; height:20px; flex:none;"><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 3 3 9 9 9"/><polyline points="12 7 12 12 16 14"/></svg>History</h2>
          <div class="hint" style="margin-top:4px;">Recent changes to your roster.</div>
        </div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" onclick="closeHistory()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>
      <div class="modal-body" id="historyModalBody"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  renderHistoryModalBody();
}

function closeHistory(){
  const el = document.getElementById('historyOverlay');
  if(el) el.remove();
}

/* hook up the type swatches whenever form opens for editing existing pokemon */
/* ============== KEYBOARD ============== */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    closeDetail();
    closeForm();
    closeChangelog();
    closeSettings();
    closeCredits();
    closeHistory();
  }
});
