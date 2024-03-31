import React from "react";
import { styled } from "styled-components";
import styles from "./Column.module.css";

const ColumnStyle = styled.div`
  color: ${(props) => props.theme.primary ?? "white"};
`;

const Column = ({ event, day, ...props }) => {
  return (
    <ColumnStyle
      {...props}
      className={styles.ColumnContainer}
      onClick={event}
      data-day={day}
    ></ColumnStyle>
  );
};

export default Column;
