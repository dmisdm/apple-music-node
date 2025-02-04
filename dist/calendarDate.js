"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarDate = void 0;
class CalendarDate {
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    static parse(string) {
        const match = string.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (match) {
            return new CalendarDate(Number.parseInt(match[1]), Number.parseInt(match[2]), Number.parseInt(match[3]));
        }
        else {
            return undefined;
        }
    }
    toUTCDate() {
        return new Date(this.year, this.month, this.day);
    }
}
exports.CalendarDate = CalendarDate;
//# sourceMappingURL=calendarDate.js.map