(() => {
  const stage = document.getElementById("btnStage");
  const btnNo = document.getElementById("btnNo");
  const btnMaybe = document.getElementById("btnMaybe");

  btnMaybe.addEventListener("click", () => {
    alert("dorosła decyzja siurku");
  });

  // "Nie" ma uciekać i zawsze być widoczne nad wszystkim
  const margin = 10;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const moveNo = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    const b = btnNo.getBoundingClientRect();

    // losowy skok + odpychanie od kursora
    const randX = (Math.random() * 2 - 1) * 140;
    const randY = (Math.random() * 2 - 1) * 70;

    const fromX = clientX - rect.left;
    const fromY = clientY - rect.top;

    let x = fromX + randX;
    let y = fromY + randY;

    // trzymamy w granicach stage
    x = clamp(x, margin, rect.width - b.width - margin);
    y = clamp(y, margin, rect.height - b.height - margin);

    btnNo.style.transform = `translate(${x}px, ${y}px)`;
  };

  // startowa pozycja (żeby nie było, że “znika”)
  requestAnimationFrame(() => {
    btnNo.style.transform = `translate(0px, 0px)`;
  });

  // ucieka przy najechaniu i przy podejściu kursora
  btnNo.addEventListener("mouseenter", (e) => moveNo(e.clientX, e.clientY));
  stage.addEventListener("mousemove", (e) => {
    // jeśli kursor blisko — uciekaj
    const noRect = btnNo.getBoundingClientRect();
    const dx = e.clientX - (noRect.left + noRect.width / 2);
    const dy = e.clientY - (noRect.top + noRect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist < 120) moveNo(e.clientX, e.clientY);
  });

  // mobile: jak dotknie w okolicy "nie" to też przeskakuje
  stage.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    if (!t) return;
    moveNo(t.clientX, t.clientY);
  }, { passive: true });

  // jakimś cudem kliknie? i tak nie pozwalamy
  btnNo.addEventListener("click", (e) => {
    e.preventDefault();
    moveNo(window.innerWidth * Math.random(), window.innerHeight * Math.random());
  });
})();
