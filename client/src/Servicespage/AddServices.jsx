import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useStore } from "../store.js";
import { useNavigate } from "react-router-dom";

const server_url = import.meta.env.VITE_SERVER_URL;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const AddService = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [file, setFile] = useState(null);
  const [drop, setDrop] = useState("Service Providing");
  const [formdata, setFormdata] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userthatislogged = useStore((state) => state.loggedInuser) || null;

  useEffect(()=>{
    console.log(formdata);
  })

  useEffect(() => {
    setFormdata({
      Category: "",
      Specialisedin: "",
      Experience: null,
      Title: "",
      Price: null,
      Description: "",
      Coverphotouser: "",
      serviceprovider: userthatislogged?._id,
    });
  }, [userthatislogged]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    const category = e.target?.id || "";
    setDrop(category||"Service Providing");
    setFormdata({ ...formdata, Category: category, serviceprovider: userthatislogged?._id });
  };

  const changefunc = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handlefilechange = (e) => {
    setFile(e.target.files[0]);
  };

  const serviceSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!file) {
      toast.error("Please upload an image.", { alignment: "center" });
      setIsSubmitting(false);
      return;
    }

    const cloudinaryformdata = new FormData();
    const preset = "vps9dvgi";
    cloudinaryformdata.append("file", file);
    cloudinaryformdata.append("upload_preset", preset);

    try {
      // Upload image to Cloudinary
      const upload_respons = await axios.post(
        "https://api.cloudinary.com/v1_1/dxf0peasu/image/upload",
        cloudinaryformdata
      );
      const url = upload_respons.data.secure_url;

      console.log("Image uploaded successfully:", url);

      const updatedformdata = { ...formdata, Coverphotouser: url };

      // Submit service data to your backend
      const response = await axios.post(
        `${server_url}api/service/addservice`,
        updatedformdata,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message, { alignment: "center" });
        console.log(response.data);
        navigate('/addservices');

        
        
         

      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error occurred while submitting service.";
      toast.error(errorMsg, { alignment: "center" });
      console.error("Error occurred:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Button
          id="customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {drop}
        </Button>
        <StyledMenu
          id="Category"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {["Accountant", "Astrologer", "Consultant", "Doctor", "Lawyer", "Psychologist", "Veterinarian"].map(
            (item) => (
              <MenuItem onClick={handleClose} key={item} disableRipple id={item}>
                {item}
              </MenuItem>
            )
          )}
        </StyledMenu>
      </div>

      <div>
        <Box
          component="form"
          id="form"
          sx={{ "& > :not(style)": { m: 1, width: "42ch" } }}
          noValidate
          autoComplete="off"
          className="flex flex-col justify-center items-center"
        >
          <TextField
            id="Specialisedin"
            label="Specialisation in Category"
            variant="outlined"
            placeholder="e.g., Orthologist, Palmist, Finance Consultant"
            onChange={changefunc}
          />
          <TextField
            id="Experience"
            label="Experience* (in years)"
            variant="outlined"
            placeholder="Mention experience in years"
            type="number"
            onChange={changefunc}
          />
          <TextField
            id="Title"
            label="Title of Service*"
            variant="outlined"
            placeholder="Title of your service"
            onChange={changefunc}
          />
          <TextField
            id="Price"
            label="Price (INR)*"
            variant="outlined"
            placeholder="e.g., 400"
            type="number"
            onChange={changefunc}
          />
          <TextField
            id="Description"
            label="Long Description*"
            variant="outlined"
            multiline
            placeholder="Mention features and benefits of your service"
            onChange={changefunc}
          />
          <label htmlFor="file" className="block text-lg font-medium text-gray-700">
            Upload Cover Photo
          </label>
          <input
            id="Coverphotouser"
            type="file"
            accept="image/*"
            className="align-center ml-20"
            onChange={handlefilechange}
          />
          <Button onClick={serviceSubmit} variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </Box>
      </div>
    </>
  );
};

export default AddService;
