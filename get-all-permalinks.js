import fetch from 'node-fetch';

const WP_URL = 'https://annual-albus-tr.zipwp.top';
const COOKIE_HEADER = 'zipwp_access=abc123xyz789';
const AUTH_HEADER = 'Basic dGVqZ29tbDFqamxvOmxESWQgUnQwcCB4YnQ2IDZ5VW8gOEdHUCByWGY4';

async function main() {
  const headers = {
    'Cookie': COOKIE_HEADER,
    'Authorization': AUTH_HEADER
  };

  try {
    console.log('Fetching all WordPress pages...');
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100`, { headers });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    const pages = await res.json();
    console.log(`Found ${pages.length} pages:`);
    pages.forEach(p => {
      console.log(`ID: ${p.id} | Title: "${p.title.rendered}" | Slug: "${p.slug}" | Link: "${p.link}"`);
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
