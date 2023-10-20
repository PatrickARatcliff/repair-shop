import { useEffect, useState } from 'react';
import {
    findAllAppointments,
    deleteById,
} from '../../services/appointmentService';
import Appointment from '../../interfaces/Appointment';
import formatDate from '../../utils/formatDate';
import AppointmentTableItem from "./AppointmentTableItem"

import Table from 'react-bootstrap/Table';

export default function AppointmentTable() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        findAllAppointments()
            .then((data) => {
                setAppointments(data);
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error);
            });
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Vehicle ID</th>
                        <th>User ID</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <AppointmentTableItem key={appointment.appointmentId} data={appointment} />
                    ))}
                </tbody>
            </Table>
        </>
    )
}