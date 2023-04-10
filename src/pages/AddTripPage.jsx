import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getSession } from "../storage/session";
import { useState } from "react";

const initialState = {
  userId: "",
  licensePlate: "",
  departurePoint: "",
  arrivalPoint: "",
  passengersNumber: "",
  createdAt: "",
};

export const AddTripPage = () => {
  const [formData, setFormData] = useState(initialState);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newTrip = {
      userId: getSession().userId,
      licensePlate: e.target.licensePlate.value,
      departurePoint: e.target.departurePoint.value,
      arrivalPoint: e.target.arrivalPoint.value,
      passengersNumber: e.target.passengersNumber.value,
      createdAt: Date.now().toString(),
    };

    await updateCollection(newTrip, "trips");
  };
  return (
    <>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "320px",
        }}
        onSubmit={onSubmit}
      >
        <Form.Group controlId="licensePlate" className="mt-2 w-100">
          <Form.Label>License plate</Form.Label>
          <Form.Control
            type="text"
            name="licensePlate"
            placeholder="License plate"
            value={formData.licensePlate}
            onChange={(value) => {
              return setFormData((prevState) => ({
                ...prevState,
                licensePlate: value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group controlId="departurePoint" className="mt-2 w-100">
          <Form.Label>Departure point</Form.Label>
          <Form.Control
            type="text"
            name="departurePoint"
            placeholder="Departure point"
            value={formData.departurePoint}
            onChange={(value) =>
              setFormData((prevState) => ({
                ...prevState,
                departurePoint: value,
              }))
            }
          />
        </Form.Group>

        <Form.Group controlId="arrivalPoint" className="mt-2 w-100">
          <Form.Label>Arrival point</Form.Label>
          <Form.Control
            type="text"
            name="arrivalPoint"
            placeholder="Arrival point"
            value={formData.arrivalPoint}
            onChange={(value) =>
              setFormData((prevState) => ({
                ...prevState,
                arrivalPoint: value,
              }))
            }
          />
        </Form.Group>

        <Form.Group controlId="passengersNumber " className="my-2 w-100">
          <Form.Label>Passengers number </Form.Label>
          <Form.Control
            type="number"
            name="passengersNumber"
            placeholder="Passengers number"
            value={formData.passengersNumber}
            onChange={(value) =>
              setFormData((prevState) => ({
                ...prevState,
                passengersNumber: value,
              }))
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mx-auto">
          Create
        </Button>
      </Form>
    </>
  );
};
