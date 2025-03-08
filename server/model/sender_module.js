import axios from "axios";
import dotenv from "dotenv";
import application_id from "./../global_dcl.js";

dotenv.config();

const INFOBIP_BASE_URL=process.env.INFOBIP_BASE_URL;
const INFOBIP_API_KEY=process.env.PUSH_KEY;


async function sendOTP(phoneNumber) {

    if (!phoneNumber) {
        console.error("Phone number is required.");
        return;
      };

    const url = `${INFOBIP_BASE_URL}/2fa/1/pin`;

    const headers = {
      "Authorization": `App ${INFOBIP_API_KEY}`,
      "Content-Type": "application/json"
    };

    const data = {
      applicationId:application_id.id,
      from: "ServiceSMS",
      to: phoneNumber
    };
  
    try {

      const response = await axios.post(url, data, { headers });
    
      return response.data;

    } catch (error) {

      console.error("Error sending OTP:", error.response?.data || error.message);

    }

  };
  
  
export default sendOTP;