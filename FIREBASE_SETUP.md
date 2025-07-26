# Firebase Setup Guide

## Current Issue
The Firebase Firestore connection is failing with HTTP 400 errors because the client-side Firebase configuration is missing or incomplete.

## Required Environment Variables

Create a `.env` file in your project root with the following variables:

### Client-side Firebase config (for browser):
```
FIREBASE_API_KEY=your-api-key-here
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Server-side Firebase Admin SDK config:
```
FIREBASE_TYPE=service_account
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project-id.iam.gserviceaccount.com
```

## How to Get These Values

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project** (or create a new one)
3. **For Client-side config**:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps" section
   - Click "Add app" → Web app
   - Copy the config values from the provided code snippet

4. **For Server-side config**:
   - Go to Project Settings → Service accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Copy the values from the JSON to your environment variables

## Important Notes

- The `FIREBASE_PROJECT_ID` must match between client and server configs
- The `FIREBASE_KEY` should be the entire private key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts
- Make sure to escape newlines in the private key with `\n`
- Never commit your `.env` file to version control

## Testing the Configuration

After setting up the environment variables:

1. Restart your server
2. Check the console logs for Firebase initialization messages
3. The error `projects//databases/(default)` should be resolved
4. Firestore operations should work properly 