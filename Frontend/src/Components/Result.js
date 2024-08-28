import logo from "../img/Group 6.png";
import hlogo from "../img/Group 7.png";

function Result() {
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

        <div className="flex w-2/3 mt-20">
         <div className="space-y-2">
            <p className="font-semibold">Registration No:</p>
            <p className="font-semibold">Name:</p>
            <p className="font-semibold">Faculty:</p>
            <p className="font-semibold">Department:</p>
            <p className="font-semibold">Programme:</p>
            <p className="font-semibold">Semester/Session:</p>
            <p className="font-semibold">Current Part:</p>
         </div>

         <div className="space-y-2 ml-20">
          <p className="font-semibold">CSC/2025/341</p>
          <p className="font-semibold">ANYONE ANYBODY NODODY</p>
          <p>Technology</p>
          <p>Computer Science and Engineering</p>
          <p>B.Sc. Computer Engineering</p>
          <p>Rain, 2025/2026</p>
          <p>Part 2</p>
         </div>

        
         <div className="flex flex-col items-center pl-20">
            <img
              src="placeholder" // image placeholder, 
              alt="Profile"
              className="w-24 h-24 border-2 border-cyan-400 rounded-full object-cover"
            />
          </div>

        </div>

        <div className="w-2/3 pt-10">
            <h2 className="text-1xl text-center font-bold mb-4 mr-40">LIST OF REGISTERED COURSES</h2>
            <div className="grid grid-cols-4 gap-4">
              <p>AEE202</p>
              <p>CPE204</p>
              <p>CSC202</p>
              <p>CSC202</p>
              <p>CVE202</p>
              <p>EEE202</p>
              <p>EEE292</p>
              <p>MEE204</p>
              <p>MEE206</p>
              <p>MTH201</p>
            </div>
          </div>

        </div>
        </div>
      );
    }
    
    export default Result;
    


    // justify-between items-start