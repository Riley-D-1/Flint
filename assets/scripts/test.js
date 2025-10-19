let id = -1
flashcards = JSON.parse(temp_flashcards)
console.log(flashcards)
let cur_state = "front"
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
    console.log(id)
}
function wrong(id){
    console.log(id)
}
document.addEventListener('keydown',(event) => {
if (event.key === 'ArrowUp' || event.key === 'ArrowDown'){
    cur_state = flip(cur_state,id)
}else if (event.key === 'ArrowRight'){
    id = next(id)
}    
else if (event.key === 'ArrowLeft'){
    id = previous(id)
}
});

// Must be DOM content loaded in order to function correctly 
document.addEventListener('DOMContentLoaded', function() {
    const flip_button = document.getElementById("Flip")
    flip_button.addEventListener('click', () => {cur_state = flip(cur_state, id);});
});
document.addEventListener('DOMContentLoaded', function() {
    const wrong_button = document.getElementById("Wrong")
    next_button.addEventListener('click',() => {id = wrong(id);});
});
document.addEventListener('DOMContentLoaded', function() {
    const previous_button = document.getElementById("Correct")
    previous_button.addEventListener('click', () => {id = correct(id);});
});