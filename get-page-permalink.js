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
    for (const id of [8, 17, 21, 25, 29]) {
      console.log(`Fetching Page ID ${id} details from WP REST API...`);
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}`, { headers });
      if (!res.ok) {
        console.error(`HTTP Error for page ${id}: ${res.status}`);
        continue;
      }
      const page = await res.json();
      console.log(`Page ID: ${id}`);
      console.log(`  Title: "${page.title.rendered}"`);
      console.log(`  Slug:  "${page.slug}"`);
      console.log(`  Link:  "${page.link}"`);
    }
  } catch (err) {
    console.error('Error fetching pages:', err.message);
  }
}

main();
