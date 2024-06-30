import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Transacao from 'App/Models/Transacao';
import Residuo from 'App/Models/Residuo';
import TransacaoValidator from 'App/Validators/TransacaoValidator';
import PaymentService from 'App/Services/PaymentService';

export default class TransacaosController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  // Método para criar uma nova transação (negociação inicial)
  public async store({ request, response, auth }: HttpContextContract) {
    const { residuo_id, quantidade } = await request.validate(TransacaoValidator);

    try {
      const residuo = await Residuo.findOrFail(residuo_id);
      const valorTotal = quantidade * residuo.valor_unitario;
      const vendedor = await auth.authenticate();
      const vendedorId = vendedor.id;

      const transacao = await Transacao.create({
        residuo_id,
        comprador_id: vendedorId,
        vendedor_id: vendedorId,
        quantidade,
        valor_total: valorTotal,
        status: 'iniciada'
      });

      return response.created({ transacao });
    } catch (error) {
      return response.badRequest({ message: error.message });
    }
  }

  // Método para confirmar pagamento
  // Método para confirmar pagamento
public async confirmarPagamento({ request, response }: HttpContextContract) {
  const { transacao_id } = request.only(['transacao_id']);

  try {
    const transacao = await Transacao.findOrFail(transacao_id);

    // Aqui você pode integrar o pagamento usando o PaymentService
    const paymentIntent = await this.paymentService.createPaymentIntent(transacao.valor_total, 'usd');
    // Supondo que paymentIntent seja usado para confirmar o pagamento no serviço de pagamento externo

    transacao.status = 'pagamento_realizado';
    await transacao.save();

    // Retorna o paymentIntent na resposta, mesmo que não seja utilizado posteriormente
    return response.ok({ message: 'Pagamento confirmado', transacao, paymentIntent });
  } catch (error) {
    return response.badRequest({ message: error.message });
  }
}

  // Método para confirmar recebimento do resíduo
  public async confirmarRecebimento({ request, response }: HttpContextContract) {
    const { transacao_id } = request.only(['transacao_id'])

    try {
      const transacao = await Transacao.findOrFail(transacao_id)
      transacao.status = 'residuo_recebido'
      await transacao.save()

      return response.ok({ message: 'Recebimento confirmado', transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  // Método para finalizar uma transação
  public async finalizar({ request, response }: HttpContextContract) {
    const { transacao_id, comprador_id, metodo_pagamento, endereco_entrega } = request.only(['transacao_id', 'comprador_id', 'metodo_pagamento', 'endereco_entrega'])

    try {
      const transacao = await Transacao.findOrFail(transacao_id)

       // Verifica se o pagamento foi confirmado
    if (transacao.status !== 'concluida') {
      return response.badRequest({ message: 'A transação ainda não foi concluída' })
    }

    // Verifica se o resíduo foi recebido
    if (transacao.status !== 'concluida') {
      return response.badRequest({ message: 'O resíduo ainda não foi recebido' })
    }

      transacao.comprador_id = comprador_id
      transacao.metodo_pagamento = metodo_pagamento
      transacao.endereco_entrega = endereco_entrega
      transacao.status = 'concluida'
      await transacao.save()

      await this.atualizarQuantidadeResiduo(transacao.residuo_id, transacao.quantidade)

      return response.ok({ message: 'Transação finalizada com sucesso', transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }


  // Método privado para atualizar a quantidade de um resíduo após uma transação
  private async atualizarQuantidadeResiduo(residuoId: number, quantidade: number) {
    const residuo = await Residuo.findOrFail(residuoId)

    if (residuo.quantidade < quantidade) {
      throw new Error('Quantidade insuficiente de resíduo disponível')
    }

    residuo.quantidade -= quantidade
    await residuo.save()
  }
}
