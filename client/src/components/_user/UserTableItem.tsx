import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import UserData from '../../interfaces/UserData';
import DeleteConfirmModal from '../DeleteConfirmModal';


interface UserTableItemProps {
  data: UserData;
  onDelete: (userId: number) => void;
}

export default function UserTableItem({ data, onDelete }: UserTableItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const onInfoClick = () => {
    navigate(`/user/${data.username}`);
  }

  const onDeleteClick = () => {
    setShowDeleteModal(true);
  }

  return (
    <tr>
      <td>{data.username}</td>
      <td>{data.authorities[0]}</td>
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
          onDelete(data.userId);
          setShowDeleteModal(false);
        }}
        message={`Delete user ${data.username}?`}
      />
    </tr>
  );
}
