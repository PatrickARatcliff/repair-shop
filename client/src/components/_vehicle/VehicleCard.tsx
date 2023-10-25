import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { findCustomerById } from '../../services/customerService';
import { useAuth } from '../../context/AuthProvider';

import Vehicle from '../../interfaces/Vehicle';
import DeleteConfirmModal from '../DeleteConfirmModal';

import { toast } from 'react-toastify';

import '../../styles/_vehicle/VehicleCard.css'

interface VehicleCardProps {
    vehicle: Vehicle;
    onDeleteClick: (vehicleId: number) => void;
    height: string;
}

function VehicleCard({ vehicle, onDeleteClick, height }: VehicleCardProps) {
    const [customerInfo, setCustomerInfo] = useState<string>('Loading...');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { user, setErrors } = useAuth();

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
            setErrors([`Error fetching customer details: ${error}`]);
            toast.error(`Error fetching customer details: ${error}`)
            setCustomerInfo('Error');
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = () => {
        onDeleteClick(vehicle.vehicleId);
        setShowDeleteModal(false);
    };

    return (
        <Card className="appointment-card" style={{ maxHeight: height }}>
            <Card.Header>
                <Card.Title className="card-title">Vehicle {vehicle && `ID: ${vehicle.vehicleId}`}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Make:</strong> {vehicle.vehicleMake}<br />
                    <strong>Model:</strong> {vehicle.vehicleModel}<br />
                    <strong>Year:</strong> {vehicle.vehicleYear}<br />
                    <strong>Customer:</strong> {customerInfo}<br />
                </Card.Text>
                <Button className="w-100" variant="danger" onClick={handleDeleteClick}>
                    <i className="bi bi-trash3"></i> Delete
                </Button>
            </Card.Body>
            <DeleteConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirmDelete={handleDeleteConfirmed}
                message={`Delete vehicle ${vehicle.vehicleMake} ${vehicle.vehicleModel} (${vehicle.vehicleYear})? This will delete all associated appointments!`}
            />
        </Card>
    );
}

export default VehicleCard;
