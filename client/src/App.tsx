import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

import NavBar from "./components/NavBar"
import Landing from "./pages/Landing";
import Appointments from './pages/_appointment/Appointments';
import Vehicles from './pages/_vehicle/Vehicles'
import Customers from './pages/_customer/Customers';
import AppointmentDetail from './pages/_appointment/AppointmentDetail';
import VehicleDetail from './pages/_vehicle/VehicleDetail';
import CustomerDetail from './pages/_customer/CustomerDetail';
import './App.css';

import Home from './pages/Home';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="background-scroll-container">
        <div className="background-scroll" />
      
      <header>
        <NavBar />
      </header>
      <main className="container main-container mt-3 rounded">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Landing />} />
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointments />} />
          <Route path="/appointment/:appointmentId" element={<AppointmentDetail />} />
          <Route path="/vehicle" element={<Vehicles />} />
          <Route path="/vehicle/:vehicleId" element={<VehicleDetail />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/customer/:customerId" element={<CustomerDetail />} />
        </Routes>
      </main>
      </div>
    </Router>
  );
}

export default App;
