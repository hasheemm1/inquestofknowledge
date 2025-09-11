import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import Navigation from "~/components/Navigation";
import { getOrder, updateOrder } from "~/lib/orders";
import type { FormErrors } from "~/types/order";

export const meta: MetaFunction = () => {
  return [
    { title: "Payment - In Quest of Knowledge" },
    { name: "description", content: "Complete your M-Pesa payment for In Quest of Knowledge" },
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const orderId = formData.get("orderId") as string;
  
  const paymentData = {
    mpesaCode: formData.get("mpesaCode") as string,
    mpesaPhone: formData.get("mpesaPhone") as string,
  };

  // Validation
  const errors: FormErrors = {};
  
  if (!paymentData.mpesaCode?.trim()) {
    errors.mpesaCode = "M-Pesa confirmation code is required";
  }
  
  if (!paymentData.mpesaPhone?.trim()) {
    errors.mpesaPhone = "M-Pesa phone number is required";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors, paymentData });
  }

  try {
    await updateOrder(orderId, {
      mpesaCode: paymentData.mpesaCode,
      mpesaPhone: paymentData.mpesaPhone,
      status: 'payment_confirmed',
    });

    return redirect(`/confirmation?orderId=${orderId}`);
  } catch (error) {
    return json({ 
      errors: { general: "Failed to confirm payment. Please try again." },
      paymentData 
    });
  }
}

export default function Payment() {
  const { order } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen">
      <Navigation currentPath="/payment" />

      {/* Payment Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold text-primary-900 mb-4">
              Complete Your Payment
            </h1>
            <p className="text-lg text-primary-600">
              Please make your M-Pesa payment and provide the confirmation details below
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Instructions */}
            <div className="card">
              <h2 className="font-serif text-2xl font-bold text-primary-900 mb-6">
                M-Pesa Payment Instructions
              </h2>

              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-4">Step 1: Make M-Pesa Payment</h3>
                  <div className="space-y-2 text-green-800">
                    <p><strong>Pay Bill Number:</strong> 247247</p>
                    <p><strong>Account Number:</strong> INQUESTOFKNOWLEDGE</p>
                    <p><strong>Amount:</strong> KSh {order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-4">Step 2: Get Confirmation Code</h3>
                  <p className="text-blue-800">
                    After completing the payment, you will receive an M-Pesa confirmation message with a unique code. 
                    Please enter this code in the form below.
                  </p>
                </div>

                <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gold-900 mb-4">Need Help?</h3>
                  <p className="text-gold-800 mb-2">
                    If you have any issues with payment, please contact us:
                  </p>
                  <div className="text-sm text-gold-700">
                    <p>Email: info@inquestofknowledge.com</p>
                    <p>Phone: +254 XXX XXX XXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Form */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-serif text-xl font-bold text-primary-900 mb-6">
                  Payment Confirmation
                </h3>

                {actionData?.errors?.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {actionData.errors.general}
                  </div>
                )}

                <Form method="post" className="space-y-6">
                  <input type="hidden" name="orderId" value={order.id} />

                  <div>
                    <label htmlFor="mpesaCode" className="block text-sm font-medium text-primary-700 mb-2">
                      M-Pesa Confirmation Code *
                    </label>
                    <input
                      type="text"
                      id="mpesaCode"
                      name="mpesaCode"
                      placeholder="e.g., QA72HGKL9M"
                      defaultValue={actionData?.paymentData?.mpesaCode || ""}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        actionData?.errors?.mpesaCode ? 'border-red-300' : 'border-primary-300'
                      }`}
                      required
                    />
                    {actionData?.errors?.mpesaCode && (
                      <p className="mt-1 text-sm text-red-600">{actionData.errors.mpesaCode}</p>
                    )}
                    <p className="mt-1 text-sm text-primary-600">
                      This is the code you received in your M-Pesa confirmation SMS
                    </p>
                  </div>

                  <div>
                    <label htmlFor="mpesaPhone" className="block text-sm font-medium text-primary-700 mb-2">
                      M-Pesa Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="mpesaPhone"
                      name="mpesaPhone"
                      placeholder="254XXXXXXXXX"
                      defaultValue={actionData?.paymentData?.mpesaPhone || ""}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        actionData?.errors?.mpesaPhone ? 'border-red-300' : 'border-primary-300'
                      }`}
                      required
                    />
                    {actionData?.errors?.mpesaPhone && (
                      <p className="mt-1 text-sm text-red-600">{actionData.errors.mpesaPhone}</p>
                    )}
                    <p className="mt-1 text-sm text-primary-600">
                      The phone number you used to make the M-Pesa payment
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Confirming Payment..." : "Confirm Payment"}
                  </button>
                </Form>
              </div>

              {/* Order Summary */}
              <div className="card">
                <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-600">Order ID:</span>
                    <span className="font-mono text-primary-800">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-600">Edition:</span>
                    <span className="text-primary-800 capitalize">{order.edition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-600">Quantity:</span>
                    <span className="text-primary-800">{order.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-600">Customer:</span>
                    <span className="text-primary-800">{order.firstName} {order.lastName}</span>
                  </div>
                  <div className="border-t border-primary-200 pt-3 flex justify-between font-semibold">
                    <span className="text-primary-800">Total Amount:</span>
                    <span className="text-primary-900">KSh {order.totalAmount.toLocaleString()}</span>
                  </div>
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
