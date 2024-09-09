import React, { useState } from "react";
import logo from "../img/Group 7.png";
import face from "../img/Ellipse 3.svg";
import back from "../img/group.png";
import topLogo from "../img/Group 6.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "cover",
  height: "70vh",
  backgroundRepeat: "no-repeat",
};

const Register = () => {
  const { dispatch } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const register = async (email, password, name) => {
    setIsLoading(true);
    const response = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setError(json.msg);
      console.log(error);
      setIsLoading(false);
      setEmail("");
      setName("");
      setPassword("");
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      navigate("/admin");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password && name) {
      register(email, password, name);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex flex-row gap-8
    border rounded-3xl w-[1100px] 
    2xl:h-[200px] m-auto 
    relative top-32
    overflow-hidden sm:top-0
    sm:flex sm:flex-col 
     bg-black sm:w-full
      sm:min-h-[725px] sm:border sm:rounded-none sm:fixed"
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
      <div
        className="flex flex-col m-auto sm:w-[300px] 
      "
      >
        <img
          src={topLogo}
          alt="logo"
          height="30px"
          width="100px"
          className="m-auto 
      sm:bottom-16 sm:relative"
        />
        <h3 className="text-white text-center font-bold text-4xl relative top-6 sm:text-3xl">
          SIGN UP
        </h3>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col 
        gap-2 relative top-14 sm:m-auto"
        >
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
              htmlFor="email"
              className="text-white text-semibold text-xl 
            sm:text-xl uppercase"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border 
              rounded-lg text-lg font-semibold
              w-[500px]
               p-3 sm:h-12 sm:w-72"
            />
          </div>
          <div
            className="flex flex-col gap-2 relative right-10
          sm:relative sm:right-0"
          >
            <label
              htmlFor="password"
              className="text-white text-semibold 
            text-xl sm:text-lg uppercase"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              required="true"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="h-12 border rounded-lg
              w-[500px]
               text-xl 
              font-semibold p-3 sm:h-12 sm:w-72"
            />
            <span
              className="relative left-[460px] cursor-pointer text-black bottom-11 sm:left-64 sm:relative"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEye size={30} />
              ) : (
                <AiOutlineEyeInvisible size={30} />
              )}
            </span>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-white text-black border rounded-2xl p-3 w-fit pl-16 pr-16
           m-auto font-bold text-lg hover:bg-[#3FF3FF] relative bottom-5"
          >
            {isLoading ? <h2>resgistering...</h2> : <h2>SIGN UP</h2>}
          </button>
        </form>
        <p
          className="text-white text-center mt-10 text-xl sm:text-sm sm:mt-12
        sm:relative sm:right-0 relative right-5"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-[#3FF3FF] text-xl sm:text-sm">
            Sign in
          </Link>
        </p>
        <div>
          {error && (
            <p className=" bg-white p-2 m-3 rounded-sm text-red-500 font-extrabold text-center ">
              {" "}
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
