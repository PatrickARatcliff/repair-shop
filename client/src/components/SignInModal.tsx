import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import FormErrors from "./FormErrors";
import { useAuth } from "../context/AuthProvider";
import User from "../interfaces/User";
// import { findAllUsers, login } from "../services/userService";

interface SignInModalProps {
    showSignInModal: boolean;
    toggleSignInModal: () => void;
    toggleSignUpModal: () => void;
    handleSignInSuccess: (user: User) => void;
    setUserName: (userName: string) => void;
    setPassWord: (password: string) => void;
    userName: string;
    passWord: string;
    user: User; 
    errors: string[]; // If you use errors, make sure to define its type
    setErrors: (errors: string[]) => void;
  }

export default function SignInModal(props: SignInModalProps) {
  const { user, errors, setErrors } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showSignUpLink, setShowSignUpLink] = useState(false);
  // const [users, setUsers] = useState([]);

  const handleSignIn = (evt: any) => {
      evt.preventDefault();


      props.setErrors([]);
    //   login(credentials)
    //     .then((user) => {
    //       // handleLoggedIn(user);

    let newUser = {userId: 99, userName: props.userName, passWord: props.passWord}
          if (newUser) {
            props.handleSignInSuccess(newUser);
            props.toggleSignInModal();
    //       } else {
    //         setErrors(["Username and/or Password do not match."]);
    //         setShowSignUpLink(true);
    //       }
    //     })
    //     .catch((err: Error) => {
    //       console.error("An error occurred during sign-in:", err);
    //       props.setErrors([err.message]);
    //     });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const allUsers = await findAllUsers();
  //       setUsers(allUsers);
  //     } catch (error) {
  //       console.error("An error occurred while fetching users:", error);
  //       setErrors(error);
  //     }
    };

  //   fetchData();
  // }, [user]);

  const handleSignUpClick = () => {
    props.toggleSignInModal();
    props.toggleSignUpModal();
  };


  return (
    <>
      <Modal show={props.showSignInModal} onHide={props.toggleSignInModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => props.setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => props.setPassWord(e.target.value)}
              />
            </Form.Group>
            <FormErrors errors={errors} />
          </Form>
          {showSignUpLink && (
            <p>
              Don't have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={handleSignUpClick}
              >
                Sign Up
              </span>{" "}
            </p>
          )}
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


