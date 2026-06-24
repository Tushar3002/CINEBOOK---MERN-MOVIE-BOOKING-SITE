// client/src/pages/static/Contact.jsx
export default function Contact() {
  return (
    <div style={pageStyle}>
      <h1 style={heading}>Contact CineBook</h1>

      <p style={{ marginBottom: "20px" }}>
        We're here to help! Whether you have questions about bookings,
        payments, refunds, or partnerships — our team is ready to assist you.
      </p>

      <div style={section}>
        <h3>📧 Email Support</h3>
        <p><strong>Customer Support:</strong> support@cinebook.com</p>
        <p><strong>Bookings & Refunds:</strong> bookings@cinebook.com</p>
        <p><strong>Business Enquiries:</strong> business@cinebook.com</p>
        <p style={note}>Response Time: Within 24 hours</p>
      </div>

      <div style={section}>
        <h3>📞 Phone Support</h3>
        <p><strong>Customer Care:</strong> +91 98765 43210</p>
        <p><strong>Alternate Number:</strong> +91 98250 12345</p>
        <p style={note}>
          Support Hours: Monday – Saturday (9:00 AM – 8:00 PM) <br />
          Sunday (10:00 AM – 5:00 PM)
        </p>
      </div>

      <div style={section}>
        <h3>📍 Corporate Office</h3>
        <p>
          CineBook Headquarters <br />
          3rd Floor, Silver Heights Complex <br />
          Kalavad Road, Near Crystal Mall <br />
          Rajkot – 360005 <br />
          Gujarat, India
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>💬 Connect With Us</h3>
        <p>Instagram: @cinebook_official</p>
        <p>Facebook: facebook.com/cinebook</p>
        <p>Twitter (X): @cinebook</p>
      </div>

      <p style={tagline}>
        🎬 Thank you for choosing CineBook. We look forward to serving you!
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

const section = {
  marginBottom: "25px"
};

const note = {
  fontSize: "14px",
  color: "#555"
};

const tagline = {
  marginTop: "40px",
  fontWeight: "600"
};
