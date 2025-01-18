import mongoose from "mongoose";
import bcrypt from "bcryptjs";  // Import bcrypt for password hashing
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registeruser = async (req, res) => {
  const { Name, Email, Password,CoverPhotouser } = req.body;

  // Check if all fields are provided
  if (!Name || !Email || !Password||!CoverPhotouser) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    
    const existeduser = await User.findOne({ Email });
    if (existeduser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = bcrypt.hashSync(Password, 10);
    console.log("at time of register",hashedPassword);

    // Create a new user
    const nuser = await User.create({
      Name,
      Email,
      Password: hashedPassword,
      CoverPhotouser,

    });

    // Find and return the created user (excluding password)
    const createduser = await User.findById(nuser._id).select("-Password");
    if (!createduser) {
      return res.status(400).json({ message: "User not created, something went wrong while registering" });
    }

    // Send success response
    return res.status(200).json({
      message: "User created successfully",
      user: createduser
    });

  } catch (error) {
    // Handle any server errors
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECURITY_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
  
  return  accessToken;
}


export const loginuser = async (req, res) => {
  const { Emaillogin, Passwordlogin } = req.body;
  if(!Emaillogin || !Passwordlogin){
    return res.status(400).json({message:"All fields are required"})
  }
  console.log(Emaillogin, Passwordlogin);

  const user = await User.findOne({Email:Emaillogin});
  if(!user){
    return res.status(404).json({message:"User not found"})
  }

  console.log(user);
  console.log(Passwordlogin); 
  console.log(user.Password);  

  const isPasswordCorrect = bcrypt.compareSync(Passwordlogin.trim(), user.Password.trim());
  console.log("Password comparison result:", isPasswordCorrect);

  if(!isPasswordCorrect){
    return res.status(400).json({message:"Invalid credentials"})
  }

  const token = generateToken(user._id);

  const loggedinuser=await User.findById(user._id).select("-Password");

  const options={
    secure:true,
    sameSite:"none",
  }

  return res.status(200)
  .cookie("token",token,options)
  .cookie("loggedIn",1,options)
  .cookie("user",JSON.stringify(loggedinuser),options)
  .json({message:"Login successful",loggedinuser});

}


export default registeruser;




