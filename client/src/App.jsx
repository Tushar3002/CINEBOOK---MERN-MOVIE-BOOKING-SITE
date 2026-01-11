import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminMovies from "./pages/AdminMovies.jsx";
import Home from "./pages/Home.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import MovieDetails from "./pages/MovieDetails";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";

import AdminShows from "./pages/AdminShows";

import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register.jsx";

import AdminDashboard from "./pages/AdminDashboard";

import FakePayment from "./pages/FakePayment";



const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return children;
};

function App() {
  return (
  <>
    <Navbar />

    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/book/:showId" element={<BookingPage />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/admin/movies" element={<AdminRoute><AdminMovies /></AdminRoute>} />
      <Route path="/admin/shows" element={<AdminRoute><AdminShows /></AdminRoute>} />
      <Route path="/fake-payment" element={<FakePayment />} />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          
          </AdminRoute>
      }
      />
    </Routes>
  </>
);
}

export default App;
