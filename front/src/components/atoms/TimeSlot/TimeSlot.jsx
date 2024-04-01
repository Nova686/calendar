import React from "react";

const TimeSlot = ({ height, backgroundColor, topPosition, zIndex, label }) => (
  <div
    className="time-slot"
    style={{
      height: `${height}px`,
      backgroundColor,
      position: "absolute",
      top: `${topPosition}px`,
      zIndex,
    }}
  >
    {label}
  </div>
);

export default TimeSlot;
