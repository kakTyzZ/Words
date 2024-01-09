import React, { useEffect, useRef } from "react";
import classes from "./PicturesProgressBar.module.css";

export function PicturesProgressBar({ words, success }) {
  const containerRef = useRef(null);

  function updateProgress(e) {
    const currentWord = e.target.parentNode.querySelectorAll("div");

    const css = classes.wordContainer + " " + classes.wordContainerScale;
    currentWord[success].className = css;
    if (success > 0 && success < words.length) {
      currentWord[success - 1].className = classes.wordContainerRight;
    }
  }

  useEffect(() => {
    const divs = containerRef.current.children;
    if (divs.length > 0) {
      divs[success - 1].className = classes.wordContainerRight;
      divs[success].className =
        classes.wordContainer + " " + classes.wordContainerScale;
    }
  }, [success]);

  useEffect(() => {
    const css = classes.firstElementBigOne + " " + classes.wordContainer;
    const firstDiv = containerRef.current.children[0];
    if (firstDiv) {
      firstDiv.className = css;
    }
  }, [words]);
  return (
    <div className={classes.progressBarContainer} ref={containerRef}>
      {words.map((word, index) => (
        <div key={word.id} className={classes.wordContainer}>
          {word.value1}
        </div>
      ))}

      {/* <button onClick={(e) => testClickHandle(e)}>Click me</button> */}
    </div>
  );
}
