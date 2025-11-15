// I know that this is not safe but I dont care tbh, there is a big disclosure on the signup page and nobobdy is actually using this app atm lol. 

if (username_ === localStorage.getItem("username") && password_ === localStorage.getItem("password")) {
    alert("Login successful!");
    localStorage.setItem("logged_in",true)
} else if(!localStorage.getItem("username")  || !localStorage.getItem("password")){
    localStorage.setItem("logged_in",true)
    alert("Local Storage password or username missing");
}else
    alert("Invalid credentials");