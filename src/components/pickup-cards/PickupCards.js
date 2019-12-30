import React, { Component } from 'react';
import { imagesRandom } from "../../images/images.js"
import ImgCard from "./ImgCard";
import * as PropTypes from "prop-types";

class PickupCards extends Component {
  
  render() {
    let { startTimer, imageDragStart, shuffled } = this.props;
    return (
      <div className="PickupCards">
        <h2>Pickup Cards</h2>
        <div className="img-container" id="pickupCards">
          {
            shuffled.map((src) => <ImgCard closed hidden={!imageDragStart.includes(src)}
                                           startTimer={startTimer} key={src} src={imagesRandom[src]} id={src}/>)
            
          }
        </div>
      </div>
    );
  }
}

PickupCards.propTypes = {
  dragOver: PropTypes.any,
  startTimer: PropTypes.any,
  imageDragStart: PropTypes.any
}

export default PickupCards;



