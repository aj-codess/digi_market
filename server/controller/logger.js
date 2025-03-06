import logService from "./../services/logService.js";

const newUser=(req,res)=>{

    try{

        const {username,gmail,password,phone}=req.body;

        const pass_valid=logService.pass_checks(password);
        const gmail_valid=logService.mail_checks(gmail);
    
        if(!pass_valid.isValid && !gmail_valid.isValid){
            return res.status(404).json({status:"unsuccessful",message:{gmail:gmail_valid.message,password:pass_valid.message}})
        };
    
        const new_id=logService.gen_id();

        

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