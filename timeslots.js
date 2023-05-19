const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


var Calendar = {
	day: new Date().getDate(),


	init: function() {
		var table = document.getElementById("calendar");
		
		for(var i = 0; i < 6; i++) {
			var row = table.appendChild(document.createElement("tr"));

		for(var j = 0; j < 7; j++) {
				var cell = row.appendChild(document.createElement("td"));
				this.cells.push(cell);
			}
		};
		this.update();
	},
}

Calendar.init();

function printObj(){
	alert("hello");
}