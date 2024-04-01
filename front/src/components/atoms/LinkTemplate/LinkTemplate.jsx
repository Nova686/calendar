import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkTemplate.module.css";

const LinkTemplate = ({ to, text }) => (
  <Link to={to} className={styles.Link}>
    {text}
  </Link>
);

export default LinkTemplate;
