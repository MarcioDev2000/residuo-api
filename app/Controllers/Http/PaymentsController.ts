import PaymentService from 'App/Services/PaymentService';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Transacao from 'App/Models/Transacao';

export default class PaymentsController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  public async createPaymentIntent({ request, response }: HttpContextContract) {
    try {
      const { amount, currency } = request.only(['amount', 'currency']);
      const paymentIntent = await this.paymentService.createPaymentIntent(amount, currency);
      return response.status(200).json(paymentIntent);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  public async handleStripeWebhook({ request, response }: HttpContextContract) {
    try {
      const payload = request.raw();
      if (!payload) {
        throw new Error('Payload do webhook não encontrado');
      }

      const payloadObject = JSON.parse(payload); // Parse o payload para objeto JSON

      const signature = request.header('Stripe-Signature') as string;

      // Use a signature para validar o webhook, por exemplo:
      if (!signature) {
        throw new Error('Assinatura do webhook não encontrada');
      }

      // Verifique se o payload é do tipo 'payment_intent.succeeded'
      if (payloadObject.type === 'payment_intent.succeeded') {
        const paymentIntent = payloadObject.data.object;
        const { transacao_id } = paymentIntent.metadata; // Supondo que você tenha armazenado o ID da transação no metadata do pagamento

        // Atualize o status da transação correspondente no seu banco de dados
        // Exemplo:
        const transacao = await Transacao.findOrFail(transacao_id);
        transacao.status = 'pagamento_confirmado';
        await transacao.save();
      }

      // Retorne uma resposta adequada para o Stripe
      return response.status(200).send('Webhook received successfully');
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
