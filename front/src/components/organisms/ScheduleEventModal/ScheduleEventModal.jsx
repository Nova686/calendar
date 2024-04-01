import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../contexts/AuthContext";
import Modal from "react-modal";
import { AddEventForm } from "../../molecules";
import { toast } from "react-toastify";
import { saveEvent } from "../../../services/EventsService";
import {
  addISODurationToDate,
  formatDate,
} from "../../../services/DateServices";
import { getCurrentUserInfo } from "../../../services/UserService";

Modal.setAppElement("#root");

const ScheduleEventModal = ({ isModalOpen, closeModal, onEventCreated }) => {
  const { isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedName, setSelectedName] = useState();
  const [selectedDescription, setSelectedDescription] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const trySaveEvent = async () => {
    setIsLoading(true);

    if (selectedDate == null) {
      toast.error("Veuillez sélectionner une date", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      setIsLoading(false);
      return;
    }

    const currentUserInfo = await getCurrentUserInfo();

    const eventSaveModel = {
      name: selectedName,
      description: selectedDescription,
      client: selectedClient,
      start: formatDate(selectedDate),
      end: formatDate(addISODurationToDate(selectedDate)),
      user_id: currentUserInfo.id,
    };

    try {
      const saveEventResponse = await saveEvent(eventSaveModel);

      setIsLoading(false);

      if (saveEventResponse.status == 201) {
        toast.success("Le rendez-vous a été créé avec succès", {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      }

      onEventCreated();
    } catch (e) {
      e.response.data.errors.forEach((errorMessage) => {
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      });
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading)
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Prendre un rendez-vous"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="mt-5 text-center">Chargement...</div>
      </Modal>
    );

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Prendre un rendez-vous"
      className="Modal"
      overlayClassName="Overlay"
    >
      <AddEventForm
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        selectedDescription={selectedDescription}
        setSelectedDescription={setSelectedDescription}
        selectedName={selectedName}
        setSelectedName={setSelectedName}
        onFormCompletion={trySaveEvent}
      />
    </Modal>
  );
};

export default ScheduleEventModal;
