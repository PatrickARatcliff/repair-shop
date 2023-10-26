import Appointment from '../../interfaces/Appointment';
import AppointmentTableItem from "./AppointmentTableItem"

import Table from 'react-bootstrap/Table';

import '../../styles/_appointment/AppointmentTable.css'

interface AppointmentTableProps {
    appointments: Appointment[];
    height: string;
    onDelete: (appointmentId: number) => void;
}

export default function AppointmentTable({ appointments, height, onDelete }: AppointmentTableProps) {
    return (
        <>
            <section aria-label='Table displaying information for each appointment'>
                <div className="table-container" style={{ height: height }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Vehicle</th>
                                <th>Customer</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <AppointmentTableItem
                                    key={appointment.appointmentId}
                                    data={appointment}
                                    onDelete={onDelete}
                                />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    )
}
