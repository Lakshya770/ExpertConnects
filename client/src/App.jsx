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
import Chat from './Chats/chatwindow.jsx'
import axios from 'axios'

const server_url=import.meta.env.VITE_SERVER_URL


function App() {

  const OnUserLogin=useStore((state)=>state.OnUserLogin)
  const OnSellerLogin=useStore((state)=>state.OnSellerLogin)
  const Onlogout=useStore((state)=>state.Onlogout)
  const boolzusVal=useStore((state)=>state.boolval)
  const loggedzusInuser=useStore((state)=>state.loggedInuser)

  useEffect(() => {
    const fetchDataFromCookie = async () => {
      try {
        const respo = await axios.get(`${server_url}getuserdatafromcookie`, { withCredentials: true });
        
        if (respo.status === 200) {
          console.log("Cookie m h y ni kuch vo data h", respo.data);
          if (respo.data.boolval == 1) {
            await OnUserLogin(respo.data.loggedInuser);
          } else if (respo.data.boolval == 2) {
            await OnSellerLogin(respo.data.loggedInuser);
          } else {
            Onlogout();
          }
        }
      } catch (error) {
        console.error("Error fetching data from cookies:", error);
      }
    };
  
    fetchDataFromCookie();
  
  }, []); 
  
  
  
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
            path:'/Chat/:mineid/:sellersid/:boolean',
            element:<Chat/>
          }
          
          
    ]
  },
  
])

export default App
