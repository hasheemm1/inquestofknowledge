import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import Navigation from "~/components/Navigation";
import { createOrder, calculateTotal } from "~/lib/orders";
import type { FormErrors, OrderData } from "~/types/order";

export const meta: MetaFunction = () => {
  return [
    { title: "Order - In Quest of Knowledge" },
    { name: "description", content: "Order your copy of In Quest of Knowledge - A Biography of Dr. Vibha Dineshkumar Shah" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const edition = url.searchParams.get("edition") as 'paperback' | 'hardback' || 'paperback';
  
  return json({ edition });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  const orderData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    postalCode: formData.get("postalCode") as string,
    edition: formData.get("edition") as 'paperback' | 'hardback',
    quantity: parseInt(formData.get("quantity") as string) || 1,
  };

  // Validation
  const errors: FormErrors = {};
  
  if (!orderData.firstName?.trim()) errors.firstName = "First name is required";
  if (!orderData.lastName?.trim()) errors.lastName = "Last name is required";
  if (!orderData.email?.trim()) errors.email = "Email is required";
  if (!orderData.phone?.trim()) errors.phone = "Phone number is required";
  if (!orderData.address?.trim()) errors.address = "Address is required";
  if (!orderData.city?.trim()) errors.city = "City is required";
  if (!orderData.postalCode?.trim()) errors.postalCode = "Postal code is required";
  
  if (orderData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors, orderData });
  }

  try {
    const totalAmount = calculateTotal(orderData.edition, orderData.quantity);
    
    const orderId = await createOrder({
      ...orderData,
      totalAmount,
      status: 'pending',
    });

    return redirect(`/payment?orderId=${orderId}`);
  } catch (error) {
    return json({ 
      errors: { general: "Failed to create order. Please try again." },
      orderData 
    });
  }
}

export default function Order() {
  const { edition: defaultEdition } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  
  const [edition, setEdition] = useState<'paperback' | 'hardback'>(defaultEdition);
  const [quantity, setQuantity] = useState(1);
  
  const isSubmitting = navigation.state === "submitting";
  const total = calculateTotal(edition, quantity);

  return (
    <div className="min-h-screen">
      <Navigation currentPath="/order" />

      {/* Order Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold text-primary-900 mb-4">
              Order Your Copy
            </h1>
            <p className="text-lg text-primary-600">
              Fill in your details below to order "In Quest of Knowledge"
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="font-serif text-2xl font-bold text-primary-900 mb-6">
                  Shipping Information
                </h2>

                {actionData?.errors?.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {actionData.errors.general}
                  </div>
                )}

                <Form method="post" className="space-y-6">
                  <input type="hidden" name="edition" value={edition} />
                  <input type="hidden" name="quantity" value={quantity} />

                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-primary-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue={actionData?.orderData?.firstName || ""}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          actionData?.errors?.firstName ? 'border-red-300' : 'border-primary-300'
                        }`}
                        required
                      />
                      {actionData?.errors?.firstName && (
                        <p className="mt-1 text-sm text-red-600">{actionData.errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-primary-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        defaultValue={actionData?.orderData?.lastName || ""}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          actionData?.errors?.lastName ? 'border-red-300' : 'border-primary-300'
                        }`}
                        required
                      />
                      {actionData?.errors?.lastName && (
                        <p className="mt-1 text-sm text-red-600">{actionData.errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={actionData?.orderData?.email || ""}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          actionData?.errors?.email ? 'border-red-300' : 'border-primary-300'
                        }`}
                        required
                      />
                      {actionData?.errors?.email && (
                        <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        defaultValue={actionData?.orderData?.phone || ""}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          actionData?.errors?.phone ? 'border-red-300' : 'border-primary-300'
                        }`}
                        required
                      />
                      {actionData?.errors?.phone && (
                        <p className="mt-1 text-sm text-red-600">{actionData.errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-primary-700 mb-2">
                      Street Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      defaultValue={actionData?.orderData?.address || ""}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        actionData?.errors?.address ? 'border-red-300' : 'border-primary-300'
                      }`}
                      required
                    />
                    {actionData?.errors?.address && (
                      <p className="mt-1 text-sm text-red-600">{actionData.errors.address}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-primary-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        defaultValue={actionData?.orderData?.city || ""}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          actionData?.errors?.city ? 'border-red-300' : 'border-primary-300'
                        }`}
                        required
                      />
                      {actionData?.errors?.city && (
                        <p className="mt-1 text-sm text-red-600">{actionData.errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-primary-700 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        defaultValue={actionData?.orderData?.postalCode || ""}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          actionData?.errors?.postalCode ? 'border-red-300' : 'border-primary-300'
                        }`}
                        required
                      />
                      {actionData?.errors?.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{actionData.errors.postalCode}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
                  </button>
                </Form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Book Cover */}
              <div className="flex justify-center">
                <img 
                  src="/images/cover.png" 
                  alt="In Quest of Knowledge - Book Cover"
                  className="w-48 h-auto rounded-lg shadow-lg border border-gray-200"
                />
              </div>
              
              <div className="card">
                <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                  Order Summary
                </h3>

                {/* Edition Selection */}
                <div className="space-y-3 mb-6">
                  <label className="block text-sm font-medium text-primary-700">
                    Edition
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="paperback"
                        checked={edition === 'paperback'}
                        onChange={(e) => setEdition(e.target.value as 'paperback')}
                        className="mr-3 text-primary-600"
                      />
                      <span className="text-primary-700">Paperback - KSh 2,500</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="hardback"
                        checked={edition === 'hardback'}
                        onChange={(e) => setEdition(e.target.value as 'hardback')}
                        className="mr-3 text-primary-600"
                      />
                      <span className="text-primary-700">Hardback - KSh 3,500</span>
                    </label>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-primary-700 mb-2">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-primary-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold text-primary-900">
                    <span>Total:</span>
                    <span>KSh {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="card bg-gold-50 border-gold-200">
                <h4 className="font-medium text-primary-900 mb-2">Payment Method</h4>
                <p className="text-sm text-primary-700 mb-3">
                  We accept M-Pesa payments. After submitting your order, you'll receive payment instructions.
                </p>
                <div className="flex items-center text-primary-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Secure M-Pesa Payment</span>
                </div>
              </div>
            </div>
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
