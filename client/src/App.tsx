import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";

import NavBar from "./components/NavBar"
import Landing from "./pages/Landing";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main className="container">
      <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>

    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
