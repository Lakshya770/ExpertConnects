import Razorpay from "razorpay"
import crypto from "crypto";
import Order from "../models/order.model.js";
import Service from "../models/Service.model.js";
import { razorpayInstance } from "../server.js";

export const checkout=async(req,res)=>{
    

    const { amount } = req.body;
    console.log(amount);
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
          };
          const order = await razorpayInstance.orders.create(options);
        
          res.status(200).json({
            success: true,
            order
          });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Failed to create Razorpay order" });
    }
}


export const paymentVerification=async(req,res)=>{
    console.log("y h body",req.body);
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature}=req.body
    console.log('y h query',req.query)
    
    const { orderbyUser, service, boolnum, orderfromServiceProvider, selectedslot } = req.query;
    


  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {

    const temp=decodeURIComponent(selectedslot);
    const slot=JSON.parse(temp);
    console.log(slot)
    
    if(boolnum==1)
    {
       const neworder= await Order.create({
            orderbyUser:orderbyUser,
            razorpayorderId:razorpay_order_id,
            boolnum,
            razorpaypaymentId:razorpay_payment_id,
            orderfromServiceProvider,
            service,
            selectedslot:temp
            
    });
    console.log(neworder)
    }
    else{
         const neworder=await Order.create({
            orderbySeller:orderbyUser,
            razorpayorderId:razorpay_order_id,
            boolnum,
            razorpaypaymentId:razorpay_payment_id,
            orderfromServiceProvider,
            service,
            selectedslot:temp,

    });

    console.log(neworder)

    }

    
    const result = await Service.updateOne(
        { _id: service }, 
        {
            $set: {
                "Slots.$[matchedSlot].isbooked": true,
                "Slots.$[matchedSlot].bookedby": orderbyUser, 
                "Slots.$[matchedSlot].boolval": Number(boolnum) 
            }
        },
        {
            arrayFilters: [
                { "matchedSlot.day": slot.day, "matchedSlot.time": slot.time }
            ]
        }
    );
    

    res.redirect(
      `https://expert-connect.vercel.app/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
}