import dotenv from "dotenv";
import axios from "axios";
import application_id from "../global_dcl.js";

dotenv.config();

const INFOBIP_BASE_URL = process.env.INFOBIP_BASE_URL;
const INFOBIP_API_KEY = process.env.PUSH_KEY;



async function create2FAApplication() {

  const url = `${INFOBIP_BASE_URL}/2fa/1/applications`;
  const headers = {
    "Authorization": `App ${INFOBIP_API_KEY}`,
    "Content-Type": "application/json"
  };
  const data = {
    name: "MyApp2FA",
    configuration: {
      pinAttempts: 3,
      allowMultiplePinVerifications: false,
      pinTimeToLive: "5m",
      verifyPinLimit: "3/1h"
    }
  };

  try {

    const response = await axios.post(url, data, { headers });
    console.log("2FA Application Created....");
    application_id.id=response.data.applicationId;

  } catch (error) {

    console.error("Error creating 2FA application:", error.response?.data || error.message);

  };

}



export default create2FAApplication;