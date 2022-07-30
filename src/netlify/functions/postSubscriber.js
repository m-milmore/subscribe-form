import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE"
};

exports.handler = async (event, context) => {
  const body = event.body; // will hold the subscriber info (firstName, lastName, email, phone)
  const targetUrl =
    "http://app.converkit.com/forms/designers/3455603/addSubscriber"; // this is just an example, check with the docs later
  // need to create a connection instance to Converkit with API key, like what I did with aws s3

  try {
    const response = await axios.post(targetUrl, body, { headers });
    return { statusCode: 200, success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
