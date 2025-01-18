import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const server_url = import.meta.env.VITE_SERVER_URL;

const Sellercarddetails = () => {
  const id = useParams().id;
  const [dataaboutcards, setdataaboutcards] = useState([]);
  const [detailsofseller, setdetailsofseller] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const dataaboutcardsfetched = await axios.get(
        `${server_url}api/service/getsellersservices/${id}`,{withCredentials:true}
      );
      const detailsofsellerfetched = await axios.get(
        `${server_url }api/service_provider/getsellerinfo/${id}`,{withCredentials:true}
      );

      setdataaboutcards(dataaboutcardsfetched.data);
      setdetailsofseller(detailsofsellerfetched.data);
    };
    fetchdata();
  }, [id]);

  const bookslotfunc = (servicedata) => {
    const id = servicedata._id;
    navigate(`/bookslot/${id}`, { state: { servicedata } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      {/* Seller Info Section */}
      <div className="w-11/12 max-w-5xl bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center">
        <img
          src={detailsofseller.Coverphoto || "/images/placeholder.png"}
          className="w-32 h-32 rounded-full object-cover border border-gray-200 mb-4 md:mb-0 md:mr-6"
          alt="Seller"
        />
        <div className="text-center md:text-left">
          <h1 className="text-xl font-semibold text-gray-800">
            {detailsofseller.SellerName || "Seller Name"}
          </h1>
          {/* Uncomment if description exists */}
          <p className="text-gray-600 mt-2">{detailsofseller.Description}</p>
          <p className="text-gray-600 mt-2">{detailsofseller.SellerEmail}</p>

        </div>
      </div>

      {/* Services Section */}
      <div className="w-11/12 max-w-5xl">
        {dataaboutcards.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataaboutcards?.services?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg hover:scale-105 transition duration-200"
              >
                <img
                  src={item.Coverphotouser || "/images/placeholder.png"}
                  className="w-full h-40 object-cover rounded-md mb-4"
                  alt="Service"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.Title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                  {item.Description}
                </p>
                <h3 className="text-blue-600 font-bold text-lg mb-4">
                ₹{item.Price}
                </h3>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  onClick={() => bookslotfunc(item)}
                >
                  Book an Appointment
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img
              src="/images/Loading.gif"
              className="w-20 h-20"
              alt="Loading..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sellercarddetails;
