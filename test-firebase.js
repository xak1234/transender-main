require('dotenv').config();

console.log('🧪 Firebase Configuration Test');
console.log('==============================\n');

// Check environment variables
console.log('📋 Environment Variables Check:');
console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_STORAGE_BUCKET:', process.env.FIREBASE_STORAGE_BUCKET ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_MESSAGING_SENDER_ID:', process.env.FIREBASE_MESSAGING_SENDER_ID ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_APP_ID:', process.env.FIREBASE_APP_ID ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_MEASUREMENT_ID:', process.env.FIREBASE_MEASUREMENT_ID ? '✅ SET' : '❌ MISSING');
console.log('');

// Check server-side variables
console.log('🔧 Server-side Variables Check:');
console.log('FIREBASE_TYPE:', process.env.FIREBASE_TYPE ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_PRIVATE_KEY_ID:', process.env.FIREBASE_PRIVATE_KEY_ID ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_KEY:', process.env.FIREBASE_KEY ? '✅ SET' : '❌ MISSING');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '✅ SET' : '❌ MISSING');
console.log('');

// Test Firebase initialization
console.log('🔥 Testing Firebase Initialization...');
try {
    const { admin, db } = require('./firebase-config');
    
    if (db) {
        console.log('✅ Firebase Admin SDK initialized successfully');
        
        // Test Firestore connection
        console.log('📊 Testing Firestore connection...');
        db.collection('test').doc('connection-test').get()
            .then(() => {
                console.log('✅ Firestore connection successful');
                console.log('🎉 Firebase configuration is working correctly!');
            })
            .catch((error) => {
                console.error('❌ Firestore connection failed:', error.message);
                console.log('🔧 This might be due to:');
                console.log('   - Incorrect project ID');
                console.log('   - Firestore not enabled in Firebase Console');
                console.log('   - Incorrect service account permissions');
            });
    } else {
        console.log('❌ Firebase Admin SDK failed to initialize');
        console.log('📖 Please check FIREBASE_SETUP.md for configuration instructions');
    }
} catch (error) {
    console.error('❌ Error testing Firebase:', error.message);
}

console.log('\n📖 For detailed setup instructions, see FIREBASE_SETUP.md'); 