import { MCPClient } from './mcp-client.js';

const PAGE_IDS = {
  Home: 8,
  Services: 17,
  About: 21,
  Blog: 25,
  Contact: 29,
  DigitalTransformation: 33,
  BusinessAutomation: 37,
  ArtificialIntelligence: 41,
  BlockchainCrypto: 45,
  SmartHome: 49,
  SolarEnergy: 53,
  BlogDelhi: 57,
  BlogSMEs: 61,
  BlogAI: 65,
  BlogSmartHomes: 69
};

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    for (const [name, post_id] of Object.entries(PAGE_IDS)) {
      console.log(`\n===================================`);
      console.log(`Structure of ${name} (ID: ${post_id}):`);
      try {
        const result = await client.callTool('elementor-mcp-get-page-structure', { post_id });
        const structure = result.structuredContent?.structure || result.structure || [];
        if (structure.length === 0) {
          console.log('  [EMPTY PAGE]');
        }
        structure.forEach((item, idx) => {
          console.log(`  Element ${idx}: ID=${item.id}, Type=${item.elType}, WidgetType=${item.widgetType || 'N/A'}`);
          if (item.elements && item.elements.length > 0) {
            item.elements.forEach((child, cidx) => {
              console.log(`    Child ${cidx}: ID=${child.id}, Type=${child.elType}, WidgetType=${child.widgetType || 'N/A'}`);
              if (child.elements && child.elements.length > 0) {
                child.elements.forEach((sub, sidx) => {
                  console.log(`      Subchild ${sidx}: ID=${sub.id}, Type=${sub.elType}, WidgetType=${sub.widgetType || 'N/A'}`);
                });
              }
            });
          }
        });
      } catch (err) {
        console.error(`  Error:`, err.message);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
