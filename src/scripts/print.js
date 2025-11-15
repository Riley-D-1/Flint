const { jsPDF } = window.jspdf;
function print_flashcards(){
    const temp_flashcards = localStorage.getItem("Flashcard");
    console.log(temp_flashcards)
    flashcards = JSON.parse(temp_flashcards)
    if (document.getElementById("print_type").value ==="Double-Sided"){
        console.log("double sided");
        // more difficult 
        // so the plan is for each item to match up page wise yk. 
        // so when u print double sided it auto works 
        var doc = new jsPDF();
        doc.setFontSize(12);
        let yPos = 10
        flashcards.forEach((item) => {
            console.log(item)
            doc.text(20, yPos, item);
            yPos += 10;
        });
        doc.save("myarray.pdf");
    }else{
        console.log("standard");
        // standard will just print 2 columns
        var doc = new jsPDF();
        doc.setFontSize(12);
        let yPos = 10
        flashcards.forEach((item) => {
            console.log(item)
            doc.text(20, yPos, item);
            yPos += 10;
        });
        doc.save("myarray.pdf");
    }  
}

