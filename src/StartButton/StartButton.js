import React from 'react';
import './StartButton.css'

const StartButton = (props) => {
    return (
        <div className="StartButton">
            <button onClick={props.click}>Play Now</button>
        </div>
    );
}

export default StartButton;