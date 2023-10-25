import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { findAllAppointments } from '../services/appointmentService';
import { findVehicleById } from '../services/vehicleService';
import { findCustomerById } from '../services/customerService';
import { useAuth } from '../context/AuthProvider';

import AppointmentData from '../interfaces/AppointmentData';

import { toast } from 'react-toastify';

import '../styles/FullCalendar.css';

interface EventData {
  id: string;
  title: string;
  start: string;
}

const FullCalendar: React.FC = () => {
  const { setErrors } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentView, setCurrentView] = useState(screenWidth < 1200 ? 'listMonth' : 'dayGridMonth');
  const calendarEl = useRef<HTMLDivElement | null>(null);
  const calendar = useRef<Calendar | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventsAndInitializeCalendar = async () => {
      try {
        const appointmentsData = await findAllAppointments();
        const events = await convertAppointmentsToEvents(appointmentsData);
        setEvents(events);

        if (calendarEl.current) {
          calendar.current = new Calendar(calendarEl.current, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
            initialView: currentView,
            headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: `customToday${window.innerWidth > 1200 ? ',customToggle' : ''}`,
            },
            events: events,
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
            eventClick: (eventInfo) => {
              const appointmentId = eventInfo.event.id;
              navigate(`/appointment/${appointmentId}`);
            },
            eventClassNames: 'event-pointer',
          });

          calendar.current.render();
        }
      } catch (error) {
        setErrors([`Error fetching or adding appointments: ${error}`]);
        toast.error(`Error fetching or adding appointments: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    setScreenWidth(window.innerWidth);
    fetchEventsAndInitializeCalendar();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentView, setErrors, navigate]);

  const handleResize = () => {
    const newView = window.innerWidth < 1200 ? 'listMonth' : 'dayGridMonth';
    setCurrentView(newView);
  };

  async function convertAppointmentsToEvents(appointmentsData: AppointmentData[]) {
    const newEvents = [];

    for (const appointment of appointmentsData) {
      const vehicle = await findVehicleById(appointment.vehicleId);
      const customer = await findCustomerById(vehicle.customerId);
      if (vehicle) {
        const title = customer.important
          ? (`\u2605 ${vehicle.vehicleYear} ${vehicle.vehicleMake} ${vehicle.vehicleModel}`) : `${vehicle.vehicleYear} ${vehicle.vehicleMake} ${vehicle.vehicleModel}`;

        newEvents.push({
          id: appointment.appointmentId.toString(),
          title: titleToString(title),
          start: appointment.appointmentDate,
        });
      }
    }

    return newEvents;
  }

  function titleToString(title: JSX.Element | string): string {
    if (typeof title === 'string') {
      return title;
    }
    return title.props.children as string;
  }

  return (
    <div className="calendar-container rounded" >
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div ref={calendarEl} className="calendar-content">
        </div>
      )}
    </div>
  );
};

export default FullCalendar;
