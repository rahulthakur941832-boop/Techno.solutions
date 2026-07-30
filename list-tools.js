import { spawn } from 'child_process';
import fs from 'fs';

const logFile = 'mcp-tools-list.txt';
fs.writeFileSync(logFile, 'Listing MCP Tools...\n');

const mcpProcess = spawn('npx', [
  '-y',
  'mcp-remote',
  'https://annual-albus-tr.zipwp.top/wp-json/mcp/elementor-mcp-server',
  '--header',
  'Authorization: Basic dGVqZ29tbDFqamxvOmxESWQgUnQwcCB4YnQ2IDZ5VW8gOEdHUCByWGY4',
  '--header',
  'Cookie: zipwp_access=abc123xyz789'
]);

let buffer = '';

mcpProcess.stdout.on('data', (data) => {
  const text = data.toString();
  buffer += text;
  
  const lines = buffer.split('\n');
  buffer = lines.pop() || '';
  
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const msg = JSON.parse(line);
      if (msg.id === 1) {
        // Send initialized notification
        mcpProcess.stdin.write(JSON.stringify({
          jsonrpc: '2.0',
          method: 'notifications/initialized'
        }) + '\n');
        
        // Call tools/list
        mcpProcess.stdin.write(JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/list',
          params: {},
          id: 2
        }) + '\n');
      } else if (msg.id === 2) {
        fs.writeFileSync(logFile, JSON.stringify(msg, null, 2));
        mcpProcess.kill();
        process.exit(0);
      }
    } catch (err) {
      fs.appendFileSync(logFile, `Parse error: ${err.message}\n`);
    }
  }
});

mcpProcess.stderr.on('data', (data) => {
  fs.appendFileSync(logFile, `STDERR: ${data.toString()}\n`);
});

setTimeout(() => {
  const initRequest = {
    jsonrpc: '2.0',
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'list-tools-client', version: '1.0.0' }
    },
    id: 1
  };
  mcpProcess.stdin.write(JSON.stringify(initRequest) + '\n');
}, 2000);

setTimeout(() => {
  mcpProcess.kill();
  fs.appendFileSync(logFile, 'Timeout reached.\n');
  process.exit(1);
}, 15000);
