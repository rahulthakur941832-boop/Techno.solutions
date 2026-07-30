import https from 'https';
import fs from 'fs';

const url = 'https://annual-albus-tr.zipwp.top/wp-content/uploads/elementor/css/post-17.css?ver=1783521756';

const options = {
  headers: {
    'Cookie': 'zipwp_access=abc123xyz789'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('post-17.css', data, 'utf8');
    console.log(`Downloaded post-17.css (${data.length} bytes)`);
    
    // Search for 0b79c57
    const lines = data.split('}');
    lines.forEach(l => {
      if (l.includes('0b79c57')) {
        console.log(`Matching rule: ${l}}`);
      }
    });
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
