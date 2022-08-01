import React, { useState, useEffect } from "react";
import "./App.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const INIT_INFO = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function App() {
  const [info, setInfo] = useState({
    firstName: "fn",
    lastName: "ln",
    email: "a@a.com",
    phone: "514-386-2701",
  });

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
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      };
      const response = await axios
        .get("/.netlify/functions/hello", {
          headers,
        })
        .then((response) => {
          setInfo(INIT_INFO);
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    }
  };

  const { firstName, lastName, email, phone } = info;

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      className="text-center"
    >
      <div className="App">
        <header>
          <h1>Subscriber Form</h1>
        </header>
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
    </ThemeProvider>
  );
}

export default App;
