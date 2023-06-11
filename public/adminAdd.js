window.addEventListener("DOMContentLoaded", function(){

    let submitButn = document.getElementById("adminSubmit");
    submitButn.addEventListener("click", function(event){
    
    verify();
    
    event.preventDefault();
    });

});

function verify(){

    let adName = document.getElementById("newAdminName");
    let adPass = document.getElementById("newAdminPass");

    let theerrors = 0;

    if (adName.value == "")
    {
        console.log("this is value", adName.value)
        console.log("bad username");
        // return;
        theerrors += 1;
    }


    if(adPass.value == "")
    {
        console.log("bad password");
        // return

        theerrors += 1;

    }


    if(theerrors == 0)
    {
        console.log("add to database");
        addAdmin(adName.value, adPass.value);
        window.location = "/"
    }

}


function addAdmin(name, password){
    const newAdmin = { user: `${name}`, password:`${password}`};
    console.log("added to server:" + newAdmin);
    
    const newdata = {
        user: name,
        pass: password
    };

    fetch('/write_admin', {
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
}