import React, { useContext } from "react";
import { Button } from "../../atoms";
import styles from "./NightModeSwitch.module.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { NightModeContext } from "../../../contexts";

const NightModeSwitch = ({ handler, ...props }) => {
  const nighModeContext = useContext(NightModeContext);

  return (
    <Button
      className={styles.btnNightmode}
      icon={nighModeContext.nightMode ? <FaMoon /> : <FaSun />}
      onClick={nighModeContext.changeNightMode}
    ></Button>
  );
};

export default NightModeSwitch;
