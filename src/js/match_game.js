const canvas = document.getElementById("match_canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const temp_flashcards = localStorage.getItem("Flashcard");
flashcards = JSON.parse(temp_flashcards)
// Wait hold up let me think chat 
// So a grid of 3x4
//canvas.addEventListener('click', function(event) {
//if (click){
      //  console.log(EventTarget)
        // Do something
    //}else{
        // Do nothing
    //}
//})
//setInterval(onTimerTick, 33)
// Use temp values of 0 

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
        [array[i], array[random_i] = [
            array[random_i],array[i]
        ]]
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
	// Shuffle cards using function
	return remaining_cards
}

function get_slice(){
    let list_chunk = remaining_cards.slice(-12)
    shuffle_cards(list_chunk)
    console.log(list_chunk)
}

function update_cards(remaining_cards){
    if (remaining_cards.length < 12 ){
        return "No Cards Left"
    }else{
        let remaining_cards  = remaining_cards.splice(remaining_cards.length-6,12)
        console.log(list_chunk)
        return remaining_cards
    }
}

function draw_bg(){
    ctx.fillStyle = 'rgb(0, 0, 60)';
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function get_card_info(row_num,column_num,slice){
    if (cards_array[row_num][column_num] = 0){
        // Fetch needed text 
		let slice_index = row_num+column_num
        return slice[slice_index]
    }else{
        return ""  
    }
}

function draw_cards(slice){
    ctx.lineWidth  = 5
    ctx.lineWidth = 2
    ctx.strokeStyle = '#c5c4c4ff'
    ctx.lineJoin = "round"
    ctx.font = "20px Comic Sans"
    for(let j = 0;j<3;j++){
        // So rows is J, 
        for(let i = 0; i<4 ;i++){
            // so columns are i
            // X is width, y is height  
            // The rectangles
            ctx.strokeRect((canvas.width/4)*i+50,(canvas.height/4)*j+150,(canvas.width/6),(canvas.height/5))
            // The text elements inside are done right after so I call the required functions to fetch current cards here
            text_content = get_card_info(j,i,slice)
            ctx.textAlign = "center"; 
            ctx.fillText(text_content,(canvas.width/4)*i+50 ,(canvas.height/4)*j+150 );
        }
    }

}


function check_match(card1,card2,flash_cards){
    for(let i; i < flash_cards.length; i++){
        let card = cards[i]
        // Check against the flashcard thing
        if (card.front == card1 && card.back == card2){
            return true
        }
        // Check other way
        else if (card.front == card1 && card.back == card2){
            return true
        }else{
            return false
        }
    }
}
function end_game(){
    ctx.fillStyle = 'rgb(0, 0, 60)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

}
function match(){
    if (check_match(card1) = true){
       // Make the required elements turn visible 
    }
}

function main(remaining_cards){
    draw_bg()
    get_slice()
    remaining_cards_ = update_cards(remaining_cards_)
    if(remaining_cards_ = "No Cards Left"){
        console.log("No Cards Left")
        // Display 
        end_game()
        window.location.href = 'index.html';
        clearInterval(game_loop);
        // Make new cards and restart the round
    }else{
        remaining_cards = update_cards
    }
    draw_cards()
}
remaining_cards = make_match_cards(flashcards)
let game_loop = setInterval(main(remaining_cards), 33);

