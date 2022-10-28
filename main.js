
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
        }
    }

    handleClick(index) {
        let newSquares = [...this.state.squares];

        if (winGame(newSquares) || newSquares[index]) {
            return;
        }

        newSquares[index] = this.state.xTurn ? 'X' : 'O';
        this.setState({
            squares : newSquares,
            xTurn : !this.state.xTurn,
        });

    }

    render() {
        let gameStatus = winGame(this.state.squares);
        let status;
        if (gameStatus) {
            if (gameStatus == 'Draw') {
                status = 'Draw';
            } else {
                status = 'Winner : ' + gameStatus;
            }
        } else {
            status = 'Turn : ' + (this.state.xTurn ? 'X' : 'O');
        }
        
        return (
            <React.Fragment>
                <div className="row no-gutters">
                    <div id="status" className="col">
                        <p>{status}</p>
                    </div>
                </div>

                <div className="row no-gutters">
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
                {props.value}
            </button>
        </div>
    );
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

class App extends React.Component {
    render () {
        return(
            <React.Fragment>
                <Header/>
                <Board/>
                <Footer/>
            </React.Fragment>
        )
    };
}

ReactDOM.render(<App/>, root)


// #d ===========================================

function winGame(squares) {
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
        }
    })
    
    if (!result) {
        let notFull = squares.some((value)=>{
            return (value == null);
        })
        if (!notFull) {
            result = 'Draw';
        }
    }

    return result;
}

///// todo 1. Win Logic
// Fix UI :
//    - Background, Theme
//    - Player score 
//    - Modal result
//    - Responsive

// todo 3. Change color the win line
// todo 5. Local storage score

