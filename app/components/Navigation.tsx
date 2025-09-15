import { Link } from "@remix-run/react";
import { useState } from "react";

interface NavigationProps {
  currentPath?: string;
}

export default function Navigation({ currentPath = "/" }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/testimonials", label: "Testimonials" },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-navy-200/30 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300"
          >
            <img 
              src="/images/logo.png" 
              alt="In Quest of Knowledge Logo" 
              className="h-12 w-12"
            />
            <span className="font-serif font-semibold text-xl text-navy-800 group-hover:text-navy-600 transition-colors duration-300">
              In Quest of Knowledge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 px-1 font-medium transition-all duration-300 group ${
                  isActive(item.path)
                    ? "text-navy-900"
                    : "text-navy-700 hover:text-navy-900"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Animated underline */}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-gold-500 transition-all duration-300 ${
                    isActive(item.path) 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
                {/* Hover background */}
                <span className="absolute inset-0 bg-navy-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </Link>
            ))}
            <Link to="/order" className="btn-primary group ml-4 relative overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Order Book</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-navy-700 hover:text-navy-900 hover:bg-navy-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? "block opacity-100" : "hidden opacity-0"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-navy-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 group relative ${
                  isActive(item.path)
                    ? "text-navy-900 bg-gradient-to-r from-navy-50 to-orange-50 border-l-4 border-orange-500"
                    : "text-navy-700 hover:text-navy-900 hover:bg-navy-50 hover:border-l-4 hover:border-orange-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/order"
              className="block px-3 py-2 mt-4 text-center bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Order Book
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
