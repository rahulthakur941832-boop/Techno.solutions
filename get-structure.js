import { MCPClient } from './mcp-client.js';
import fs from 'fs';

async function main() {
  const postId = parseInt(process.argv[2]) || 8;
  const filename = `structure-${postId}.json`;
  console.log(`Fetching structure for post ID ${postId}...`);
  
  const client = new MCPClient();
  try {
    const result = await client.callTool('elementor-mcp-get-page-structure', { post_id: postId });
    fs.writeFileSync(filename, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Successfully saved page structure to ${filename}`);
  } catch (err) {
    console.error('Error fetching structure:', err);
  } finally {
    client.close();
  }
}

main();
