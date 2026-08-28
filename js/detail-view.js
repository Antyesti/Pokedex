/* ============== POKÉMON DETAIL VIEW ============== */

function openDetail(id){
  const p = state.pokemon.find(x=>x.id===id);
  if(!p) return;
  const detailTypes = displayTypes(p);
  const primaryColor = TYPE_HEX[detailTypes[0]] || '#4FD1C5';
  const displaySprite = resolveDisplaySprite(p);
  const formPrefix = p.preferredForm === 'mega' ? getMegaFormDisplay(p.speciesEntryId).prefix + ' ' : p.preferredForm === 'gigantamax' ? getGigantamaxFormDisplay(p.speciesEntryId).prefix + ' ' : '';
  const formSuffix = (p.preferredForm === 'mega' && p.megaForm) ? ' ' + p.megaForm.toUpperCase() : '';

  const megaVariant = p.preferredForm === 'mega' ? getMegaVariant(p.speciesEntryId, p.megaForm) : null;
  const movesRows = p.games.map(g => {
    const preset = GAME_PRESET_INDEX[g.gameKey || detectGameKeyFromTag(g.tag)];
    const abilityOverride = (g.useMegaAbility && preset && preset.supportsMega && megaVariant && megaVariant.ability) ? megaVariant.ability : '';
    const ability = abilityOverride || g.ability;
    return `
    <tr>
      <td><span class="game-tag">${preset ? `<img class="game-tag-icon" src="${preset.icon}" alt="${escapeAttr(preset.label)}" title="${escapeAttr(preset.label)}">` : ''}${escapeHTML(g.tag)}</span></td>
      <td class="${ability? '':'empty-cell'}">${ability ? `<span class="ability-tag">${abilityOverride ? `<img src="${getMegaFormDisplay(p.speciesEntryId).icon}" alt="" style="width:12px;height:12px;vertical-align:-1px;margin-right:3px;">` : ''}${escapeHTML(ability)}</span>` : (preset && preset.noAbilities ? '' : '-')}</td>
      ${g.moves.map((m, slot) => {
        const moveId = (g.moveIds && g.moveIds[slot]) || '';
        const zMoveMode = g.zMoveSlot === slot ? (g.zMoveMode || 'basic') : '';
        const maxMoveMode = (g.maxMoveModes && g.maxMoveModes[slot]) || '';
        const resolved = resolveDisplayedMove(p, m, moveId, zMoveMode, maxMoveMode, GAME_PRESET_INDEX[g.gameKey]);
        return `<td class="${resolved ? '':'empty-cell'}">${resolved ? movePillHTML(resolved) : '-'}</td>`;
      }).join('')}
    </tr>
  `;
  }).join('');

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'detailOverlay';
  overlay.dataset.pokemonId = p.id;
  overlay.onclick = (e) => { if(e.target === overlay) closeDetail(); };
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <div class="modal-close" role="button" tabindex="0" aria-label="Share as image" title="Share as image" style="right:64px;" onclick="shareCardAsImage('${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.6" x2="15.4" y2="6.4"/><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"/></svg>
        </div>
        <div class="modal-close" role="button" tabindex="0" aria-label="Close" data-autofocus onclick="closeDetail()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div style="display:flex; align-items:center; gap:16px;">
          <div class="card-sprite${displaySprite && usingPlaceholderSprite(p) ? ' is-placeholder-sprite' : ''}" style="${displaySprite && usingPlaceholderSprite(p) ? 'width:82px;height:82px;' : 'width:64px;height:64px;'} font-size:30px; --glow:${primaryColor};">${displaySprite ? `<img src="${escapeAttr(displaySprite)}">` : '<div class="brand-mark mini"></div>'}</div>
          <div>
            <div class="card-id" style="font-size:12px;">${dexPrefixHTML(p)}${formPrefix}${escapeHTML(p.species.toUpperCase())}${escapeHTML(formSuffix)}</div>
            <div style="font-family:var(--nickname-font); font-weight:800; font-size:26px; letter-spacing:-0.02em; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span>${titledNicknameHTML(p)}</span>
              ${p.pokerus === 'infected' ? `<img src="${POKERUS_INFECTED_ICON}" alt="Infected" title="Infected with Pokérus" style="width:20px;height:20px;">` : ''}
              ${p.pokerus === 'cured' ? `<img src="${POKERUS_CURED_ICON}" alt="Cured" title="Recovered from Pokérus" style="width:20px;height:20px;">` : ''}
              ${p.shiny ? `<img src="${SHINY_ICON}" alt="Shiny" title="Shiny" style="width:20px;height:20px;">` : ''}
              ${p.isTera ? `<img src="${TERASTALLIZATION_ICON}" alt="Terastallized" title="Terastallized${p.teraType ? ' (' + escapeAttr(p.teraType) + ')' : ''}" style="width:20px;height:20px;">` : ''}
              ${(p.isMega || p.isGigantamax) ? `<span class="detail-form-switcher">
                ${p.isMega ? `<button type="button" class="detail-form-switch-btn ${p.preferredForm==='mega'?'active':''}" title="${p.preferredForm==='mega' ? `Showing ${escapeAttr(getMegaFormDisplay(p.speciesEntryId).term)}, click to switch to Default` : `Switch to ${escapeAttr(getMegaFormDisplay(p.speciesEntryId).term)}`}" onclick="setPreferredForm('${p.id}','mega'); closeDetail(); openDetail('${p.id}')"><img src="${getMegaFormDisplay(p.speciesEntryId).icon}" alt="${escapeAttr(getMegaFormDisplay(p.speciesEntryId).term)}"></button>` : ''}
                ${p.isGigantamax ? `<button type="button" class="detail-form-switch-btn ${p.preferredForm==='gigantamax'?'active':''}" title="${p.preferredForm==='gigantamax' ? `Showing ${escapeAttr(getGigantamaxFormDisplay(p.speciesEntryId).term)}, click to switch to Default` : `Switch to ${escapeAttr(getGigantamaxFormDisplay(p.speciesEntryId).term)}`}" onclick="setPreferredForm('${p.id}','gigantamax'); closeDetail(); openDetail('${p.id}')"><img src="${getGigantamaxFormDisplay(p.speciesEntryId).icon}" alt="${escapeAttr(getGigantamaxFormDisplay(p.speciesEntryId).term)}"></button>` : ''}
              </span>` : ''}
            </div>
            <div class="type-row" style="margin:6px 0 0;">${typeRowHTML(p)}</div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="section-label">Profile</div>
        <div class="info-grid">
          <div class="info-cell"><div class="k">Nature</div><div class="v" style="display:flex; align-items:center; gap:6px;">${escapeHTML(p.nature)||'-'}${p.nature ? `<span class="nature-tooltip-trigger" tabindex="0" data-no-autofocus style="width:22px;height:22px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><div class="nature-tooltip" style="bottom:auto; top:calc(100% + 8px); left:0; right:auto;">${natureTooltipHTML(p.nature)}</div></span>` : ''}</div></div>
          <div class="info-cell"><div class="k">Gender</div><div class="v">${genderSymbolHTML(p.gender)||'-'}</div></div>
          <div class="info-cell"><div class="k">Met Location</div><div class="v">${p.metLocation||'-'}</div></div>
          <div class="info-cell"><div class="k">Housed Ball</div><div class="v" style="display:flex; align-items:center; gap:6px;">${p.ball ? `${ballIconHTML(p.ball,26)}${escapeHTML(p.ball)}` : '-'}</div></div>
          <div class="info-cell"><div class="k">Origin Game</div><div class="v" style="display:flex; align-items:center; gap:6px;">${(() => { const preset = GAME_PRESET_INDEX[detectGameKeyFromTag(p.originGame)]; return p.originGame ? `${preset ? `<img class="game-tag-icon" src="${preset.icon}" alt="${escapeAttr(preset.label)}" title="${escapeAttr(preset.label)}">` : ''}${escapeHTML(p.originGame)}` : '-'; })()}</div></div>
          <div class="info-cell"><div class="k">Last Game</div><div class="v" style="display:flex; align-items:center; gap:6px;">${(() => { const preset = GAME_PRESET_INDEX[detectGameKeyFromTag(p.lastGame)]; return p.lastGame ? `${preset ? `<img class="game-tag-icon" src="${preset.icon}" alt="${escapeAttr(preset.label)}" title="${escapeAttr(preset.label)}">` : ''}${escapeHTML(p.lastGame)}` : '-'; })()}</div></div>
          <div class="info-cell"><div class="k">Characteristic</div><div class="v">${escapeHTML(p.characteristic)||'-'}</div></div>
          <div class="info-cell"><div class="k">Species</div><div class="v"><a href="${bulbapediaURL(p.species)}" target="_blank" rel="noopener noreferrer" class="species-link" title="View on Bulbapedia">${escapeHTML(p.species)}<svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a></div></div>
        </div>

        ${p.metDate ? `<div class="section-label">Age</div><div class="age-display"><div class="age-duration">${formatAge(p.metDate) || 'Met date is in the future'}</div><div class="age-met-date"><svg class="age-clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>Met on <span class="age-met-date-value">${formatMetDate(p.metDate) || '-'}</span></div></div>` : ''}

        ${p.notes ? `<div class="section-label">Trainer Notes</div><div class="notes-box">${p.notes}</div>` : ''}

        <div class="section-label">Achievements</div>
        ${achievementsSectionHTML(p, true)}

        <div class="section-label-row">
          <div class="section-label">Moveset by Game</div>
          <div class="section-label-extra">Games Logged: ${p.games.length}</div>
        </div>
        <div class="table-scroll">
        <table class="movetable">
          <thead><tr><th>Game</th><th>Ability</th><th>Move 1</th><th>Move 2</th><th>Move 3</th><th>Move 4</th></tr></thead>
          <tbody>${movesRows || `<tr><td colspan="6" class="empty-cell">No games logged yet.</td></tr>`}</tbody>
        </table>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn danger" onclick="deletePokemon('${p.id}'); closeDetail();">Delete Pokémon</button>
        <button class="btn primary" onclick="closeDetail(); openForm('${p.id}')">Edit</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
function closeDetail(){
  const el = document.getElementById('detailOverlay');
  if(el) el.remove();
}

