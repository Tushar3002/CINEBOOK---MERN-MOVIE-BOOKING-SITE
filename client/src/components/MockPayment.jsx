export default function MockPayment({ amount, onSuccess, onCancel }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        width: 320
      }}>
        <h3>Mock Payment</h3>
        <p>Total Amount: ₹{amount}</p>

        <button
          style={{ width: "100%", marginBottom: 8 }}
          onClick={onSuccess}
        >
          Pay ₹{amount}
        </button>

        <button
          style={{ width: "100%" }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
