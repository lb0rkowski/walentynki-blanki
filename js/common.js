// Małe ułatwienia wspólne
(() => {
  // Zapobiega przypadkowemu dragowaniu obrazków
  document.addEventListener("dragstart", (e) => {
    if (e.target && e.target.tagName === "IMG") e.preventDefault();
  });
})();
