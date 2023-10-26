import { useState, useEffect } from 'react';
import { Spinner, Button, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { saveAppointment, findAllAppointments } from '../../services/appointmentService';
import { useAuth } from "../../context/AuthProvider";
import { deleteAppointmentById } from '../../services/appointmentService';
import { sortDates } from "../../utils/formatDates";

import Appointment from "../../interfaces/Appointment";
import AppointmentTable from '../../components/_appointment/AppointmentTable';
import AppointmentForm from '../../components/_appointment/AppointmentForm';

import { toast } from 'react-toastify';

import '../../styles/_appointment/Appointments.css';


function Appointments() {
    const { signedIn, errors, setErrors, userData } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const userId = userData ? userData.userId : 0;
    const [newAppointment, setNewAppointment] = useState<Appointment>({
        appointmentId: 0,
        appointmentDate: new Date().toISOString().split('T')[0],
        vehicleId: 0,
        userId: userId,
    });
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const containerHeight = isAccordionOpen ? '46vh' : '75vh';
    const navigate = useNavigate();

    if (!signedIn) {
        navigate("/")
    };

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

        const saveAppointmentAsync = async (newAppointmentWithDate: Appointment) => {
            try {
                const errors = await saveAppointment(newAppointmentWithDate);
                if (errors === null) {

                    setNewAppointment({
                        appointmentId: 0,
                        appointmentDate: new Date().toISOString().split('T')[0],
                        vehicleId: 0,
                        userId: userId,
                    });
                    setIsAccordionOpen(false);
                } else {
                    toast.error("failed to create");
                }
            } catch (error) {
                toast.error(`An error occurred: ${error}`);
            }
        };
        saveAppointmentAsync(newAppointmentWithDate);

    };

    const handleDelete = async (appointmentId: number) => {
        try {
            await deleteAppointmentById(appointmentId);
            const updatedAppointments = appointments.filter(appointment => appointment.appointmentId !== appointmentId);
            setAppointments(updatedAppointments);
        } catch (error) {
            setErrors([`Error deleting appointment: ${error}`]);
            toast.error(`Error deleting appointment: ${error}`);
        } finally {
            setShowDeleteModal(false);
        }
    }


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
                toast.error(`Error fetching appointments: ${error}`);
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [isAccordionOpen]);


    return (
        <>
            <section aria-label='page for managing appointments'>
                <div className="container mt-3 appointment-container">
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
                        <div className="container mt-3 spinner-container">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <div>
                            <AppointmentTable
                                appointments={appointments}
                                height={containerHeight}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Appointments;
