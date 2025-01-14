



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slide from "../components/Slide"; // Import the Slide component

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
        console.log(services.length)
      const width = window.innerWidth;
      if (width < 750) {
        // Example for medium screens
        setSliderSettings({ slidesToShow: 1, arrowsScroll: 2 });
      } else if (width >= 750 && width < 1024) {
       
        setSliderSettings({ slidesToShow: 2, arrowsScroll: 2 });
      } else if (width >= 1024 && width < 1250) {
       
        setSliderSettings({ slidesToShow: 3, arrowsScroll: 2 });
      } else {
       
        if(services.length>4)
        setSliderSettings({ slidesToShow: 4, arrowsScroll: 3 });

        else 
        setSliderSettings({ slidesToShow:Number(services.length-1) , arrowsScroll: 3 });
 
      }
    };
    const timeoutId = setTimeout(updateSliderSettings, 50);

    updateSliderSettings(); // Update on initial render
    window.addEventListener("resize", updateSliderSettings); // Update on window resize

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSliderSettings);
      clearTimeout(timeoutId);
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
        `http://localhost:3000/api/service/getserviceformain/${searchtext}`
      );
      if (searchtext === "All") {
        setfixservices(carddatafetched.data.services);
      }
      console.log("Fetched Data:", carddatafetched);
      setservices(carddatafetched.data.services);
    };
    fetchcards();
  }, [,boolval]);

  const changefunc = (e) => {
    setsearchtext(e.target.value);
  };

  return (
    <div>
      <div>
        <img
          src="/images/bg.png"
          alt="backgroundimage"
          className="w-full h-[400px]"
        />
        <div>
          <h1 className="text-5xl text-white absolute top-56 left-16 ">
            Find your Expert
          </h1>
          <h1 className="text-5xl text-white absolute top-1/2 left-16">
            Right away...
          </h1>
          <form>
            <input
              type="text"
              placeholder="Search for the services..."
              className="w-1/2 h-10 absolute top-96 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black placeholder:text-center text-center"
              onChange={changefunc}
            />
            <button
              className="absolute top-96 left-2/3 translate-x-1/3 -translate-y-1/2 text-white bg-blue-900 w-20 h-10 rounded-full"
              onClick={onsearch}
            >
              Search
            </button>
          </form>
        </div>

      </div>


      <div >
        {services.length > 0 ? (
          <Slide  {...sliderSettings}> 
            {services.map((item) => (
                <>
              <div
  className="flex flex-col w-72 h-96 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 mt-10 overflow-hidden"
  key={item._id}
>
  <img 
    src={item.Coverphotouser} 
    alt="image" 
    className="w-72 h-40 object-cover rounded-t-lg"
  />
  <div className="flex flex-col flex-grow p-4 space-y-2">
    <h1 className="text-lg font-semibold text-gray-800 line-clamp-1">
      {item.Title}
    </h1>
    <h1 className="text-sm text-gray-600">
      {item.Specialisedin}
    </h1>
   
    <h1 className="text-sm font-medium text-gray-700 flex items-center">
    <span><img className="w-10 h-10 rounded-full mr-2" src={item.serviceprovider.Coverphoto}/></span>
      {item.serviceprovider.SellerName}
    </h1>
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold text-blue-600">₹{item.Price}</span>
      <span className="text-sm text-gray-500">{item.Experience} yrs exp</span>
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
              </>
            ))
            }
          </Slide>
        ) : (
          <div className="flex items-center justify-center">
            <img src="/images/Loading.gif" className="w-100 h-100 m-10"></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
