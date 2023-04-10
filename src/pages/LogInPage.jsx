import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { signInUser, signInUserWithGoogle } from "../firebase/services";
import { startSession } from "../storage/session";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Container } from "react-bootstrap";
import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { updateCollection } from "../firebase/updateCollection";

export const LogInPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signInUser(
        e.target.email.value,
        e.target.password.value
      );
      startSession(user);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const onClick = async () => {
    try {
      const user = await signInUserWithGoogle();

      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", user.email));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const newUser = {
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: user.metadata.creationTime,
          updatedAt: user.metadata.creationTime,
          role: "",
        };

        await updateCollection(newUser, "users");
      }

      startSession(user);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "320px",
        }}
        onSubmit={onSubmit}
      >
        <Form.Group controlId="formBasicEmail" className="mt-2 w-100">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="my-2 w-100">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mx-auto">
          LogIn
        </Button>

        <Form.Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Don't have login?{" "}
          <Nav activeKey="signup">
            <Nav.Item>
              <Nav.Link href="/signup">Register</Nav.Link>
            </Nav.Item>
          </Nav>
        </Form.Text>
      </Form>
      <Button variant="light" onClick={onClick}>
        <FcGoogle />
      </Button>
    </Container>
  );
};
