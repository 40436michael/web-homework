let dealerSum = 0;
let playerSum = 0;

let dealerACount = 0;
let playerACount = 0;

let points =["1","2","3","4","5","6","7","8","9","10","11","12","13"];
let types=["C","D","H","S"];

let choseCard;
var deck=[];

let canHit = true;

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

function dealCard(){
    //暗牌
    choseCard = deck.pop();
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
}
//檢查有沒有按到加牌
document.getElementById("add-card").addEventListener("click",hit);
//檢查有沒有按到停牌
//document.getElementById("stop-add-card").addEventListener("click",stop);

function hit(){
    if(canHit == false){ //如果超過21點就不能按加
        return;            
    }
    //加牌
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum = playerSum + getValue(card);
    playerACount = playerACount + checkA(card);
    document.getElementById("player-card").append(cardImg);
    //加牌
    if(changeAce(playerSum,playerACount) > 21){//超過21點將Ace算做1
        canHit = false;
    }
}




function changeAce(playerSum,playerACount){
    while(playerSum > 21 && playerACount > 0){
        playerACount--;
        playerSum-=10;
    }
    return playerSum;
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
    if(card[0] == "1"){
        return 1;
    }
    else{
        return 0;
    }
}