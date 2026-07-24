/**
 * Share as Image
 * --------------
 * Renders a Pokémon card (with its full earned-achievement list) or the entire
 * roster to an off-screen <canvas> and exports the result as a PNG, via the
 * Web Share API's file sharing when available, falling back to a direct
 * download otherwise. Independent of the current theme so shared images look
 * the same regardless of Poké Ball / Beast Ball / Master Ball selection.
 */

function loadImageAsync(src){
  return new Promise(resolve => {
    if(!src){ resolve(null); return; }
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRectPath(ctx, x, y, w, h, r){
  const rr = Math.min(r, w/2, h/2);
  ctx.beginPath();
  ctx.moveTo(x+rr, y);
  ctx.arcTo(x+w, y, x+w, y+h, rr);
  ctx.arcTo(x+w, y+h, x, y+h, rr);
  ctx.arcTo(x, y+h, x, y, rr);
  ctx.arcTo(x, y, x+w, y, rr);
  ctx.closePath();
}

function drawCoverImage(ctx, img, x, y, w, h, radius){
  if(radius) { ctx.save(); roundRectPath(ctx, x, y, w, h, radius); ctx.clip(); }
  if(img){
    const scale = Math.max(w / img.width, h / img.height);
    const dw = img.width * scale, dh = img.height * scale;
    ctx.drawImage(img, x + (w-dw)/2, y + (h-dh)/2, dw, dh);
  }
  if(radius) ctx.restore();
}

function truncateToWidth(ctx, text, maxWidth){
  if(ctx.measureText(text).width <= maxWidth) return text;
  let out = text;
  while(out.length > 1 && ctx.measureText(out + '…').width > maxWidth){
    out = out.slice(0, -1);
  }
  return out + '…';
}

async function canvasToPngFile(canvas, filename){
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  return new File([blob], filename, { type: 'image/png' });
}

// Coarse pointer + touch support is a reasonable proxy for "mobile" without relying on
// brittle user-agent string parsing.
function isMobileDevice(){
  return window.matchMedia('(pointer: coarse)').matches && navigator.maxTouchPoints > 0;
}

function downloadFile(file){
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

async function shareOrDownloadCanvas(canvas, filename){
  const file = await canvasToPngFile(canvas, filename);
  if(isMobileDevice() && navigator.canShare && navigator.canShare({ files: [file] })){
    try{
      await navigator.share({ files: [file] });
      return;
    } catch(e){
      if(e.name === 'AbortError') return; // user closed the share sheet
      // any other share failure falls through to a direct download
    }
  }
  downloadFile(file);
}

/* ---------- Single-card share ---------- */

const SHARE_CARD_WIDTH = 760;
const SHARE_PAD = 36;
const SHARE_CHIP_H = 34;
const SHARE_META_CHIP_H = 32;
const SHARE_CHIP_GAP = 10;

// Lays out fixed-width chips left-to-right within maxWidth, wrapping to a new row as
// needed, and returns the y-coordinate immediately below the last row drawn.
function layoutChips(items, startX, startY, maxWidth, rowHeight, gap, draw){
  let cx = startX, cy = startY;
  items.forEach(item => {
    if(cx !== startX && cx + item.width > startX + maxWidth){
      cx = startX;
      cy += rowHeight + gap;
    }
    draw(item, cx, cy);
    cx += item.width + gap;
  });
  return cy + rowHeight;
}

function measureChip(ctx, text, iconSize){
  const textWidth = ctx.measureText(text).width;
  return { text, width: iconSize + 8 + textWidth + 20 };
}

// How many wrapped rows a set of pre-measured chips will take up at a given width --
// shared by every block that lays chips out with layoutChips, so the canvas can be
// sized up front without actually drawing anything yet.
function chipRowCount(items, maxWidth, gap){
  if(items.length === 0) return 0;
  let cx = 0, rows = 1;
  items.forEach(item => {
    if(cx !== 0 && cx + item.width > maxWidth){ rows++; cx = 0; }
    cx += item.width + gap;
  });
  return rows;
}

// A glass-style chip background: soft fill, a diagonal sheen, and a hairline border --
// used for both the meta row and achievement chips so they read as the same family of UI.
function drawGlassChip(ctx, x, y, w, h, r){
  roundRectPath(ctx, x, y, w, h, r);
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fill();
  ctx.save();
  roundRectPath(ctx, x, y, w, h, r);
  ctx.clip();
  const sheen = ctx.createLinearGradient(x, y, x + w*0.35, y + h);
  sheen.addColorStop(0, 'rgba(255,255,255,0.14)');
  sheen.addColorStop(0.7, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,255,0.10)';
  ctx.lineWidth = 1;
  roundRectPath(ctx, x+0.5, y+0.5, w-1, h-1, r);
  ctx.stroke();
}

function typeBadgeWidth(ctx, label, h, fontPx){
  ctx.font = `700 ${fontPx}px "Outfit", sans-serif`;
  return ctx.measureText(label).width + h*0.9;
}

// A type badge with the same gradient sheen + text shadow the live app's .type-badge uses,
// instead of a flat solid pill. Returns the badge's drawn width.
function drawTypeBadgePill(ctx, x, y, label, hex, h, fontPx){
  const w = typeBadgeWidth(ctx, label, h, fontPx);
  const r = h/2;
  roundRectPath(ctx, x, y, w, h, r);
  ctx.fillStyle = hex;
  ctx.fill();
  ctx.save();
  roundRectPath(ctx, x, y, w, h, r);
  ctx.clip();
  const sheen = ctx.createLinearGradient(x, y, x + w*0.4, y + h);
  sheen.addColorStop(0, 'rgba(255,255,255,0.34)');
  sheen.addColorStop(0.55, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetY = 1;
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(label, x + w/2 - ctx.measureText(label).width/2, y + h*0.68);
  ctx.restore();
  return w;
}

// Draws a Poké Ball glyph (matching the app's own header mark) at a given center/radius,
// used as a corner watermark on shared images and as the no-sprite placeholder, so an
// image shared outside the app is still recognizably "from" it.
function drawPokeBallGlyph(ctx, cx, cy, r, opacity){
  ctx.save();
  ctx.globalAlpha = opacity != null ? opacity : 1;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI*2);
  ctx.clip();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx-r, cy-r, r*2, r);
  ctx.fillStyle = '#1a1f26';
  ctx.fillRect(cx-r, cy, r*2, r);
  ctx.fillRect(cx-r, cy-r*0.09, r*2, r*0.18);
  ctx.restore();
  ctx.beginPath();
  ctx.arc(cx, cy, r - r*0.065, 0, Math.PI*2);
  ctx.lineWidth = r*0.13;
  ctx.strokeStyle = '#1a1f26';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r*0.32, 0, Math.PI*2);
  ctx.fillStyle = '#1a1f26';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, r*0.32 - r*0.065, 0, Math.PI*2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();
}

// Decodes an animated PNG data URI into its individual composited frames using the
// vendored UPNG/pako libraries. Returns null for static images or anything that isn't a
// PNG.
function decodeAnimatedApng(dataUri){
  if(!dataUri || !dataUri.startsWith('data:image/png')) return null;
  try{
    const base64 = dataUri.slice(dataUri.indexOf(',') + 1);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const decoded = UPNG.decode(bytes.buffer);
    if(!decoded.frames || decoded.frames.length <= 1) return null;
    const rgbaFrames = UPNG.toRGBA8(decoded);
    const delays = decoded.frames.map(f => f.delay || 100);
    return { width: decoded.width, height: decoded.height, frames: rgbaFrames, delays };
  } catch(e){
    return null; // malformed/unsupported PNG -- fall back to a static export
  }
}

// Decodes an animated GIF data URI into its individual composited frames using the
// vendored gifuct-js library, replaying each frame's disposal method onto a persistent
// canvas the same way a GIF player would. Returns null for static images or anything
// that isn't a GIF.
function decodeAnimatedGif(dataUri){
  if(!dataUri || !dataUri.startsWith('data:image/gif')) return null;
  try{
    const base64 = dataUri.slice(dataUri.indexOf(',') + 1);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const gif = gifuct.parseGIF(bytes.buffer);
    const frames = gifuct.decompressFrames(gif, true);
    if(!frames || frames.length <= 1) return null;

    const width = gif.lsd.width, height = gif.lsd.height;
    const composite = document.createElement('canvas');
    composite.width = width;
    composite.height = height;
    const cctx = composite.getContext('2d');
    const patchCanvas = document.createElement('canvas');
    const pctx = patchCanvas.getContext('2d');

    const rgbaFrames = [];
    const delays = [];
    frames.forEach(frame => {
      if(frame.disposalType === 2) cctx.clearRect(0, 0, width, height);
      patchCanvas.width = frame.dims.width;
      patchCanvas.height = frame.dims.height;
      const patchImageData = pctx.createImageData(frame.dims.width, frame.dims.height);
      patchImageData.data.set(frame.patch);
      pctx.putImageData(patchImageData, 0, 0);
      cctx.drawImage(patchCanvas, frame.dims.left, frame.dims.top);
      rgbaFrames.push(cctx.getImageData(0, 0, width, height).data.buffer);
      delays.push(frame.delay || 100);
    });
    return { width, height, frames: rgbaFrames, delays };
  } catch(e){
    return null; // malformed/unsupported GIF -- fall back to a static export
  }
}

// Dispatches to the right decoder based on the sprite's data URI mime type.
function decodeAnimatedSprite(dataUri){
  return decodeAnimatedApng(dataUri) || decodeAnimatedGif(dataUri);
}

function frameBufferToCanvas(buffer, width, height){
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(buffer), width, height), 0, 0);
  return c;
}

// One-time async loads shared across every frame of a card render (sprite excluded --
// that's supplied per frame by the caller).
async function prepareCardShareAssets(p){
  const achievements = earnedAchievementEntries(p);
  const types = displayTypes(p);
  const measureCanvas = document.createElement('canvas');
  const mctx = measureCanvas.getContext('2d');
  const contentWidth = SHARE_CARD_WIDTH - SHARE_PAD*2;
  mctx.font = '600 15px "Outfit", sans-serif';
  const achievementChips = achievements.map(a => measureChip(mctx, a.name, 26));

  const ballImg = p.ball ? await loadImageAsync(BALL_LOOKUP[p.ball] || '') : null;
  const achievementIcons = await Promise.all(achievements.map(a => loadImageAsync(a.icon)));

  // Meta row (met location / ball / origin-last game) drawn as wrapping chips, same as
  // achievements, rather than fixed stacked text lines -- so it only takes up as much
  // room as it actually needs, and reads as the same family of UI as everything else.
  const metaItems = [];
  if(p.metLocation) metaItems.push({ text: stripHTML(p.metLocation), icon: null });
  if(p.ball) metaItems.push({ text: p.ball, icon: ballImg });
  if(p.originGame || p.lastGame){
    const route = (p.originGame && p.originGame === p.lastGame) ? p.originGame : `${p.originGame || '-'}  →  ${p.lastGame || '-'}`;
    metaItems.push({ text: route, icon: null });
  }
  mctx.font = '600 14px "Outfit", sans-serif';
  const maxChipTextWidth = contentWidth * 0.6;
  const metaChips = metaItems.map(item => {
    const text = truncateToWidth(mctx, item.text, maxChipTextWidth);
    return { ...measureChip(mctx, text, item.icon ? 20 : 0), icon: item.icon };
  });

  const achvRows = chipRowCount(achievementChips, contentWidth, SHARE_CHIP_GAP);
  const achvBlockHeight = 40 + (achievements.length > 0 ? achvRows * (SHARE_CHIP_H + SHARE_CHIP_GAP) : 26);

  const metaRows = chipRowCount(metaChips, contentWidth, SHARE_CHIP_GAP);
  const metaBlockHeight = metaChips.length > 0 ? metaRows * (SHARE_META_CHIP_H + SHARE_CHIP_GAP) : 0;

  const headerHeight = 176;
  const height = SHARE_PAD*2 + headerHeight + metaBlockHeight + achvBlockHeight + 30;

  return { achievements, achievementChips, metaChips, contentWidth, headerHeight, metaBlockHeight, achvBlockHeight, height, ballImg, achievementIcons, types };
}

// Pure/synchronous: draws one full card frame given already-loaded assets and a sprite
// drawable (an Image for a static sprite, or a per-frame canvas for an animated one).
function drawCardFrame(p, assets, spriteDrawable){
  const { achievements, achievementChips, metaChips, contentWidth, headerHeight, metaBlockHeight, achvBlockHeight, height, ballImg, achievementIcons, types } = assets;
  const primary = TYPE_HEX[types[0]] || '#4FD1C5';
  const secondary = TYPE_HEX[types[1]] || primary;

  const scale = 2; // render at 2x for a crisp export
  const canvas = document.createElement('canvas');
  canvas.width = SHARE_CARD_WIDTH * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // Background: dark glass panel with a diagonal type-color wash and a soft ambient glow
  // behind the sprite corner, independent of the app's current theme so shared images look
  // the same regardless of Poké Ball / Beast Ball / Master Ball selection.
  roundRectPath(ctx, 0, 0, SHARE_CARD_WIDTH, height, 28);
  ctx.save();
  ctx.clip();
  const grad = ctx.createLinearGradient(0, 0, SHARE_CARD_WIDTH, height);
  grad.addColorStop(0, '#161923');
  grad.addColorStop(1, '#1c2030');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, SHARE_CARD_WIDTH, height);
  const tintGrad = ctx.createLinearGradient(0, 0, SHARE_CARD_WIDTH, height);
  tintGrad.addColorStop(0, hexToRgba(primary, 0.16));
  tintGrad.addColorStop(1, hexToRgba(secondary, 0.10));
  ctx.fillStyle = tintGrad;
  ctx.fillRect(0, 0, SHARE_CARD_WIDTH, height);
  const ambientGlow = ctx.createRadialGradient(SHARE_PAD + 70, SHARE_PAD + 70, 0, SHARE_PAD + 70, SHARE_PAD + 70, 260);
  ambientGlow.addColorStop(0, hexToRgba(primary, 0.22));
  ambientGlow.addColorStop(1, hexToRgba(primary, 0));
  ctx.fillStyle = ambientGlow;
  ctx.fillRect(0, 0, SHARE_CARD_WIDTH, height);
  // top inner highlight, like the app's own glass cards/modals
  const topHighlight = ctx.createLinearGradient(0, 0, 0, 40);
  topHighlight.addColorStop(0, 'rgba(255,255,255,0.10)');
  topHighlight.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = topHighlight;
  ctx.fillRect(0, 0, SHARE_CARD_WIDTH, 40);
  ctx.restore();
  ctx.strokeStyle = hexToRgba(primary, 0.5);
  ctx.lineWidth = 2;
  roundRectPath(ctx, 1, 1, SHARE_CARD_WIDTH-2, height-2, 28);
  ctx.stroke();

  // Corner watermark, low-opacity, so a shared image is still recognizably from the app.
  drawPokeBallGlyph(ctx, SHARE_CARD_WIDTH - 30, height - 30, 16, 0.16);

  let x = SHARE_PAD, y = SHARE_PAD;

  // Sprite pedestal, tinted with the Pokémon's own type color the same way the live
  // card grid is, with a Poké Ball glyph standing in when there's no sprite at all.
  roundRectPath(ctx, x, y, 140, 140, 20);
  const spriteGlow = ctx.createRadialGradient(x+70, y+91, 0, x+70, y+91, 100);
  spriteGlow.addColorStop(0, hexToRgba(primary, 0.4));
  spriteGlow.addColorStop(1, hexToRgba(primary, 0));
  ctx.save();
  ctx.clip();
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(x, y, 140, 140);
  ctx.fillStyle = spriteGlow;
  ctx.fillRect(x, y, 140, 140);
  ctx.restore();
  ctx.strokeStyle = hexToRgba(primary, 0.3);
  ctx.lineWidth = 1.5;
  roundRectPath(ctx, x+0.75, y+0.75, 140-1.5, 140-1.5, 20);
  ctx.stroke();
  if(spriteDrawable) drawCoverImage(ctx, spriteDrawable, x+8, y+8, 124, 124, 14);
  else drawPokeBallGlyph(ctx, x+70, y+70, 26, 1);

  // Name/species column
  const textX = x + 160;
  const textWidth = contentWidth - 160;
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#9aa3b8';
  ctx.font = '600 13px "Kode Mono", monospace';
  const speciesEntry = p.speciesEntryId ? findSpeciesEntry(p.speciesEntryId) : null;
  const dexPrefix = speciesEntry ? dexNumberFormatted(speciesEntry.dex) + '  ·  ' : '';
  const formPrefix = p.preferredForm === 'mega' ? 'MEGA ' : p.preferredForm === 'gigantamax' ? 'GIGANTAMAX ' : '';
  const formSuffix = (p.preferredForm === 'mega' && p.megaForm) ? ' ' + p.megaForm.toUpperCase() : '';
  ctx.fillText(truncateToWidth(ctx, `${dexPrefix}${formPrefix}${p.species.toUpperCase()}${formSuffix}`, textWidth), textX, y + 22);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 30px "Outfit", sans-serif';
  const name = titledNicknamePlainText(p);
  ctx.fillText(truncateToWidth(ctx, name, textWidth), textX, y + 58);

  ctx.font = '500 15px "Outfit", sans-serif';
  ctx.fillStyle = '#c3c9d9';
  const genderSymbol = p.gender === 'Male' ? '♂ Male' : p.gender === 'Female' ? '♀ Female' : p.gender === 'Genderless' ? '○ Genderless' : '';
  const subLine = [p.nature, genderSymbol].filter(Boolean).join('  ·  ');
  if(subLine) ctx.fillText(truncateToWidth(ctx, subLine, textWidth), textX, y + 82);

  if(p.shiny){
    ctx.fillStyle = '#FFD24C';
    ctx.font = '700 14px "Outfit", sans-serif';
    ctx.fillText('★ SHINY', textX, y + 106);
  }

  // Type badges, with the same gradient sheen + text shadow as the live app's badges
  let typeX = textX;
  const typeY = y + 116;
  types.forEach(t => {
    const w = drawTypeBadgePill(ctx, typeX, typeY, t.toUpperCase(), TYPE_HEX[t] || '#4FD1C5', 26, 13);
    typeX += w + 8;
  });

  y += headerHeight;

  // Meta row: met location, ball, origin -> last game, drawn as glass chips
  if(metaChips.length > 0){
    ctx.font = '600 14px "Outfit", sans-serif';
    layoutChips(metaChips, x, y, contentWidth, SHARE_META_CHIP_H, SHARE_CHIP_GAP, (item, cx, cy) => {
      drawGlassChip(ctx, cx, cy, item.width, SHARE_META_CHIP_H, 16);
      const icon = item.icon;
      const textStartX = cx + 14 + (icon ? 20 + 8 : 0);
      if(icon) ctx.drawImage(icon, cx+14, cy + (SHARE_META_CHIP_H-20)/2, 20, 20);
      ctx.fillStyle = '#d7dcea';
      ctx.font = '600 14px "Outfit", sans-serif';
      ctx.fillText(item.text, textStartX, cy + SHARE_META_CHIP_H/2 + 5);
    });
    y += metaBlockHeight;
  }

  // Achievements
  ctx.font = '700 16px "Outfit", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Achievements (${achievements.length})`, x, y + 16);
  y += 34;

  if(achievements.length === 0){
    ctx.font = '500 14px "Outfit", sans-serif';
    ctx.fillStyle = '#8891a5';
    ctx.fillText('None yet.', x, y + 14);
  } else {
    ctx.font = '600 15px "Outfit", sans-serif';
    layoutChips(achievementChips, x, y, contentWidth, SHARE_CHIP_H, SHARE_CHIP_GAP, (item, cx, cy) => {
      const idx = achievementChips.indexOf(item);
      drawGlassChip(ctx, cx, cy, item.width, SHARE_CHIP_H, 17);
      const icon = achievementIcons[idx];
      if(icon) ctx.drawImage(icon, cx+8, cy+4, 26, 26);
      ctx.fillStyle = '#e8ecf5';
      ctx.font = '600 15px "Outfit", sans-serif';
      ctx.fillText(item.text, cx + 8 + 26 + 8, cy + 22);
    });
  }

  return canvas;
}

// Encodes a set of same-size canvases into an animated PNG via the vendored UPNG encoder.
function encodeCanvasesAsApng(canvases, delays){
  const w = canvases[0].width, h = canvases[0].height;
  const buffers = canvases.map(c => c.getContext('2d').getImageData(0, 0, w, h).data.buffer);
  const apngBuffer = UPNG.encode(buffers, w, h, 0, delays);
  return new Blob([apngBuffer], { type: 'image/png' });
}

// Injects gifenc.js on first use instead of loading it upfront, since it's only needed
// when the GIF export format is selected. Cached so repeat calls reuse the same load.
let gifencLoadPromise = null;
function loadGifenc(){
  if(window.gifenc) return Promise.resolve();
  if(gifencLoadPromise) return gifencLoadPromise;
  gifencLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'js/vendor/gifenc.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return gifencLoadPromise;
}

// Encodes a set of same-size canvases into an animated GIF via the vendored gifenc encoder.
function encodeCanvasesAsGif(canvases, delays){
  const w = canvases[0].width, h = canvases[0].height;
  const gif = gifenc.GIFEncoder();
  canvases.forEach((c, i) => {
    const data = c.getContext('2d').getImageData(0, 0, w, h).data;
    const palette = gifenc.quantize(data, 256);
    const index = gifenc.applyPalette(data, palette);
    gif.writeFrame(index, w, h, { palette, delay: delays[i] });
  });
  gif.finish();
  return new Blob([gif.bytes()], { type: 'image/gif' });
}

async function shareCardAsImage(id){
  const p = findPokemonById(id);
  if(!p) return;
  showToast('Preparing image…');
  try{
    const spriteSrc = resolveDisplaySprite(p);
    const assets = await prepareCardShareAssets(p);
    const animated = decodeAnimatedSprite(spriteSrc);
    const baseName = (p.nickname || p.species || 'pokemon').replace(/[^a-z0-9]+/gi,'-').toLowerCase();

    if(!animated){
      const spriteImg = await loadImageAsync(spriteSrc);
      const canvas = drawCardFrame(p, assets, spriteImg);
      await shareOrDownloadCanvas(canvas, `${baseName}.png`);
      return;
    }

    // Animated sprite: draw one full card per source frame, reusing the same preloaded
    // ball/achievement icons, then re-encode the results in the user's preferred format.
    const frameCanvases = animated.frames.map(buffer =>
      drawCardFrame(p, assets, frameBufferToCanvas(buffer, animated.width, animated.height))
    );
    const useGif = state.settings && state.settings.shareFormat === 'gif';
    if(useGif) await loadGifenc();
    const blob = useGif
      ? encodeCanvasesAsGif(frameCanvases, animated.delays)
      : encodeCanvasesAsApng(frameCanvases, animated.delays);
    const filename = useGif ? `${baseName}.gif` : `${baseName}.png`;
    const file = new File([blob], filename, { type: blob.type });
    if(isMobileDevice() && navigator.canShare && navigator.canShare({ files: [file] })){
      try{ await navigator.share({ files: [file] }); return; }
      catch(e){ if(e.name === 'AbortError') return; }
    }
    downloadFile(file);
  } catch(e){
    showToast('Could not generate the share image.');
  }
}

/* ---------- Roster share ---------- */

const ROSTER_CELL_W = 170;
const ROSTER_CELL_H = 210;
const ROSTER_PAD = 36;
const ROSTER_GAP = 16;

async function buildRosterShareCanvas(){
  const list = state.pokemon;
  const columns = Math.max(1, Math.min(6, Math.floor((1180 - ROSTER_PAD*2 + ROSTER_GAP) / (ROSTER_CELL_W + ROSTER_GAP))));
  const width = ROSTER_PAD*2 + columns*ROSTER_CELL_W + (columns-1)*ROSTER_GAP;
  const rows = Math.max(1, Math.ceil(list.length / columns));
  const headerHeight = 108;
  const height = headerHeight + ROSTER_PAD + rows*ROSTER_CELL_H + (rows-1)*ROSTER_GAP + ROSTER_PAD;

  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#161923');
  bgGrad.addColorStop(1, '#0f1118');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);
  const ambientGlow = ctx.createRadialGradient(width*0.15, 0, 0, width*0.15, 0, 340);
  ambientGlow.addColorStop(0, 'rgba(79,209,197,0.14)');
  ambientGlow.addColorStop(1, 'rgba(79,209,197,0)');
  ctx.fillStyle = ambientGlow;
  ctx.fillRect(0, 0, width, height);

  drawPokeBallGlyph(ctx, ROSTER_PAD + 15, 34, 15, 1);

  const trainerName = (state.trainer||'').trim();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 30px "Outfit", sans-serif';
  ctx.fillText(trainerName ? `${trainerName}'s Pokédex` : 'Pokédex', ROSTER_PAD + 40, 48);

  const shinyCount = list.filter(p=>p.shiny).length;
  ctx.font = '500 15px "Kode Mono", monospace';
  ctx.fillStyle = '#9aa3b8';
  ctx.fillText(`${list.length} Pok\u00e9mon  ·  ${shinyCount} shiny  ·  As on ${new Date().toLocaleDateString()}`, ROSTER_PAD + 40, 76);

  const sprites = await Promise.all(list.map(p => loadImageAsync(resolveDisplaySprite(p))));

  list.forEach((p, i) => {
    const col = i % columns, row = Math.floor(i / columns);
    const cx = ROSTER_PAD + col*(ROSTER_CELL_W+ROSTER_GAP);
    const cy = headerHeight + ROSTER_PAD + row*(ROSTER_CELL_H+ROSTER_GAP);
    const types = displayTypes(p);
    const primary = TYPE_HEX[types[0]] || '#4FD1C5';

    roundRectPath(ctx, cx, cy, ROSTER_CELL_W, ROSTER_CELL_H, 18);
    ctx.fillStyle = hexToRgba(primary, 0.14);
    ctx.fill();
    ctx.save();
    roundRectPath(ctx, cx, cy, ROSTER_CELL_W, ROSTER_CELL_H, 18);
    ctx.clip();
    const cellSheen = ctx.createLinearGradient(cx, cy, cx, cy + ROSTER_CELL_H*0.3);
    cellSheen.addColorStop(0, 'rgba(255,255,255,0.08)');
    cellSheen.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = cellSheen;
    ctx.fillRect(cx, cy, ROSTER_CELL_W, ROSTER_CELL_H*0.3);
    ctx.restore();
    ctx.strokeStyle = hexToRgba(primary, 0.4);
    ctx.lineWidth = 1.5;
    roundRectPath(ctx, cx+0.75, cy+0.75, ROSTER_CELL_W-1.5, ROSTER_CELL_H-1.5, 18);
    ctx.stroke();

    const spriteBox = 96;
    const spriteX = cx + (ROSTER_CELL_W-spriteBox)/2;
    const spriteY = cy+14;
    roundRectPath(ctx, spriteX, spriteY, spriteBox, spriteBox, 14);
    const spriteGlow = ctx.createRadialGradient(spriteX+spriteBox/2, spriteY+spriteBox*0.65, 0, spriteX+spriteBox/2, spriteY+spriteBox*0.65, spriteBox*0.7);
    spriteGlow.addColorStop(0, hexToRgba(primary, 0.35));
    spriteGlow.addColorStop(1, hexToRgba(primary, 0));
    ctx.save();
    ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(spriteX, spriteY, spriteBox, spriteBox);
    ctx.fillStyle = spriteGlow;
    ctx.fillRect(spriteX, spriteY, spriteBox, spriteBox);
    ctx.restore();
    if(sprites[i]) drawCoverImage(ctx, sprites[i], spriteX+6, spriteY+6, spriteBox-12, spriteBox-12, 10);
    else drawPokeBallGlyph(ctx, spriteX+spriteBox/2, spriteY+spriteBox/2, 18, 1);

    if(p.shiny){
      ctx.fillStyle = '#FFD24C';
      ctx.font = '700 13px "Outfit", sans-serif';
      ctx.fillText('★', cx + ROSTER_CELL_W - 22, cy + 26);
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 15px "Outfit", sans-serif';
    ctx.fillText(truncateToWidth(ctx, p.nickname || p.species, ROSTER_CELL_W - 16), cx + ROSTER_CELL_W/2, cy + 132);

    ctx.font = '500 12px "Kode Mono", monospace';
    ctx.fillStyle = '#9aa3b8';
    ctx.fillText(truncateToWidth(ctx, p.species.toUpperCase(), ROSTER_CELL_W - 16), cx + ROSTER_CELL_W/2, cy + 150);

    const typeLabels = types.map(t => t.toUpperCase());
    const totalTypeWidth = typeLabels.reduce((sum,l)=>sum+typeBadgeWidth(ctx,l,20,10)+6, -6);
    let typeX = cx + ROSTER_CELL_W/2 - totalTypeWidth/2;
    ctx.textAlign = 'left';
    types.forEach(t => {
      const w = drawTypeBadgePill(ctx, typeX, cy+164, t.toUpperCase(), TYPE_HEX[t] || '#4FD1C5', 20, 10);
      typeX += w + 6;
    });
    ctx.textAlign = 'left';
  });

  return canvas;
}

async function shareRosterAsImage(){
  if(state.pokemon.length === 0){ showToast('Add a Pokémon before sharing your roster.'); return; }
  showToast('Preparing image…');
  try{
    const canvas = await buildRosterShareCanvas();
    await shareOrDownloadCanvas(canvas, 'pokedex-roster.png');
  } catch(e){
    showToast('Could not generate the share image.');
  }
}

document.getElementById('btnShareRoster').addEventListener('click', shareRosterAsImage);
