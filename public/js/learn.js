let id = -1
const temp_flashcards = localStorage.getItem("Flashcard");
console.log(temp_flashcards)
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
function next(id){
    id++
    document.getElementById("flash_info").textContent = flashcards[id].front
    return id
}
function previous(id){
    id--
    document.getElementById("flash_info").textContent = flashcards[id].front
    return id
}

document.addEventListener('keydown',(event) => {
if (event.key === 'ArrowUp' || event.key === 'ArrowDown'){
    cur_state = flip(cur_state,id)
} else if (event.key === 'ArrowRight'){
    id = next(id)
}    
else if (event.key === 'ArrowLeft'){
    id = previous(id)
}
});

// Must be DOM content loaded in order to function correctly 
document.addEventListener('DOMContentLoaded', function() {
    const next_button = document.getElementById("next")
       next_button.addEventListener('click',() => {id = next(id);});
    });
document.addEventListener('DOMContentLoaded', function() {
    const flip_button = document.getElementById("flip")
    flip_button.addEventListener('click', () => {cur_state = flip(cur_state, id);});
});
document.addEventListener('DOMContentLoaded', function() {
    const previous_button = document.getElementById("back")
    previous_button.addEventListener('click', () => {id = previous(id);});
});