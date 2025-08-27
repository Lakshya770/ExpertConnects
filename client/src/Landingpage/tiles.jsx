import { useNavigate } from "react-router-dom";

const Tiles = () => {
  const navigate = useNavigate();
  const handleclick = (name) => {
    navigate(`/Services/${name}`);
  };

  const categories = [
    { name: "All", img: "/images/All.png" },
    { name: "Accountant", img: "/images/Accountant.png" },
    { name: "Astrologer", img: "/images/Astrologer.png" },
    { name: "Veterinarian", img: "/images/veterinarian.png" },
    { name: "Consultant", img: "/images/Consultant.png" },
    { name: "Doctor", img: "/images/Doctor.png" },
    { name: "Lawyer", img: "/images/Lawyer.png" },
    { name: "Psychologist", img: "/images/psychologist.png" },
  ];

  return (
    <div className="w-full mb-9 px-4">
      <h1 className="text-3xl ml-6 md:text-4xl font-bold mt-6 mb-8 text-center md:text-left">
        Explore Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 justify-items-center">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center justify-center text-center border-black border-2 p-4 w-28 h-36 sm:w-32 sm:h-40 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={() => handleclick(cat.name)}
          >
            <img alt={cat.name} src={cat.img} className="w-16 h-16 sm:w-20 sm:h-20" />
            <h1 className="text-lg sm:text-xl mt-2">{cat.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiles;
