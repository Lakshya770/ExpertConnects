import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const server_url = import.meta.env.VITE_SERVER_URL;

// dotenv.config();
const Myclients = () => {

    const id=useParams().id
    const [fetchd,setfetchd]=useState([]);
    const [statuscode,setstatuscode]=useState(0);
    const navigate=useNavigate();

    useEffect(()=>{

        const datafetch=async()=>{
            const dt=await axios.get(`${server_url}api/orders/myclients/${id}`,{withCredentials:true})
            console.log(dt.data);
            setstatuscode(dt.data.code);
            if(dt.data.code!=404){
            setfetchd(dt.data.myclients);

              }
            }
        datafetch();
    },[id])

    const contact=(idofseller,boolean)=>{
        
        const sellersid=idofseller;
        const mineid=id;
        console.log("mindeid",mineid,"sellersid",sellersid);
        navigate(`/Chat/${mineid}/${sellersid}/${boolean}`);

    }


    return <div>
        {
            statuscode == 200 && fetchd?.length > 0?(
                <div>
                    {
                        fetchd.map((dt,index)=>(
                            

                            <div
                                            key={index}
                                            className="flex flex-row items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm bg-slate-100 hover:shadow-md transition-shadow duration-200 m-5 px-10 "
                                            >
                                            
                                            
                                            <div className="flex items-center">
                                            <img
                                                src={dt?.orderbyUser?.CoverPhotouser}
                                                alt="Service"
                                                className="w-20 h-20 rounded-lg object-cover mr-4 border border-gray-200"
                                            />


                                            <div>
                                                <h2 className="text-lg font-medium text-gray-700">{dt.orderbyUser?.Name}</h2>
                                                <h2 className="text-sm text-gray-500">{dt.orderbyUser?.Email}</h2>
                                            </div>


                                            </div>

                                            <div>
                                            <h1 className="text-xl font-bold text-gray-800 align-middle">{dt.service.Title}</h1>
                                            {/* <h1 className="text-sm text-gray-600 text-center">{dt.service.Category}</h1> */}
                                            <h1 className="text-sm text-gray-500 mt-1 text-center">
                                                {JSON.parse(dt.selectedslot).day} at {JSON.parse(dt.selectedslot).time}:00 PM
                                            </h1>
                                            </div>

                                            <div >
                                            <button
                                                        onClick={()=>contact(dt.orderbyUser._id || dt.orderbySeller._id,dt.boolnum) }
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
                statuscode==404?
                (<div>No service found</div>):
            (<div className="flex items-center justify-center">
                <img src="/images/Loading.gif" className="w-40 h-40" alt="loading" />
            </div>))
        }
    </div>;
};

export default Myclients;