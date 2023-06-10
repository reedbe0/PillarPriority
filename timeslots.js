// const fs = require("fs")
// const data = require("./db.json")

var Timeslots = {
	day: new Date().getDate(),

	cells: [],

	init: function() {
		var table = document.getElementById("timeslots");
		
		for(var i = START_TIME; i < END_TIME; i += TIME_DIVISION) {
			var row = table.appendChild(document.createElement("tr"));

			for(var j = 0; j < 2; j++) {
				var cell = row.appendChild(document.createElement("td"));
				this.cells.push(cell);
				if(j == 0) cell.className = "table-label"; else cell.className = "time-cell";
			}
		}

		this.update();
	},

	update: function() {
		this.cells.forEach(function(cell, i) {
			var isAllowed = true; // todo: make this actually function as necessary
			var timeCell = i % 2 == 0;

			if(timeCell) cell.innerText = Util.displayTime(START_TIME + i / 2 * TIME_DIVISION);
			if(isAllowed) cell.removeAttribute("disabled"); else cell.setAttribute("disabled", "true");
			cell.onclick = function() {
				if(!cell.getAttribute("disabled")) {
					// localStorage.setItem();
					// location.href = "";
				}
			}
		});
	}
}

Timeslots.init();

// import items from './db.json' assert {type:'json'};

async function getData(file){
	let database = await fetch(file);
	let items = await database.json();
	// console.log(items)
	return items

}


async function printObj(){
	var data = await getData("./db.json");
	console.log(data);
	console.log(data.items[0]);
	console.log(data.items.length);
	table = document.getElementById("itemsList");
	fullDate = localStorage.getItem("fullDateClicked");
	console.log(fullDate)
	console.log(data.items[0].date)
	let itemsShown = 0
	for(var i = 0; i < data.items.length;i++){
		if (fullDate == data.items[i].date){
			var node = document.createElement("tr");
			var textNode = document.createTextNode(data.items[i].name);
			node.appendChild(textNode);
			table.appendChild(node);
			start = data.items[i].timeStart
			console.log(start)
			startArray = start.split(":")
			console.log(startArray)
			end = data.items[i].timeEnd
			endArray = end.split(":")
			console.log(endArray)
			startCounter = 0;
			for(let j = parseInt(startArray[0],10); j < parseInt(endArray[0],10); j++){
				console.log(j+ ":" + startArray[1])
				let timeslot = document.createElement("li");
				var timeText = document.createTextNode(j+ ":" + startArray[1] + "~" + (j+1) + ":" + startArray[1]);
				// console.log(startTime)
				console.log(data.items[i].available[startCounter])
				space = document.createTextNode(": ")
				if (data.items[i].available[startCounter] == true){
					availability = document.createElement("button")
					availability.setAttribute("id", data.items[i].name + " " + j)
					availability.setAttribute("class", "reserveButton")
					buttonText = document.createTextNode("Reserve")
					availability.appendChild(buttonText)
				}
				else{
					availability = document.createTextNode("Unavailable")
				}
				timeslot.appendChild(timeText);
				timeslot.appendChild(space)
				timeslot.appendChild(availability)
				table.appendChild(timeslot)
				startCounter += 1;
			}
			itemsShown += 1
		}
	}
	if (itemsShown == 0){
		let notice = document.createElement("tr")
		let textNode = document.createTextNode("No Items Available on This Day")
		notice.appendChild(textNode)
		table.appendChild(notice)
	}
}


async function loadItems(){
	var data = await getData("./db.json");
	await printObj()
	button = document.getElementsByClassName("reserveButton")
	for (let i = 0; i < button.length; i++){
		console.log(button[i])
		button[i].onclick = function(){
			console.log("reserving " + button[i].id)
			reserveItem = button[i].id.split(" ")
			console.log(reserveItem)
			var geneatedID = Math.floor(1000 + Math.random() * 9000);
			console.log(geneatedID);
			let itemIndex;
			for (let j = 0; j < data.items.length;j++){
				if (data.items[j].name == reserveItem[0]){
					itemIndex = j;
					break;
				}
			}
			console.log("index " + itemIndex)
			let timeStart = data.items[itemIndex].timeStart.split(":")
			console.log(timeStart)
			let timeIndex = (timeStart[0] - reserveItem[1]) * -1
			data.items[itemIndex].available[timeIndex] = geneatedID
			console.log(data.items[itemIndex].available[timeIndex])
			localStorage.setItem("confirmationNumber", geneatedID)
			// const fs = require('fs')

			//write tot database


			location.href = "confirm"

		}
	}

}




// printObj();

var dateData = localStorage.getItem("fullDateClicked");
if(!dateData) location.replace("calendar.html");
var date = new Date(dateData);
selectedDate.innerText += date.display("long");