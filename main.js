let root = document.getElementById('root');

let squareValue = [
    1, 2, 3,
    4, 5, 6,
    8, 10, 12
]

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
    // renderSquare(i) {
    //     return (
    //         <Square 
    //             value={i}
    //         />
    //     )
    // }
    render() {
        return (
            <div class="row no-gutters">
                <div id="board">
                    {
                        squareValue.map((value)=>{
                            return <Square
                                        value = {value}
                                    />
                        })
                    }
                </div>
            </div>
        )
    }
}

class Square extends React.Component { // Nhan props tu Board
    constructor(props) {
        super(props);
        this.state = {
            value : null,
        }
    }

    render() {
        return (
            <div className="col">
                <button 
                    className="square" 
                    onClick={()=>{
                        this.setState({value : 'X'})
                    }}>
                    {this.state.value} 
                </button>
            </div>
        )
    }
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



