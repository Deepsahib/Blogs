export const errorMessage=(res,status,message,error,text)=>{
    return res.status(status).json({
      success:message,
      error:error,
      message:text
    })
}
export const successMessage=(res,status,success,data,message)=>{
    return res.status(status).json({
      success,
      data,
      message
    })
}