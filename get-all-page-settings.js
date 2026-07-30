import { MCPClient } from './mcp-client.js';

const PAGE_IDS = {
  Home: 8,
  Services: 17,
  About: 21,
  Blog: 25,
  Contact: 29
};

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    for (const [name, post_id] of Object.entries(PAGE_IDS)) {
      console.log(`\n===================================`);
      console.log(`Fetching settings for ${name} (ID: ${post_id})...`);
      try {
        const result = await client.callTool('elementor-mcp-get-page-settings', { post_id });
        console.log(`Result for ${name}:`, JSON.stringify(result, null, 2));
      } catch (err) {
        console.error(`Error for ${name}:`, err.message);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
