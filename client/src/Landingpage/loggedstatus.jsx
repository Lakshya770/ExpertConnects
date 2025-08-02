import axios from "axios";
import { useStore } from "../store.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signupstatus = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link
        to="/signup"
        className="text-gray-800 hover:text-blue-600 font-semibold text-lg transition-colors duration-200 relative after:content-['/'] after:ml-4 after:text-gray-400 after:font-normal"
      >
        Sign Up
      </Link>
      <Link
        to="/login"
        className="text-gray-800 hover:text-blue-600 font-semibold text-lg transition-colors duration-200"
      >
        Log In
      </Link>
    </div>
  );
};

const UserStatus = () => {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const menuRef = useRef(null);

  const onLogout = useStore((state) => state.Onlogout);
  const boolVal = useStore((state) => state.boolval);
  const loggedinuser = useStore((state) => state.loggedInuser);

  console.log("te vc pehli h ", loggedinuser, boolVal);

  const userlogout = () => {
    Cookies.remove("loggedIn");
    Cookies.remove("user");
    Cookies.remove("token");
    onLogout();
    navigate("/");
  };

  const myorders = () => {
    const id = loggedinuser._id || null;
    navigate(`/myorders/${id}`);
    setisOpen(false);
  };

  const toggleopen = () => {
    setisOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setisOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        className="flex text-xl align-middle gap-x-2 justify-center"
        onClick={toggleopen}
      >
        <img
          src={loggedinuser?.CoverPhotouser}
          className="w-14 h-14 rounded-md"
        />
        <h1 className="flex justify-center text-xl  items-center">
          {loggedinuser?.Name}
        </h1>
      </div>
      <div>
        {isOpen && (
          <div
            className="dropdown-menu flex flex-col justify-center items-center gap-y-6 absolute bg-slate-800 w-32 h-24 top-20 right-2 rounded-md text-white"
            ref={menuRef}
          >
            <ul className="flex flex-col justify-center items-center gap-y-2">
              <li
                className="hover:bg-slate-700 w-32 flex justify-center cursor-pointer"
                onClick={userlogout}
              >
                LogOut
              </li>
              <li
                className="hover:bg-slate-700 w-32 flex justify-center cursor-pointer"
                onClick={myorders}
              >
                My Orders
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const SellerStatus = () => {
  const [isOpen, setisOpen] = useState(false);
  const menuRef = useRef(null);

  const onLogout = useStore((state) => state.Onlogout);
  const boolVal = useStore((state) => state.boolval);
  const loggedinuser = useStore((state) => state.loggedInuser);
  const navigate = useNavigate();

  const sellerlogout = () => {
    Cookies.remove("loggedIn");
    Cookies.remove("user");
    Cookies.remove("token");
    onLogout();
    navigate("/");
  };

  const myorders = () => {
    const id = loggedinuser._id || null;
    navigate(`/myorders/${id}`);
    setisOpen(false);
  };

  const toggleopen = () => {
    setisOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setisOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addservices = () => {
    navigate("/addservices");
    setisOpen(false);
  };

  const myservices = () => {
    const id = loggedinuser._id || null;
    navigate(`/myservices/${id}`);
    setisOpen(false);
  };

  const clients = () => {
    const id = loggedinuser._id || null;
    navigate(`/clients/${id}`);
    setisOpen(false);
  };

  return (
    <div>
      <div onClick={toggleopen}>
        <img src={loggedinuser?.Coverphoto} className="w-14 h-14 rounded-md" />
        <h1 className="flex justify-center text-xl  items-center">
          {loggedinuser?.SellerName}
        </h1>
      </div>
      <div>
        {isOpen && (
          <div
            className="dropdown-menu flex flex-col justify-center items-center gap-y-2 gap-x-2 absolute bg-slate-900  top-20 right-2 rounded-md text-white w-32 h-44"
            ref={menuRef}
          >
            <ul className="flex flex-col justify-center items-center gap-y-2">
              <li
                className="hover:bg-slate-700 w-32 flex justify-center cursor-pointer"
                onClick={sellerlogout}
              >
                LogOut
              </li>
              <li
                className="hover:bg-slate-700 w-32 flex justify-center cursor-pointer"
                onClick={myservices}
              >
                My Services
              </li>
              <li
                className="hover:bg-slate-700 w-32 flex justify-center cursor-pointer"
                onClick={addservices}
              >
                Add Service
              </li>
              <li
                className="hover:bg-slate-700 w-32 flex justify-center cursor-pointer"
                onClick={myorders}
              >
                My Orders
              </li>
              <li
                className="hover:bg-slate-700 w-32 flex justify-center cursor-pointer"
                onClick={clients}
              >
                Clients
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderComponets = () => {
  const boolval = useStore((state) => state.boolval);

  if (boolval == 0) {
    return <Signupstatus />;
  } else if (boolval == 1) {
    return <UserStatus />;
  } else if (boolval == 2) {
    return <SellerStatus />;
  }
};

export default RenderComponets;
