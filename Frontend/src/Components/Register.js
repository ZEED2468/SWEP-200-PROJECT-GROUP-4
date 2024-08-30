import React, { useState } from "react";
import logo from "../img/Group 7.png";
import face from "../img/Ellipse 3.svg";
import back from "../img/Group 4.png";
import { useNavigate } from "react-router-dom";
import topLogo from "../img/Group 6.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const background = {
  backgroundImage: `url(${face})`,
  backgroundSize: "cover",
  height: "70vh",
  backgroundRepeat: "no-repeat",
};

const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signup = async (email, password, name) => {
    const response = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      console.log(error);
      setError(json.msg);
    }
    if (response.ok) {
      navigate("/admin");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      await signup(email, password, name);
    }
    setEmail("");
    setPassword("");
    setName("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex flex-row gap-8
    border rounded-none m-auto 
    relative top-32 sm:top-1 h-[200px]
    sm:flex sm:flex-col w-[1000px] sm:w-full sm:overflow-hidden
     bg-black sm:min-h-[1933px]
     sm:border sm:rounded-none overflow-hidden
     "
      style={background}
    >
      <div
        className="flex flex-col justify-between sm:p-0
       bg-white p-3 border rounded-3xl rounded-r-none
        w-72 sm:flex sm:flex-row sm:w-full sm:rounded-none sm:h-30"
      >
        <img
          src={logo}
          alt="logo"
          height="30px"
          width="100px"
          className="m-auto sm:relative sm:bottom-2"
        />
        <h3
          className="text-black font-bold text-4xl relative
         bottom-20 m-auto sm:relative sm:bottom-10 sm:top-7 sm:right-64"
        >
          FaceEdu
        </h3>
        <img
          src={face}
          alt="faceverify"
          height="100px"
          width="200px"
          className="m-auto sm:relative sm:bottom-1 sm:left-16"
        />
      </div>
      <div
        className="flex flex-col m-auto 
      "
      >
        <img
          src={topLogo}
          alt="logo"
          height="30px"
          width="100px"
          className="m-auto relative sm:relative sm:bottom-72
       bottom-14"
        />
        <h3
          className="text-white text-center font-bold text-4xl relative bottom-0 sm:relative sm:bottom-24 sm:text-6xl
         "
        >
          SIGN UP
        </h3>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col 
        gap-2 relative top-14 sm:m-auto sm:flex sm:flex-col sm:gap-28"
        >
          <div
            className="flex flex-col gap-2 relative 
          right-10 sm:relative sm:right-0 sm:flex sm:flex-col sm:gap-6"
          >
            <label
              htmlFor="name"
              className="text-white text-semibold 
            text-xl sm:text-4xl uppercase"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              required
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="h-12 border rounded-lg sm:p-5 sm:text-4xl
              text-xl font-semibold w-[500px] sm:h-24 sm:w-[600px]"
            />
          </div>
          <div
            className="flex flex-col gap-2 relative  sm:gap-6
          right-10 sm:relative sm:right-0"
          >
            <label
              htmlFor="email"
              className="text-white text-semibold text-xl 
            sm:text-4xl uppercase"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="h-12 border  sm:p-5 sm:text-4xl
              rounded-lg text-xl font-semibold
              w-[500px]
               p-3 sm:h-24 sm:w-[600px]"
            />
          </div>
          <div
            className="flex flex-col gap-2 relative right-10 sm:gap-6
          sm:relative sm:right-0"
          >
            <label
              htmlFor="password"
              className="text-white text-semibold 
            text-xl sm:text-4xl uppercase"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="h-12 border rounded-lg sm:p-5 sm:text-4xl
              w-[500px]
               text-xl 
              font-semibold p-3 sm:h-24 sm:w-[600px]"
            />
            <span
              className="relative left-[460px] cursor-pointer text-black bottom-11 sm:relative sm:bottom-20 sm:ml-[100px]"
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
            className="bg-white text-black border rounded-2xl p-3 w-fit pl-16 pr-16
           m-auto font-bold text-lg hover:bg-[#3FF3FF] relative bottom-5 sm:p-5 sm:pl-14 sm:pr-14 sm:text-4xl"
            type="submit"
          >
            SIGN UP
          </button>
        </form>
        <p
          className="text-white text-center mt-12 text-xl
        sm:relative sm:right-0 relative right-5 sm:text-4xl"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            target="_blank"
            className="text-[#3FF3FF] text-xl sm:text-4xl"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
