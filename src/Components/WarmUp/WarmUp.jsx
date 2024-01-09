import React, { useState, useEffect } from "react";
import classes from "./WarmUp.module.css";
import { WarmUpExercise } from "./WarmUpExercise";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import NavBar from "../NavBar/NavBar";
import Boxes from "../Divs/Boxes";

export default function WarmUp() {
  const [words, setWords] = useState([]);
  const [baseWords, setBaseWords] = useState([]);
  const [threeLetterWord, setThreeLetterWord] = useState([
    { value1: [], value2: [] },
  ]);
  const [oneLetterWord, setOneLetterWord] = useState([
    { value1: [], value2: [] },
  ]);

  const [step, setStep] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(0);

  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function checkAnswer(e, fn) {
    e.preventDefault();
    if (
      words[0].value1 ===
        e.target.parentNode.querySelectorAll("input")[0].value &&
      words[0].value2 === e.target.parentNode.querySelectorAll("input")[1].value
    ) {
      if (step !== 2) {
        setStep((prev) => prev + 1);
        checkWords(e);
        colorRightAnswerButton(e);
      } else {
        console.log("here");
        colorRightAnswerButton(e);
        resetInputs(e);
        setStep((prev) => prev + 1);
        setRightAnswer((prev) => prev + 1);
        filterWords();
        resetButtonClasses(e);
        fn(e);
      }
    } else {
      wrongAnswerFunc(e);
    }
  }

  function colorRightAnswerButton(e) {
    e.target.className = classes.buttonRightAnswer;
    e.target.textContent = "Right";
  }

  function wrongAnswerFunc(e) {
    const cssWrong = classes.warmUpWordContainer + " " + classes.wrong;
    e.target.parentNode.className = cssWrong;
    setTimeout(() => {
      e.target.parentNode.className = classes.warmUpWordContainer;
    }, [1500]);
  }

  function filterWords() {
    let newWords = words.filter((item) => item.value1 !== words[0].value1);
    setWords([...newWords]);
  }

  function threeLetterWordFunc(myarray) {
    const newItem =
      myarray[0].value1.slice(0, 3) + addStars(myarray[0].value1.length - 3);
    const newItem2 =
      myarray[0].value2.slice(0, 3) + addStars(myarray[0].value2.length - 3);

    setThreeLetterWord([
      {
        value1: newItem,
        value2: newItem2,
      },
    ]);
  }
  function oneLetterWordFunc(myarray) {
    const newItem =
      myarray[0].value1.slice(0, 1) + addStars(myarray[0].value1.length - 1);
    const newItem2 =
      myarray[0].value2.slice(0, 1) + addStars(myarray[0].value2.length - 1);

    setOneLetterWord([
      {
        value1: newItem,
        value2: newItem2,
      },
    ]);
  }

  function addStars(num) {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push("*");
    }

    return result.join("");
  }

  function checkWords(e) {
    const allInputs = e.target.parentNode.parentNode.querySelectorAll("input");

    allInputs.forEach((item) => (item.disabled = true));

    if (e.target.parentNode.nextElementSibling) {
      e.target.parentNode.nextElementSibling
        .querySelectorAll("input")
        .forEach((item) => (item.disabled = false));
    }
  }

  function startFromBeginning(e) {
    setWords(baseWords);
  }

  function resetButtonClasses(e) {
    const allButtons =
      e.target.parentNode.parentNode.querySelectorAll("button");
    allButtons.forEach((item) => {
      item.className = "";
      item.textContent = "Check";
    });
  }

  function resetInputs(e) {
    const allInputs = e.target.parentNode.parentNode.querySelectorAll("input");
    allInputs.forEach((item, index) => {
      if (index < 2) {
        item.disabled = false;
      } else {
        item.disabled = true;
      }
    });
  }

  useEffect(() => {
    let myWords = JSON.parse(localStorage.getItem("words"));
    if (myWords.length) {
      setWords(myWords);
      setBaseWords(myWords);
      threeLetterWordFunc(myWords);
      oneLetterWordFunc(myWords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (words.length) {
      threeLetterWordFunc(words);
      oneLetterWordFunc(words);
      setStep(0);
    }
    console.log("render");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  /* useEffect(() => {
    if (words) {
      localStorage.setItem("words", JSON.stringify(words));
    }
  }); */

  return (
    <div className={classes.warmUpContainer}>
      <Boxes numberOfBoxes={24} />
      <NavBar path={["/"]} name={["Главная страница"]} />

      <WarmUpExercise
        rightAnswer={rightAnswer}
        words={words}
        handleChange={handleChange}
        checkAnswer={checkAnswer}
        threeLetterWord={threeLetterWord}
        oneLetterWord={oneLetterWord}
        resetInputs={resetInputs}
        classes={classes}
        threeLetterWordFunc={threeLetterWordFunc}
        oneLetterWordFunc={oneLetterWordFunc}
        startFromBeginning={startFromBeginning}
      />
    </div>
  );
}
