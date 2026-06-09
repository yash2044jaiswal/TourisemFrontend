import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { useState,useEffect } from "react";
import SignInSignup from './Pages/SignInSignup'
import IndianRailwayPortal from "./Pages/IndianRailwayPortal";
import HotelServices from "./Pages/HotelServices";
import TransportServices from "./Pages/TransportServices";
import FindFlights from "./Pages/FindFlights";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import None from "./Pages/None.jsx";
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token=localStorage.getItem("token");
    const saveuser=localStorage.getItem("user");
    if(token && saveuser){
      setIsLoggedIn(true);
      setUser(JSON.parse(saveuser));
    }
  },[]);
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
  };
  return (
    
 
      
      <BrowserRouter>
      <Header isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout} />
       <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Join" element={<SignInSignup 
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />} />
        <Route path="/trains" element={<IndianRailwayPortal />} />
        <Route path="/hotels" element={<HotelServices />} />
        <Route path="/transport" element={<TransportServices />} />
        <Route path="/find-flights" element={<FindFlights />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<None />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
