import React, { useEffect, useState } from "react";
import styles from "./Animation.module.css";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../store/reducers/counterSlice";
import { useSelector, useDispatch } from "react-redux";

export function Animation() {
  const [width, setWidth] = useState(0);

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    function resizeHandler() {
      if (width !== document.documentElement.clientWidth) {
        setWidth(document.documentElement.clientWidth);
        console.log(document.documentElement.clientWidth);
      }
    }

    window.addEventListener("resize", resizeHandler);

    return ()=>{
      window.removeEventListener("resize", resizeHandler);
    }
  }, []);

  return (
    <div className={styles.animationContainer}>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount(Number(prompt())))}
        >
          incrementByAmount
        </button>
      </div>
    </div>
  );
}
