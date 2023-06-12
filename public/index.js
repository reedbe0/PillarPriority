var tab = 1;

function showUserLoginTab() {
	document.getElementById("userTab").style.display = "";
	document.getElementById("adminTab").style.display = "none";
	document.getElementById("userTabButton").classList.add("selected");
	document.getElementById("adminTabButton").classList.remove("selected");
	document.getElementById("newAdminLink").style.display = "none";
	tab = 1;
}

function showAdminLoginTab() {
	document.getElementById("userTab").style.display = "none";
	document.getElementById("adminTab").style.display = "";
	document.getElementById("userTabButton").classList.remove("selected");
	document.getElementById("adminTabButton").classList.add("selected");
	document.getElementById("newAdminLink").style.display = "";

	tab = 2;
}
/*
async function setData(file_path, data){
	
}
*/

async function getData_Admin(){
	let database = await fetch('/read_admin');
	let items = await database.json();
	console.log(items)
	return items
}

async function getData_User(){
	let database = await fetch('/read_user');
	let items = await database.json();
	console.log(items)
	return items
}

async function getData(file){
	let database = await fetch(file);
	let items = await database.json();
	// console.log(items)
	return items

}

async function login() {
	var user_data = await getData_User();
	var admin_data = await getData_Admin();

	if (tab == 1) {
		var code_var = document.getElementById('code').value;
		var email_var = document.getElementById('userEmail').value;
		console.log(Number(code_var))
		console.log(email_var)
		if (email_var == null) {
			console.log("error user, invalid input");
		}
		else{
			console.log("code: " + code_var + " email: " + email_var);
		}
		if (Number(code_var) != 0){
			console.log("user inputted a code")
			let coded_db = await getData("codedb.json");
			let existing_user = false;
			let done = false
			let timeIndex;
			let itemIndex;
			for(let i = 0; i < coded_db.length;i++){
				// console.log(Number(code_var))
				// console.log(coded_db[i].geneatedID)
				if (coded_db[i].geneatedID == Number(code_var)){
					existing_user = true
					timeIndex = coded_db[i].timeIndex
					itemIndex = coded_db[i].itemIndex
					done = true
					break
				}
			}
			done = true
			if(existing_user == true){
				localStorage.setItem("confirmationNumber", code_var)
				localStorage.setItem("confirmationTimeIndex", timeIndex)
				localStorage.setItem("itemIndex", itemIndex)
				window.location = './confirm'
			}
			else{
				alert("Invalid code. Please try again.")
				return
			}
		}
		function checkFlag() {
		    if(done === false) {
		       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
		    }
		}
		checkFlag();


		const newdata = {userEmail: email_var, code: code_var};

		fetch('/write_user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newdata)
		})
		.then(response => response.text())
		.then(message => {
			console.log('Server response:', message);
			window.location = ('./calendar');
		})
		.catch(error => {
			console.error('Error writing to JSON data:', error);
		});
		
		console.log("USER LOGIN SUCCESS");
		
	}
	if (tab == 2) {
		var user_var = document.getElementById('username').value;
		var pass_var = document.getElementById('adminPass').value;
		if (user_var == null || pass_var == null) {
			console.log("error admin, invalid input");
		}
		else {
			console.log("user: " + user_var + " pass: " + pass_var);
		}
		for(let i = 0; i < admin_data.length; i++){
			const admin = admin_data
			if(user_var == admin[i].user && pass_var == admin[i].pass) {
				window.location.replace('./admin');
				console.log("ADMIN LOGIN SUCCESS");
			}
		}
	}
}