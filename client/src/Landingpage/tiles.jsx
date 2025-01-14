import { useNavigate } from "react-router-dom"
const Tiles=()=>{
    const navigate=useNavigate()
    const handleclick=(name)=>{
          navigate(`/Services/${name}`)
    }

    return(
        <div className="w-full h-5/6 relative mb-9">
        <h1 className="text-4xl font-bold ml-16 mt-6">Explore Categories</h1>

        <div className="flex flex-wrap items-center justify-between space-x-32 space-y-24 w-5/6 ml-14 ">
            
        <div className="flex flex-col items-center justify-center text-center border-black border-2 p-4 w-32 h-40 ml-32 mt-24 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200" onClick={()=>handleclick("All")}>
                <img  alt="All" src= "/images/All.png" className="w-24 h-20"/>
                <h1 className="text-xl mt-2">All</h1>
        </div>


        


        <div className="flex flex-col items-center justify-center text-center border-black border-2 p-4 w-32 h-40 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200 " onClick={()=>handleclick('Accountant')}>
                <img  alt="Accountant" src="/images/Accountant.png" className="w-24 h-20"/>
                <h1 className="text-xl mt-2">Accountant</h1>
       </div> 


            <div className="flex flex-col items-center justify-center text-center border-black border-2 p-4 w-32 h-40 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200 " onClick={()=>handleclick("Astrologer")}>
                <img  alt="Astrologer" src="/images/Astrologer.png" className="w-24 h-20"/>
                <h1 className="text-xl mt-2">Astrologer</h1>
            </div>


             <div className="flex flex-col items-center justify-center text-center border-black border-2 p-4 w-32 h-40 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200" onClick={()=>handleclick("Veterinarian")}>
                <img  alt="Veterinarian" src="/images/veterinarian.png" className="w-24 h-20"/>
                <h1 className="text-xl mt-2">Veterinarian</h1>
            </div> 


            <div className="flex  flex-col items-center justify-center text-center border-black border-2 p-4 w-32 h-40 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200" onClick={()=>handleclick("Consultant")}>
                <img  alt="Consultant" src="/images/Consultant.png" className="w-24 h-20"/>
                <h1 className="text-xl mt-2">Consultant</h1>
            </div>


             <div className=" flex  flex-col items-center justify-center text-center border-black border-2 p-4 w-32 h-40 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200" onClick={()=>handleclick("Doctor")}>
                <img  alt="Doctor" src="/images/Doctor.png" className="w-24 h-20"/>
                <h1 className="text-xl mt-2">Doctor</h1>
            </div> 
            
            <div className="flex flex-col items-center justify-center border-black border-2 p-4 w-32 h-40 text-center rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200 " onClick={()=>handleclick("Lawyer")}>
                <img  alt="Lawyer" src="/images/Lawyer.png" className="w-24 h-20"/>
                <h1 className="text-xl mt-2">Lawyer</h1>
            </div>

            <div className="flex  flex-col items-center justify-center border-black border-2 p-4 w-32 h-40 text-center rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200" onClick={()=>handleclick("Psychologist")}>
                <img  alt="Psychologist" src="/images/psychologist.png" className="w-24 h-20"/>
                <h1 className="text-xl mt-2">Psychologist</h1>
        </div>
            

        </div>

        
        </div>
    )
}

export default Tiles