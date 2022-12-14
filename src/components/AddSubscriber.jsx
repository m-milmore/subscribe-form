import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const INIT_INFO = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function AddSubscriber() {
  const [info, setInfo] = useState(INIT_INFO);

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  useEffect(() => {
    const { firstName, lastName, email, phone } = info;
    setSubmitBtnDisabled(!(firstName && lastName && email && phone));
  }, [info]);

  const handleChange = ({ target: { name, value } }) => {
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const smallestArea = 201;
    const highestArea = 989;
    const stripPhone = info.phone.replace(/\D/g, "");

    if (stripPhone.length !== 10) {
      alert("Invalid phone number. Missing number(s) or too may numbers.");
    } else if (
      parseInt(stripPhone.substring(0, 3)) < smallestArea ||
      parseInt(stripPhone.substring(0, 3)) > highestArea
    ) {
      alert(
        `Phone area code must be between ${smallestArea} and ${highestArea} inclusively`
      );
    } else {
      const body = info;
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      };

      try {
        await axios.post(
          "/.netlify/functions/postSubscriber",
          body,
          { headers }
        );
        alert("Success!");
      } catch (error) {
        alert("Error!");
      }
      setInfo(INIT_INFO);
    }
  };

  const { firstName, lastName, email, phone } = info;

  return (
    <div className="center-display">
      <p className="h3 ms-4 mt-3">Add_Subscriber Form</p>
      <Form onSubmit={handleSubmit} className="text-start border py-2 px-4">
        <Form.Group className="mb-3 fs-5">
          <Form.Label className="fs-6">First name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Enter first name"
            value={firstName}
            name="firstName"
            maxLength="20"
          />
        </Form.Group>

        <Form.Group className="mb-3 fs-5">
          <Form.Label className="fs-6">Last name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Enter last name"
            value={lastName}
            name="lastName"
            maxLength="20"
          />
        </Form.Group>

        <Form.Group className="mb-3 fs-5">
          <Form.Label className="fs-6">Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
          />
          <Form.Text className="text-muted fs-6">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 fs-5">
          <Form.Label className="fs-6">Phone number</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="XXX-XXX-XXXX"
            value={phone}
            name="phone"
            minLength="10"
            maxLength="12"
          />
        </Form.Group>

        <div className="text-center">
          <Button
            className="fs-6"
            variant="primary"
            type="submit"
            disabled={submitBtnDisabled}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddSubscriber;
