import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderbyUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"},
    
    orderbySeller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service_Provider"
    },
    razorpayorderId:{
        type:String,
        required:true
    },
    boolnum:{
        type:Number,
        default:0
    },

    razorpaypaymentId:{
        type:String,
        required:true
    },
    

    orderfromServiceProvider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service_Provider",
        required:true
    },
    service:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required:true

    },
    selectedslot:{
        type:String,
        required:true
    }

},
    {timestamps:true})


    const Order = mongoose.model("Order", orderSchema);
    export default Order