function account_login_dets_show(){
    login_info = document.getElementById("login_info")
    login_container = document.getElementById("login_container");
    console.log(localStorage.getItem("logged_in"))
    if (localStorage.getItem("logged_in") === "true"){
        login_info.textContent = "You are logged in!"
        login_container.style.display = "none"
    }else{
        login_info.textContent = "You are not currently logged in, Log in below!"
        login_container.style.display = "block"
    }
}
function login_redirect(){
    window.location.href = 'sign_in.html'
}
function sign_up_redirect(){
    window.location.href = 'signup.html'       
}
window.addEventListener("load", account_login_dets_show);