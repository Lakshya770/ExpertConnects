import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const server_url = import.meta.env.VITE_SERVER_URL;

const Tilespecific = () => {
    const name = useParams().name;
    const [carddata, setcarddata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${server_url }api/service/getsellersservicescategory/${name}`,{withCredentials:true});
                setcarddata(response.data.services);
            } catch (error) {
                console.error('Error fetching services data:', error);
            }
        };
        fetchdata();
    }, [name]);

    const bookslotfunc = (servicedata) => {
        const id = servicedata._id;
        navigate(`/bookslot/${id}`, { state: { servicedata } });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {!carddata || carddata.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-sm">
                        <img 
                            src="/images/no-data.svg" 
                            alt="No services" 
                            className="w-48 h-48 mb-4 opacity-50"
                        />
                        <h1 className="text-2xl font-semibold text-gray-600">
                            No Services Available
                        </h1>
                        <p className="mt-2 text-gray-500">
                            No services are currently available in this category
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {carddata.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="relative">
                                    <img 
                                        src={item.Coverphotouser} 
                                        alt={item.Title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg">
                                        ₹{item.Price}
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                                            {item.Title}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Specializes in {item.Specialisedin}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-medium">
                                               <img  className="w-8 h-8 rounded-full" src={item.serviceprovider.Coverphoto}/>
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {item.serviceprovider.SellerName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {item.Experience} years of experience
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => bookslotfunc(item)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Book an Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tilespecific;