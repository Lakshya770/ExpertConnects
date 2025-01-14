import axios from "axios"
import { Link } from "react-router-dom"
import Slide from "../components/Slide"
import { useState,useEffect } from "react"
const Cards=({cardsdata})=>{
 
    const [sliderSettings, setSliderSettings] = useState({
        slidesToShow: 2,
        arrowsScroll: 1,
      });
    
    
      useEffect(() => {
        const updateSliderSettings = () => {
          const width = window.innerWidth;
          if (width < 750) {
            // Example for medium screens
            setSliderSettings({ slidesToShow: 1, arrowsScroll: 2 });
          } else if (width >= 750 && width < 1024) {
            // Example for medium screens
            setSliderSettings({ slidesToShow: 2, arrowsScroll: 2 });
          } else if (width >= 1024 && width < 1250) {
            // Example for medium screens
            setSliderSettings({ slidesToShow: 3, arrowsScroll: 2 });
          } else {
            // Default settings for large screens
            setSliderSettings({ slidesToShow: 4, arrowsScroll: 3 });
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
      }, []);
    
   
    return(
        <div >
            {
                (cardsdata && cardsdata.length>0)?
                (

                    <Slide {...sliderSettings} >
                        {
                    cardsdata.map((item)=>
                       (    <>
                            <Link to={`/sellercardsdetails/${item._id}`} key={item._id}>
                            <div className=" flex-col  rounded-md  w-60 h-72 bg-gray-100 shadow-md hover:shadow-xl  hover:cursor-pointer hover:scale-105 transition-all duration-200  mt-10">
                                <img src={item.Coverphoto} alt="image" className="w-60 h-40 rounded-md "/>

                                <h1 className="text-slate-600 font-bold text-center">{item.SellerName}</h1>
                                <h1 className="text-slate-600 text-center">{item.Service}</h1>
                                <h1 className="text-slate-600 text-center">{item.SellerEmail}</h1>
                                {/* <div className="flex justify-around">
                                <span>Starting at</span>
                                <span className="text-green-600 font-bold text-right" >₹{item.Price}</span>
                                </div> */}
                            </div>
                            </Link>
                            </>
                        )
                    )}
                    </Slide>
                ):(<div className="flex items-center justify-center">
                    <img src="/images/Loading.gif" className="w-100 h-100 m-10"></img>
                  </div>)
            }
        </div>
    )    
    
}

export default Cards