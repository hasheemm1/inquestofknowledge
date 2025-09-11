# Deployment Guide for Render.com

## Overview
This guide will help you deploy the "In Quest of Knowledge" website to Render.com using their free tier.

## Prerequisites
- [Render.com account](https://render.com) (free)
- GitHub repository with your code
- Firebase project set up

## Step-by-Step Deployment

### 1. Prepare Your Code
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: In Quest of Knowledge website"
   git branch -M main
   git remote add origin https://github.com/yourusername/inquestofknowledge-website.git
   git push -u origin main
   ```

### 2. Set Up Firebase for Production
1. **Update Firebase Config** in `app/lib/firebase.ts`:
   - Replace the placeholder config with your actual Firebase project details
   - Ensure Firestore is set up and rules are configured

### 3. Deploy to Render

#### Option A: Using Render Dashboard (Recommended)
1. **Login to Render**: Go to [render.com](https://render.com) and sign in
2. **New Web Service**: Click "New +" → "Web Service"
3. **Connect Repository**: Connect your GitHub repository
4. **Configure Service**:
   - **Name**: `inquestofknowledge-website`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for custom domain)

#### Option B: Using render.yaml (Infrastructure as Code)
1. The `render.yaml` file is already configured in your project root
2. Render will automatically detect and use this configuration

### 4. Environment Variables
Add these environment variables in Render Dashboard:

**Required:**
- `NODE_ENV` = `production`

**Optional (for Firebase):**
- `FIREBASE_API_KEY` = your_firebase_api_key
- `FIREBASE_AUTH_DOMAIN` = your_project.firebaseapp.com
- `FIREBASE_PROJECT_ID` = your_project_id
- `FIREBASE_STORAGE_BUCKET` = your_project.appspot.com
- `FIREBASE_MESSAGING_SENDER_ID` = your_sender_id
- `FIREBASE_APP_ID` = your_app_id

### 5. Custom Domain (Optional)
1. **Purchase Domain**: Get `inquestofknowledge.com` or similar
2. **Add Custom Domain** in Render:
   - Go to your service settings
   - Add custom domain
   - Update DNS records as instructed by Render

### 6. SSL Certificate
- Render automatically provides free SSL certificates
- Your site will be available at `https://yoursitename.onrender.com`

## Post-Deployment Checklist

### ✅ Website Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Book cover and logo display properly
- [ ] Order form submits successfully
- [ ] Firebase orders are created
- [ ] Mobile responsiveness works

### ✅ SEO & Performance
- [ ] Meta tags are present
- [ ] Structured data is valid
- [ ] Social media cards work
- [ ] Favicon displays correctly
- [ ] Page load speed is acceptable

### ✅ Business Features
- [ ] Order system works end-to-end
- [ ] M-Pesa payment instructions display
- [ ] Email functionality (if implemented)
- [ ] Contact information is correct

## Monitoring & Maintenance

### 1. Monitor Orders
- Check Firebase Console regularly for new orders
- Set up email notifications for new orders (optional)

### 2. Performance Monitoring
- Use Render's built-in metrics
- Monitor page load speeds
- Check error logs

### 3. Content Updates
- Update pricing if needed
- Add testimonials as they come in
- Update publication information

## Troubleshooting

### Common Issues
1. **Build Fails**: 
   - Check `package.json` scripts
   - Ensure all dependencies are listed
   - Check Node.js version compatibility

2. **Firebase Errors**:
   - Verify Firebase config
   - Check Firestore security rules
   - Ensure project is active

3. **Images Not Loading**:
   - Verify images are in `public/images/`
   - Check file paths in code
   - Ensure proper image formats

### Getting Help
- Render Documentation: [docs.render.com](https://docs.render.com)
- Render Community: [community.render.com](https://community.render.com)
- Contact support through Render dashboard

## Estimated Timeline
- **Setup**: 30 minutes
- **Deployment**: 10-15 minutes
- **Testing**: 30 minutes
- **Total**: ~1.5 hours

## Cost
- **Render Free Tier**: $0/month
  - 750 hours/month (enough for most personal sites)
  - Automatic sleeping after 15 minutes of inactivity
  - Custom domain support

- **Render Starter**: $7/month
  - No sleeping
  - More reliable for business use
  - Recommended for production

Your website will be live at: `https://inquestofknowledge-website.onrender.com`
