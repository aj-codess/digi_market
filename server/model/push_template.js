import { https } from 'follow-redirects';
import fs from "fs";
import dotenv from "dotenv";
import generateUniqueId from 'generate-unique-id';

dotenv.config();


const generate_pin=()=>{
    
};

var options = {
    'method': 'POST',
    'hostname': '4ewdm6.api.infobip.com',
    'path': `/2fa/2/applications/${process.env.SECRET_KEY}/messages`,
    'headers': {
        'Authorization': `App ${process.env.PUSH_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};

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
    "pinType": "NUMERIC",
    "messageText": "Your pin is {{pin}}",
    "pinLength": 4,
    "senderId": "ServiceSMS"
});

req.write(postData);

req.end();