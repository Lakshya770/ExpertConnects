import * as React from 'react'; 
import ToggleButton from '@mui/material/ToggleButton'; 
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'; 
import Box from '@mui/material/Box'; 
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 
import { useNavigate, useLocation } from 'react-router-dom';  
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../store.js';
import { toast } from 'react-toastify';









export const Signfunc = () => {
    const [alignment, setAlignment] = React.useState('User');  
    const navigate = useNavigate();

    const OnUserLogin=useStore((state)=>state.OnUserLogin)
    const boolVal=useStore((state)=>state.boolval)
    const OnSellerLogin=useStore((state)=>state.OnSellerLogin)

  const defaultform={
        Emaillogin: '',
        Passwordlogin: ''
      }


      const [formdata, setformdata] = React.useState({
        Emaillogin: '',
        Passwordlogin: ''
      });

  const handleChange = (event, newAlignment) => { 
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      const emailtextfield = document.getElementById("Emaillogin");
      const passwordtextfield = document.getElementById("Passwordlogin");
      emailtextfield.value = "";
      passwordtextfield.value = "";
      setformdata(defaultform);
    }
  };


    

    
  
    // Handle form input changes
    const changefunc = (e) => {
      setformdata({ ...formdata, [e.target.id]: e.target.value });
    };
  
    // Handle form submission
    const loginfunc = async (e) => {
      e.preventDefault(); 


      if(alignment==="User"){
        try {    
              const response = await axios.post("http://localhost:3000/api/user/login", 
              formdata, 
              { headers: { "Content-Type": "application/json" },
            withCredentials: true}

            );
            console.log(response); // Success response
            if(response.status===200){
              OnUserLogin();
              toast.success('Logged in Successfully',{
                alignment: 'center'
              })
              navigate('/')
            }
          } 
          catch (error) {
            console.error(error.response ? error.response.data : error.message);
            toast.error(error.message,{
              alignment: 'center'
            })
          }



          console.log(formdata)
      }
      else if(alignment==="Service Provider"){
        try {
              const response = await axios.post("http://localhost:3000/api/service_provider/login", 
              formdata, 
              { headers: { "Content-Type": "application/json" },
            withCredentials: true}
            );
            console.log(response.data); // Success response
            if(response.status===200){
              OnSellerLogin();
              toast.success('Logged in Successfully')
              navigate('/')
            }

          } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            toast.error(error.message,{
              alignment: 'center'
            })
          }
      }
  
      
    };
  
    return (
        <div className='flex flex-col justify-center items-center py-9'>
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


    

      <div className='flex flex-col justify-center items-center'>
        
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          className="flex flex-col justify-center items-center"
          onSubmit={loginfunc}  // Use onSubmit to handle form submission
        >
         
          <TextField 
            id="Emaillogin" 
            label="Email*" 
            variant="outlined" 
  
            onChange={changefunc} 
          />
          <TextField 
            id="Passwordlogin" 
            label="Password*" 
            variant="outlined" 
            type='password' 
            onChange={changefunc} 
          />
          <Button type="submit" variant="contained">Login</Button>
        </Box>
        <h1>Do not have account?<Link to="/signup" className="text-blue-950 font-bold">SignUp</Link></h1>
      </div>
      </div>
    );
  };
  
 
  const Login = () => {
    return (
      <div className='flex flex-col justify-center items-center'>
        
      <Signfunc />
      </div>
    );
  };

  export default Login;