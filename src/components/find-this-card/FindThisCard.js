import React from 'react';

function FindThisCard(props) {
  return (
    <div className="FindThisCard">
      <h2>Find this card:</h2>
      <img src={props.index} alt=""/>
    </div>
  );
}

export default FindThisCard;



