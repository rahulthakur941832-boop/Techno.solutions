import http from 'http';
import https from 'https';
import fs from 'fs';

function fetchPage(url, dest) {
  const client = url.startsWith('https') ? https : http;
  const options = {
    headers: {
      'Cookie': 'zipwp_access=abc123xyz789'
    }
  };
  client.get(url, options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      fs.writeFileSync(dest, data, 'utf8');
      console.log(`Downloaded ${url} to ${dest} (${data.length} bytes)`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading page: ${err.message}`);
  });
}

fetchPage('https://annual-albus-tr.zipwp.top/services/', 'rendered-services.html');
fetchPage('https://annual-albus-tr.zipwp.top/', 'rendered-home.html');
