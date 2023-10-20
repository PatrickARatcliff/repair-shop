import AppointmentTable from '../../components/_appointment/AppointmentTable';
import Button from 'react-bootstrap/Button';

function Appointments() {


    return (
        <div className="container mt-3">
            <Button variant="success" className="mb-2 w-100">
                <i className="bi bi-calendar-plus"></i> Schedule Appointment
            </Button>
            <AppointmentTable />
        </div>
    );
}

export default Appointments;
