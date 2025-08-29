/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const {defineSecret} = require("firebase-functions/params");
// Define secrets
const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

// Initialize Stripe inside functions to avoid module load issues
let stripe;
function getStripe() {
  if (!stripe) {
    stripe = require("stripe")(stripeSecretKey.value());
  }
  return stripe;
}

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create checkout session
exports.createCheckoutSession = onRequest({
  secrets: [stripeSecretKey]
}, async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { priceId, successUrl, cancelUrl, customerEmail } = req.body;

    const stripeInstance = getStripe();
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        product: 'clinote-pro',
      },
    };

    // Only add customer_email if it's provided and valid
    if (customerEmail && customerEmail.trim() !== '') {
      sessionConfig.customer_email = customerEmail;
    }

    const session = await stripeInstance.checkout.sessions.create(sessionConfig);

    res.json({ sessionId: session.id });
  } catch (error) {
    logger.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Create customer portal session
exports.createPortalSession = onRequest({
  secrets: [stripeSecretKey]
}, async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { customerId, returnUrl } = req.body;

    const stripeInstance = getStripe();
    const session = await stripeInstance.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    res.json({ url: session.url });
  } catch (error) {
    logger.error('Error creating portal session:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

// Stripe webhook handler
exports.stripeWebhook = onRequest({
  secrets: [stripeSecretKey, stripeWebhookSecret]
}, async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = stripeWebhookSecret.value();

  let event;

  try {
    const stripeInstance = getStripe();
    event = stripeInstance.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    logger.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object;
      logger.info('Subscription created:', subscriptionCreated.id);
      // Handle subscription creation
      break;
    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object;
      logger.info('Subscription updated:', subscriptionUpdated.id);
      // Handle subscription updates
      break;
    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object;
      logger.info('Subscription deleted:', subscriptionDeleted.id);
      // Handle subscription deletion
      break;
    case 'invoice.payment_succeeded':
      const invoiceSucceeded = event.data.object;
      logger.info('Payment succeeded:', invoiceSucceeded.id);
      // Handle successful payment
      break;
    case 'invoice.payment_failed':
      const invoiceFailed = event.data.object;
      logger.info('Payment failed:', invoiceFailed.id);
      // Handle failed payment
      break;
    default:
      logger.info(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});
