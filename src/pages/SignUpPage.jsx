import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { createUser } from "../firebase/services";
import { startSession } from "../storage/session";
import { useNavigate } from "react-router-dom";
import { updateCollection } from "../firebase/updateCollection";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await createUser(
        e.target.email.value,
        e.target.password1.value
      );

      const newUser = {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: user.metadata.creationTime,
        updatedAt: user.metadata.creationTime,
        role: "",
      };

      await updateCollection(newUser, "users");

      startSession(user);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
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

      <Form.Group controlId="formBasicPassword" className="mt-2 w-100">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password1" placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword2" className="my-2 w-100">
        <Form.Label>Repeat password</Form.Label>
        <Form.Control type="password" name="password2" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit" className="mx-auto">
        Register
      </Button>

      <Form.Text
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Already have an account?{" "}
        <Button
          variant="link"
          onClick={() => navigate("/login")}
          style={{ border: "none" }}
        >
          LogIn
        </Button>
      </Form.Text>
    </Form>
  );
};
