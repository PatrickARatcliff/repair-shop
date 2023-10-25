import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Vehicle from '../../interfaces/Vehicle';
import Customer from '../../interfaces/Customer';
import { findAllCustomers } from '../../services/customerService';
import '../../styles/_vehicle/VehicleForm.css';

import { toast } from 'react-toastify';

interface VehicleFormProps {
    newVehicle: Vehicle;
    handleFormSubmit: (e: React.FormEvent) => void;
    setNewVehicle: React.Dispatch<React.SetStateAction<Vehicle>>;
    errors: string[];
    setErrors: (newErrors: string[]) => void;
}

function VehicleForm({ newVehicle, handleFormSubmit, setNewVehicle, errors, setErrors }: VehicleFormProps) {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    const fetchAllCustomers = async () => {
        try {
            const allCustomers = await findAllCustomers();
            setCustomers(allCustomers);
        } catch (error) {
            setErrors([`Error fetching vehicles: ${error}`]);
            toast.error(`Error fetching vehicles: ${error}`)
        }
    };

    return (
        <div className="card mb-2 custom-card">
            <div className="card-body">
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formVehicle" className="mb-2">
                        <Form.Label>Make</Form.Label>
                        <Form.Control
                            type="text"
                            value={newVehicle.vehicleMake}
                            onChange={(e) =>
                                setNewVehicle({
                                    ...newVehicle,
                                    vehicleMake: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formVehicle" className="mb-2">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            type="text"
                            value={newVehicle.vehicleModel}
                            onChange={(e) =>
                                setNewVehicle({
                                    ...newVehicle,
                                    vehicleModel: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formVehicle" className="mb-2">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            type="number"
                            value={newVehicle.vehicleYear}
                            onChange={(e) =>
                                setNewVehicle({
                                    ...newVehicle,
                                    vehicleYear: parseInt(e.target.value),
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formVehicle" className="mb-2">
                        <Form.Label>Customer</Form.Label>
                        <Form.Select
                            value={newVehicle.customerId}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setNewVehicle({
                                    ...newVehicle,
                                    customerId: parseInt(e.target.value, 10),
                                })
                            }
                        >
                            <option value={0}>Select a customer</option>
                            {customers.map((customer) => (
                                <option key={customer.customerId} value={customer.customerId}>
                                    {`${customer.customerLastName}, ${customer.customerFirstName}`}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mt-2 w-100">
                        <i className="bi bi-box-arrow-up"></i> Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default VehicleForm;
