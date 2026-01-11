export default function SeatLegend() {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        marginBottom: 15,
        alignItems: "center",
        fontSize: 14
      }}
    >
      <LegendItem color="#fff" label="Available" />
      <LegendItem color="#4caf50" label="Selected" />
      <LegendItem color="#7d0000" label="Booked" />
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 18,
          height: 18,
          background: color,
          border: "1px solid #333",
          borderRadius: 4
        }}
      />
      <span>{label}</span>
    </div>
  );
}
