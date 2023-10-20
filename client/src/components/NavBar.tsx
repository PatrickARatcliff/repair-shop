import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import User from "../interfaces/User"
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "../styles/NavBar.css";
import Logo from "../logo.svg"

import SignInModal from "./SignInModal";
// import SignUpModal from "./SignUpModal";

export default function NavBar() {
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [userData, setUserData] = useState({ userId: 1, userName: "test@test.com" })
    const { user, signedIn, signIn, signOut, errors, setErrors } = useAuth();

    const handleSignInSuccess = (user: User) => {
        console.log("sign-in")
        signIn(user);
    };

    const toggleSignInModal = () => {
        resetModal();
        setShowSignInModal(!showSignInModal);
      };
    
      const toggleSignUpModal = () => {
        resetModal();
        setShowSignUpModal(!showSignUpModal);
      };
    
      const resetModal = () => {
        setUserName("");
        setPassWord("");
        setErrors([]);
      };

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
                                        Signed in as: {user.userName}{" "}
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
                    toggleSignUpModal={toggleSignUpModal}
                    setUserName={setUserName}
                    setPassWord={setPassWord}
                    user={userData}
                    userName={userName}
                    passWord={passWord}
                    handleSignInSuccess={handleSignInSuccess}
                    setErrors={setErrors}
                    errors={errors}
                />
            </div>
        </header>
    )
}