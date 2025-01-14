
import Service_Provider from "../models/service_provider.model.js";
import jwt from "jsonwebtoken";


export const verifyJWT=async(req,res,next) => {
    

     const token=req.cookies?.token 
     console.log(req.cookies);
     console.log(token," jyfvyjvyvsurayansh");
 
     if(!token)
     {
        return res.status(401).json({message:"Unauthorized Access"})
     }
 
     const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECURITY_KEY)
     console.log(decodedToken,"dec token");
 
     const user=await Service_Provider.findById(decodedToken.userId).select(
         "-password"
     )
 
     if(!user){
       return res.status(401).json({message:"Unauthorized Access"})
     }
 
    

     next();

}