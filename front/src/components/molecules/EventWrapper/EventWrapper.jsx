import React from "react";
import { Button, InputText, InputDropdown, TextWithIcon } from "../../atoms";
import styles from "./EventWrapper.module.css";

const EventWrapper = ({
  dataEvent,
  openingHours,
  onChangeName,
  nameValue,
  onChangeClient,
  clientValue,
  onChangeDescription,
  descriptionValue,
  handleSubmitEvent,
  ...props
}) => {
  let { day, start, end } = dataEvent;
  let minNumber;
  let maxNumber;
  let optionsStart = [];
  let optionsEnd = [];
  let optionsMinutes = [
    {
      value: 0,
      selected: `${start.slice(2) == 0 ? true : false}`,
    },
    {
      value: 15,
      selected: `${start.slice(2) == 15 ? true : false}`,
    },
    {
      value: 30,
      selected: `${start.slice(2) == 30 ? true : false}`,
    },
    {
      value: 45,
      selected: `${start.slice(2) == 45 ? true : false}`,
    },
  ];

  // Select earliest start hour and latest end hour
  openingHours.map((x, i) => {
    let { hourStart, hourEnd } = x;
    if (hourStart < minNumber || !minNumber) {
      minNumber = hourStart;
    }
    if (hourEnd > maxNumber || !maxNumber) {
      maxNumber = hourEnd;
    }
  });

  // Format start and end hours
  minNumber = minNumber / 100;
  maxNumber =
    Math.round(maxNumber / 100) == parseInt(maxNumber / 100)
      ? maxNumber / 100
      : Math.round(maxNumber / 100) + 1;

  optionsStart.push({ value: Math.round(start / 100) });
  optionsEnd.push({ value: Math.round(end / 100) });

  // Display all hours between hourStart and hourEnd for event startHour and endHour(included)
  for (let i = minNumber; i <= maxNumber; i++) {
    optionsStart.push({ value: i });
    optionsEnd.push({ value: i });
  }

  return (
    <div className={styles.EventWrapper}>
      <InputText
        onChange={onChangeName}
        value={nameValue}
        placeholder={"Ajouter un titre"}
      />
      {/*name*/}
      <div>
        <TextWithIcon icon={""} text={day}></TextWithIcon> {/* day */}
        <InputDropdown
          options={optionsStart}
          name="startHour"
        ></InputDropdown>{" "}
        {/* HourStart */}
        <InputDropdown
          options={optionsMinutes}
          name="startMinutes"
        ></InputDropdown>{" "}
        {/* MinutesStart */}
        <p>-</p>
        <InputDropdown options={optionsEnd} name="endHour"></InputDropdown>{" "}
        {/* HourEnd */}
        <InputDropdown
          options={optionsMinutes}
          name="endMinutes"
        ></InputDropdown>{" "}
        {/* MinutesEnd */}
      </div>
      <InputText
        onChange={onChangeClient}
        value={clientValue}
        placeholder={"Ajouter un client"}
      />
      {/* Client */}
      <InputText
        onChange={onChangeDescription}
        value={descriptionValue}
        placeholder={"Ajouter une description"}
      />{" "}
      {/* Description */}
      <Button onClick={handleSubmitEvent} text={"Enregistrer"}></Button>
    </div>
  );
};

export default EventWrapper;
