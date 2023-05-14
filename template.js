(function() {
	document.getElementById("admin").style.display = "none"

	var header = document.getElementsByTagName("header")[0];
	if(header) header.innerHTML = `
		<h1><a id = "home-link" href = "./index.html">PILLAR PRIORITY</a></h1>
	`;
	
	var footer = document.getElementsByTagName("footer")[0];
	if(footer) footer.innerHTML = `
        <p>@Team Obelisk</p>
	`;
})();

function OnUserPress() {
	document.getElementById("admin").style.display = "none"
	document.getElementById("user").style.display = "block"
	document.getElementById("adminButton").style.backgroundColor = "#344b59"
	document.getElementById("userButton").style.backgroundColor = "#66b5da"
}

function OnAdminPress() {
	document.getElementById("admin").style.display = "block"
	document.getElementById("user").style.display = "none"
	document.getElementById("userButton").style.backgroundColor = "#344b59"
	document.getElementById("adminButton").style.backgroundColor = "#66b5da"
}