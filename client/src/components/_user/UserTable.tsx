import UserData from '../../interfaces/UserData';
import UserTableItem from "./UserTableItem"

import Table from 'react-bootstrap/Table';

import '../../styles/_user/UserTable.css'

interface AppointmentTableProps {
    users: UserData[];
    height: string;
    onDelete: (userId: number) => void;
}

export default function UserTable({ users, height, onDelete }: AppointmentTableProps) {
    return (
        <>
            <section aria-label='Table displaying information for each user'>
                <div className="table-container" style={{ height: height }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Authorization</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <UserTableItem
                                    key={user.userId}
                                    data={user}
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
