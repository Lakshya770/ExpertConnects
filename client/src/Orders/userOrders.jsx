import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect ,useState} from 'react';
import axios from 'axios';

const MyOrders = () => {
    const id=useParams().id;

    const loggednum=Cookies.get('loggedIn')
    // for seller 2, user 1

    const [fetchd,setfetchd]=useState([]);
    const [statuscode,setstatuscode]=useState(0);
    

    useEffect(()=>{
        
        if(loggednum==1){
            
            const datafetch=async()=>{
                const dt=await axios.get(`http://localhost:3000/api/orders/getuserorders/${id}`,{withCredentials:true})

                setstatuscode(dt.data.code);

                if(dt.data.code!=404){
                    setfetchd(dt.data.data);
                }
                
                console.log(dt.data.data);
                
                
            }

            datafetch();
            
        }




        
        if(loggednum==2){
            
            const datafetch=async()=>{
                const dt=await axios.get(`http://localhost:3000/api/orders/getsellerorders/${id}`,{withCredentials:true})

                console.log(dt);


                setstatuscode(dt.data.code);

                if(dt.data.code!=404){
                    setfetchd(dt.data.data);
                }

                
                console.log(dt.data.data);
            }

            datafetch();
        }
    },[])


    



    return  <div>

        {fetchd.length>0 ?
            (
                    <div className='w-11/12 mx-auto align-middle'>
                        
                        {
                        fetchd?.map((dt,index)=>(
                                           <div
                                            key={index}
                                            className="flex flex-row items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm bg-slate-100 hover:shadow-md transition-shadow duration-200 m-5 px-10 "
                                            >
                                            
                                            
                                            <div className="flex items-center">
                                            <img
                                                src={dt.service?.Coverphotouser}
                                                alt="Service"
                                                className="w-20 h-20 rounded-lg object-cover mr-4 border border-gray-200"
                                            />
                                            <div>
                                                <h2 className="text-lg font-medium text-gray-700">{dt.orderfromServiceProvider.SellerName}</h2>
                                                <h2 className="text-sm text-gray-500">{dt.orderfromServiceProvider.SellerEmail}</h2>
                                            </div>
                                            </div>

                                            <div>
                                            <h1 className="text-xl font-bold text-gray-800 align-middle">{dt.service.Title}</h1>
                                            <h1 className="text-sm text-gray-600 text-center">{dt.service.Category}</h1>
                                            <h1 className="text-sm text-gray-500 mt-1 text-center">
                                                {JSON.parse(dt.selectedslot).day} at {JSON.parse(dt.selectedslot).time}:00
                                            </h1>
                                            </div>

                                            <div >
                                            <button
                                                        onClick={() => alert("Contact initiated!")}
                                                        className="px-4 py-2 bg-black hover:bg-gray-600 hover:scale-105 text-white text-sm font-medium rounded-lg transition-colors duration-200 "
                                                        >
                                                        Contact
                                                        </button>
                                            </div>
                                            </div>

                        ))
                        }

                        

                    </div>
            )
            :(
                <div>
                    {statuscode===0?
                    <div className="flex items-center justify-center">
                     <img src="/images/Loading.gif" className="w-100 h-100 m-10"></img>
                    </div>
                   :<h1 className='text-2xl font-bold text-gray-600 text-center'>No Order Found </h1>}
                </div>
            )
        }
    </div>
}
export default MyOrders