import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacao from 'App/Models/Transacao'
import TransacaoValidator from 'App/Validators/TransacaoValidator'
import Residuo from 'App/Models/Residuo'
import { DateTime } from 'luxon'

export default class TransacaosController {
  /**
   * Método para criar uma nova transação (negociação inicial).
   * URL: POST /transacaos
   */
  public async store({ request, response, auth }: HttpContextContract) {
    // Validação dos dados recebidos
    const payload = await request.validate(TransacaoValidator)

    try {
      // Calcula o valor total automaticamente com base na quantidade e no valor unitário
      const valorTotal = payload.quantidade * payload.valor_unitario

      // Obtém o ID do vendedor com base no usuário autenticado
      const vendedor = await auth.authenticate()
      const vendedorId = vendedor.id

      // Cria a transação no banco de dados com status de negociação iniciada
      const transacao = await Transacao.create({
        ...payload,
        vendedor_id: vendedorId,
        valor_total: valorTotal,
        status: 'pendente' // Ou outro status inicial apropriado
      })

      return response.created({ transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  /**
   * Método para reservar um resíduo.
   * URL: POST /transacaos/reservar
   */
  public async reservar({ request, response, auth }: HttpContextContract) {
    // Validação dos dados recebidos
    const payload = await request.validate(TransacaoValidator)

    // Verificar se o resíduo já está reservado e a reserva não expirou
    const reservaExistente = await Transacao.query()
      .where('residuo_id', payload.residuo_id)
      .where('status', 'reserva_solicitada')
      .where('data_expiracao_reserva', '>', DateTime.now().toSQL())
      .first()

    if (reservaExistente) {
      return response.badRequest({ message: 'O resíduo já está reservado' })
    }

    try {
      // Calcula o valor total automaticamente com base na quantidade e no valor unitário
      const valorTotal = payload.quantidade * payload.valor_unitario

      // Obtém o ID do vendedor com base no usuário autenticado
      const vendedor = await auth.authenticate()
      const vendedorId = vendedor.id

      // Define a data de expiração da reserva (24 horas a partir do momento da criação)
      const dataExpiracaoReserva = DateTime.now().plus({ hours: 24 })

      // Cria a transação no banco de dados com status de reserva solicitada e data de expiração
      const transacao = await Transacao.create({
        ...payload,
        vendedor_id: vendedorId,
        valor_total: valorTotal,
        status: 'reserva_solicitada',
        data_expiracao_reserva: dataExpiracaoReserva
      })

      return response.created({ transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  /**
   * Método para finalizar uma transação.
   * URL: POST /transacaos/finalizar
   */
  public async finalizar({ request, response }: HttpContextContract) {
    // Obter os dados da transação a ser finalizada
    const { transacao_id, comprador_id, quantidade_desejada, metodo_pagamento, endereco_entrega, valor_pago } = request.only(['transacao_id', 'comprador_id', 'quantidade_desejada', 'metodo_pagamento', 'endereco_entrega', 'valor_pago'])

    try {
      // Encontrar a transação pelo ID
      const transacao = await Transacao.findOrFail(transacao_id)

      // Associar o comprador à transação
      transacao.comprador_id = comprador_id

      // Atualizar os detalhes da transação conforme necessário
      transacao.quantidade = quantidade_desejada
      transacao.metodo_pagamento = metodo_pagamento
      transacao.endereco_entrega = endereco_entrega
      transacao.status = 'concluida' // Atualiza o status para "concluída"

      // Realizar outras operações necessárias, como cálculo final do valor, etc.
      await transacao.save()

      // Exemplo: Atualizar a quantidade do resíduo após a transação
      await this.atualizarQuantidadeResiduo(transacao.residuo_id, transacao.quantidade)

      // Calcular o valor total e o troco
      const valorTotal = transacao.quantidade * transacao.valor_unitario
      const troco = valor_pago - valorTotal

      return response.ok({ message: 'Transação finalizada com sucesso', transacao, troco })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  /**
   * Método privado para atualizar a quantidade de um resíduo após uma transação.
   * @param residuoId ID do resíduo que teve a transação concluída
   * @param quantidade Quantidade transacionada na transação
   */
  private async atualizarQuantidadeResiduo(residuoId: number, quantidade: number) {
    const residuo = await Residuo.findOrFail(residuoId)

    // Verifica se a quantidade disponível é suficiente para a transação
    if (residuo.quantidade < quantidade) {
      throw new Error('Quantidade insuficiente de resíduo disponível')
    }

    // Atualiza a quantidade do resíduo
    residuo.quantidade -= quantidade
    await residuo.save()
  }
}
