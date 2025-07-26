# Deployment Guide - Firebase Configuration

## Current Status

✅ **Local Development** (`localhost:3001`): Working perfectly with Firebase
❌ **Production Deployment** (`transender.uk`): Missing environment variables

## Solution Options

### Option 1: Set Environment Variables on Hosting Platform (Recommended)

If you're using a hosting service, set these environment variables in your hosting platform's dashboard:

#### Environment Variables to Set:
```
FIREBASE_API_KEY=AIzaSyDnmhOQpIzUB5uaqNQ45VPZJzSghEXoNlg
FIREBASE_AUTH_DOMAIN=transender-282ef.firebaseapp.com
FIREBASE_PROJECT_ID=transender-282ef
FIREBASE_STORAGE_BUCKET=transender-282ef.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=569948423610
FIREBASE_APP_ID=1:569948423610:web:85420e023faee766728983
FIREBASE_MEASUREMENT_ID=G-6VHGBMB29Z
```

#### How to Set Environment Variables:

**For Render:**
1. Go to your Render dashboard
2. Select your service
3. Go to "Environment" tab
4. Add each variable above

**For Heroku:**
1. Go to your Heroku dashboard
2. Select your app
3. Go to "Settings" tab
4. Click "Reveal Config Vars"
5. Add each variable above

**For Vercel:**
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add each variable above

**For Netlify:**
1. Go to your Netlify dashboard
2. Select your site
3. Go to "Site settings" → "Environment variables"
4. Add each variable above

### Option 2: Use Fallback Configuration (Already Implemented)

I've already implemented a fallback configuration that will work even without environment variables:

1. **Created** `public/firebase-config.js` with the Firebase configuration
2. **Updated** `public/index.html` to use the fallback config when environment variables are missing
3. **Added** the config file to the HTML

This means your application should now work on `transender.uk` even without environment variables set on the hosting platform.

## Testing the Fix

After implementing either option:

1. **Deploy the updated code** to your hosting platform
2. **Visit** `transender.uk`
3. **Check the browser console** for Firebase initialization messages
4. **Look for**:
   ```
   ✅ Firebase initialized for client-side leaderboard
   📊 Project ID: transender-282ef
   💾 Offline persistence enabled
   🌐 Firebase network connection enabled
   ```

## Security Note

The Firebase configuration values (especially the API key) are safe to expose in client-side code. Firebase security is handled through:
- **Firestore Security Rules** (server-side)
- **Authentication** (if implemented)
- **Domain restrictions** (can be set in Firebase Console)

## Next Steps

1. **Deploy the updated code** with the fallback configuration
2. **Test** the application on `transender.uk`
3. **Optionally** set environment variables on your hosting platform for better security
4. **Monitor** the application for any issues

The fallback configuration should resolve the Firebase initialization issue on your production deployment. 