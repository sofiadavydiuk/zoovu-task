import React from 'react';

function TimeSpent(props) {
  return (
    <div className="TimeSpent">
      <h2>Score: {props.time} seconds</h2>
    </div>
  )
}
export default TimeSpent;
