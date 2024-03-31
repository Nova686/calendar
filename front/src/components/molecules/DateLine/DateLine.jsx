import React from "react";
import { Date } from "../../atoms";
import styles from "./DateLine.module.css";

const DateLine = ({ data, ...props }) => {
  return (
    <div className={styles.dateLine}>
      {data.map((x, i) => {
        let { dateDay, dateNumber } = x;
        return (
          <>
            <Date key={i} dateDay={dateDay} dateNumber={dateNumber}></Date>
            {data.length - 1 !== i ? <hr /> : ""}
          </>
        );
      })}
    </div>
  );
};

export default DateLine;
