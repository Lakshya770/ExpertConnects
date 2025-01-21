import mongoose from "mongoose";
import bcrypt from "bcryptjs";  // For password hashing
// import ServiceProvider from "../models/service_provider.model.js";
import jwt from "jsonwebtoken";
import Service_Provider from "../models/service_provider.model.js";

export const registerservice_provider = async (req, res) => {
  const { SellerName, SellerEmail, SellerPassword, Service, Description,Coverphoto } = req.body;

  // Check if all required fields are provided
  if (!SellerName || !SellerEmail || !SellerPassword || !Service || !Description || !Coverphoto) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if a user with the given email already exists
    const existeduser = await Service_Provider.findOne({ SellerEmail });
    if (existeduser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(SellerPassword, 10);

    // Create the new service provider
    const nserviceprovider = await Service_Provider.create({
      SellerName,
      SellerEmail,
      SellerPassword: hashedPassword,  // Store the hashed password
      Service,
      Description,
      Coverphoto,
    });

    // Fetch the created user without the password field
    const createduser = await Service_Provider.findById(nserviceprovider._id).select("-SellerPassword");
    if (!createduser) {
      return res.status(400).json({ message: "User not created, something went wrong while registering" });
    }

    // Return success response
    return res.status(201).json({
      message: "Service provider created successfully",
      user: createduser
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECURITY_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
  
  return  accessToken;
}

export const  loginseller = async (req, res) => {

  const { Emaillogin, Passwordlogin } = req.body;
  if(!Emaillogin || !Passwordlogin){
    return res.status(400).json({message:"All fields are required"})
  }
  console.log(Emaillogin, Passwordlogin);

  const user = await Service_Provider.findOne({SellerEmail:Emaillogin});
  if(!user){
    return res.status(404).json({message:"User not found"})
  }

  console.log(user);
  console.log(Passwordlogin); //from input
  console.log(user.SellerPassword);  //hashed

  const isPasswordCorrect = bcrypt.compareSync(Passwordlogin.trim(), user.SellerPassword.trim());
  console.log("Password comparison result:", isPasswordCorrect);

  if(!isPasswordCorrect){
    return res.status(400).json({message:"Invalid credentials"})
  }

  const token = generateToken(user._id);

  const loggedinuser=await Service_Provider.findById(user._id).select("-SellerPassword");

  const options={
    path:"/",
    httpOnly:true,
    secure:true,
    sameSite:"None",
  }

  return res.status(200)
  .cookie("token",token,options)
  .cookie("loggedIn",2,options)
  .cookie("user",JSON.stringify(loggedinuser),options)  // loggedinuser,options)
  .json({message:"Login successful",loggedinuser});


}



export const getsellers=async(req,res)=>{
    const carddetails=await Service_Provider.find({})
    console.log(carddetails)
    return res.status(200).send(carddetails)
}

export const getsellerinfo=async(req,res)=>{
  const id=req.params.id
  const carddetails=await Service_Provider.findById(id)
  console.log(carddetails)

  if(!carddetails){
    return res.status(404).send("Seller not found")
  }

  return res.status(200).json(carddetails)
}


