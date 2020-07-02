const squares = document.getElementsByClassName('column');
let container = document.getElementById('container');
let body = document.querySelector('body');

let turn = 0;
let hasWinner = false;

let squareArr = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

Array.from(squares).forEach(square => {
let col, row;
    square.addEventListener('click', (e) => {
        column = e.target.id;
        row = e.target.parentNode.id;
        if (e.target.innerText === "" && !hasWinner) {
            e.target.innerText = turn % 2 === 0 ? 'X' : 'O';
            squareArr[row-1][column-1] = turn % 2 === 0? 'X' : 'O';
            turn++;
            if (turn === 9) {
                document.getElementById('winner').innerText = "Tie";
            }
            verifyColumn(row, column, e.target.innerText);
            verifyRow(row, column, e.target.innerText);
            verify(row, column, e.target.innerText);
        }
    });
});

const verifyColumn = (row, column, mark) => {
   if(squareArr[row-1][0] === mark && squareArr[row-1][1] === mark && squareArr[row-1][2] == mark) {
       winner(mark);
   }
}

const verifyRow = (row, column, mark) => {
    if(squareArr[0][column-1] === mark && squareArr[1][column-1] === mark && squareArr[2][column-1] == mark) {
        winner(mark);
    }
 }

const verify = (row, column, mark) => {
    if ((squareArr[0][0] === mark && squareArr[1][1] === mark && squareArr[2][2] == mark)||
    squareArr[0][2] === mark && squareArr[1][1] === mark && squareArr[2][0] == mark)
        {
            winner(mark);
        }
    }

const winner = (mark) => {
    container.classList.add('finish');
    hasWinner = true;
    document.getElementById('winner').innerText = "Winner: " + mark;
}

const reset = () => {
    squareArr.length = 0;
    location.reload(true);
}