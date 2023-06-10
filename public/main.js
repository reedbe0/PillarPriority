const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const START_TIME = 9 * 60;
const END_TIME = 17 * 60;
const TIME_DIVISION = 30;

var Util = {
    displayTime(minutes) {
        var hours = Math.floor(minutes / 60);
        if(hours > 12) hours -= 12;

        var padded = minutes % 60;
        if(padded < 10) padded = "0" + padded;

        var r = `${hours}:${padded} ${minutes < 12 * 60 ? "am" : "pm"}`;
        return r;
    },

    displayDate(year, month, day, method = "short") {
        switch(method) {
            case "short": return `${month + 1}/${day}/${year % 100}`;
            case "long": return `${MONTHS[month]} ${day}, ${year}`;
        }
    }
}

Date.prototype.display = function(method) {
    return Util.displayDate(this.getFullYear(), this.getMonth(), this.getDate(), method);
}