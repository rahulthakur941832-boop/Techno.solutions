import fs from 'fs';

const FILE_PATH = 'build-rest-of-site.js';
let content = fs.readFileSync(FILE_PATH, 'utf8');

// Replace double quotes with backticks for each of the four blog post contents
const targets = [
  {
    start: 'content: "In today’s rapidly evolving digital landscape,',
    end: 'into your daily CRM and core decision pipelines."'
  },
  {
    start: 'content: "Techno-Solutions is a leading provider of Business Automation Solutions.',
    end: 'ensuring complete, end-to-end operational visibility."'
  },
  {
    start: 'content: "AI has transitioned from a buzzword into a critical business driver.',
    end: 'into structured digital database entries in seconds."'
  },
  {
    start: 'content: "Rethink your living and working environments.',
    end: 'voice controls, scheduling systems, and smart meshes."'
  }
];

let replacedCount = 0;
for (const target of targets) {
  const startIdx = content.indexOf(target.start);
  if (startIdx !== -1) {
    const endIdx = content.indexOf(target.end, startIdx);
    if (endIdx !== -1) {
      const segment = content.substring(startIdx, endIdx + target.end.length);
      // We convert the leading double quote to a backtick
      // and the trailing double quote to a backtick
      let newSegment = segment.replace('content: "', 'content: `');
      if (newSegment.endsWith('"')) {
        newSegment = newSegment.slice(0, -1) + '`';
      }
      content = content.replace(segment, newSegment);
      console.log(`Successfully replaced target segment starting with: "${target.start.substring(0, 40)}..."`);
      replacedCount++;
    } else {
      console.error(`Could not find end pattern for: "${target.start.substring(0, 40)}..."`);
    }
  } else {
    console.error(`Could not find start pattern for: "${target.start.substring(0, 40)}..."`);
  }
}

// Let's also restore the broken join('\n') on lines like line 239/240
// By searching for join('\n') that got turned into join('\n') but with actual newline
content = content.replace(/\.join\('[\r\n]+'\)/g, ".join('\\n')");

fs.writeFileSync(FILE_PATH, content, 'utf8');
console.log(`Replacement completed. Total updated: ${replacedCount}`);
