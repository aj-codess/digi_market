import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateUniqueId from 'generate-unique-id'
import * as crypto from "crypto";

const saltRounds=10;

const mail_checks=(email)=>{

    const gmailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]{4,28}[a-zA-Z0-9]@gmail\.com$/;
  
    if (!gmailRegex.test(email)) {
      return {
        isValid: false,
        message:
          'Invalid Email Address.',
      };
    };
  
    return { isValid: true, message: 'Valid Gmail address' };

};


const pass_checks=(password)=>{

    const minLength = 8;
    const maxLength = 20;
    
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  

    if (password.length < minLength || password.length > maxLength) {
      return {
        isValid: false,
        message: `Password must be between ${minLength} and ${maxLength} characters long.`,
      };
    }
  

    if (!upperCasePattern.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
    }
  

    if (!lowerCasePattern.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
    }
  

    if (!numberPattern.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number.' };
    }
  

    if (!specialCharPattern.test(password)) {
      return { isValid: false, message: 'Password must contain at least one special character.' };
    }
  

    return { isValid: true, message: 'Password is valid.' };

};



const pass_crypto=(password)=>{

  try{

    const salt = bcrypt.genSaltSync(saltRounds);
  
    const pass_hash = bcrypt.hashSync(password, salt);
  
    return pass_hash;

  } catch(error){

    console.error("unabe to hash password: ",error.message);

  }

};


const gen_id=()=>{

  const id = generateUniqueId({
    includeSymbols: ['@','#','|'],
    excludeSymbols: ['0'],
    length:15
  });

    return id;
};



const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});



const sign_token = async (id) => {

  return new Promise((resolve, reject) => {
    jwt.sign(
      { user_id: id },
      privateKey,
      { algorithm: 'RS256' },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};



const verify_token = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicKey,
      { algorithms: ['RS256'] },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

  
  export default {
    mail_checks,
    pass_checks,
    gen_id,
    sign_token,
    verify_token,
    pass_crypto
  };
  