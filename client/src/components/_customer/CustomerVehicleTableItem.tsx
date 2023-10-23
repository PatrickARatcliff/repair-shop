import { useNavigate } from 'react-router-dom';
import Vehicle from '../../interfaces/Vehicle';
import Button from 'react-bootstrap/Button';
import { deleteVehicleById } from '../../services/vehicleService';

export default function CustomerVehicleTableItem({ data }: { data: Vehicle }) {
    const navigate = useNavigate();

    const onInfoClick = () => {
        navigate(`/vehicle/${data.vehicleId}`);
    }

    const onDeleteClick = () => {
        console.log("Implement delete for vehicleId:", data.vehicleId);
    }

    return (
        <tr>
            <td>{data.vehicleMake}</td>
            <td>{data.vehicleModel}</td>
            <td>{data.vehicleYear}</td>
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
