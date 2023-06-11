function printConfirmation(){
	header = document.getElementById("text")
	header2 = document.getElementById("number")
	confirmNum = localStorage.getItem("confirmationNumber")
	confirmItem = localStorage.getItem("confirmationItem")
	confirmTime = localStorage.getItem("confrimationStartTime")
	text = confirmItem + " has been reserved starting at: " + confirmTime
	textNode = document.createTextNode(text) 
	text2 = "Your confirmation number: " + confirmNum
	textNode2 = document.createTextNode(text2)
	header.appendChild(textNode)
	header2.appendChild(textNode2)

}