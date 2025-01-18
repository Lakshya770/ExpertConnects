import { useEffect,useState } from "react"
import Search from "./search"
import Tiles from "./tiles"
import axios from "axios"
import Cards from "./cards"
import  Cookies  from "js-cookie"

const server_url = import.meta.env.VITE_SERVER_URL;



const Body=()=>{

    const [cardsdata,setcardsdata]=useState([])
    let mydata=[];
    useEffect(()=>{

        const fetchCards=async()=>{
            try {
                const response=await axios.get(`${server_url}api/service_provider/getsellerscards`,{withCredentials:true})
                console.log(response?.data)
                setcardsdata(response?.data)
                console.log("this is mydata",mydata)


            } catch (error) {
                console.log(error)
            }
        }
        fetchCards()

        const user=Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
console.log("Cookies h y",user)
    
    },[])
    return(

        <div>
            <Search/>
            <Tiles/>
            <Cards cardsdata={cardsdata}/>    
        </div>
    )
}

export default Body