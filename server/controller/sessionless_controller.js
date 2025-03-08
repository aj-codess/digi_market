import session_handler from "./../services/session.js";

const create_session=(user_id,user_os)=>{

    try{

        return session_handler.create(user_id,user_os);

    } catch(error){

        console.error({
            message: error.message,
            name: error.name,
            stack: error.stack,
          });

    }

}

const delete_session=(user_id)=>{
    try{

        return session_handler.delete_session(user_id);

    } catch(error){

        console.error({
            message: error.message,
            name: error.name,
            stack: error.stack,
          });

    }
}

const update_lastSigned=(user_id)=>{

    return session_handler.update_last_signed(user_id);

}

const idIsIn_session=(user_id)=>{

    return session_handler.isValid(user_id);

}


//make a mechanism which runs after every 3hrs deleting unaccesses sessions

export default {
    create_session,
    delete_session,
    update_lastSigned,
    idIsIn_session
}