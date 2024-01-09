import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";

export default function NavBar({ path, name }) {
  return (
    <div className={classes.nav}>
      {name.map((n, i) => (
        <Link key={n} className={classes.link} to={path[i]}>
          {n}
        </Link>
      ))}
    </div>
  );
}
