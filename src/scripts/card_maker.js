function convert(){
    const fileInput = document.getElementById("markdown_file");
    const file = fileInput.files[0]
    try {
        file.text().then(markdownText => {
            const tokenList = marked.lexer(markdownText || "");
            const flashcards = [];
            for (const token of tokenList) {
                if (token.type === "table") {
                    for (const row of token.rows) {
                        const front = row[0]?.text || "";
                        const back = row[1]?.text || "";
                        flashcards.push({ front, back });
                    }
                }
            }
            localStorage.setItem("Flashcard", JSON.stringify(flashcards));
            console.log(JSON.stringify(flashcards));
            alert("Markdown converted and saved.");
        })
    } catch{
        alert("Markdown conversion failed. Check help page"); 
        console.log(console.error());
    }
}

function flash_add(){
    const front = document.getElementById("front_input_flashcard").value;
    const back = document.getElementById("back_input_flashcard").value;
    let cards = JSON.parse(localStorage.getItem("Flashcard")) || [];
    cards.push({ front, back });
    console.log(cards)
    localStorage.setItem("Flashcard", JSON.stringify(cards));
    alert("Flashcard added")
}

function show_current_cards(){
    // clear previous tables
    // Styling changes the table to look nicer fyi
    const container = document.getElementById('table-container')
    container.innerHTML = "";
    if (localStorage.getItem("Flashcard").length >= 1){
        console.log("making cards_table");
        flashcards = JSON.parse(localStorage.getItem("Flashcard"))
        // Where the table is going 
        // The actual table
        const table = document.createElement('table')
        // body of table 
        const table_body = document.createElement('table_body')
        table.appendChild(table_body)
        container.appendChild(table)  
        flashcards.forEach(card => {
            // Making back and front of table for each card
            const row_table = document.createElement('tr')
            const front_table = document.createElement('td')
            front_table.textContent = card.front
            row_table.appendChild(front_table)
            const table_back = document.createElement('td')
            table_back.textContent = card.back
            row_table.appendChild(table_back)
            table_body.appendChild(row_table)
        });
        container.appendChild(table);
        
    }
}