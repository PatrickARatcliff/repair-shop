import React, { useEffect, useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import Customer from '../../interfaces/Customer';
import Vehicle from '../../interfaces/Vehicle';
import CustomerVehicleTable from '../_customer/CustomerVehicleTable';
import { findVehiclesByCustomerId } from '../../services/vehicleService';
import { saveCustomer } from '../../services/customerService';

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
            console.error("Error fetching vehicle details:", error);
        }
    }

    const handleUpdateCustomer = async (newIsImportant: boolean) => {
        const updatedCustomer = { ...customer, important: newIsImportant };

        try {
            await saveCustomer(updatedCustomer);
            setIsImportant(newIsImportant);
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    }

    const handleStarClick = () => {
        if (isImportant) {
            handleUpdateCustomer(false);
        } else {
            handleUpdateCustomer(true);
        }
    }

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
                <CustomerVehicleTable data={vehicleInfo} />
                <Button className="w-100" variant="danger" onClick={() => onDeleteClick(customer.customerId)}>
                    <i className="bi bi-trash3"></i> Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default CustomerCard;
