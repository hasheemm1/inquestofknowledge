import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import Navigation from "~/components/Navigation";
import { db } from "~/lib/firebase";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Launch - In Quest of Knowledge" },
    { name: "description", content: "Join us for the launch of In Quest of Knowledge - A Biography of Dr. Vibha Dineshkumar Shah on September 27th at Sarit Center" },
    { name: "keywords", content: "book launch, Sarit Center, Dr. Vibha Shah, biography, September 27, Nairobi, Kenya" },
  ];
};

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

export async function loader({ request }: LoaderFunctionArgs) {
  // Get the YouTube URL from Firestore
  const youtubeUrl = await getYouTubeUrl();
  
  return json({ youtubeUrl });
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

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLaunchDay, setIsLaunchDay] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date('2025-09-27T10:00:00+03:00').getTime(); // 10 AM EAT
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        setIsLaunchDay(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLaunchDay) {
    return (
      <div className="text-center text-gold-300 text-xl font-bold">
        🎉 Launch Day is Here! 🎉
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
      <div className="bg-navy-700 rounded-lg p-4">
        <div className="text-2xl sm:text-3xl font-bold text-gold-300">
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-300">Days</div>
      </div>
      <div className="bg-navy-700 rounded-lg p-4">
        <div className="text-2xl sm:text-3xl font-bold text-gold-300">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-300">Hours</div>
      </div>
      <div className="bg-navy-700 rounded-lg p-4">
        <div className="text-2xl sm:text-3xl font-bold text-gold-300">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-300">Minutes</div>
      </div>
      <div className="bg-navy-700 rounded-lg p-4">
        <div className="text-2xl sm:text-3xl font-bold text-gold-300">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-300">Seconds</div>
      </div>
    </div>
  );
}

export default function Launch() {
  const { youtubeUrl } = useLoaderData<typeof loader>();
  const videoId = extractVideoId(youtubeUrl);
  const embedUrl = videoId ? createEmbedUrl(videoId) : null;
  
  return (
    <div className="min-h-screen">
      <Navigation currentPath="/launch" />

      {/* Hero Section - Video or Event Info */}
      {embedUrl ? (
        /* Live Stream Hero */
        <section className="relative py-12 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full inline-block mb-4 font-semibold text-sm uppercase tracking-wide animate-pulse">
                🔴 LIVE NOW
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
                Book Launch Live Stream
              </h1>
              <h2 className="font-serif text-xl md:text-2xl text-gold-300 mb-6">
                In Quest of Knowledge
              </h2>
            </div>
            
            {/* Live Video Hero */}
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gold-400/20">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Launch Event Live Stream"
                />
              </div>
              
              {/* Live Stream Info */}
              <div className="mt-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto border border-white/20">
                  <div className="grid md:grid-cols-2 gap-4 text-white text-sm">
                    <div>
                      <div className="text-gold-300 font-semibold">Date</div>
                      <div>September 27th, 2025</div>
                    </div>
                    <div>
                      <div className="text-gold-300 font-semibold">Venue</div>
                      <div>Sarit Center Expo</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mt-3">
                  🔊 Video will autoplay with sound (if browser allows)
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Standard Event Hero */
        <section className="relative py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gold-400 text-navy-900 px-4 py-2 rounded-full inline-block mb-6 font-semibold text-sm uppercase tracking-wide">
              Book Launch Event
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Book Launch
            </h1>
            <h2 className="font-serif text-2xl md:text-3xl text-gold-300 mb-8">
              In Quest of Knowledge
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join us for the official launch of "In Quest of Knowledge - A Biography of Late Dr. Vibha Dineshkumar Shah"
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto border border-white/20">
              <div className="grid md:grid-cols-2 gap-4 text-white">
                <div>
                  <div className="text-gold-300 font-semibold">Date</div>
                  <div className="text-xl">September 27th, 2025</div>
                </div>
                <div>
                  <div className="text-gold-300 font-semibold">Venue</div>
                  <div className="text-xl">Sarit Center Expo</div>
                </div>
              </div>
            </div>
            
            {/* Countdown Timer */}
            <div className="mt-8 bg-navy-800/50 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto border border-white/10">
              <h3 className="text-lg font-semibold mb-6 text-gold-300">Countdown to Launch Day</h3>
              <CountdownTimer />
            </div>
          </div>
        </section>
      )}

      {/* Event Details */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Event Information */}
            <div>
              <h3 className="font-serif text-3xl font-bold text-navy-900 mb-6">
                Launch Event Details
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-navy-900 mb-2">Date & Time</h4>
                    <p className="text-gray-700">Friday, September 27th, 2025</p>
                    <p className="text-gray-600 text-sm">Time details to be announced</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-navy-900 mb-2">Venue</h4>
                    <p className="text-gray-700">Sarit Center Meeting Rooms</p>
                    <p className="text-gray-700">Expo Center</p>
                    <p className="text-gray-600 text-sm">Westlands, Nairobi</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-navy-900 mb-2">Admission</h4>
                    <p className="text-green-600 font-semibold text-lg">FREE ENTRY</p>
                    <p className="text-gray-600 text-sm">Open to all book lovers and admirers of Dr. Vibha Shah</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-navy-900 mb-2">Live Streaming</h4>
                    <p className="text-gray-700">Available live on YouTube</p>
                    <p className="text-gray-600 text-sm">Can't attend in person? Join us online!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Cover & CTA */}
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <img 
                  src="/images/cover.jpg" 
                  alt="In Quest of Knowledge - Book Cover"
                  className="w-64 h-auto rounded-lg shadow-2xl border border-gray-200"
                />
              </div>
              <h4 className="font-serif text-2xl font-bold text-navy-900 mb-4">
                Pre-order Your Copy
              </h4>
              <p className="text-gray-700 mb-6">
                Secure your copy before the launch and collect it at the event
              </p>
              <Link 
                to="/order" 
                className="btn-primary inline-block mb-4"
              >
                Order Now
              </Link>
              <p className="text-sm text-gray-600">
                Special introductory pricing available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Launch */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-3xl font-bold text-navy-900 mb-8">
            About the Launch Event
          </h3>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="lead text-xl mb-6">
              Join us for an inspiring evening celebrating the life and legacy of Late Dr. Vibha Dineshkumar Shah through the pages of "In Quest of Knowledge."
            </p>
            <p className="mb-6">
              This biographical work captures the remarkable journey of a woman who dedicated her life to education, service, and the pursuit of knowledge. The launch event will feature readings from the book, reflections on Dr. Shah's impact, and an opportunity to connect with others who were touched by her legacy.
            </p>
            <p>
              Whether you join us in person at Sarit Center or tune in via our live YouTube stream, this event promises to be a meaningful celebration of a life well-lived and a story worth telling.
            </p>
          </div>
        </div>
      </section>

      {/* YouTube Live Stream Info - Only show when no video is active */}
      {!embedUrl && (
        <section className="py-16 bg-navy-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="font-serif text-3xl font-bold mb-6">
              Watch Live on YouTube
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Can't make it to Sarit Center? No problem! The entire launch event will be streamed live on YouTube.
            </p>
            <p className="text-gray-400 text-sm">
              YouTube live stream will appear above when the event goes live
            </p>
          </div>
        </section>
      )}

      {/* Contact for More Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-3xl font-bold text-navy-900 mb-6">
            Questions About the Launch?
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            For more information about the launch event, please get in touch.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="card text-center">
              <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-900 mb-2">Email</h4>
              <p className="text-gray-700">info@inquestofknowledge.com</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9a9 9 0 019-9m-9 9c0-1.657.895-3 2-3m-2 3c-1.105 0-2-1.343-2-3m2 3c1.657 0 3-1.343 3-3" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-900 mb-2">Website</h4>
              <p className="text-gray-700">www.inquestofknowledge.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-serif text-xl font-semibold mb-4">In Quest of Knowledge</h5>
              <p className="text-gray-300 leading-relaxed italic">
                "Join us for the official book launch on September 27th at Sarit Center"
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Free entry • Live on YouTube • Pre-orders available
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Launch Details</h6>
              <div className="space-y-2 text-gray-300">
                <p>September 27th, 2025</p>
                <p>Sarit Center Expo Center</p>
                <p>Meeting Rooms, Westlands</p>
                <p>Free Entry</p>
              </div>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">About the Book</Link>
                <Link to="/order" className="block text-gray-300 hover:text-white transition-colors">Order Now</Link>
                <Link to="/testimonials" className="block text-gray-300 hover:text-white transition-colors">Testimonials</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-navy-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Dineshkumar Devchand Shah. All rights reserved. Copyright Board No.: RZ79824</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
