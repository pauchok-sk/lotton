export default function collectBouns() {
  const valueMain = document.querySelector(".friends__head-value");
  const btnCollect = document.querySelector(".friends__head-btn");

  if (valueMain) {
    const friendsValues = document.querySelectorAll(".user-card__rating span");

    btnCollect.addEventListener("click", () => {
      requestAnimationFrame(frameMain);

      if (friendsValues.length) {
        friendsValues.forEach((f) => {
          const frameFriend = () => {
            const num = +f.textContent.replace(/\s+/g, "");

            if (num <= 0) {
              f.textContent = 0;
              return;
            }

            f.textContent = num - (Math.round(num / 10) || 1);

            requestAnimationFrame(frameFriend);
          };

          requestAnimationFrame(frameFriend);
        });
      }
    });

    const frameMain = () => {
      const num = +valueMain.textContent.replace(/\s+/g, "");

      if (num <= 0) {
        valueMain.textContent = 0;
        return;
      }
      
      valueMain.textContent = num - (Math.round(num / 10) || 1);

      requestAnimationFrame(frameMain);
    };
  }
}
