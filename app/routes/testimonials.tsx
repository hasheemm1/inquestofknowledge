import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Navigation from "~/components/Navigation";

export const meta: MetaFunction = () => {
  return [
    { title: "Testimonials - In Quest of Knowledge" },
    { name: "description", content: "Read what critics, educators, and friends say about this remarkable biography of Dr. Vibha Dineshkumar Shah." },
  ];
};

const testimonials = [
  {
    id: 1,
    name: "Dr. Mwangi Macharia",
    title: "Author, Lecturer: Department of Literature, Linguistics, and Foreign Languages",
    institution: "Kenyatta University",
    quote: "In Quest of Knowledge, a biography is a life beyond measure: The Story of Dr. Vibha celebrates the chequered life of an extraordinary woman in a compelling display of charm, intellect, diligence and compassion. Her story is an articulation of love, a record of cultural heritage, and a chronicle of a life lived with grace and quiet strength.",
    image: null
  },
  {
    id: 2,
    name: "Navinchandra Bharmal Shah",
    title: "BA Economics / History – Nairobi University",
    institution: "Educationist",
    quote: "In Quest of Knowledge is a special biography depicting a woman's strength, courage, resoluteness for living a full life to achieve her dreams - penned by an equally loving husband. Vibha lived a quiet life, no glamour; she was a simple unassuming person. Vibha has left a legacy that many women would want to emulate.",
    image: null
  },
  {
    id: 3,
    name: "Daljit Kaur Chetan Solanki",
    title: "LLB University of Nairobi, Diploma - KSL",
    institution: "Advocate of the High Court of Kenya",
    quote: "I must say that I have thoroughly enjoyed reading the book which was easy to follow and used language that was simple yet sophisticated. It is noteworthy that the writer highlights Dr Vibha Shah's humility from an early age. Reading this biography, I feel as though I have known the late Dr Vibha Shah far beyond the few occasions I was privileged to meet her.",
    image: null
  },
  {
    id: 4,
    name: "Bindi Rashmikant Shah",
    title: "Author of the Foreword",
    institution: "Community Leader",
    quote: "Some lives cannot be measured by years alone – they are measured by the light they give, the hearts they touch and the footprints they leave on both people and places. This work is remarkable not only because it may be the first biography in our community written about a woman, but also because it lovingly weaves together strands of larger narratives.",
    image: null
  },
  {
    id: 5,
    name: "Charles O. Okoth",
    title: "Educationist, Literary critic, Editor",
    institution: "Award winning author: Burt Award and Wahome Mutahi Award",
    quote: "What can one say, and not say? As a Chinese philosopher said, one cannot measure the bounty of the Yang Tse River using a cup. In Quest Of Knowledge, A Biography, will be here for a long time; and will travel the corridors of knowledge, and make a lot of literary noise.",
    image: null
  }
];

export default function Testimonials() {
  return (
    <div className="min-h-screen">
      <Navigation currentPath="/testimonials" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-50 to-gold-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
            What Others Say
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Praise from literary critics, educators, and community leaders
          </p>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl lg:text-3xl font-serif italic text-navy-800 leading-relaxed mb-6">
            "Here's to strong women: may we know them, may we be them, may we raise them."
          </blockquote>
          <cite className="text-lg text-gray-600">— Unknown</cite>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`grid lg:grid-cols-4 gap-8 items-start ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Quote */}
                <div className={`lg:col-span-3 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="card">
                    <blockquote className="quote text-lg mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>

                {/* Author Info */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="card bg-gradient-to-br from-navy-50 to-gold-50 border-navy-200">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-navy-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-serif text-xl font-bold">
                          {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-700 font-medium mb-1">
                        {testimonial.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.institution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Cover Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/images/cover.jpg" 
              alt="In Quest of Knowledge - Book Cover"
              className="w-64 h-auto rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-navy-100 to-gold-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-navy-900 mb-6">
            Experience This Remarkable Story
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Join the readers who have been moved by Dr. Vibha's inspiring journey. 
            Order your copy today and discover a life lived with purpose, grace, and unwavering determination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order" className="btn-primary">
              Order Your Copy
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More About Vibha
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Praise */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-navy-900 mb-4">More Praise</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <blockquote className="quote text-base mb-4">
                "It is not often that someone comes along who is a true friend and intellectual. In Quest of Knowledge showcases Vibha as both a loyal trusted friend who was also witty."
              </blockquote>
              <cite className="text-sm font-medium text-gray-700">
                — Neera Aspi Shah, MRPharmS.
              </cite>
            </div>
            
            <div className="card">
              <blockquote className="quote text-base mb-4">
                "Every chapter carries a journey, and in every journey, there is a lesson, inspiration and a legacy that spells out Vibha as though she came while fully aware of her role. A must-read."
              </blockquote>
              <cite className="text-sm font-medium text-gray-700">
                — Obingo Wesonga, Editor and Founder of Vows Literary Consultants and Africa Reads Book Club
              </cite>
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
                "Praise from literary critics, educators, and community leaders"
              </p>
              <p className="text-gray-400 text-sm mt-2">
                ISBN 978-9914-35-124-8 (Paperback) • ISBN 978-9914-35-125-5 (Hardback)
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contact</h6>
              <div className="space-y-2 text-gray-300">
                <p>P.O. Box 1801-00606, Nairobi</p>
                <p>Email: info@inquestofknowledge.com</p>
                <p>Website: www.inquestofknowledge.com</p>
              </div>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">About the Book</Link>
                <Link to="/testimonials" className="block text-gray-300 hover:text-white transition-colors">Testimonials</Link>
                <Link to="/order" className="block text-gray-300 hover:text-white transition-colors">Order Now</Link>
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
