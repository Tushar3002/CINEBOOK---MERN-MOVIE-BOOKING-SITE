// client/src/pages/static/Contact.jsx
export default function Contact() {
  return (
    <div style={pageStyle}>
      <h2>Contact Us</h2>
      <p>If you have any queries or issues, feel free to reach out.</p>

      <p><strong>Email:</strong> support@cinebook.com</p>
      <p><strong>Phone:</strong> +91 98765 43210</p>
      <p><strong>Address:</strong> CineBook HQ, India</p>
    </div>
  );
}

const pageStyle = {
  maxWidth: 900,
  margin: "40px auto",
  padding: 20,
  lineHeight: 1.6
};
