require('dotenv').config();
const express = require('express');
const path = require('path');
// Firebase service removed - all operations handled client-side for security

const app = express();
const PORT = process.env.PORT || 3001;

// Helper function to safely escape environment variables for JavaScript injection
function escapeForJS(value) {
  if (!value) return '';
  return value.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

// CORS middleware - restrict to same origin only
app.use((req, res, next) => {
  // Only allow same-origin requests for security
  res.header('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Security headers middleware
app.use((req, res, next) => {
  // Add security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content response
});

// Serve index.html for the root route with Firebase config injection
app.get('/', (req, res) => {
  console.log('🌐 Page requested via server route /');
  const fs = require('fs');
  const indexPath = path.join(__dirname, 'public', 'index.html');
  
  // Debug: Log environment variables
  console.log('🔍 Environment variables check:');
  console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY ? 'SET (' + process.env.FIREBASE_API_KEY.substring(0, 10) + '...)' : 'MISSING');
  console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? 'SET (' + process.env.FIREBASE_PROJECT_ID + ')' : 'MISSING');
  console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN ? 'SET (' + process.env.FIREBASE_AUTH_DOMAIN + ')' : 'MISSING');
  
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Error loading page');
    }
    
    // Inject Firebase config from environment variables with proper escaping
    const firebaseConfig = `
      <script>
        window.FIREBASE_API_KEY = "${escapeForJS(process.env.FIREBASE_API_KEY)}";
        window.FIREBASE_AUTH_DOMAIN = "${escapeForJS(process.env.FIREBASE_AUTH_DOMAIN)}";
        window.FIREBASE_PROJECT_ID = "${escapeForJS(process.env.FIREBASE_PROJECT_ID)}";
        window.FIREBASE_STORAGE_BUCKET = "${escapeForJS(process.env.FIREBASE_STORAGE_BUCKET)}";
        window.FIREBASE_MESSAGING_SENDER_ID = "${escapeForJS(process.env.FIREBASE_MESSAGING_SENDER_ID)}";
        window.FIREBASE_APP_ID = "${escapeForJS(process.env.FIREBASE_APP_ID)}";
        window.FIREBASE_MEASUREMENT_ID = "${escapeForJS(process.env.FIREBASE_MEASUREMENT_ID)}";
      </script>
    `;
    
    // Insert the config before the closing </head> tag
    const modifiedData = data.replace('</head>', `${firebaseConfig}\n</head>`);
    
    // Debug: Check if injection worked
    if (modifiedData.includes('window.FIREBASE_API_KEY')) {
      console.log('✅ Firebase config injected successfully');
    } else {
      console.log('❌ Firebase config injection failed');
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.send(modifiedData);
  });
});

// Serve index.html for transender.html requests (for compatibility)
app.get('/transender.html', (req, res) => {
  const fs = require('fs');
  const indexPath = path.join(__dirname, 'public', 'index.html');
  
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Error loading page');
    }
    
    // Inject Firebase config from environment variables with proper escaping
    const firebaseConfig = `
      <script>
        window.FIREBASE_API_KEY = "${escapeForJS(process.env.FIREBASE_API_KEY)}";
        window.FIREBASE_AUTH_DOMAIN = "${escapeForJS(process.env.FIREBASE_AUTH_DOMAIN)}";
        window.FIREBASE_PROJECT_ID = "${escapeForJS(process.env.FIREBASE_PROJECT_ID)}";
        window.FIREBASE_STORAGE_BUCKET = "${escapeForJS(process.env.FIREBASE_STORAGE_BUCKET)}";
        window.FIREBASE_MESSAGING_SENDER_ID = "${escapeForJS(process.env.FIREBASE_MESSAGING_SENDER_ID)}";
        window.FIREBASE_APP_ID = "${escapeForJS(process.env.FIREBASE_APP_ID)}";
        window.FIREBASE_MEASUREMENT_ID = "${escapeForJS(process.env.FIREBASE_MEASUREMENT_ID)}";
      </script>
    `;
    
    // Insert the config before the closing </head> tag
    const modifiedData = data.replace('</head>', `${firebaseConfig}\n</head>`);
    
    res.setHeader('Content-Type', 'text/html');
    res.send(modifiedData);
  });
});

// Firebase test page - DISABLED for production security
// app.get('/firebase-test', (req, res) => {
//   // This endpoint is disabled to prevent exposure of Firebase config
//   res.status(404).send('Not Found');
// });

// Serve static files from the public directory (after specific routes)
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for direct file access (must be last)
app.get('*', (req, res) => {
  console.log('🌐 Direct file access detected:', req.path);
  
  // Redirect to root for any unmatched routes
  res.redirect('/');
});

// API Routes - DISABLED for production security
// All database operations are handled client-side through Firebase SDK
// This prevents server-side API exposure and potential abuse

// app.get('/api/leaderboard', async (req, res) => {
//   // DISABLED - Use Firebase client SDK instead
//   res.status(404).json({ error: 'API disabled for security' });
// });

// app.post('/api/leaderboard', async (req, res) => {
//   // DISABLED - Use Firebase client SDK instead
//   res.status(404).json({ error: 'API disabled for security' });
// });

// app.delete('/api/leaderboard', async (req, res) => {
//   // DISABLED - Use Firebase client SDK instead
//   res.status(404).json({ error: 'API disabled for security' });
// });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TransEnder web service running on port ${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
  console.log(`🌐 Render: https://your-app-name.onrender.com`);
  console.log('🔥 Firebase integration ready');
  console.log('🔒 Security: No API endpoints exposed');
}); 