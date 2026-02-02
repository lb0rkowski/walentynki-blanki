(() => {
  const questionText = document.getElementById("questionText");
  const form = document.getElementById("verifyForm");
  const msg = document.getElementById("verifyMsg");

  // ✅ EDYTUJ TO:
  const QUESTION = "Jak najczęściej Łukasz Cię nazywa, kiedy chce skomplementować Twój wygląd?";
  // Możesz dać kilka wariantów odpowiedzi (małe/duże litery ignorujemy)
  const ACCEPTED = [
    "Rakieta",
    "rakieta",
    "jesteś rakieta",
    "jestes rakieta"
  ];

  questionText.textContent = QUESTION;

  const normalize = (s) =>
    (s || "")
      .trim()
      .toLowerCase()
      .replaceAll("ą","a").replaceAll("ć","c").replaceAll("ę","e")
      .replaceAll("ł","l").replaceAll("ń","n").replaceAll("ó","o")
      .replaceAll("ś","s").replaceAll("ż","z").replaceAll("ź","z");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";

    const input = /** @type {HTMLInputElement} */ (document.getElementById("answer"));
    const user = normalize(input.value);

    const ok = ACCEPTED.map(normalize).includes(user);

    if (!ok) {
      msg.textContent = "To nie jest Blanka. 😶 (albo zła odpowiedź)";
      msg.style.color = "rgba(255, 120, 120, 0.95)";
      input.focus();
      input.select();
      return;
    }

    msg.textContent = "Okej. To Ty.";
    msg.style.color = "rgba(170, 255, 210, 0.95)";

    // małe opóźnienie dla efektu
    setTimeout(() => {
      window.location.href = "./5-question.html";
    }, 650);
  });
})();

