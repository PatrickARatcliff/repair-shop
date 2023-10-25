import { useState, useEffect } from 'react';
import { Spinner, Button, Accordion } from 'react-bootstrap';

import { saveVehicle, findAllVehicles, deleteVehicleById } from '../../services/vehicleService';
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from 'react-router-dom';

import Vehicle from "../../interfaces/Vehicle";
import VehicleTable from '../../components/_vehicle/VehicleTable';
import VehicleForm from '../../components/_vehicle/VehicleForm';

import '../../styles/_vehicle/Vehicles.css'


function Vehicles() {
    const { signedIn, errors, setErrors, userData } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const userId = userData ? userData.userId : 0;
    const [newVehicle, setNewVehicle] = useState<Vehicle>({
        vehicleId: 0,
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: 2023,
        customerId: 0,
    });
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const containerHeight = isAccordionOpen ? '38vh' : '75vh';
    const navigate = useNavigate();

    if (!signedIn) {
        navigate("/")
    }

    const handleAddVehicleClick = () => {
        setIsAccordionOpen((prevIsAccordionOpen) => !prevIsAccordionOpen);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(newVehicle);

        saveVehicle(newVehicle).then((savedVehicle: Vehicle) => {
            const updatedVehicles = [...vehicles, savedVehicle];
            setVehicles(updatedVehicles);
            setNewVehicle({
                vehicleId: 0,
                vehicleMake: "",
                vehicleModel: "",
                vehicleYear: 2023,
                customerId: 0,
            });
        });
    };

    const handleDelete = async (vehicleId: number) => {
        try {
            await deleteVehicleById(vehicleId);
            const updatedVehicles = vehicles.filter(vehicle => vehicle.vehicleId !== vehicleId);
            setVehicles(updatedVehicles);
        } catch (error) {
            setErrors([`Error deleting vehicle: ${error}`]);
        } finally {
            setShowDeleteModal(false);
        }
    }

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const vehicles = await findAllVehicles();
                setVehicles(vehicles);
                setIsLoading(false);
            } catch (error) {
                setErrors([`Error fetching appointments: ${error}`]);
                setIsLoading(false);
            }
        };

        fetchVehicles();
    }, []);


    return (
        <div className="container mt-3 vehicle-container">
            <Accordion activeKey={isAccordionOpen ? '0' : ''}>
                <Button
                    variant="success"
                    className="w-100"
                    onClick={handleAddVehicleClick}
                    style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <i className="bi bi-plus-square"></i> Add New Vehicle
                </Button>
                <Accordion.Collapse eventKey="0">
                    <div className="accordion">
                        <VehicleForm
                            newVehicle={newVehicle}
                            handleFormSubmit={handleFormSubmit}
                            setNewVehicle={setNewVehicle}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </div>
                </Accordion.Collapse>
            </Accordion>
            {isLoading ? (
                <div className="container mt-3 spinner-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <VehicleTable
                        vehicles={vehicles}
                        height={containerHeight}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
}

export default Vehicles;
