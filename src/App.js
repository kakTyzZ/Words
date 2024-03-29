import classes from "./App.module.css"
import { useEffect, useState } from 'react'
import NavBar from './Components/NavBar/NavBar';
import Boxes from "./Components/Divs/Boxes";
import { useSelector } from "react-redux";

function App() {

  const [words, setWords] = useState([])
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')

  useEffect(() => {

    let myWords = JSON.parse(localStorage.getItem('words'))

    if (myWords) {
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


  function DeleteTheWord(index) {
    if (words.length > 1) {
      setWords(words.filter((elem) => elem.id !== index))
    }
    if (words.length === 1) {
      setWords([])
    }
  }




  return (
    <div className={classes.app}>
      <NavBar path={["/exercise", '/warmup', "/pictures"]} name={['Упражнение', 'Разминка', "Картинки"]} />
      <Boxes numberOfBoxes={24 + (words.length ? words.length * 3 : 0)} />
      <div
        className={classes.inputContainer}
      >
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




    </div>
  );
}

export default App;
