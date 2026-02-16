// import StripeCheckout from "../components/StripeCheckout";

export default function CheckoutPage() {
  const amount = 450; // ₹ INR

  const handlePaymentSuccess = async (paymentIntent) => {
    // CALL YOUR BOOKING CONFIRM API HERE
    console.log("Payment success:", paymentIntent.id);
  };

  return (
    <>
      <h2>Pay ₹{amount}</h2>
      <StripeCheckout amount={amount} onSuccess={handlePaymentSuccess} />
    </>
  );
}
