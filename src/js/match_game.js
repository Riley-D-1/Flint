const canvas = document.getElementById("match_canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const temp_flashcards = localStorage.getItem("Flashcard");
flashcards = JSON.parse(temp_flashcards)
let first_run = true;
let first_click = null
let matched = []

// Set the varibles above
// So a grid of 3x4

// Use values to detect if clicked already
cards_array = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

function shuffle_cards(array){
    let i = array.length
    while(i > 0){
        let random_i = Math.floor(Math.random() * i)
        i--
        [array[i], array[random_i]] = [array[random_i], array[i]]
    }
}


function make_match_cards(){
    // Split cards into one big array that is taken from
    remaining_cards = []
	// Push all cards to new list so its easier to display
    flashcards.forEach(card => {
        remaining_cards.push(card.front)
        remaining_cards.push(card.back)
    });
	return remaining_cards
}

function get_slice(){
    let list_chunk = remaining_cards.slice(-12)
    shuffle_cards(list_chunk)
    console.log(list_chunk)
    return list_chunk
}

function update_cards(remaining_cards){
    if (remaining_cards.length < 24 ){
        end_game()
        return null
    }else{
        remaining_cards.splice(remaining_cards.length - 12, 12);
        return remaining_cards
    }
}

function draw_bg(){
    ctx.fillStyle = 'rgb(0, 0, 60)';
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function get_card_info(row_num,column_num,slice){
    if (cards_array[row_num][column_num] === 0 ||cards_array[row_num][column_num] === 1 ){
        // Fetch needed text 
        let slice_index = row_num * 4 + column_num;
        return slice[slice_index]
    }else{
        // Do nothing as already matched 
        return ""  
    }
}

function draw_cards(slice,selected,matched){
    ctx.lineWidth  = 5
    ctx.lineWidth = 2
    ctx.strokeStyle = '#c5c4c4ff'
    ctx.lineJoin = "round"
    ctx.font = "20px Comic Sans"
    for(let j = 0;j<3;j++){
        // So rows is J, and I is columns (loop through both)
        for(let i = 0; i<4 ;i++){
            ctx.strokeStyle = '#c5c4c4ff'
            // Detect selected 
            if (selected && selected.row === j && selected.col === i){
                ctx.strokeStyle = 'rgba(255, 0, 0, 1)'
                console.log("Selected color ")
            }
            // Detect matched 
            if(matched){
                for(let l = 0; l<matched.length;l ++){
                    if (matched[l].row === j && matched[l].col === i){
                        ctx.strokeStyle = 'rgba(0, 255, 13, 1)';
                        console.log("Selected match color ")
                    }
                }
            }
            // so columns are i
            // X is width, y is height  
            // The rectangles
            ctx.strokeRect((canvas.width/4)*i+50,(canvas.height/4)*j+150,(canvas.width/6),(canvas.height/5))
            // The text elements inside are done right after so I call the required functions to fetch current cards here
            text_content = get_card_info(j,i,slice)
            ctx.textAlign = "center"; 
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            // Probably needs to be improve if time is still present (text length matters)
            ctx.fillText( text_content, (canvas.width/4)*i+50 + (canvas.width/6)/2, (canvas.height/4)*j+150 + (canvas.height/5)/2 )
        }
    }
}

function matched_(data){
    matched.push(data)
}

function handle_click(row,col,slice,flash_cards){
    if (cards_array[row][col] === 2) return
    cards_array[row][col] = 1
    // Check if its first click
    if (!first_click){
        console.log("First click")
        first_click = {row,col}
    }else{
        console.log("Second Click")
        const card_1 = slice[first_click.row*4 + first_click.col]
        const card_2 = slice[row*4 + col]
        if (check_match(card_1,card_2,flash_cards) === true){
            cards_array[first_click.row][first_click.col] = 2;
            cards_array[row][col] = 2;
            matched_({"row": first_click.row, "col": first_click.col});
            matched_({"row": row, "col": col});
            first_click = null

        }else{
            // Flip back after 3 seconds
            setTimeout(() =>{
                cards_array[first_click.row][first_click.col] = 0;
                cards_array[row][col] = 0;
                draw_bg()
                draw_cards(slice,first_click,matched)
            }, 1000);
            first_click = null;
        }
    }
    draw_bg()
    draw_cards(slice,first_click,matched)

}

function check_match(card1,card2,flash_cards){
    for(let i = 0; i < flash_cards.length; i++){
        let card = flash_cards[i]
        // Check against the flashcard thing (Both ways)
        if (card.front === card1 && card.back === card2 || card.front === card2 && card.back === card1){
            console.log("good")
            return true
        }
    }
    return false
    
}

function end_game(){
    ctx.fillStyle = 'rgb(0, 0, 60)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    alert("All cards finished, sending you to the homepage")
    window.location.href = 'index.html';
}

function start_(remaining_cards){
    draw_bg()
    let slice = get_slice()
    let remaining_cards_
    remaining_cards_ = remaining_cards
    draw_cards(slice)
    return slice
   
}

function millisecond_converter(time_mills){
    let mins = Math.floor(time_mills / 60000)
    let secs = ((time_mills % 60000) / 1000).toFixed(0)
    return mins + ":" + (secs < 10 ? '0' : '') + secs
}

function draw_info(){
    ctx.fillStyle = 'rgb(0, 0, 60)';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillText("Click for next round!",canvas.width/2,canvas.height/2)
}

// The main loop (didnt bother with function)

function main(remaining_cards){
    let start = Date.now();
    let slice_  = start_(remaining_cards)
    // Add driving click events
    function click_logic(e){
        const rect = canvas.getBoundingClientRect()
        let mouse_x = e.clientX - rect.left
        let mouse_y = e.clientY - rect.top
        // The foor loop checking if clicked inside of box
        for(let row = 0;row < 3;row++){
            for(let col = 0;col<4;col++){
                const x = (canvas.width/4)*col+50
                const y = (canvas.height/4)*row+150
                // Not my if statement logic
                if(mouse_x >= x && mouse_x <= x+(canvas.width/6) && mouse_y >= y && mouse_y <= y+(canvas.height/5)){
                    handle_click(row,col,slice_,flashcards)
                    if(matched.length === 12){
                        console.log(matched)
                        alert(`Time taken this round ${millisecond_converter(Date.now()-start)}`)
                        // Clear event listener (so no problems)
                        // reset cards array
                        cards_array = [
                            [0,0,0,0],
                            [0,0,0,0],
                            [0,0,0,0]
                        ]
                        matched = []
                        canvas.removeEventListener('click',click_logic);
                        first_click = null;
                        // Reset for next slice and recall main with new cards
                        draw_info()
                        let remaining_cards_updated = update_cards(remaining_cards)
                        console.log(remaining_cards_updated)
                        if (remaining_cards_updated != null) {
                            main(remaining_cards_updated)
                        }
                    }

                }
            }
        }
    }
    canvas.addEventListener('click',click_logic)
}
// Start the main (it self triggers further rounds and breaks when )
let start_remaining_cards = make_match_cards(flashcards)
main(start_remaining_cards)
