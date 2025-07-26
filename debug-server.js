require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🔍 Debug Server Starting...');
console.log('Environment variables check:');
console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY ? 'SET (' + process.env.FIREBASE_API_KEY.substring(0, 10) + '...)' : 'MISSING');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? 'SET (' + process.env.FIREBASE_PROJECT_ID + ')' : 'MISSING');
console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN ? 'SET (' + process.env.FIREBASE_AUTH_DOMAIN + ')' : 'MISSING');

app.get('/', (req, res) => {
  console.log('🌐 Page requested');
  
  // Create a simple test page with Firebase config
  const firebaseConfig = `
    <script>
      window.FIREBASE_API_KEY = "${process.env.FIREBASE_API_KEY || ''}";
      window.FIREBASE_AUTH_DOMAIN = "${process.env.FIREBASE_AUTH_DOMAIN || ''}";
      window.FIREBASE_PROJECT_ID = "${process.env.FIREBASE_PROJECT_ID || ''}";
    </script>
  `;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Debug Test</title>
      ${firebaseConfig}
    </head>
    <body>
      <h1>Firebase Config Test</h1>
      <p>Check the console for Firebase config values.</p>
      <script>
        console.log('Firebase config test:');
        console.log('API_KEY:', window.FIREBASE_API_KEY);
        console.log('PROJECT_ID:', window.FIREBASE_PROJECT_ID);
        console.log('AUTH_DOMAIN:', window.FIREBASE_AUTH_DOMAIN);
      </script>
    </body>
    </html>
  `;
  
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🚀 Debug server running on port ${PORT}`);
}); 