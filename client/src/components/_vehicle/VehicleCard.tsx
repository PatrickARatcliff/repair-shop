import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Vehicle from '../../interfaces/Vehicle';
import { findCustomerById } from '../../services/customerService';
import { useAuth } from '../../context/AuthProvider';

import '../../styles/_vehicle/VehicleCard.css'

interface VehicleCardProps {
    vehicle: Vehicle;
    onDeleteClick: (vehicleId: number) => void;
    height: string;
}

function VehicleCard({ vehicle, onDeleteClick, height }: VehicleCardProps) {
    const [customerInfo, setCustomerInfo] = useState<string>('Loading...');
    const { user } = useAuth();

    useEffect(() => {
        fetchCustomerInfo(vehicle);
    }, [vehicle]);

    const fetchCustomerInfo = async (vehicle: Vehicle) => {
        try {
            const customerData = await findCustomerById(vehicle.customerId);
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
        <Card className="appointment-card" style={{ maxHeight: height }}>
            <Card.Header>
                <Card.Title>Vehicle {vehicle && `ID: ${vehicle.vehicleId}`}</Card.Title>    
                </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Make:</strong> {vehicle.vehicleMake}<br />
                    <strong>Model:</strong> {vehicle.vehicleModel}<br />
                    <strong>Year:</strong> {vehicle.vehicleYear}<br />
                    <strong>Customer:</strong> {customerInfo}<br />
                </Card.Text>
                <Button className="w-100" variant="danger" onClick={() => onDeleteClick(vehicle.vehicleId)}>
                    <i className="bi bi-trash3"></i> Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default VehicleCard;
