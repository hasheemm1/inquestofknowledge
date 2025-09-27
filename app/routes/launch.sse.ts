import type { LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/lib/firebase";

// Store active SSE connections
const connections = new Set<ReadableStreamDefaultController>();

// Function to broadcast YouTube URL changes to all connected clients
export function broadcastYouTubeUrlUpdate(youtubeUrl: string | null) {
  const data = JSON.stringify({ 
    type: 'youtube-url-update', 
    youtubeUrl,
    timestamp: new Date().toISOString()
  });
  
  // Send to all connected clients
  connections.forEach(controller => {
    try {
      controller.enqueue(`data: ${data}\n\n`);
    } catch (error) {
      // Remove broken connections
      connections.delete(controller);
    }
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  // Create a Server-Sent Events stream
  const stream = new ReadableStream({
    start(controller) {
      // Add this connection to our set
      connections.add(controller);
      
      // Send initial connection confirmation
      controller.enqueue(`data: ${JSON.stringify({ 
        type: 'connected',
        message: 'SSE connection established',
        timestamp: new Date().toISOString()
      })}\n\n`);
      
      // Send current YouTube URL immediately
      db.collection('admin').doc('settings').get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const youtubeUrl = data?.youtubeUrl || null;
          controller.enqueue(`data: ${JSON.stringify({
            type: 'youtube-url-update',
            youtubeUrl,
            timestamp: new Date().toISOString()
          })}\n\n`);
        }
      }).catch(error => {
        console.error('Error getting initial YouTube URL:', error);
      });
      
      // Keep connection alive with periodic heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(`data: ${JSON.stringify({ 
            type: 'heartbeat',
            timestamp: new Date().toISOString()
          })}\n\n`);
        } catch (error) {
          clearInterval(heartbeat);
          connections.delete(controller);
        }
      }, 30000); // Every 30 seconds
      
      // Cleanup when connection closes
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        connections.delete(controller);
        try {
          controller.close();
        } catch (error) {
          // Connection already closed
        }
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}

// Export for use in admin route
export { connections };
