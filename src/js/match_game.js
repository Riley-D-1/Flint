const canvas = document.getElementById("match_canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const temp_flashcards = localStorage.getItem("Flashcard");
flashcards = JSON.parse(temp_flashcards)
console.log(flashcards)
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


function match_cards(){
    // Split cards into one big array that is taken from
    flashcards.forEach(card => {
        console.log(card)
    });


}
function update_cards(){
    // Stub
    // Set the cards left 
    let last_cards = len(remaining_cards)-12 

    remaining_cards.splice(last_cards,12)
    // 
    if (len(cards) < 12 ){
        return "No Cards Left"
    }
}

function draw_bg(){
    ctx.fillStyle = 'rgb(0, 0, 60)';
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
function draw_cards(){
    ctx.lineWidth  = 5
    ctx.lineWidth = 2
    ctx.strokeStyle = '#c5c4c4ff'
    ctx.lineJoin = "round"
    ctx.font = "20px Comic Sans"
    for(let j = 0;j<3;j++){
        // So rows is J, 
        console.log(j)
        for(let i = 0; i<4 ;i++){
            console.log(i)
            // so columns are i
            // X is width, y is height  
            ctx.strokeRect((canvas.width/4)*i+50,(canvas.height/4)*j+150,(canvas.width/6),(canvas.height/5))
        }
    }

}
function next_round(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    update
}

function main(){
    draw_bg()
    draw_cards()
    info_check = update_cards()
    if info_check = "No Cards Left"{
        // Stub
    }else{
        next_round()
    }
}

