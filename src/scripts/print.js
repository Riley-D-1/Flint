function print_flashcards(){
    const temp_flashcards = localStorage.getItem("Flashcard");
    flashcards = JSON.parse(temp_flashcards)
    if (flashcards.length >= 1){
        if (document.getElementById("print_type").value ==="Double-Sided"){
            localStorage.setItem("Print_type", "double")
            console.log("double")
            window.location.href = "print_pdf.html"
        }else if (document.getElementById("print_type").value ==="Standard"){
            localStorage.setItem("Print_type", "standard")
            console.log("standard")
            window.location.href = "print_pdf.html"
        }else{
            alert("Error, flashcards not found or print type missing")
        }
    }
}
function check_for_flashcards(){
    const temp_flashcards = localStorage.getItem("Flashcard");
    let flash_card_info = document.getElementById("flashcard_print_info")
    flashcards = JSON.parse(temp_flashcards)
    if (flashcards.length >= 1){
        flash_card_info.textContent = "Flashcards found!"
    }
}

window.addEventListener("load", check_for_flashcards);
