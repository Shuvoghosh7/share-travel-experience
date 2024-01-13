import jsPDF from "jspdf";
export const generatePDF = (data: {
  totalPrice: string;
  deliveryCharge: string;
  subtotal: string;
  shippingAddress: string;
  orderItems: any; name: string; phone: string; 
}) => {
  const pdf = new jsPDF();
  let yPos = 20; // Initial y-coordinate

  pdf.text("* Customer Name: " + data.name, 20, yPos);
  yPos += 10; // Increase y-coordinate for the next line
  pdf.text("* Phone: " + data.phone, 20, yPos);
  yPos += 10;
  pdf.text("* Shipping Address: " + data.shippingAddress, 20, yPos);
  yPos += 10;
  pdf.text("* Your Product:", 20, yPos);
  yPos += 10;

  data.orderItems.forEach((item: { product: any; quantity: any; }, index: number) => {
    pdf.text(`${index + 1}. Product: ${item.product}, Quantity: ${item.quantity}`, 20, yPos);
    yPos += 10; // Increase y-coordinate for the next line
  });

  pdf.text("* Product Price: " + data.subtotal, 20, yPos);
  yPos += 10;
  pdf.text("* Delivery Charge: " + data.deliveryCharge, 20, yPos);
  yPos += 10;
  pdf.text("* Total Price: " + data.totalPrice, 20, yPos);

  // Save the PDF
  pdf.save('order_details.pdf');
};
