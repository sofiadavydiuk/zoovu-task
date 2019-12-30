import React from 'react';
import { images } from "../../images/images";
import ImgCard from "../pickup-cards/ImgCard";

function ZoovuLogo(props) {
  const drop = e => {
    e.preventDefault();
    const card_id = parseInt(e.dataTransfer.getData("card_id"));
    const comparedImages = props.compareImages(card_id);
    if(!comparedImages) {
      return false;
    }
    props.addCard(card_id);
  };
  
  const dragOver = e => {
    if(e) {
      e.preventDefault();
    }
  };
  
  return (
    <div className="ZoovuLogo">
      <h2>Final Logo</h2>
      <div className="img-container" id="zoovulogo" onDrop={drop}
           onDragOver={dragOver}>
        {
          Object.keys(images).map((src, index) => {
            return <ImgCard hidden={!props.imageDragOver.includes(index)} key={index} dragOver={e => dragOver(e)}
                            src={images[src]} id={index}/>
          })
        }
      </div>
    </div>
  );
}

export default ZoovuLogo;

