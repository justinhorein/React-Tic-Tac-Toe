import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

library.add(faSun, faMoon)

function SunMoon(props) {

    return(
          <FontAwesomeIcon icon={props.value} className="icon" size="2x" color={props.color}></FontAwesomeIcon>
    )
} 
class DayNight extends React.Component {
      constructor() {
        super()
        this.state = {          
          sunmoon: faSun,
          color: "black"
        };
      }

    switch() {
      // Toggle Page
      let body = document.querySelector("body");
      let reset = document.querySelector(".ResetGame");
      let dn = document.querySelector(".DayNight");
      let game = document.querySelector(".game-info");
      
      body.classList.toggle("bw");
      reset.classList.toggle("wb");
      dn.classList.toggle("wb");
      game.classList.toggle("border");

      // Toggle Icon
      let c = document.querySelector("body")

      if (c.classList[0] === "bw"){
        // re-render SunMoon
        this.setState({sunmoon:faMoon, color: "white"})
      } else {
        this.setState({sunmoon:faSun, color: "black"})
      }
    }

    render (v){
      // Render initial Icon
      return(
      <button className="DayNight" onClick={() => this.switch()}>
        <SunMoon value={this.state.sunmoon} color={this.state.color}/>
      </button>
      )
    }
}

function ResetGame(props) {

  return (
    <button className="ResetGame" onClick={props.onClick}>
      Reset
    </button>
  )
  }


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} 
      />
      );
  }

  render() {

    return (
      <div>
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
    );
  }
}

class Game extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
  };
}

  handleClick(i) {
    const history = this.state.history.slice(0,
  this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  clear() {
    this.setState({
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
  });

    // Update UI

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <span>
        <div className="heading">
          <h1>Tic-Tac-Toe</h1>
          <ResetGame onClick={() => this.clear()}
          />     
          <DayNight></DayNight>
        </div>

        <div className="game">
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{moves}</ol>
          </div>
          
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
        </div>
      </span>
    );
  }
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 9],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return 'Winner: ' + squares[a];
    }
  }
  if (squares[0] && squares[1] && squares[2] && squares[3] && squares[4] &&
   squares[5] && squares[6] && squares[7] && squares[8]){
    return "It's a Tie";
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
