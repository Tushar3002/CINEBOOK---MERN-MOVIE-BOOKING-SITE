import { QRCodeCanvas } from "qrcode.react";

export default function BookingQR({ bookingId }) {
  return (
    <div style={{ textAlign: "center", marginTop: 12 }}>
      <QRCodeCanvas
        value={`BOOKING:${bookingId}`}
        size={140}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
      <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
        Show this QR at the theatre
      </p>
    </div>
  );
}
