import log_service from "./../services/logService.js";

const cookie_validity=async(token)=>{

    const decode=await log_service.verify_token(token);

    if(decode){
        return {
            tokenIsValid:true,user_id:decode.user_id
        };
    };

    return {
        tokenIsValid:false
    };

};


export default {
    cookie_validity
}