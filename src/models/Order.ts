import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productName: {
    type: String,
    required: [true, 'Please provide product name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
  },
  imageUrl: {
    type: String,
  },
  sourceLocation: {
    type: String,
    enum: ['China', 'USA'],
    required: true,
  },
  shippingMethod: {
    type: String,
    enum: ['Air', 'Sea'],
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: 1,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
