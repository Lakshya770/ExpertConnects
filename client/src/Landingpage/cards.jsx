import { Link } from "react-router-dom";
import Slide from "../components/Slide";
import { useState, useEffect } from "react";

const Cards = ({ cardsdata }) => {
  const [sliderSettings, setSliderSettings] = useState({
    slidesToShow: 2,
    arrowsScroll: 1,
  });

  useEffect(() => {
    const updateSliderSettings = () => {
      const width = window.innerWidth;
      if (width < 750) {
        setSliderSettings({ slidesToShow: 1, arrowsScroll: 1 });
      } else if (width >= 750 && width < 1024) {
        setSliderSettings({ slidesToShow: 2, arrowsScroll: 2 });
      } else if (width >= 1024 && width < 1250) {
        setSliderSettings({ slidesToShow: 3, arrowsScroll: 2 });
      } else {
        setSliderSettings({ slidesToShow: 4, arrowsScroll: 3 });
      }
    };

    updateSliderSettings();
    window.addEventListener("resize", updateSliderSettings);

    return () => {
      window.removeEventListener("resize", updateSliderSettings);
    };
  }, []);

  return (
    <div className="w-full">
      {cardsdata && cardsdata?.length > 0 ? (
        <Slide {...sliderSettings}>
          {cardsdata?.map((item) => (
            <Link to={`/sellercardsdetails/${item._id}`} key={item._id}>
              <div className="flex flex-col rounded-lg w-[90%] sm:w-64 md:w-60 h-auto bg-gray-100 shadow-md hover:shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-200 mt-6 mx-auto">
                <img
                  src={item.Coverphoto}
                  alt="image"
                  className="w-full h-40 object-cover rounded-t-lg"
                />

                <div className="p-2 text-center">
                  <h1 className="text-slate-700 font-semibold text-base sm:text-lg">
                    {item.SellerName}
                  </h1>
                  <h2 className="text-slate-600 text-sm sm:text-base">
                    {item.Service}
                  </h2>
                  <h3 className="text-slate-500 text-xs sm:text-sm break-words">
                    {item.SellerEmail}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </Slide>
      ) : (
        <div className="flex items-center justify-center w-full py-10">
          <img
            src="/images/Loading.gif"
            className="w-16 h-16 sm:w-20 sm:h-20"
            alt="Loading"
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
