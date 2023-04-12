import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { db } from "../firebase/config";

export function EditModal({ user }) {
  const [state, setState] = useState(user.role);
  const [isModalShow, setIsModalShow] = useState(false);

  const onSaveRole = async () => {
    try {
      await updateDoc(doc(db, "users", user.itemId), {
        role: state,
      });
    } catch (error) {
      console.log(error);
    }
    setIsModalShow(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalShow(true)}>
        Редагувати посаду користувача
      </Button>
      <Modal
        show={isModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {user.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "space-around" }}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Оберіть роль для користувача:
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action-1"
                onClick={() => setState("Водій")}
              >
                Водій
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                onClick={() => setState("Пасажир")}
              >
                Пасажир
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => setState("Диспетчер")}
              >
                Диспетчер
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <p>{state}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsModalShow(false)}>Close</Button>
          <Button onClick={onSaveRole}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
