import React from 'react';
import Board from "./Board";

export default class TicTacToe extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [
                { squares: Array(9).fill(null) }
            ],
            xIsNext: true,
        }
    }

    handleClick(i){
        const { history, xIsNext } = this.state;
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) return;

        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !xIsNext
        });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for(let i=0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    }

    renderStatus(){
        const { history } = this.state;
        const current = history[history.length-1];
        const winner = this.calculateWinner(current.squares);
        if(winner) return <div>Winner: {winner}</div>;

        return <div>{winner ? 'Winner:' : 'Next move:'} { winner || this.state.xIsNext}</div>
    }

    render() {
        const { history } = this.state;
        const current = history[history.length-1];
        return <>
            {this.renderStatus()}
            <Board
                squares={current.squares}
                onClick={(i)=>this.handleClick(i)}
            />
        </>;
    }
}
