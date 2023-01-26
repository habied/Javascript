window.addEventListener("load",function(){


// Setting the player's name in the greeting sections

let playerName=document.location.search.split("playerName=")[1];
let greetingMessage=document.querySelector("p");
greetingMessage.innerText=`Welcome ${playerName}`;
let greetingIcon=document.querySelector(".infoItem");
greetingIcon.innerText=`Welcome: ${playerName}`;

//Selection for the buttons

let startButton=document.querySelector(".button");
let playAgianButton=document.querySelectorAll(".button")[1];

//Selection for the three birds

let firstBird=document.querySelectorAll(".birds")[0];
let secondBird=document.querySelectorAll(".birds")[1];
let thirdBird=document.querySelectorAll(".birds")[2];


//Function starting the game by clicking start button

startButton.onclick=function(){

//Hiding starting message

    document.querySelector(".Message").classList.add("hide");

//Starting the timer

    let seconds=59;
    timer(seconds);

//Calling the creating birds functions

    createBirds(firstBird);
    createBirds(secondBird);
    createBirds(thirdBird);

//Assigning kill bird function (makes bird dissappar and calculate each score on clicking) on each created bird 

document.onclick=function(){
let Birds=document.querySelectorAll(".birds");
    [...Birds].forEach(bird => {
        killBird(bird);
    });
}


//Calling function for bomb to fall

let Bomb=document.querySelector(".bomb");
multipleFallingBombs(Bomb,0);

//Function that makes bomb explode and kill the surrounding birds with calculating their scores

explodingBomb(Bomb);

//Appearing of end message after the time ends telling the user his/her score and asks if he/she wants to play again

    setTimeout(() => {
        document.querySelectorAll(".Message")[1].classList.remove("hide");
        let scoreMessage=document.querySelectorAll(".Message")[1].firstElementChild.nextElementSibling;
        scoreMessage.innerText=`Your score is ${score}`;

        if (score>50)
        {document.querySelectorAll(".EndingMessage")[0].classList.remove("hide");}
        else
        {document.querySelectorAll(".EndingMessage")[1].classList.remove("hide");}

//Send the user data to the server

        sendDate(playerName, score);

//Starting the game again if the user clicked "play again" button

        playAgianButton.onclick=function(){

            document.querySelectorAll(".Message")[1].classList.add("hide");
            document.querySelector(".Message").classList.remove("hide");
            score=0;
            killedBirds=0;
        }

    }, 60000);


}

});
