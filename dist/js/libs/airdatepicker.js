var air_datepicker = __webpack_require__(327);
var air_datepicker_default = __webpack_require__.n(air_datepicker);
const index_es = air_datepicker_default();
Math.pow(10, 8);
const constructFromSymbol = Symbol.for("constructDateFrom");
function constructFrom(date, value) {
    if (typeof date === "function") return date(value);
    if (date && typeof date === "object" && constructFromSymbol in date) return date[constructFromSymbol](value);
    if (date instanceof Date) return new date.constructor(value);
    return new Date(value);
}
function toDate(argument, context) {
    return constructFrom(context || argument, argument);
}
function isWithinInterval(date, interval, options) {
    const time = +toDate(date, options?.in);
    const [startTime, endTime] = [ +toDate(interval.start, options?.in), +toDate(interval.end, options?.in) ].sort(((a, b) => a - b));
    return time >= startTime && time <= endTime;
}
const date_fns_isWithinInterval = isWithinInterval;
function isEqual(leftDate, rightDate) {
    return +toDate(leftDate) === +toDate(rightDate);
}
const date_fns_isEqual = isEqual;