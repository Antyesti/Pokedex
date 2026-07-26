/* ============== FILTER/SEARCH HOOKS ============== */
const searchWrap = document.getElementById('searchWrap');
const searchMirror = document.getElementById('searchMirror');
const searchPlaceholder = document.getElementById('searchPlaceholder');
const searchGlow = document.getElementById('searchGlow');
const searchClearBtn = document.getElementById('searchClearBtn');

// Keeps the mirror showing exactly what's in the real input (which has its own glyphs
// hidden via -webkit-text-fill-color while .has-value is set -- see the .t-clear CSS).
// This has to run on every keystroke, not just during a clear, so the mirror never falls
// out of sync with what the person is actually typing.
function syncSearchMirror(){
  searchMirror.textContent = searchInput.value;
  searchWrap.classList.toggle('has-value', !!searchInput.value);
}

searchInput.addEventListener('input', () => {
  syncSearchMirror();
  updateSearchClearBtn();
  renderGrid();
});

function updateSearchClearBtn(){
  searchClearBtn.style.display = searchInput.value ? 'flex' : 'none';
}

// Reads the transition's tunables straight off :root each time instead of caching them,
// so a live CSS tweak takes effect on the very next clear without a reload.
function readRootVar(name, fallback){
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if(!raw) return fallback;
  const num = parseFloat(raw);
  return Number.isNaN(num) ? fallback : num;
}

let clearAnimHandle = null;

searchClearBtn.addEventListener('click', () => {
  const oldValue = searchInput.value;
  if(!oldValue){ searchInput.focus(); return; }
  if(clearAnimHandle){ cancelAnimationFrame(clearAnimHandle); clearAnimHandle = null; }

  // The real value clears (and the grid updates) immediately; the mirror keeps a frozen
  // snapshot of the old text and animates that away on its own clock, decoupled from state.
  const words = oldValue.split(/(\s+)/);
  searchMirror.innerHTML = words.map(w => w.trim() ? `<span class="t-clear-word">${escapeHTML(w)}</span>` : escapeHTML(w)).join('');

  searchInput.value = '';
  updateSearchClearBtn();
  renderGrid();
  searchWrap.classList.add('is-clearing');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finish = () => {
    searchWrap.classList.remove('is-clearing', 'has-value');
    searchMirror.innerHTML = '';
    searchMirror.style.transform = '';
    searchMirror.style.opacity = '';
    searchMirror.style.filter = '';
    searchPlaceholder.style.transition = '';
    searchPlaceholder.style.transform = '';
    searchPlaceholder.style.opacity = '';
    searchGlow.style.background = 'none';
    searchGlow.style.opacity = '0';
  };

  if(reduceMotion){ finish(); searchInput.focus(); return; }

  const outDur = readRootVar('--clear-out-dur', 400);
  const inDur = readRootVar('--clear-in-dur', 400);
  const outFly = readRootVar('--clear-out-fly', 12);
  const inFly = readRootVar('--clear-in-fly', 12);
  const blurMax = readRootVar('--clear-blur', 2);
  const glowDelay = readRootVar('--glow-delay', 50);
  const glowPeakAt = readRootVar('--glow-peak-at', 0.15);
  const glowOpacity = readRootVar('--glow-opacity', 0.85);
  const glowSpread = readRootVar('--glow-spread', 1.5);
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeIn = t => t * t * t;

  // Per-word streak positions, measured off the actual rendered spans rather than
  // estimated -- exact regardless of font, kerning, or which characters the word contains.
  const wordEls = Array.from(searchMirror.querySelectorAll('.t-clear-word'));
  const wrapRect = searchWrap.getBoundingClientRect();
  const wordBoxes = wordEls.map(el => {
    const r = el.getBoundingClientRect();
    return { centerX: r.left + r.width / 2 - wrapRect.left, width: r.width };
  });
  const isLight = typeof isNeumorphicActive === 'function' && isNeumorphicActive();
  const glowRgb = isLight ? '0,0,0' : '255,255,255'; // multiply darkens in light mode, screen lightens in dark

  const glowWindow = 500; // ms envelope per word; the stagger between words is separate
  const totalDur = Math.max(
    outDur, inDur,
    wordBoxes.length ? (wordBoxes.length - 1) * glowDelay + glowWindow : 0
  );
  const start = performance.now();

  searchPlaceholder.style.transition = 'none';
  searchPlaceholder.style.opacity = '0';
  searchPlaceholder.style.transform = `translateY(${inFly}px)`;

  function tick(now){
    const elapsed = now - start;

    const outT = Math.min(elapsed / outDur, 1);
    const outEased = easeOut(outT);
    searchMirror.style.transform = `translateY(${-outFly * outEased}px)`;
    searchMirror.style.opacity = String(1 - outEased);
    searchMirror.style.filter = `blur(${(blurMax * outEased).toFixed(2)}px)`;

    const inT = Math.min(elapsed / inDur, 1);
    const inEased = easeIn(inT);
    searchPlaceholder.style.transform = `translateY(${(inFly * (1 - inEased)).toFixed(2)}px)`;
    searchPlaceholder.style.opacity = String(inEased);

    if(wordBoxes.length){
      const layers = wordBoxes.map((box, i) => {
        const localElapsed = elapsed - i * glowDelay;
        const progress = Math.min(Math.max(localElapsed / glowWindow, 0), 1);
        let alpha = 0;
        if(localElapsed > 0){
          alpha = progress < glowPeakAt
            ? (progress / glowPeakAt) * glowOpacity
            : glowOpacity * (1 - (progress - glowPeakAt) / (1 - glowPeakAt));
        }
        alpha = Math.max(0, Math.min(1, alpha));
        const radius = Math.max(box.width, 24) * glowSpread;
        return `radial-gradient(circle ${radius.toFixed(1)}px at ${box.centerX.toFixed(1)}px 50%, rgba(${glowRgb},${alpha.toFixed(3)}) 0%, transparent 100%)`;
      });
      searchGlow.style.background = layers.join(', ');
      searchGlow.style.opacity = '1';
    }

    if(elapsed < totalDur){
      clearAnimHandle = requestAnimationFrame(tick);
    } else {
      clearAnimHandle = null;
      finish();
    }
  }
  clearAnimHandle = requestAnimationFrame(tick);
  searchInput.focus();
});

