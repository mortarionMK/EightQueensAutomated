/**
 * Eight Queens chess game
 * Status box
 */
import React, { Component } from "react";
import "./css/Status.css";

class Status extends Component {
  render() {
    const numberQueensNeeded = 8 - this.props.queensOnBoard;
    let gameStatus = numberQueensNeeded + " Queen";
    if (numberQueensNeeded > 1) {
      gameStatus += "s";
    }
    gameStatus += " needed";

    let statusClass = "EightQueens-playing";

    if (!numberQueensNeeded) {
      gameStatus = "Building Solutions";
      statusClass = "EightQueens-not";
    }

    if (this.props.queensOnBoard === 8 && this.props.queensUnderAttack === 0) {
      gameStatus = "Computer Solution Resolved";
      statusClass = "EightQueens-win";
    }

    return (
      <div className="EightQueens-status">
        <b>{this.props.queensOnBoard}</b> Queens on board
        <br />
        <b>{this.props.queensUnderAttack}</b> Queens attacked
        <br />
        <div className={statusClass}>{gameStatus}</div>
      </div>
    );
  }
}

export default Status;
