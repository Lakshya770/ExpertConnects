import * as React from 'react'; 
import ToggleButton from '@mui/material/ToggleButton'; 
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'; 
import Box from '@mui/material/Box'; 
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 
import { useNavigate, useLocation } from 'react-router-dom';  
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

// Toggle Button Component
export const Signuptoggle = () => {
  const [alignment, setAlignment] = React.useState('User');  
  const location = useLocation(); 
  const navigate = useNavigate(); 

 
  React.useEffect(() => {
    if (location.pathname === '/Sellersignup') {
      setAlignment('Service Provider');
    } else if (location.pathname === '/Signup') {
      setAlignment('User');
    }
  }, [location.pathname]);

  const handleChange = (event, newAlignment) => { 
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      if (newAlignment === 'User' ) {
        navigate('/Signup');
      } else if (newAlignment === 'Service Provider') {
        navigate('/Sellersignup');
      }
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton 
        value="User" 
        sx={{ backgroundColor: alignment === 'User' ? 'steelblue' : 'white', color: alignment === 'User' ? 'white' : 'black' }}
      >
        User
      </ToggleButton>
      <ToggleButton 
        value="Service Provider" 
        sx={{ backgroundColor: alignment === 'Service Provider' ? 'steelblue' : 'white', color: alignment === 'Service Provider' ? 'white' : 'black' }}
      >
        Service Provider
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

// Sign Up Function Component
export const Signfunc = () => {


  const navigate = useNavigate();
  const [file,setfile]=useState(null)
  const [formdata, setformdata] = React.useState({
    Name: '',
    Email: '',
    Password: '',
    CoverPhotouser: '',
  });

  
  const handlefilechange=(e)=>{
    setfile(e.target.files[0])
  }


  const changefunc = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const usersgn = async (e) => {
    e.preventDefault(); // Prevent form reload

    if(!file){
      alert("Please Upload a Image")
      return
    }

    const cloudinaryformdata=new FormData()
    const preset='vps9dvgi';

    cloudinaryformdata.append('file', file);
    cloudinaryformdata.append('upload_preset',preset);


    try {
      const upload_respons=await axios.post('https://api.cloudinary.com/v1_1/dxf0peasu/image/upload',cloudinaryformdata)
      
      const url=upload_respons.data.secure_url


  
      console.log('Image uploaded succcessfully',url);
      const updatedformdata={...formdata,CoverPhotouser:url}
      console.log(updatedformdata)
  
      const response = await axios.post("http://localhost:3000/api/user/signup", 
        updatedformdata, 
        { headers: { "Content-Type": "application/json" } }
      );
      
      console.log(response.data); // Success response
      if(response.status===200){
        toast.success('Registered Successfully')
        navigate('/Login')
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message)
      console.error(error.response ? error.response.data : error.message); // Error handling
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl mb-10'>Create a New User Account</h1>
      
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className="flex flex-col justify-center items-center"
        onSubmit={usersgn}  // Use onSubmit to handle form submission
      >
        <TextField 
          id="Name" 
          label="Name*" 
          variant="outlined" 
          onChange={changefunc} 
        />
        <TextField 
          id="Email" 
          label="Email*" 
          variant="outlined" 
          onChange={changefunc} 
        />
        <TextField 
          id="Password" 
          label="Password*" 
          variant="outlined" 
          type='password' 
          onChange={changefunc} 
        />
        <label htmlFor="file" className="block text-lg font-medium text-gray-700">Upload Profile photo</label>
        <input id="Coverphotouser" type='file'accept='image/*' className='align-center ml-20' onChange={(e)=>handlefilechange(e)}/>
        <Button type="submit" variant="contained" onSubmit={usersgn}>Register</Button>
      </Box>


      <h1>Already have account?<Link to="/login" className="text-blue-950 font-bold">Login</Link></h1>
    </div>
  );
};

// SignUp Page Component
const SignUp = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Signuptoggle /> 
      <Signfunc />
    </div>
  );
};

export default SignUp;
