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
import Footer from "./components/Footer";

import Register from "./pages/Register.jsx";

import AdminDashboard from "./pages/AdminDashboard";

import FakePayment from "./pages/FakePayment";

import About from "./pages/static/About.jsx";
import Contact from "./pages/static/Contact.jsx";
import Terms from "./pages/static/Terms.jsx";

import { Elements } from "@stripe/react-stripe-js";

import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return children;
};

const UserOnlyRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role === "admin") return <Navigate to="/" />;

  return children;
};


function App() {
  return (
  <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
    <Navbar />

    <div style={{ flex: 1 }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route
  path="/book/:showId"
  element={
    <UserOnlyRoute>
      <BookingPage />
    </UserOnlyRoute>
  }
/>

      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/admin/movies" element={<AdminRoute><AdminMovies /></AdminRoute>} />
      <Route path="/admin/shows" element={<AdminRoute><AdminShows /></AdminRoute>} />
      <Route path="/fake-payment" element={<FakePayment />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route
    path="/admin/users"
    element={<AdminRoute><AdminUsers /></AdminRoute>}
  />  

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          
          </AdminRoute>
      }
      />
    </Routes>
    </div>
    <Footer />
  </div>
);
}

export default App;
