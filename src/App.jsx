import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; 


import Login from "./components/Login/Login"; 

import Register from "./components/Register/Register";




const App = () => {
  return (
    <Router>
      <main className="overflow-x-hidden">
     

       
        <Routes>
      
        
        
          <Route path="/login" element={<Login />} />
        
          <Route path="/register" element={<Register />} />
      

        </Routes>

      
      </main>
    </Router>
  );
};

export default App;
