# Firebase Security Guide

## Security Best Practices

### ✅ Recommended: Environment Variables on Render

**Most Secure Approach:**
1. Set environment variables in your Render dashboard
2. Keep configuration separate from code
3. Easy to rotate keys without code changes
4. Follows security best practices

**Steps:**
1. Go to your Render dashboard
2. Select your TransEnder service
3. Go to "Environment" tab
4. Add these variables:
   ```
   FIREBASE_API_KEY=AIzaSyDnmhOQpIzUB5uaqNQ45VPZJzSghEXoNlg
   FIREBASE_AUTH_DOMAIN=transender-282ef.firebaseapp.com
   FIREBASE_PROJECT_ID=transender-282ef
   FIREBASE_STORAGE_BUCKET=transender-282ef.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=569948423610
   FIREBASE_APP_ID=1:569948423610:web:85420e023faee766728983
   FIREBASE_MEASUREMENT_ID=G-6VHGBMB29Z
   ```

### 🔒 Additional Security Measures

#### 1. Firestore Security Rules
Your real security comes from Firestore Security Rules. Make sure you have proper rules set up:

```javascript
// Example secure rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to leaderboard
    match /leaderboard/{document} {
      allow read: if true;  // Anyone can read leaderboard
      allow write: if request.resource.data.score is number 
                   && request.resource.data.score > 0
                   && request.resource.data.name is string
                   && request.resource.data.name.size() > 0
                   && request.resource.data.name.size() <= 50;
    }
  }
}
```

#### 2. Domain Restrictions
In Firebase Console:
1. Go to Project Settings
2. Add your domain (`transender.uk`) to authorized domains
3. This prevents unauthorized domains from using your Firebase project

#### 3. API Key Restrictions (Optional)
In Google Cloud Console:
1. Go to APIs & Services > Credentials
2. Find your Firebase API key
3. Add HTTP referrer restrictions to only allow `transender.uk`

### ⚠️ Current Fallback Configuration

The fallback configuration I created is **functionally safe** but **not ideal** because:
- Configuration is hardcoded in the repository
- Makes it harder to rotate keys
- Less flexible for different environments

### 🎯 Recommended Action Plan

1. **Immediate**: Set environment variables on Render
2. **Short-term**: Remove the fallback configuration once environment variables are working
3. **Long-term**: Implement proper Firestore Security Rules and domain restrictions

## Security Checklist

- [ ] Set environment variables on Render
- [ ] Configure Firestore Security Rules
- [ ] Add domain restrictions in Firebase Console
- [ ] Consider API key restrictions in Google Cloud Console
- [ ] Remove hardcoded configuration from repository
- [ ] Test security rules thoroughly

## Why This Matters

While Firebase config values are safe to expose, following security best practices:
- Makes your application more maintainable
- Follows industry standards
- Makes it easier to manage different environments (dev/staging/prod)
- Provides better control over configuration 