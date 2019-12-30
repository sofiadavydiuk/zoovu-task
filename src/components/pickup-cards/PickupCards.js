import React from 'react';
import { imagesRandom } from "../../images/images.js"
import ImgCard from "./ImgCard";

function PickupCards({ dragOver, startTimer, imageDragStart }) {
  return (
    <div className="PickupCards">
      <h2>Pickup Cards</h2>
      <div className="img-container" id="pickupCards">
        {
          [3, 2, 4, 1, 0].map((src) => <ImgCard closed hidden={!imageDragStart.includes(src)}
                                                startTimer={startTimer} key={src}
                                                dragOver={e => dragOver(src, e)} src={imagesRandom[src]} id={src}/>)
        }
      </div>
    </div>
  );
}

export default PickupCards;



