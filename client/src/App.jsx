import { useEffect, useState } from 'react'
import Signup from './signup/usersignup.jsx'
import {Signfunc} from './signup/usersignup.jsx'
import Sellersignup from './signup/sellersignup.jsx'
import Header from './Landingpage/header.jsx'
import Footer from './Landingpage/footer.jsx'
import Body from './Landingpage/body.jsx'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from './Loginpage/login.jsx'
import AddServices from './Servicespage/AddServices.jsx'
import { useStore } from './store.js'
import Cookies from 'js-cookie'
import Sellercarddetails from './detailsaboutsellercards/Sellercarddetails.jsx'
import Bookslots from './Booking/Bookslots.jsx'
import PaymentSuccess from './Booking/paymentsuccess.jsx'
import Tilespecific from './Servicespage/Tilespecific.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from './Orders/userOrders.jsx'
import Myservices from './Servicespage/Myservices.jsx'
import Myclients from './detailsaboutsellercards/Myclients.jsx'
import Chat from './Chats/Chat.jsx'


function App() {

  const OnUserLogin=useStore((state)=>state.OnUserLogin)
  const OnSellerLogin=useStore((state)=>state.OnSellerLogin)
  useEffect(()=>{
    const loggedIn=Cookies.get('loggedIn')
    if(loggedIn && loggedIn==1){
        OnUserLogin();
    }
    else if(loggedIn && loggedIn==2){
        OnSellerLogin();
    }
  },[])
  
  
  return (
    <div className='p-0 m-0'>
    <ToastContainer position="top-center" />
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export const approuter = createBrowserRouter([

  {
    path: "/",
    element: <App/>,
    children: [
      {
        path:"/",
        element: <Body/>
      },
      {
            path:"/Signup",
            element: <Signup/>
          },
          {
            path:"/Sellersignup",
            element: <Sellersignup/>
          },
          {
            path:"/Login",
            element: <Login/>
          },
          {
            path:"/addservices",
            element: <AddServices/>
          },
          {
            path:"/sellercardsdetails/:id",
            element: <Sellercarddetails/>
          },
          {
            path:"/bookslot/:id",
            element:<Bookslots/>
          },
          {
            path:"/paymentsuccess",
            element:<PaymentSuccess/>
          },
          {
            path:"/Services/:name",
            element:<Tilespecific/>
          },
          {
            path:"/myorders/:id",
            element:<MyOrders/>
          },
          {
            path:"/myservices/:id",
            element:<Myservices/>         
          },
          {
            path:"/clients/:id",
            element:<Myclients/>
          },
          {
            path:'/Chat/:mineid/:sellerid',
            element:<Chat/>
          }
          
          
    ]
  },
  
])

export default App
