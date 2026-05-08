import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  image: String,
  role: String, // e.g., "Business Owner", "Individual Buyer"
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
