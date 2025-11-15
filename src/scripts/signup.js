function password_test(message){
    const password_len_test = message.length 
    const has_number = /[0-9]/.test(message);
    const has_letter = /[a-zA-Z]/.test(message);
    // Debugging Test
    console.log(has_number && has_letter && password_len_test >= 8)
    // The operand && will return true only if both values are true
    return has_number && has_letter && password_len_test >= 8;
}

function check(){
    // This firstly checks that the email contains a .com and an @ symbol
    // It also checks that the password includes by using the exisitng password testing function
    // The operand && will return true only if all values are true
    let password = document.getElementById("password").value
    let email = document.getElementById("email").value
    let username = document.getElementById("username").value
    if (email.includes("@") === true && email.includes(".com") === true && password_test(password) === true){
        // Debugging statement
        console.log("All valid values")
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        // You can redirect here
        window.location.href = 'index.html';
    }else{
        // Alerts the user
        alert("A problem has occured, please ensure all values are valid.")
    }
}

function show_password_toggle(){
    let password_ = document.getElementById("password")
    if (password_.type === "password"){
        password_.type = "text"
    }else{
        password_.type = "password"
    }
}


function password_info_check(){
    let password_2 = document.getElementById("password").value
    let password_info = document.getElementById("password_info")
    if (password_test(password_2) === false){
        password_info.style.color = "red";
        password_info.textContent  = "Password must contain letters, numbers and at least 8 character long."
    }else{
        password_info.style.color = "white";
        password_info.textContent  = "Password:" 
    }
}