import Customer from '../../interfaces/Customer';
import CustomerTableItem from "./CustomerTableItem"

import Table from 'react-bootstrap/Table';

import '../../styles/_customer/CustomerTable.css'

interface CustomerTableProps {
    customers: Customer[];
    height: string;
}

export default function CustomerTable({ customers, height }: CustomerTableProps) {
    return (
        <div className="table-container" style={{ height: height }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>E-mail</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <CustomerTableItem key={customer.customerId} data={customer} />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
