import { useState, useEffect } from 'react'

import './game.css'
import Board from '../Board/Board'
import Player from '../Player/Player'
import ResetButton from '../ResetButton/ResetButton'

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xTurn, setXTurn] = useState(true)
    const [xGoFirst, setXGoFirst] = useState(true)
    const [scoreX, setScoreX] = useState(0)
    const [scoreO, setScoreO] = useState(0)
    const [status, setStatus] = useState('')

    useEffect(() => {
        // Set Status
        let gameStatus = checkState(squares, xGoFirst);
        switch (gameStatus) {
            case 1:
                setStatus('X go first');
                break;
            case 2:
                setStatus('O go first');
                break;
            case 'X':
                setStatus('X win');
                break;
            case 'O':
                setStatus('O win');
                break;
            case 'D':
                setStatus('Draw');
                break;
            case null:
                let temp = (xTurn ? 'X' : 'O') + "'s turn";
                setStatus(temp) ;
                break;
            default:
                console.error("Game status error");
                break;
        }
    }, [squares])

    // Handle event when a square is clicked
    const handleClick = (index) => {
        let newSquares = [...squares]

        // Anti-click when the square is marked OR the game is finished
        let gameState = checkState(newSquares);
        if (gameState == 'X' || gameState == 'O' || gameState == 'D' || newSquares[index]) {
            return;
        }

        // Set new Squares
        newSquares[index] = (xTurn ? 'X' : 'O')
        
        setSquares(newSquares)
        setXTurn(!xTurn)
        
        // Update score
        if (checkState(newSquares) == 'X') {
            setScoreX(scoreX+1)
            setXGoFirst(true)
            setXTurn(true)
        } else if (checkState(newSquares) == 'O') {
            setScoreO(scoreO+1)
            setXGoFirst(false)
            setXTurn(false)
        } else if (checkState(newSquares) == 'D') {
            setScoreX(scoreX+1)
            setScoreO(scoreO+1)
            setXTurn(xGoFirst)
        }
    }

    // Check the status of game
    const checkState = (squares, xGoFirst) => {
        /*  If return
            - 1 => X go first
            - 2 => O go first
            - 'X' => X win
            - 'O' => O win
            - 'D' => Draw
            - null => Continue
        */

        // Check who Go first
        let isBegin = squares.every((value)=>{
            return (value == null);
        })
        if (isBegin && xGoFirst) {
            return 1;
        } else if (isBegin && !xGoFirst) {
            return 2;
        }

        // Check who Win
        let result = null;
        
        let winLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        winLines.forEach((line)=>{
            let [a, b, c] = line; // Get values by Destructuring
            if ((squares[a]) && (squares[a] == squares[b]) && (squares[b] == squares[c])) {
                result = squares[a];
                
                // Set Color of win line
                let squareA = document.querySelector(`.square:nth-child(${a+1})`);
                let squareB = document.querySelector(`.square:nth-child(${b+1})`);
                let squareC = document.querySelector(`.square:nth-child(${c+1})`);
                squareA.classList.add('win');
                squareB.classList.add('win');
                squareC.classList.add('win');

                let resetBtn = document.querySelector('#reset');
                resetBtn.classList.add('show');
            }
        })
        
        if (!result) {
            let notFull = squares.some((value)=>{
                return (value == null);
            })
            if (!notFull) {
                result = 'D';

                let resetBtn = document.querySelector('#reset');
                resetBtn.classList.add('show');
            }
        }

        return result;
    }

    const resetGame = () => {
        // Set the squares in state to null
        setSquares(Array(9).fill(null))

        // Change squares to normal color and hide the Reset button
        let winSquares = document.querySelectorAll('.win');
        for (const winSquare of winSquares) {
            winSquare.classList.remove('win');
        }
        
        let resetBtn = document.querySelector('#reset');
        resetBtn.classList.remove('show');
    }
    

    return (
        <div id='game'>            
            <div id="status">
                <p>{status}</p>
            </div>

            <div className='play-section mx-auto mx-md-0 mx-lg-5'>
                <Player 
                    role='X'
                    score={scoreX}
                />
                <Board
                    squares={squares}
                    handleClick={handleClick}
                />
                <Player
                    role='O'
                    score={scoreO}
                />
            </div>

            <ResetButton resetClick={resetGame}/>
        </div>
    );
};

export default Game;
