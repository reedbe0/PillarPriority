var Calendar = {
	day: new Date().getDate(),
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	
	cells: [],
	
	setMonth: function(month) {
		this.month = month % 12;
		this.update();
	},
	
	setYear: function(year) {
		this.year = year;
		this.update();
	},
	
	nextMonth: function() {
		this.setMonth((this.month + 1) % 12);
		if(this.month == 0) this.nextYear();
	},
	
	previousMonth: function() {
		this.setMonth((this.month + 11) % 12);
		if(this.month == 11) this.previousYear();
	},
	
	nextYear: function() {
		this.setYear(this.year + 1);
	},
	
	previousYear: function() {
		this.setYear(this.year - 1);
	},
	
	get date() {
		return new Date(`${this.month+1}/${this.day}/${this.year}`);
	},
	
	get first() {
		return new Date(`${this.month+1}/1/${this.year}`);
	},
	
	init: function() {
		var table = document.getElementById("calendar");
		
		for(var i = 0; i < 6; i++) {
			var row = table.appendChild(document.createElement("tr"));
			
			for(var j = 0; j < 7; j++) {
				var cell = row.appendChild(document.createElement("td"));
				this.cells.push(cell);
			}
		}
		
		this.update();
	},
	
	update: function() {
		document.getElementById("month-display").innerText = `${MONTHS[this.month]} ${this.year}`;
		
		var first = this.first;
		
		this.cells.forEach(function(cell, i) {
			cell.date = new Date(first.getTime() + (i - first.getDay()) * 86400000);
			cell.innerText = cell.date.getDate();
			cell.className = (cell.date.getMonth() == Calendar.month) ? "calendar-cell" : "calendar-cell-disabled";
			cell.onclick = function(){
				if (cell.className != "calendar-cell-disabled"){
					const fullDate = cell.date.getFullYear() + '/' +(cell.date.getMonth() + 1) + '/' + cell.date.getDate();
					localStorage.setItem("fullDateClicked", fullDate);
					location.href = "timeslots.html"
				}
			}
		});
	}
}

Calendar.init();