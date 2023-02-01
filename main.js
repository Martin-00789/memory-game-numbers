// Variable initialization
let uncoveredCards = 0; 
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let initialTime = 30; // Correccion: que el tiempo que figura en el inicio coincida con la variable
let countdownTimeId = null;


// Initial array

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random() - 0.5});
console.log(numbers);

// HTML selectors
let showMoves = document.getElementById("Movements");
let showHits = document.getElementById("Hits");
let showTimer = document.getElementById("t-left");

// Functions
function countdown(){
    countdownTimeId = setInterval(()=>{
    initialTime--;
    showTimer.innerHTML = `Time: ${initialTime} seconds`;
    if (initialTime == 0){
        clearInterval(countdownTimeId);
        blockCards();
    }
    },1000);
}

function blockCards(){
    for (let i = 0; i <= 15; i++){
    let lockedCard = document.getElementById(i);
    lockedCard.innerHTML = numbers[i];
    lockedCard.disabled = true;
  }
}

// Principal function

function uncover(id){
  if (timer == false){
    countdown();
    timer = true;
  }
  uncoveredCards++;
  console.log(uncoveredCards);
  if (uncoveredCards == 1){
    // Show first number
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = firstResult;
    // Disable first button
    card1.disabled = true;
  } else if (uncoveredCards == 2) {
    // Show second number
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = secondResult;

    // Disable second button
    card2.disabled = true;

    // increase movements
    movements++;
    showMoves.innerHTML = `Movements: ${movements}`;

    if (firstResult == secondResult) {
        // Reset uncoveredCards
        uncoveredCards = 0;
        // increase hits
        hits++;
        showHits.innerHTML = `Hits: ${hits}`;
        if (hits == 8){
            clearInterval(countdownTimeId);
            showHits.innerHTML = `Hits: ${hits} Congrats`;
            showTimer.innerHTML = `Fantastic! You only took ${30-initialTime} seconds`;
            showMoves.innerHTML = `Movements: ${movements} Congrats`;
        }
      } else {
        // momentarily show values ​​and cover again
        setTimeout(()=>{
        card1.innerHTML = " ";
        card2.innerHTML = " ";
        card1.disabled = false;
        card2.disabled = false;
        uncoveredCards = 0;
        },800);
      }
  }
 
}

