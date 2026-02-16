// client/src/pages/static/Terms.jsx
export default function Terms() {
  return (
    <div style={pageStyle}>
      <h2>Terms & Conditions</h2>

      <ul>
        <li>All bookings are subject to availability.</li>
        <li>Once booked, tickets cannot be transferred.</li>
        <li>Cancellation policies depend on theatre rules.</li>
        <li>This is a demo project; no real payments are involved.</li>
      </ul>
    </div>
  );
}

const pageStyle = {
  maxWidth: 900,
  margin: "40px auto",
  padding: 20,
  lineHeight: 1.6
};
