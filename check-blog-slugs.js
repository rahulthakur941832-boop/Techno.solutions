import fs from 'fs';

const content = fs.readFileSync('build-rest-of-site.js', 'utf8');

// Match the BLOG_POSTS declaration
const blogPostsMatch = content.match(/const BLOG_POSTS = \s*\[([\s\S]*?)\];/);
if (blogPostsMatch) {
  // Let's parse or inspect using simple evaluation
  const BLOG_POSTS = eval('(' + '[\n' + blogPostsMatch[1] + '\n]' + ')');
  console.log('Blog posts in file:');
  BLOG_POSTS.forEach((p, idx) => {
    console.log(`Index ${idx}: title="${p.title}" | slug="${p.slug}"`);
  });
} else {
  console.error('Could not find BLOG_POSTS array in file!');
}
