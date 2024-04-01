import "./landing.module.css";

import React, { useState } from "react";
import {
  WeeklyCalendar,
  Header,
  ScheduleEventModal,
} from "../../components/organisms";

const Landing = () => {
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [triggerReloadCalendar, setTriggerReloadCalendar] = useState(false);

  function reloadCalendar() {
    setTriggerReloadCalendar(true);
  }

  function openEventsModal() {
    setIsEventsModalOpen(true);
  }

  function closeEventsModal() {
    setIsEventsModalOpen(false);
  }

  return (
    <>
      <ScheduleEventModal
        onEventsCreated={reloadCalendar}
        isModalOpen={isEventsModalOpen}
        closeModal={closeEventsModal}
      />
      <Header />
      <main className="home-container p-3 pe-5">
        <WeeklyCalendar
          onEventsModalButtonClicked={openEventsModal}
          triggerReloadCalendar={triggerReloadCalendar}
          setTriggerReloadCalendar={setTriggerReloadCalendar}
        />
      </main>
    </>
  );
};

export default Landing;
