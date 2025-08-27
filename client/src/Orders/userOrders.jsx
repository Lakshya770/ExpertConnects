import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";
import { useStore } from "../store.js";
import { useLocation } from "react-router-dom";

const server_url = import.meta.env.VITE_SERVER_URL;

const MyOrders = () => {
  const location = useLocation();
  const id = useParams().id;
  const loggedinuser = useStore((state) => state.loggedInuser);
  const loggednum = useStore((state) => state.boolval);

  const [fetchd, setfetchd] = useState([]);
  const [statuscode, setstatuscode] = useState(0);

  useEffect(() => {
    if (loggednum == 1) {
      const datafetch = async () => {
        const dt = await axios.get(
          `${server_url}api/orders/getuserorders/${id}`,
          { withCredentials: true }
        );

        setstatuscode(dt.data.code);

        if (dt.data.code != 404) {
          setfetchd(dt.data.data);
        }
      };

      datafetch();
    }

    if (loggednum == 2) {
      const datafetch = async () => {
        const dt = await axios.get(
          `${server_url}api/orders/getsellerorders/${id}`,
          { withCredentials: true }
        );

        setstatuscode(dt.data.code);

        if (dt.data.code != 404) {
          setfetchd(dt.data.data);
        }
      };

      datafetch();
    }
  }, [location, loggednum, id]);

  const navigate = useNavigate();

  const contact = (idofseller) => {
    const sellersid = idofseller;
    const mineid = id;
    const boolean = 2;
    navigate(`/Chat/${mineid}/${sellersid}/${boolean}`);
  };

  return (
    <div className="w-full">
      {fetchd?.length > 0 ? (
        <div className="w-11/12 mx-auto">
          {fetchd?.map((dt, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm bg-slate-100 hover:shadow-md transition-shadow duration-200 m-5 gap-4"
            >
              {/* Left: Seller Info */}
              <div className="flex items-center w-full md:w-1/3">
                <img
                  src={dt.service?.Coverphotouser}
                  alt="Service"
                  className="w-20 h-20 rounded-lg object-cover mr-4 border border-gray-200"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-lg font-medium text-gray-700">
                    {dt.orderfromServiceProvider?.SellerName}
                  </h2>
                  <h2 className="text-sm text-gray-500 break-all">
                    {dt.orderfromServiceProvider?.SellerEmail}
                  </h2>
                </div>
              </div>

              {/* Middle: Service Info */}
              <div className="flex flex-col items-center md:items-start w-full md:w-1/3 text-center md:text-left">
                <h1 className="text-xl font-bold text-gray-800">
                  {dt.service?.Title}
                </h1>
                <h1 className="text-sm text-gray-600">
                  {dt.service?.Category}
                </h1>
                <h1 className="text-sm text-gray-500 mt-1">
                  {JSON.parse(dt.selectedslot).day} at{" "}
                  {JSON.parse(dt.selectedslot).time}:00
                </h1>
              </div>

              {/* Right: Button */}
              <div className="w-full md:w-auto flex justify-center">
                <button
                  className="px-4 py-2 bg-black hover:bg-gray-600 hover:scale-105 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  onClick={() => contact(dt.orderfromServiceProvider._id)}
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {statuscode == 0 ? (
            <div className="flex items-center justify-center">
              <img src="/images/Loading.gif" className="w-20 h-20 m-10" />
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-gray-600 text-center">
              No Order Found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};
export default MyOrders;
