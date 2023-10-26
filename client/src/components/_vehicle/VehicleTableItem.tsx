import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { findCustomerById } from '../../services/customerService';
import { deleteVehicleById } from '../../services/vehicleService';

import Vehicle from '../../interfaces/Vehicle';
import Button from 'react-bootstrap/Button';
import DeleteConfirmModal from '../DeleteConfirmModal';

import { toast } from 'react-toastify';

interface VehicleTableItemProps {
    data: Vehicle;
    onDelete: (vehicleId: number) => void;
  }

  export default function VehicleTableItem({ data, onDelete }: VehicleTableItemProps) {
    const [customerInfo, setCustomerInfo] = useState<string>('Loading...');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomerInfo(data.customerId);
    }, [data.customerId]);

    const onInfoClick = () => {
        navigate(`/vehicle/${data.vehicleId}`);
    }

    const onDeleteClick = () => {
        setShowDeleteModal(true);
    }

    const fetchCustomerInfo = async (customerId: number) => {
        try {
            const customerData = await findCustomerById(customerId);
            if (customerData) {
                const customerDetails = `${customerData.customerLastName}, ${customerData.customerFirstName}`;
                setCustomerInfo(customerDetails);

            } else {
                setCustomerInfo('Customer not found');
            }
        } catch (error) {
            toast.error(`Error fetching customer details: ${error}`);
            setCustomerInfo('Error');
        }
    }

    return (
        <tr>
            <td>{data.vehicleMake}</td>
            <td>{data.vehicleModel}</td>
            <td>{data.vehicleYear}</td>
            <td>{customerInfo}</td>
            <td className="d-flex justify-content-end">
                <Button variant="info" className="me-1" onClick={onInfoClick}>
                    <i className="bi bi-info-circle"></i>
                </Button>
                <Button variant="danger" onClick={onDeleteClick}>
                    <i className="bi bi-trash3"></i>
                </Button>
            </td>
            <DeleteConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirmDelete={() => {
                    onDelete(data.vehicleId);
                    setShowDeleteModal(false);
                }}
                message={`Delete vehicle ${data.vehicleMake} ${data.vehicleModel} (${data.vehicleYear})? This will delete all associated appointments!`}
            />
        </tr>
    );
}
