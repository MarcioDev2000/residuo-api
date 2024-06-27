import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacao from 'App/Models/Transacao'
import Residuo from 'App/Models/Residuo'
import TransacaoValidator from 'App/Validators/TransacaoValidator'

export default class TransacaosController {
  // Método para criar uma nova transação (negociação inicial)   
  public async store({ request, response, auth }: HttpContextContract) {
    const { residuo_id, quantidade } = await request.validate(TransacaoValidator)

    try {
      const residuo = await Residuo.findOrFail(residuo_id)
      const valorTotal = quantidade * residuo.valor_unitario
      const vendedor = await auth.authenticate()
      const vendedorId = vendedor.id

      const transacao = await Transacao.create({
        residuo_id,
        comprador_id: vendedorId,
        vendedor_id: vendedorId,
        quantidade,
        valor_total: valorTotal,
        status: 'iniciada'
      })

      return response.created({ transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  // Método para confirmar pagamento
  public async confirmarPagamento({ request, response }: HttpContextContract) {
    const { transacao_id } = request.only(['transacao_id'])

    try {
      const transacao = await Transacao.findOrFail(transacao_id)
      transacao.status = 'pagamento_realizado'
      await transacao.save()

      return response.ok({ message: 'Pagamento confirmado', transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
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
