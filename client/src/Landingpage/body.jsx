import { useEffect,useState } from "react"
import Search from "./search"
import Tiles from "./tiles"
import axios from "axios"
import Cards from "./cards"

const server_url = import.meta.env.VITE_SERVER_URL;

console.log()

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