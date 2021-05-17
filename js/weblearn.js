let parentQueiz = document.querySelectorAll('.game-container #parent');
let myParentQuesizLength = [];
let container = document.querySelector('.game-container');
//Set Counter To Check If All Elements has matched
let currentScore = 0;
//Set Counter To Check Wrong Moves
let wrongMovesCounter = 0;
//Create A Celebrate Message If Win
let celebMessage = document.createElement('div');
//Set Class Attribute To The CelebrateMessage
celebMessage.setAttribute('class','celebrate');
//Set Text Celebration To The Message
let celebMessageh3 = document.createElement('h3');
//Create Text To H3
celebMessageh3.textContent = 'Congratulations';
//Append H3 To The CelebMessageContainer
celebMessage.appendChild(celebMessageh3);
//Create Paragraph Message Inside The CelebMessage
let celebMessageP = document.createElement('p');
//Set Tottal score
let tottalScore = 0;
//Get The Score 
var scoreBoard = document.getElementById('score');
scoreBoard.textContent = 'Score: ' + tottalScore;
//Get The wrong moves
var wrongMoves = document.getElementById('wrong');
wrongMoves.textContent = 'Wrong Moves: ' + wrongMovesCounter;

//Shuffle Cards While Loading The WebSite And The Game
let cards = [...parentQueiz.keys()];
shuffle(cards);
window.onload = ()=>{
    matching();
    parentQueiz.forEach((parent,index) =>{
        parent.style.order = cards[index];
    });
    countDown();
}

//Matching Cards Function
function matching(){
    for(let i = 0; i < parentQueiz.length; i++){
        parentQueiz[i].onclick = () =>{
            parentQueiz[i].classList.add('transform');
            myParentQuesizLength.push(parentQueiz[i]);
            if(myParentQuesizLength.length == 2){
                parentQueiz.forEach(parent =>{
                    parent.classList.add('disabeld');
                });
                if(myParentQuesizLength[0].children[1].children[0].src == myParentQuesizLength[1].children[1].children[0].src){
                    
                    setTimeout(function(){
                        myParentQuesizLength[0].classList.add('transform');
                        myParentQuesizLength[1].classList.add('transform');
                    },1000)
                    
                    setTimeout(function(){
                        myParentQuesizLength[0].classList.add('match');
                        myParentQuesizLength[1].classList.add('match');
                    },1500);
    
                    setTimeout(function(){
                        myParentQuesizLength = [];
                        currentScore++;
                        tottalScore = currentScore * 2; 
                        scoreBoard.textContent = 'Score: ' + tottalScore;
                        if(currentScore == 8){
                            clearInterval(countDownVar);
                            container.insertBefore(celebMessage,container.children[0]);
                            celebMessage.classList.add('showCelebMessage');
                            celebMessageP.textContent = `your Score is: ${tottalScore}`;
                            //Append Paragraph To The CelebMessage
                            celebMessage.appendChild(celebMessageP);
                        }
                    },2000)
                    
                    setTimeout(function(){
                        parentQueiz.forEach(parent =>{
                            parent.classList.remove('disabeld');
                        });
                    },2500);
                }else if(myParentQuesizLength[0].children[1].children[0].src != myParentQuesizLength[1].children[1].children[0].src){
                    
                    setTimeout(function(){
                        myParentQuesizLength[0].classList.remove('transform');
                        myParentQuesizLength[1].classList.remove('transform');
                    },1000);
    
                    setTimeout(function(){
                        myParentQuesizLength = [];
                    },1500);
    
                    setTimeout(function(){
                        parentQueiz.forEach(parent =>{
                            parent.classList.remove('disabeld');
                        });
                    },2000)
                    wrongMovesCounter++;
                    wrongMoves.textContent = 'Wrong Moves: ' + wrongMovesCounter;
                }
            }
        }
    }
}


//Start Game Button
let startGame = document.getElementById('start-game'),
    countDownVar;
startGame.onclick = ()=>{
    container.removeChild(container.children[0]);
    startGame.style.display = 'none';
    countDownVar = setInterval(countDown,1000);
}


//Timer of The Game
let startingMinutes = 2,
    time = startingMinutes * 60;
let timer = document.querySelector('.settings .count-down');


//Restart Button 
let myRandomBtn = document.getElementById('restart');
myRandomBtn.onclick = function(){
    parentQueiz.forEach((parent,index) =>{
        //Remove The match Class From All Elements
        parent.classList.remove('match');
        //Remove The transform Class From All Elements
        parent.classList.remove('transform');
        //Shuffule All The Cards Again
        shuffle(cards);
        parent.style.order = cards[index];
    });
    //Reset The Time From The Begining And Stop It Until It Starts Again
    time = startingMinutes * 60;
    countDown();
    clearInterval(countDownVar);
    //remove Celebratemessage
    celebMessage.remove();
    //Create Overlay And Display The StartGame Button
    let overlayElement = document.createElement('div');
    overlayElement.setAttribute('class','overlay');
    container.insertBefore(overlayElement,container.childNodes[0]);
    startGame.style.display = 'block';
    scoreBoard.textContent = 'Score: ' + 0;
    wrongMoves.textContent = 'Wrong Moves: ' + 0;

    currentScore = 0;
    wrongMovesCounter = 0;
}


//Shuffle The Cards Each Time
function shuffle(array){
    let currentIndex = parentQueiz.length,
        temp,
        randomIndex;
    while(currentIndex > 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        //Decrease The Length By 1
        currentIndex--;

        //save current Element Inside the TempValue
        temp = array[currentIndex];
        //Replace current Element by The New Random ELement
        array[currentIndex] = array[randomIndex];
        //Replace To The Selected Random ELement With The Value inside the TempValue
        array[randomIndex] = temp;
    }
    return array;
}


//Start To Make Count Down
function countDown(){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(time == 0){
        clearInterval(countDownVar);
        parentQueiz.forEach(card=>{
            card.classList.add('disabeld');
            card.style.display = "none";
        });
        tottalScore = currentScore * 2;
        container.insertBefore(celebMessage,container.children[0]);
        celebMessage.classList.add('showCelebMessage');
        celebMessageP.textContent = `your Score is: ${tottalScore}`;
        //Append Paragraph To The CelebMessage
        celebMessage.appendChild(celebMessageP);
    }
    timer.innerHTML = `${minutes} : ${seconds}`;
    time--;
}