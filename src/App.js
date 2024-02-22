import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import FlightSearch from "./FlightSearch";
import FlightBooking from "./FlightBooking";
import axios from "axios";
import { useState, useEffect } from "react";
import ThemeContext from "./Context";
import LandingPage from "./LandingPage";
import Auth from "./Auth";
import AllBookings from "./AllBookings";
import Profile from "./Profile";
// import { useNavigate } from "react-router-dom";  
import Success from "./Success";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  // const navigate = useNavigate();

  async function logoutUser() {
    const res = await axios.get("https://bmf-backend.onrender.com/api/v1/auth/logout", { withCredentials: true });
    if(res.data.success) {
      setLoggedIn(false);
    }
  }

  async function checkLoggedIn() {
    const res = await axios.get("https://bmf-backend.onrender.com/api/v1/auth/check-login-status", { withCredentials: true });

    if(res.data.success) {
      setLoggedIn(true);
      setUsername(res.data.user);
    }
    else {
      setLoggedIn(false);
      // navigate("/");
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ loggedIn, setLoggedIn, username, logoutUser, setUsername, checkLoggedIn }}>
        <main className="flex flex-col max-h-screen min-h-screen min-w-screen max-w-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/flight-search" element={loggedIn && <FlightSearch />} />
            <Route path="/flight-booking/:flightId" element={<FlightBooking />} />
            <Route path="/all-bookings" element={<AllBookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/success" element={<Success />} />
          </Routes>
          <div><Toaster position="bottom-center" /></div>
        </main>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
