import axios from "axios";
import { useStore } from "../store.js";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";


const server_url = import.meta.env.VITE_SERVER_URL;


/* ---------- GUEST STATUS (Login/Signup) ---------- */
export const Signupstatus = () => {
  return (
    <div className="flex items-center space-x-2 text-sm sm:text-base">
      <Link
        to="/signup"
        className="text-gray-800 hover:text-blue-600 font-semibold transition-colors duration-200 relative after:content-['/'] after:ml-2 sm:after:ml-4 after:text-gray-400 after:font-normal"
      >
        Sign Up
      </Link>
      <Link
        to="/login"
        className="text-gray-800 hover:text-blue-600 font-semibold transition-colors duration-200"
      >
        Log In
      </Link>
    </div>
  );
};

/* ---------- USER STATUS ---------- */
const UserStatus = () => {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const menuRef = useRef(null);

  const onLogout = useStore((state) => state.Onlogout);
  const loggedinuser = useStore((state) => state.loggedInuser);

  const userlogout = async() => {
    
     try {
        const respo = await axios.get(`${server_url}removecookies`, {
          withCredentials: true,
        });

        if (respo.status === 200) {
          console.log("Cookies removed successfully");
        }
        else{
  
          throw new Error("There was an issue in removing cookies");
        }
      } catch (error) {
        console.error(error);
      }

    onLogout();
    navigate("/");
  };

  const myorders = () => {
    const id = loggedinuser._id || null;
    navigate(`/myorders/${id}`);
    setisOpen(false);
  };

  const toggleopen = () => setisOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setisOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={toggleopen}
      >
        <img
          src={loggedinuser?.CoverPhotouser}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
        />
        <h1 className="text-sm sm:text-lg font-medium truncate max-w-[100px] sm:max-w-none">
          {loggedinuser?.Name}
        </h1>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 sm:w-48 bg-slate-800 text-white rounded-md shadow-lg z-50"
          ref={menuRef}
        >
          <ul className="flex flex-col py-2">
            <li
              className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
              onClick={userlogout}
            >
              Log Out
            </li>
            <li
              className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
              onClick={myorders}
            >
              My Orders
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

/* ---------- SELLER STATUS ---------- */
const SellerStatus = () => {
  const [isOpen, setisOpen] = useState(false);
  const menuRef = useRef(null);

  const onLogout = useStore((state) => state.Onlogout);
  const loggedinuser = useStore((state) => state.loggedInuser);
  const navigate = useNavigate();

  const sellerlogout = async() => {

    try {
        const respo = await axios.get(`${server_url}removecookies`, {
          withCredentials: true,
        });

        if (respo.status === 200) {
          console.log("Cookies removed successfully");
        }
        else{
  
          throw new Error("There was an issue in removing cookies");
        }
      } catch (error) {
        console.error(error);
      }
    onLogout();
    navigate("/");
  };

  const myorders = () => {
    navigate(`/myorders/${loggedinuser._id}`);
    setisOpen(false);
  };

  const addservices = () => {
    navigate("/addservices");
    setisOpen(false);
  };

  const myservices = () => {
    navigate(`/myservices/${loggedinuser._id}`);
    setisOpen(false);
  };

  const clients = () => {
    navigate(`/clients/${loggedinuser._id}`);
    setisOpen(false);
  };

  const toggleopen = () => setisOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setisOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={toggleopen}
      >
        <img
          src={loggedinuser?.Coverphoto}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
        />
        <h1 className="text-sm sm:text-lg font-medium truncate max-w-[100px] sm:max-w-none">
          {loggedinuser?.SellerName}
        </h1>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-44 sm:w-52 bg-slate-900 text-white rounded-md shadow-lg z-50"
          ref={menuRef}
        >
          <ul className="flex flex-col py-2">
            <li
              className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
              onClick={sellerlogout}
            >
              Log Out
            </li>
            <li
              className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
              onClick={myservices}
            >
              My Services
            </li>
            <li
              className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
              onClick={addservices}
            >
              Add Service
            </li>
            <li
              className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
              onClick={myorders}
            >
              My Orders
            </li>
            <li
              className="hover:bg-slate-700 px-4 py-2 cursor-pointer"
              onClick={clients}
            >
              Clients
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

/* ---------- RENDER MAIN ---------- */
const RenderComponets = () => {
  const boolval = useStore((state) => state.boolval);

  if (boolval === 0) return <Signupstatus />;
  if (boolval === 1) return <UserStatus />;
  if (boolval === 2) return <SellerStatus />;
};

export default RenderComponets;
