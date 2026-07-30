import { spawn } from 'child_process';
import fs from 'fs';

export class MCPClient {
  constructor() {
    this.process = null;
    this.buffer = '';
    this.pendingRequests = new Map();
    this.nextId = 2; // ID 1 is reserved for initialize
    this.initPromise = null;
    this.logFile = 'mcp-client-log.txt';
    fs.writeFileSync(this.logFile, 'MCP Client Created\n');
  }

  log(msg) {
    fs.appendFileSync(this.logFile, `[LOG] ${msg}\n`);
  }

  error(msg) {
    fs.appendFileSync(this.logFile, `[ERROR] ${msg}\n`);
  }

  async connect() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      this.log('Spawning MCP-remote process...');
      this.process = spawn('npx', [
        '-y',
        'mcp-remote',
        'https://annual-albus-tr.zipwp.top/wp-json/mcp/elementor-mcp-server',
        '--header',
        'Authorization: Basic dGVqZ29tbDFqamxvOmxESWQgUnQwcCB4YnQ2IDZ5VW8gOEdHUCByWGY4',
        '--header',
        'Cookie: zipwp_access=abc123xyz789'
      ]);

      this.process.stdout.on('data', (data) => {
        const text = data.toString();
        this.buffer += text;
        
        const lines = this.buffer.split('\n');
        this.buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line);
            this.handleMessage(msg, resolve, reject);
          } catch (err) {
            this.error(`JSON parse error on line: "${line}" - ${err.message}`);
          }
        }
      });

      this.process.stderr.on('data', (data) => {
        this.log(`STDERR: ${data.toString()}`);
      });

      this.process.on('close', (code) => {
        this.log(`MCP process closed with code ${code}`);
        for (const [id, req] of this.pendingRequests.entries()) {
          req.reject(new Error(`MCP process closed unexpectedly with code ${code}`));
        }
        this.pendingRequests.clear();
      });

      // Send initialize request after 1.5s
      setTimeout(() => {
        const initRequest = {
          jsonrpc: '2.0',
          method: 'initialize',
          params: {
            protocolVersion: '2024-11-05',
            capabilities: {},
            clientInfo: { name: 'automation-client', version: '1.0.0' }
          },
          id: 1
        };
        this.log('Sending initialize request...');
        this.process.stdin.write(JSON.stringify(initRequest) + '\n');
      }, 1500);

      // Handle connection timeout
      setTimeout(() => {
        if (!this.connected) {
          reject(new Error('MCP initialize timeout'));
          this.close();
        }
      }, 15000);
    });

    return this.initPromise;
  }

  handleMessage(msg, resolveInit, rejectInit) {
    this.log(`Received MSG ID: ${msg.id || 'Notification'} (method: ${msg.method || 'Response'})`);
    
    if (msg.id === 1) {
      this.connected = true;
      this.log('Handshake: Received initialize response. Sending notifications/initialized...');
      const initNotification = {
        jsonrpc: '2.0',
        method: 'notifications/initialized'
      };
      this.process.stdin.write(JSON.stringify(initNotification) + '\n');
      resolveInit(true);
      return;
    }

    if (msg.id && this.pendingRequests.has(msg.id)) {
      const { resolve, reject } = this.pendingRequests.get(msg.id);
      this.pendingRequests.delete(msg.id);
      
      if (msg.error) {
        reject(new Error(msg.error.message || JSON.stringify(msg.error)));
      } else {
        resolve(msg.result);
      }
    }
  }

  async callTool(name, args = {}) {
    await this.connect();
    
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      const request = {
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name,
          arguments: args
        },
        id
      };
      
      this.pendingRequests.set(id, { resolve, reject });
      this.log(`Calling tool "${name}" [ID: ${id}]`);
      this.process.stdin.write(JSON.stringify(request) + '\n');
    });
  }

  close() {
    if (this.process) {
      this.log('Closing MCP Client connection...');
      this.process.kill();
      this.process = null;
    }
  }
}
