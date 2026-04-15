import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Clients from "./pages/Clients";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar
            setToken={setToken}
            onMenuClick={() => setIsSidebarOpen(true)}
          />
          <hr />
          <div className="flex flex-1">
            {/* Sidebar and mobile overlay */}
            <SideBar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              ></div>
            )}
            <div className="flex-1 p-6 ml-0 md:ml-64">
              {" "}
              {/* Ajustement pour le sidebar */}
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/clients" element={<Clients token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
