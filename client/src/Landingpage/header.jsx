import { Link } from "react-router-dom";
import RenderComponets from "./loggedstatus";
const Header = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="logo" className="h-20 w-20 " />
        <h1 className="text-2xl font-bold">
          <Link to="/">ExpertConnect</Link>
        </h1>
      </div>
      <div>
        <RenderComponets />
      </div>
    </div>
  );
};

export default Header;
