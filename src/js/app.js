import "../scss/style.scss";
import "./bootstrap.min.js"
import 'tippy.js/dist/tippy.css'; // optional for styling
import spoller from "./files/spoller.js";
import tab from "./files/tab.js";
import copy from "./files/copy.js";
import burger from "./files/burger.js";
import date from "./files/date.js";
import ranges from "./files/ranges.js";
import tippy from 'tippy.js';
import collectBouns from "./files/collectBonus.js";

spoller();
tab();
copy();
burger();
date();
ranges();
collectBouns();

tippy('[data-tippy-content]');