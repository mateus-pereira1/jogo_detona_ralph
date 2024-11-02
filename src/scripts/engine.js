
const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time_left"),
        socre: document.querySelector("#score")
    },
    values: {
        timerId: null, gameVelocity:1000,
        hitPosition:0,
        result: 0,
        currentTime: 60,
        countDownTimerId: setInterval(countDown, 1000)
        
    }
};
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime === 0)
    {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        resetGame();
        
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/songs/hit.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
           if(square.id === state.values.hitPosition){
            state.values.result++
            state.view.socre.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
            
            
           }
        });
    });
}

function resetGame(){
    alert("Game Over! O seu resultado foi: "+state.values.result);
    location.reload();
}

function main(){
    moveEnemy();
    addListenerHitBox();
}

main();