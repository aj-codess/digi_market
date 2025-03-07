import user_schema from "./../model/userSchema.js";
import logService from "./../services/logService.js";


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


const oldUser=(req,res)=>{

};


const sessionless=(req,res)=>{

};


export default {
    newUser,
    oldUser,
    sessionless
};