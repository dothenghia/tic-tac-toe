
import './resetbutton.scss'
import resetBtn from '../../assets/image/reset.png'

const ResetButton = ({ resetClick }) => {
	return (
		<div id="reset">
			<button 
				className="reset"
				onClick={resetClick}
			>
				<img src={resetBtn} alt="Reset Button"/>
			</button>
		</div>
    );
};

export default ResetButton;
