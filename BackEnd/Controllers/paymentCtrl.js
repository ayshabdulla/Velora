const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require("../Models/orderModel");

const CreatePayment = async (req, res) => {
  try {
    

    const { products, shippingAddress } = req.body;
    const userId = req.userId;   // from auth middleware

    console.log("Products received:", products);

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    // Create Stripe Line Items
    const lineItems = products.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.productName,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    // Calculate Total
    const totalAmount = products.reduce(
      (acc, item) => acc + item.product.price,
      0
    );

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    // Save Order in Database
    await Order.create({
      user: userId,
      products: products.map(item => ({
        product: item.product._id,
        quantity: item.quantity || 1
      })),
      totalAmount,
      stripeSessionId: session.id,
      paymentStatus: "pending",
      shippingAddress,   // ✅ SAVE DELIVERY ADDRESS
    });

    res.json({ url: session.url });

  } catch (error) {
    console.log("Payment Error:", error);
    res.status(500).json({ message: "Payment failed" });
  }
};

module.exports = { CreatePayment };