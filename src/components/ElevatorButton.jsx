// ElevatorButton.jsx
import React from "react";

export const ElevatorButton = ({ floorNumber, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      {floorNumber}
    </div>
  );
};

export default ElevatorButton;
