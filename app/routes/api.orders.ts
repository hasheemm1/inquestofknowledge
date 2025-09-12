import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createOrder } from "~/lib/orders";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const orderData = await request.json();
    const orderId = await createOrder(orderData);
    return json({ orderId });
  } catch (error) {
    console.error('API Error creating order:', error);
    return json({ error: "Failed to create order" }, { status: 500 });
  }
}
