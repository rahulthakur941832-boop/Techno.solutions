import fetch from 'node-fetch';

const WP_URL = 'https://annual-albus-tr.zipwp.top/services/';
const COOKIE_HEADER = 'zipwp_access=abc123xyz789';
const AUTH_HEADER = 'Basic dGVqZ29tbDFqamxvOmxESWQgUnQwcCB4YnQ2IDZ5VW8gOEdHUCByWGY4';

async function main() {
  const headers = {
    'Cookie': COOKIE_HEADER,
    'Authorization': AUTH_HEADER
  };

  try {
    console.log(`Fetching authenticated Services page at ${WP_URL}...`);
    const res = await fetch(WP_URL, { headers });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }
    const html = await res.text();
    console.log(`Successfully fetched authenticated Services page. Length: ${html.length} bytes.`);
    
    // Extract page title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'No title found';
    console.log(`Page Title: "${title}"`);
    
    // Extract first few h1 or h2 tags to see content
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].trim());
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].trim());
    console.log('H1 tags:', h1s);
    console.log('H2 tags:', h2s);
    
  } catch (err) {
    console.error('Error fetching Services page:', err.message);
  }
}

main();
