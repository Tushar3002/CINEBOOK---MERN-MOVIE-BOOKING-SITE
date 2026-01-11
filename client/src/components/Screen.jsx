export default function Screen() {
  return (
    <div style={{ marginBottom: 20, textAlign: "center" }}>
      <div
        style={{
          margin: "0 auto 6px",
          width: "70%",
          height: 10,
          background: "#ccc",
          borderRadius: "0 0 40px 40px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
      />
      <p style={{ fontSize: 12, color: "#666", letterSpacing: 2 }}>
        SCREEN
      </p>
    </div>
  );
}
