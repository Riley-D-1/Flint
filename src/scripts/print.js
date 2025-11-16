function print_flashcards(){
    const temp_flashcards = localStorage.getItem("Flashcard");
    flashcards = JSON.parse(temp_flashcards)
    if (flashcards.length >= 1){
        if (document.getElementById("print_type").value ==="Double-Sided"){
            localStorage.setItem("Print_type", "double")
            console.log("double")
            window.location.href = "/src/pages/print_pdf.html"
        }else if (document.getElementById("print_type").value ==="Standard"){
            localStorage.setItem("Print_type", "standard")
            console.log("standard")
            window.location.href = "/src/pages/print_pdf.html"
        }else{
            alert("Error, flashcards not found or print type missing")
        }
    }
}

