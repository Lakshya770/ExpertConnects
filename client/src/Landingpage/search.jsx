import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slide from "../components/Slide"; // Import the Slide component

const server_url = import.meta.env.VITE_SERVER_URL;

const Search = () => {
  const [searchtext, setsearchtext] = useState("All");
  const [boolval, setboolval] = useState(0);
  const [services, setservices] = useState([]);
  const [fixservices, setfixservices] = useState([]);

  const [sliderSettings, setSliderSettings] = useState({
    slidesToShow: 4,
    arrowsScroll: 3,
  });

  useEffect(() => {
    const updateSliderSettings = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSliderSettings({ slidesToShow: 1, arrowsScroll: 1 });
      } else if (width >= 640 && width < 1024) {
        setSliderSettings({ slidesToShow: 2, arrowsScroll: 2 });
      } else if (width >= 1024 && width < 1280) {
        setSliderSettings({ slidesToShow: 3, arrowsScroll: 2 });
      } else {
        if (services.length > 4)
          setSliderSettings({ slidesToShow: 4, arrowsScroll: 3 });
        else
          setSliderSettings({
            slidesToShow: Math.max(1, services.length - 1),
            arrowsScroll: 2,
          });
      }
    };

    updateSliderSettings();
    window.addEventListener("resize", updateSliderSettings);

    return () => {
      window.removeEventListener("resize", updateSliderSettings);
    };
  }, [services]);

  const navigate = useNavigate();

  const bookslotfunc = (servicedata) => {
    const id = servicedata._id;
    navigate(`/bookslot/${id}`, { state: { servicedata } });
  };

  const onsearch = (e) => {
    e.preventDefault();
    setboolval(boolval === 1 ? 0 : 1);
  };

  useEffect(() => {
    const fetchcards = async () => {
      if (searchtext === "") {
        setservices(fixservices);
        return;
      }
      const carddatafetched = await axios.get(
        `${server_url}api/service/getserviceformain/${searchtext}`
      );
      if (searchtext === "All") {
        setfixservices(carddatafetched.data.services);
      }
      setservices(carddatafetched.data.services);
    };
    fetchcards();
  }, [, boolval]);

  const changefunc = (e) => {
    setsearchtext(e.target.value);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div className="relative">
        <img
          src="/images/bg.png"
          alt="backgroundimage"
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white">
            Find your Expert
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white mt-2">
            Right away...
          </h1>

          <form
            onSubmit={onsearch}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 w-full max-w-xl"
          >
            <input
              type="text"
              placeholder="Search for the services..."
              className="flex-1 h-10 rounded-full border-2 border-black placeholder:text-center text-center px-3 w-full"
              onChange={changefunc}
            />
            <button
              type="submit"
              className="text-white bg-blue-900 px-4 py-2 rounded-full hover:bg-blue-800 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* CARDS SECTION */}
      <div>
        {services?.length > 0 ? (
          <Slide {...sliderSettings}>
            {services.map((item) => (
              <div
                className="flex flex-col w-64 sm:w-72 h-96 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 mt-10 overflow-hidden"
                key={item._id}
              >
                <img
                  src={item.Coverphotouser}
                  alt="image"
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="flex flex-col flex-grow p-4 space-y-2">
                  <h1 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {item.Title}
                  </h1>
                  <h1 className="text-sm text-gray-600">{item.Specialisedin}</h1>

                  <h1 className="text-sm font-medium text-gray-700 flex items-center">
                    <span>
                      <img
                        className="w-8 h-8 rounded-full mr-2"
                        src={item.serviceprovider.Coverphoto}
                      />
                    </span>
                    {item.serviceprovider.SellerName}
                  </h1>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{item.Price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.Experience} yrs exp
                    </span>
                  </div>
                  <div className="flex-grow"></div>
                  <button
                    className="w-full bg-blue-900 text-white rounded-md h-11 hover:bg-blue-800 transition-colors duration-200"
                    onClick={() => bookslotfunc(item)}
                  >
                    Book an appointment
                  </button>
                </div>
              </div>
            ))}
          </Slide>
        ) : (
          <div className="flex items-center justify-center">
            <img src="/images/Loading.gif" className="w-20 h-20 m-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
