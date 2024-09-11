import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../img/Group 6.png";
import spiral from "../img/bgi.png";
import hlogo from "../img/Group 7.png";
import mark from "../img/question_mark.png";
import { NavLinks } from '.';

function FailedPage() {
  const background = {
    backgroundImage: `url(${spiral})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  const [matricNumber, setMatricNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/v1/matric/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matric: matricNumber }),
      });

      if (response.ok) {
        const data = await response.json(); // Correct way to get the response data
        navigate('/result', { state: { student: data, fromMatricNumber: true } }); // Pass the data as student
      } else if (response.status === 404) {
        navigate('/notfound');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8" style={background}>
        <img src={logo} alt="" className="h-12 mb-8" />
        <h1 className="text-2xl font-bold">Face Edu</h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-3 bg-white shadow border-b-2 border-cyan-400">
          <div className="flex">
            <img src={hlogo} alt="" className="h-6 mt-1" />
            <h1 className="text-2xl font-bold ml-3">Face Edu</h1>
          </div>
          <ul className="flex flex-row ml-[100px] gap-36">
            {NavLinks.map((lists) => (
              <li
                key={lists.destination}
                className="text-black text-center hover:text-cyan-400 text-lg font-semibold mt-2"
              >
                <Link to={lists.destination} className="cursor-pointer mr-7">
                  {lists.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center">
            <button
              className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors"
              onClick={() => navigate('/login')}
            >
              Log out
            </button>
          </div>
        </nav>

        <section className="mt-16 justify-center items-center">
          <img src={mark} alt="" className="ml-6"/>
          <div>
            <h1 className="mt-8 text-2xl font-bold">Verification Failed</h1>
            <p className="mt-2 text-lg pl-6">Enter Matric Number</p>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Matric Number"
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button onClick={handleSubmit} className="ml-4 px-6 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
                Submit
              </button>
              {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FailedPage;