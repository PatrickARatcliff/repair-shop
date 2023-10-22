import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Appointment from '../../interfaces/Appointment';
import Vehicle from '../../interfaces/Vehicle';
import Customer from '../../interfaces/Customer';
import { findAllVehicles } from '../../services/vehicleService';
import { findCustomerById } from '../../services/customerService';
import '../../styles/_appointment/AppointmentForm.css';

interface AppointmentFormProps {
    newAppointment: Appointment;
    handleFormSubmit: (e: React.FormEvent) => void;
    setNewAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
    errors: string[];
    setErrors: (newErrors: string[]) => void;
}

function AppointmentForm({ newAppointment, handleFormSubmit, setNewAppointment, errors, setErrors }: AppointmentFormProps) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [vehicleCustomers, setVehicleCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchAllVehicles();
    }, []);

    const fetchAllVehicles = async () => {
        try {
            const allVehicles = await findAllVehicles();
            setVehicles(allVehicles);
            fetchVehicleCustomers(allVehicles);
        } catch (error) {
            setErrors([`Error fetching vehicles: ${error}`]);
        }
    };

    const fetchVehicleCustomers = (vehicles: Vehicle[]) => {
        const customerPromises = vehicles.map((vehicle) => {
            return findCustomerById(vehicle.customerId);
        });

        Promise.all(customerPromises)
            .then((customerData) => {
                setVehicleCustomers(customerData);
            })
            .catch((error) => {
                setErrors([`Error fetching vehicle customers: ${error}`]);
            });
    };

    return (
        <div className="card mb-2 custom-card">
            <div className="card-body">
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formDate" className="mb-2">
                        <Form.Label>Appointment Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={newAppointment.appointmentDate}
                            onChange={(e) =>
                                setNewAppointment({
                                    ...newAppointment,
                                    appointmentDate: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formVehicle" className="mb-2">
                        <Form.Label>Vehicle</Form.Label>
                        <Form.Select
                            value={newAppointment.vehicleId}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setNewAppointment({
                                    ...newAppointment,
                                    vehicleId: parseInt(e.target.value, 10),
                                })
                            }
                        >
                            <option value={0}>Select a vehicle</option>
                            {vehicles.map((vehicle) => (
                                <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                                    {`${vehicle.vehicleYear} ${vehicle.vehicleMake} ${vehicle.vehicleModel} | ${getCustomerName(vehicle.customerId)}`}
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

    function getCustomerName(customerId: number) {
        const customer = vehicleCustomers.find((customer) => customer.customerId === customerId);
        return customer ? `${customer.customerLastName}, ${customer.customerFirstName}` : 'Customer not found';
    }
}

export default AppointmentForm;
