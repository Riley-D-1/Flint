function print_(){
    container = document.getElementById("container")
    container.innerHTML = ""
    print_type = localStorage.getItem("Print_type")
    flashcards = JSON.parse(localStorage.getItem("Flashcard"))
    const table = document.createElement('table')
    // body of table 
    let table_body = document.createElement('tbody')
    table.appendChild(table_body)
    container.appendChild(table) 
    if (print_type === "standard"){
        let i = 0 
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
            i++
            if ((i % 4) === 0){
                table_body = document.createElement('tbody');
                table.appendChild(table_body);
            }
        });
           
    }else{
        // rearrange flashcards, so that you can print back to back
        new_cards = rearrange_flashcards(flashcards)
        let i = 0 
        new_cards.forEach(card => {
            // Making back and front of table for each card
            const row_table = document.createElement('tr')
            const front_table = document.createElement('td')
            front_table.textContent = card.front
            row_table.appendChild(front_table)
            const table_back = document.createElement('td')
            table_back.textContent = card.back
            row_table.appendChild(table_back)
            table_body.appendChild(row_table)
            i++
            if ((i % 4) === 0){
                table_body = document.createElement('tbody');
                table.appendChild(table_body);
            }
        });
    }
    // Change padding dynamically based on length 
    let cells = table.querySelectorAll("td")
        cells.forEach(element => {
        let text_length = element.textContent.length
        if (text_length <= 20){
            // orignal val = 120
            //element.style.padding = "120px"
            element.style.padding = "7.5em"
        }else if (text_length <= 100){
            // orignal is 60
            element.style.padding = "3.75em"  
        }else{
            // orignal is 30
            element.style.padding = "1.875em"
        } 
    });
    
    window.print();
    setTimeout(() => {
      window.location.href = "print.html"
    }, 4000);

}

function rearrange_flashcards(flashcards){
    let reorganised = []
    for(let i = 0;i<flashcards.length;i+=8){
        const chunk = flashcards.slice(i, i + 8);
        for(let j = 0; j<chunk.length-1;j+=2){
            reorganised.push({ front: chunk[j].front,back: chunk[j+1].front})
        }
        for(let k = 0;k<chunk.length-1;k+=2){
            reorganised.push({ front: chunk[k].back,back: chunk[k+1].back })
        }
    }
    return reorganised;
}

window.addEventListener("load", print_);
