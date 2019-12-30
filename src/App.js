import React from 'react';
import './App.css';
import TimeSpent from "./components/time-spent/TimeSpent";
import PickupCards from "./components/pickup-cards/PickupCards";
import ZoovuLogo from "./components/zoovu-logo/ZoovuLogo";
import FindThisCard from "./components/find-this-card/FindThisCard";
import { images } from "./images/images.js"

class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      time: 0,
      timerState: false,
      showCardIndex: 0,
      intervalId: undefined,
      imageDragStart: [0, 2, 1, 3, 4],
      imageDragOver: [],
    };
  }
  
  addCard = (id) => {
    console.log(id);
    this.setState((prevState) => ({
        imageDragOver: [...prevState.imageDragOver, parseInt(id)],
        imageDragStart: prevState.imageDragStart.filter(i => i !== parseInt(id)),
        showCardIndex: prevState.showCardIndex + 1,
      }), () => {
        if(this.state.imageDragStart.length === 0) {
          this.endGame();
        } else {
          this.setState((state) => ({ showCardIndex: state.imageDragStart[Math.floor(Math.random() * state.imageDragStart.length)] }))
        }
      }
    )
  };
  
  runTimer = () => {
    this.setState((prevState) => ({
        time: prevState.time + 1,
      })
    );
  };
  
  startTimer = () => {
    if(!this.state.timerState) {
      this.setState(() => ({
            timerState: true,
          }
        )
      );
      const setIntervalId = setInterval(() => this.runTimer(), 1000);
      this.setState(() => ({
            intervalId: setIntervalId,
          }
        )
      )
    }
  };
  
  stopTimer = () => {
    clearInterval(this.state.intervalId);
  };
  
  endGame = () => {
    this.stopTimer();
  };
  
  resetGame = () => {
    this.setState({
        time: 0,
        imageDragStart: [0, 2, 1, 3, 4],
        imageDragOver: [],
        showCardIndex: 0,
      }
    )
  };
  
  addTime = () => {
    this.setState((prevState) => ({
          time: prevState.time + 10
        }
      )
    )
  };
  
  compareImages = (imgId) => {
    if(this.state.showCardIndex === imgId) {
      return true;
    } else {
      this.addTime();
      return false;
    }
  };
  
  render() {
    const dragOver = (img, e) => {
      console.log(e.clientX);
    };
    let image = images[this.state.showCardIndex];
    return (
      <>
        <div className="App">
          <div className="wrap-one">
            <PickupCards imageDragStart={this.state.imageDragStart} startTimer={this.startTimer}
                         dragOver={dragOver}/>
            <ZoovuLogo imageDragOver={this.state.imageDragOver} addCard={this.addCard}
                       compareImages={this.compareImages}/>
          </div>
          <div className="wrap-two">
            <TimeSpent time={this.state.time} timerState={this.state.timerState}/>
            <span className="br"/>
            <FindThisCard index={image}/>
            <button className="resetGame" onClick={this.resetGame}>Reset Game</button>
          </div>
        </div>
      </>
    );
  }
}

export default App;

