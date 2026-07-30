import { MCPClient } from './mcp-client.js';

const PAGE_IDS = {
  Services: 17,
  About: 21,
};

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    for (const [name, post_id] of Object.entries(PAGE_IDS)) {
      console.log(`\n===================================`);
      console.log(`Fetching HTML content for ${name} (ID: ${post_id})...`);
      const structureRes = await client.callTool('elementor-mcp-get-page-structure', { post_id });
      const structure = structureRes.structuredContent?.structure || structureRes.structure || [];
      
      let htmlWidget = null;
      for (const item of structure) {
        if (item.elType === 'container') {
          for (const child of item.elements || []) {
            if (child.widgetType === 'html') {
              htmlWidget = child;
              break;
            }
          }
        }
      }
      
      if (htmlWidget) {
        const settingsRes = await client.callTool('elementor-mcp-get-element-settings', {
          post_id,
          element_id: htmlWidget.id
        });
        const html = settingsRes.settings?.html || settingsRes.structuredContent?.settings?.html || '';
        console.log(`HTML length: ${html.length}`);
        console.log(`Sample HTML:\n`, html.substring(0, 1000));
      } else {
        console.log('No HTML widget found!');
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
