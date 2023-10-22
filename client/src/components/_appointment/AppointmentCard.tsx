import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Appointment from '../../interfaces/Appointment';
import { findVehicleById } from '../../services/vehicleService';
import { findCustomerById } from '../../services/customerService';
import { useAuth } from '../../context/AuthProvider';
import { formatDateString } from '../../utils/formatDates'

import '../../styles/_appointment/AppointmentCard.css'

interface AppointmentCardProps {
    appointment: Appointment;
    onDeleteClick: (appointmentId: number) => void;
}

function AppointmentCard({ appointment, onDeleteClick }: AppointmentCardProps) {
    const [vehicleInfo, setVehicleInfo] = useState<string>('Loading...');
    const [customerInfo, setCustomerInfo] = useState<string>('Loading...');
    const { user } = useAuth();

    useEffect(() => {
        fetchVehicleAndCustomerInfo(appointment);
    }, [appointment]);

    const fetchVehicleAndCustomerInfo = async (appointment: Appointment) => {
        try {
            const vehicleData = await findVehicleById(appointment.vehicleId);
            if (vehicleData) {
                const vehicleDetails = `${vehicleData.vehicleYear} ${vehicleData.vehicleMake} ${vehicleData.vehicleModel}`;
                setVehicleInfo(vehicleDetails);

                const customerData = await findCustomerById(vehicleData.customerId);
                if (customerData) {
                    const customerDetails = `${customerData.customerLastName}, ${customerData.customerFirstName}`;
                    setCustomerInfo(customerDetails);
                } else {
                    setCustomerInfo('Customer not found');
                }
            } else {
                setVehicleInfo('Vehicle not found');
            }
        } catch (error) {
            console.error("Error fetching vehicle or customer details:", error);
            setVehicleInfo('Error');
            setCustomerInfo('Error');
        }
    }

    return (
        <Card className="appointment-card">
            <Card.Header>
                <Card.Title>Appointment {appointment && `ID: ${appointment.appointmentId}`}</Card.Title>    
                </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Date:</strong> {formatDateString(appointment.appointmentDate)}<br />
                    <strong>Vehicle:</strong> {vehicleInfo}<br />
                    <strong>Customer:</strong> {customerInfo}<br />
                    {user && (
                        <>
                            <strong>Scheduled By:</strong> {user.username}<br />
                        </>
                    )}
                </Card.Text>
                <Button className="w-100" variant="danger" onClick={() => onDeleteClick(appointment.appointmentId)}>
                    <i className="bi bi-trash3"></i> Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default AppointmentCard;
