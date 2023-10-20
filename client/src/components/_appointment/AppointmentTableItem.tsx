import React from 'react';
import Appointment from '../../interfaces/Appointment';
import formatDate from '../../utils/formatDate';
import Button from 'react-bootstrap/Button';

export default function AppointmentTableItem({ data }: { data: Appointment }) {

    const onInfoClick = () => {
        // Handle the Info button click
    }

    const onEditClick = () => {
        // Handle the Edit button click
    }

    const onDeleteClick = () => {
        // Handle the Delete button click
    }

    return (
        <tr>
            <td>{data.appointmentId}</td>
            <td>{formatDate(data.appointmentDate)}</td>
            <td>{data.vehicleId}</td>
            <td>{data.userId}</td>
            <td className="d-flex justify-content-end">
                <Button variant="info" className="me-1" onClick={onInfoClick}>
                    <i className="bi bi-info-circle"></i>
                </Button>
                <Button variant="warning" className="me-1" onClick={onEditClick}>
                    <i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="danger" onClick={onDeleteClick}>
                    <i className="bi bi-trash3"></i>
                </Button>

            </td>
        </tr>
    )
}
