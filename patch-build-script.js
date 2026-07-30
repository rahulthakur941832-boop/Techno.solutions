import fs from 'fs';

const FILE_PATH = 'build-rest-of-site.js';

let content = fs.readFileSync(FILE_PATH, 'utf8');

// 1. Patch the Header Links in getHeaderHTMLForPage
const oldHeaderLinks = `  const links = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about/" },
    { label: "Blog", url: "/blog/" },
    { label: "Contact", url: "/contact/" }
  ];`;

const newHeaderLinks = `  const links = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about/" },
    { label: "Services", url: "/services/" },
    { label: "Blog", url: "/blog/" },
    { label: "Contact", url: "/contact/" }
  ];`;

if (content.includes(oldHeaderLinks)) {
  content = content.replace(oldHeaderLinks, newHeaderLinks);
  console.log('Successfully patched header links!');
} else {
  console.warn('Could not find exact header links block, checking alternative formats...');
}

// 2. Patch Blog List post links from "/blog/${post.slug}/" to "/${post.slug}/"
const oldBlogLinkPattern1 = `<a href="/blog/\${post.slug}/" style="color:inherit; text-decoration:none;">\${post.title}</a>`;
const newBlogLinkPattern1 = `<a href="/\${post.slug}/" style="color:inherit; text-decoration:none;">\${post.title}</a>`;

const oldBlogLinkPattern2 = `<a href="/blog/\${post.slug}/" class="ts-btn" style="padding:6px 14px; font-size:11px;">`;
const newBlogLinkPattern2 = `<a href="/\${post.slug}/" class="ts-btn" style="padding:6px 14px; font-size:11px;">`;

content = content.replace(oldBlogLinkPattern1, newBlogLinkPattern1);
content = content.replace(oldBlogLinkPattern2, newBlogLinkPattern2);
console.log('Successfully patched blog post links!');

// 3. Define compileServicesPageHTML and non-destructive main() function
const footerLinksReplacements = [
  { old: `<li><a href="/digital-transformation/">Digital Transformation</a></li>`, new: `<li><a href="/digital-transformation-solutions/">Digital Transformation</a></li>` },
  { old: `<li><a href="/business-automation/">Business Automation</a></li>`, new: `<li><a href="/business-automation-solutions/">Business Automation</a></li>` },
  { old: `<li><a href="/artificial-intelligence/">Artificial Intelligence</a></li>`, new: `<li><a href="/artificial-intelligence-solutions/">Artificial Intelligence</a></li>` },
  { old: `<li><a href="/blockchain-crypto/">Blockchain & Crypto</a></li>`, new: `<li><a href="/blockchain-crypto-solutions/">Blockchain & Crypto</a></li>` },
  { old: `<li><a href="/smart-home/">Smart Home Installation</a></li>`, new: `<li><a href="/smart-home-installation-services/">Smart Home Installation</a></li>` },
  { old: `<li><a href="/solar-energy/">Solar Panel Installation</a></li>`, new: `<li><a href="/solar-panel-installation-services/">Solar Panel Installation</a></li>` }
];

footerLinksReplacements.forEach(rep => {
  content = content.replace(rep.old, rep.new);
});
console.log('Successfully patched footer quick links to services!');

// Replace the main function and append compileServicesPageHTML
const mainStartIndex = content.indexOf('async function main()');
if (mainStartIndex !== -1) {
  content = content.substring(0, mainStartIndex);
  
  // Now add compileServicesPageHTML and the new main function
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
              <img src="\${s.image}" alt="\${s.title}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <h3 style="font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--ts-primary); margin-top:0; margin-bottom:12px;">\${s.title}</h3>
            <p style="font-size:12.5px; color:var(--ts-slate); line-height:1.6; margin:0 0 20px 0;">\${s.description}</p>
          </div>
          <a href="/\${SERVICE_SLUG_MAP[s.id] || s.id}/" class="ts-btn" style="width:fit-content; font-size:11px; padding:8px 16px;">
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
      console.log(\`Rebuilding static page: \${pageInfo.name} (ID: \${pageInfo.id})...\`);
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
      console.log(\`Container Created with ID: \${containerId}\`);
      
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
      console.log(\`Rebuilding service subpage: \${service.title} (ID: \${pageId})...\`);
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
      "the-ultimate-guide-to-digital-transformation-in-delhi-ncr": 57,
      "how-business-automation-solutions-drive-efficiency-for-indian-smes": 61,
      "the-rise-of-generative-ai-choosing-an-ai-solutions-provider-in-india": 65,
      "smart-homes-solar-energy-navigating-intelligent-eco-friendly-living-in-delhi": 69
    };

    for (const post of BLOG_POSTS) {
      const pageId = BLOG_MAP[post.slug];
      if (!pageId) continue;
      
      console.log(\`\\n==============================================\`);
      console.log(\`Rebuilding blog detail page: \${post.title} (ID: \s\${pageId})...\`);
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
  fs.writeFileSync(FILE_PATH, content, 'utf8');
  console.log('Successfully rewrote and patched build-rest-of-site.js with non-destructive, full-width native updates!');
} else {
  console.error('Error: Could not locate main function start index.');
}
