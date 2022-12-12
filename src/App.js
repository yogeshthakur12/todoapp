

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Task from './pages/Task';
import Users from './pages/Users';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/task" element={<Task />} />
          <Route path="/user" element={<Users />} />
          
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
