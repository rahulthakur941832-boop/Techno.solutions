import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Fetching page settings for Services (ID: 17)...');
    const result = await client.callTool('elementor-mcp-get-page-settings', { post_id: 17 });
    console.log('Page Settings for 17:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
