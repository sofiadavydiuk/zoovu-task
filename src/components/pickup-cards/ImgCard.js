import React from 'react';

function ImgCard({hidden, closed, startTimer, dragOver,src, id}) {
  
  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData('card_id', target.id);
    startTimer();
  };
  
  let className = "ImgContainer";
  if(hidden) className += " hidden";
  if(closed) className += " closed";
  
  return (
    <div className={className}
         id={id}
         draggable="true"
         onDragStart={dragStart}
         onDragOver={dragOver}>
      <img src={src}/>
    </div>
  );
}

export default ImgCard;
