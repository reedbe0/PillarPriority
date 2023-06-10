

function checkFormUser()
{

    let codeNum = document.getElementById("code");
    let userEmail = document.getElementById("userEmail");


    if (codeNum.value == "")
    {
        codeNum.classList.add("error");
    }
    else
    {
        codeNum.classList.remove("error");
    }

    if (codeNum.value.length != 4)
    {
        codeNum.classList.add("error");
    }
    else
    {
        codeNum.classList.remove("error");
    }

    let regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    let regexTest = regEx.exec(userEmail.value);

    if(regexTest == null)
    {
        userEmail.classList.add("error");
    }
    else
    {
        userEmail.classList.remove("error");
    }
    
    
}

function checkFormAdmin()
{

    let password = document.getElementById("adminPass");
    let adminEmail = document.getElementById("username");



    // let regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    // let regexTest = regEx.exec(adminEmail.value);

    // if(regexTest == null)
    // {
    //     adminEmail.classList.add("error");
    // }
    // else
    // {
    //     adminEmail.classList.remove("error");
    // }

    if(adminEmail.value == "")
    {
        adminEmail.classList.add("error");
    }
    else
    {
        adminEmail.classList.remove("error");
    }
    
    
    if(password.value == "")
    {
        password.classList.add("error");
    }
    else
    {
        password.classList.remove("error");
    }

}



window.addEventListener("DOMContentLoaded", function(){

    document.getElementById("loginButton").addEventListener("click", function(event) {
    
        var UserTab = document.getElementById("userTab");
    
        if(UserTab.style.display == "none")
        {
            console.log("admin is using");
            checkFormAdmin();
        }
        else
        {
            console.log("user is using");
            checkFormUser();

        }
        //checkFormUser();
        
    
        // Prevent default form action. DO NOT REMOVE THIS LINE
        event.preventDefault();
    });

    document.getElementById("userTabButton").addEventListener("click", function(event){
        document.getElementById("code").classList.remove("error");
        document.getElementById("userEmail").classList.remove("error");;

    });

    document.getElementById("userTabButton").addEventListener("click", function(event){
        document.getElementById("adminPass").classList.remove("error");
        document.getElementById("username").classList.remove("error");

    });

});