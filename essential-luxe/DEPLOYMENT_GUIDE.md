# 💎 ESSENTIAL LUXE Deployment Guide

This guide outlines how to deploy the premium import marketplace platform.

## 🚀 Architecture Overview
- **Frontend**: Next.js (Deployed to Vercel)
- **Backend**: Node.js/Express (Deployed to Render/Railway/AWS)
- **Database**: MongoDB Atlas (Cloud)
- **Images**: Cloudinary

## 🛠️ Backend Deployment (Render/Railway)
1. **Prepare Environment Variables**:
   - `MONGODB_URI`: Your Atlas connection string.
   - `JWT_SECRET`: A strong random string.
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: From Cloudinary dashboard.
   - `EMAIL_USER`: Your `essentialluxecare@gmail.com` email.
   - `EMAIL_PASS`: A Google App Password.

2. **Build Command**: `npm install`
3. **Start Command**: `node server/src/index.ts` (or use `ts-node` if not transpiled)

## 🎨 Frontend Deployment (Vercel)
1. **Connect GitHub Repository** to Vercel.
2. **Configure Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend.
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

## ✅ Verification Checklist
- [ ] Landing page loads with animations.
- [ ] User registration & login works.
- [ ] Import request flow submits and sends email.
- [ ] Admin panel can view orders and requests.
- [ ] Mobile responsiveness is seamless.

## 🛡️ Maintenance
- Monitor MongoDB Atlas for usage spikes.
- Regularly update Cloudinary assets.
- Check Google App Password status if emails fail.
