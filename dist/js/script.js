function spoller() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
      const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
          return !item.dataset.spollers.split(",")[0];
      }));
      if (spollersRegular.length) initSpollers(spollersRegular);
      let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
      if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
          mdQueriesItem.matchMedia.addEventListener("change", (function() {
              initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          }));
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      }));
      function initSpollers(spollersArray, matchMedia = false) {
          spollersArray.forEach((spollersBlock => {
              spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
              if (matchMedia.matches || !matchMedia) {
                  spollersBlock.classList.add("_spoller-init");
                  initSpollerBody(spollersBlock);
                  spollersBlock.addEventListener("click", setSpollerAction);
              } else {
                  spollersBlock.classList.remove("_spoller-init");
                  initSpollerBody(spollersBlock, false);
                  spollersBlock.removeEventListener("click", setSpollerAction);
              }
          }));
      }
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
          let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
          if (spollerTitles.length) {
              spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
              spollerTitles.forEach((spollerTitle => {
                  if (hideSpollerBody) {
                      spollerTitle.removeAttribute("tabindex");
                      if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                  } else {
                      spollerTitle.setAttribute("tabindex", "-1");
                      spollerTitle.nextElementSibling.hidden = false;
                  }
              }));
          }
      }
      function setSpollerAction(e) {
          const el = e.target;
          if (el.closest("[data-spoller]")) {
              const spollerTitle = el.closest("[data-spoller]");
              const spollersBlock = spollerTitle.closest("[data-spollers]");
              const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
              const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
              if (!spollersBlock.querySelectorAll("._slide").length) {
                  if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                  spollerTitle.classList.toggle("_spoller-active");
                  _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
              }
              e.preventDefault();
          }
      }
      function hideSpollersBody(spollersBlock) {
          const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
          const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
          if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
              spollerActiveTitle.classList.remove("_spoller-active");
              _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
          }
      }
      const spollersClose = document.querySelectorAll("[data-spoller-close]");
      if (spollersClose.length) document.addEventListener("click", (function(e) {
          const el = e.target;
          if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
              const spollersBlock = spollerClose.closest("[data-spollers]");
              const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
              spollerClose.classList.remove("_spoller-active");
              _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
      }));
  }
  function dataMediaQueries(array, dataSetValue) {
      const media = Array.from(array).filter((function(item, index, self) {
          if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
      }));
      if (media.length) {
          const breakpointsArray = [];
          media.forEach((item => {
              const params = item.dataset[dataSetValue];
              const breakpoint = {};
              const paramsArray = params.split(",");
              breakpoint.value = paramsArray[0];
              breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
              breakpoint.item = item;
              breakpointsArray.push(breakpoint);
          }));
          let mdQueries = breakpointsArray.map((function(item) {
              return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
          }));
          mdQueries = uniqArray(mdQueries);
          const mdQueriesArray = [];
          if (mdQueries.length) {
              mdQueries.forEach((breakpoint => {
                  const paramsArray = breakpoint.split(",");
                  const mediaBreakpoint = paramsArray[1];
                  const mediaType = paramsArray[2];
                  const matchMedia = window.matchMedia(paramsArray[0]);
                  const itemsArray = breakpointsArray.filter((function(item) {
                      if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                  }));
                  mdQueriesArray.push({
                      itemsArray,
                      matchMedia
                  });
              }));
              return mdQueriesArray;
          }
      }
  }
  let _slideUp = (target, duration = 500, showmore = 0) => {
      if (!target.classList.contains("_slide")) {
          target.classList.add("_slide");
          target.style.transitionProperty = "height, margin, padding";
          target.style.transitionDuration = duration + "ms";
          target.style.height = `${target.offsetHeight}px`;
          target.offsetHeight;
          target.style.overflow = "hidden";
          target.style.height = showmore ? `${showmore}px` : `0px`;
          target.style.paddingTop = 0;
          target.style.paddingBottom = 0;
          target.style.marginTop = 0;
          target.style.marginBottom = 0;
          window.setTimeout((() => {
              target.hidden = !showmore ? true : false;
              !showmore ? target.style.removeProperty("height") : null;
              target.style.removeProperty("padding-top");
              target.style.removeProperty("padding-bottom");
              target.style.removeProperty("margin-top");
              target.style.removeProperty("margin-bottom");
              !showmore ? target.style.removeProperty("overflow") : null;
              target.style.removeProperty("transition-duration");
              target.style.removeProperty("transition-property");
              target.classList.remove("_slide");
              document.dispatchEvent(new CustomEvent("slideUpDone", {
                  detail: {
                      target
                  }
              }));
          }), duration);
      }
  };
  let _slideDown = (target, duration = 500, showmore = 0) => {
      if (!target.classList.contains("_slide")) {
          target.classList.add("_slide");
          target.hidden = target.hidden ? false : null;
          showmore ? target.style.removeProperty("height") : null;
          let height = target.offsetHeight;
          target.style.overflow = "hidden";
          target.style.height = showmore ? `${showmore}px` : `0px`;
          target.style.paddingTop = 0;
          target.style.paddingBottom = 0;
          target.style.marginTop = 0;
          target.style.marginBottom = 0;
          target.offsetHeight;
          target.style.transitionProperty = "height, margin, padding";
          target.style.transitionDuration = duration + "ms";
          target.style.height = height + "px";
          target.style.removeProperty("padding-top");
          target.style.removeProperty("padding-bottom");
          target.style.removeProperty("margin-top");
          target.style.removeProperty("margin-bottom");
          window.setTimeout((() => {
              target.style.removeProperty("height");
              target.style.removeProperty("overflow");
              target.style.removeProperty("transition-duration");
              target.style.removeProperty("transition-property");
              target.classList.remove("_slide");
              document.dispatchEvent(new CustomEvent("slideDownDone", {
                  detail: {
                      target
                  }
              }));
          }), duration);
      }
  };
  let _slideToggle = (target, duration = 500) => {
      if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
  };
}
function tab() {
  const buttonsTab = document.querySelectorAll(".btn-tab");
  if (buttonsTab.length) buttonsTab.forEach((btn => {
      btn.addEventListener("click", (e => {
          console.log("click");
          e.preventDefault();
          const parent = btn.closest(".tab-container");
          const tabId = btn.dataset.tab;
          const currentTab = parent.querySelector(`.tab[data-tab="${tabId}"]`);
          const tabs = parent.querySelectorAll(".tab");
          buttonsTab.forEach((b => b.classList.remove("_active")));
          tabs.forEach((t => t.classList.remove("_active")));
          currentTab.classList.add("_active");
          btn.classList.add("_active");
      }));
  }));
}
function copy() {
  const buttons = document.querySelectorAll("[data-copy]");
  if (buttons.length) buttons.forEach((btn => {
      btn.addEventListener("click", (() => {
          const copytext = btn.dataset.copy;
          navigator.clipboard.writeText(copytext);
      }));
  }));
}
function burger() {
  const burgerBtn = document.querySelector("#burger-btn");
  const burger = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");
  if (burger) burgerBtn.addEventListener("click", (e => {
      e.stopPropagation();
      if (burger.classList.contains("_open")) burgerClose(); else {
          burgerBtn.classList.add("_active");
          burger.classList.add("_open");
          burgerOverlay.classList.add("_active");
          document.body.classList.add("body-hidden");
          burger.addEventListener("click", (e => e.stopPropagation()));
          document.body.addEventListener("click", burgerClose);
      }
  }));
}
function burgerClose() {
  const burger = document.querySelector("#burger");
  const burgerBtn = document.querySelector("#burger-btn");
  const burgerOverlay = document.querySelector("#burger-overlay");
  burgerBtn.classList.remove("_active");
  burger.classList.remove("_open");
  burgerOverlay.classList.remove("_active");
  document.body.classList.remove("body-hidden");
  document.body.removeEventListener("click", burgerClose);
}
function ranges() {
  const priceRange = document.querySelector("#price-range");
  if (priceRange) {
      const {min, max} = priceRange.dataset;
      const minPrice = document.querySelector("#filter-min-price");
      const maxPrice = document.querySelector("#filter-max-price");
      const prices = [ minPrice, maxPrice ];
      nouislider.create(priceRange, {
          start: [ +min, +max ],
          connect: true,
          range: {
              min: [ +min ],
              max: [ +max ]
          }
      });
      priceRange.noUiSlider.on("update", ((values, handle) => {
          prices[handle].textContent = Math.round(values[handle]) + "$";
      }));
  }
}

const tippy_esm = tippy;
function tippyInit() {
  tippy_esm("[data-tippy-content]");
}
spoller();
tab();
copy();
burger();
ranges();
collectBouns();
tippyInit();