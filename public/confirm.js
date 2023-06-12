function printConfirmation(){
	header = document.getElementById("text")
	header2 = document.getElementById("number")
	confirmNum = localStorage.getItem("confirmationNumber");
	confirmItem = localStorage.getItem("confirmationItem");
	confirmTime = localStorage.getItem("confrimationStartTime").split(":");
	timeIndex = localStorage.getItem("confirmationTimeIndex")
	fullDate = localStorage.getItem("fullDateClicked");

	timeReserved = Number(confirmTime[0]) + Number(timeIndex) + ":" + confirmTime[1]



	text = confirmItem + " has been reserved starting at: " + timeReserved + " on " + fullDate
	textNode = document.createTextNode(text) 
	text2 = "Your confirmation number: " + confirmNum
	textNode2 = document.createTextNode(text2)
	header.appendChild(textNode)
	header2.appendChild(textNode2)

}


async function getData(file){
	let database = await fetch(file);
	let items = await database.json();
	// console.log(items)
	return items

}

async function removeReservation(){
	itemIndex = localStorage.getItem("itemIndex")
	timeIndex = localStorage.getItem("confirmationTimeIndex")
	confirmNum = localStorage.getItem("confirmationNumber")

	let data = await getData("./db.json")
	

	// console.log(timeIndex)

	const newavailable = data[itemIndex].available
	newavailable[timeIndex] = true

	const newdata = {
		index: itemIndex,
		itemName: data[itemIndex].itemName,
		date: data[itemIndex].date,
		startTime: data[itemIndex].startTime,
		endTime: data[itemIndex].endTime,
		available: newavailable
	};

	const codeDBData = {
		geneatedID: Number(confirmNum),
		timeIndex: Number(timeIndex),
		itemIndex: Number(itemIndex)
	}

	fetch('/update_db', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newdata)
	})
	.then(response => response.text())
	.then(message => {
		console.log('Server response:', message);
	})
	.catch(error => {
		console.error('Error writing to JSON data:', error);
	});

	fetch('/remove_codedb', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(codeDBData)
	})
	.then(response => response.text())
	.then(message => {
		console.log('Server response:', message);
	})
	.catch(error => {
		console.error('Error writing to JSON data:', error);
	});
	
	alert("Sucessfully removed reservation")
	location.href = "index"
}
