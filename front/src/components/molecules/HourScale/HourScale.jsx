import React from "react";
import { Hour } from "../../atoms";

const HourScale = ({ quarterHourHeight }) => {
  const hours = [];
  for (let hour = 7; hour <= 19; hour++) {
    hours.push(
      <Hour
        key={hour}
        hour={hour}
        bottomPosition={(19 - hour) * quarterHourHeight * 4 + 5}
      />
    );
  }

  return <>{hours}</>;
};

export default HourScale;
