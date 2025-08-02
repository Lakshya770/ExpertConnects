import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL;

const Myservices = () => {
  const id = useParams().id;

  const [fetchd, setfetchd] = useState([]);
  const [statuscode, setstatuscode] = useState(0);

  useEffect(() => {
    const datafetch = async () => {
      const dt = await axios.get(`${server_url}api/service/myservices/${id}`, {
        withCredentials: true,
      });

      console.log(dt.data.services);

      setstatuscode(dt.data.code);
      setfetchd(dt.data);
      // console.log(dt.data.data);
    };

    datafetch();
  }, []);

  return (
    <div class="flex flex-wrap justify-center items-start py-6 px-4">
      {statuscode != 404 && fetchd?.services?.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {fetchd?.services?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row border border-gray-300 shadow-lg rounded-lg overflow-hidden w-1/2  h hover:scale-105 hover:shadow-xl transition-all duration-200"
            >
              <img
                src={item.Coverphotouser}
                alt="Service Cover"
                className="w-2/5 h-auto object-cover"
              />
              <div className="flex flex-col justify-between p-4 w-3/5">
                <h1 className="text-xl font-semibold text-gray-800 truncate">
                  {item.Title}
                </h1>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                  {item.Description}
                </p>
                <h2 className="text-lg font-bold text-indigo-600">
                  ₹{item.Price}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full py-12">
          {statuscode === 404 ? (
            <h1 className="text-3xl font-semibold text-gray-800">
              No Services found
            </h1>
          ) : (
            <img src="/images/Loading.gif" className="w-100 h-100 m-10"></img>
          )}
        </div>
      )}
    </div>
  );
};
export default Myservices;
