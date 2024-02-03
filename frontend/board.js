straights = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
outsides = [
    0, 0, 0, 0, 0, 0
];

horizontalSplits = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
verticalSplits = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const player = document.getElementsByClassName("player");


player1 = {
    id: 1,
    currentCoin: 0,
    currentBetType: "",
    currentBalance: 100,
    score: 0
}

player2 = {
    id: 2,
    currentCoin: 0,
    currentBetType: "",
    currentBalance: 100,
    score: 0
}

player3 = {
    id: 3,
    currentCoin: 0,
    currentBetType: "",
    currentBalance: 100,
    score: 0
}

player4 = {
    id: 4,
    currentCoin: 0,
    currentBetType: "",
    currentBalance: 100,
    score: 0
}


turns = [false, false, false, false];

var coinValue = 0;
var betType = "";
score = 0;

squares = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]


var currBet = Infinity;
var splitBet;

function betStatus(typeBet) {
    betType = typeBet;
    var event = new CustomEvent('betDeclared', { detail: typeBet });
    document.dispatchEvent(event);
}

function scoreStatus(scoreValue) {
    score = scoreValue;
    var event = new CustomEvent('playerScore', { detail: scoreValue });
    document.dispatchEvent(event);
}

function chipSelector(chip) {

    chip.style.transform = 'scale(1)';
    selectedChip = {
        'chip': chip.id,
        'value': chip.value
    };
    coinValue = chip.value;
    console.log("current player's chip : " + coinValue);
}

function straightBet(element) {
    selected = parseInt(element.getAttribute("data-num"));
    straights[selected - 1] = selected;
    currBet = selected;
    var chipImage = document.createElement("img");
    chipImage.src = "assets/chip_blue.png";
    chipImage.height = 25;
    chipImage.width = 25;
    element.appendChild(chipImage);
    console.log(straights);
    betStatus("straight");
}


function splitBet(element) {
    betStatus("split");
}

function horizontalSplitBet(element) {
    selected = parseInt(element.innerHTML[0]);
    horizontalSplits[selected - 1] = selected;
}

function verticalSplitBet(element) {
    selected = parseInt(element.innerHTML[0]);
    verticalSplits[selected - 1] = selected;
    betStatus("split");
}


function lowerRangeBet() {
    outsides[0]++;
    console.log(outsides);
    betStatus("lower");
}

function upperRangeBet() {
    outsides[5]++;
    console.log(outsides);
    betStatus("upper");
}

function evenBet() {
    outsides[1]++;
    console.log(outsides);
    betStatus("even");
}

function oddBet() {
    outsides[4]++;
    console.log(outsides);
    betStatus("odd");
}

function redBet() {
    outsides[2]++;
    console.log(outsides);
    betStatus("red");
}

function blackBet() {
    outsides[3]++;
    console.log(outsides);
    betStatus("black");
}

function checkStraightBet(playerObj, result) {
    console.log("spinnning result : ", result);
    if (parseInt(result) == currBet) {
        score = 35 * coinValue;
        document.getElementById("final-value").innerHTML = `you won the bet`;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet";
    }
}

function checkSplitBet(playerObj, result) {
    console.log("spinnning result : ", result);
    if (parseInt(result) == splitBet[0] || parseInt(result) == splitBet[1]) {
        score = 17 * coinValue;
        document.getElementById("final-value").innerHTML = `you won the bet`;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet";
    }
}

function checkOddBet(playerObj, result) {
    console.log("spinnning result : ", result);
    if (result % 2) {
        score = coinValue;
        document.getElementById("final-value").innerHTML = `you won the bet`;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet";
    }
}

function checkLower(playerObj, result) {
    console.log("spinnning result : ", result);
    res = parseInt(result);
    if (res >= 1 && res <= 18) {
        score = coinValue;
        document.getElementById("final-value").innerHTML = `you won the bet`;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet";
    }
}

function checkUpper(playerObj, result) {
    console.log("spinnning result : ", result);
    res = parseInt(result);
    if (res >= 19 && res <= 36) {
        score = coinValue;
        document.getElementById("final-value").innerHTML = `you won the bet`;
    } else {
        score = Math.max(0, score - coinValue);
        document.getElementById("final-value").innerHTML = "you lost the bet";
    }
}

function checkEvenBet(playerObj, result) {
    console.log("spinnning result : ", result);
    if (!(result % 2)) {
        score = coinValue;
        // document.getElementById("final-value").innerHTML = `you won the bet`;
    } else {
        score = Math.max(0, score - coinValue);
        // document.getElementById("final-value").innerHTML = "you lost the bet";
    }
}


function playerTurn(playerObj, callback) {
    console.log("Current player : " + playerObj.id);

    const betEvent = (event) => {
        playerObj.currentBetType = event.detail;
        console.log("Current player bet type : " + playerObj.currentBetType);

        document.removeEventListener('betDeclared', betEvent);
    }
    const spinEvent = (event) => {
        var res = event.detail;
        switch (playerObj.currentBetType) {
            case 'straight':
                checkStraightBet(playerObj, res);
                break;
            case 'split':
                checkSplitBet(playerObj, res);
                break;
            case 'even':
                checkEvenBet(playerObj, res);
                break;
            case 'odd':
                checkOddBet(playerObj, res);
                break;
            case 'upper':
                checkUpper(playerObj, res);
                break;
            case 'lower':
                checkLower(playerObj, res);
                break;
        }
        document.removeEventListener('spinCompleted', spinEvent);
        scoreStatus(score);
    }

    const scoreUpdate = (event) => {
        playerObj.score += parseInt(score);
        console.log("Current player score : " + playerObj.score);

        document.removeEventListener('playerScore', scoreUpdate);
        callback();
    }

    document.addEventListener('betDeclared', betEvent);
    document.addEventListener('spinCompleted', spinEvent);
    document.addEventListener('playerScore', scoreUpdate);
}

function playGame() {
    playerTurn(player1, function() {
        playerTurn(player2, function() {
            playerTurn(player3, function() {
                playerTurn(player4, function() {
                    console.log("round over");
                })
            })
        })
    })
}

document.addEventListener("DOMContentLoaded", function() {
    playGame();
});