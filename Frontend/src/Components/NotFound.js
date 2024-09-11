import React from "react"; // Ensure React is imported
import logo from "../img/Group 6.png";
import spiral from "../img/bgi.png";
import hlogo from "../img/Group 7.png";
import cancel from "../img/cancel.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLinks } from ".";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const background = {
    backgroundImage: `url(${spiral})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logOut = async () => {
    const response = await fetch("/api/v1/auth/logout", {
      method: "GET",
    });
    if (!response.ok) {
      console.log("Unable to logout");
    }
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div
        className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8"
        style={background}
      >
        <img src={logo} alt="Logo" className="h-12 mb-8" />
        <h1 className="text-2xl font-bold">Face Edu</h1>
        {/* <p className="mt-4">@SWEP200 GROUP 4</p> */}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-3 bg-white shadow border-b-2 border-cyan-400">
          <div className="flex">
            <img src={hlogo} alt="Header Logo" className="h-6 mt-1" />
            <h1 className="text-2xl font-bold ml-3">Face Edu</h1>
          </div>
          <ul className="flex flex-row gap-32 ml-64">
            {NavLinks.map((lists) => (
              <li
                key={lists}
                className="text-black text-center hover:text-[#3FF3FF] text-lg
                  font-semibold mt-2"
              >
                <Link to={lists.destination} className="cursor-pointer mr-7">
                  {lists.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center">
            <button
              onClick={logOut}
              className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors"
            >
              Log out
            </button>
          </div>
        </nav>

        <div className="flex flex-col justify-center items-center">
          <img src={cancel} alt="Not Found" />
          <h2 className="mt-2 text-3xl font-bold">Student Not Found</h2>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
