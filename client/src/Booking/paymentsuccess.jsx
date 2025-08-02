import { Button } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PaymentSuccess = () => {
  const searchquery = useSearchParams()[0];
  const refrencenum = searchquery.get("reference");
  console.log(refrencenum);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center bg-slate-100 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto my-12 hover:shadow-xl transition-all duration-200">
      <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-green-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
        Payment Successful!
      </h1>

      <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
        <p className="text-gray-600 text-sm mb-1">Reference Number</p>
        <p className="text-lg font-mono font-semibold text-gray-800">
          {refrencenum}
        </p>
      </div>

      <Button onClick={handleClick} className="hover:font-bold">
        Return to Home
      </Button>
    </div>
  );
};
export default PaymentSuccess;
