
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'; 
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import Cookies from "js-cookie"


const server_url = import.meta.env.VITE_SERVER_URL;

const StyledMenu =styled((props) => (
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...props}
        />
      ))(({ theme }) => ({
        '& .MuiPaper-root': {
          borderRadius: 6,
          marginTop: theme.spacing(1),
          minWidth: 180,
          color: 'rgb(55, 65, 81)',
          boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          '& .MuiMenu-list': {
            padding: '4px 0',
          },
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: theme.palette.text.secondary,
              marginRight: theme.spacing(1.5),
            },
            '&:active': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity,
              ),
            },
          },
          ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
          }),
        },
      }));
      
       const AddService=()=> {

        const [anchorEl, setAnchorEl] = React.useState(null);
        const [file,setfile]=useState(null)
        const [drop,setdrop]=useState('Service Providing')
        const userthatislogged = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
        
        console.log(userthatislogged)
        const [formdata,setformdata]=React.useState({
          Category:'',
          Specialisedin:'',
          Experience:null,
          Title:'',
          Price:null,
          Description:'',
          Coverphotouser:'',
          serviceprovider:userthatislogged._id,
      })


        // React.useEffect(() => {
        //   console.log('formdata',formdata)
        // })


        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
          
        };
        const handleClose = (e) => {
          setAnchorEl(null);
          if(e.target.id==0)
            {
              setdrop('Service Providing')
            }
            else
              {
                setdrop(e.target.id)
                setformdata({...formdata,Category:e.target.id})
              }

        };


        
       

        const changefunc=(e)=>{
            setformdata({...formdata,[e.target.id]:e.target.value})
        }

        const handlefilechange=(e)=>{
            setfile(e.target.files[0])
        }


        const serviceSubmit=async(e)=>{
            // e.preventDefault()
            
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
                const updatedformdata={...formdata,Coverphotouser:url}
                console.log(updatedformdata)
            
                const response = await axios.post(`${server_url }api/service/addservice`, updatedformdata,{headers:{"Content-Type":"application/json"}},{withCredentials:true})
                
                console.log(response.data)
                

                console.log(response.data)
                
            
              } catch (error) {
                console.log("Error has occured while registering your service",error)
              }

        }




        

    return(
        <>


    <div className='flex flex-col justify-center items-center'>
        <Button
          id="customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
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
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple id="Accountant">
           Accountant
          </MenuItem>

    


          <MenuItem onClick={handleClose} disableRipple id="Astrologer">
           Astrologer
          </MenuItem>

          

          <MenuItem onClick={handleClose} disableRipple id="Consultant">
            Consultant
          </MenuItem>
        
          <MenuItem onClick={handleClose} disableRipple id="Doctor">
            Doctor
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple id="Lawyer">
            Lawyer
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple id="Psychologist">
            Psychologist
          </MenuItem>

          <MenuItem onClick={handleClose} disableRipple id="Chartered Accountant">
           Veterinarian
          </MenuItem>
        </StyledMenu>    
     </div>


      <div>
        <Box
        component="form"
        id='form'
        sx={{ '& > :not(style)': { m: 1, width: '42ch' } }}
        noValidate
        autoComplete="off"
        className="flex flex-col justify-center items-center"
        // onSubmit={serviceSubmit}  // Use onSubmit to handle form submission
      >
        <TextField 
          id="Specialisedin" 
          label="Specialisation in Category" 
          variant="outlined" 
          placeholder='eg. Orthologist, Palmist, Finance Consultant'
          onChange={changefunc} 
        />
        <TextField 
          id="Experience" 
          label="Experience*(in years)" 
          variant="outlined" 
          placeholder='Mention experiece in years'
          type='number'
          onChange={changefunc} 
        />
        
        <TextField 
          id="Title" 
          label="Title of Service*" 
          variant="outlined" 
          placeholder='Title of your m service'
          onChange={changefunc} 
        />
        <TextField 
          id="Price" 
          label="Price(INR)*" 
          variant="outlined" 
          placeholder='eg 400'
          type='number'
          onChange={changefunc} 
        />
        <TextField 
          id="Description" 
          label="Long Description*" 
          variant="outlined" 
          multiline
          placeholder='Mention features and benefits of your service'
          onChange={changefunc} 
        />
        <label htmlFor="file" className="block text-lg font-medium text-gray-700">Upload Cover Photo</label>
        <input id="Coverphotouser" type='file'accept='image/*' className='align-center ml-20' onChange={(e)=>handlefilechange(e)}/>
        <Button  onClick={serviceSubmit} variant="contained">Register</Button>
      </Box>
      </div>
      </>
      )
}


export default AddService
