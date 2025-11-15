let id = 0
const temp_flashcards = localStorage.getItem("Flashcard");
flashcards = JSON.parse(temp_flashcards)
console.log(flashcards)
let cur_state = "front"
let signal_penalty = 0;
signal_interval = 0;
const canvas = document.getElementById("game_window")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
function flip(state,id){
    if (state === "front"){
        document.getElementById("flash_info").textContent = flashcards[id].back;
        return "back"
    }else{
        document.getElementById("flash_info").textContent = flashcards[id].front;
        return "front"
    }
}

function wrong(id) {
    id++
    if (id >= flashcards.length) {
        clearInterval(signal_interval);
        alert("You reached the end! You win!")
        window.location.href = 'index.html';
        return id
    }
    signal_penalty = Math.min(signal_penalty + 1, 5)
    console.log("Penalty increased to:", signal_penalty);
    document.getElementById("flash_info").textContent = flashcards[id].front
    return id
}


function correct(id) {
    signal_penalty = 0;
    id++
    if (id >= flashcards.length) {
        clearInterval(signal_interval);
        alert("You reached the end! You win!")
        window.location.href = 'index.html'
        return id;
    }
    document.getElementById("flash_info").textContent = flashcards[id].front
    return id
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

function signal_finding(start) {
    let time_since_last_flashcard = Math.floor((Date.now() - start) / 1000);
    let base_bars = 5;
    if (time_since_last_flashcard < 30) {
        base_bars = Math.min(base_bars + 1, 5);
    }
    let bars = base_bars - Math.floor(time_since_last_flashcard / 12);
    bars = Math.max(bars - signal_penalty, 0);
    console.log(bars);
    if (time_since_last_flashcard > 60 || bars <= 0) {
        clearInterval(signal_interval);
        alert("Signal lost! Game over.");
        window.location.href = 'index.html';
        return;
    }
    draw_tablet();
    signal(bars);
}

function signal(bar_amount){
    ctx.fillStyle = "white"
    for(let i = 0;i<bar_amount;i++){
        let bar_height = (i+i*10)
        ctx.fillRect(1350 + i * 15, 300 - bar_height, 10, bar_height);
    }
}
function draw_tablet(){
    // want  to add more depth to case but no time :(
    ctx.fillStyle = "black"
    ctx.lineJoin = "round"
    ctx.lineWidth = 90
    ctx.strokeStyle = '#1B1B1C'
    ctx.strokeRect(480, 180, 1000, 600)
    //This is the atenna 
    ctx.lineWidth = 20
    ctx.strokeRect(1400, 25, 8, 130) 
    // This is the like black part of the screen
    ctx.strokeStyle = "Black"
    ctx.lineWidth = 50
    ctx.strokeRect(500, 200, 960, 560) 
    // This is the camera dot
    ctx.strokeStyle = "Blue"
    ctx.lineWidth = 8
    ctx.strokeRect(1400, 200, 2, 2) 
    // The screen
    ctx.fillStyle = "#0D374E" //Right colour ? maybe purple?
    ctx.lineWidth = 50
    ctx.fillRect(524, 225, 911, 510) 
}
function tree_draw(){
    console.log("tree's drawn")
    const background = new Image();
    background.src = "../assets/images/signal-background.png"
    background.onload = () => {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    }
}

function main_loop() {
    tree_draw();
    setTimeout(() => {
        draw_tablet();
        signal(3)
        document.getElementById("flash_info").textContent = flashcards[id].front;
        setInterval(() => {
            signal_finding(Date.now());
        }, 1000);
    }, 100);
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
main_loop(id)