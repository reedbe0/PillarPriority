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

function showUserLoginTab() {
	document.getElementById("userTab").style.display = "";
	document.getElementById("adminTab").style.display = "none";
	document.getElementById("userTabButton").classList.add("selected");
	document.getElementById("adminTabButton").classList.remove("selected");
}

function showAdminLoginTab() {
	document.getElementById("userTab").style.display = "none";
	document.getElementById("adminTab").style.display = "";
	document.getElementById("userTabButton").classList.remove("selected");
	document.getElementById("adminTabButton").classList.add("selected");
}