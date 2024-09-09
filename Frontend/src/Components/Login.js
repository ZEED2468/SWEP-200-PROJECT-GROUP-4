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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch, user } = useAuthContext();
  const supervisor = user?.supervisor;

  const login = async (email, password) => {
    setIsLoading(true);
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
      if (!supervisor) {
        navigate("/admin");
      } else {
        navigate("/verificationpage");
      }

      setIsLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
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

      <div className="flex flex-col m-auto sm:flex sm:flex-col">
        <Link to={"/tokenlogin"}>
          <h3
            className="text-white pointer relative left-[420px] bottom-6 border border-[#3FF3FF]
             rounded-3xl text-center w-fit p-3 pl-7 pr-7 sm:relative sm:bottom-44 sm:left-24 sm:p-2 sm:pl-3 sm:pr-3 
             sm:text-sm sm:text-white sm:bg-black"
          >
            SUPERVISOR
          </h3>
        </Link>

        <img
          src={topLogo}
          alt="logo"
          height="30px"
          width="100px"
          className="m-auto relative
       bottom-14 sm:relative sm:bottom-24"
        />
        <h3
          className="text-white text-center font-bold text-4xl relative bottom-0 
         sm:relative sm:bottom-10"
        >
          SIGN IN
        </h3>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-7 "
        >
          <div
            className="flex flex-col gap-2 relative 
          right-10 sm:relative sm:right-0"
          >
            <label
              htmlFor="email"
              className="text-white text-semibold text-xl 
            sm:text-lg uppercase"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border 
              rounded-lg text-xl font-semibold
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
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? <h2>login in....</h2> : <h2>LOGIN</h2>}
          </button>

          <div className="mt-2 font-bold text-center">
            <span className="text-white">Don't have an account ? | </span>
            <span className="text-blue-400 cursor-pointer hover:text-[#3FF3FF]">
              <Link to="/register">Register</Link>
            </span>
          </div>

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

export default Login;
