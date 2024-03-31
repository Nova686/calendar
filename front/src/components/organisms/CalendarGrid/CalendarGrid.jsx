import React from "react";
import { Column } from "../../atoms";
import { EventWrapper } from "../../molecules";
import styles from "./CalendarGrid.module.css";

const CalendarGrid = ({ dataEvents, days, ...props }) => {
  return (
    <div className={styles.hoursLine}>
      {days.map((x, i) => {
        let { day } = x;
        <Column key={i} day={day}>
          {dataEvents
            ? dataEvents.map((z, j) => {
                let { event } = z;
                return <EventWrapper key={j} dataEvent={event}></EventWrapper>;
              })
            : ""}
        </Column>;
      })}
    </div>
  );
};

export default CalendarGrid;
