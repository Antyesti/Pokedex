/* Color picker: a swatch button that opens a popover with a saturation/brightness area, hue slider,
   hex field, optional eyedropper, suggested and recent colors, and a contrast check.
   Ported from the LBJ app. Values live on the button (data-value), so callers read them with
   ColorPicker.get(el) and write them with ColorPicker.set(el, hex). */
const ColorPicker = (() => {
  const ICON_CHEVRON = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>';
  const ICON_EYE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3z"/></svg>';
  const SURFACES = ['#0b0f14','#10141c','#161b22','#1b1f2a','#1a1426','#12201f','#1f1a14','#241616','#f0f0f0','#f7f3ea','#e8eef5','#eee8f4','#f4e8ec','#e6f0ea','#ffffff','#000000'];
  const INKS = ['#e8edf2','#ffffff','#f5efe0','#d6e4ff','#e8dcff','#d8f5e8','#ffe3ea','#c9d1d9','#222224','#1a1a2e','#2a2230','#3b3b3f','#4a3f35','#1e2a3a','#14281f','#000000'];
  const ACCENTS = ['#9b5de5','#4fd1c5','#f2c14e','#ee1515','#ff8a3d','#f472b6','#a78bfa','#60a5fa','#22d3ee','#2dd4bf','#4ade80','#a3e635','#e5577b','#f5b800','#94a3b8','#ffffff'];
  const PRESETS = { surface: SURFACES, ink: INKS, accent: ACCENTS };
  const RECENT_KEY = 'pokedex_recent_colors_v1';
  const RECENT_MAX = 8;

  let pop = null, state = null;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function norm(v){
    v = String(v || '').trim().replace(/^#/, '');
    if(/^[0-9a-f]{3}$/i.test(v)) v = v.replace(/./g, '$&$&');
    return /^[0-9a-f]{6}$/i.test(v) ? '#' + v.toLowerCase() : null;
  }

  function rgbToHsv(r, g, b){
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0;
    if(d){
      h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
      if(h < 0) h += 360;
    }
    return [h, max ? d / max : 0, max];
  }

  function hsvToRgb(h, s, v){
    const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
    let r = 0, g = 0, b = 0;
    if(h < 60) [r, g, b] = [c, x, 0];
    else if(h < 120) [r, g, b] = [x, c, 0];
    else if(h < 180) [r, g, b] = [0, c, x];
    else if(h < 240) [r, g, b] = [0, x, c];
    else if(h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
  }

  function contrast(a, b){
    const x = relativeLuminance(hexToRgbArr(a)), y = relativeLuminance(hexToRgbArr(b));
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }

  function loadRecent(){
    try{
      const list = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      return Array.isArray(list) ? list.map(norm).filter(Boolean).slice(0, RECENT_MAX) : [];
    } catch(e){
      return [];
    }
  }

  function saveRecent(hex){
    const list = loadRecent().filter(c => c !== hex);
    list.unshift(hex);
    try{ localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_MAX))); } catch(e){}
  }

  /* opts: value, def, presets ('surface' | 'ink' | 'accent'), role ('bg' | 'fg'), against (id of the
     field this color is checked against for contrast). */
  function field(id, label, opts = {}){
    const v = norm(opts.value) || opts.def || '#ffffff';
    return `<button type="button" id="${id}" class="btn ghost cpb" data-value="${v}" data-label="${esc(label)}" data-def="${opts.def || ''}" data-presets="${opts.presets || 'accent'}" data-role="${opts.role || 'fg'}" data-against="${opts.against || ''}" aria-haspopup="dialog" aria-expanded="false" aria-label="${esc(label)}: ${v}. Change color"><i class="cps" style="background:${v}"></i><span class="cpv">${v}</span>${ICON_CHEVRON}</button>`;
  }

  const get = el => norm(el.dataset.value) || el.dataset.def || '#ffffff';

  function paint(btn, hex){
    btn.dataset.value = hex;
    const s = btn.querySelector('.cps'), t = btn.querySelector('.cpv');
    if(s) s.style.background = hex;
    if(t) t.textContent = hex;
    btn.setAttribute('aria-label', `${btn.dataset.label || 'Color'}: ${hex}. Change color`);
  }

  function set(el, hex){
    const c = norm(hex);
    if(c) paint(el, c);
  }

  function bind(root, onChange){
    root.querySelectorAll('button.cpb').forEach(b => {
      b._cpChange = onChange;
      b.onclick = () => (pop && state.btn === b ? close(true) : open(b));
    });
  }

  function commit(hex){
    const st = state;
    st.hex = hex;
    paint(st.btn, hex);
    if(st.btn._cpChange) st.btn._cpChange(st.btn, hex);
  }

  function open(btn){
    close(false);
    const hex = get(btn), [h, s, v] = rgbToHsv(...hexToRgbArr(hex));
    state = { btn, hex, start: hex, h, s, v, def: btn.dataset.def, role: btn.dataset.role, against: btn.dataset.against, presets: PRESETS[btn.dataset.presets] || ACCENTS };
    pop = document.createElement('div');
    pop.className = 'cp-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', 'Choose a color');
    // Freeze the popover's own colors while it is open. The theme previews live as the person
    // drags, and a popover that restyles itself mid-drag can end up unreadable.
    const cs = getComputedStyle(document.documentElement);
    pop.style.setProperty('--cp-bg', cs.getPropertyValue('--bg').trim());
    pop.style.setProperty('--cp-tx', cs.getPropertyValue('--text').trim());
    pop.innerHTML = `<div class="cp-sv" tabindex="0" role="slider" aria-label="Saturation and brightness" aria-valuetext=""><div class="cp-thumb"></div></div>
      <div class="cp-row"><div class="cp-hue"><input type="range" min="0" max="360" step="1" aria-label="Hue"></div>${window.EyeDropper ? `<button type="button" class="cp-eye" title="Pick a color from the screen" aria-label="Pick a color from the screen">${ICON_EYE}</button>` : ''}</div>
      <div class="cp-in"><div class="cp-prev" title="New color (left) and previous color (right)"><i class="n"></i><i class="o" style="background:${state.start}"></i></div><label>Hex<input class="hex-input cp-hex" maxlength="7" spellcheck="false" autocomplete="off" aria-label="Hex color"></label></div>
      <div><div class="cp-sec">Suggested</div><div class="cp-grid" data-g="p"></div></div>
      <div><div class="cp-sec">Recent</div><div class="cp-grid" data-g="r"></div></div>
      <div class="cp-foot"><span class="cp-badge"></span><span class="cp-actions">${state.def ? '<button type="button" class="btn ghost" data-a="reset">Reset</button>' : ''}<button type="button" class="btn primary" data-a="done">Done</button></span></div>`;
    document.body.append(pop);
    btn.setAttribute('aria-expanded', 'true');

    const sv = pop.querySelector('.cp-sv'), hue = pop.querySelector('.cp-hue input'), hx = pop.querySelector('.cp-hex');

    const grid = (k, list) => {
      const g = pop.querySelector(`[data-g="${k}"]`);
      g.innerHTML = list.length
        ? list.map(c => `<button type="button" style="background:${c}" data-c="${c}" title="${c}" aria-label="${c}" aria-pressed="${c === state.hex}"></button>`).join('')
        : '<span class="cp-none">Colors you use will appear here.</span>';
    };

    const sync = (fromInput, silent, exact) => {
      const st = state, [r, g, b] = hsvToRgb(st.h, st.s, st.v);
      st.hex = exact || rgbToHex(r, g, b);
      pop.style.setProperty('--cp-h', Math.round(st.h));
      const th = pop.querySelector('.cp-thumb');
      th.style.left = st.s * 100 + '%';
      th.style.top = (1 - st.v) * 100 + '%';
      th.style.background = st.hex;
      sv.setAttribute('aria-valuetext', `Saturation ${Math.round(st.s * 100)}%, brightness ${Math.round(st.v * 100)}%`);
      hue.value = st.h;
      pop.querySelector('.cp-prev .n').style.background = st.hex;
      if(!fromInput){ hx.value = st.hex; hx.classList.remove('invalid'); }
      pop.querySelectorAll('[data-g] button').forEach(x => x.setAttribute('aria-pressed', x.dataset.c === st.hex));
      // Contrast is checked against the paired color (background vs text), read live from its button.
      const otherEl = st.against ? document.getElementById(st.against) : null;
      const other = otherEl ? get(otherEl) : (st.role === 'bg' ? '#ffffff' : '#000000');
      const cr = contrast(st.hex, other);
      const lvl = cr >= 7 ? ['AAA', 'ok'] : cr >= 4.5 ? ['AA', 'ok'] : cr >= 3 ? ['Large text only', 'no'] : ['Low', 'no'];
      const chipBg = st.role === 'bg' ? st.hex : other, chipTx = st.role === 'bg' ? other : st.hex;
      pop.querySelector('.cp-badge').innerHTML = `<i style="background:${chipBg};color:${chipTx}">Aa</i><span class="${lvl[1]}">${cr.toFixed(1)}:1</span><u class="${lvl[1]}">${lvl[0]}</u>`;
      if(!silent) commit(st.hex);
    };

    const fromHex = raw => {
      const c = norm(raw);
      if(!c) return;
      const [h2, s2, v2] = rgbToHsv(...hexToRgbArr(c));
      state.h = s2 && v2 ? h2 : state.h;
      state.s = s2;
      state.v = v2;
      sync(false, false, c);
    };

    grid('p', state.presets);
    grid('r', loadRecent());
    sync(false, true, hex);

    const move = e => {
      const r = sv.getBoundingClientRect();
      state.s = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      state.v = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      sync(false);
    };
    sv.onpointerdown = e => {
      e.preventDefault();
      sv.setPointerCapture(e.pointerId);
      sv.focus();
      move(e);
      sv.onpointermove = move;
      sv.onpointerup = sv.onpointercancel = () => { sv.onpointermove = null; };
    };
    sv.onkeydown = e => {
      const k = e.shiftKey ? 0.1 : 0.02;
      const d = { ArrowLeft: [-k, 0], ArrowRight: [k, 0], ArrowUp: [0, k], ArrowDown: [0, -k] }[e.key];
      if(!d) return;
      e.preventDefault();
      state.s = Math.min(1, Math.max(0, state.s + d[0]));
      state.v = Math.min(1, Math.max(0, state.v + d[1]));
      sync(false);
    };
    hue.oninput = () => { state.h = +hue.value; sync(false); };
    hx.oninput = () => {
      const c = norm(hx.value);
      hx.classList.toggle('invalid', !c);
      if(c){
        const [h2, s2, v2] = rgbToHsv(...hexToRgbArr(c));
        state.h = s2 && v2 ? h2 : state.h;
        state.s = s2;
        state.v = v2;
        sync(true, false, c);
      }
    };
    hx.onblur = () => { hx.value = state.hex; hx.classList.remove('invalid'); };
    pop.onclick = e => {
      const c = e.target.closest('[data-c]'), a = e.target.closest('[data-a]'), ey = e.target.closest('.cp-eye');
      if(c) fromHex(c.dataset.c);
      else if(a && a.dataset.a === 'done') close(true);
      else if(a && a.dataset.a === 'reset' && state.def) fromHex(state.def);
      else if(ey) new EyeDropper().open().then(r => fromHex(r.sRGBHex)).catch(() => {});
    };
    place();
    sv.focus({ preventScroll: true });
  }

  function place(){
    if(!pop) return;
    const r = state.btn.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight, M = 8;
    const cx = v => Math.min(Math.max(M, v), innerWidth - w - M);
    const cy = v => Math.min(Math.max(M, v), innerHeight - h - M);
    let x = cx(r.left), y;
    if(r.bottom + M + h <= innerHeight - M) y = r.bottom + M;
    else if(r.top - M - h >= M) y = r.top - M - h;
    else if(r.left - M - w >= M){ x = r.left - M - w; y = cy(r.top + r.height / 2 - h / 2); }
    else if(r.right + M + w <= innerWidth - M){ x = r.right + M; y = cy(r.top + r.height / 2 - h / 2); }
    else y = cy(r.bottom + M);
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
  }

  function close(keepFocus){
    if(!pop) return;
    const st = state;
    if(st.hex !== st.start) saveRecent(st.hex);
    pop.remove();
    pop = null;
    state = null;
    st.btn.setAttribute('aria-expanded', 'false');
    if(keepFocus) try{ st.btn.focus({ preventScroll: true }); } catch(e){}
  }

  document.addEventListener('pointerdown', e => {
    if(pop && !pop.contains(e.target) && !state.btn.contains(e.target)) close(false);
  }, true);
  // Capture phase, so Escape closes only the picker and not the Settings modal behind it.
  document.addEventListener('keydown', e => {
    if(pop && e.key === 'Escape'){
      e.preventDefault();
      e.stopPropagation();
      close(true);
    }
  }, true);
  addEventListener('resize', place);
  addEventListener('scroll', place, true);

  return { field, bind, get, set, close };
})();
