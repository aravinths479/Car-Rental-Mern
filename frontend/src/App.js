import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SingleCar from "./pages/SingleCar";
import BookCar from "./pages/BookCar";
import MyBookings from "./pages/MyBookings";
import BookingInfo from "./pages/BookingInfo";


function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />

            <Route
              path="/singleCar/:id"
              element={user ? <SingleCar /> : <Navigate to="/login" />}
            />

            <Route
              path="/booking/:carid"
              element={user ? <BookCar /> : <Navigate to="/login" />}
            />
            <Route
              path="/mybooking"
              element={user ? <MyBookings /> : <Navigate to="/login" />}
            />
            <Route
              path="/mybooking/:id"
              element={user ? <BookingInfo /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>

      <ScrollToTopButton />
    </div>
  );
}

export default App;
