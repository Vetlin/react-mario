import React, {Component} from 'react';
import './App.css';
import StartButton from './StartButton/StartButton';
import Game from './Game/Game';

class App extends Component {

  state = {
    gameStep: 2,
  }

  changeGameStep = () => {
    let gameStep = this.state.gameStep;
    gameStep++;
    this.setState({gameStep: gameStep});
  }

  render() {

    let  html = ``;
    if(this.state.gameStep === 1) {
      html = <StartButton click={this.changeGameStep}/>;
    } else if (this.state.gameStep === 2) {
      html = <Game />;
    }

    return (
      <div className="App">
        {html}
      </div>
    );
  }
  
}

export default App;
