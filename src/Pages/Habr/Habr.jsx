import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import classes from "./Habr.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { HabrFilter } from "./HabrFilter";
import { HabrMenu } from "./HabrMenu";

export function Habr() {
  const dispatch = useDispatch();

  let items = useSelector((state) => state.habr.value);
  const myRefItems = useRef();
  myRefItems.current = items[0];
  /* const [newItems, setNewItems] = useState(items[0]); */
  const [filters, setFilters] = useState(["circle", "square"]);
  const [colorFilter, setColorFilter] = useState([
    "red",
    "blue",
    "yellow",
    "green",
  ]);
  const [brightnessFilter, setBrightnessFilter] = useState(["all"]);
  const [burger, setBurger] = useState(false);
  const [columns, setColumns] = useState(4);
  const [myNewItems, setMyNewItems] = useState([]);

  function onSquaresClick() {
    if (filters.includes("square")) {
      const withoutSquare = filters.filter((item) => item !== "square");
      setFilters([...withoutSquare]);
    } else {
      setFilters([...filters, "square"]);
    }
  }

  function onCirclesClick() {
    if (filters.includes("circle")) {
      const withoutCircle = filters.filter((item) => item !== "circle");
      setFilters([...withoutCircle]);
    } else {
      setFilters([...filters, "circle"]);
    }
  }

  function filterAllItems() {
    if (filters > 0 && myRefItems.current.length === 0) {
      myRefItems.current = items;
    }
    let filtered = [];
    for (let key of filters) {
      myRefItems.current.filter((item) => {
        if (item.form === key) {
          filtered.push(item);
        }
      });
    }
    let secondFilterArray = [];
    for (let key of colorFilter) {
      filtered.filter((item) => {
        if (item.color === key) {
          secondFilterArray.push(item);
        }
      });
    }
    let thirdFilterArray = [];
    if (brightnessFilter != "all") {
      secondFilterArray.filter((item) => {
        if (item.dark === brightnessFilter) {
          thirdFilterArray.push(item);
        }
      });
    }
    console.log(secondFilterArray);
    console.log(thirdFilterArray);

    myRefItems.current =
      thirdFilterArray.length > 0 ? thirdFilterArray : secondFilterArray;

    setMyNewItems(myRefItems.current);
  }

  useEffect(() => {
    console.log(columns);
    filterAllItems();
  }, [filters, colorFilter, brightnessFilter, columns]);

  useLayoutEffect(() => {
    setMyNewItems(items);
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.habrContainer}>
        <div className={classes.header}>
          <div className={classes.title}>Круги и квадраты, v.1.0</div>
          <div className={classes.menu}>
            <div className={classes.burger}>
              <button onClick={() => setBurger(!burger)}>burger</button>
              {burger && (
                <HabrMenu
                  colorFilter={colorFilter}
                  setColorFilter={setColorFilter}
                  brightnessFilter={brightnessFilter}
                  setBrightnessFilter={setBrightnessFilter}
                  setColumns={setColumns}
                />
              )}
            </div>

            <div className={classes.filterContainer}>
              <div className={classes.filterCircles}>
                <input
                  readOnly
                  onClick={() => onCirclesClick()}
                  type="checkbox"
                  id="scales"
                  name="scales"
                  checked={filters.includes("circle")}
                />
                <label htmlFor="scales">Круги</label>
              </div>
              <div className={classes.filterSquares}>
                <input
                  readOnly
                  type="checkbox"
                  id="squares"
                  name="squares"
                  onChange={() => onSquaresClick()}
                  checked={filters.includes("square")}
                />
                <label htmlFor="squares">Квадраты</label>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.contentDiv}>
          <HabrFilter items={myNewItems} columns={columns} />
        </div>
      </div>
    </div>
  );
}
