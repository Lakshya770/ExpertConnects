
import Service_Provider from "../models/service_provider.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const verifyJWT=async(req,res,next) => {
    

     const token=req.cookies?.token 
     const loggedIn=req.cookies?.loggedIn

     console.log(req.cookies);
     console.log(token," jyfvyjvyvsurayansh");
 
     if(!token)
     {
        return res.status(401).json({message:"Unauthorized Access"})
     }
 
     const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECURITY_KEY)
     console.log(decodedToken,"dec token");
 
     if(loggedIn==2){
      const user=await Service_Provider.findById(decodedToken.userId).select(
        "-password")

        if(!user){
          return res.status(401).json({message:"Unauthorized Access"})
        }
    
     }
     else if(loggedIn==1){

      const user=await User.findById(decodedToken.userId).select(
        "-password")

        if(!user){
          return res.status(401).json({message:"Unauthorized Access"})
        }
     }
     next();

}