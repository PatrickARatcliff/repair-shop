import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

import UserData from '../../interfaces/UserData';
import DeleteConfirmModal from '../DeleteConfirmModal';

import '../../styles/_user/UserCard.css';

interface UserCardProps {
  user: UserData;
  onDeleteClick: (appointmentId: number) => void;
  height: string;
}

function AppointmentCard({ user, onDeleteClick, height }: UserCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    onDeleteClick(user.userId);
    setShowDeleteModal(false);
  };

  return (
    <Card className="user-card" style={{ maxHeight: height }}>
      <Card.Header>
        <Card.Title>User {user && `ID: ${user.userId}`}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Username:</strong> {user.username}<br />
          <strong>Enabled:</strong> {(user.enabled).toString()}<br />
          <strong>Authorization:</strong> {user.authorities[0]}<br />
          <strong>Account Expired:</strong> {(!user.accountNonExpired).toString()}<br />
          <strong>Account Locked:</strong> {(!user.accountNonLocked).toString()}<br />
          <strong>Credentials Expired:</strong> {(!user.credentialsNonExpired).toString()}<br />
        </Card.Text>
        <Button className="w-100" variant="danger" onClick={handleDeleteClick}>
          <i className="bi bi-trash3"></i> Delete
        </Button>
      </Card.Body>
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteConfirmed}
        message={`Delete user ${user.username}?`}
      />
    </Card>
  );
}

export default AppointmentCard;
