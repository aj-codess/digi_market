const three_hours_ms=3 * 60 * 60 * 1000;

class session_info{
    constructor(){
        this.last_signed;
        this.user_os;
        this.message_queue=new Array();
    }
}


class container{
    constructor(){
        this.session=new Map();
    }

    create(key,user_os){
        try{
            this.session.set(key,new session_info());

            this.session.get(key).last_signed=new Date();
    
            this.session.get(key).user_os=user_os;

            if(this.tempUser_isExist(key)){
                return true;
            } else{
                return false;
            }
            
        } catch(error){

            console.error("error creating session");

        }

    }

    update_last_signed(key){

        try{

            this.session.get(key).last_signed=new Date();

        } catch(error){
            console.error({
                message: error.message,
                name: error.name,
                stack: error.stack,
              });
        }

    }

    tempUser_isExist(key){

        try{

            return this.session.has(key);

        } catch(error){

            console.error({
                message: error.message,
                name: error.name,
                stack: error.stack,
              });

        };
    
    }

    get_os(key){
        return this.session.get(key).user_os;
    }

    get_last_signed(key){
        return this.session.get(key).last_signed;
    }

    isValid(key){

        if(this.tempUser_isExist(key)){

            if((this.get_last_signed(key) - new Date()) >= three_hours_ms){

                return false;

            } else{
                return true;
            };

        } else{

            return false;

        }

    }


    delete_session(key){
        if(this.tempUser_isExist(key)){
            return this.session.delete(key);
        }
    };

};

const session_handler=new container();

export default session_handler;