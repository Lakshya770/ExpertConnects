import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
const Myclients = () => {

    const id=useParams().id
    const [fetchd,setfetchd]=useState([]);
    const [statuscode,setstatuscode]=useState(0);

    useEffect(()=>{

        const datafetch=async()=>{
            const dt=await axios.get(`http://localhost:3000/api/Orders/myclients/${id}`,{withCredentials:true})
            console.log(dt.data);
            setstatuscode(dt.data.code);
            if(dt.data.code!=404){
            setfetchd(dt.data.myclients);
              }
            }
        datafetch();
    },[])


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
                statuscode==404?
                (<div>No service found</div>):
            (<div className="flex items-center justify-center">
                <img src="/images/Loading.gif" className="w-40 h-40" alt="loading" />
            </div>))
        }
    </div>;
};

export default Myclients;