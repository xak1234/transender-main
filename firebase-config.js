// Firebase configuration
// Replace with your actual Firebase project details

require('dotenv').config();
const admin = require('firebase-admin');

// Option 1: Using service account key file
// const serviceAccount = require('./path-to-your-service-account-key.json');

// Option 2: Using environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE || "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "your-private-key-id",
  private_key: process.env.FIREBASE_KEY ? 
    process.env.FIREBASE_KEY
      .replace(/\\n/g, '\n')
      .replace(/"/g, '')
      .trim() : "your-private-key",
  client_email: process.env.FIREBASE_CLIENT_EMAIL || "your-client-email",
  client_id: process.env.FIREBASE_CLIENT_ID || "your-client-id",
  auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
  token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || "your-cert-url"
};

// Validate required environment variables
const requiredEnvVars = ['FIREBASE_TYPE', 'FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY_ID', 'FIREBASE_KEY', 'FIREBASE_CLIENT_EMAIL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Firebase initialization failed: Missing required environment variables:', missingVars.join(', '));
  console.log('📋 Please create a .env file with the following variables:');
  console.log('   FIREBASE_TYPE, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY_ID, FIREBASE_KEY, FIREBASE_CLIENT_EMAIL');
  console.log('📖 See FIREBASE_SETUP.md for detailed instructions');
  db = null;
} else {
  // Debug: Check private key format (without exposing the full key)
  const privateKey = process.env.FIREBASE_KEY;
  if (privateKey) {
    console.log('🔍 Private key length:', privateKey.length);
    console.log('🔍 Private key starts with:', privateKey.substring(0, 20) + '...');
    console.log('🔍 Private key contains newlines:', privateKey.includes('\\n'));
  }
  
  // Initialize Firebase Admin
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    
    db = admin.firestore();
    console.log('✅ Firebase initialized successfully');
    console.log('📊 Project ID:', process.env.FIREBASE_PROJECT_ID);
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
    console.log('🔧 Please check your Firebase configuration and environment variables');
    console.log('📖 See FIREBASE_SETUP.md for troubleshooting');
    // Set db to null so we can handle the error gracefully
    db = null;
  }
}

module.exports = { admin, db }; 