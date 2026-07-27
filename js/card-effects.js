/* ---------- CARD HOVER EFFECTS: 3D TILT + BORDER GLOW ---------- */
/* Cards are re-rendered (innerHTML replaced) on every filter/search/load-more, so listeners
   are attached once to the persistent gridWrap container and delegated to whichever .card
   the pointer is currently over, rather than re-attached after each render. */
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion || !gridWrap) return;

  const TILT_DIVISOR = 20; // higher = subtler tilt
  let activeCard = null;
  let pendingX = 0, pendingY = 0;
  let rafScheduled = false;

  function resetCard(card){
    card.style.transform = '';
    card.style.setProperty('--glow-proximity', '0');
  }

  function updateCard(card, x, y, rect){
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;

    const rotateX = (dy / TILT_DIVISOR).toFixed(2);
    const rotateY = (-dx / TILT_DIVISOR).toFixed(2);
    // Folds in the same lift/scale the card already gets from :hover in pokemon.css, since
    // this inline transform takes over from that rule the moment the pointer moves.
    card.style.transform = `translateY(-4px) scale(1.008) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Edge proximity: 0 at the card's center, ramping up to 1 as the cursor nears any edge.
    let kx = Infinity, ky = Infinity;
    if(dx !== 0) kx = cx / Math.abs(dx);
    if(dy !== 0) ky = cy / Math.abs(dy);
    const proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if(angle < 0) angle += 360;

    card.style.setProperty('--glow-proximity', proximity.toFixed(3));
    card.style.setProperty('--glow-angle', `${angle.toFixed(1)}deg`);
  }

  // pointermove can fire well over 100 times/sec on a fast mouse. The rect is measured once
  // per animation frame here (inside the rAF callback, right before it's used), not once per
  // raw event -- that's the actual fix for the layout-thrashing cost, and it stays correct
  // even if the page scrolls while the pointer holds still over the same card, since it's
  // never reused across frames.
  gridWrap.addEventListener('pointermove', (e) => {
    if(e.pointerType === 'touch') return;
    const card = e.target.closest('.card');
    if(card !== activeCard){
      if(activeCard) resetCard(activeCard);
      activeCard = card;
    }
    if(!card) return;
    pendingX = e.clientX;
    pendingY = e.clientY;
    if(!rafScheduled){
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        if(!activeCard) return;
        const rect = activeCard.getBoundingClientRect();
        updateCard(activeCard, pendingX - rect.left, pendingY - rect.top, rect);
      });
    }
  });

  gridWrap.addEventListener('pointerleave', () => {
    if(activeCard) resetCard(activeCard);
    activeCard = null;
  });
})();
