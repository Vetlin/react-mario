import React, {Component} from 'react';
import './Mario.css';

class Mario extends Component {

    render() {

        const style = {
            top: this.props.top + 'px',
            left: this.props.left + 'px',
        }

        return (
            <div className="Mario" style={style}>
                <img src="./images/mario.png" alt="mario" height={Number((this.props.cell*6).toFixed(1))}></img>
            </div>
        );
    }
}

export default Mario;