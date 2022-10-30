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

class Board extends React.Component {
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

        if (gameState(newSquares) == 'X' || gameState(newSquares) == 'O' || newSquares[index]) {
            return;
        }

        newSquares[index] = this.state.xTurn ? 'X' : 'O';
        this.setState({
            squares : newSquares,
            xTurn : !this.state.xTurn,
        });

        // Update score
        if (gameState(newSquares) == 'X') {

            // #d VIET THỬ MODAL TẠI ĐÂY, APPEND CÁI MODAL ĐÓ VÀO BOARD
            // #D RESET GAME THỬ BẰNG CÁCH SET ALL this.state.squares về null



            // #d Phần này sẽ tách ra viết 1 hàm riêng là Update game
            // #d Trong đó sẽ chạy hàm riêng là Reset game
            // #d Hàm Resetgame sẽ là 1 cái modal hiện ở giữa cái Board và khi bấm vào sẽ set all to null
            this.setState({
                score1 : this.state.score1 + 1,
                xGoFirst : true,
            });
        } else if (gameState(newSquares) == 'O') {
            this.setState({
                score2 : this.state.score2 + 1,
                xGoFirst : false,
            });
        }
    }

    render() {
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
                default:
                    console.error("Game status error");
                    break;
            }
        } else {
            status = (this.state.xTurn ? 'X' : 'O') + "'s turn";
        }
        // console.log(this.state)
        
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

class Footer extends React.Component {
    render() {
        return (
            <div className="row no-gutters">
                <div id="footer" className="col">
                    <h1>THIS IS FOOTER</h1>
                </div>
            </div>
        )
    }
}


const App = (
    <React.Fragment>
        <Header/>
        <Board/>
        {/* <Footer/> */}
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
        }
    })
    
    if (!result) {
        let notFull = squares.some((value)=>{
            return (value == null);
        })
        if (!notFull) {
            result = 'D';
        }
    }

    return result;
}


///// todo 1. Win Logic
// Fix UI :
////    Background, Theme
////    Player score 
//    - Modal result
//    - Responsive

// todo 3. Change color the win line
// todo 5. Local storage score

