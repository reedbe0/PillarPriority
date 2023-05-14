(function() {
	var header = document.getElementsByTagName("header")[0];
	if(header) header.innerHTML = `
		<h1><a id = "home-link" href = "./index.html">PILLAR PRIORITY</a></h1>
	`;
	
	var footer = document.getElementsByTagName("footer")[0];
	if(footer) footer.innerHTML = `
        <p>@Team Obelisk</p>
	`;
})();