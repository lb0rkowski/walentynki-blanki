(() => {
  const canvas = document.getElementById("fx");
  const ctx = canvas.getContext("2d", { alpha: true });

  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
    canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };
  window.addEventListener("resize", resize);
  resize();

  const parts = [];
  const bursts = [];

  const rand = (a, b) => a + Math.random() * (b - a);

  function burst(x, y) {
    const count = Math.floor(rand(26, 44));
    const hue = rand(320, 360); // różowo-czerwone
    for (let i = 0; i < count; i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(2.2, 5.6);
      parts.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(1.0, 2.0),
        life: rand(50, 90),
        hue,
        r: rand(1.5, 2.6)
      });
    }
  }

  // co jakiś czas odpal automatycznie
  let tick = 0;

  function step() {
    tick++;

    if (tick % 28 === 0) {
      const x = rand(80, window.innerWidth - 80);
      const y = rand(80, window.innerHeight * 0.55);
      burst(x, y);
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // delikatna poświata
    ctx.fillStyle = "rgba(0,0,0,0.20)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life -= 1;
      p.vy += 0.05; // grawitacja
      p.x += p.vx;
      p.y += p.vy;

      const alpha = Math.max(0, Math.min(1, p.life / 90));
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) parts.splice(i, 1);
    }

    requestAnimationFrame(step);
  }

  // klik = dodatkowy wybuch
  window.addEventListener("click", (e) => burst(e.clientX, e.clientY));
  step();
})();
