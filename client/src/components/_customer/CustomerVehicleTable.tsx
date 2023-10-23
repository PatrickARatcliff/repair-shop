import Vehicle from '../../interfaces/Vehicle';
import CustomerVehicleTableItem from "./CustomerVehicleTableItem"
import Table from 'react-bootstrap/Table';
import '../../styles/_vehicle/VehicleTable.css'

interface CustomerVehicleTableProps {
    data: Vehicle[];
}

export default function CustomerVehicleTable({ data }: CustomerVehicleTableProps) {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={4}>Customer Vehicles</th>
                    </tr>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data ? (
                        data.map((vehicle) => (
                            <CustomerVehicleTableItem key={vehicle.vehicleId} data={vehicle} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No vehicles found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
