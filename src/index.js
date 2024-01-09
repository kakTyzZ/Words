import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';
import Exercise from "./Pages/Exercise"
import WarmUp from './Components/WarmUp/WarmUp';
import { PicturesExercise } from './Components/PicturesExercise/PicturesExercise';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/exercise" element={<Exercise />} />
      <Route path="/warmup" element={<WarmUp />} />
      <Route path="/pictures" element={<PicturesExercise />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  </BrowserRouter>


);

