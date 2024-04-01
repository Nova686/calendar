import { api } from "./ApiService";
import { formatDate } from "./DateServices";

export const eventPath = "/events";

export async function getAllEventsBetween(start, end) {
  const response = await api.get(eventPath, {
    params: {
      start: formatDate(start),
      end: formatDate(end),
    },
  });

  const events = response.data.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return events;
}

export async function saveEvent(eventToSave) {
  const saveEventResponse = await api.post(eventPath, eventToSave);

  return saveEventResponse;
}
