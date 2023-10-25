import { useEffect, useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';

import { findVehiclesByCustomerId } from '../../services/vehicleService';
import { saveCustomer } from '../../services/customerService';

import Customer from '../../interfaces/Customer';
import Vehicle from '../../interfaces/Vehicle';
import CustomerVehicleTable from '../_customer/CustomerVehicleTable';
import DeleteConfirmModal from '../DeleteConfirmModal';

import { toast } from 'react-toastify';

import '../../styles/_customer/CustomerCard.css';

interface CustomerCardProps {
    customer: Customer;
    onDeleteClick: (customerId: number) => void;
    height: string;
}

function CustomerCard({ customer, onDeleteClick, height }: CustomerCardProps) {
    const [vehicleInfo, setVehicleInfo] = useState<Vehicle[]>([]);
    const [isImportant, setIsImportant] = useState(customer.important);
    const starRef = useRef<HTMLSpanElement | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchVehicleInfo(customer);
    }, [customer]);

    const fetchVehicleInfo = async (customer: Customer) => {
        try {
            const vehicles = await findVehiclesByCustomerId(customer.customerId);
            if (vehicles) {
                setVehicleInfo(vehicles);
            }
        } catch (error) {
            toast.error(`Error fetching vehicle details: ${error}`);
        }
    }

    const handleUpdateCustomer = async (newIsImportant: boolean) => {
        const updatedCustomer = { ...customer, important: newIsImportant };

        try {
            await saveCustomer(updatedCustomer);
            setIsImportant(newIsImportant);
        } catch (error) {
            toast.error(`Error updating customer: ${error}`);
        }
    }

    const handleStarClick = () => {
        if (isImportant) {
            handleUpdateCustomer(false);
        } else {
            handleUpdateCustomer(true);
        }
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = () => {
        onDeleteClick(customer.customerId);
        setShowDeleteModal(false);
    };

    return (
        <Card className="appointment-card" style={{ maxHeight: height }}>
            <Card.Header>
                <div className="d-flex justify-content-between">
                    <Card.Title className="mb-0">
                        Customer {customer && `ID: ${customer.customerId}`}
                    </Card.Title>
                    <span className="star-checkbox" onClick={handleStarClick} ref={starRef}>
                        {isImportant ? (
                            <i className="bi bi-star-fill text-warning star-icon"></i>
                        ) : (
                            <i className="bi bi-star star-icon"></i>
                        )}
                    </span>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>First:</strong> {customer.customerFirstName}<br />
                    <strong>Last:</strong> {customer.customerLastName}<br />
                    <strong>Phone:</strong> {customer.customerPhone}<br />
                    <strong>Email:</strong> {customer.customerEmail}<br />
                </Card.Text>
                <CustomerVehicleTable 
                data={vehicleInfo} 
                setVehicleInfo={setVehicleInfo}
                />
                <Button className="w-100" variant="danger" onClick={handleDeleteClick}>
                    <i className="bi bi-trash3"></i> Delete
                </Button>
            </Card.Body>
            <DeleteConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirmDelete={handleDeleteConfirmed}
                message={`Delete appointment for ${customer.customerLastName}, ${customer.customerFirstName}? This will delete all associated vehicles and appointments!`}
            />
        </Card>
    );
}

export default CustomerCard;
