const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const endpointSecret = process.env.ENDPOINTKEY;
const webHook = async (req, res) => {
  let event = req.body;
  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      //   console.log("data is ", req.body, signature, endpointSecret);
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.log(` Webhook signature verification failed.`, err.message);
      return res.status(400);
    }
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.send();
};

module.exports = {
  webHook,
};
