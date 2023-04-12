import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { endSession, getSession } from "../storage/session";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const email = getSession().email;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Nav className="me-auto">
          {email && (
            <NavDropdown title={<GiHamburgerMenu />} id="basic-nav-dropdown">
              <NavDropdown.Item href="#" onClick={() => navigate("/")}>
                Add trip
              </NavDropdown.Item>
              {email == adminEmail && <NavDropdown.Divider />}
              {email == adminEmail && (
                <NavDropdown.Item href="#" onClick={() => navigate("/users")}>
                  Edit users
                </NavDropdown.Item>
              )}
            </NavDropdown>
          )}
        </Nav>

        {email ? (
          <Button
            onClick={() => {
              endSession();
              navigate("/login");
            }}
            className="ml-auto"
          >
            Log out
          </Button>
        ) : (
          <>
            <Button onClick={() => navigate("/login")} className="ml-auto mr-2">
              LogIn
            </Button>
            <Button onClick={() => navigate("/signup")}>Register</Button>
          </>
        )}
      </Navbar>
    </>
  );
};
