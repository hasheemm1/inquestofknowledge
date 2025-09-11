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
            
            <h1 className="font-serif text-4xl font-bold text-primary-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-primary-600">
              Thank you for your order. We have received your M-Pesa payment confirmation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="card">
              <h2 className="font-serif text-2xl font-bold text-primary-900 mb-6">
                Order Details
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-primary-600">Order ID:</span>
                    <p className="font-mono text-primary-900 font-medium">{order.id}</p>
                  </div>
                  <div>
                    <span className="text-primary-600">Status:</span>
                    <p className="text-green-600 font-medium capitalize">Payment Confirmed</p>
                  </div>
                  <div>
                    <span className="text-primary-600">Edition:</span>
                    <p className="text-primary-900 font-medium capitalize">{order.edition}</p>
                  </div>
                  <div>
                    <span className="text-primary-600">Quantity:</span>
                    <p className="text-primary-900 font-medium">{order.quantity}</p>
                  </div>
                  <div>
                    <span className="text-primary-600">M-Pesa Code:</span>
                    <p className="font-mono text-primary-900 font-medium">{order.mpesaCode}</p>
                  </div>
                  <div>
                    <span className="text-primary-600">Total Paid:</span>
                    <p className="text-primary-900 font-bold">KSh {order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="card">
              <h2 className="font-serif text-2xl font-bold text-primary-900 mb-6">
                Shipping Information
              </h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-primary-600">Customer:</span>
                  <p className="text-primary-900 font-medium">{order.firstName} {order.lastName}</p>
                </div>
                <div>
                  <span className="text-primary-600">Email:</span>
                  <p className="text-primary-900">{order.email}</p>
                </div>
                <div>
                  <span className="text-primary-600">Phone:</span>
                  <p className="text-primary-900">{order.phone}</p>
                </div>
                <div>
                  <span className="text-primary-600">Shipping Address:</span>
                  <div className="text-primary-900">
                    <p>{order.address}</p>
                    <p>{order.city}, {order.postalCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-primary-50 to-gold-50 border-primary-200">
              <h3 className="font-serif text-xl font-bold text-primary-900 mb-6">
                What Happens Next?
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Processing</h4>
                  <p className="text-sm text-primary-700">
                    We'll verify your payment and prepare your order for shipping.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Shipping</h4>
                  <p className="text-sm text-primary-700">
                    Your book will be carefully packaged and shipped to your address.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Delivery</h4>
                  <p className="text-sm text-primary-700">
                    You'll receive your copy within 3-5 business days in Nairobi.
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
            <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
              Questions About Your Order?
            </h3>
            <p className="text-primary-700 mb-6">
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
            <blockquote className="text-xl lg:text-2xl font-serif italic text-primary-800 leading-relaxed mb-4">
              "Don't simply dream; discover ways to stay your goals."
            </blockquote>
            <div className="text-sm text-primary-700 mb-2">
              <p className="font-serif text-base" lang="gu">સપનાઓ દેખાવા નહીં, એને પૂરા કરવા જીવવું શીખો.</p>
            </div>
            <cite className="text-primary-600">— Dr. Vibha Dineshkumar Shah</cite>
          </div>
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
