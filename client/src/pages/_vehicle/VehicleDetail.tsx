import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Button, Accordion } from 'react-bootstrap';

import { findVehicleById, saveVehicle, deleteVehicleById } from '../../services/vehicleService';
import { useAuth } from "../../context/AuthProvider";

import Vehicle from '../../interfaces/Vehicle';
import VehicleForm from '../../components/_vehicle/VehicleForm';
import VehicleCard from '../../components/_vehicle/VehicleCard';

import '../../styles/_vehicle/VehicleDetail.css'

function VehicleDetail() {
    const { errors, setErrors, userData } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const userId = userData ? userData.userId : 0;
    const { vehicleId } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle>({
        vehicleId: 0,
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: 2023,
        customerId: 0,
    });
    const navigate = useNavigate();
    const containerHeight = isAccordionOpen ? '40vh' : '75vh';

    useEffect(() => {
        fetchVehicleDetails();
    }, [vehicleId]);

    const fetchVehicleDetails = async () => {
        try {
            const vehicleData = await findVehicleById(Number(vehicleId));
            setVehicle(vehicleData);
            setIsLoading(false);
        } catch (error) {
            setErrors([`Error fetching vehicle details: ${error}`]);
            setIsLoading(false);
        }
    };

    const handleEditVehicleClick = () => {
        setIsAccordionOpen(prevIsAccordionOpen => !prevIsAccordionOpen);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (vehicle) {
    
            setIsAccordionOpen(false);
    
            try {
                const errors = await saveVehicle(vehicle);
                if (!errors) {
                    await fetchVehicleDetails();
                } else {
                    console.log(errors);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    const handleDeleteVehicle = async (vehicleId: number) => {
        try {
            await deleteVehicleById(vehicleId);
            navigate("/vehicle");
        } catch (error) {
            setErrors([`Error deleting vehicle: ${error}`]);
        }
    };

    return (
        <div className="container mt-3 vehicle-detail-container">
            <Accordion activeKey={isAccordionOpen ? '0' : ''}>
                <Button
                    variant="warning"
                    className="w-100"
                    onClick={handleEditVehicleClick}
                    style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <i className="bi bi-pencil-square"></i> Edit Vehicle
                </Button>
                <Accordion.Collapse eventKey="0">
                    <div className="accordion">
                        {vehicle && (
                            <VehicleForm
                                newVehicle={vehicle}
                                handleFormSubmit={handleFormSubmit}
                                setNewVehicle={setVehicle}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        )}
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
                    {vehicle && (
                        <VehicleCard 
                            vehicle={vehicle}
                            onDeleteClick={handleDeleteVehicle}
                            height={containerHeight}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default VehicleDetail;
