import React, { useEffect, useState } from "react";
import classes from "./Exercise.module.css";
import NavBar from "../Components/NavBar/NavBar";
import ExerciseOne from "../Components/ExerciseOne/ExerciseOne";
import Boxes from "../Components/Divs/Boxes";

export default function Exercise() {
  const [words, setWords] = useState([]);
  const [baseWords, setBaseWords] = useState([]);
  const [answerValue, setAnswerValue] = useState("");
  const [score, setScore] = useState(0);
  const [success, setSuccess] = useState(0);
  const [flag, setFlag] = useState(false);

  function checkAnswerValue(word, e) {
    e.preventDefault();
    if (
      answerValue.toLocaleLowerCase() ===
      (success % 2 === 1 ? word.value1 : word.value2).toLocaleLowerCase()
    ) {
      const completed = {
        ...word,
        completed: true,
      };

      let newWords = words.filter((item) => item.id !== word.id);
      setWords([...newWords, completed]);

      addClasstoRef(e);
    } else {
      resetWhenFalseAnswer(e);
    }
  }

  function resetWhenFalseAnswer(e) {
    const cssWrong = classes.exerciseInput + " " + classes.wrong;
    console.log("css:", cssWrong);
    setWords(baseWords);
    e.target.parentNode.parentNode.reset();
    e.target.previousElementSibling.className = cssWrong;
    console.log("element:", e.target.previousElementSibling);
    setScore(score + 1);
    setTimeout(
      () => (e.target.previousElementSibling.className = classes.exerciseInput),
      1500
    );
    const cl = e.target.parentNode.parentNode.querySelectorAll(".active");
    cl.forEach((elem) => (elem.className = ""));
  }

  function addClasstoRef(e) {
    e.target.nextElementSibling.className = classes.active;

    const cl = e.target.parentNode.parentNode.querySelectorAll(".active");
    if (cl.length === words.length) {
      setSuccess(success + 1);
      setWords(baseWords);
      sortWords(e);
      setTimeout(() => {
        e.target.parentNode.parentNode.reset();
        cl.forEach((elem) => (elem.className = ""));
      }, [1500]);
    }
  }

  function sortWords(e) {
    e.preventDefault();
    setWords(words.sort(() => Math.random() - 0.5));
    setFlag(!flag);
  }

  useEffect(() => {}, [flag]);

  useEffect(() => {
    let myWords = JSON.parse(localStorage.getItem("words"));
    if (myWords) {
      setWords(myWords);
      setBaseWords(myWords);
    }
  }, []);

  useEffect(() => {
    if (words) {
      localStorage.setItem("words", JSON.stringify(words));
    }
  }, [words]);

  return (
    <div className={classes.mainDiv}>
      <Boxes numberOfBoxes={24 + (words.length ? words.length * 3 : 0)} />
      <NavBar path={["/"]} name={["Главная страница"]} />

      <form className={classes.mainExerciseDiv}>
        <div className={classes.scoresContainer}>
          <div className={classes.timesPlayed}>Попыток: {score}</div>
          <div className={classes.success}>Пройдено: {success}</div>
        </div>

        {words.length > 0 ? (
          words.map((word) => (
            <ExerciseOne
              classes={classes}
              word={word}
              success={success}
              key={word.id}
              checkAnswerValue={checkAnswerValue}
              setAnswerValue={setAnswerValue}
            />
          ))
        ) : (
          <div className={classes.exerciseNoWords}>No Words</div>
        )}
        {words.length > 1 ? (
          <button
            className={classes.shuffle__button}
            onClick={(e) => sortWords(e)}
          >
            Перемешать слова
          </button>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
}
