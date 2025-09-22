import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Navigation from "~/components/Navigation";
import { getOrder } from "~/lib/orders";

export const meta: MetaFunction = () => {
  return [
    { title: "Order Confirmation - In Quest of Knowledge" },
    { name: "description", content: "Your order has been confirmed. Thank you for purchasing In Quest of Knowledge." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  
  if (!orderId) {
    throw new Response("Order ID required", { status: 400 });
  }

  try {
    const order = await getOrder(orderId);
    
    if (!order) {
      throw new Response("Order not found", { status: 404 });
    }

    return json({ order });
  } catch (error) {
    throw new Response("Failed to load order", { status: 500 });
  }
}

export default function Confirmation() {
  const { order } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen">
      <Navigation currentPath="/confirmation" />

      {/* Confirmation Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your order. We have received your M-Pesa payment confirmation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="card">
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">
                Order Details
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Order ID:</span>
                    <p className="font-mono text-navy-900 font-medium">{order.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="text-green-600 font-medium capitalize">Payment Confirmed</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Edition:</span>
                    <p className="text-navy-900 font-medium capitalize">{order.edition}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Quantity:</span>
                    <p className="text-navy-900 font-medium">{order.quantity}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">M-Pesa Code:</span>
                    <p className="font-mono text-navy-900 font-medium">{order.mpesaCode}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Delivery Location:</span>
                    <p className="text-navy-900 font-medium">
                      {order.deliveryLocation === 'nairobi' ? 'Nairobi' : 'Rest of Kenya'}
                    </p>
                  </div>
                </div>

                {/* Order Summary Breakdown */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {order.edition === 'paperback' ? 'Paperback' : 'Hardback'} Edition ({order.quantity}x):
                      </span>
                      <span className="text-navy-900 font-medium">KSh {order.bookAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Delivery ({order.deliveryLocation === 'nairobi' ? 'Local Nairobi' : 'Rest of Kenya'}):
                      </span>
                      <span className="text-navy-900 font-medium">KSh {order.deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="text-navy-900 font-bold">Total Paid:</span>
                      <span className="text-navy-900 font-bold">KSh {order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Delivery Information</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      <div className="text-sm">
                        <p className="text-blue-800 font-medium">
                          {order.deliveryLocation === 'nairobi' 
                            ? 'Local Nairobi Delivery' 
                            : 'Kenya-wide Delivery'
                          }
                        </p>
                        <p className="text-blue-700 mt-1">
                          Delivery Fee: KSh {order.deliveryFee.toLocaleString()} 
                          {order.deliveryLocation === 'nairobi' 
                            ? ' (Local transport within Nairobi)' 
                            : ' (Delivery to rest of Kenya)'
                          }
                        </p>
                        <p className="text-blue-600 text-xs mt-1">
                          Expected delivery: 
                          {order.deliveryLocation === 'nairobi' 
                            ? ' 2-3 business days' 
                            : ' 3-5 business days'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="card">
              <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">
                Shipping Information
              </h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-600">Customer:</span>
                  <p className="text-navy-900 font-medium">{order.firstName} {order.lastName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="text-navy-900">{order.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="text-navy-900">{order.phone}</p>
                </div>
                <div>
                  <span className="text-gray-600">Shipping Address:</span>
                  <div className="text-navy-900">
                    <p>{order.address}</p>
                    <p>{order.city}, {order.postalCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-navy-50 to-gold-50 border-navy-200">
              <h3 className="font-serif text-xl font-bold text-navy-900 mb-6">
                What Happens Next?
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-navy-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-navy-900 mb-2">Processing</h4>
                  <p className="text-sm text-gray-700">
                    We'll verify your payment and prepare your order for shipping.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-navy-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-navy-900 mb-2">Shipping</h4>
                  <p className="text-sm text-gray-700">
                    Your book will be carefully packaged and shipped to your address.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-navy-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-navy-900 mb-2">Delivery</h4>
                  <p className="text-sm text-gray-700">
                    You'll receive your copy within {order.deliveryLocation === 'nairobi' ? '2-3' : '3-5'} business days.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gold-100 rounded-lg">
                <h4 className="font-semibold text-gold-900 mb-2">📧 Confirmation Email</h4>
                <p className="text-sm text-gold-800">
                  A confirmation email has been sent to <strong>{order.email}</strong> with all the details of your order.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center">
            <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">
              Questions About Your Order?
            </h3>
            <p className="text-gray-700 mb-6">
              If you have any questions or concerns about your order, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@inquestofknowledge.com?subject=Order%20Inquiry%20-%20Order%20ID:%20{order.id}"
                className="btn-secondary"
              >
                Email Support
              </a>
              <Link to="/" className="btn-primary">
                Return to Homepage
              </Link>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-12 text-center">
            <blockquote className="text-xl lg:text-2xl font-serif italic text-navy-800 leading-relaxed mb-4">
              "Don't simply dream; discover ways to stay your goals."
            </blockquote>
            <div className="text-sm text-gray-700 mb-2">
              <p className="font-serif text-base" lang="gu">સપનાઓ દેખાવા નહીં, એને પૂરા કરવા જીવવું શીખો.</p>
            </div>
            <cite className="text-gray-600">— Dr. Vibha Dineshkumar Shah</cite>
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
                "Your order has been confirmed - thank you for your purchase"
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Delivery within 3-5 business days • Order tracking available
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
