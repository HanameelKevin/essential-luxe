import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    country: String,
    phone: String
  },
  paymentStatus: { type: String, enum: ['Unpaid', 'Paid', 'Refunded'], default: 'Unpaid' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
