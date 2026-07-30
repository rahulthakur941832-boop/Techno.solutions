import fs from 'fs';

const FILE_PATH = 'build-rest-of-site.js';
let content = fs.readFileSync(FILE_PATH, 'utf8');
let lines = content.split('\n');

console.log(`Original line count: ${lines.length}`);

// We want to delete lines from 1647 to 2127 (1-indexed)
// In 0-indexed array, this is index 1646 to 1646 + 480 = 2126.
// Let's verify the lines first.
console.log(`Line 1647 (0-idx 1646): "${lines[1646]}"`);
console.log(`Line 2127 (0-idx 2126): "${lines[2126]}"`);
console.log(`Line 2128 (0-idx 2127): "${lines[2127]}"`);

if (lines[1646].includes('function compileServicePageHTML') && lines[2127].includes('function selectCat')) {
  console.log('Splicing out duplicated block...');
  lines.splice(1646, 2127 - 1647 + 1);
  console.log(`New line count after splice: ${lines.length}`);
  content = lines.join('\n');
} else {
  console.error('Error: Line signatures do not match! Cannot safely splice duplicates.');
  process.exit(1);
}

// Re-evaluate lines after splice
lines = content.split('\n');

// Find where main starts
let mainLineIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('async function main()')) {
    mainLineIdx = i;
    break;
  }
}

if (mainLineIdx !== -1) {
  console.log(`Found main() function starting at line ${mainLineIdx + 1}`);
  // Keep everything before main()
  lines = lines.slice(0, mainLineIdx);
  content = lines.join('\n');
} else {
  console.error('Error: Could not locate main() function.');
  process.exit(1);
}

// Add the clean helper and main() function at the end
const helperAndMain = `
function compileServicesPageHTML() {
  const SERVICE_SLUG_MAP = {
    "digital-transformation": "digital-transformation-solutions",
    "business-automation": "business-automation-solutions",
    "artificial-intelligence": "artificial-intelligence-solutions",
    "blockchain-crypto": "blockchain-crypto-solutions",
    "smart-home": "smart-home-installation-services",
    "solar-energy": "solar-panel-installation-services"
  };

  const content = \`
<section class="ts-banner-section">
  <div class="ts-container">
    <div style="max-width: 640px;">
      <div class="ts-badge">EXPLORE OFFERS</div>
      <h1 class="ts-h1">Our Elite Core Services</h1>
      <p class="ts-p-hero">We engineer enterprise-quality, ISO-level structures and processes designed strictly within your budget parameters.</p>
    </div>
  </div>
</section>
<section class="ts-section-py">
  <div class="ts-container">
    <div class="ts-grid-12">
      \${SERVICES.map(s => \`
        <div class="ts-col-4 ts-card" style="display:flex; flex-direction:column; justify-content:space-between; text-align:left;">
          <div>
            <div style="width:100%; height:180px; border-radius:16px; overflow:hidden; background:#ECECEC; margin-bottom:20px;">
              <img src="\s\${s.image}" alt="\s\${s.title}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <h3 style="font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--ts-primary); margin-top:0; margin-bottom:12px;">\s\${s.title}</h3>
            <p style="font-size:12.5px; color:var(--ts-slate); line-height:1.6; margin:0 0 20px 0;">\s\${s.description}</p>
          </div>
          <a href="/\s\${SERVICE_SLUG_MAP[s.id] || s.id}/" class="ts-btn" style="width:fit-content; font-size:11px; padding:8px 16px;">
            Explore Solution <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      \`).join('\\n')}
    </div>
  </div>
</section>
  \`;
  return getHeaderHTMLForPage("services") + content + getFooterHTML();
}

function getElementId(res) {
  if (!res) return null;
  if (res.id) return res.id;
  if (res.structuredContent && res.structuredContent.element_id) return res.structuredContent.element_id;
  if (res.structuredContent && res.structuredContent.id) return res.structuredContent.id;
  if (res.content && res.content[0] && res.content[0].text) {
    try {
      const parsed = JSON.parse(res.content[0].text);
      return parsed.element_id || parsed.id;
    } catch (e) {}
  }
  return null;
}

async function main() {
  const client = new MCPClient();
  try {
    console.log('Connecting to Elementor MCP...');
    await client.connect();

    // Map of existing page titles to their page IDs
    const PAGES = {
      services: { id: 17, name: "Services", compiler: () => compileServicesPageHTML() },
      about: { id: 21, name: "About Us", compiler: () => compileAboutPageHTML() },
      blog: { id: 25, name: "Blog", compiler: () => compileBlogListPageHTML() },
      contact: { id: 29, name: "Contact Us", compiler: () => compileContactPageHTML() }
    };

    // 1. Rebuild Directory & Static Pages
    for (const key of Object.keys(PAGES)) {
      const pageInfo = PAGES[key];
      console.log(\`\\n==============================================\`);
      console.log(\`Rebuilding static page: \s\${pageInfo.name} (ID: \s\${pageInfo.id})...\`);
      console.log(\`==============================================\`);
      
      // Clear old content
      console.log('Clearing old page content...');
      await client.callTool('elementor-mcp-delete-page-content', { post_id: pageInfo.id });
      
      // Create full-width container
      console.log('Creating full-width container...');
      const containerRes = await client.callTool('elementor-mcp-add-container', {
        post_id: pageInfo.id,
        settings: { content_width: 'full' }
      });
      const containerId = getElementId(containerRes);
      console.log(\`Container Created with ID: \s\${containerId}\`);
      
      if (containerId) {
        // Force full width & zero margins/paddings on the parent container
        console.log('Configuring container settings (100% full screen expansion, zero spacing)...');
        await client.callTool('elementor-mcp-update-element', {
          post_id: pageInfo.id,
          element_id: containerId,
          settings: {
            content_width: 'full',
            boxed_width: { size: 100, unit: '%' },
            gap: { size: 0, unit: 'px' },
            padding: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true },
            margin: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true }
          }
        });
        
        // Compile the HTML
        const compiledHTML = pageInfo.compiler();
        
        // Add HTML widget inside the container
        console.log('Injecting compiled page content HTML widget...');
        await client.callTool('elementor-mcp-add-html', {
          post_id: pageInfo.id,
          parent_id: containerId,
          html: compiledHTML
        });
      }
      
      // Update template setting to Elementor Canvas
      console.log('Updating page settings to Elementor Canvas...');
      await client.callTool('elementor-mcp-update-page-settings', {
        post_id: pageInfo.id,
        settings: {
          template: 'elementor_canvas',
          page_template: 'elementor_canvas'
        }
      });
      console.log(\`Done rebuilding page: \s\${pageInfo.name}\`);
    }

    // 2. Rebuild Service subpages
    const SERVICES_MAP = {
      "digital-transformation": 33,
      "business-automation": 37,
      "artificial-intelligence": 41,
      "blockchain-crypto": 45,
      "smart-home": 49,
      "solar-energy": 53
    };

    for (const service of SERVICES) {
      const pageId = SERVICES_MAP[service.id];
      if (!pageId) continue;
      
      console.log(\`\\n==============================================\`);
      console.log(\`Rebuilding service subpage: \s\${service.title} (ID: \s\${pageId})...\`);
      console.log(\`==============================================\`);
      
      // Clear old content
      console.log('Clearing old page content...');
      await client.callTool('elementor-mcp-delete-page-content', { post_id: pageId });
      
      // Create full-width container
      console.log('Creating full-width container...');
      const containerRes = await client.callTool('elementor-mcp-add-container', {
        post_id: pageId,
        settings: { content_width: 'full' }
      });
      const containerId = getElementId(containerRes);
      console.log(\`Container Created with ID: \s\${containerId}\`);
      
      if (containerId) {
        // Force full width
        console.log('Configuring container settings (100% full screen expansion, zero spacing)...');
        await client.callTool('elementor-mcp-update-element', {
          post_id: pageId,
          element_id: containerId,
          settings: {
            content_width: 'full',
            boxed_width: { size: 100, unit: '%' },
            gap: { size: 0, unit: 'px' },
            padding: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true },
            margin: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true }
          }
        });
        
        // Add HTML
        console.log('Injecting compiled service content HTML widget...');
        await client.callTool('elementor-mcp-add-html', {
          post_id: pageId,
          parent_id: containerId,
          html: compileServicePageHTML(service)
        });
      }
      
      // Update template setting to Elementor Canvas
      console.log('Updating page settings to Elementor Canvas...');
      await client.callTool('elementor-mcp-update-page-settings', {
        post_id: pageId,
        settings: {
          template: 'elementor_canvas',
          page_template: 'elementor_canvas'
        }
      });
      console.log(\`Done rebuilding service: \s\${service.title}\`);
    }

    // 3. Rebuild Blog detail subpages
    const BLOG_MAP = {
      "digital-transformation-delhi": 57,
      "business-automation-solutions-smes": 61,
      "ai-solutions-provider-india": 65,
      "smart-homes-solar-energy-delhi": 69
    };

    for (const post of BLOG_POSTS) {
      const pageId = BLOG_MAP[post.slug];
      if (!pageId) continue;
      
      console.log(\`\\n==============================================\`);
      console.log(\`Rebuilding blog detail page: \s\${post.title} (ID: \s\${pageId})...\`);
      console.log(\`==============================================\`);
      
      // Clear old content
      console.log('Clearing old page content...');
      await client.callTool('elementor-mcp-delete-page-content', { post_id: pageId });
      
      // Create full-width container
      console.log('Creating full-width container...');
      const containerRes = await client.callTool('elementor-mcp-add-container', {
        post_id: pageId,
        settings: { content_width: 'full' }
      });
      const containerId = getElementId(containerRes);
      console.log(\`Container Created with ID: \s\${containerId}\`);
      
      if (containerId) {
        // Force full width
        console.log('Configuring container settings (100% full screen expansion, zero spacing)...');
        await client.callTool('elementor-mcp-update-element', {
          post_id: pageId,
          element_id: containerId,
          settings: {
            content_width: 'full',
            boxed_width: { size: 100, unit: '%' },
            gap: { size: 0, unit: 'px' },
            padding: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true },
            margin: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true }
          }
        });
        
        // Add HTML
        console.log('Injecting compiled blog content HTML widget...');
        await client.callTool('elementor-mcp-add-html', {
          post_id: pageId,
          parent_id: containerId,
          html: compileBlogDetailPageHTML(post)
        });
      }
      
      // Update template setting to Elementor Canvas
      console.log('Updating page settings to Elementor Canvas...');
      await client.callTool('elementor-mcp-update-page-settings', {
        post_id: pageId,
        settings: {
          template: 'elementor_canvas',
          page_template: 'elementor_canvas'
        }
      });
      console.log(\`Done rebuilding blog: \s\${post.title}\`);
    }

    console.log('\\n==============================================');
    console.log('ALL SUBPAGES AND DETAIL PAGES COMPLETED!');
    console.log('==============================================');
  } catch (err) {
    console.error('Fatal Error rebuilding subpages:', err.stack || err.message);
  } finally {
    client.close();
  }
}

main();
`;

content += helperAndMain;

// Strip any double backslashes in template literals we created
content = content.replace(/\\s\\\$/g, '$');
content = content.replace(/\\n/g, '\n');

fs.writeFileSync(FILE_PATH, content, 'utf8');
console.log('build-rest-of-site.js surgically repaired, clean compiled, and ready!');
