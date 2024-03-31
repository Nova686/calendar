import React from "react";
import styles from "./InputDropdown.module.css";

const InputDropdown = ({ options, name, ...props }) => {
  return (
    <select name={name} className={styles.InputDropdown}>
      {options.map((x, i) => {
        let { value, selected = false } = x;
        return (
          <option value={value} selected={selected}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

export default InputDropdown;
