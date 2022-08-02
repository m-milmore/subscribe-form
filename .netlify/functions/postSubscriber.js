import axios from "axios";
require("dotenv").config();

exports.handler = async (event, context) => {
  const { email, firstName, lastName, phone } = JSON.parse(event.body);
  const targetUrl = `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
  };
  const body = {
    api_key: process.env.CONVERTKIT_API_KEY,
    email: email,
    first_name: firstName,
    fields: {
      last_name: lastName,
      phone_number: phone,
    },
  };

  try {
    const response = await axios.post(targetUrl, body, { headers });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success!" }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error!" }),
    };
  }
};
