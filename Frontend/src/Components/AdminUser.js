import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

function AdminUser() {
  const { user, dispatch } = useAuthContext();
  const [tokenUsers, setTokenUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const tokenID = user?.user?.token_id || user?.userdetails.createToken._id;
  const supervisor = user?.supervisor;
  const fetchTokenUsers = async () => {
    const response = await fetch(`/api/v1/admin/users/${tokenID}`, {
      method: "GET",
    });
    setLoading(true);
    const json = await response.json();
    if (response.ok) {
      //  console.log(json);
      setTokenUsers(json?.supervisorTokenUsers);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTokenUsers();
  }, [user]);
  console.log(tokenUsers);
  if (supervisor) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2>
          <p className="text-2xl text-red-500 font-bold text-center m-2 p-2">
            Unauthorized to access this route 😥😥
          </p>
        </h2>
        <Link to="/login">
          {" "}
          <p className="font-bold text-center text-xl text-blue-400 cursor-pointer hover:text-blue-600">
            Go to login
          </p>
        </Link>{" "}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-3xl">Token Users: </h2>
      <div className="m-3">
        here is a list of supervisors who used your token
      </div>

      {tokenUsers?.length > 0 ? (
        <div className=" bg-slate-50 p-6 rounded shadow-md shadow-blue-500 text-center  w-1/3">
          {tokenUsers.map((user, index) => (
            <li className="list-none p-4 flex flex-row">
              <p className="m-3 text-2xl mb-3">{index + 1}</p>
              <p className="font-bold m-3 text-2xl">{user.name}</p>
            </li>
          ))}
          <Link to="/admin">
            {" "}
            <p className="text-center text-xl font-semibold text-blue-400">
              Go to Home
            </p>
          </Link>{" "}
        </div>
      ) : (
        <div>
          <>
            {loading ? (
              <>
                <div>
                  {" "}
                  <p className="text-2xl text-red-500 font-bold text-center m-2 p-2">
                    OOPs!!! No Users 😓
                  </p>
                  <Link to="/admin">
                    <p className="font-bold text-center text-xl text-blue-400 cursor-pointer hover:text-blue-600">
                      Go to Home
                    </p>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-blue-600 font-bold">
                  {" "}
                  Loading supervisor list......
                </p>
              </>
            )}
          </>
          <Link to="/admin">
            {" "}
            <p className="font-bold text-center text-xl text-blue-400 cursor-pointer hover:text-blue-600">
              Go to Home
            </p>
          </Link>{" "}
        </div>
      )}
      {/* fetch user token based on token id */}
    </div>
  );
}

export default AdminUser;
