import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routeruser from './routes/user.route.js'
import router_server from './routes/service_provider.route.js'
import router_services from './routes/service.route.js'
import routerpayments from './routes/payments.route.js'
import Razorpay from 'razorpay'
import router_order from './routes/order.route.js'
import cookieParser from "cookie-parser";




dotenv.config(
    {
        path: './.env'
    }
)


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
    }
    catch(error){
        console.log(`Error in database connectivity ${error}`)
    }
}




connectDB()
const app = express()




app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))



const port=process.env.PORT || 3000


export const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID || "rzp_test_f9PijVgCTjKQsM" ,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
});


app.get('/', (req, res) => {
    res.send({message: 'Hello World'})
})



app.use("/api/user",routeruser)
app.use("/api/service_provider",router_server)
app.use("/api/service",router_services)
app.use("/api/payments",routerpayments)
app.use("/api/orders",router_order)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)})

