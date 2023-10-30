import React, { useEffect, useState } from "react";
import "./Exercise.css";
import NavBar from "../Components/NavBar/NavBar";

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
    setWords(baseWords);
    e.target.previousElementSibling.className = `exerciseInput wrong`;
    e.target.parentNode.parentNode.reset();
    setScore(score + 1);
    setTimeout(
      () => (e.target.previousElementSibling.className = `exerciseInput`),
      [1000]
    );
    const cl = e.target.parentNode.parentNode.querySelectorAll(".active");
    cl.forEach((elem) => (elem.className = ""));
  }

  function addClasstoRef(e) {
    e.target.nextElementSibling.className = "active";

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
    <div className="main-div">
      <NavBar path={"/"} name={"Главная страница"} />
      <div className="scores-container">
        <div className="timesPlayed">Попыток: {score}</div>
        <div className="success">Пройдено: {success}</div>
      </div>

      <form className="mainExerciseDiv">
        {words.length > 0 ? (
          words.map((word) => (
            <div className="exerciseWordsContainer" key={word.id}>
              <div className="item">
                {success % 2 === 1 ? word.value2 : word.value1}
              </div>
              <input
                className="exerciseInput"
                placeholder="Введите ответ"
                onChange={(e) => setAnswerValue(e.target.value)}
              ></input>
              <button
                className="exerciseButton"
                onClick={(e) => checkAnswerValue(word, e)}
              >
                Ответить
              </button>
              <div className={""}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className="exercise-no-words">No Words</div>
        )}
        {words.length > 1 ? (
          <button onClick={(e) => sortWords(e)}>Перемешать слова</button>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
}
