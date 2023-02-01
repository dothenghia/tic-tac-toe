
import './board.scss'
import X from '../../assets/image/X.png'
import O from '../../assets/image/O.png'

const ImageXO = ({ value }) => {
    if (!value) {
        return;
    }
    else if (value == 'X') {
        return (
            <img className={value} src={X} alt={value}></img>
        )
    }
    return (
        <img className={value} src={O} alt={value}></img>
    )
}

const Board = ({ squares, handleClick }) => {
	return (
		<div id="board">
		{
			squares.map((value, index)=>{
				return (
					<button
						key={index}
						className="square" 
						onClick={() => {handleClick(index)}}>
						<ImageXO value={value}/>
					</button>
				)
			})
		}
		</div>
    );
};

export default Board;
