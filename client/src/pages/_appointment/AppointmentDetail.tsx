import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Button, Accordion } from 'react-bootstrap';

import { findAppointmentById, saveAppointment, deleteAppointmentById } from '../../services/appointmentService';
import { useAuth } from "../../context/AuthProvider";

import Appointment from '../../interfaces/Appointment';
import AppointmentForm from '../../components/_appointment/AppointmentForm';
import AppointmentCard from '../../components/_appointment/AppointmentCard';

import { toast } from 'react-toastify';

import '../../styles/_appointment/AppointmentDetail.css'

function AppointmentDetail() {
    const { signedIn, user, errors, setErrors, userData } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const userId = userData ? userData.userId : 0;
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState<Appointment>({
        appointmentId: 0,
        appointmentDate: new Date().toISOString().split('T')[0],
        vehicleId: 0,
        userId: userId,
    });
    const navigate = useNavigate();
    const containerHeight = isAccordionOpen ? '46vh' : '75vh';

    if (!signedIn) {
        navigate("/")
    };

    useEffect(() => {
        fetchAppointmentDetails();
    }, [appointmentId]);

    const fetchAppointmentDetails = async () => {
        try {
            const appointmentData = await findAppointmentById(Number(appointmentId));
            setAppointment(appointmentData);
            setIsLoading(false);
        } catch (error) {
            setErrors([`Error fetching appointment details: ${error}`]);
            toast.error(`Error fetching appointment details: ${error}`);
            setIsLoading(false);
        }
    };

    const handleEditAppointmentClick = () => {
        setIsAccordionOpen(prevIsAccordionOpen => !prevIsAccordionOpen);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (appointment) {
            const formattedDate = appointment.appointmentDate;

            const updatedAppointment = {
                ...appointment,
                appointmentDate: formattedDate,
                userId: userId,
            };

            try {
                const errors = await saveAppointment(updatedAppointment);
                if (errors === null) {
                    await fetchAppointmentDetails();
                    setIsAccordionOpen(false);
                } else {
                    setErrors([errors]);
                    toast.error(errors);
                }
            } catch (error) {
                setErrors([`${error}`]);
                toast.error(`${error}`);
            }
        }
    };

    const handleDeleteAppointment = async (appointmentId: number) => {
        try {
            await deleteAppointmentById(appointmentId);
            navigate("/appointment");
        } catch (error) {
            setErrors([`Error deleting appointment: ${error}`]);
        }
    };

    return (
        <>
            <section aria-label='page for managing appointment detail'>
                <div className="container mt-3 appointment-detail-container">
                    <Accordion activeKey={isAccordionOpen ? '0' : ''}>
                        <Button
                            variant="warning"
                            className="w-100"
                            onClick={handleEditAppointmentClick}
                            style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                        >
                            <i className="bi bi-pencil-square"></i> Edit Appointment
                        </Button>
                        <Accordion.Collapse eventKey="0">
                            <div className="accordion">
                                {appointment && (
                                    <AppointmentForm
                                        newAppointment={appointment}
                                        handleFormSubmit={handleFormSubmit}
                                        setNewAppointment={setAppointment}
                                        errors={errors}
                                        setErrors={setErrors}
                                    />
                                )}
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
                            {appointment && (
                                <AppointmentCard
                                    appointment={appointment}
                                    onDeleteClick={handleDeleteAppointment}
                                    height={containerHeight}
                                />
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default AppointmentDetail;
