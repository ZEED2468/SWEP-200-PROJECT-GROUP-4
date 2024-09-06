import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.js";
import Register from "./Components/Register.js";
import Admin from "./Components/Admin.js";
import Supervisor from "./Components/Supervisor.js";
import Login from "./Components/Login.js";
import TokenLogin from "./Components/TokenLogin.js";
import VerificationPage from "./Components/Verification.js";
import ConfirmedPage from "./Components/Confirmed.js";
import FailedPage from "./Components/Failed.js";
import Result from "./Components/Result.js";
import NotFound from "./Components/NotFound.js";

function App() {
  return (
    <>
      <div className="h-screen min-w-[100vh]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/supervisor" element={<Supervisor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tokenlogin" element={<TokenLogin />} />
            <Route path="/verificationpage" element={<VerificationPage />} />
            <Route path="/confirmedpage" element={<ConfirmedPage />} />
            <Route path="/failedpage" element={<FailedPage />} />
            <Route path="/result" element={<Result />} />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}


export default App


