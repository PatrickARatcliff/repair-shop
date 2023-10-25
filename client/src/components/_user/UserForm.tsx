import { Form, Button } from 'react-bootstrap';

import Credentials from '../../interfaces/Credentials';
import UserData from '../../interfaces/UserData';

import '../../styles/_user/UserForm.css';


interface UserFormProps {
    newUser: Credentials | UserData;
    handleFormSubmit: (e: React.FormEvent) => void;
    setNewUser: React.Dispatch<React.SetStateAction<Credentials>>;
}

function UserForm({ newUser, handleFormSubmit, setNewUser }: UserFormProps) {

    return (
        <div className="card mb-2 custom-card">
            <div className="card-body">
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formUsername" className="mb-2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={newUser.username}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    username: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mt-2 w-100">
                        <i className="bi bi-box-arrow-up"></i> Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default UserForm;
