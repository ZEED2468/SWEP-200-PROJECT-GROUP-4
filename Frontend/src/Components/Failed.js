import logo from "../img/Group 6.png";
import hlogo from "../img/Group 7.png";
import mark from "../img/question_mark.png";


function FailedPage() {
  return (
    <div className="flex h-screen">
      <div className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8">
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
          <ul className="flex space-x-40">
            <li className="text-lg font-semibold">Home</li>
            <li className="text-lg font-semibold text-black">Verification</li>
            <li className="text-lg font-semibold">Result</li>
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

        <section className="mt-16 justify-center items-center">
        <img src={mark} alt="" className="ml-6"/>
            <div>
            <h1 className="mt-8 text-2xl font-bold">Verification Failed</h1>
            <p className="mt-2 text-lg pl-6">Enter Matric Number</p>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Matric Number"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button className="ml-4 px-6 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
                Submit
              </button>
            </div>
            </div>
          </section>
    
    </div>
  </div>  
  );
}

export default FailedPage;
