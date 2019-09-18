import React, {Component} from 'react';
import './Maze.css';

class Maze extends Component {

    renderMazes = (mazes) => {
        let html;
        for (let maze of mazes) {
            let style = {
                top: maze.top,
                left: maze.left,
            }
            if (maze.direction === 'down') {
                style.width = this.props.width;
                style.height = maze.length;
            }
            html += (<div style={style}></div>);
        }
        return html;
    }

    render() {

        return (
            <div className="Maze">
                {this.props.mazes.map((maze, index) => {
                    let style = {
                        top: maze.top + 'px',
                        left: maze.left + 'px',
                    }
                    if (maze.direction === 'down') {
                        style.width = this.props.width;
                        style.height = maze.length;
                    } else if (maze.direction === 'right') {
                        style.width = maze.length;
                        style.height = this.props.width;
                    }

                    let id = index +  "_maze";

                    style.width += 'px';
                    style.height += 'px';
                    return <div style={style} key={index} id={id}></div>
                })}
            </div>
        );
    }
}

export default Maze;