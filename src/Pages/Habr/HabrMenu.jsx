import React from "react";
import classes from "./HabrMenu.module.css";

export function HabrMenu({
  setColorFilter,
  colorFilter,
  setBrightnessFilter,
  setColumns,
}) {
  function radioClick(e) {
    if (e.target.value === "true") {
      setBrightnessFilter(true);
    } else if (e.target.value === "false") {
      setBrightnessFilter(false);
    } else {
      setBrightnessFilter("all");
    }
  }

  function onRedClick() {
    if (colorFilter.includes("red")) {
      const withoutRed = colorFilter.filter((item) => item !== "red");

      setColorFilter([...withoutRed]);
    } else {
      setColorFilter([...colorFilter, "red"]);
    }
  }
  function onGreenClick() {
    if (colorFilter.includes("green")) {
      const withoutGreen = colorFilter.filter((item) => item !== "green");
      setColorFilter([...withoutGreen]);
    } else {
      setColorFilter([...colorFilter, "green"]);
    }
  }
  function onBlueClick() {
    if (colorFilter.includes("blue")) {
      const withoutBlue = colorFilter.filter((item) => item !== "blue");
      setColorFilter([...withoutBlue]);
    } else {
      setColorFilter([...colorFilter, "blue"]);
    }
  }
  function onYellowClick() {
    if (colorFilter.includes("yellow")) {
      const withoutYellow = colorFilter.filter((item) => item !== "yellow");
      setColorFilter([...withoutYellow]);
    } else {
      setColorFilter([...colorFilter, "yellow"]);
    }
  }

  return (
    <div className={classes.habrMenu}>
      <div className={classes.colorBlock}>
        <div className={classes.red}>
          <input
            readOnly
            checked={colorFilter.includes("red")}
            type="checkbox"
            name="red"
            onClick={() => onRedClick()}
          />
          <label htmlFor="">Красные</label>
        </div>
        <div className={classes.green}>
          <input
            readOnly
            checked={colorFilter.includes("green")}
            type="checkbox"
            name="green"
            onClick={() => onGreenClick()}
          />
          <label htmlFor="">Зелёные</label>
        </div>
        <div className={classes.blue}>
          <input
            readOnly
            checked={colorFilter.includes("blue")}
            type="checkbox"
            name="blue"
            onClick={() => onBlueClick()}
          />
          <label htmlFor="">Синие</label>
        </div>
        <div className={classes.yellow}>
          <input
            readOnly
            checked={colorFilter.includes("yellow")}
            type="checkbox"
            name="yellow"
            onClick={() => onYellowClick()}
          />
          <label htmlFor="">Жёлтые</label>
        </div>
      </div>

      <div className={classes.brightnessBlock}>
        <div>
          <input
            onClick={(e) => radioClick(e)}
            type="radio"
            name="brightness"
            value="all"
          />
          <label htmlFor="">Все</label>
        </div>
        <div>
          <input
            onClick={(e) => radioClick(e)}
            type="radio"
            name="brightness"
            value="true"
          />
          <label htmlFor="">Тёмные</label>
        </div>
        <div>
          <input
            onClick={(e) => radioClick(e)}
            type="radio"
            name="brightness"
            value="false"
          />
          <label htmlFor="">Светлые</label>
        </div>
      </div>

      <div className={classes.columnsBlock}>
        <div>
          <label htmlFor="">Колонок</label>
          <input
            onChange={(e) => setColumns(e.target.value)}
            type="number"
            name="columns"
            min={1}
            max={4}
          />
        </div>
      </div>
      <div className={classes.menuBg}></div>
    </div>
  );
}
