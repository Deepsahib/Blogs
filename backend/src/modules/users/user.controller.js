import { errorMessage, successMessage } from "../../config/errohandler/errorhandler.js";
import { getMyProfileService } from "./user.service.js";

export const getMyProfile = async (req,res) => {
  try {
    
    const {user} = req;
 
    const profile = await getMyProfileService(user);
    return successMessage(res,200,true,profile,"Your profile has been fetched");
  } catch (error) {
    return errorMessage(res, 400, false, error.message, "There has been error get profile");
  }
};
