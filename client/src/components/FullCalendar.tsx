import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { findAllAppointments } from '../services/appointmentService';
import { findVehicleById } from '../services/vehicleService';
import { useAuth } from '../context/AuthProvider';
import AppointmentData from '../interfaces/AppointmentData';

import '../styles/FullCalendar.css';

const FullCalendar: React.FC = () => {
  const { setErrors } = useAuth();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentView, setCurrentView] = useState(screenWidth < 1200 ? 'listMonth' : 'dayGridMonth');
  const calendarEl = useRef<HTMLDivElement | null>(null);
  const calendar = useRef<Calendar | null>(null);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);

      setTimeout(() => {
        setCurrentView(newScreenWidth < 1200 ? 'listMonth' : 'dayGridMonth');
      });
    };
    window.addEventListener('resize', handleResize);

    if (calendarEl.current) {
      calendar.current = new Calendar(calendarEl.current, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: currentView,
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: `customToday${screenWidth > 1200 ? ',customToggle' : ''}`,
        },
        events: [],
        titleFormat: { month: 'short', year: '2-digit' },
        customButtons: {
          customToggle: {
            text: 'View',
            click: () => {
              const newView = currentView === 'listMonth' ? 'dayGridMonth' : 'listMonth';
              setCurrentView(newView);
            },
          },
          customToday: {
            text: 'Today',
            click: () => {
              if (calendar.current) {
                calendar.current.gotoDate(new Date());
              }
            },
          },
        },
      });

      calendar.current.render();

      fetchAndAddAllAppointments();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentView, screenWidth]);

  async function fetchAndAddAllAppointments() {
    try {
      const appointmentsData = await findAllAppointments();
      if (calendar.current) {
        const events = await convertAppointmentsToEvents(appointmentsData);
        calendar.current.addEventSource(events);
      }
    } catch (error) {
      setErrors([`Error fetching or adding appointments: ${error}`]);
    }
  }

  async function convertAppointmentsToEvents(appointmentsData: AppointmentData[]) {
    const events = [];

    for (const appointment of appointmentsData) {
      const vehicle = await findVehicleById(appointment.vehicleId);
      if (vehicle) {
        const title = `${vehicle.vehicleYear} ${vehicle.vehicleMake} ${vehicle.vehicleModel}`;
        events.push({
          id: appointment.appointmentId.toString(),
          title,
          start: appointment.appointmentDate,
          url: `/appointment/${appointment.appointmentId}`,
        });
      }
    }

    return events;
  }

  return <div className="calendar-container rounded" ref={calendarEl}></div>;
};

export default FullCalendar;
