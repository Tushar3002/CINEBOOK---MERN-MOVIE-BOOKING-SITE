import jsPDF from "jspdf";
import QRCode from "qrcode";

export async function downloadTicketPDF(booking) {
  const doc = new jsPDF();

  const qrDataUrl = await QRCode.toDataURL(`BOOKING:${booking._id}`);

  doc.setFontSize(18);
  doc.text("Movie Ticket", 20, 20);

  doc.setFontSize(12);
  doc.text("Movie:", 20, 35);
  doc.text(booking.show.movie.title, 60, 35);

  doc.text("Theatre:", 20, 45);
  doc.text(booking.show.theatreName, 60, 45);


  doc.text("Show Time:", 20, 55);
  doc.text(new Date(booking.show.showTime).toLocaleString(), 60, 55);

  doc.text("Seats:", 20, 65);
  doc.text(booking.seats.join(", "), 60, 65);

  doc.text("Amount Paid:", 20, 75);
  doc.text(`Rs. ${booking.totalAmount}`, 60, 75);

  doc.text("Booked On:", 20, 85);
  doc.text(new Date(booking.createdAt).toLocaleString(), 60, 85);

  doc.text("Booking ID:", 20, 95);
  doc.text(booking._id, 60, 95);

  doc.text("Theatre:", 20, 105);
  doc.text(booking.show.location, 60, 105);

  doc.addImage(qrDataUrl, "PNG", 140, 40, 40, 40);
  doc.setFontSize(10);
  doc.text("Scan at theatre entry", 138, 85);

  doc.text(
    "This is a system-generated ticket. No signature required.",
    20,
    115
  );

  doc.save(`Ticket-${booking._id}.pdf`);
}
