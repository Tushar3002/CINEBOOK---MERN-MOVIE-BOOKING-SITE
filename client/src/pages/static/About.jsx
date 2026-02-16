// client/src/pages/static/About.jsx
export default function About() {
  return (
    <div style={pageStyle}>
      <h2>About CineBook</h2>
      <p>
        CineBook is an online movie ticket booking system developed to simplify
        the process of browsing movies, selecting shows, booking seats, and
        managing tickets digitally.
      </p>
      <p>
        The system provides a user-friendly interface for customers and a
        powerful admin panel to manage movies, shows, and bookings efficiently.
      </p>
    </div>
  );
}

const pageStyle = {
  maxWidth: 900,
  margin: "40px auto",
  padding: 20,
  lineHeight: 1.6
};
