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
      shuffled: [],
    };
  }
  
  shuffleArray = (array) => {
    let newArray = [...array];
    for(let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray.map(str => parseInt(str));
  }
  
  componentDidMount() {
    this.setState({ shuffled: this.shuffleArray(Object.keys(images)) });
  }
  
  addCard = (id) => {
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
    alert("Game is Finished;")
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
    if(imgId === this.state.showCardIndex) return true;
    if((imgId === 1 && this.state.showCardIndex === 2) || (imgId === 2 && this.state.showCardIndex === 1)) return true;
    this.addTime();
    return false;
  };
  
  render() {
    let image = images[this.state.showCardIndex];
    return (
      <>
        <div className="App">
          <div className="wrap-one">
            <PickupCards shuffled={this.state.shuffled} imageDragStart={this.state.imageDragStart}
                         startTimer={this.startTimer}/>
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

