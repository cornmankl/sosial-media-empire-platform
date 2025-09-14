// vercel-server.js - Server setup for Vercel deployment
import { setupSocket } from '@/lib/socket';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? '0.0.0.0' : 'localhost';

// Create Next.js app
const nextApp = next({ 
  dev,
  dir: process.cwd(),
  conf: dev ? undefined : { distDir: '.next' }
});

let io;

// Prepare Next.js app
const prepareApp = async () => {
  await nextApp.prepare();
  const handle = nextApp.getRequestHandler();
  
  // Create HTTP server that will handle both Next.js and Socket.IO
  const server = createServer((req, res) => {
    // Skip socket.io requests from Next.js handler
    if (req.url?.startsWith('/api/socketio')) {
      return;
    }
    handle(req, res);
  });
  
  // Setup Socket.IO
  io = new Server(server, {
    path: '/api/socketio',
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  setupSocket(io);
  
  return server;
};

// Export for Vercel
export default async function handler(req, res) {
  // For API routes, let Next.js handle them
  if (req.url?.startsWith('/api/')) {
    const handle = nextApp.getRequestHandler();
    return handle(req, res);
  }
  
  // For all other routes, serve the Next.js app
  const handle = nextApp.getRequestHandler();
  return handle(req, res);
}

// Initialize the app
let serverPromise;
if (!serverPromise) {
  serverPromise = prepareApp();
}

export async function getServer() {
  return serverPromise;
}