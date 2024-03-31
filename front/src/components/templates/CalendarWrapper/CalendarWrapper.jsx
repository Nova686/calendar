import React, { useState, useEffect } from "react";
import axios from "axios";
import { HoursLine, DateLine, CalendarGrid } from "../../molecules";
import styles from "./CalendarWrapper.module.css";

const CalendarWrapper = ({ dataCalendar, ...props }) => {
  let { dataHours, dataWeek, dataEvents } = dataCalendar;
  //   const dataHours = ""; //   hourStart, hourEnd
  //   const dataDates = ""; //   dateDay, dateNumber

  const test = () => {
    //Display ModalEvent
    //Get Hour start on click
    //Get event duration when click released => hourStart,hourEnd
    //Get date selected on click
    //send data to ModalEvent
  };

  return (
    <div className={styles.hoursLine}>
      return (
      <>
        <DateLine data={dataWeek}></DateLine>
        <HoursLine data={dataHours}></HoursLine>
        <CalendarGrid onClick={test}></CalendarGrid>
        {dataEvents.map((x, i) => {
          let { event } = x;
          return <EventWrapper data={event}></EventWrapper>;
        })}
        <ModalEvent></ModalEvent>
      </>
      );
    </div>
  );
};

export default CalendarWrapper;
