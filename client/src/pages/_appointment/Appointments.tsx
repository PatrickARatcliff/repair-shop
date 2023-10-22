import { useState, useEffect } from 'react';
import AppointmentTable from '../../components/_appointment/AppointmentTable';
import { Spinner, Button, Accordion, Form } from 'react-bootstrap';


import Appointment from "../../interfaces/Appointment";
import { saveAppointment, findAllAppointments } from '../../services/appointmentService';
import { useAuth } from "../../context/AuthProvider";
import FormErrors from "../../components/FormErrors";
import { sortDates } from "../../utils/formatDates";
import AppointmentForm from '../../components/_appointment/AppointmentForm';


function Appointments() {
    const { user, errors, setErrors, userData } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const userId = userData ? userData.userId : 0;
    const [newAppointment, setNewAppointment] = useState<Appointment>({
        appointmentId: 0,
        appointmentDate: new Date().toISOString().split('T')[0],
        vehicleId: 0,
        userId: userId,
    });
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const containerHeight = isAccordionOpen ? '58.5vh' : '80vh';

    const handleScheduleAppointmentClick = () => {
        setIsAccordionOpen((prevIsAccordionOpen) => !prevIsAccordionOpen);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedDate = newAppointment.appointmentDate;

        const newAppointmentWithDate: Appointment = {
            ...newAppointment,
            appointmentDate: formattedDate,
            userId: userId,
        };

        console.log(newAppointmentWithDate);

        saveAppointment(newAppointmentWithDate).then((savedAppointment: Appointment) => {
            const updatedAppointments = sortDates([...appointments, savedAppointment]);
            setAppointments(updatedAppointments.map(appointment => ({
                ...appointment,
                appointmentDate: appointment.appointmentDate
            })));
            setNewAppointment({
                appointmentId: 0,
                appointmentDate: new Date().toISOString().split('T')[0],
                vehicleId: 0,
                userId: userId,
            });
        });
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointments = await findAllAppointments();
                const sortedAppointments = sortDates(appointments);
                setAppointments(sortedAppointments.map(appointment => ({
                    ...appointment,
                    appointmentDate: appointment.appointmentDate
                })));
                setIsLoading(false);
            } catch (error) {
                setErrors([`Error fetching appointments: ${error}`]);
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);


    return (
        <div className="container mt-3">
            <Accordion activeKey={isAccordionOpen ? '0' : ''}>
                <Button
                    variant="success"
                    className="w-100"
                    onClick={handleScheduleAppointmentClick}
                    style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <i className="bi bi-calendar-plus"></i> Schedule Appointment
                </Button>
                <Accordion.Collapse eventKey="0">
                    <div className="accordion">
                        <AppointmentForm
                            newAppointment={newAppointment}
                            handleFormSubmit={handleFormSubmit}
                            setNewAppointment={setNewAppointment}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </div>
                </Accordion.Collapse>
            </Accordion>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <FormErrors errors={errors} />
                    <AppointmentTable appointments={appointments} height={containerHeight} />
                </div>
            )}
        </div>
    );
}

export default Appointments;
