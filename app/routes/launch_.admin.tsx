import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";

export const meta: MetaFunction = () => {
  return [
    { title: "Launch Admin - In Quest of Knowledge" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

// Simple session storage for demo purposes
const sessions = new Map<string, { username: string; expiresAt: number }>();

// Initialize Firebase Admin
if (!getApps().length) {
  const serviceAccount = require("../../serviceAccount.json");
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

// Firestore functions for admin settings
async function getYouTubeUrl(): Promise<string | null> {
  try {
    const doc = await db.collection('admin').doc('settings').get();
    if (doc.exists) {
      const data = doc.data();
      return data?.youtubeUrl || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting YouTube URL:', error);
    return null;
  }
}

async function setYouTubeUrl(url: string | null): Promise<void> {
  try {
    await db.collection('admin').doc('settings').set({
      youtubeUrl: url,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error('Error setting YouTube URL:', error);
    throw error;
  }
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getSessionCookie(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "admin_session") {
      return value;
    }
  }
  return null;
}

function isValidSession(sessionId: string): boolean {
  const session = sessions.get(sessionId);
  if (!session) return false;
  
  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId);
    return false;
  }
  
  return true;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionId = getSessionCookie(request);
  
  if (!sessionId || !isValidSession(sessionId)) {
    return json({ authenticated: false, youtubeUrl: null });
  }
  
  // Load YouTube URL from Firestore
  const youtubeUrl = await getYouTubeUrl();
  
  return json({ authenticated: true, youtubeUrl });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");
  
  if (action === "login") {
    const username = formData.get("username");
    const password = formData.get("password");
    
    // Simple hardcoded authentication
    if (username === "hasheem" && password === "@dmin2025") {
      const sessionId = generateSessionId();
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
      
      sessions.set(sessionId, { username: "hasheem", expiresAt });
      
      return redirect("/launch/admin", {
        headers: {
          "Set-Cookie": `admin_session=${sessionId}; Path=/; HttpOnly; Max-Age=86400`
        }
      });
    }
    
    return json({ error: "Invalid credentials" }, { status: 401 });
  }
  
  if (action === "logout") {
    const sessionId = getSessionCookie(request);
    if (sessionId) {
      sessions.delete(sessionId);
    }
    
    return redirect("/launch/admin", {
      headers: {
        "Set-Cookie": "admin_session=; Path=/; HttpOnly; Max-Age=0"
      }
    });
  }
  
  if (action === "update-youtube") {
    const sessionId = getSessionCookie(request);
    
    if (!sessionId || !isValidSession(sessionId)) {
      return json({ error: "Not authenticated" }, { status: 401 });
    }
    
    const youtubeUrl = formData.get("youtubeUrl") as string;
    
    try {
      // Store in Firestore
      await setYouTubeUrl(youtubeUrl || null);
      return json({ success: true, youtubeUrl: youtubeUrl || null });
    } catch (error) {
      return json({ error: "Failed to save YouTube URL" }, { status: 500 });
    }
  }
  
  return json({ error: "Invalid action" }, { status: 400 });
}

function extractVideoId(url: string): string | null {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

function createEmbedUrl(videoId: string): string {
  // Add autoplay and other parameters for better live stream experience
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '0', // Try unmuted first - browser may override if needed
    rel: '0', // Don't show related videos
    modestbranding: '1', // Reduce YouTube branding
    iv_load_policy: '3', // Hide annotations
    cc_load_policy: '0', // Hide captions by default
    playsinline: '1', // Play inline on mobile
    enablejsapi: '1', // Enable JS API for better control
    origin: typeof window !== 'undefined' ? window.location.origin : '',
  });
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function LoginForm() {
  const actionData = useActionData<typeof action>();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-navy-900 mb-2">Launch Admin</h1>
            <p className="text-gray-600">Please login to continue</p>
          </div>
          
          <Form method="post" className="space-y-6">
            <input type="hidden" name="action" value="login" />
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            
            {actionData?.error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {actionData.error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-navy-900 text-white py-2 px-4 rounded-md hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 transition-colors"
            >
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { youtubeUrl } = useLoaderData<typeof loader>();
  const [url, setUrl] = useState(youtubeUrl || "");
  const [showIframe, setShowIframe] = useState(!!youtubeUrl);
  const actionData = useActionData<typeof action>();
  
  const videoId = extractVideoId(url);
  const embedUrl = videoId ? createEmbedUrl(videoId) : null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Launch Admin Dashboard</h1>
              <p className="text-gray-600">Manage the launch event YouTube stream</p>
            </div>
            <Form method="post">
              <input type="hidden" name="action" value="logout" />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </Form>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* YouTube URL Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">YouTube Live Stream</h2>
            
            <Form method="post" className="space-y-4">
              <input type="hidden" name="action" value="update-youtube" />
              
              <div>
                <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube URL or Video ID
                </label>
                <input
                  type="text"
                  id="youtubeUrl"
                  name="youtubeUrl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="https://youtube.com/watch?v=... or video ID"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Paste a YouTube URL or just the video ID
                </p>
              </div>
              
              {actionData?.error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {actionData.error}
                </div>
              )}
              
              {actionData?.success && (
                <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
                  YouTube URL updated successfully!
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-navy-900 text-white px-4 py-2 rounded-md hover:bg-navy-800 transition-colors"
                >
                  Update URL
                </button>
                
                {videoId && (
                  <button
                    type="button"
                    onClick={() => setShowIframe(!showIframe)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    {showIframe ? 'Hide' : 'Show'} Preview
                  </button>
                )}
              </div>
            </Form>
            
            {/* Video Info */}
            {videoId && (
              <div className="mt-4 p-3 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">
                  <strong>Video ID:</strong> {videoId}
                </p>
                <p className="text-sm text-green-800">
                  <strong>Embed URL:</strong> {embedUrl}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  ✓ Autoplay enabled with sound (unmuted)
                </p>
              </div>
            )}
            
            {!videoId && url && (
              <div className="mt-4 p-3 bg-red-50 rounded-md">
                <p className="text-sm text-red-800">
                  Invalid YouTube URL format
                </p>
              </div>
            )}
          </div>
          
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Current Status</h2>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Stream Status:</span>
                <div className="mt-1">
                  {youtubeUrl ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      🔴 URL Configured
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      ⚪ No URL Set
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-700">Public Link:</span>
                <div className="mt-1">
                  <a 
                    href="/launch" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-600 hover:text-navy-800 text-sm underline"
                  >
                    /launch (public page)
                  </a>
                </div>
              </div>
              
              {youtubeUrl && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Current URL:</span>
                  <div className="mt-1 text-sm text-gray-600 break-all">
                    {youtubeUrl}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* YouTube Preview */}
        {showIframe && embedUrl && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">YouTube Preview</h2>
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Preview"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function LaunchAdmin() {
  const { authenticated } = useLoaderData<typeof loader>();
  
  return authenticated ? <AdminDashboard /> : <LoginForm />;
}
