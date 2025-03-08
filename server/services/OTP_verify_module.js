import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const INFOBIP_BASE_URL=process.env.INFOBIP_BASE_URL;
const INFOBIP_API_KEY=process.env.PUSH_KEY;

async function verifyOTP(pinId, pinCode) {

    const url = `${INFOBIP_BASE_URL}/2fa/1/pin/${pinId}/verify`;

    const headers = {
      "Authorization": `App ${INFOBIP_API_KEY}`,
      "Content-Type": "application/json"
    };
    
    const data = { pin: pinCode };
  
    try {

      const response = await axios.post(url, data, { headers });
      console.log("OTP Verified:", response.data);

      return response.data;

    } catch (error) {

      console.error("Error verifying OTP:", error.response?.data || error.message);

    };

}
  

export default verifyOTP;