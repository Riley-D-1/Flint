function check_theme(){
    const info_theme = document.getElementById("theme_info");
    if (document.getElementById("theme_selection").value === "space"){
        // Space theme saved to local storage
        localStorage.setItem("theme","space")
        console.log("Chosen space theme");
        info_theme.textContent = "Theme Selected (Space)";
    }else if(document.getElementById("theme_selection").value === "void"){
        // void theme saved to local storage
        localStorage.setItem("theme","void")
        console.log("Chosen void theme");
        info_theme.textContent = "Theme Selected (Void)";
    }else{
        info_theme.textContent = "Theme Selected (Standard)";
        localStorage.setItem("theme","dark")
        console.log("Chosen dark theme");
        

        // No theme set yet or selected dark, set dark theme to local storage
    }
}


function theme(){
    console.log("Theme")
    const body = document.body;
    if (localStorage.getItem("theme") === "space"){
        // Background = space image 
        body.style.backgroundImage = "url('../../assets/images/theme_bg/space_bg.png')"
        body.style.backgroundSize = "cover"; // optional
        body.style.backgroundColor = "";     // clear any color
        console.log("space");
    }else if (localStorage.getItem("theme") === "void"){
        body.style.backgroundImage = "";
        body.style.backgroundColor = "rgb(0, 0, 0)";
        console.log("void");
    }else{
        body.style.backgroundImage = "";
        body.style.backgroundColor = "rgb(0, 0, 60)";
        console.log("Standard");
    }
}
window.addEventListener("load", theme);


