let dealerSum = 0;
let playerSum = 0;

let dealerACount = 0;
let playerACount = 0;

let points =["1","2","3","4","5","6","7","8","9","10","11","12","13"];
let types=["C","D","H","S"];

let choseCard;
var deck=[];

var canHit = true;

window.onload=function(){
    buildDeck();
    shuffleDeck();
    dealCard();
}

function buildDeck(){
    for(let i = 0; i < types.length ; i++){
        for(let j = 0; j < points.length; j++){
            deck.push(points[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck(){ //交換洗牌法
    for(let i = 0; i < deck.length; i++){
        let change = Math.floor(Math.random()*deck.length);
        let storeNum = deck[i];
        deck[i] = deck[change];
        deck[change] = storeNum;
    }
}
console.log(deck);
function dealCard(){
    //暗牌
    choseCard = deck.pop();
    //console.log(choseCard);
    dealerSum = dealerSum + getValue(choseCard);
    dealerACount = dealerACount + checkA(choseCard);
    //暗牌
    while(dealerSum < 17){   //發到比17大
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum = dealerSum + getValue(card);
        dealerACount = dealerACount + checkA(card);
        document.getElementById("dealer-card").append(cardImg);
   }
   for(let i=0; i<2; i++){//先發給玩家2張
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum = playerSum + getValue(card);
        playerACount = playerACount + checkA(card);
        document.getElementById("player-card").append(cardImg);
        
   }
   console.log(playerSum);
   document.getElementById("add-card").addEventListener("click",hit);
   document.getElementById("stop-add-card").addEventListener("click",stop);
}

//檢查有沒有按到停牌
//document.getElementById("stop-add-card").addEventListener("click",stop);



function hit(){
    if(playerSum==21){
        return;
    }
    if (!canHit) {
        return;
    }
    //加牌
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerACount += checkA(card);
    document.getElementById("player-card").append(cardImg);
    //加牌
    /*
    while(playerSum > 21 && playerACount > 0){
        playerSum-=10;
        playerACount-=1;
    }
    if(playerSum>21){
        canHit = false;
    }
    */

    
    if(reduceAce(playerSum,playerACount) > 21){//超過21點將Ace算做1
        canHit = false;
    }
    
}
   
function stop(){
    dealerSum = reduceAce(dealerSum, dealerACount);
    playerSum = reduceAce(playerSum, playerACount);

    canHit = false;
    document.getElementById("backcard").src = "./cards/" + choseCard + ".png";

    let message = "";
    if (playerSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (playerSum == dealerSum) {
        message = "Tie!";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
    }

    
    console.log(message);
    //document.getElementById("results").innerText = message;
}



function reduceAce(yourSum , yourAceCount) {
    while (yourSum > 21 && yourAceCount > 0) {
        yourSum -= 10;
        yourAceCount -= 1;
    }
    return yourSum;
}

function getValue(card){
    let data = card.split("-");
    let value = data[0];
    if(value == "1"){
        return 11;

    }
    else if(parseInt(value)>9){
        return 10;
    }
    else{
        return parseInt(value);
    }
}

function checkA(card){
    let data = card.split("-");
    let value = data[0];
    if(value == "1"){
        return 1;
    }
    else{
        return 0;
    }
    
}