// client/src/pages/static/Terms.jsx
export default function Terms() {
  return (
    <div style={pageStyle}>
      <h1 style={heading}>Terms & Conditions</h1>

      <p>
        Welcome to CineBook. By accessing or using our website and services,
        you agree to comply with and be bound by the following Terms &
        Conditions. Please read them carefully before making a booking.
      </p>

      <h3 style={sectionTitle}>1. Ticket Booking</h3>
      <p>
        All movie ticket bookings are subject to availability and confirmation.
        Once a booking is successfully completed, a confirmation message or
        email will be sent to the registered contact details.
      </p>

      <h3 style={sectionTitle}>2. Payments</h3>
      <p>
        Users are responsible for ensuring that payment details entered during
        booking are accurate. CineBook is not responsible for failed
        transactions due to incorrect information or payment gateway issues.
      </p>

      <h3 style={sectionTitle}>3. Cancellation & Refund Policy</h3>
      <p>
        Cancellation and refund policies are governed by individual theatre
        partners. Refund eligibility, if applicable, will be processed in
        accordance with the theatre's policy and may take 5–7 business days.
      </p>

      <h3 style={sectionTitle}>4. User Responsibilities</h3>
      <p>
        Users must provide accurate information during account registration and
        booking. Misuse of the platform, fraudulent activity, or unauthorized
        access may result in suspension of the account.
      </p>

      <h3 style={sectionTitle}>5. Entry to Theatre</h3>
      <p>
        Customers must present a valid digital or printed ticket at the theatre
        entrance. The theatre reserves the right to deny entry if ticket
        details are invalid or tampered with.
      </p>

      <h3 style={sectionTitle}>6. Modifications</h3>
      <p>
        CineBook reserves the right to modify these Terms & Conditions at any
        time without prior notice. Continued use of the platform constitutes
        acceptance of the updated terms.
      </p>

      <p style={footerNote}>
        If you have any questions regarding these Terms & Conditions, please
        contact our support team.
      </p>
    </div>
  );
}

const pageStyle = {
  maxWidth: 900,
  margin: "60px auto",
  padding: 20,
  lineHeight: 1.8,
  fontFamily: "Segoe UI, sans-serif",
  color: "#333"
};

const heading = {
  marginBottom: "25px"
};

const sectionTitle = {
  marginTop: "25px",
  marginBottom: "10px"
};

const footerNote = {
  marginTop: "40px",
  fontSize: "14px",
  color: "#555"
};
