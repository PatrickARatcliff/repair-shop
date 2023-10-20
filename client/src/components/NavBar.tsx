import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../logo.svg"

import SignInModal from "./SignInModal";

export default function NavBar() {
    const [showSignInModal, setShowSignInModal] = useState(false);

    const { user, signedIn, login, signOut, errors, setErrors } = useAuth();

    const toggleSignInModal = () => {
        setShowSignInModal(!showSignInModal);
      };

    //  TODO: remove after production
    useEffect(() => {
        console.log(user)
    }, [])

    return (
        <header>
            <div className="navbar-container">
                <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <span className="navbar-title">Repair Shop</span><img src={Logo} alt="Repair Shop logo." className="navbar-logo" style={{ height: "25px" }}></img>
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
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
                                <LinkContainer to="/user">
                                    <Nav.Link>Users</Nav.Link>
                                </LinkContainer>
                            </Nav>
                            <Navbar.Text>
                                {user && signedIn ? (
                                    <>
                                        Signed in as: {user.username}{" "}
                                        <Button
                                            className="btn btn-danger"
                                            style={{ height: "30px", fontSize: "10px" }}
                                            onClick={signOut}
                                        >
                                            Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            className="btn btn-secondary"
                                            style={{ height: "30px", fontSize: "10px" }}
                                            onClick={toggleSignInModal}
                                        >
                                            Sign In
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
    )
}