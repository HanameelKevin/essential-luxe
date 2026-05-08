import mongoose from 'mongoose';

const importRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productName: { type: String, required: true },
  description: { type: String },
  referenceImage: { type: String },
  sourceCountry: { type: String, enum: ['China', 'USA'], required: true },
  shippingMethod: { type: String, enum: ['Air', 'Sea'], required: true },
  quantity: { type: Number, required: true, default: 1 },
  notes: String,
  status: {
    type: String,
    enum: ['Pending', 'Quoted', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  quoteAmount: Number,
}, { timestamps: true });

export default mongoose.model('ImportRequest', importRequestSchema);
