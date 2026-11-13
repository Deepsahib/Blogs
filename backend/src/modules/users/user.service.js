import {User} from './user.model.js'

export const getMyProfileService=(id)=>{
    
    const userProfile=User.findById(id);
    return userProfile;
}