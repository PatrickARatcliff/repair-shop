import Vehicle from '../../interfaces/Vehicle';
import VehicleTableItem from "./VehicleTableItem"

import Table from 'react-bootstrap/Table';

import '../../styles/_vehicle/VehicleTable.css'

interface VehicleTableProps {
    vehicles: Vehicle[];
    height: string;
    onDelete: (appointmentId: number) => void;
}

export default function VehicleTable({ vehicles, height, onDelete }: VehicleTableProps) {
    return (
        <>
            <section aria-label='Table displaying information for each vehicle'>
                <div className="table-container" style={{ height: height }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Customer</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle) => (
                                <VehicleTableItem
                                    key={vehicle.vehicleId}
                                    data={vehicle}
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
