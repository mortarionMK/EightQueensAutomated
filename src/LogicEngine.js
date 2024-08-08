import * as attack from "./UnderAttack.js";
let row = [1,2,3,4,5,6,7,8];
let column = 'abcdefgh'.split('');
let pos = []
const N = 8;
let board = new Array(N).fill().map(() => new Array(N).fill(0));

export function placeQueen(square, position1) {
    row.forEach(number => {
        column.forEach(element => {
            pos += element + number
        });
    });

    // console.log(pos)

    let position = position1; // Get the current board position
    if (position[[square]]) {
      delete position[[square]]; // Clicked on a Queen, delete it
    } else {
      if (Object.keys(position).length === 8) {
        return; // Max 8 queens on board
      }
      position[[square]] = "wQ"; // Clicked on an empty square, add a Queen
    }

    const attacked = attack.underAttack(position); // get array of Queens under attack

    Object.keys(position).forEach(function (square) {
      // For each queen on board
      if (attacked.includes(square) && square !== "bQ") {
        // if Queen is under attack
        position[square] = "bQ"; // Flip Queen under attack
      } else if (square !== "wQ") {
        // If Queen is no longer under attack
        position[square] = "wQ"; // Queen at peace
      }
    });

    let queensOnBoard = Object.keys(position).length;
    let queensUnderAttack = 0;
    if (attacked) {
      queensUnderAttack = attacked.length;
    }
    let gameStatus = "playing";
    if (queensOnBoard === 8 && queensUnderAttack === 0) {
      gameStatus = "solved";
    }

    return{
        attacked: attacked,
        position: position,
        queensOnBoard: queensOnBoard,
        queensUnderAttack: queensUnderAttack,
        attackedSquares: attack.attackedSquares(position),
        gameStatus: gameStatus,
    }
  };


export function generateSolution(){
    return solveNQ();
}

// Function to check if a queen can be placed on board[row][col]
function isSafe(board, row, col) {
    let i, j;

    // Check the column on the left
    for (i = 0; i < col; i++) {
        if (board[row][i]) return false;
    }

    // Check upper diagonal on the left
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }

    // Check lower diagonal on the left
    for (i = row, j = col; j >= 0 && i < N; i++, j--) {
        if (board[i][j]) return false;
    }

    // The position is safe for placing a queen
    return true;
    }

// Function to solve the N Queen problem using the backtracking approach
function solveNQ() {
    if (!solveNQUtil(board, 0)) {
        return console.error('Failed to find valid solution');
        ;
    }
    console.log(board + 'soltion!!!');
    return board;
}

// Recursive utility function to solve N Queen problem
function solveNQUtil(board, col) {
    // Base case: If all queens are placed, return true
    if (col >= N) return board;

    // Consider this column and try placing this queen in all rows one by one
    for (let i = 0; i < N; i++) {
        // Check if the queen can be placed on board[i][col]
        if (isSafe(board, i, col)) {
        // Place this queen in board[i][col]
        board[i][col] = 1;

        // Recur to place the rest of the queens
        if (solveNQUtil(board, col + 1)) return board;

        // If placing queen in board[i][col] doesn't lead to a solution, then backtrack
        board[i][col] = 0;
        }
    }
}
