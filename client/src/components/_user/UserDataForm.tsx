import { Form, Button } from 'react-bootstrap';

import UserData from '../../interfaces/UserData';

import '../../styles/_user/UserForm.css';

interface UserDataFormProps {
    newUser: UserData;
    handleFormSubmit: (e: React.FormEvent) => void;
    setNewUser: React.Dispatch<React.SetStateAction<UserData>>;
}

function UserDataForm({ newUser, handleFormSubmit, setNewUser }: UserDataFormProps) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setNewUser((prevUserData) => ({
            ...prevUserData,
            authorities: [selectedValue],
        }));
    };

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
                            type="password"
                            value={""}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthorities" className="mb-2">
                        <Form.Label>Authorities</Form.Label>
                        <Form.Select
                            value={newUser.authorities[0]}
                            onChange={handleSelectChange}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mt-2 w-100">
                        <i className="bi bi-box-arrow-up"></i> Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default UserDataForm;
