import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendOrderEmail = async (orderData: any) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'essentialluxecare@gmail.com',
    subject: 'New Order Request - ESSENTIAL LUXE',
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="text-align: center; color: #000; font-weight: 300;">ESSENTIAL LUXE</h2>
        <p style="text-align: center; color: #D4AF37; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 30px;">New Order Received</p>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Customer:</strong> ${orderData.name}</p>
          <p><strong>Email:</strong> ${orderData.email}</p>
          <p><strong>Item:</strong> ${orderData.productName}</p>
          <p><strong>Quantity:</strong> ${orderData.quantity}</p>
          <p><strong>Total:</strong> $${orderData.totalAmount}</p>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
          This is an automated notification from the Essential Luxe Management System.
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
