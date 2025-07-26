const http = require('http');

console.log('🧪 Detailed server test...');

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
    // Look for the Firebase config script tag
    const scriptMatch = data.match(/<script>\s*window\.FIREBASE_API_KEY\s*=\s*"([^"]*)";/);
    
    if (scriptMatch) {
      console.log('✅ Found Firebase config script tag');
      console.log('API_KEY value:', scriptMatch[1]);
      
      if (scriptMatch[1] === '') {
        console.log('❌ API_KEY is empty string');
      } else {
        console.log('✅ API_KEY has value');
      }
    } else {
      console.log('❌ Firebase config script tag not found');
    }
    
    // Look for the specific line
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('window.FIREBASE_API_KEY')) {
        console.log(`📄 Line ${i + 1}:`, lines[i].trim());
        break;
      }
    }
    
    // Show first 1000 characters of response
    console.log('📄 Response preview (first 1000 chars):');
    console.log(data.substring(0, 1000));
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
});

req.end(); 