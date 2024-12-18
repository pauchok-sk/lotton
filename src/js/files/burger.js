export default function burger() {
  const burgerBtn = document.querySelector("#burger-btn");
  const burger = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");

  if (burger) {
    burgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (burger.classList.contains("_open")) {
        burgerClose();
      } else {
        burgerBtn.classList.add("_active");
        burger.classList.add("_open");
        burgerOverlay.classList.add("_active");

        document.body.classList.add("body-hidden");
        burger.addEventListener("click", (e) => e.stopPropagation());

        document.body.addEventListener("click", burgerClose);
      }
    });
  }
}
export function burgerClose() {
  const burger = document.querySelector("#burger");
  const burgerBtn = document.querySelector("#burger-btn");
  const burgerOverlay = document.querySelector("#burger-overlay");

  burgerBtn.classList.remove("_active");
  burger.classList.remove("_open");
  burgerOverlay.classList.remove("_active");

  document.body.classList.remove("body-hidden");

  document.body.removeEventListener("click", burgerClose);
}
