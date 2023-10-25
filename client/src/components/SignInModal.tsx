import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import User from "../interfaces/User";

import { toast } from 'react-toastify';

interface SignInModalProps {
    showSignInModal: boolean;
    toggleSignInModal: () => void;
    login: (token: string) => void;
    user: User | null;
    errors: string[];
    setErrors: (errors: string[]) => void;
};

export default function SignInModal(props: SignInModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (event: any) => {
        event.preventDefault();


        const response = await fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.status === 200) {
            const { jwt_token } = await response.json();
            props.login(jwt_token);
            props.toggleSignInModal();
        } else if (response.status === 403) {
            props.setErrors(["Login failed."]);
            toast.error("Login failed.");
        } else {
            props.setErrors(["Unknown error."]);
            toast.error("Unknown error.");
        }
    };

    useEffect(() => {
        if (props.showSignInModal) {
            resetModal();
        }
    }, [props.showSignInModal]);


    const resetModal = () => {
        setUsername("");
        setPassword("");
        props.setErrors([]);
    };

    return (
        <>
            <Modal show={props.showSignInModal} onHide={props.toggleSignInModal} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <i className="bi bi-eye-slash-fill"></i>
                                    ) : (
                                        <i className="bi bi-eye"></i>
                                    )}
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                    <br></br>
                    <p>
                        Don't have an account? Contact your Administrator.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.toggleSignInModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSignIn}>
                        Sign In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


