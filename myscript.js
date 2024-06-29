/*
  SIMON SAYS GAME, VERSON: 0.0 - ALL RIGHTS RESERVED
▄▀█ █░█ ▀█▀ █░█ █▀█ █▀█ ▀   ▄▀█ █   █▀ █░█ █▀▄ █ █▄░█
█▀█ █▄█ ░█░ █▀█ █▄█ █▀▄ ▄   █▀█ █   ▄█ █▄█ █▄▀ █ █░▀█
*/
const color=["red", "green", "blue", "yellow"];
let randomSequence=[];
let level=0;
let clickCounter=0;//It counts the clicks per level.
const soundEffect= new Audio();

function initialize()
{
    let randomNumber=0;
    for(let i=0; i<100;i++){
        randomNumber=Math.floor(Math.random()*4);
        randomSequence[i]=color[randomNumber];
    }
    console.log(randomSequence);
}

function flashAButton(){
    //randomSequence[level]::: here level is used because 
    //every level starts with a new button flashing.
    document.querySelector("h1").textContent="Level "+(level+1);
    flashedButton=document.getElementById(randomSequence[level]);
    flashedButton.classList.add("pressed");
    soundEffect.src="./sounds/"+randomSequence[level]+".mp3";
    soundEffect.play();
    setTimeout(function(){
        flashedButton.classList.remove("pressed");
        },300);
    level++; //With each button-flash Level increases by 1.
}

function gameOver(){
    document.querySelector("h1").textContent="Game Over! F5 to restart";
    document.querySelector("body").classList.add("game-over");
    setTimeout(function(){
        document.querySelector("body").classList.remove("game-over");
    },200);
    
    soundEffect.src="./sounds/wrong.mp3";
    soundEffect.play();
    randomSequence=[];
    level=0;
    clickCounter=0;
}

function toNextLevel(color){
    soundEffect.src="./sounds/"+color+".mp3";
    soundEffect.play();
    clickCounter++;
    if(clickCounter==level){
        clickCounter=0;
        setTimeout(flashAButton,900); //Delaying call to flashAButton for 0.9 second
    }
}

function handleClick(color){
    clickedButton=document.getElementById(color);
    clickedButton.classList.add("clicked");
    setTimeout(function(){
        clickedButton.classList.remove("clicked");
    },300);
    
    if(color==randomSequence[clickCounter] && clickCounter<level){
        toNextLevel(color);
    }
    else{gameOver();}
}

function handleKeyPress(event){
  const allowedKeys = /^[\w\W\s]$/;
  if (allowedKeys.test(event.key) || event.key === "Enter")
        {
            initialize();
            flashAButton();
        }
    document.removeEventListener("keydown", handleKeyPress);
}

//Wait for keyboard input
document.addEventListener("keydown", handleKeyPress);  
//Wait for click for each of the buttons
document.getElementById("red").addEventListener("click", function(){handleClick("red")});
document.getElementById("green").addEventListener("click", function(){handleClick("green")});
document.getElementById("blue").addEventListener("click", function(){handleClick("blue")});
document.getElementById("yellow").addEventListener("click", function(){handleClick("yellow")});
console.log(randomSequence);