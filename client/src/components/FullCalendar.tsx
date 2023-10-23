import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { findAllAppointments } from '../services/appointmentService';
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
          right: `today${screenWidth > 1200 ? ',customToggle' : ''}`,
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
        const events = convertAppointmentsToEvents(appointmentsData);
        calendar.current.addEventSource(events);
      }
    } catch (error) {
      setErrors([`Error fetching or adding appointments: ${error}`]);
    }
  }

  function convertAppointmentsToEvents(appointmentsData: AppointmentData[]) {
    return appointmentsData.map(appointment => ({
      id: appointment.appointmentId.toString(),
      title: `Appointment #${appointment.appointmentId}`,
      start: appointment.appointmentDate,
      url: `/appointment/${appointment.appointmentId}`,
    }));
  }

  return <div className="calendar-container" ref={calendarEl}></div>;
};

export default FullCalendar;
