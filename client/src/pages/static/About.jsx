// client/src/pages/static/About.jsx
export default function About() {
  return (
    <div style={pageStyle}>
      <h1 style={heading}>About CineBook</h1>

      <p>
        CineBook is your trusted destination for booking movie tickets quickly
        and effortlessly. We bring the magic of cinema closer to you by making
        ticket booking simple, secure, and convenient.
      </p>

      <p>
        Whether it's the latest blockbuster, a family entertainer, or a
        weekend show with friends, CineBook ensures a smooth booking
        experience from start to finish.
      </p>

      <h3 style={sectionTitle}>🎬 What We Offer</h3>
      <ul style={listStyle}>
        <li>Easy discovery of latest and upcoming movies</li>
        <li>Real-time show timings and seat availability</li>
        <li>Quick and secure ticket booking</li>
        <li>Instant booking confirmation</li>
        <li>Digital tickets with QR code entry</li>
        <li>Hassle-free booking management</li>
      </ul>

      <h3 style={sectionTitle}>🌟 Our Vision</h3>
      <p>
        Our vision is to enhance the cinema-going experience by combining
        technology with convenience, ensuring every customer enjoys a seamless
        journey from selecting a movie to stepping into the theatre.
      </p>

      <h3 style={sectionTitle}>🤝 Customer Commitment</h3>
      <p>
        At CineBook, customer satisfaction is our top priority. We strive to
        provide reliable service, transparent booking processes, and responsive
        support to make your movie experience memorable.
      </p>

      <p style={tagline}>
        Experience cinema the smart way — with CineBook.
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
  marginTop: "30px",
  marginBottom: "10px"
};

const listStyle = {
  paddingLeft: "20px"
};

const tagline = {
  marginTop: "40px",
  fontWeight: "600",
  fontSize: "18px"
};
