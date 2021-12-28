import React from 'react';
import './index.css';
import Square from "../Square";

export default class Board extends React.Component {
    constructor() {
        super();
    }
    renderSquare(i){
        return  <Square isWinner={this.isWinnerSquare(i)} value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>
    }
    isWinnerSquare(i){
        const { winnerSquares } = this.props;
        if(!winnerSquares) return false;

        return winnerSquares.some(square=> square === i);
    }
    render() {
        return <div className="board">
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>

            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>

            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
    }
}
