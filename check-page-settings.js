import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Fetching page settings for post_id 8...');
    const result = await client.callTool('elementor-mcp-get-page-settings', { post_id: 8 });
    console.log('Page Settings:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
