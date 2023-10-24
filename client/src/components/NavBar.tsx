import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../logo.svg"

import SignInModal from "./SignInModal";
import { useNavigate } from "react-router-dom";

import '../styles/NavBar.css'

export default function NavBar() {
    const navigate = useNavigate();
    const [showSignInModal, setShowSignInModal] = useState(false);
    const { user, signedIn, login, signOut, errors, setErrors, userData } = useAuth();

    const toggleSignInModal = () => {
        setShowSignInModal(!showSignInModal);
    };

    const handleSignOutClick = () => {
        signOut();
        navigate("/");
    }

    useEffect(() => {
        console.log(user);
        if (user) {
            console.log(user.hasRole("ADMIN"))
        }
    }, [user]);

    const isAdmin = user && user.hasRole("ADMIN");

    return (
        <header>
            <div className="navbar-container">
                <Navbar expand="lg" className="custom-navbar" data-bs-theme="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <span className="navbar-title">Repair Shop</span><img src={Logo} alt="Repair Shop logo." className="navbar-logo" style={{ height: "25px" }}></img>
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {user && (
                                    <>
                                        <LinkContainer to="/">
                                            <Nav.Link>Home</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/appointment">
                                            <Nav.Link>Appointments</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/vehicle">
                                            <Nav.Link>Vehicles</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/customer">
                                            <Nav.Link>Customers</Nav.Link>
                                        </LinkContainer>
                                    </>
                                )}
                                {isAdmin && (
                                    <LinkContainer to="/user">
                                        <Nav.Link>Users</Nav.Link>
                                    </LinkContainer>
                                )}
                            </Nav>
                            <Navbar.Text>
                                {user && signedIn ? (
                                    <>
                                        Signed in as: {user.username}{" "}
                                        <Button
                                            className="btn btn-danger"
                                            style={{ height: "30px", fontSize: "10px", marginLeft: "10px" }}
                                            onClick={handleSignOutClick}
                                        >
                                            <i className="bi bi-box-arrow-left"></i> Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            className="btn btn-secondary"
                                            style={{ height: "30px", fontSize: "10px" }}
                                            onClick={toggleSignInModal}
                                        >
                                            <i className="bi bi-box-arrow-in-right"></i> Sign In
                                        </Button>
                                    </>
                                )}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <SignInModal
                    showSignInModal={showSignInModal}
                    toggleSignInModal={toggleSignInModal}
                    login={login}
                    user={user}
                    errors={errors}
                    setErrors={setErrors}
                />
            </div>
        </header>
    );
}
