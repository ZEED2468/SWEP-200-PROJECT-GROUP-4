import logo from "../img/Group 6.png";
import hlogo from "../img/Group 7.png";
import spiral from "../img/bgi.png";
import justdoit from "../img/check.png";
import { NavLinks } from '.';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function ConfirmedPage() {

  const background = {
    backgroundImage: `url(${spiral})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  }

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result'); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);


return (
    <div className="flex h-screen">
      <div className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8"
      style={background}>
        <img src={logo} alt="" className="h-12 mb-8" />
        <h1 className="text-2xl font-bold">Face Edu</h1>
        {/* <p className="mt-4">@SWEP200 GROUP 4</p> */}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-3 bg-white shadow border-b-2 border-cyan-400">
        <div className="flex">
        <img src={hlogo} alt="" className="h-6 mt-1"/>
        <h1 className="text-2xl font-bold ml-3">Face Edu</h1>
        </div>
        <ul className='flex flex-row ml-[100px] gap-36'>
                  {NavLinks.map((lists) => (
                 <li key={lists} className='text-black text-center hover:text-cyan-400 text-lg
                  font-semibold mt-2'>
                  <Link to={lists.destination} className='cursor-pointer mr-7'>
                    {lists.text}</Link>
                 </li> )
                  )}
            </ul>
          <div className="flex flex-row items-center">
            <img
              src="placeholder" // image placeholder
              alt="Profile"
              className="mr-2 w-8 h-8 border-2 border-cyan-400 rounded-full object-cover"
            />
          <button class="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
            Log out
        </button>
        </div>
        </nav>

         <section className="flex-1 flex flex-col items-center justify-center">
          <div>
            <div className="flex items-center justify-center">
              <div className="mt-10 mb-10 flex items-center justify-center">
                <img src={justdoit} alt=""/> 
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mb-4">Verification confirmed</h1>
              <h4>Please wait a second.....</h4>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ConfirmedPage;