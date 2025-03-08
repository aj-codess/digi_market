import logger from "./../controller/logger.js";

const log_router=express.Router();

log_router.post("/newUser",(req,res)=>{
    logger.new_user(req,res);
});

log_router.post("/oldUser",(req,res)=>{
    logger.old_user(req,res)
});

log_router.post("OTP_verification",(req,res)=>{
    logger.verify_OTP(req,res);
});

log_router.post("/sessionless",(req,res)=>{
    logger.sessionless(req,res)
});

export default log_router;