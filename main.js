let root = document.getElementById('root');

class Header extends React.Component {
    render() {
        return (
            <div className="row no-gutters">
                <div id="header" className="col">
                    <h1>HEADER</h1>
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
        }
    }

    handleClick(index) {
        let newSquares = [...this.state.squares];
        newSquares[index] = 'A';
        this.setState({squares : newSquares});
    }

    render() {
        let turn = 'Turn : A';
        
        return (
            <React.Fragment>
                <div class="row no-gutters">
                    <div id="status" class="col">
                        <p>{turn}</p>
                    </div>
                </div>

                <div class="row no-gutters">
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

const App = (
    <React.Fragment>
        <Header/>
        <Board/>
        <Footer/>
    </React.Fragment>
)

ReactDOM.render(App, root)



