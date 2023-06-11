function printConfirmation(){
	header = document.getElementById("confirmation")
	confirmNum = localStorage.getItem("confirmationNumber")
	text = document.createTextNode(confirmNum) 
	header.appendChild(text)
}