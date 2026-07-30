import fs from 'fs';

try {
  const content = fs.readFileSync('techno_solutions_elementor_homepage.json', 'utf8');
  const data = JSON.parse(content);
  
  const results = [];
  function check(obj, path) {
    if (!obj) return;
    if (typeof obj === 'object') {
      for (const [key, val] of Object.entries(obj)) {
        const currentPath = `${path}.${key}`;
        if (key === 'icon' || key === 'selected_icon' || key === 'icon_list') {
          results.push({ path: currentPath, key, val });
        } else if (typeof val === 'string' && (val.includes('fa-') || val.includes('lucide') || val.includes('svg'))) {
          results.push({ path: currentPath, key, val });
        } else {
          check(val, currentPath);
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => check(item, `${path}[${index}]`));
    }
  }
  
  check(data, 'root');
  console.log('Found icons/references:');
  console.log(JSON.stringify(results, null, 2));
} catch (err) {
  console.error('Error:', err);
}
