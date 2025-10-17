const { jsPDF } = window.jspdf;
function print_flashcards(){
    const temp_flashcards = localStorage.getItem("Flashcard");
    console.log(temp_flashcards)
    flashcards = JSON.parse(temp_flashcards)
    if (document.getElementById("print_type").value ==="Double-Sided"){
        console.log("double sided");
    }else{
        console.log("standard");
        var doc = new jsPDF();
        doc.setFontSize(12);
        let yPos = 10
        flashcards.forEach((item) => {
            doc.text(20, yPos, item);
            yPos += 10;
        });
        doc.save("myarray.pdf");
    }  
}