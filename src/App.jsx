import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ButtonGroup from "./components/button"; 
import Card from "./components/card";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to My App</h1>

      
        <nav>
          <ul>
            <li>
              <a href="/buttons">Buttons</a>
            </li>
            <li>
              <a href="/card">Card</a>
            </li>
          </ul>
        </nav>

       
        <Routes>
          <Route path="/buttons" element={<ButtonGroup />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
