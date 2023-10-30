import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';
import Exercise from "./Pages/Exercise"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/exercise" element={<Exercise />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  </BrowserRouter>


);

