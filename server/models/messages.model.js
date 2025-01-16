import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    roomId:{
        type:String,
        required:true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      senderType: {
        type: String,
        enum: ['User', 'ServiceProvider'], 
        required: true,
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      receiverType: {
        type: String,
        enum: ['User', 'ServiceProvider'], 
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      
},{timestamps:true})


const Message=mongoose.model("Message",messageSchema)
export default Message


