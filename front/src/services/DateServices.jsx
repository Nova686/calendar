import { fr } from "date-fns/locale";
import { format, differenceInMinutes, startOfDay } from "date-fns";
import { capitalizeFirstLetter } from "./UtilityHelper";
import { Duration, DateTime } from "luxon";

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export function convertISODurationToReadableFormat(isoDuration) {
  const duration = Duration.fromISO(isoDuration);
  const hours = duration.hours;
  const minutes = duration.minutes;
  const hoursFromMinutes = Math.floor(minutes / 60);
  const minutesLeft = minutes - hoursFromMinutes * 60;
  if (hours + hoursFromMinutes > 0)
    return `${hours + hoursFromMinutes}h${
      minutesLeft > 0 ? minutesLeft : "00"
    }`;
  else return `${minutesLeft}min`;
}

export const addISODurationToDate = (date, isoDuration) => {
  const luxonDate = DateTime.fromJSDate(date);
  const duration = Duration.fromISO(isoDuration);
  const result = luxonDate.plus(duration);
  return result.toJSDate();
};

export const convertEventsToTimeSlots = (events) => {
  return events.map((event) => {
    const boundaries = convertDatesToTimeSlotBoundaries(event);

    return {
      id: event.id,
      day: boundaries.day,
      start: boundaries.start,
      end: boundaries.end,
    };
  });
};

const convertDatesToTimeSlotBoundaries = (convertible) => {
  const dayStart = startOfDay(convertible.start_date);
  const baseTime = new Date(dayStart).setHours(7, 0, 0, 0);
  const startTime = new Date(convertible.start_date);
  const endTime = new Date(convertible.end_date);

  return {
    day: capitalizeFirstLetter(format(startTime, "EEEE", { locale: fr })),
    start: differenceInMinutes(startTime, baseTime) / 15,
    end: differenceInMinutes(endTime, baseTime) / 15,
  };
};
