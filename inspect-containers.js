import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    const result = await client.callTool('elementor-mcp-get-page-structure', { post_id: 8 });
    const structure = result.structuredContent?.structure || result.structure || [];
    
    const ids = ['a7dd322', '927e017', '71d8821', '3a07362', 'a76c00e'];
    ids.forEach(id => {
      const el = structure.find(item => item.id === id);
      if (el) {
        console.log(`\n================= Container ${id} =================`);
        console.log(JSON.stringify(el, null, 2));
      } else {
        console.log(`\nContainer ${id} not found.`);
      }
    });
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
