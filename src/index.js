import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Exercise from "./Pages/Exercise"
import WarmUp from './Components/WarmUp/WarmUp';
import { PicturesExercise } from './Components/PicturesExercise/PicturesExercise';
import { Animation } from './Components/Animation/Animation';
import store from './Components/store/store';
import { Provider } from "react-redux"
import { Habr } from './Pages/Habr/Habr';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/warmup" element={<WarmUp />} />
        <Route path="/pictures" element={<PicturesExercise />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/habr" element={<Habr />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </BrowserRouter>
  </Provider>

);

