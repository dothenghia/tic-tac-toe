
import './player.scss'

const Player = ({ role, score }) => {
    return (
        <div id={`player${role}`} className="player">
            <h1>Player {role}</h1>
            <p id={`score${role}`}>{ score}</p>
        </div>
    );
};

export default Player;
