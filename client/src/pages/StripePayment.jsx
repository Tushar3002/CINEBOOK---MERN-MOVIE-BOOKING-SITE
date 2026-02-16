// import { Elements } from "@stripe/react-stripe-js";
// import stripePromise from "../stripe";
// import StripeCheckout from "../components/StripeCheckout";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function StripePayment() {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   const { showId, seats, amount } = state || {};

//   if (!amount) {
//     return <p style={{ padding: 40 }}>Invalid payment request</p>;
//   }

//   const handleSuccess = async (paymentIntent) => {
//     // 🔜 booking API call will go here
//     navigate("/my-bookings");
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #141e30, #243b55)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: 420,
//           background: "#fff",
//           borderRadius: 14,
//           boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
//           padding: 24,
//         }}
//       >
//         {/* HEADER */}
//         <h2 style={{ marginTop: 0, marginBottom: 6, textAlign: "center" }}>
//           Complete Payment
//         </h2>
//         <p style={{ textAlign: "center", color: "#666", marginTop: 0 }}>
//           Secure payment powered by Stripe
//         </p>

//         <hr style={{ margin: "16px 0" }} />

//         {/* SUMMARY */}
//         <div style={{ marginBottom: 16 }}>
//           <p style={{ margin: "6px 0" }}>
//             <strong>Seats:</strong> {seats?.join(", ")}
//           </p>
//           <p style={{ margin: "6px 0", fontSize: 18 }}>
//             <strong>Total:</strong>{" "}
//             <span style={{ color: "#e50914" }}>₹{amount}</span>
//           </p>
//         </div>

//         {/* STRIPE FORM */}
//         <Elements stripe={stripePromise}>
//           <StripeCheckout amount={amount} onSuccess={handleSuccess} />
//         </Elements>

//         {/* FOOTER */}
//         <p
//           style={{
//             marginTop: 14,
//             fontSize: 12,
//             color: "#777",
//             textAlign: "center",
//           }}
//         >
//           Your card details are encrypted and never stored.
//         </p>
//       </div>
//     </div>
//   );
// }
