import { useEffect,useState } from "react"
import Search from "./search"
import Tiles from "./tiles"
import axios from "axios"
import Cards from "./cards"
const Body=()=>{

    const [cardsdata,setcardsdata]=useState([])
    let mydata=[];
    useEffect(()=>{

        const fetchCards=async()=>{
            try {
                const response=await axios.get("http://localhost:3000/api/service_provider/getsellerscards",{withCredentials:true})
                console.log(response.data)
                setcardsdata(response.data)
                // console.log("this is mydata",mydata)


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