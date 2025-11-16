// I know that this is not safe but I dont care tbh, there is a big disclosure on the signup page and nobobdy is actually using this app atm lol. 
// + the alternatives are really complex and not sure if I want to do them. 
function login_(){
    username_ = document.getElementById("username_")
    let password_ = document.getElementById("password")
    if (username_ === localStorage.getItem("username") && password_ === localStorage.getItem("password")) {
        alert("Login successful!");
        localStorage.setItem("logged_in",true)
    } else if(!localStorage.getItem("username")  || !localStorage.getItem("password")){
        localStorage.setItem("logged_in",true)
        alert("Local Storage password or username missing, please make an account (remake if you already have)");
    }else
        alert("Invalid credentials");
    }
function show_password_toggle(){
    let password_ = document.getElementById("password")
    if (password_.type === "password"){
        password_.type = "text"
    }else{
        password_.type = "password"
    }
}