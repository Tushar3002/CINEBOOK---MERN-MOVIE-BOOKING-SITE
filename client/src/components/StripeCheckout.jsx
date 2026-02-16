// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useState } from "react";

// export default function StripeCheckout({ amount, onSuccess }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // 1️⃣ Create payment intent
//       const res = await fetch("/api/stripe/create-payment-intent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ amount }), // ₹ RUPEES
//       });

//       const { clientSecret } = await res.json();

//       // 2️⃣ Confirm card payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         setError(result.error.message);
//         setLoading(false);
//         return;
//       }

//       if (result.paymentIntent.status === "succeeded") {
//         onSuccess(result.paymentIntent); // 🔥 payment success
//       }
//     } catch (err) {
//       setError("Payment failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div
//   style={{
//     border: "1px solid #ccc",
//     padding: "12px",
//     borderRadius: 8,
//     marginBottom: 12,
//   }}
// >
//   <CardElement />
// </div>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <button
//   disabled={!stripe || loading}
//   style={{
//     width: "100%",
//     padding: "12px 0",
//     background: "#e50914",
//     color: "#fff",
//     border: "none",
//     borderRadius: 8,
//     fontSize: 16,
//     cursor: loading ? "not-allowed" : "pointer",
//   }}
// >
//   {loading ? "Processing..." : `Pay ₹${amount}`}
// </button>

//     </form>
//   );
// }
