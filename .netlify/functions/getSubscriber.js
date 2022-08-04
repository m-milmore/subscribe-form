import axios from "axios";
require("dotenv").config();

exports.handler = async (event, context) => {
  const email = event.body;
  const secret = process.env.CONVERTKIT_API_SECRET;
  const targetUrl = `https://api.convertkit.com/v3/subscribers?api_secret=${secret}&email_address=${email.replace(
    /['"]+/g,
    ""
  )}`;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  };

  try {
    const response = await axios.get(targetUrl, { headers });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    if (error.request) {
      console.log("error in request");
      return {
        statusCode: 406,
        body: JSON.stringify({ message: "Request Not Accepted!" }),
      };
    }
    if (error.response) {
      console.log("error in response");
      return {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data.message),
      };
    }
    console.log("error in server or Convertkit");
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error - Try again after a short period.",
      }),
    };
  }
};
