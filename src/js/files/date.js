import AirDatepicker from "air-datepicker";
import isWithinInterval from "date-fns/isWithinInterval";
import isEqual from "date-fns/isEqual";
import "air-datepicker/air-datepicker.css";

export default function date() {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const calendarDate = document.querySelector("#calendar-date");
  const clearCalendarBtn = document.querySelector("#clear-calendar");

  if (calendarDate) {
    const disabledDate = new Date("2023-07-13T00:00:00");
    const isDisabledDateIsInRange = ({ date, datepicker }) => {
      const selectedDate = datepicker.selectedDates[0];
      if (selectedDate && datepicker.selectedDates.length === 1) {
        const sortedDates = [selectedDate, date].toSorted((a, b) => {
          if (a.getTime() > b.getTime()) {
            return 1;
          }
          return -1;
        });

        return isWithinInterval(disabledDate, {
          start: sortedDates[0],
          end: sortedDates[1],
        });
      }
    };

    const datepciker = new AirDatepicker("#calendar", {
      range: true,
      fixedHeight: true,
      onFocus: ({ date, datepicker }) => {
        if (
          isDisabledDateIsInRange({ date, datepicker }) ||
          isEqual(date, disabledDate)
        ) {
          datepicker.$datepicker.classList.add("-disabled-range-");
        } else {
          datepicker.$datepicker.classList.remove("-disabled-range-");
        }
      },
      onRenderCell: ({ date }) => {
        if (date.toLocaleDateString() === disabledDate.toLocaleDateString()) {
          return {
            disabled: true,
          };
        }
      },
      onSelect: ({ date, formattedDate, datepicker }) => {
        if (formattedDate.length === 2) {
          const startDate = formattedDate[0].split(".");
          const endDate = formattedDate[1].split(".");
          calendarDate.textContent = `${startDate[0]} ${months[+startDate[1] - 1]} - ${endDate[0]} ${months[+endDate[1] - 1]}`;
        }
      },
    });

    clearCalendarBtn.addEventListener("click", () => {
      const ranges = document.querySelectorAll(".-in-range-");
      ranges.forEach((r) => r.classList.remove("-in-range-"));

      datepciker.clear();
      calendarDate.textContent = "";
    });
  }
}
