import { stripePromise } from '../config/stripe';

export interface CreateCheckoutSessionParams {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export class StripeService {
  static async createCheckoutSession(params: CreateCheckoutSessionParams) {
    try {
      const response = await fetch('https://us-central1-clinote-960b0.cloudfunctions.net/createCheckoutSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      return sessionId;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  static async redirectToCheckout(sessionId: string) {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  }

  static async createCustomerPortalSession(customerId: string, returnUrl: string) {
    try {
      const response = await fetch('https://us-central1-clinote-960b0.cloudfunctions.net/createPortalSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }
  }
}
