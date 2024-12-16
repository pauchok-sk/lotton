export default function tab() {
  const buttonsTab = document.querySelectorAll(".btn-tab");
  
  if (buttonsTab.length) {
    buttonsTab.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log("click")
        e.preventDefault();
        
        const parent = btn.closest(".tab-container");
        const tabId = btn.dataset.tab;
        const currentTab = parent.querySelector(`.tab[data-tab="${tabId}"]`);
        const tabs = parent.querySelectorAll(".tab");

        buttonsTab.forEach((b) => b.classList.remove("_active"));
        tabs.forEach((t) => t.classList.remove("_active"));

        currentTab.classList.add("_active");
        btn.classList.add("_active");
      });
    });
  }
}
