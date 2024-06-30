import Stripe from 'stripe';
import stripeConfig from '../../config/stripe';

export default class PaymentService {
  private stripe: Stripe;

  constructor() {
    let apiVersion: string | null = null;

    if (stripeConfig.options.apiVersion === '2022-11-15') {
      apiVersion = stripeConfig.options.apiVersion;
    }

    this.stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion: apiVersion as any, // Use 'as any' to bypass type check temporarily
    });
  }

  async createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }

  async webhookHandler(payload: any, signature: string): Promise<any> {
    try {
      // Use 'any' as type for webhook event temporarily
      const event = this.stripe.webhooks.constructEvent(payload, signature, stripeConfig.webhookSecret);
      return event;
    } catch (error) {
      throw new Error(`Failed to handle webhook: ${error.message}`);
    }
  }
}
