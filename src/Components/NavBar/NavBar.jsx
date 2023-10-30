import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";

export default function NavBar({ path, name }) {
  return (
    <div className={classes.nav}>
      <Link className={classes.link} to={path}>
        {name}
      </Link>
    </div>
  );
}
