import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

const INIT_INFO = {
  first_name: "",
  last_name: "",
  email_address: "",
  phone_number: "",
};

function FindSubscriber() {
  const [email, setEmail] = useState("a@a.com");
  const [info, setInfo] = useState(INIT_INFO);
  const [findBtnDisabled, setFindBtnDisabled] = useState(true);

  useEffect(() => {
    setFindBtnDisabled(!email);
    !email && setInfo(INIT_INFO);
  }, [email]);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
		setInfo(INIT_INFO)

    const body = email;
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    };

    try {
      const response = await axios.post(
        "/.netlify/functions/findSubscriber",
        body,
        {
          headers,
        }
      );
      if (response.data.total_subscribers === 0) {
        alert("CONTACT DOES NOT EXIST");
      } else {
        const {
          first_name,
          email_address,
          fields: { last_name, phone_number },
        } = response.data.subscribers[0];
        setInfo({ first_name, email_address, last_name, phone_number });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const { first_name, last_name, email_address, phone_number } = info;

  return (
    <div className="center-display">
      <div className="p-4">
        <p className="h3 mx-4 mt-3">Find_Subscriber Form</p>
        <Form onSubmit={handleSubmit} className="text-start border py-2 px-4">
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

          <div className="text-center">
            <Button
              className="fs-6"
              variant="primary"
              type="submit"
              disabled={findBtnDisabled}
            >
              FIND
            </Button>
          </div>
        </Form>
        <Card className="fs-6 mt-3" style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>Subscriber Info</Card.Title>
            <Card.Text>First Name : {first_name}</Card.Text>
            <Card.Text>Last Name : {last_name}</Card.Text>
            <Card.Text>Email : {email_address}</Card.Text>
            <Card.Text>Phone : {phone_number}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default FindSubscriber;
