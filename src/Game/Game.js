import React, {Component} from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './Game.css';
import Mario from './Mario';
import Maze from './Maze';

class Game extends Component {

    state = null;
    deviceType = null;

    screenWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
    screenHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
    

    constructor(props) {
        super(props);

        if (this.screenHeight > this.screenWidth) {
            this.deviceType = 'sp'
        } else if (this.screenWidth > this.screenHeight) {
            if (this.screenWidth > 1600) {
                this.deviceType = 'b-dt'
            }
        }

        if (this.deviceType === 'b-dt') {
            this.oneMove = this.valN(this.screenWidth / 500);
            this.oneCell = this.valN(this.oneMove*3);
            this.marioPadTop = this.valN(this.oneCell*6);
            this.marioPadLeft = this.valN(this.marioPadTop / 100 * 75);
        }

        console.log('Cell', this.oneCell);
        console.log('Move', this.oneMove);
        console.log('marioPadTop', this.marioPadTop);
        console.log('marioPadLeft', this.marioPadLeft);

        this.state = {
            position: {
                Mario: {
                    top: this.oneCell,
                    left: this.oneCell,
                }
            },
            mazes: {
                'b-dt': [
                    {top: this.oneCell, left: this.oneCell * 6, length: this.oneCell * 8, direction: 'down'}, // 0
                    {top: this.oneCell * 16, left: this.oneCell * 6, length: this.oneCell * 8, direction: 'down'}, // 1
                    {top: this.oneCell * 9, left: this.oneCell * 6, length: this.oneCell * 6, direction: 'right'}, // 2
                    {top: this.oneCell * 16, left: this.oneCell, length: this.oneCell * 6, direction: 'right'}, // 3
                    {top: this.oneCell * 16, left: this.oneCell * 12, length: this.oneCell * 12, direction: 'right'}, // 4
                    {top: this.oneCell * 30, left: this.oneCell, length: this.oneCell * 6, direction: 'right'}, // 5
                    {top: this.valN(this.oneCell * 37+this.oneMove*2), left: this.oneCell * 6, length: this.oneCell * 48, direction: 'down'}, // 6
                    {top: this.valN(this.oneCell * 92+this.oneMove), left: this.oneCell * 6, length: this.oneCell * 5, direction: 'down'}, // 7
                    {top: this.valN(this.oneCell * 37+this.oneMove*2), left: this.oneCell * 6, length: this.oneCell * 6, direction: 'right'}, // 8
                    {top: this.valN(this.oneCell * 92+this.oneMove), left: this.oneCell * 6, length: this.oneCell * 6, direction: 'right'}, // 9
                    {top: this.valN(this.oneCell * 86+this.oneMove), left: this.oneCell * 12, length: this.oneCell * 7, direction: 'down'}, // 10
                ],
            },
            mazeWidth: this.oneCell,
        };
        
    }

    valN(num) {
        return Number(num.toFixed(1));
    }

    keyEventHandler = (key, e) => {
        let Mario = {...this.state.position.Mario};
        let mazes = [...this.state.mazes[this.deviceType]];

        let upLock = false,
            downLock = false,
            leftLock = false,
            rightLock = false;

        for (let id in mazes) {
            let maze = mazes[id];
            if (maze.direction === 'down') {
                if (key === 'right' && (Mario.left+this.marioPadLeft+this.oneMove*1) > maze.left
                                    && Mario.left < maze.left+this.state.mazeWidth
                                    && Mario.top < (maze.top+maze.length)
                                    && Mario.top+this.marioPadTop > maze.top) {
                    rightLock = true;
                } else if (key === 'down' && Mario.top+this.marioPadTop+(this.oneMove/2) > maze.top
                                            && Mario.top < maze.top+maze.length
                                            && Mario.left+this.marioPadLeft > maze.left
                                            && Mario.left < maze.left+this.state.mazeWidth) {
                    downLock = true;
                } else if (key === 'up' && Mario.top < maze.top+maze.length+this.oneMove
                                        && Mario.top+this.marioPadTop > (maze.top)
                                        && Mario.left+this.marioPadLeft > maze.left
                                        && Mario.left < maze.left+this.state.mazeWidth) {
                    upLock = true;
                } else if (key === 'left' && Mario.left < maze.left+this.state.mazeWidth+this.oneMove
                                            && Mario.left+this.marioPadLeft > maze.left 
                                            && Mario.top < (maze.top+maze.length)
                                            && Mario.top+this.marioPadTop > maze.top) {
                    leftLock = true;
                }
            } else {
                if (key === 'right' && Mario.left+this.marioPadLeft+this.oneMove > maze.left
                                    && Mario.left < maze.left+maze.length
                                    && Mario.top < maze.top+this.state.mazeWidth
                                    && Mario.top+this.marioPadTop > maze.top+this.oneMove/2) {
                    rightLock = true;
                } else if (key === 'down' && Mario.top+this.marioPadTop+(this.oneMove/2) > maze.top
                                            && Mario.top < maze.top+this.state.mazeWidth
                                            && Mario.left+this.marioPadLeft > maze.left
                                            && Mario.left < maze.left+maze.length) {
                    downLock = true;
                } else if (key === 'up' && Mario.top < maze.top+this.state.mazeWidth+this.oneMove
                                        && Mario.top+this.marioPadTop > (maze.top)
                                        && Mario.left+this.marioPadLeft > maze.left
                                        && Mario.left < maze.left+maze.length) {
                    upLock = true;
                } else if (key === 'left' && Mario.left < maze.left+maze.length+this.oneMove
                                            && Mario.left+this.marioPadLeft > maze.left 
                                            && Mario.top < (maze.top+this.state.mazeWidth)
                                            && Mario.top+this.marioPadTop > maze.top) {
                    leftLock = true;
                }
            }
        }

        if (key === 'up' && Mario.top > this.oneCell && !upLock) {
            Mario.top = this.valN(Mario.top - this.oneMove);
        } else if (key === 'down' && Mario.top+this.marioPadTop < (this.screenHeight - this.oneCell*2) && !downLock) {
            Mario.top = this.valN(Mario.top + this.oneMove);
        } else if (key === 'left' && Mario.left > this.oneCell && !leftLock) {
            Mario.left = this.valN(Mario.left - this.oneMove);
        } else if (key === 'right' && Mario.left+this.marioPadLeft < (this.screenWidth - this.oneCell*2) && !rightLock) {
            Mario.left = this.valN(Mario.left + this.oneMove);
        }

        this.setState({position: { Mario: Mario }});
    }

    render() {

        let style = {
            border: this.oneCell + 'px solid brown',
            height: this.screenHeight - this.oneCell*2 + 'px',
            width: this.screenWidth - this.oneCell*2 +'px',
        }

        return (
            <div style={style}>
                <KeyboardEventHandler
                    handleKeys={['left', 'up', 'down', 'right']}
                    onKeyEvent={(key, e) => this.keyEventHandler(key, e)} />
                <Mario top={this.state.position.Mario.top} left={this.state.position.Mario.left} cell={this.oneCell}/>
                <Maze mazes={this.state.mazes[this.deviceType]} width={this.state.mazeWidth}/>
            </div>
        );
    }
}

export default Game;