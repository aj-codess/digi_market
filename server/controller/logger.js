import user_schema from "./../model/userSchema.js";
import logService from "./../services/logService.js";
import sendOTP from "../model/sender_module.js";
import verifyOTP from "../services/OTP_verify_module.js";
import sessionless_controller from "./sessionless_controller.js";

const cookieOptions = {
    httpOnly: true, 
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};


const newUser=async(req,res)=>{

    try{

        const {username,gmail,password,phone}=req.body;

        const pass_valid=logService.pass_checks(password);
        const gmail_valid=logService.mail_checks(gmail);
    
        if(!pass_valid.isValid && !gmail_valid.isValid){
            return res.status(404).json({status:"unsuccessful",message:{gmail:gmail_valid.message,password:pass_valid.message}})
        };
    
        const new_id=logService.gen_id();

        const newUser=new user_schema({
            id:new_id,
            username:username,
            email:gmail,
            password:logService.pass_crypto(password),
            phone:phone
        });

        const isSaved=await newUser.save();

        if(isSaved){

            const jwt_token=await logService.sign_token(new_id);
            res.cookie('auth_token', jwt_token, cookieOptions);

            return res.status(200).json({
                email: log_mail_checks,
                password: log_pass_checks,
                message: 'Authentication successful',
            });

        };

    } catch(error){
        return res.status(500).json({status:"failed",message:"Internal Server Problem"});
    }

};


const oldUser=async(req,res)=>{

    try{

        const {gmail,password}=req.body;

        if(!password || password.length<1){
            const isUser=await user_schema.findOne({
                email:gmail
            });

            if(isUser){

                const OTP_is_sent=await sendOTP(isUser.phone);

                const verify_pinStore = await user_schema.findOneAndUpdate(
                    { email: gmail },
                    { 
                        $set: { OTP_pin_id: OTP_is_sent.pinId }
                    },
                    { new: true }
                );

                if(verify_pinStore){
                    return res.status(200).json({
                        "to": OTP_is_sent.to,
                        "message": OTP_is_sent.ncStatus
                    });
                } else{
                    return res.status(500).json({status:"Failed",message:"Internal Server Error. OTP not Sent Try Again"});
                };

            };

            return res.status(404).json({status:"Failed",message:"Error Finding User"});
        };

        if(!logService.mail_checks(gmail) || !logService.pass_checks(password)){
            return res.status(401).json({status:"Failed",message:"Initials Didnt pass criteria"});
        };

        const isUser=await user_schema.findOne({
            email:gmail
        });

        if(isUser){
            const pass_crypto=logService.pass_crypto(password);

            if(pass_crypto === isUser.password){
                const jwt_token=await logService.sign_token(isUser.id);
                res.cookie('auth_token',jwt_token,cookieOptions);

                res.status(200).json({
                    status:"success",
                    gmail:isUser.email,
                    message:"Logged In Successfully"
                });
            } else{
                res.status(404).json({
                    status:"Error",
                    message:"User Not Found"
                });
            }
        }

        res.status(404).json({message:"Error looggin"});

    } catch(error){
        return res.status(500).json({status:"failed",message:"Internal Server Problem"});
    }

};



const verify_OTP=async(req,res)=>{

    try{

        const {gmail,pinCode}=req.body;

        const findUser=await user_schema.findOne(
            {email:gmail}
        );

        if(findUser){
            const isVerified=await verifyOTP(findUser.OTP_pin_id,pinCode);

            if(isVerified.verified==false){
                return res.status(403).json(isVerified);
            };

            const jwt_token=logService.sign_token(findUser.id);

            res.cookie('auth_token',jwt_token,cookieOptions);

            return res.status(200).json({
                email: log_mail_checks,
                password: log_pass_checks,
                message: 'Authentication successful',
            });
        };

        return res.status(404).json({satus:"Failed",message:"User not found"});

    } catch(error){

        return res.status(500).json({status:"failed",message:"Internal Server Problem"});

    }

};


const sessionless=async(req,res)=>{

    try{

        const authHeader = req.headers.authorization;

        const deviceFromHeader = authHeader && authHeader.startsWith("os ") ? authHeader.split(" ")[1] : null;
    
        const temp_id=logService.gen_id();

        const token = await logService.sign_token(temp_id);

        const session_isCreated=sessionless_controller.create_session(temp_id,deviceFromHeader);

        if(session_isCreated){
            res.cookie('auth_token', token, cookieOptions);

            return res.json({
                message: 'Temporary Session successful'
            });
        } else{

            return res.json({
                message:"Unable to create Temporary Session"
            })

        }

    } catch(error){

        console.error('Error during token creation:', error);

        return res.status(500).json({ error: 'Internal Server Error' });

    }

};


const remove_session=async()=>{
    try{

        if(sessionless_controller.idIsIn_session(user_id)){

            sessionless_controller.delete_session(user_id);
            
            return res.status(200).json({message:"Temporary Session Deleted."})
        };

    } catch(error){

        console.error('Error During Session Deletion :', error);

        return res.status(500).json({ error: 'Internal Server Error' });

    };

};


export default {
    newUser,
    oldUser,
    verify_OTP,
    sessionless
};