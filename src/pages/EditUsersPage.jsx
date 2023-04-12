import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import { db } from "../firebase/config";
import { EditModal } from "../components/Modal";
import { Button, Container } from "react-bootstrap";

export const EditUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arrayUsers = [];
      querySnapshot.forEach((item) => {
        arrayUsers.push({ ...item.data(), itemId: item.id });
      });
      setUsers(arrayUsers);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {users &&
        users.map((user) => (
          <Card key={user.email} border="primary">
            <Card.Header>{user.name}</Card.Header>
            <Card.Body>
              <Card.Title>{user.role}</Card.Title>
              <EditModal user={user} />
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};
