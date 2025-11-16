function print_(){
    container = document.getElementById("container")
    container.innerHTML = ""
    print_type = localStorage.getItem("Print_type")
    console.log("something")
    if (print_type === "standard"){
        flashcards = JSON.parse(localStorage.getItem("Flashcard"))
        console.log("making cards_table");
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
    }else{
        flashcards.forEach(element => {
        
        });
    }
    window.print();
}

window.addEventListener("load", print_);