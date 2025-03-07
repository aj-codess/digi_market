import { https } from 'follow-redirects';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

var options = {
    'method': 'POST',
    'hostname': '4ewdm6.api.infobip.com',
    'path': '/2fa/2/applications',
    'headers': {
        'Authorization': `App ${process.env.PUSH_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};


const push_make_app=async()=>{
    var req = https.request(options, function (res) {
        var chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    
        res.on("error", function (error) {
            console.error(error);
        });
    });
    
    var postData = JSON.stringify({
        "name": "2fa test application",
        "enabled": true,
        "configuration": {
            "pinAttempts": 10,
            "allowMultiplePinVerifications": true,
            "pinTimeToLive": "15m",
            "verifyPinLimit": "1/3s",
            "sendPinPerApplicationLimit": "100/1d",
            "sendPinPerPhoneNumberLimit": "10/1d"
        }
    });
    
    req.write(postData);
    
    req.end();
};

export default push_make_app;