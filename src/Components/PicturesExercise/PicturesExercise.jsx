import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import classes from "./PicturesExercise.module.css";
import Boxes from "../Divs/Boxes";
import { PicturesProgressBar } from "./PicturesProgressBar";

export function PicturesExercise() {
  const randomWordsUrl = `https://random-word-api.herokuapp.com/word?number=3`;
  const [words, setWords] = useState([]);
  const [success, setSuccess] = useState(0);
  const [pictureUrl, setPictureUrl] = useState("");
  const [threeRandomWords, setThreeRandomWords] = useState([]);
  const [randomPictures, setRandomPictures] = useState([]);

  const inputRef = useRef(null);
  const imgRef = useRef(null);

  const myKey = "875addf3b97c4dfd32b668927bb4bda3";
  let myPrompt;
  try {
    myPrompt =
      words.length > 0 && success < words.length ? words[success].value1 : "";
  } catch (error) {}

  function wordsClick(e, answerWord) {
    const input = inputRef.current;
    input.className = classes.answerInput + " " + classes.animation__class;
    setTimeout(() => {
      input.className = classes.answerInput;
    }, 1500);
    if (e.target.name === "right") {
      input.value = words[success].value1;
    } else {
      input.value = answerWord;
    }
  }
  function picturesClick(answerUrl) {
    const imgcontainer = imgRef.current;
    imgcontainer.className = classes.animation__class;
    setTimeout(() => {
      imgcontainer.className = "";
    }, 1500);
    imgcontainer.src = answerUrl;
  }

  function onCheckAnswer() {
    const input = inputRef.current;
    const imgcontainer = imgRef.current;
    if (
      input.value === words[success].value1 &&
      imgcontainer.src === pictureUrl
    ) {
      setSuccess((prev) => prev + 1);

      ifRightAnswer();
    } else {
      ifWrongAnswer();
    }
  }

  function ifRightAnswer() {
    const imgcontainer = imgRef.current;
    const input = inputRef.current;

    input.className = classes.asnwerInputRight;
    imgcontainer.className = classes.imgRight;
    setTimeout(() => {
      input.value = "";
      input.className = classes.answerInput;
      imgcontainer.className = "";
      imgcontainer.src =
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    }, 1500);
  }

  function ifWrongAnswer() {
    if (imgRef.current && inputRef.current) {
      const imgcontainer = imgRef.current;
      const input = inputRef.current;
      input.className = classes.asnwerInputWrong;
      imgcontainer.className = classes.imgWrong;
      setTimeout(() => {
        input.value = "";
        input.className = classes.answerInput;
        imgcontainer.className = "";
        imgcontainer.src =
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      }, 2000);
    }
  }

  useEffect(() => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myKey}&text=${myPrompt}&page=1&per_page=1&format=json&nojsoncallback=1`;
    const randomPicUrls = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${myKey}&page=1&per_page=3&format=json&nojsoncallback=1`;
    const apiUrl = url;
    if (myPrompt !== "") {
      axios.get(apiUrl).then((resp) => {
        const myresp = resp.data;
        const photo = myresp.photos.photo;

        const photoUrl = `https://live.staticflickr.com/${photo[0].server}/${photo[0].id}_${photo[0].secret}_w.jpg`;

        setPictureUrl(photoUrl);
      });
    }
    if (myPrompt !== "") {
      axios.get(randomPicUrls).then((resp) => {
        const dataRecieved = resp.data.photos.photo;
        if (randomPictures.length >= 2) {
          setRandomPictures([]);
        }
        dataRecieved.map((photo) => {
          const picture = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;

          setRandomPictures((prev) => [...prev, picture]);
        });
      });
    }

    axios
      .get(`https://random-word-api.herokuapp.com/word?number=3`)
      .then((response) => {
        setThreeRandomWords(response.data);
      });
  }, [setPictureUrl, success, myPrompt]);

  useEffect(() => {
    let myWords = JSON.parse(localStorage.getItem("words"));
    if (myWords) {
      setWords(myWords);
    }
  }, []);

  return (
    <div className={classes.picturesMainContainer}>
      <PicturesProgressBar words={words} success={success} />
      <Boxes numberOfBoxes={36} />
      <NavBar path={["/"]} name={["Главная страница"]} />
      {(success === words.length) | (success > words.length) ? (
        <div className={classes.noWords}>No words</div>
      ) : (
        <div className={classes.mainContainer}>
          <div className={classes.userAnswerContainer}>
            <img
              ref={imgRef}
              src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              alt=""
            />
            <div className={classes.randomWord}>
              {words.length > 0 ? words[success].value2 : ""}
            </div>
            <input className={classes.answerInput} ref={inputRef} readOnly />
            <button onClick={onCheckAnswer}>Check it</button>
          </div>

          <div className={classes.answerContainer}>
            <div className={classes.answerContainer__words}>
              <button
                name="right"
                className={classes.randomWord}
                onClick={(e) => wordsClick(e)}
              >
                {words.length > 0 ? words[success].value1 : ""}
              </button>
              {threeRandomWords.map((item) => (
                <button
                  className={classes.randomWord}
                  key={item}
                  onClick={(e) => wordsClick(e, item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className={classes.imageContainer}>
              <button onClick={() => picturesClick(pictureUrl)}>
                <img
                  src={pictureUrl}
                  alt=""
                  className={classes.imageContainer__img}
                />
              </button>

              {randomPictures.map((item) => (
                <button key={item} onClick={() => picturesClick(item)}>
                  <img
                    src={item}
                    alt=""
                    className={classes.imageContainer__img}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
