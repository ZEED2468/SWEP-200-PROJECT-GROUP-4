import React, { useState } from "react";
import logo from "../img/Group 7.png";
import face from "../img/Ellipse 3.svg";
import back from "../img/assets/Group 4.png";
import topLogo from "../img/Group 6.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "contain",
  height: "70vh",
  // backgroundRepeat: "repeat"
};

const TokenLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState("");
  const { dispatch } = useAuthContext();
  const login = async (name, token) => {
    setIsLoading(true);
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, token }),
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setError(json.msg);
      console.log(error);
      setIsLoading(false);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      navigate("/verificationpage");
      setIsLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (token && name) {
      login(name, token);
    }
  };
  return (
    <div
      className="flex flex-row gap-8
    border rounded-3xl w-[1100px] 
    2xl:h-[200px] m-auto 
    relative top-32
    overflow-hidden sm:top-0 bg-black
    sm:flex sm:flex-col 
      sm:w-full
      sm:min-h-[725px] sm:border sm:rounded-none sm:fixed
     "
      style={background}
    >
      <div
        className="flex flex-col justify-between
       bg-white p-3 border rounded-3xl rounded-r-none
        w-72 sm:flex sm:flex-row sm:w-full sm:rounded-none sm:h-20"
      >
        <img
          src={logo}
          alt="logo"
          height="30px"
          width="100px"
          className="m-auto sm:relative sm:bottom-2 sm:w-14"
        />
        <h3
          className="text-black font-bold text-4xl relative
         bottom-20 m-auto sm:relative sm:bottom-10 sm:top-7 sm:right-24 sm:text-lg"
        >
          FaceEdu
        </h3>
        <img
          src={face}
          alt="faceverify"
          height="100px"
          width="200px"
          className="m-auto sm:relative sm:bottom-8 sm:left-10 sm:w-32 sm:h-28"
        />
      </div>
      <div className="flex flex-col m-auto justify-evenly">
        <img
          src={topLogo}
          alt="logo"
          height="30px"
          width="100px"
          className="m-auto relative bottom-20 sm:relative sm:bottom-32"
        />
        <h3 className="text-white text-center font-bold text-4xl relative bottom-12 sm:text-3xl">
          SIGN IN
        </h3>

        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div
            className="flex flex-col gap-2 relative
           right-10 sm:relative sm:right-0"
          >
            <label
              htmlFor="name"
              className="text-white text-semibold 
            text-xl sm:text-lg uppercase"
            >
              Name:
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              name="name"
              className="h-12 border rounded-lg sm:h-12 p-3
              text-xl font-semibold w-[500px] sm:w-72"
              required
            />
          </div>
          <div
            className="flex flex-col gap-2 relative
           right-10 sm:relative sm:right-0"
          >
            <label
              htmlFor="name"
              className="text-white text-semibold 
            text-xl sm:text-lg uppercase"
            >
              Token:
            </label>
            <input
              type="text"
              onChange={(e) => setToken(e.target.value)}
              value={token}
              id="token"
              name="token"
              className="h-12 border rounded-lg sm:h-12 p-3
              text-xl font-semibold w-[500px] sm:w-72"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-white
           text-black border rounded-2xl p-3 w-fit pl-16 pr-16
           m-auto font-bold text-lg hover:bg-[#3FF3FF]"
          >
            {isLoading ? <h2>logining...</h2> : <h2>LOGIN</h2>}
          </button>
          <div>
            {error && (
              <p className=" bg-white p-2 m-3 rounded-sm text-red-500 font-extrabold text-center ">
                {" "}
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenLogin;
