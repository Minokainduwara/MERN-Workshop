import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import StudentCard from "./components/StudentCard";
import HomePage from "./pages/HomePage";

function App() {
  
  return (
    <div>
      <Routes>
          <Route path="/HomePage" element={<HomePage/>} />
      </Routes>
      <Routes>
          <Route path="/Students" element={<StudentCard/>} />
      </Routes>
    </div>
  );
}

export default App;