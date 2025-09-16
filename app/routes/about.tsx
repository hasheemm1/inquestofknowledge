import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Navigation from "~/components/Navigation";

export const meta: MetaFunction = () => {
  return [
    { title: "About - In Quest of Knowledge" },
    { name: "description", content: "Learn about Dr. Vibha Dineshkumar Shah's extraordinary journey and the story behind this compelling biography." },
  ];
};

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation currentPath="/about" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
            About Dr. Vibha Dineshkumar Shah
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            A remarkable woman whose life exemplified the pursuit of knowledge, resilience, and quiet strength
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Story */}
            <div className="lg:col-span-2 space-y-8">
              <div className="card">
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">Her Extraordinary Journey</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                  <p>
                    Vibha was born to an affluent family in the 1950s in Nairobi, Kenya. Despite early challenges when her father Chunilal switched jobs due to prevailing economic conditions, her mother Radiatben ensured that Vibha and her three siblings had the best access to education the family could afford.
                  </p>
                  <p>
                    It was no wonder that Vibha was an excellent student at school, often topping the class in multiple subjects. Her academic exploits were not due to strict parenting – they were born out of a genuine desire to satiate her curiosity for knowledge.
                  </p>
                  <p>
                    She excelled at the University of Wales Institute of Science and Technology (later renamed as Cardiff University), while adjusting to live independently. Her non-academic interests evolved as her education progressed, leading her to become a member of the Indian Association and Debating Society.
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">Professional Excellence</h3>
                <div className="prose text-gray-700 space-y-4">
                  <p>
                    After completing her graduation, Vibha worked at the Hammersmith Hospital and Boots The Chemist in London. She eventually completed her registration with the Pharmaceutical Society of Great Britain, attaining the license to practise within the boundaries of Britain.
                  </p>
                  <p>
                    Her desire to learn was not restricted to books alone. Around 1980, she decided to study accounting, an entirely different area from her previous endeavours. Between 1980 and 1990, she managed the books of accounts of Motor Fuels Ltd while pursuing her ACCA qualification.
                  </p>
                  <p>
                    In 1990, Vibha earned the title of 'Doctor' – a recognition conferred on her by the Pharmaceutical Society of Kenya. In 1999, she was awarded the ACCA certificate, and by 2004, she achieved the status of Fellow of Chartered Certified Accountants (FCCA).
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">A Life of Learning</h3>
                <div className="prose text-gray-700 space-y-4">
                  <p>
                    But Vibha was not done yet! In 2006, she acquired her final major qualification, an MBA from the Heriot-Watt University. Her commitment to Continuing Professional Development (CPD) never faltered throughout her career.
                  </p>
                  <p>
                    We had a passion for travelling. With the exception of South America and Antarctica, we travelled every continent. While traveling, Vibha would always carry a book in hand, engrossed in reading about the places we were about to visit. Thus, traveling for her was as much an activity of learning as enjoyment.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Book Cover */}
              <div className="flex justify-center">
                <img 
                  src="/images/cover.jpg" 
                  alt="In Quest of Knowledge - Book Cover"
                  className="w-64 h-auto rounded-lg shadow-lg border border-gray-200"
                />
              </div>
              
              <div className="card">
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-navy-800">Born:</span>
                    <span className="text-gray-600">1950s, Nairobi, Kenya</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-navy-800">Education:</span>
                    <span className="text-gray-600">Cardiff University</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-navy-800">Qualifications:</span>
                    <span className="text-gray-600">MPharm, FCCA, MBA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-navy-800">Marriage:</span>
                    <span className="text-gray-600">1978 (42 years)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-navy-800">Children:</span>
                    <span className="text-gray-600">Shail, Shrena, Preksha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-navy-800">Passed Away:</span>
                    <span className="text-gray-600">October 2021</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">Her Philosophy</h3>
                <blockquote className="border-l-4 border-navy-400 pl-4 py-2">
                  <p className="quote text-base text-navy-800 mb-3">
                    "Don't simply dream; discover ways to stay your goals."
                  </p>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">In Gujarati wisdom:</p>
                    <p className="font-serif text-base mt-1" lang="gu">સપનાઓ દેખાવા નહીં, એને પૂરા કરવા જીવવું શીખો.</p>
                    <p className="text-xs italic mt-1">Sapanā'ō dēkhāvā nahīṁ, ēnē pūrā karavā jīvavuṁ śīkhō</p>
                  </div>
                </blockquote>
              </div>

              <div className="card">
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">About the Author</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  <strong>Dineshkumar Devchand Pethraj Shah (Karania)</strong> was Vibha's devoted husband for 42 years. This biography is his loving tribute to her memory and an inspiration for future generations.
                </p>
                <p className="text-xs text-gray-600">
                  BA (Combined Honours) Economics / Statistics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-navy-900 mb-4">What's Inside</h2>
            <p className="text-lg text-gray-600">A comprehensive look at an extraordinary life</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-semibold text-navy-800">Main Chapters</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-navy-300 pl-4">
                  <h4 className="font-medium text-navy-800">Chapter 1: The Spark of Learning</h4>
                  <p className="text-sm text-gray-600">Early life and education in Nairobi</p>
                </div>
                <div className="border-l-4 border-navy-300 pl-4">
                  <h4 className="font-medium text-navy-800">Chapter 2: Becoming Vibha</h4>
                  <p className="text-sm text-gray-600">University years in Cardiff</p>
                </div>
                <div className="border-l-4 border-navy-300 pl-4">
                  <h4 className="font-medium text-navy-800">Chapter 3: Love, Letters, and a New Beginning</h4>
                  <p className="text-sm text-gray-600">Marriage and new life chapter</p>
                </div>
                <div className="border-l-4 border-navy-300 pl-4">
                  <h4 className="font-medium text-navy-800">Chapter 4: Grit and Grace in Foreign Lands</h4>
                  <p className="text-sm text-gray-600">Professional career and challenges</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-xl font-semibold text-navy-800">Special Features</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-gold-300 pl-4">
                  <h4 className="font-medium text-navy-800">Chapter 5: Through the Lens of Travel</h4>
                  <p className="text-sm text-gray-600">Lessons from around the world</p>
                </div>
                <div className="border-l-4 border-gold-300 pl-4">
                  <h4 className="font-medium text-navy-800">Chapter 7: Testimonials</h4>
                  <p className="text-sm text-gray-600">Memories from family and friends</p>
                </div>
                <div className="border-l-4 border-gold-300 pl-4">
                  <h4 className="font-medium text-navy-800">Appendix</h4>
                  <p className="text-sm text-gray-600">Origins of Halari Visa Oshwal Community</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/order" className="btn-primary">
              Order Your Copy Today
            </Link>
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
                "A remarkable woman who embodied grace, intellect, and compassion"
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Composed by her devoted husband of 42 years
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
