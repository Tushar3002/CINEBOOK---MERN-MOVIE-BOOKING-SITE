import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axiosInstance";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = params.get("session_id");

    if (!sessionId) {
      navigate("/");
      return;
    }

    const finalizeBooking = async () => {
      try {
        await api.post(
          "/bookings/confirm",
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        navigate("/my-bookings");
      } catch (err) {
  console.error("BOOKING CONFIRM WARNING", err);
  navigate("/my-bookings"); // booking already exists
}
    };

    finalizeBooking();
  }, []);

  return <p style={{ padding: 40 }}>Finalizing your booking...</p>;
}
