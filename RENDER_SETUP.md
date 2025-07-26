# Render Deployment Setup

## 🚀 Quick Deploy to Render

### Step 1: Connect Repository
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `transender-main` repository

### Step 2: Configure Service
- **Name**: `transender` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Choose your preferred plan (Free tier works fine)

### Step 3: Set Environment Variables
Add these environment variables in your Render service dashboard:

#### Client-Side Firebase Config
```
FIREBASE_API_KEY=AIzaSyDnmhOQpIzUB5uaqNQ45VPZJzSghEXoNlg
FIREBASE_AUTH_DOMAIN=transender-282ef.firebaseapp.com
FIREBASE_PROJECT_ID=transender-282ef
FIREBASE_STORAGE_BUCKET=transender-282ef.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=569948423610
FIREBASE_APP_ID=1:569948423610:web:85420e023faee766728983
FIREBASE_MEASUREMENT_ID=G-6VHGBMB29Z
```

#### Server-Side Firebase Admin SDK
```
FIREBASE_TYPE=service_account
FIREBASE_PRIVATE_KEY_ID=a6f7698d1185588bc401e46e6e68e5b6632f1bf8
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@transender-282ef.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=117691087555522902914
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40transender-282ef.iam.gserviceaccount.com
```

**⚠️ IMPORTANT**: You also need to add the `FIREBASE_KEY` (private key) separately. This is a multi-line private key that should be properly formatted.

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically deploy your application
3. Monitor the build logs for any issues

## 🔒 Security Features

### What's Secured:
- ✅ **No API endpoints exposed** - Server only serves static files
- ✅ **No test files** - All development files removed
- ✅ **Environment variables protected** - Only injected into HTML
- ✅ **CORS restricted** - Same-origin only
- ✅ **Security headers enabled** - XSS protection, etc.

### Architecture:
- **Static File Server** - Serves HTML, CSS, JS, images, audio
- **Client-Side Firebase** - All database operations handled by client
- **No Server-Side Processing** - Minimal attack surface
- **Environment Injection** - Firebase config injected into HTML only

## 🎵 Music Features

### Track Switching:
- **6 available tracks**: oxy.mp3, ard.mp3, bag.mp3, fonker.mp3, anub.mp3, 4m.mp3
- **Click to cycle**: Music icon cycles through tracks
- **Visual indicator**: Shows current track number
- **Auto-advance**: Songs automatically advance when finished

## 📁 File Structure

```
transender-main/
├── public/
│   ├── index.html (main game)
│   ├── *.mp3 (music files)
│   └── *.jpg (images)
├── server.js (secure static server)
├── package.json
└── SECURITY.md
```

## 🔍 Troubleshooting

### Common Issues:

1. **Environment Variables Not Loading**
   - Check Render logs for errors
   - Verify variable names match exactly (case-sensitive)
   - Ensure no extra spaces in values

2. **Firebase Connection Issues**
   - Verify API key is correct
   - Check if Firebase project is active
   - Ensure Firestore rules allow read/write

3. **Music Files Not Loading**
   - Verify MP3 files are in the `public/` directory
   - Check file permissions
   - Ensure file paths are correct

### Debug Commands:
```bash
# Check if server is running
curl https://your-app-name.onrender.com

# Check environment variables in Render logs
# Look for: "✅ Firebase config injected successfully"
```

## 🎯 Production Checklist

- [x] Environment variables set in Render
- [x] Firebase private key added
- [x] No API endpoints exposed
- [x] All test files removed
- [x] Security headers enabled
- [x] CORS properly configured
- [x] Static file serving only

## 🌐 Access Your App

Once deployed, your app will be available at:
```
https://your-app-name.onrender.com
```

## 📞 Support

If you encounter issues:
1. Check Render deployment logs
2. Verify environment variables are set correctly
3. Test locally first with `.env` file
4. Check Firebase console for any authentication issues

---

**Status**: ✅ **READY FOR RENDER DEPLOYMENT** 