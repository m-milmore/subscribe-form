import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function UnsubscribeSubscriber() {
  const [email, setEmail] = useState("a@a.com");
  const [findBtnDisabled, setFindBtnDisabled] = useState(true);

  useEffect(() => {
    setFindBtnDisabled(!email);
  }, [email]);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = email;
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT",
    };

    try {
      await axios.put(
        "/.netlify/functions/unsubscribeSubscriber",
        body,
        {
          headers,
        }
      );
      alert("CONTACT SUCCESSFULLY UNSUBSCRIBED");
    } catch (error) {
      alert("CONTACT DOES NOT EXIST");
    }
  };

  return (
    <div className="center-display">
      <p className="h3 mx-4 mt-3">Delete_Subscriber Form</p>
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
            UNSUBSCRIBE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UnsubscribeSubscriber;
