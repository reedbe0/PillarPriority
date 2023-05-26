const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const fs = require("fs")
// const data = require("./db.json")

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

// import items from './db.json' assert {type:'json'};

async function getData(file){
	let database = await fetch(file);
	let items = await database.json();
	// console.log(items)
	return items

}


function printObj(){
	// var obj = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
	// var temp = data.items[0].name
	// const data ={
	// 	"items" : [
	// 		{
	// 			"name": "computer",
	// 			"timeStart": "8:00",
	// 			"timeEnd" : "16:00",
	// 			"available" : "true" 
	// 		},
	// 		{
	// 			"name": "iPad",
	// 			"timeStart": "10:00",
	// 			"timeEnd" : "18:00",
	// 			"available" : "false" 
	// 		}
	// 	]
	// }

	items = getData("./db.json");
	console.log(items)
	// var data = require("./db.json")
	// alert(data.items[0].name)
	alert("hello");

}
