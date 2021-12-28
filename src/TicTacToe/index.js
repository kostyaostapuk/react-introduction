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
            stepNumber: 0,
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
            xIsNext: !xIsNext,
            stepNumber: history.length
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
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return [a,b,c];
            }
        }
        return null;
    }

    renderStatus(){
        const { history, stepNumber } = this.state;
        const current = history[history.length-1];

        if(stepNumber === 9 && !this.calculateWinner(current.squares)){
            return <div>Draw!</div>
        }

        const winnerSquares = this.calculateWinner(current.squares);
        let status;
        if (!winnerSquares) {
            status = `Next move: ${ this.state.xIsNext ? 'X' : 'O'}`;
        } else {
            status = `Winner: ${current.squares[winnerSquares[0]]}`;
        }
        return <div>{status}</div>

    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
    renderHistory(){
        const { history } = this.state;
        return <ol>{
            history.map((_, step)=>{
                const desc = step ? 'Jump to step #' + step : 'To start game';
                return <li key={step}><button onClick={()=>this.jumpTo(step)}>{desc}</button></li>;
            })
        }</ol>;
    }

    render() {
        const { history, stepNumber } = this.state;
        const current = history[stepNumber];
        return <>
            {this.renderStatus()}
            <Board
                squares={current.squares}
                winnerSquares={this.calculateWinner(current.squares)}
                onClick={(i)=>this.handleClick(i)}
            />

            {this.renderHistory()}
        </>;
    }
}
