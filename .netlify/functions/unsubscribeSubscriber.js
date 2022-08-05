import axios from "axios";
require("dotenv").config();

exports.handler = async (event, context) => {
  const email = event.body;
  const targetUrl = "https://api.convertkit.com/v3/unsubscribe";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT",
  };
  const body = {
    api_secret: process.env.CONVERTKIT_API_SECRET,
    email: email.replace(/['"]+/g, ""),
  };

  try {
    const response = await axios.put(targetUrl, body, { headers });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ success: false }),
    };
  }
};
