import {User} from './user.model.js'

export const getMyProfileService=(id)=>{
    console.log("id",id);
    const userProfile=User.findById(id);
    return userProfile;
}