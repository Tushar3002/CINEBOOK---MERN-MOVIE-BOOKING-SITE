import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosInstance";

export default function FakePayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { showId, seats, amount } = location.state || {};

  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);

  if (!showId || !seats) {
    return <div style={{ padding: 20 }}>Invalid payment request</div>;
  }

  const handlePay = async () => {
    if (!upi.includes("@")) {
      alert("Enter a valid UPI ID");
      return;
    }

    setLoading(true);
    try {
      // fake delay
      await new Promise(res => setTimeout(res, 1500));

      // save booking
      await api.post("/bookings", {
        showId,
        seats
      });

      alert("Payment successful! Booking confirmed 🎉");
      navigate("/my-bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
        }}
      >
        <h2 style={{ marginTop: 0 }}>UPI Payment</h2>

        {/* AMOUNT */}
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            background: "#fafafa",
            borderRadius: 8,
            textAlign: "center"
          }}
        >
          <p style={{ margin: 0, color: "#666" }}>Amount to Pay</p>
          <p style={{ margin: 0, fontSize: 22, fontWeight: "bold" }}>
            ₹{amount}
          </p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>UPI ID</label>
          <input
            placeholder="example@upi"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 4,
              borderRadius: 6,
              border: "1px solid #ccc"
            }}
          />
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 0",
            background: "#e50914",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>

        <p
          style={{
            marginTop: 14,
            fontSize: 12,
            color: "#777",
            textAlign: "center"
          }}
        >
          
        </p>
      </div>
    </div>
  );
}
