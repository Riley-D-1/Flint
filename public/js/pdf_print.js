function print_(){
    container = document.getElementById("container")
    container.innerHTML = ""
    print_type = localStorage.getItem("Print_type")
    let flashcards = JSON.parse(localStorage.getItem("Flashcard"))
    const table = document.createElement('table')
    // body of table 
    let table_body = document.createElement('tbody')
    table.appendChild(table_body)
    container.appendChild(table) 
    if (print_type != "standard"){
        new_cards = rearrange_flashcards(flashcards)
        flashcards = new_cards
    }
    let i = 0 
    let page_count = 0;
    flashcards.forEach(card => {
        // Making back and front of table for each card
        const row = document.createElement("tr");
        const front = document.createElement("td");
        front.textContent = card.front;
        if (page_count % 2 === 1 && print_type != "standard") {
            front.style.fontStyle = "italic";
            front.style.fontWeight = "bold"; 
        }
        row.appendChild(front);
        const back = document.createElement("td");
        back.textContent = card.back;
        if (print_type === "standard"){
            back.style.fontStyle = "italic";
            back.style.fontWeight = "bold";
        }
        if (page_count % 2 === 1 && print_type != "standard") {
            back.style.fontStyle = "italic";
            back.style.fontWeight = "bold"; 
        }
        row.appendChild(back);
        table_body.appendChild(row)
        i++
        if ((i % 4) === 0){
            const pageBreak = document.createElement("div");
            pageBreak.className = "page";
            container.appendChild(pageBreak);
            page_count++;
            // Start a new table
            const newTable = document.createElement("table");
            const newBody = document.createElement("tbody");
            newTable.appendChild(newBody);
            container.appendChild(newTable);
            table_body = newBody;
        }
    })
    window.print();
    setTimeout(() => {
      window.location.href = "print.html"
    }, 4000);

}

function rearrange_flashcards(flashcards) {
    let reorganised = [];
    for (let i = 0; i < flashcards.length; i += 8) {
        const chunk = flashcards.slice(i, i + 8);
        while (chunk.length < 8) {
            chunk.push({ front: "", back: "" });
        }
        for (let j = 0; j < 8; j += 2) {
            reorganised.push({
                front: chunk[j].front,
                back: chunk[j + 1].front
            });
        }
        for (let j = 0; j < 8; j += 2) {
            reorganised.push({
                front: chunk[j + 1].back,
                back: chunk[j].back
            });
        }
    }
    return reorganised;
}
window.addEventListener("load", print_);
