import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    Category:{
        type:String,
        required:true
    },
    Specialisedin:{
        type:String,
    },
    Experience:{
        type:Number,
        required:true,
    },
    Title:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Coverphotouser:{
        type:String,
        required:true
    },
    Slots:[{
        day:{
            type:String,
            enum:["Monday","Tuesday","Wednesday","Thursday","Friday"],
            required:true
        },
        time:{
            type:Number,
            enum:[6,8,10],
            required:true
        },
        isbooked:{
            type:Boolean,
            default:false
        },
        bookedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null
        },
        boolval:{
            type:Number,
            default:0
        }
    }],
    serviceprovider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service_Provider",
        required:true
    }
    
},{timestamps:true});

const Service = mongoose.model("Service",serviceSchema);
export default Service
