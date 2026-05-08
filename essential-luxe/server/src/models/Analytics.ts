import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true }, // e.g., 'product_view', 'order_placed', 'import_request'
  entityId: { type: mongoose.Schema.Types.ObjectId }, // Reference to Product or Order
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  metadata: { type: Map, of: String },
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);
