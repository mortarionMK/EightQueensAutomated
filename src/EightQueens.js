/**
 * Eight Queens chess game
 */

import "./css/EightQueens.css";
import * as attack from "./UnderAttack.js";
import * as helpers from "./helpers.js";
import Chessboard from "chessboardjsx";
import queenUnderAttackSvg from "./queenUnderAttack.svg";
import React, { Component } from "react";
import Status from "./Status.js";
import Title from "./Title.js";
import { placeQueen, generateSolution } from "./LogicEngine.js";

const gameName = "Eight Queens Solver";
const gameVersion = "0.0.1";
const gameHome = "https://github.com/attogram/EightQueens";
let numberSolvedID = "EightQueensSolve";

class EightQueens extends Component {
  /**
   * @param props
   */
  constructor(props) {
    super(props);
    this.listOfSquares = generateSolution();
    this.state = {
      attacked: [], // Array of queens under attack
      position: {}, // Object of current board position
      gameStatus: "playing",
      queensOnBoard: 0,
      queensUnderAttack: 0,
      showAttackPaths: true,
      attackedSquares: 0,
    };

    //this.onSquareClick = this.onSquareClick.bind(this);
    this.toggleAttackPaths = this.toggleAttackPaths.bind(this);
  }

  /**
   * Player clicked on the chessboard
   *
   * @param square
   */
  // onSquareClick = (square) => {
  //   let position = this.state.position; // Get the current board position
  //   console.log(position);
  //   if (position[[square]]) {
  //     delete position[[square]]; // Clicked on a Queen, delete it
  //   } else {
  //     if (Object.keys(position).length === 8) {
  //       return; // Max 8 queens on board
  //     }
  //     position[[square]] = "wQ"; // Clicked on an empty square, add a Queen
  //   }

  //   const attacked = attack.underAttack(position); // get array of Queens under attack

  //   Object.keys(position).forEach(function (square) {
  //     // For each queen on board
  //     if (attacked.includes(square) && square !== "bQ") {
  //       // if Queen is under attack
  //       position[square] = "bQ"; // Flip Queen under attack
  //     } else if (square !== "wQ") {
  //       // If Queen is no longer under attack
  //       position[square] = "wQ"; // Queen at peace
  //     }
  //   });

  //   let queensOnBoard = Object.keys(position).length;
  //   let queensUnderAttack = 0;
  //   if (attacked) {
  //     queensUnderAttack = attacked.length;
  //   }
  //   let gameStatus = "playing";
  //   if (queensOnBoard === 8 && queensUnderAttack === 0) {
  //     gameStatus = "solved";
  //   }

  //   this.setState({
  //     attacked: attacked,
  //     position: position,
  //     queensOnBoard: queensOnBoard,
  //     queensUnderAttack: queensUnderAttack,
  //     attackedSquares: attack.attackedSquares(position),
  //     gameStatus: gameStatus,
  //   });
  // };

  /**
   * Play clicked the Attack Paths button
   */
  toggleAttackPaths() {
    const showAttackPaths = !this.state.showAttackPaths;
    let attackedSquares = this.state.attackedSquares;
    if (!showAttackPaths) {
      attackedSquares = attack.attackedSquares(this.state.position);
    }
    this.setState({
      showAttackPaths: showAttackPaths,
      attackedSquares: attackedSquares,
    });
  }

  /**
   * @returns {*}
   */
  render() {
    // force board refresh by using FEN string in _position_ and _key_ Chessboard props
    const fenPosition = helpers.objToFen(this.state.position);
    // setTimeout(() => {
      if(this.listOfSquares.length !== 0) {
        this.setState(placeQueen(this.listOfSquares.pop(), this.state.position));
      }
    // }, 1000);

    // Highlight squares under attack
    let squareStyles = {};
    if (this.state.showAttackPaths) {
      if (this.state.attackedSquares.length) {
        this.state.attackedSquares.forEach(function (square) {
          squareStyles[square] = {
            background: "radial-gradient(circle, red, transparent 100%)",
          };
        });
      }
    }

    return (
      <div className="EightQueens">
        <div className="EightQueens-header">
          <Title
            gameName={gameName}
            gameHome={gameHome}
            gameVersion={gameVersion}
          />
          <Status
            queensOnBoard={this.state.queensOnBoard}
            queensUnderAttack={this.state.queensUnderAttack}
          />
        </div>
        <Chessboard
          id={numberSolvedID}
          position={fenPosition}
          key={fenPosition}
          sparePieces={false}
          draggable={false}
          calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
          onSquareClick={this.onSquareClick}
          squareStyles={squareStyles}
          pieces={{
            bQ: ({ squareWidth, isDragging }) => (
              <img
                style={{
                  width: isDragging ? squareWidth * 1.75 : squareWidth,
                  height: isDragging ? squareWidth * 1.75 : squareWidth,
                }}
                src={queenUnderAttackSvg}
                alt={"Under Attack"}
              />
            ),
          }}
        />
      </div>
    );
  }
}

export default EightQueens;
