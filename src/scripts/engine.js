
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

function playSoundHit(audioName){
    let audioHit = new Audio(`./src/songs/hit.m4a`);
    audioHit.volume = 0.2;
    audioHit.play();
}

function playSoundTheme(){
    let audioTheme = new Audio(`./src/songs/theme.mp3`);
    audioTheme.volume = 0.2;
    audioTheme.play();
}

function playSoundWin(){
    let audioWin = new Audio(`./src/songs/wingame.mp3`);
    audioWin.volume = 0.2;
    audioWin.play();
}

function playSoundGameOver(){
    let audioGameOver = new Audio(`./src/songs/gameover.mp3`);
    audioGameOver.play();
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
            playSoundHit("hit");
            
            
           }
        });
    });
}

function resetGame(){
    alert("Game Over! O seu resultado foi: "+state.values.result);
    if(state.values.result >= 5)
    {
        playSoundWin();
        alert("Parabéns! Você derrotou o Boss e conseguiu um resultado de "+state.values.result+" derrotando o boss!")
        setTimeout(() => {
            location.reload();
        }, 7000);
    }
    else
    {
        playSoundGameOver();
        alert("Infelizmente você perdeu para o Boss!");
        setTimeout(() => {
            location.reload();
        }, 7000);
    }
    
    
}

function main(){
    moveEnemy();
    addListenerHitBox();
    playSoundTheme();
}

main();