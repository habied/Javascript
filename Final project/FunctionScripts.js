
let score=0;
let killedBirds=0;


//Function to make one bird fly

const flyBird=function(bird,left)
{
    let id=setInterval(function(){
    left+=10;
    
        if(left<(innerWidth-bird.width)){

                bird.style.left=left+"px";
            }
        else{
                clearInterval(id);
                bird.classList.add("hide");
            }
    },40);
}

//Function to create copies of each bird and make them fly

const createBirds=function(bird) {

    let id=setInterval(() => {

        let clonedBird=bird.cloneNode(true);
        clonedBird.classList.add("birds");
        if (bird.classList.contains("first")) {
            clonedBird.classList.add("first");
        }
        else if (bird.classList.contains("second")) {
            clonedBird.classList.add("second");
        }
        else if (bird.classList.contains("third")) {
            clonedBird.classList.add("third");
        }
        clonedBird.classList.remove("hide");

        let container=document.querySelector(".container");
        container.appendChild(clonedBird);
        randomLocation=Math.random()*500;
        clonedBird.style.top=randomLocation+"px";
        flyBird(clonedBird,0)

    }, (Math.random()*5000));

    setTimeout(() => {
        clearInterval(id);
    }, 60000);

}

//Function to create copies of each bird and make them fly

const killBird=function(bird){
    bird.onclick=function(){
        bird.classList.add("hide");
        killedBirds++;
        let killedBirdsItem=document.querySelectorAll(".infoItem")[3];
        killedBirdsItem.innerText=`Birds Killed: ${killedBirds}`;

        if (bird.classList.contains("first")) {
            score+=5;
        }
        else if (bird.classList.contains("second")) {
            score+=10;
        }

        else if (bird.classList.contains("third")) {
            score-=10;
        }
        let scoreItem=document.querySelectorAll(".infoItem")[1];
        scoreItem.innerText=`Score: ${score}`;
    }
    }

//Function to make one bomb fall 

const fallingBomb=function(bomb,top){

    let randomLocation=Math.random()*500;
    bomb.style.left=randomLocation+"px";
    bomb.classList.remove("hide");
    let id=setInterval(function(){
    top+=10;
    
        if(top<(innerHeight-bomb.height)){

                bomb.style.top=top+"px";
                
            }

        else{
                clearInterval(id);
                bomb.classList.add("hide");
            }
            
    },60);
    }

//Function to make bomb falls multiple times 

    const multipleFallingBombs=function(bomb,top){
        let id=setInterval(() => {
        
        fallingBomb(bomb,top)
        bomb.style.top=0;
        bomb.classList.remove("hide");

        },20000);

        setTimeout(() => {
            clearInterval(id);
        }, 60000);
    }




//Function that makes bomb explode and kill the surrounding birds with calculating their scores

const explodingBomb=function(Bomb){
Bomb.onclick=function(){
    Bomb.classList.add("hide");
    let x1=parseInt(Bomb.style.left)-500;
    let x2=parseInt(Bomb.style.left)+500;

    let Birds=document.querySelectorAll(".birds");
    [...Birds].forEach(bird => {

        if(x1<=parseInt(bird.style.left) && parseInt(bird.style.left)<x2) {
        bird.classList.add("hide");
        killedBirds++;
        let killedBirdsItem=document.querySelectorAll(".infoItem")[3];
        killedBirdsItem.innerText=`Birds Killed: ${killedBirds}`;
        if (bird.classList.contains("first")) {
            score+=5;
        }
        else if (bird.classList.contains("second")) {
            score+=10;
        }

        else if (bird.classList.contains("third")) {
            score-=10;
        }
        let scoreItem=document.querySelectorAll(".infoItem")[1];
        scoreItem.innerText=`Score: ${score}`;
        }
    });
    }
}


//Function that create the timer

    const timer=function(seconds) {
        let intervalId=setInterval(() => {
            let timer=document.querySelectorAll(".infoItem")[2];
            timer.innerText=`Time Limit: 0:${seconds--}`; 
            if (seconds<0) {
                clearInterval(intervalId);
            }
        }, 1000);
    
    }


//Function to send the user data including date of the last time the game played

    const sendDate=function(playerName, Score){
        let currentDate = new Date().toISOString().slice(0, 10)
            localStorage.setItem('name',playerName);
            localStorage.setItem('score',Score);
            localStorage.setItem('date',currentDate);
    }