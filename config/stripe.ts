/*
 * @mezielabs/adonis-stripe
 *
 * (c) Chimezie Enyinnaya <chimezie@mezielabs.dev>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Env from '@ioc:Adonis/Core/Env'
import { StripeConfig } from '@ioc:Mezielabs/Stripe'

const stripeConfig: StripeConfig = {
  secretKey: Env.get('STRIPE_SECRET_KEY') as string,
  publicKey: Env.get('STRIPE_PUBLIC_KEY') as string,
  webhookSecret: Env.get('STRIPE_WEBHOOK_SECRET') as string,

  options: {
    apiVersion: Env.get('STRIPE_API_VERSION', '2020-08-27') as string,
    typescript: Env.get('STRIPE_TYPESCRIPT', true) as boolean,
  },
}

export default stripeConfig
