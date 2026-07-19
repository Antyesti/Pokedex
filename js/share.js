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
  const measureCanvas = document.createElement('canvas');
  const mctx = measureCanvas.getContext('2d');
  const contentWidth = SHARE_CARD_WIDTH - SHARE_PAD*2;
  mctx.font = '600 15px "Outfit", sans-serif';
  const achievementChips = achievements.map(a => measureChip(mctx, a.name, 26));

  // Pre-measure the achievements block height so the canvas can be sized up front.
  let achvBlockHeight = 44; // heading row
  if(achievements.length > 0){
    let cx = 0, rows = 1;
    achievementChips.forEach(item => {
      if(cx !== 0 && cx + item.width > contentWidth){ rows++; cx = 0; }
      cx += item.width + SHARE_CHIP_GAP;
    });
    achvBlockHeight += rows * (SHARE_CHIP_H + SHARE_CHIP_GAP);
  }

  const headerHeight = 176;
  const metaHeight = 96;
  const height = SHARE_PAD*2 + headerHeight + metaHeight + achvBlockHeight + 40;

  const ballImg = p.ball ? await loadImageAsync(BALL_LOOKUP[p.ball] || '') : null;
  const achievementIcons = await Promise.all(achievements.map(a => loadImageAsync(a.icon)));

  return { achievements, achievementChips, contentWidth, headerHeight, metaHeight, height, ballImg, achievementIcons };
}

// Pure/synchronous: draws one full card frame given already-loaded assets and a sprite
// drawable (an Image for a static sprite, or a per-frame canvas for an animated one).
function drawCardFrame(p, assets, spriteDrawable){
  const { achievements, achievementChips, contentWidth, headerHeight, metaHeight, height, ballImg, achievementIcons } = assets;
  const primary = TYPE_HEX[p.types[0]] || '#4FD1C5';
  const secondary = TYPE_HEX[p.types[1]] || primary;

  const scale = 2; // render at 2x for a crisp export
  const canvas = document.createElement('canvas');
  canvas.width = SHARE_CARD_WIDTH * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // Background: dark panel with a diagonal type-color tint, independent of the app's
  // current theme so shared images look consistent across Poké Ball / Beast Ball / Master Ball.
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
  ctx.restore();
  ctx.strokeStyle = hexToRgba(primary, 0.5);
  ctx.lineWidth = 2;
  roundRectPath(ctx, 1, 1, SHARE_CARD_WIDTH-2, height-2, 28);
  ctx.stroke();

  let x = SHARE_PAD, y = SHARE_PAD;

  // Sprite
  roundRectPath(ctx, x, y, 140, 140, 20);
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fill();
  if(spriteDrawable) drawCoverImage(ctx, spriteDrawable, x+8, y+8, 124, 124, 14);

  // Name/species column
  const textX = x + 160;
  const textWidth = contentWidth - 160;
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#9aa3b8';
  ctx.font = '600 13px "Kode Mono", monospace';
  const formPrefix = p.preferredForm === 'mega' ? 'MEGA ' : p.preferredForm === 'gigantamax' ? 'GIGANTAMAX ' : '';
  const formSuffix = (p.preferredForm === 'mega' && p.megaForm) ? ' ' + p.megaForm.toUpperCase() : '';
  ctx.fillText(truncateToWidth(ctx, `${formPrefix}${p.species.toUpperCase()}${formSuffix}`, textWidth), textX, y + 22);

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

  // Type badges
  let typeY = y + 116;
  let typeX = textX;
  ctx.font = '700 13px "Outfit", sans-serif';
  p.types.forEach(t => {
    const label = t.toUpperCase();
    const w = ctx.measureText(label).width + 24;
    roundRectPath(ctx, typeX, typeY, w, 26, 13);
    ctx.fillStyle = TYPE_HEX[t] || '#4FD1C5';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, typeX + 12, typeY + 18);
    typeX += w + 8;
  });

  y += headerHeight;

  // Meta row: met location, ball, origin -> last game
  ctx.font = '500 14px "Outfit", sans-serif';
  ctx.fillStyle = '#c3c9d9';
  let metaY = y;
  if(p.metLocation){
    const loc = stripHTML(p.metLocation);
    ctx.fillText('📍 ' + truncateToWidth(ctx, loc, contentWidth - 20), x, metaY + 16);
    metaY += 26;
  }
  if(p.ball){
    if(ballImg) ctx.drawImage(ballImg, x, metaY, 20, 20);
    ctx.fillText(p.ball, x + (ballImg ? 26 : 0), metaY + 16);
    metaY += 26;
  }
  if(p.originGame || p.lastGame){
    const route = `${p.originGame || '-'}  →  ${p.lastGame || '-'}`;
    ctx.fillText(truncateToWidth(ctx, route, contentWidth), x, metaY + 16);
    metaY += 26;
  }

  y += metaHeight;

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
      roundRectPath(ctx, cx, cy, item.width, SHARE_CHIP_H, 17);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();
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

  ctx.fillStyle = '#12141c';
  ctx.fillRect(0, 0, width, height);

  const trainerName = (state.trainer||'').trim();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 30px "Outfit", sans-serif';
  ctx.fillText(trainerName ? `${trainerName}'s Pokédex` : 'Pokédex', ROSTER_PAD, 48);

  const shinyCount = list.filter(p=>p.shiny).length;
  ctx.font = '500 15px "Kode Mono", monospace';
  ctx.fillStyle = '#9aa3b8';
  ctx.fillText(`${list.length} Pok\u00e9mon  ·  ${shinyCount} shiny  ·  As on ${new Date().toLocaleDateString()}`, ROSTER_PAD, 76);

  const sprites = await Promise.all(list.map(p => loadImageAsync(resolveDisplaySprite(p))));

  list.forEach((p, i) => {
    const col = i % columns, row = Math.floor(i / columns);
    const cx = ROSTER_PAD + col*(ROSTER_CELL_W+ROSTER_GAP);
    const cy = headerHeight + ROSTER_PAD + row*(ROSTER_CELL_H+ROSTER_GAP);
    const primary = TYPE_HEX[p.types[0]] || '#4FD1C5';

    roundRectPath(ctx, cx, cy, ROSTER_CELL_W, ROSTER_CELL_H, 18);
    ctx.fillStyle = hexToRgba(primary, 0.14);
    ctx.fill();
    ctx.strokeStyle = hexToRgba(primary, 0.4);
    ctx.lineWidth = 1.5;
    roundRectPath(ctx, cx+0.75, cy+0.75, ROSTER_CELL_W-1.5, ROSTER_CELL_H-1.5, 18);
    ctx.stroke();

    const spriteBox = 96;
    const spriteX = cx + (ROSTER_CELL_W-spriteBox)/2;
    roundRectPath(ctx, spriteX, cy+14, spriteBox, spriteBox, 14);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fill();
    if(sprites[i]) drawCoverImage(ctx, sprites[i], spriteX+6, cy+20, spriteBox-12, spriteBox-12, 10);

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

    let typeX = cx + ROSTER_CELL_W/2;
    const typeLabels = p.types.map(t => t.toUpperCase());
    ctx.font = '700 10px "Outfit", sans-serif';
    const totalTypeWidth = typeLabels.reduce((sum,l)=>sum+ctx.measureText(l).width+18+6, -6);
    typeX -= totalTypeWidth/2;
    ctx.textAlign = 'left';
    p.types.forEach(t => {
      const label = t.toUpperCase();
      const w = ctx.measureText(label).width + 18;
      roundRectPath(ctx, typeX, cy+164, w, 20, 10);
      ctx.fillStyle = TYPE_HEX[t] || '#4FD1C5';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, typeX+9, cy+178);
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
