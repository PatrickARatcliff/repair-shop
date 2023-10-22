import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import NavBar from "./components/NavBar"
import Landing from "./pages/Landing";
import Appointments from './pages/_appointment/Appointments';
import AppointmentDetail from './pages/_appointment/AppointmentDetail';
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
          <Route path="/appointment" element={<Appointments />} />
          <Route path="/appointment/:appointmentId" element={<AppointmentDetail />} />
        </Routes>
      </main>

    </Router>
  );
}

export default App;
