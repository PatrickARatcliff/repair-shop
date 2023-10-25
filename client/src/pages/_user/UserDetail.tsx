import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Button, Accordion } from 'react-bootstrap';

import { findByUsername, updateUser, deleteUserById } from '../../services/userService';
import { useAuth } from "../../context/AuthProvider";

import UserData from '../../interfaces/UserData';
import UserDataForm from '../../components/_user/UserDataForm';
import UserCard from '../../components/_user/UserCard';

import '../../styles/_user/UserDetail.css'

function UserDetail() {
    const { isAdmin, setErrors } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { userName } = useParams();
    const [user, setUser] = useState<UserData>({
        "userId": 0,
        "username": `${userName}`,
        "password": "",
        "enabled": true,
        "authorities": ["USER"],
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true
    });
    const navigate = useNavigate();
    const containerHeight = isAccordionOpen ? '46vh' : '75vh';

    if (!isAdmin) {
        navigate("/")
    };

    useEffect(() => {
        fetchUserDetails();
    }, [userName]);

    const fetchUserDetails = async () => {
        try {
            const userData = await findByUsername(String(userName));
            setUser(userData);
            setIsLoading(false);
        } catch (error) {
            setErrors([`Error fetching user details: ${error}`]);
            setIsLoading(false);
        }
    };

    const handleEditUserClick = () => {
        setIsAccordionOpen(prevIsAccordionOpen => !prevIsAccordionOpen);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (user) {
    
            setIsAccordionOpen(false);
    
            try {
                const errors = await updateUser(user);
                if (!errors) {
                    await fetchUserDetails();
                } else {
                    setErrors([errors]);
                }
            } catch (error) {
                setErrors([`${error}`]);
            }
        }
    };
    
    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUserById(userId);
            navigate("/user");
        } catch (error) {
            setErrors([`Error deleting user: ${error}`]);
        }
    };

    return (
        <div className="container mt-3">
            <Accordion activeKey={isAccordionOpen ? '0' : ''}>
                <Button
                    variant="warning"
                    className="w-100"
                    onClick={handleEditUserClick}
                    style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <i className="bi bi-pencil-square"></i> Edit User
                </Button>
                <Accordion.Collapse eventKey="0">
                    <div className="accordion">
                        {user && (
                            <UserDataForm
                                newUser={user}
                                handleFormSubmit={handleFormSubmit}
                                setNewUser={setUser}
                            />
                        )}
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
                    {user && (
                        <UserCard 
                            user={user}
                            onDeleteClick={handleDeleteUser}
                            height={containerHeight}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default UserDetail;
