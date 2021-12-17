import React from 'react';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./components/Home.js";
import Speech from "./components/Speech.js";
import Feedback from "./components/Feedback.js";

import "./style.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/speech" element={<Speech/>}/>
          <Route exact path="/feedback" element={<Feedback/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;