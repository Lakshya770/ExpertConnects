import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Bookslots = () => {
  const location = useLocation();
  const [data, setdata] = useState([]);
  const [selectedslot, setselectedslot] = useState({});
  const [sellerdata, setsellerdata] = useState([]);
  const userloggedIN = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;
  const serviceid = useParams().id;

  const { servicedata } = location.state || {};
  const service_providerid = data?.serviceprovider?._id;
  const boolvalue = Cookies.get("loggedIn");

  useEffect(() => {
    setdata(servicedata);
    const fetchsellerdata = async () => {
      const id = servicedata.serviceprovider._id;
      const paymentby = await axios.get(
        `http://localhost:3000/api/service_provider/getsellerinfo/${id}`,
        { withCredentials: true }
      );
      setsellerdata(paymentby.data);
    };
    fetchsellerdata();
  }, [servicedata]);

  useEffect(() => {
    console.log(selectedslot);
  }, [selectedslot]);

  const checkouthandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:3000/api/payments/getkey",{withCredentials:true});

    const {
      data: { order },
    } = await axios.post("http://localhost:3000/api/payments/checkout", {
      amount,
    },{withCredentials:true});

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: userloggedIN?.Name,
      image: userloggedIN?.CoverPhotouser,
      order_id: order.id,
      callback_url: `http://localhost:3000/api/payments/paymentverification?orderbyUser=${userloggedIN._id}&service=${serviceid}&boolnum=${boolvalue}&orderfromServiceProvider=${service_providerid}&selectedslot=${encodeURIComponent(
        JSON.stringify(selectedslot)
      )}`,
      prefill: {
        name: userloggedIN?.Name,
        email: userloggedIN?.Email,
      },
      theme: {
        color: "#121212",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const handleClick = (slot) => {
    if (!slot.isbooked) setselectedslot(slot);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {data ? (
        <>
          {data?.Slots?.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-100 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gray-800 px-6 py-8">
                  <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Book Your Slot
                  </h1>
                  <p className="text-blue-100 text-center">
                    {data.Description || "Service Description"}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data?.Slots?.map((slot) => (
                      <div
                        key={`${slot.time}-${slot.day}`}
                        className={`relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 transform hover:scale-105
                          ${
                            slot.isbooked
                              ? "bg-gray-300 cursor-not-allowed"
                              : selectedslot === slot
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-white hover:bg-gray-50"
                          }`}
                        onClick={() => handleClick(slot)}
                      >
                        <div className={`p-4 text-center
                          ${
                            slot.isbooked
                              ? "text-gray-500"
                              : selectedslot === slot
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          <div className="font-semibold text-lg mb-1">
                            {slot.day}
                          </div>
                          <div className="text-sm">
                            {`${slot.time}:00 PM`}
                          </div>
                          {slot.isbooked && (
                            <span className="absolute top-2 right-2 text-xs font-medium text-red-500">
                              Booked
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`mt-8 w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 
                      ${
                        !selectedslot || selectedslot.isbooked
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-700 transform hover:-translate-y-1 hover:shadow-lg"
                      }`}
                    onClick={() => checkouthandler(data.Price)}
                    disabled={!selectedslot || selectedslot.isbooked}
                  >
                    {selectedslot.isbooked 
                      ? "Slot Unavailable"
                      : selectedslot.time 
                      ? "Proceed to Checkout"
                      : "Select a Slot"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center p-8">
          <p className="text-gray-700 text-lg font-medium">
            No service details available
          </p>
        </div>
      )}
    </div>
  );
};

export default Bookslots;