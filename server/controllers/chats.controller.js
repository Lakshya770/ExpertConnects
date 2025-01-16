import Message from "../models/messages.model.js";
import User from "../models/user.model.js";
import Service_Provider from "../models/service_provider.model.js";
export const getMessages = async (req, res) => {
    const { roomId } = req.params;
    try {
      const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };


export const getlabelforchat=async(req,res)=>{

    const sellerId=req.params.sellerId;
    const chattingto=req.params.chattingto;
    
    if(chattingto==1)
    {
        const data=await User.findById(sellerId);
        console.log(data);

        if(data)
        return res.status(200).json({message:"Label fetched successfully",data})

        if(!data)
        {
            return res.status(404).json({message:"User not found"})
        }
    }
    else  if(chattingto==2)
    {
        const data=await Service_Provider.findById(sellerId);
        console.log(data);

        if(data)
        return res.status(200).json({message:"Label fetched successfully",data})

        if(!data)
        {
            return res.status(404).json({message:"User not found"})
        }

    }
}