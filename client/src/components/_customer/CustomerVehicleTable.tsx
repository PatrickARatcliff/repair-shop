import { deleteVehicleById } from '../../services/vehicleService';
import { useAuth } from '../../context/AuthProvider';

import Vehicle from '../../interfaces/Vehicle';
import CustomerVehicleTableItem from './CustomerVehicleTableItem';
import Table from 'react-bootstrap/Table';

import { toast } from 'react-toastify';

import '../../styles/_vehicle/VehicleTable.css';

interface CustomerVehicleTableProps {
    data: Vehicle[];
    setVehicleInfo: (vehicles: Vehicle[]) => void;
}

export default function CustomerVehicleTable({ data, setVehicleInfo }: CustomerVehicleTableProps) {

    const handleDelete = async (vehicleId: number) => {
        try {
            await deleteVehicleById(vehicleId);
            const updatedVehicles = data.filter(vehicle => vehicle.vehicleId !== vehicleId);
            setVehicleInfo(updatedVehicles);
        } catch (error) {
            toast.error(`Error deleting vehicle: ${error}`);
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th colSpan={4}>Customer Vehicles</th>
                </tr>
                <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? (
                    data.map((vehicle) => (
                        <CustomerVehicleTableItem
                            key={vehicle.vehicleId}
                            data={vehicle}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan={4}>No vehicles found</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

