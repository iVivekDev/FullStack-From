import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../components/Sidebar";



const Home = () => {
  const [userData, setUserData] = useState([])

  const UserData = async () => {
    try {
      const headers = { Authorization: localStorage.getItem("Token") }
      const Data = await axios.get("https://localhost:44373/api/Register/GetAllUser", { headers })
      setUserData(Data.data)
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  useEffect(() => {
    UserData();
  }, [])

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-7">
          <h1 className="text-2xl font-semibold">Home</h1>
          {userData.map((user, index) => {
            return (
              <h6 key={index}>{user.userName}</h6>
            )
          })}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Home;
