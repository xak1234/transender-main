const http = require('http');

console.log('🧪 Testing server Firebase config injection...');

// Test the server response
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`📡 Response status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // Check if Firebase config is in the response
    if (data.includes('window.FIREBASE_API_KEY')) {
      console.log('✅ Firebase config found in response');
      
      // Extract and check the config values
      const apiKeyMatch = data.match(/window\.FIREBASE_API_KEY\s*=\s*"([^"]*)"/);
      const projectIdMatch = data.match(/window\.FIREBASE_PROJECT_ID\s*=\s*"([^"]*)"/);
      const authDomainMatch = data.match(/window\.FIREBASE_AUTH_DOMAIN\s*=\s*"([^"]*)"/);
      
      if (apiKeyMatch && apiKeyMatch[1]) {
        console.log('✅ FIREBASE_API_KEY: SET (' + apiKeyMatch[1].substring(0, 10) + '...)');
      } else {
        console.log('❌ FIREBASE_API_KEY: MISSING');
      }
      
      if (projectIdMatch && projectIdMatch[1]) {
        console.log('✅ FIREBASE_PROJECT_ID: SET (' + projectIdMatch[1] + ')');
      } else {
        console.log('❌ FIREBASE_PROJECT_ID: MISSING');
      }
      
      if (authDomainMatch && authDomainMatch[1]) {
        console.log('✅ FIREBASE_AUTH_DOMAIN: SET (' + authDomainMatch[1] + ')');
      } else {
        console.log('❌ FIREBASE_AUTH_DOMAIN: MISSING');
      }
      
    } else {
      console.log('❌ Firebase config NOT found in response');
      console.log('📄 Response preview:', data.substring(0, 500) + '...');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
});

req.end(); 