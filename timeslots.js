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


async function printObj(){
	var data = await getData("./db.json");
	console.log(data)
	console.log(data.items[0])
	console.log(data.items.length)
	table = document.getElementById("itemsList");
	for(var i = 0; i < data.items.length;i++){
		var node = document.createElement("tr")
		var textNode = document.createTextNode(data.items[i].name)
		node.appendChild(textNode)
		table.appendChild(node)
	}
}
