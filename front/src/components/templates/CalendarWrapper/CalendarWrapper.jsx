import React, { useState, useEffect } from "react";
import axios from "axios";
import { HoursLine, DateLine, CalendarGrid } from "../../molecules";
import styles from "./CalendarWrapper.module.css";

const CalendarWrapper = ({ dataCalendar, ...props }) => {
  let { dataHours, dataDates, dataEvents } = dataCalendar;
  //   const dataHours = ""; //   hourStart, hourEnd
  //   const dataDates = ""; //   dateDay, dateNumber

  const test = () => {};

  return (
    <div className={styles.hoursLine}>
      return (
      <>
        <DateLine data={dataDates}></DateLine>
        <HoursLine data={dataHours}></HoursLine>
        <CalendarGrid onClick={test}></CalendarGrid>
        <ModalEvent></ModalEvent>
      </>
      );
    </div>
  );
};

export default CalendarWrapper;
