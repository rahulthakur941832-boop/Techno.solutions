import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    const result = await client.callTool('elementor-mcp-get-page-structure', { post_id: 8 });
    const structure = result.structuredContent?.structure || result.structure || [];
    console.log('Homepage top-level elements structure:');
    structure.forEach((item, idx) => {
      console.log(`Index ${idx}: ID=${item.id}, Type=${item.elType}, WidgetType=${item.widgetType || 'N/A'}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
