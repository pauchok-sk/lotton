export default function copy() {
  const buttons = document.querySelectorAll("[data-copy]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const copytext = btn.dataset.copy;

        navigator.clipboard.writeText(copytext);
      });
    });
  }
}
