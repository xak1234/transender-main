require('dotenv').config();
const express = require('express');
const path = require('path');
const firebaseService = require('./firebase-service');

const app = express();
const PORT = process.env.PORT || 3001;

// Helper function to safely escape environment variables for JavaScript injection
function escapeForJS(value) {
  if (!value) return '';
  return value.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware to parse JSON
app.use(express.json());

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

// Serve Firebase test page
app.get('/firebase-test', (req, res) => {
  const fs = require('fs');
  const testPath = path.join(__dirname, 'public', 'firebase-test.html');
  
  fs.readFile(testPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading firebase-test.html:', err);
      return res.status(500).send('Error loading test page');
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

// Serve static files from the public directory (after specific routes)
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for direct file access (must be last)
app.get('*', (req, res) => {
  console.log('🌐 Direct file access detected:', req.path);
  
  // Redirect to root for any unmatched routes
  res.redirect('/');
});

// API Routes
app.get('/api/leaderboard', async (req, res) => {
  try {
    const scores = await firebaseService.getLeaderboard();
    res.json(scores);
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  try {
    const { name, score } = req.body;
    if (!name || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid data' });
    }
    
    await firebaseService.addScore(name, score);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

app.delete('/api/leaderboard', async (req, res) => {
  try {
    await firebaseService.clearLeaderboard();
    res.json({ success: true });
  } catch (error) {
    console.error('Error clearing leaderboard:', error);
    res.status(500).json({ error: 'Failed to clear leaderboard' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TransEnder web service running on port ${PORT}`);
  console.log(`📱 Visit: http://localhost:${PORT}`);
  console.log('🔥 Firebase integration ready');
}); 