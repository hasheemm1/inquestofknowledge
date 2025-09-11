import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Navigation from "~/components/Navigation";

export const meta: MetaFunction = () => {
  return [
    { title: "In Quest of Knowledge - A Biography of Dr. Vibha Dineshkumar Shah" },
    { name: "description", content: "A compelling biography of Late Dr. Vibha Dineshkumar Shah - MPharm, FCCA, MBA. Her extraordinary journey from Nairobi to Cardiff and beyond." },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navigation currentPath="/" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src="/images/cover.png" 
                    alt="In Quest of Knowledge - A Biography of Late Dr Vibha Dineshkumar Shah"
                    className="w-80 h-auto rounded-lg shadow-2xl border border-gray-200"
                  />
                  {/* Optional overlay for better text readability if needed */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-primary-900 mb-6 leading-tight">
                  A Life Beyond Measure
                </h2>
                <p className="text-xl text-primary-700 leading-relaxed mb-6">
                  From the blue sky of Nairobi to the lecture halls of Cardiff, from the counter of a small pharmacy to the wide horizons of travel and family - Vibha's journey was extraordinary.
                </p>
                <p className="text-lg text-primary-600 leading-relaxed">
                  She was a daughter, a sister, a wife, a mother, and above all, a quiet force of resilience and grace. This moving biography celebrates her chequered life in a compelling display of charm, intellect, diligence and compassion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/order" className="btn-primary text-center">
                  Order Your Copy
                </Link>
                <Link to="/about" className="btn-secondary text-center">
                  Learn More
                </Link>
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-primary-400 pl-6 py-4">
                <p className="quote text-primary-800">
                  "Don't simply dream; discover ways to stay your goals."
                </p>
                <div className="mt-3 text-sm text-primary-700">
                  <p className="font-medium">In Gujarati wisdom:</p>
                  <p className="font-serif text-base mt-1" lang="gu">સપનાઓ દેખાવા નહીં, એને પૂરા કરવા જીવવું શીખો.</p>
                  <p className="text-xs italic mt-1">Sapanā'ō dēkhāvā nahīṁ, ēnē pūrā karavā jīvavuṁ śīkhō</p>
                </div>
                <cite className="text-sm text-primary-600 font-medium mt-2 block">— Dr. Vibha Dineshkumar Shah</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Book Details */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-bold text-primary-900 mb-4">Available Editions</h3>
            <p className="text-lg text-primary-600">Choose your preferred format</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card text-center">
              <h4 className="font-serif text-xl font-semibold text-primary-800 mb-2">Paperback Edition</h4>
              <p className="text-primary-600 mb-4">ISBN 978-9914-35-124-8</p>
              <div className="text-3xl font-bold text-gold-600 mb-4">KSh 2,500</div>
              <Link to="/order?edition=paperback" className="btn-primary w-full">
                Order Paperback
              </Link>
            </div>
            
            <div className="card text-center">
              <h4 className="font-serif text-xl font-semibold text-primary-800 mb-2">Hardback Edition</h4>
              <p className="text-primary-600 mb-4">ISBN 978-9914-35-125-5</p>
              <div className="text-3xl font-bold text-gold-600 mb-4">KSh 3,500</div>
              <Link to="/order?edition=hardback" className="btn-primary w-full">
                Order Hardback
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Publication Details */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-gold-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-bold text-primary-900 mb-4">Official Publication</h3>
            <p className="text-lg text-primary-700">Professionally published with official ISBN registration</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Publisher Information */}
            <div className="card bg-white text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="font-serif text-lg font-semibold text-primary-800 mb-2">Publisher</h4>
              <p className="text-sm text-primary-700 mb-2">Dineshkumar Devchand Shah</p>
              <p className="text-xs text-primary-600">P.O. Box 1801-00606, Nairobi</p>
            </div>

            {/* Copyright Information */}
            <div className="card bg-white text-center">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-serif text-lg font-semibold text-primary-800 mb-2">Copyright</h4>
              <p className="text-sm text-primary-700 mb-2">© Copyright 2025</p>
              <p className="text-xs text-primary-600">Board No.: RZ79824</p>
            </div>

            {/* Publication Year */}
            <div className="card bg-white text-center md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-serif text-lg font-semibold text-primary-800 mb-2">Published</h4>
              <p className="text-sm text-primary-700 mb-2">August 2025</p>
              <p className="text-xs text-primary-600">Nairobi, Kenya</p>
            </div>
          </div>

          {/* Additional Publication Details */}
          <div className="mt-12 bg-white rounded-xl p-6 shadow-lg border border-primary-100">
            <h4 className="font-serif text-xl font-semibold text-primary-900 mb-6 text-center">Publication Details</h4>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-primary-700">Paperback ISBN:</span>
                  <span className="font-mono text-primary-900">978-9914-35-124-8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-primary-700">Hardback ISBN:</span>
                  <span className="font-mono text-primary-900">978-9914-35-125-5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-primary-700">Copyright Board:</span>
                  <span className="font-mono text-primary-900">RZ79824</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-primary-700">Website:</span>
                  <span className="text-primary-900">www.inquestofknowledge.com</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-primary-700">Email:</span>
                  <span className="text-primary-900">info@inquestofknowledge.com</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-primary-700">Language:</span>
                  <span className="text-primary-900">English</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-gold-50 rounded-lg">
              <p className="text-center text-sm text-primary-700 italic">
                "A professionally published biography celebrating the remarkable life and achievements of Dr. Vibha Dineshkumar Shah. 
                All rights reserved under international copyright law."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-16 bg-gradient-to-r from-primary-100 to-gold-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl lg:text-3xl font-serif italic text-primary-800 leading-relaxed mb-6">
            "Some lives are measured in years. Vibha's is measured in love."
          </blockquote>
          <p className="text-lg text-primary-600">
            Part love story, part legacy, this book is a testament to how one woman's light can continue to guide others long after she is gone.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-serif text-xl font-semibold mb-4">In Quest of Knowledge</h5>
              <p className="text-primary-200 leading-relaxed">
                A Biography of Late Dr Vibha Dineshkumar Shah - MPharm, FCCA, MBA
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contact</h6>
              <div className="space-y-2 text-primary-200">
                <p>P.O. Box 1801-00606, Nairobi</p>
                <p>Email: info@inquestofknowledge.com</p>
                <p>Website: www.inquestofknowledge.com</p>
              </div>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <div className="space-y-2">
                <Link to="/about" className="block text-primary-200 hover:text-white transition-colors">About the Book</Link>
                <Link to="/testimonials" className="block text-primary-200 hover:text-white transition-colors">Testimonials</Link>
                <Link to="/order" className="block text-primary-200 hover:text-white transition-colors">Order Now</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-300">
            <p>&copy; 2025 Dineshkumar Devchand Shah. All rights reserved. Copyright Board No.: RZ79824</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
