import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
export const stripePublishableKey = 'pk_test_51RFzaZHTgRKxNqc2zEk9RxP7c1mFCWnIUSmPbGfDqVFB5dlAOXk6h9cyuH7sFJnTrdBRs2himPz2UITXXvtreHwS000n0vij2P';

export const stripePromise = loadStripe(stripePublishableKey);

// Product configuration
export const products = {
  pro: {
    name: 'Pro',
    price: 2999, // $29.99 in cents
    currency: 'usd',
    interval: 'month',
    features: [
      'Unlimited patient encounters',
      'Real-time AI transcription',
      'Complete SOAP note generation',
      'ICD-10 & CPT code integration',
      'Chrome extension access',
      'HIPAA compliant storage',
      'Priority email support',
      'EMR integration guides'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: 'custom',
    currency: 'usd',
    interval: 'month',
    features: [
      'Everything in Pro',
      'Multi-provider accounts',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced analytics',
      'Custom training sessions',
      '24/7 phone support',
      'SLA guarantees'
    ]
  }
};

// Stripe webhook events to handle
export const webhookEvents = [
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed'
];
