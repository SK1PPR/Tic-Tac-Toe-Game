//selecting all required elements

const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".resultbox"),
wonText = resultBox.querySelector(".wontxt"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{
    for(let i = 0; i < allBox.length; i++){
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
    selectXBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("shit");
    }
    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("shit");
        players.setAttribute("class","players active player");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

//user-click-function
function clickedBox(element){
    if(players.classList.contains("player")){
        element.innerHTML = `<strong>O</strong>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id",playerSign);
    }else{
        element.innerHTML = `<strong>X</strong>`;
        players.classList.add("active");
        playerSign = "X";
        element.setAttribute("id",playerSign);
    }
    element.style.pointerEvents = "none";
    checkWinner();
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random()*1000)+200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    },randomDelayTime);
}

//bot-click-function
function bot(runBot){
    if(runBot){
        let array = [];
    for(let i = 0; i < allBox.length; i++){
        if(allBox[i].childElementCount==0){
             array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if(array.length > 0){
        if(players.classList.contains("player")){
            // element.innerHTML = `<i class="${playerOIcon}"></i>`;
            allBox[randomBox].innerHTML = `<strong>X</strong>`;
            players.classList.remove("active");
            playerSign="X";
            allBox[randomBox].setAttribute("id",playerSign);
        }else{
            // element.innerHTML = `<i class="${playerXIcon}"></i>`;
            allBox[randomBox].innerHTML = `<strong>O</strong>`;
            players.classList.remove("active");
            playerSign="O";
            allBox[randomBox].setAttribute("id",playerSign);
            checkWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
    }
    else{
        runBot=false;
        setTimeout(()=>{
            playBoard.classList.remove("shit");
            resultBox.classList.add("shit");
        },700);
        wonText.innerHTML = `Match has been drawn!`; 
    }
    }
}

function getID(idname){
    return document.querySelector(".box"+idname).id;
}

function checkThreeIDs(val1, val2, val3, sign){
    if(getID(val1)==sign && getID(val2)==sign && getID(val3)==sign){
        return true;
    }
}

function checkWinner(){
    if(checkThreeIDs(1,2,3, playerSign)||checkThreeIDs(4,5,6, playerSign)||checkThreeIDs(7,8,9, playerSign)||checkThreeIDs(1,4,7, playerSign)||checkThreeIDs(2,5,8, playerSign)||checkThreeIDs(3,6,9, playerSign)||checkThreeIDs(1,5,9, playerSign)||checkThreeIDs(3,5,7, playerSign)){
        console.log(playerSign + " is the winner");
        runBot=false;
        setTimeout(()=>{
            playBoard.classList.remove("shit");
            resultBox.classList.add("shit");
        },700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }
}

replayBtn.onclick = () =>{
    window.location.reload();
}