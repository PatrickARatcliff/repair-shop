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
import Users from './pages/_user/Users';
import AppointmentDetail from './pages/_appointment/AppointmentDetail';
import VehicleDetail from './pages/_vehicle/VehicleDetail';
import CustomerDetail from './pages/_customer/CustomerDetail';
import UserDetail from './pages/_user/UserDetail';
import NotFound from './pages/NotFound';
import './App.css';

import Home from './pages/Home';

function App() {
  const { user, signedIn, isAdmin } = useAuth();

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
            <Route path="/appointment/*" element={signedIn ? <Appointments /> : <Landing />} />
            <Route path="/appointment/:appointmentId" element={<AppointmentDetail />} />
            <Route path="/vehicle/*" element={signedIn ? <Vehicles /> : <Landing />} />
            <Route path="/vehicle/:vehicleId" element={signedIn ? <VehicleDetail /> : <Landing />} />
            <Route path="/customer/*" element={signedIn ? <Customers /> : <Landing />} />
            <Route path="/customer/:customerId" element={signedIn ? <CustomerDetail /> : <Landing />} />
            <Route path="/user" element={isAdmin ? <Users /> : <Home />} />
            <Route path="/user/:userName" element={isAdmin ? <UserDetail /> : <Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
