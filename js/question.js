(() => {
  const stage = document.getElementById("btnStage");
  const btnNo = document.getElementById("btnNo");
  const btnMaybe = document.getElementById("btnMaybe");

  btnMaybe.addEventListener("click", () => {
    alert("dorosła decyzja siurku");
  });

  const padding = 10;

  function moveNo(mouseX, mouseY) {
    const stageRect = stage.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    // losowa nowa pozycja
    let x = Math.random() * (stageRect.width - btnRect.width - padding * 2) + padding;
    let y = Math.random() * (stageRect.height - btnRect.height - padding * 2) + padding;

    // zabezpieczenie – zawsze w granicach
    x = Math.max(padding, Math.min(x, stageRect.width - btnRect.width - padding));
    y = Math.max(padding, Math.min(y, stageRect.height - btnRect.height - padding));

    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
  }

  // startowa pozycja – zawsze widoczna
  moveNo();

  // ucieka przy najechaniu
  btnNo.addEventListener("mouseenter", (e) => {
    moveNo(e.clientX, e.clientY);
  });

  // ucieka gdy kursor się zbliży
  stage.addEventListener("mousemove", (e) => {
    const r = btnNo.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);

    if (dist < 120) {
      moveNo(e.clientX, e.clientY);
    }
  });

  // mobile – dotyk = teleport
  stage.addEventListener("touchstart", () => {
    moveNo();
  }, { passive: true });

  // nawet jak kliknie – i tak ucieknie 😈
  btnNo.addEventListener("click", (e) => {
    e.preventDefault();
    moveNo();
  });
})();
