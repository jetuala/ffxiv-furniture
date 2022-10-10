import './App.css';
import { React, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Global from './Context/Global';

function App() {
  return (
    <Global>
        <Router>
          <Routes>
              <Route path="/" element={<Homepage />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </Router>
    </Global>
  );
}

export default App;
