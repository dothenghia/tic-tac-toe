let root = document.getElementById('root');

class Header extends React.Component {
    render() {
        return (
            <div className="row no-gutters">
                <div id="header" className="col">
                    <p>Tic Tac Toe</p>
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares : Array(9).fill(null),
            xTurn : true,
            xGoFirst : true,
            score1 : 0,
            score2 : 0,
        }
    }

    handleClick(index) {
        let newSquares = [...this.state.squares];

        // Anti-click when the square is marked OR the game is finished
        if (gameState(newSquares) == 'X' || gameState(newSquares) == 'O' || gameState(newSquares) == 'D' || newSquares[index]) {
            return;
        }

        // Set new Squares
        newSquares[index] = this.state.xTurn ? 'X' : 'O';
        this.setState({
            squares : newSquares,
            xTurn : !this.state.xTurn,
        });

        // Update score
        if (gameState(newSquares) == 'X') {
            this.setState({
                score1 : this.state.score1 + 1,
                xGoFirst : true,
                xTurn : true,
            });
        } else if (gameState(newSquares) == 'O') {
            this.setState({
                score2 : this.state.score2 + 1,
                xGoFirst : false,
                xTurn : false,
            });
        } else if (gameState(newSquares) == 'D') {
            this.setState({
                score1 : this.state.score1 + 1,
                score2 : this.state.score2 + 1,
                xTurn : this.state.xGoFirst,
            });
        }
    }
    
    resetGame() {
        // Set the squares in state to null
        let resetSquare = Array(9).fill(null);
        this.setState({
            squares : resetSquare,
        });

        // Change squares to normal color and hide the Reset button
        let squareCollection = document.getElementsByClassName('square');
        for (let i = 0; i < 9; i++) {
            squareCollection[i].style.backgroundColor = "transparent";
        }
        let resetBtn = document.querySelector('#footer');
        resetBtn.style.display = "none";
    }

    render() {
        // Set Status bar
        let gameStatus = gameState(this.state.squares, this.state.xGoFirst);
        let status;
        if (gameStatus) {
            switch (gameStatus) {
                case 1:
                    status = 'X go first';
                    break;
                case 2:
                    status = 'O go first';
                    break;
                case 'X':
                    status = 'X win';
                    break;
                case 'O':
                    status = 'O win';
                    break;
                case 'D':
                    status = 'Draw';
                    break;
                default:
                    console.error("Game status error");
                    break;
            }
        } else {
            status = (this.state.xTurn ? 'X' : 'O') + "'s turn";
        }

        return (
            <React.Fragment>
                <div className="row no-gutters">
                    <div id="status" className="col">
                        <p>{status}</p>
                    </div>
                </div>


                <div className="row no-gutters game">
                    <div id="player1" className="player">
                        <h3>Player X</h3>
                        <p id="score1">{this.state.score1}</p>
                    </div>

                    <div id="board">
                        {
                            this.state.squares.map((value, index)=>{
                                return <Square
                                            value = {value}
                                            onClick = {() => this.handleClick(index)}
                                        />
                            })
                        }
                    </div>

                    <div id="player2" className="player">
                        <h3>Player O</h3>
                        <p id="score2">{this.state.score2}</p>
                    </div>
                </div>

                <div className="row no-gutters">
                    <div id="footer" className="col">
                        <button 
                            className="button reset"
                            onClick={()=>{this.resetGame()}}>
                            <img src="./assets/image/reset.png" alt=""/>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function Square(props) {
    return (
        <div className="col">
            <button 
                className="square" 
                onClick={props.onClick}>
                {imgXO(props.value)}
            </button>
        </div>
    );
}

function imgXO(value) {
    if (!value) {
        return;
    }
    let source = "./assets/image/" + value + ".png";
    return (
        <img className={value} src={source} alt=""></img>
    )
}


const App = (
    <React.Fragment>
        <Header/>
        <Game/>
    </React.Fragment>
)

ReactDOM.render(App, root)

// #d ===========================================

/*  If return
    - 1 => X go first
    - 2 => O go first
    - 'X' => X win
    - 'O' => O win
    - 'D' => Draw
    - null => Continue
*/
function gameState(squares, xGoFirst) {
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
            let squareA = document.querySelector('#board .col:nth-child(' + (a+1) + ') .square');
            let squareB = document.querySelector('#board .col:nth-child(' + (b+1) + ') .square');
            let squareC = document.querySelector('#board .col:nth-child(' + (c+1) + ') .square');
            squareA.style.backgroundColor = "#123c53";
            squareB.style.backgroundColor = "#123c53";
            squareC.style.backgroundColor = "#123c53";

            let resetBtn = document.querySelector('#footer');
            resetBtn.style.display = "flex";
        }
    })
    
    if (!result) {
        let notFull = squares.some((value)=>{
            return (value == null);
        })
        if (!notFull) {
            result = 'D';

            let resetBtn = document.querySelector('#footer');
            resetBtn.style.display = "flex";
        }
    }

    return result;
}


///// todo 1. Win Logic
// Fix UI :
////    Background, Theme
////    Player score 
////    Modal result
//    - Responsive
////    Change color the win line

