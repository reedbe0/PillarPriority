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
	tab = 1;
}

function showAdminLoginTab() {
	document.getElementById("userTab").style.display = "none";
	document.getElementById("adminTab").style.display = "";
	document.getElementById("userTabButton").classList.remove("selected");
	document.getElementById("adminTabButton").classList.add("selected");
	tab = 2;
}

function login() {
	fetch("./logindb.json")
    .then((response) => response.json())
    .then((data) => {
		if (tab == 1) {
			var code_var = document.getElementById('code').value;
			var email_var = document.getElementById('userEmail').value;
			if (code_var == null || email_var == null) {
				console.log("error user, invalid input");
			}
			else {
				console.log("code: " + code_var + " email: " + email_var);
			}
			for(let i = 0; i < data.user.length; i++){
				const user = data.user[i]
				if(code_var == user.digit && email_var == user.email) {
					console.log("USER LOGIN SUCCESS");
					window.location.replace('https://reedbe0.github.io/PillarPriority/calendar.html');
				}
			}
		}
		if (tab == 2) {
			var user_var = document.getElementById('username').value;
			var pass_var = document.getElementById('adminPass').value;
			if (user_var == null || pass_var == null) {
				console.log("error admin, invalid input");
			}
			else {
				console.log("code: " + user_var + " email: " + pass_var);
			}
			for(let i = 0; i < data.admin.length; i++){
				const admin = data.admin[i]
				if(code_var == admin.user && email_var == admin.password) {
					console.log("ADMIN LOGIN SUCCESS");
					window.location.replace('https://reedbe0.github.io/PillarPriority/admin.html');
				}
			}
		}
	})
	.catch((error) => {
		console.error("Error:", error);
	});
}