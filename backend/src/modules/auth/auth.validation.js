export const validateRegisterUser=(body)=>{
     
    if(!body){
        throw new Error("Detials are not present");
    }

    if(body.userName.length<3){
        throw new Error("Username should be of 3 characters");   
    }

    if(!body.userName){
        throw new Error("Username is mandatory");
    }



    return {
        status:true
    }

}
    