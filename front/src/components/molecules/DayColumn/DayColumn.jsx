import React from "react";
import { TimeSlot } from "../../atoms";

const DayColumn = ({ day, events, quarterHourHeight }) => {
  const WeekDays = {
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
  };

  const renderEvent = (event, zIndex) => {
    const height = quarterHourHeight * (event.end - event.start);
    const topPosition = quarterHourHeight * event.start;

    return (
      <TimeSlot
        key={event.id}
        height={height}
        topPosition={topPosition}
        zIndex={zIndex}
      />
    );
  };

  return (
    <div className="day-column">
      <h3 className="border-bottom border-black pb-3 mb-0 text-center">
        {day}
      </h3>
      <div
        className={`events-container border-end border-black ${
          day == WeekDays.monday ? "border-start" : ""
        }`}
        style={{
          position: "relative",
          height: `${quarterHourHeight * 48}px`,
          backgroundSize: `100% ${quarterHourHeight * 4}px`,
        }}
      >
        {events.map((event) => renderEvent(event, 2))}
      </div>
    </div>
  );
};

export default DayColumn;
