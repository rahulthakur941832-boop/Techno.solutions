import fs from 'fs';

const FILE_PATH = 'build-rest-of-site.js';
let content = fs.readFileSync(FILE_PATH, 'utf8');

// 1. Create the BLOG_SLUG_MAP code and insert it in compileBlogListPageHTML or at the top level
const slugMapCode = `const BLOG_SLUG_MAP = {
  "digital-transformation-delhi": "the-ultimate-guide-to-digital-transformation-in-delhi-ncr",
  "business-automation-solutions-smes": "how-business-automation-solutions-drive-efficiency-for-indian-smes",
  "ai-solutions-provider-india": "the-rise-of-generative-ai-choosing-an-ai-solutions-provider-in-india",
  "smart-homes-solar-energy-delhi": "smart-homes-solar-energy-navigating-intelligent-eco-friendly-living-in-delhi"
};`;

// Let's replace the blog link patterns inside compileBlogListPageHTML
const oldBlogLink1 = `<a href="/\${post.slug}/" style="color:inherit; text-decoration:none;">\${post.title}</a>`;
const newBlogLink1 = `\n  const BLOG_SLUG_MAP = {
    "digital-transformation-delhi": "the-ultimate-guide-to-digital-transformation-in-delhi-ncr",
    "business-automation-solutions-smes": "how-business-automation-solutions-drive-efficiency-for-indian-smes",
    "ai-solutions-provider-india": "the-rise-of-generative-ai-choosing-an-ai-solutions-provider-in-india",
    "smart-homes-solar-energy-delhi": "smart-homes-solar-energy-navigating-intelligent-eco-friendly-living-in-delhi"
  };\n  const fullSlug = BLOG_SLUG_MAP[post.slug] || post.slug;\n  const postsHTML = BLOG_POSTS.map(post => {\n    const pSlug = BLOG_SLUG_MAP[post.slug] || post.slug;\n    return \`<article class="ts-card blog-card" data-cat="\${post.category}" data-keywords="\${post.keywords.join(',')}" style="display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; padding:0;">
      <div>
        <div style="position:relative; aspect-ratio:1.77; width:100%; overflow:hidden; background:#ECECEC;">
          <img src="\${post.image}" alt="\${post.title}" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; top:16px; left:16px; background:rgba(255,255,255,0.95); color:var(--ts-primary); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; padding:6px 12px; border-radius:8px; border:1px solid #ECECEC;">
            \s\${post.category}
          </div>
        </div>
        <div style="padding:24px 24px 16px 24px; text-align:left;">
          <div style="display:flex; gap:16px; font-size:12px; color:var(--ts-slate); margin-bottom:12px;">
            <span>\s\${post.date}</span>
            <span>•</span>
            <span>\s\${post.readTime}</span>
          </div>
          <h2 class="blog-title" style="font-family:'Playfair Display',serif; font-size:20px; font-weight:700; color:var(--ts-primary); margin-top:0; margin-bottom:12px; line-height:1.3;">
            <a href="/\s\${pSlug}/" style="color:inherit; text-decoration:none;">\s\${post.title}</a>
          </h2>
          <p class="blog-summary" style="font-size:13px; color:var(--ts-slate); line-height:1.6; margin:0 0 16px 0;">
            \s\${post.summary}
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            \s\${post.keywords.map(kw => \`
              <span style="font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--ts-slate); background:var(--ts-soft-blue); border:1px solid var(--ts-border); padding:2px 8px; border-radius:6px;">#\${kw.split(' ').join('')}</span>
            \`).join('')}
          </div>
        </div>
      </div>
      <div style="padding:16px 24px 24px 24px; border-top:1px solid var(--ts-soft-blue); display:flex; justify-content:space-between; align-items:center; background:var(--ts-soft-blue);">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:24px; height:24px; border-radius:50%; background:#ECECEC; overflow:hidden;">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80" alt="Sanjeev Goel" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <span style="font-size:12px; font-weight:600; color:var(--ts-dark);">\s\${post.author}</span>
        </div>
        <a href="/\s\${pSlug}/" class="ts-btn" style="padding:6px 14px; font-size:11px;">
          Read Article <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </article>\`;
  }).join('\\n');`;

// Let's find compileBlogListPageHTML in file and replace the postsHTML definition block
const targetOldBlockStart = `function compileBlogListPageHTML() {`;
const targetOldBlockEnd = `  const content = \``;

const startIdx = content.indexOf(targetOldBlockStart);
const endIdx = content.indexOf(targetOldBlockEnd);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + `function compileBlogListPageHTML() {
  const BLOG_SLUG_MAP = {
    "digital-transformation-delhi": "the-ultimate-guide-to-digital-transformation-in-delhi-ncr",
    "business-automation-solutions-smes": "how-business-automation-solutions-drive-efficiency-for-indian-smes",
    "ai-solutions-provider-india": "the-rise-of-generative-ai-choosing-an-ai-solutions-provider-in-india",
    "smart-homes-solar-energy-delhi": "smart-homes-solar-energy-navigating-intelligent-eco-friendly-living-in-delhi"
  };
  
  const postsHTML = BLOG_POSTS.map(post => {
    const pSlug = BLOG_SLUG_MAP[post.slug] || post.slug;
    return \`<article class="ts-card blog-card" data-cat="\${post.category}" data-keywords="\${post.keywords.join(',')}" style="display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; padding:0;">
      <div>
        <div style="position:relative; aspect-ratio:1.77; width:100%; overflow:hidden; background:#ECECEC;">
          <img src="\${post.image}" alt="\${post.title}" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; top:16px; left:16px; background:rgba(255,255,255,0.95); color:var(--ts-primary); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; padding:6px 12px; border-radius:8px; border:1px solid #ECECEC;">
            \${post.category}
          </div>
        </div>
        <div style="padding:24px 24px 16px 24px; text-align:left;">
          <div style="display:flex; gap:16px; font-size:12px; color:var(--ts-slate); margin-bottom:12px;">
            <span>\${post.date}</span>
            <span>•</span>
            <span>\s\${post.readTime}</span>
          </div>
          <h2 class="blog-title" style="font-family:'Playfair Display',serif; font-size:20px; font-weight:700; color:var(--ts-primary); margin-top:0; margin-bottom:12px; line-height:1.3;">
            <a href="/\${pSlug}/" style="color:inherit; text-decoration:none;">\${post.title}</a>
          </h2>
          <p class="blog-summary" style="font-size:13px; color:var(--ts-slate); line-height:1.6; margin:0 0 16px 0;">
            \${post.summary}
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            \${post.keywords.map(kw => \`
              <span style="font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--ts-slate); background:var(--ts-soft-blue); border:1px solid var(--ts-border); padding:2px 8px; border-radius:6px;">#\${kw.split(' ').join('')}</span>
            \`).join('')}
          </div>
        </div>
      </div>
      <div style="padding:16px 24px 24px 24px; border-top:1px solid var(--ts-soft-blue); display:flex; justify-content:space-between; align-items:center; background:var(--ts-soft-blue);">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:24px; height:24px; border-radius:50%; background:#ECECEC; overflow:hidden;">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80" alt="Sanjeev Goel" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <span style="font-size:12px; font-weight:600; color:var(--ts-dark);">\${post.author}</span>
        </div>
        <a href="/\${pSlug}/" class="ts-btn" style="padding:6px 14px; font-size:11px;">
          Read Article <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </article>\`;
  }).join('\\n');\n` + content.substring(endIdx);
  console.log('Successfully patched compileBlogListPageHTML function structure!');
} else {
  console.error('Failed to locate compileBlogListPageHTML target block indexes.');
}

// 2. Patch BLOG_MAP keys in main() to use short slugs
const oldBlogMap = `    const BLOG_MAP = {
      "the-ultimate-guide-to-digital-transformation-in-delhi-ncr": 57,
      "how-business-automation-solutions-drive-efficiency-for-indian-smes": 61,
      "the-rise-of-generative-ai-choosing-an-ai-solutions-provider-in-india": 65,
      "smart-homes-solar-energy-navigating-intelligent-eco-friendly-living-in-delhi": 69
    };`;

const newBlogMap = `    const BLOG_MAP = {
      "digital-transformation-delhi": 57,
      "business-automation-solutions-smes": 61,
      "ai-solutions-provider-india": 65,
      "smart-homes-solar-energy-delhi": 69
    };`;

if (content.includes(oldBlogMap)) {
  content = content.replace(oldBlogMap, newBlogMap);
  console.log('Successfully patched BLOG_MAP in main()!');
} else {
  console.warn('Could not find old BLOG_MAP structure, checking alternative format...');
  // Direct replace on shorter snippet to be absolutely safe
  content = content.replace(/"the-ultimate-guide-to-digital-transformation-in-delhi-ncr": 57/g, '"digital-transformation-delhi": 57');
  content = content.replace(/"how-business-automation-solutions-drive-efficiency-for-indian-smes": 61/g, '"business-automation-solutions-smes": 61');
  content = content.replace(/"the-rise-of-generative-ai-choosing-an-ai-solutions-provider-in-india": 65/g, '"ai-solutions-provider-india": 65');
  content = content.replace(/"smart-homes-solar-energy-navigating-intelligent-eco-friendly-living-in-delhi": 69/g, '"smart-homes-solar-energy-delhi": 69');
  console.log('Applied fallback replacements for BLOG_MAP keys.');
}

fs.writeFileSync(FILE_PATH, content, 'utf8');
console.log('Patching complete!');
