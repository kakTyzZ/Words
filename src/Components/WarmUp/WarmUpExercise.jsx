import React from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export function WarmUpExercise({
  words,
  handleChange,
  checkAnswer,
  threeLetterWord,
  oneLetterWord,
  resetInputs,
  classes,
  rightAnswer,
  startFromBeginning,
}) {
  const myReset = (e) => {
    const myform = e.target.parentNode.parentNode.parentNode;

    setTimeout(() => myform.reset(), []);
  };

  return (
    <div className={classes.exerciseMainContainer}>
      {words.length === 0 ? (
        "no words"
      ) : (
        <form>
          <ProgressBar rightAnswer={rightAnswer} words={words} />
          <div className={classes.warmUpWordsContainer}>
            <div className={classes.warmUpWordContainer}>
              <input
                name="input1"
                placeholder={words.length ? words[0].value1 : ""}
                onChange={handleChange}
              />

              <input
                onChange={handleChange}
                name="input2"
                placeholder={words.length ? words[0].value2 : ""}
              />
              <button onClick={(e) => checkAnswer(e)}>Check</button>
            </div>

            <div className={classes.warmUpWordContainer}>
              <input
                onChange={handleChange}
                name="input3"
                disabled
                placeholder={threeLetterWord[0].value1}
              />
              <input
                onChange={handleChange}
                name="input4"
                disabled
                placeholder={threeLetterWord[0].value2}
              />
              <button onClick={(e) => checkAnswer(e)}>Check</button>
            </div>
            <div className={classes.warmUpWordContainer}>
              <input
                onChange={handleChange}
                name="input5"
                disabled
                placeholder={oneLetterWord[0].value1}
              />
              <input
                onChange={handleChange}
                name="input6"
                disabled
                placeholder={oneLetterWord[0].value2}
              />
              <button onClick={(e) => checkAnswer(e, myReset)}>Check</button>
            </div>
          </div>

          <div className={classes.warmUpButtonContainer}>
            <button onClick={(e) => resetInputs(e)}>Reset</button>
            <button onClick={(e) => startFromBeginning(e)}>
              Начать с начала
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
