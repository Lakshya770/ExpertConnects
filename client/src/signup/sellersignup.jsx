import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Signuptoggle } from './usersignup';
import { styled } from '@mui/material/styles';
import { json } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const server_url = import.meta.env.VITE_SERVER_URL;


const SellersignUpfunc = () => {
   
  const [file,setfile]=useState(null)
  const [imageurl,setimageurl]=useState('')
  const navigate=useNavigate()

  const handlefilechange=(e)=>{
      setfile(e.target.files[0])
  }
    
  const [formdata,setformdata]=useState({
    SellerName:'',
    SellerEmail:'',
    SellerPassword:'',
    Service:'',
    Description:'',
    Coverphoto:'',
    
  })

  const changefunc=(e)=>{
    setformdata({...formdata,[e.target.id]:e.target.value})
  }

  const sellersgn = async () => {


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
      const updatedformdata={...formdata,Coverphoto:url}
      console.log(updatedformdata)
  
      const response = await axios.post(`${server_url }api/service_provider/sellersignup`, updatedformdata,{headers:{"Content-Type":"application/json"}})
      
      console.log(response.data)
      if(response.status===200){
        toast.success('Registered Successfully')
        navigate('/Login')
      }
      
  
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message)
      console.log("Error has occured while registration",error)
    }
  }


   

    return (
      <div className='flex flex-col justify-center items-center' >
        <h1 className='text-3xl mb-10'>Create a Service Provider Account</h1>
        <div className='flex justify-center items-center'>
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className="flex flex-col justify-center items-center"
      >
        <TextField id="SellerName" label="Name*" variant="outlined" onChange={(e)=>changefunc(e)}/>
        <TextField id="SellerEmail" label="Email*" variant="outlined" onChange={(e)=>changefunc(e)}/>
        <TextField id="SellerPassword" label="Password*" variant="outlined" type='password' onChange={(e)=>changefunc(e)}/>
        <TextField id="Service" label="Service Name*" variant="outlined" onChange={(e)=>changefunc(e)}/>
       


        </Box>
        <div className='flex flex-col justify-center items-center m-1 space-y-5' >
       
        <TextField
          id="Description"
          label="Description*"
          placeholder="Describe yourself in few words..."
          multiline onChange={(e)=>changefunc(e)}
        />
            <label htmlFor="file" className="block text-lg font-medium text-gray-700">Upload Profile photo</label>
            <input id="Coverphoto" type='file'accept='image/*' className='align-center ml-20' onChange={(e)=>handlefilechange(e)}/>
        </div>
        
        
    

        </div>
        <Button variant="contained" onClick={()=>sellersgn()}>Register</Button>
        <h1>Already have account?<Link to="/login" className="text-blue-950 font-bold">Login</Link></h1>
        
      </div>
    );
  

}
  const SellersignUp = () => {
    return(
    <div className='flex flex-col justify-center items-center'>
     <Signuptoggle/> 
     <SellersignUpfunc/>
    </div>
    )
  }

  
  export default SellersignUp;