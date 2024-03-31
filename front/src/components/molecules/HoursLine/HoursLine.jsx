import React from "react";
import { Hour } from "../../atoms";
import styles from "./HoursLine.module.css";

const HoursLine = ({ dataHours, ...props }) => {
  let minNumber;
  let maxNumber;

  // Select earliest start hour and latest end hour
  dataHours.map((x, i) => {
    let { hourStart, hourEnd } = x;
    if (hourStart < minNumber || !minNumber) {
      minNumber = hourStart;
    }
    if (hourEnd > maxNumber || !maxNumber) {
      maxNumber = hourEnd;
    }
  });

  // Format start and end hours
  minNumber = minNumber / 100;
  maxNumber =
    Math.round(maxNumber / 100) == parseInt(maxNumber / 100)
      ? maxNumber / 100
      : Math.round(maxNumber / 100) + 1;

  // Display all hours between hourStart and hourEnd (included)
  let hours = [];
  for (let i = minNumber; i <= maxNumber; i++) {
    hours.push({ hour: i });
  }

  return (
    <div className={styles.hoursLine}>
      {hours.map((x, i) => {
        let { hour } = x;
        return (
          <>
            <Hour key={i} hour={hour}></Hour>
          </>
        );
      })}
    </div>
  );
};

export default HoursLine;
