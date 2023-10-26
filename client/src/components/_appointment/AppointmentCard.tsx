import { useEffect, useState } from 'react';
import { findVehicleById } from '../../services/vehicleService';
import { findCustomerById } from '../../services/customerService';
import { useAuth } from '../../context/AuthProvider';
import { formatDateString } from '../../utils/formatDates';
import { Card, Button } from 'react-bootstrap';

import Appointment from '../../interfaces/Appointment';
import DeleteConfirmModal from '../DeleteConfirmModal';

import { toast } from 'react-toastify';

import '../../styles/_appointment/AppointmentCard.css';

interface AppointmentCardProps {
  appointment: Appointment;
  onDeleteClick: (appointmentId: number) => void;
  height: string;
}

function AppointmentCard({ appointment, onDeleteClick, height }: AppointmentCardProps) {
  const [vehicleInfo, setVehicleInfo] = useState<string>('Loading...');
  const [customerInfo, setCustomerInfo] = useState<string>('Loading...');
  const { user, setErrors } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchVehicleAndCustomerInfo(appointment);
  }, [appointment]);

  const fetchVehicleAndCustomerInfo = async (appointment: Appointment) => {
    try {
      const vehicleData = await findVehicleById(appointment.vehicleId);
      if (vehicleData) {
        const vehicleDetails = `${vehicleData.vehicleYear} ${vehicleData.vehicleMake} ${vehicleData.vehicleModel}`;
        setVehicleInfo(vehicleDetails);

        const customerData = await findCustomerById(vehicleData.customerId);
        if (customerData) {
          const customerDetails = `${customerData.customerLastName}, ${customerData.customerFirstName}`;
          setCustomerInfo(customerDetails);
        } else {
          setCustomerInfo('Customer not found');
        }
      } else {
        setVehicleInfo('Vehicle not found');
      }
    } catch (error) {
      setErrors([`Error fetching vehicle or customer details: ${error}`]);
      toast.error(`Error fetching vehicle or customer details: ${error}`);
      setVehicleInfo('Error');
      setCustomerInfo('Error');
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    onDeleteClick(appointment.appointmentId);
    setShowDeleteModal(false);
  };

  return (
    <>
      <section aria-label='Card displaying date, vehicle and customer for appointment'>
        <Card className="appointment-card" style={{ maxHeight: height }}>
          <Card.Header>
            <Card.Title className="card-title">Appointment {appointment && `ID: ${appointment.appointmentId}`}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Date:</strong> {formatDateString(appointment.appointmentDate)}<br />
              <strong>Vehicle:</strong> {vehicleInfo}<br />
              <strong>Customer:</strong> {customerInfo}<br />
              {user && (
                <>
                  <strong>Scheduled By:</strong> {user.username}<br />
                </>
              )}
            </Card.Text>
            <Button className="w-100" variant="danger" onClick={handleDeleteClick}>
              <i className="bi bi-trash3"></i> Delete
            </Button>
          </Card.Body>
          <DeleteConfirmModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onConfirmDelete={handleDeleteConfirmed}
            message={`Delete appointment for ${formatDateString(appointment.appointmentDate)}?`}
          />
        </Card>
      </section>
    </>
  );
}

export default AppointmentCard;
