import noUiSlider from "nouislider";

export default function ranges() {
  const priceRange = document.querySelector("#price-range");

  if (priceRange) {
    const { min, max } = priceRange.dataset;
    const minPrice = document.querySelector("#filter-min-price");
    const maxPrice = document.querySelector("#filter-max-price");

    const prices = [minPrice, maxPrice];

    noUiSlider.create(priceRange, {
      start: [+min, +max],
      connect: true,
      range: {
        min: [+min],
        max: [+max],
      },
    });

    priceRange.noUiSlider.on("update", (values, handle) => {
      prices[handle].textContent = Math.round(values[handle]) + "$";
    });
  }
}