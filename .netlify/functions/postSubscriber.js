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
    if (error.request) {
      return {
        statusCode: 406,
        body: JSON.stringify({ message: "Request Not Accepted!" }),
      };
    }
    if (error.response) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data.message),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error - Try again after a short period.",
      }),
    };
  }
};
