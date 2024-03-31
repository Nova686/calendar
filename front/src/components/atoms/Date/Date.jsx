import React from "react";
import { styled } from "styled-components";
import styles from "./Date.module.css";

const DateStyle = styled.div`
  color: ${(props) => props.theme.primary ?? "white"};
`;

const Date = ({ dateDay = "Lun", dateNumber = 1, ...props }) => {
  return (
    <DateStyle {...props} className={styles.dateContainer}>
      <p>{dateDay}</p>
      <p>{dateNumber}</p>
    </DateStyle>
  );
};

export default Date;
