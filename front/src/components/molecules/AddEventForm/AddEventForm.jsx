import React from "react";
import { Button, InputText } from "../../atoms";
import { fr } from "date-fns/locale";
import ReactDatePicker from "react-datepicker";

const AddEventForm = ({
  selectedDate,
  setSelectedDate,
  onFormCompletion,
  selectedName,
  setSelectedName,
  selectedClient,
  setSelectedClient,
  selectedDescription,
  setSelectedDescription,
}) => {
  return (
    <div className="d-flex flex-column">
      <h2 className="mb-4">Prendre un Rendez-vous</h2>
      <InputText name={"name"} placeholder={"Entrez un nom"}></InputText>

      <InputText name={"client"} placeholder={"Entrez un client"}></InputText>

      <label>Heure du rendez-vous:</label>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        locale={fr}
        timeIntervals={15}
        minDate={new Date()}
      />

      <InputText
        name={"description"}
        placeholder={"Entrez une description"}
      ></InputText>
      <Button
        onClick={onFormCompletion}
        text={"Confirmer le rendez-vous"}
      ></Button>
    </div>
  );
};

export default AddEventForm;
