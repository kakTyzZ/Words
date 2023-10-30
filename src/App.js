import classes from "./App.module.css"
import { useEffect, useState } from 'react'
import NavBar from './Components/NavBar/NavBar';
/* 
function Result({ }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали  ответа из </h2>
      <button>Попробовать снова</button>
    </div>
  );
} */
/* function Game({ }) {
  return (
    <>
      <div className="progress">
        <div style={{ width: `` }} className="progress__inner"></div>
      </div>
    </>
  );
} */
function App() {
  const [words, setWords] = useState([])
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')


  function addNewWord() {
    /* const newValue = [value1, value2, (words.length)] */
    const newValue = {
      value1,
      value2,
      id: words.length,
      completed: false
    }
    setWords(current => [...current, newValue])

  }
  /* function addToLocalStorage() {
    if (words) {
      localStorage.setItem('words', JSON.stringify(words))
    }
  } */

  function DeleteTheWord(index) {
    if (words.length > 1) {
      setWords(words.filter((elem) => elem.id !== index))
    }
    if (words.length === 1) {
      setWords([])
    }
  }

  useEffect(() => {
    let myWords = JSON.parse(localStorage.getItem('words'))
    if (myWords.length > 0) {
      setWords(myWords)
    } else {
      setWords([])
    }

  }, [])

  useEffect(() => {
    if (words) {
      localStorage.setItem('words', JSON.stringify(words))
    }
    setValue1('')
    setValue2('')
  }, [words])


  return (
    <div className={classes.app}>
      <NavBar path={"/exercise"} name={'Упражнение'} />

      <input
        required
        value={value1}
        className={classes.input}
        onChange={(e) => setValue1(e.target.value)}
      />
      <input
        required
        value={value2}
        className={classes.input}
        onChange={(e) => setValue2(e.target.value)}
      />
      <div className={classes.btnContainer}>
        <button
          onClick={addNewWord}>Add</button>
      </div>

      {words.length ? words.map((word, index) =>
        <div
          className={classes.wordsListContainer}
          key={word.id}
        >
          <div>{word.value1}</div>
          <div>{word.value2}</div>
          <svg
            onClick={() => DeleteTheWord(index)}
            xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
        </div>

      )
        : <div
          className={classes.noWords}
        >No words</div>
      }

    </div>
  );
}

export default App;
