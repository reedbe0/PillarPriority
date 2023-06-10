(function() {
	var admin = document.getElementById("admin");
	if(admin) admin.style.display = "none"

	var header = document.getElementsByTagName("header")[0];
	if(header) header.innerHTML = `
		<h1><a id = "home-link" href = "./index.html">PILLAR PRIORITY</a></h1>
	`;
	
	var footer = document.getElementsByTagName("footer")[0];
	if(footer) footer.innerHTML = `
        <p>@Team Obelisk</p>
	`;
})();

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

async function setData(file_path, data){
	fs.writeFile(file_path, data, 'utf8', err => {
		if (err) {
			console.error('Error writing to JSON file:', err);
		}
		else {
			console.log('Data appended and file updated successfully.');
		}
	});
}

async function getData(file){
	let database = await fetch(file, {mode: 'no-cors'});
	let items = await database.json();
	// console.log(items)
	return items

}

async function login() {
	var user_data = await getData("./userdb.json")
	var admin_data = await getData("./admindb.json")

		if (tab == 1) {
			var code_var = document.getElementById('code').value;
			var email_var = document.getElementById('userEmail').value;
			if (email_var == null) {
				console.log("error user, invalid input");
			}
			else {
				console.log("code: " + code_var + " email: " + email_var);
			}
			
			// Writing doesn't work
			newdata = (user_data, {"digit": code_var, "email": email_var})

			data = JSON.stringify(newdata, null, 2)
			
			setData('./userdb.json', data)
			
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
					window.location.replace('admin.html');
					console.log("ADMIN LOGIN SUCCESS");
				}
			}
		}
}