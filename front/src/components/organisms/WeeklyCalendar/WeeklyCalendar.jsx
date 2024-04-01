import { useState, useEffect } from "react";
import { DayColumn, HourScale } from "../../molecules";
import { Button } from "../../atoms";
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  format,
  isBefore,
  startOfDay,
  setHours,
  setMinutes,
} from "date-fns";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { getAllEventsBetween } from "../../../services/EventsService";
import { convertEventsToTimeSlots } from "../../../services/DateServices";
import { fr } from "date-fns/locale";
import { useAuth } from "../../../contexts/AuthContext";

const WeekDays = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

const WeeklyCalendar = ({
  onEventModalButtonClicked,
  triggerReloadCalendar,
  setTriggerReloadCalendar,
}) => {
  const QUARTER_HOUR_HEIGHT = 15;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchEvents = async () => {
    setLoading(true);
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

    const start = setHours(startOfCurrentWeek, 7);
    let end = setHours(endOfCurrentWeek, 19);
    end = setMinutes(end, 0);

    const fetchedEvents = await getAllEventsBetween(start, end);
    const convertedEvents = convertEventsToTimeSlots(fetchedEvents);
    setEvents(convertedEvents);

    setLoading(false);
  };

  useEffect(() => {
    if (triggerReloadCalendar) {
      fetchEvents();
      setTriggerReloadCalendar(false);
    }
  }, [triggerReloadCalendar, setTriggerReloadCalendar]);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const today = startOfDay(new Date());
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

  const goToPreviousWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, -1));
  };

  const goToNextWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>
          Semaine du {format(startOfCurrentWeek, "PPP", { locale: fr })} au{" "}
          {format(endOfCurrentWeek, "PPP", { locale: fr })}
        </h2>
        <div>
          <Button
            className="previous-week"
            onClick={goToPreviousWeek}
            disabled={isBefore(startOfCurrentWeek, today)}
          >
            <IoChevronBack />
          </Button>
          <Button className="next-week" onClick={goToNextWeek}>
            <IoChevronForward />
          </Button>
        </div>
      </div>
      <div className="d-flex">
        {isAuthenticated && (
          <Button
            className="btn btn-primary schedule-appointment-modal ms-3  h-75"
            onClick={onEventModalButtonClicked}
          >
            Prendre un rendez-vous
          </Button>
        )}
      </div>
      <div className="d-flex calendar-container">
        <div className="position-relative">
          <HourScale quarterHourHeight={QUARTER_HOUR_HEIGHT} />
        </div>
        <div className="ms-5 d-flex day-container">
          {[
            WeekDays.monday,
            WeekDays.tuesday,
            WeekDays.wednesday,
            WeekDays.thursday,
            WeekDays.friday,
            WeekDays.saturday,
            WeekDays.sunday,
          ].map((day) => (
            <DayColumn
              key={day}
              day={day}
              quarterHourHeight={QUARTER_HOUR_HEIGHT}
              events={events.filter((event) => event.day === day)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
