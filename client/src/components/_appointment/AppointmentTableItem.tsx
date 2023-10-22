import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Appointment from '../../interfaces/Appointment';
import { formatDateString } from '../../utils/formatDates';
import Button from 'react-bootstrap/Button';
import { findVehicleById } from '../../services/vehicleService';
import { findCustomerById } from '../../services/customerService';
import { deleteAppointmentById } from '../../services/appointmentService';

export default function AppointmentTableItem({ data }: { data: Appointment }) {
    const [vehicleInfo, setVehicleInfo] = useState<string>('Loading...');
    const [customerInfo, setCustomerInfo] = useState<string>('Loading...');
    const navigate = useNavigate();

    useEffect(() => {
        fetchVehicleInfo(data.vehicleId);
    }, [data.vehicleId]);

    const onInfoClick = () => {
        navigate(`/appointment/${data.appointmentId}`);
    }

    const onDeleteClick = () => {
        console.log("Implement delete for appointmentId:", data.appointmentId);
    }

    const fetchVehicleInfo = async (vehicleId: number) => {
        try {
            const vehicleData = await findVehicleById(vehicleId);
            if (vehicleData) {
                const vehicleDetails = `${vehicleData.vehicleYear} ${vehicleData.vehicleMake} ${vehicleData.vehicleModel}`;
                setVehicleInfo(vehicleDetails);

                fetchCustomerInfo(vehicleData.customerId);
            } else {
                setVehicleInfo('Vehicle not found');
            }
        } catch (error) {
            console.error("Error fetching vehicle details:", error);
            setVehicleInfo('Error');
        }
    }

    const fetchCustomerInfo = async (customerId: number) => {
        try {
            const customerData = await findCustomerById(customerId);
            if (customerData) {
                const customerDetails = `${customerData.customerLastName}, ${customerData.customerFirstName}`;
                setCustomerInfo(customerDetails);
            } else {
                setCustomerInfo('Customer not found');
            }
        } catch (error) {
            console.error("Error fetching customer details:", error);
            setCustomerInfo('Error');
        }
    }

    return (
        <tr>
            <td>{formatDateString(data.appointmentDate)}</td>
            <td>{vehicleInfo}</td>
            <td>{customerInfo}</td>
            <td className="d-flex justify-content-end">
                <Button variant="info" className="me-1" onClick={onInfoClick}>
                    <i className="bi bi-info-circle"></i>
                </Button>
                <Button variant="danger" onClick={onDeleteClick}>
                    <i className="bi bi-trash3"></i>
                </Button>
            </td>
        </tr>
    );
}
