
import './App.css';
import Header from './components/Header/Header'
import Game from './components/Game/Game'

const App = () => {
    return (
        <div id='app' className='container'>
            <Header/>
            <Game/>
        </div>
    );
};

export default App;
