
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
        // window.open("../PillarPriority/admin.html");
        // window.close();
        window.location = "../PillarPriority/admin.html"
    }

}


function addAdmin(name, password){
    
    console.log("added to server")
    // const newAdmin = { user: `${name}`, password:`${password}`};
    // data.admin.push(newAdmin);
    // const updatedJsonData = JSON.stringify(data, null, 2);
    // fs.writeFileSync('data.json', updatedJsonData);
}