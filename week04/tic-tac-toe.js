
var cell = [
    "", "", "", "", "", "", "", "", ""
];

var winSigns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

var gameNum = 1;
var p1Wins = 0;
var p2Wins = 0;
var lastWin = p1;
var gameActive = true;
var gameType = "new"
var p1, p2, playerSymbol = "O";

//Player 1 selects symbol
document.getElementByID("button.id").addEventListener("touchend", selectSymbol());
//document.getElementById("p0").addEventListener("click", mark("p0", playerSymbol());
document.getElementByID("resetButton").addEventListener("touchend", reset());

//Declare the player's symbol
function selectSymbol() {
    if (gameType == "new") {
        p1 = document.getElementById("player1").value;
        p2 = document.getElementById("player2").value;

        if (p1 == "O") {
            p1 = "X"
            p2 = "O";
        } else if (p1 == "X") {
            p1 = "O";
            p2 = "X";
        }
 
        document.getElementById("player1").value = p1;
        document.getElementById("player1").innerHTML = p1;
        document.getElementById("player2").value = p2;
        document.getElementById("player2").innerHTML = p2;
    }
    playerSymbol = p1;
}


//Player function to mark the cell
function markCell(id) {
    gameType = "old";
    if (gameActive == true) {
         if (document.getElementById("p1Label").style.getPropertyValue("font-weight") == "900") {
            document.getElementById("msg").innerHTML = "Turn: Player 2";
        } else {
            document.getElementById("msg").innerHTML = "Turn: Player 1";
        }

        if (document.getElementById(id).innerHTML == "") {
            if (document.getElementById("p1Label").style.getPropertyValue("font-weight") == "900") {
            document.getElementById("p2Label").style.fontWeight = "900";
            document.getElementById("player2").style.fontWeight = "600";
            document.getElementById("p1Label").style.fontWeight = "normal";
            document.getElementById("player1").style.fontWeight = "normal";
        } else {
            document.getElementById("p1Label").style.fontWeight = "900";
            document.getElementById("player1").style.fontWeight = "600";
            document.getElementById("p2Label").style.fontWeight = "normal";
            document.getElementById("player2").style.fontWeight = "normal";
        }
            document.getElementById(id).innerHTML = playerSymbol;
            mark(id, playerSymbol);
            checkWinner(playerSymbol);
        }
        //Swich player symbol
        if (playerSymbol == "O") {
            playerSymbol = "X";
        } else {
            playerSymbol = "O";
        }
        document.getElementById("topMsg").innerHTML = "Game " + gameNum;
    }
}


//Player marks the cell
function mark(tdId, cellSymbol) {
    var cellIdx = tdId.charAt(1);
    if (document.getElementById(cell[cellIdx]) !== "") {
        cell[cellIdx] = cellSymbol;
        document.getElementById(tdId).innerHTML = playerSymbol;
    }
}
    

//Check the Winner
function checkWinner(symbol) {
    for (i in winSigns) {
        if (cell[winSigns[i][0]] == symbol &&
            cell[winSigns[i][1]] == symbol &&
            cell[winSigns[i][2]] == symbol) {
            if (symbol == document.getElementById("player1").innerHTML) {
                ++p1Wins;
                gameActive = false;
                document.getElementById("msg").style.color = "red";
                document.getElementById("p2Label").style.fontWeight = "900";
                document.getElementById("player2").style.fontWeight = "600";
                document.getElementById("msg").innerHTML = "Player 1 won the game!";
                document.getElementById("p1Score").innerHTML = p1Wins + " WINS";
                document.getElementById("p1Score").style.color = "red";
                lastWin = "p1";
            } else {
                ++p2Wins;
                gameActive = false;
                document.getElementById("msg").style.color = "red";
                document.getElementById("p1Label").style.fontWeight = "900";
                document.getElementById("player1").style.fontWeight = "600";
                document.getElementById("msg").innerHTML = "Player 2 won the game!";
                document.getElementById("p2Score").innerHTML = p2Wins + " WINS";
                document.getElementById("p2Score").style.color = "red";
                lastWin = "p2";
            }
            //document.getElementById("msg").innerHTML = "Winner marks is: " + symbol;   //control

            var winMarks = winSigns[i];
            for (j in winMarks) {
                inx = "p" + winMarks[j];
                document.getElementById(inx).style.color = "red";
            }
            
            //switchSymbol();
        }
    }
    return playerSymbol;
}


//Reset the game
function reset() {
    if (gameActive == false) {
        gameNum++;
    }
    document.getElementById("topMsg").innerHTML = "Game " + gameNum;
    for (i = 0; i < 10; i++) {
        cellIdx = "p" + i;
        cell[i] = "";
        gameActive = true;
        document.getElementById(cellIdx).innerHTML = "";
        document.getElementById(cellIdx).style.color = "black";
        document.getElementById("p1Score").style.color = "blue";
        document.getElementById("p2Score").style.color = "blue";
        document.getElementById("msg").style.color = "black";
        if (lastWin == "p1") {
            document.getElementById("msg").innerHTML = "Player 2 starts the new game first.";
        } else {
            document.getElementById("msg").innerHTML = "Player 1 starts the new game first.";
        }

    };

}