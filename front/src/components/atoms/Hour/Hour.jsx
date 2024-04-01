import React from "react";
import { styled } from "styled-components";
import styles from "./Hour.module.css";

const HourStyle = styled.div`
  color: ${(props) => props.theme.primary ?? "white"};
`;

const Hour = ({ hour, ...props }) => {
  return (
    <HourStyle {...props} className={styles.hourContainer}>
      {hour}:00
    </HourStyle>
  );
};

export default Hour;
