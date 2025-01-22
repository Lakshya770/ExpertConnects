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
import { Server } from 'socket.io'
import {createServer} from 'http'
import chatSocketHandler from './chatsockethandler.js'
import router_chat from './routes/chat.route.js'






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

const server=createServer(app);

const io = new Server(server, {
    cors:{
        origin:['https://expert-connect.vercel.app','http://localhost:5173'],

        methods: ['GET', 'POST'],
        credentials:true
    }
})

chatSocketHandler(io);



app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(cors({
    origin:['https://expert-connect.vercel.app','http://localhost:5173'],
    credentials:true,
}))



const port=process.env.PORT || 3000


export const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID || "rzp_test_f9PijVgCTjKQsM" ,
    key_secret:process.env.RAZORPAY_KEY_SECRET|| B0KC6Ja3bHM2f3Yqjz5pbQUY,
});


app.get('/', (req, res) => {
    res.send({message: 'Hello World'})
})

app.get('/getuserdatafromcookie',(req,res)=>{
    const loggedInuser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    const boolval = req.cookies.loggedIn || 0;

    res.status(200).json({loggedInuser,boolval})
})



app.use("/api/user",routeruser)
app.use("/api/service_provider",router_server)
app.use("/api/service",router_services)
app.use("/api/payments",routerpayments)
app.use("/api/orders",router_order)
app.use('/api/messages', router_chat);

server.listen(port, () => {
console.log(`Server is running on port ${port}`)})



