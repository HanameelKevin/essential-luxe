import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: String,
  link: String,
  isActive: { type: Boolean, default: true },
  position: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);
