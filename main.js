const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var Util = {
    displayDate(year, month, day, method = "short") {
        switch(method) {
            case "short": return `${month + 1}/${day + 1}/${year % 100}`;
            case "long": return `${MONTHS[month]} ${day + 1}, ${year}`;
        }
    }
}

Date.prototype.display = function(method) {
    return Util.displayDate(this.getDate(), this.getMonth(), this.getFullYear(), method);
}