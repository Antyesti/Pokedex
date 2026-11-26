function changelogEntryHTML(entry){
  return `
    <div class="changelog-entry ${entry.knownIssue?'known-issue':''}">
      <div class="changelog-entry-title">${entry.icon ? `<img src="${escapeHTML(entry.icon)}" alt="" class="changelog-entry-icon">` : ''}${escapeHTML(entry.title)}</div>
      <ul class="changelog-list">
        ${entry.items.map(i=>`<li>${i}</li>`).join('')}
      </ul>
    </div>
  `;
}

function changelogVersionHTML(v, idx, total = CHANGELOG.length){
  return `
    <div class="changelog-version">
      <div class="changelog-version-head">
        <h3>Pokédex ${escapeHTML(v.version)}</h3>
        ${idx===0 ? '<span class="latest-tag">Latest</span>' : ''}
      </div>
      ${v.entries.map(changelogEntryHTML).join('')}
    </div>
    ${idx < total-1 ? '<hr class="changelog-divider">' : ''}
  `;
}

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

