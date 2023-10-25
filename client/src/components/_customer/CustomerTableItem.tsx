import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Customer from '../../interfaces/Customer';
import Button from 'react-bootstrap/Button';
import DeleteConfirmModal from '../DeleteConfirmModal';

interface CustomerTableItemProps {
    data: Customer;
    onDelete: (appointmentId: number) => void;
}

export default function CustomerTableItem({ data, onDelete }: CustomerTableItemProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    const onInfoClick = () => {
        navigate(`/customer/${data.customerId}`);
    }

    const onDeleteClick = () => {
        setShowDeleteModal(true);
    }

    return (
        <tr>
            <td>{data.important ? (<i className="bi bi-star-fill text-warning"></i>) : (<i className="bi bi-star caution"></i>)}  {data.customerLastName}, {data.customerFirstName}</td>
            <td>{data.customerPhone}</td>
            <td>{data.customerEmail}</td>
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
                    onDelete(data.customerId);
                    setShowDeleteModal(false);
                }}
                message={`Delete customer ${data.customerLastName}, ${data.customerFirstName}?`}
            />
        </tr>
    );
}
