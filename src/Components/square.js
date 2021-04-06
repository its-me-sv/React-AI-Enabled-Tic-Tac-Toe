import React from 'react';
import {EMPTY, HUMAN, COMPUTER} from '../Containers/Constants.js';
import Circle from './circle.js';
import Cross from './cross.js';
import '../index.css';

function Square({position, value, takeTurn}) {
	function handleClick() {
		if (value === EMPTY)
			takeTurn(position);
	}

	return (
		<div className="square" onClick={handleClick}>
			{value === COMPUTER && <Circle />}
			{value === HUMAN && <Cross />}
		</div>
	);
}

export default Square;