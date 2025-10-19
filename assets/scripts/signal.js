let id = -1
flashcards = JSON.parse(temp_flashcards)
console.log(flashcards)
let cur_state = "front"
let flashcardStartTime = null;
let signal_penalty = 0;
function flip(state,id){
    if (state === "front"){
        document.getElementById("flash_info").textContent = flashcards[id].back;
        return "back"
    }else{
        document.getElementById("flash_info").textContent = flashcards[id].front;
        return "front"
    }
}
function correct(id){
    id++
    document.getElementById("flash_info").textContent = flashcards[id].front
    return id
}
function wrong(id){
    id++
    document.getElementById("flash_info").textContent = flashcards[id].front
    return id// 1 bar penalty
}
document.addEventListener('keydown',(event) => {
if (event.key === 'ArrowUp' || event.key === 'ArrowDown'){
    cur_state = flip(cur_state,id)
}else if (event.key === 'ArrowRight'){
    id = correct(id)
}    
else if (event.key === 'ArrowLeft'){
    id = wrong(id)
}
});
function signal_finding(start){
    let time_since_last_flashcard = math.floor((Date.now() - start) / 1000)
    let bars = Math.min(Math.floor(time_since_last_flashcard / 12), 5);
    if (time_since_last_flashcard > 60) {
        alert("You took too long on this flashcard! Game over. Returning to home")
        window.location.href = 'pages/index.html';
    }
    else if(time_since_last_flashcard < 30){
        let bars =+ 1
    }
    draw_tablet();
    signal(bars);
}

function main_loop() {
    tree_draw();
    setTimeout(() => {
        draw_tablet();
        signal(0);
        updateFlashcard();
    }, 50);
    setInterval(() => {
        signal_finding();
    }, 1000);
}
// Must be DOM content loaded in order to function correctly 
document.addEventListener('DOMContentLoaded', function() {
    const flip_button = document.getElementById("Flip")
    flip_button.addEventListener('click', () => {cur_state = flip(cur_state, id);});
});
document.addEventListener('DOMContentLoaded', function() {
    const wrong_button = document.getElementById("Wrong")
    cur_state = "front"
    wrong_button.addEventListener('click',() => {id = wrong(id);});
});
document.addEventListener('DOMContentLoaded', function() {
    const correct_button = document.getElementById("Correct")
    cur_state = "front"
    correct_button.addEventListener('click', () => {id = correct(id);});
});
main_loop()