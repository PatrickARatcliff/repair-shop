import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Button, Accordion } from 'react-bootstrap';

import { createUser, findAllUsers, findByUsername } from '../../services/userService';
import { useAuth } from "../../context/AuthProvider";
import { deleteUserById } from '../../services/userService';

import UserData from "../../interfaces/UserData";
import Credentials from "../../interfaces/Credentials";
import UserTable from '../../components/_user/UserTable';
import UserForm from '../../components/_user/UserForm';

import '../../styles/_user/Users.css'


function Users() {
    const { isAdmin, setErrors, userData } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const userId = userData ? userData.userId : 0;
    const [newUser, setNewUser] = useState<Credentials>({
        username: "",
        password: "",
    });
    const [users, setUsers] = useState<UserData[]>([]);
    const containerHeight = isAccordionOpen ? '50vh' : '75vh';
    const navigate = useNavigate();

    if (!isAdmin) {
        navigate("/")
    }

    const handleAddUserClick = () => {
        setIsAccordionOpen((prevIsAccordionOpen) => !prevIsAccordionOpen);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createUser(newUser);
            try {
                const convertedUser = await findByUsername(newUser.username)
                const updatedUsers = [...users, convertedUser];
                setUsers(updatedUsers);
            } catch (error) {
                setErrors([`Error converting user: ${error}`]);
            }
            setNewUser({
                username: "",
                password: "",
            });
        } catch (error) {
            setErrors([`Error creating user: ${error}`]);
        }
    };


    const handleDelete = async (userId: number) => {
        try {
            await deleteUserById(userId);
            const updatedUsers = users.filter(user => user.userId !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            setErrors([`Error deleting user: ${error}`]);
        } finally {
            setShowDeleteModal(false);
        }
    }


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await findAllUsers();
                setUsers(users);
                setIsLoading(false);
            } catch (error) {
                setErrors([`Error fetching users: ${error}`]);
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);


    return (
        <div className="container mt-3 user-container">
            <Accordion activeKey={isAccordionOpen ? '0' : ''}>
                <Button
                    variant="success"
                    className="w-100"
                    onClick={handleAddUserClick}
                    style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <i className="bi bi-person-vcard"></i> Add New User
                </Button>
                <Accordion.Collapse eventKey="0">
                    <div className="accordion">
                        <UserForm
                            newUser={newUser}
                            handleFormSubmit={handleFormSubmit}
                            setNewUser={setNewUser}
                        />
                    </div>
                </Accordion.Collapse>
            </Accordion>
            {isLoading ? (
                <div className="container mt-3 spinner-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <UserTable
                        users={users}
                        height={containerHeight}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
}

export default Users;
