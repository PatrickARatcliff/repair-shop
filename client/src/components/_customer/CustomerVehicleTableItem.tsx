import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Vehicle from '../../interfaces/Vehicle';
import Button from 'react-bootstrap/Button';
import DeleteConfirmModal from '../DeleteConfirmModal';

interface CustomerVehicleTableItemProps {
    data: Vehicle;
    handleDelete: (vehicleId: number) => void;
  }

  export default function CustomerVehicleTableItem({ data, handleDelete }: CustomerVehicleTableItemProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    const onInfoClick = () => {
        navigate(`/vehicle/${data.vehicleId}`);
    }

    const onDeleteClick = () => {
        setShowDeleteModal(true);
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
                <DeleteConfirmModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onConfirmDelete={() => handleDelete(data.vehicleId)}
                    message={`Delete vehicle ${data.vehicleMake} ${data.vehicleModel} (${data.vehicleYear})? This will delete all associated appointments!`}
                />
            </td>
        </tr>
    );
}
