import fetch from 'node-fetch';

const WP_URL = 'https://annual-albus-tr.zipwp.top';
const AUTH_HEADER = 'Basic dGVqZ29tbDFqamxvOmxESWQgUnQwcCB4YnQ2IDZ5VW8gOEdHUCByWGY4';
const COOKIE_HEADER = 'zipwp_access=abc123xyz789';

async function main() {
  const headers = {
    'Authorization': AUTH_HEADER,
    'Cookie': COOKIE_HEADER,
    'Content-Type': 'application/json'
  };

  try {
    console.log('Fetching WordPress Settings...');
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/settings`, { headers });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }
    const settings = await res.json();
    console.log('WordPress Settings:', JSON.stringify(settings, null, 2));
  } catch (err) {
    console.error('Error fetching settings:', err.message);
  }
}

main();
