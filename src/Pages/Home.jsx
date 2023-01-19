import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";


const Home = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      Navigate("/Home");
    }
  }, []);

 

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-7">
          <h1 className="text-2xl font-semibold">Content</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
