import React, { useEffect, useState } from "react";
import styles from "./Boxes.module.css";

function Boxes({ numberOfBoxes }) {
  const colors = ["#0f0", "#ff0", "#f00", "#f0f", "#0ff"];
  const [onTrue, setOnTrue] = useState(false);

  useEffect(() => {}, []);

  const x = [...Array(numberOfBoxes).keys()];

  function onMoveHandler(e) {
    e.preventDefault();

    let myIndex = Math.floor(Math.random() * colors.length);
    e.target.style.boxShadow = `5px 0px 0px 0px ${colors[myIndex]}`;

    setTimeout(() => {
      e.target.style.boxShadow = `0px 5px 0px 0px ${colors[myIndex]}`;
    }, [50]);
    setTimeout(() => {
      e.target.style.boxShadow = `-2px 0px 0px 0px ${colors[myIndex]}`;
    }, [100]);
    setTimeout(() => {
      e.target.style.boxShadow = `0px -2px 0px 0px ${colors[myIndex]}`;
    }, [150]);
    setTimeout(() => {
      e.target.style.boxShadow = "";
    }, [500]);
  }

  return (
    <div className={styles.container}>
      {x.map((item) => (
        <div
          onMouseEnter={(e) => onMoveHandler(e)}
          key={item}
          className={styles.box}
        ></div>
      ))}
    </div>
  );
}

export default Boxes;
