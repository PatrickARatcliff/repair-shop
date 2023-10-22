import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Button, Accordion } from 'react-bootstrap';
import FormErrors from '../../components/FormErrors';
import Appointment from '../../interfaces/Appointment';
import AppointmentForm from '../../components/_appointment/AppointmentForm';
import { findAppointmentById, saveAppointment, deleteAppointmentById } from '../../services/appointmentService';
import { useAuth } from "../../context/AuthProvider";
import '../../styles/_appointment/AppointmentForm.css';
import AppointmentCard from '../../components/_appointment/AppointmentCard';

function AppointmentDetail() {
    const { user, errors, setErrors, userData } = useAuth();
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
    const containerHeight = isAccordionOpen ? '53vh' : '80vh';

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
            setIsLoading(false);
        }
    };

    const handleEditAppointmentClick = () => {
        setIsAccordionOpen(prevIsAccordionOpen => !prevIsAccordionOpen);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (appointment) {
            const formattedDate = appointment.appointmentDate;

            const updatedAppointment = {
                ...appointment,
                appointmentDate: formattedDate,
                userId: userId,
            };

            setIsAccordionOpen(false);
            //  TODO: Error while saving appointment: SyntaxError: Unexpected end of JSON input Uncaught (in promise) SyntaxError: Unexpected end of JSON input
            saveAppointment(updatedAppointment).then((savedAppointment) => {
                fetchAppointmentDetails();
            });
        }
    };

    const handleDeleteAppointment = (appointmentId: number) => {
        deleteAppointmentById(appointmentId)
            .then(() => {
                // TODO: handle successful deletion, redirect or refresh
            })
            .catch((error) => {
                setErrors([`Error deleting appointment: ${error}`]);
            });
    };

    return (
        <div className="container mt-3">
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
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <FormErrors errors={errors} />
                    {appointment && (
                        <AppointmentCard
                            appointment={appointment}
                            onDeleteClick={handleDeleteAppointment}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default AppointmentDetail;
