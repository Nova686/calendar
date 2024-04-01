import React from "react";

const TimeSlot = ({ height, topPosition, zIndex, label }) => (
  <div
    className="time-slot"
    style={{
      height: `${height}px`,
      backgroundColor: "lightblue",
      position: "absolute",
      top: `${topPosition}px`,
      zIndex,
    }}
  >
    {label}
  </div>
);

export default TimeSlot;
