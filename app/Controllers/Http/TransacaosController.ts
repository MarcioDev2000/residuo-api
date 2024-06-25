import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacao from 'App/Models/Transacao'
import TransacaoValidator from 'App/Validators/TransacaoValidator'
import Residuo from 'App/Models/Residuo'
import { DateTime } from 'luxon'

export default class TransacaosController {
  /**
   * Método para criar uma nova transação.
   * URL: POST /transacaos
   */
  public async store({ request, response }: HttpContextContract) {
    // Validação dos dados recebidos
    const payload = await request.validate(TransacaoValidator)

    try {
      // Cálculo do valor total da transação
      const valorTotal = payload.quantidade * payload.valor_unitario

      // Criar a transação no banco de dados
      const transacao = await Transacao.create({
        ...payload,
        valor_total: valorTotal, // Inclui o valor_total calculado
      })

      return response.created({ transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  /**
   * Método para iniciar uma negociação.
   * URL: POST /transacaos/negociar
   */
  public async negociar({ request, response }: HttpContextContract) {
    // Validação dos dados recebidos
    const payload = await request.validate(TransacaoValidator)

    try {
      // Calcula o valor total automaticamente com base na quantidade e no valor unitário
      const valorTotal = payload.quantidade * payload.valor_unitario

      // Cria a transação no banco de dados com status de negociação iniciada
      const transacao = await Transacao.create({ ...payload, valor_total: valorTotal })

      return response.created({ transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async reservar({ request, response }: HttpContextContract) {
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

      // Define a data de expiração da reserva (24 horas a partir do momento da criação)
      const dataExpiracaoReserva = DateTime.now().plus({ hours: 24 })

      // Cria a transação no banco de dados com status de reserva solicitada e data de expiração
      const transacao = await Transacao.create({
        ...payload,
        valor_total: valorTotal,
        status: 'reserva_solicitada',
        data_expiracao_reserva: dataExpiracaoReserva // Utilize o DateTime diretamente
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
    // Validação dos dados recebidos
    const payload = request.only(['transacao_id', 'quantidade_desejada', 'metodo_pagamento', 'endereco_entrega'])

    try {
      // Encontrar a transação pelo ID
      const transacao = await Transacao.findOrFail(payload.transacao_id)

      // Verificar se a reserva está expirada
      if (transacao.status === 'reserva_solicitada' && transacao.data_expiracao_reserva && transacao.data_expiracao_reserva < DateTime.now()) {
        transacao.status = 'expirada'
        await transacao.save()
        return response.badRequest({ message: 'A reserva expirou' })
      }

      // Atualizar os detalhes da transação conforme necessário
      transacao.quantidade = payload.quantidade_desejada
      transacao.metodo_pagamento = payload.metodo_pagamento
      transacao.endereco_entrega = payload.endereco_entrega
      transacao.status = 'concluida' // Atualiza o status para "concluída"

      // Se a transação foi concluída com sucesso, atualize a quantidade do resíduo
      await this.atualizarQuantidadeResiduo(transacao.residuo_id, transacao.quantidade)

      // Salva as alterações no banco de dados
      await transacao.save()

      return response.ok({ message: 'Transação finalizada com sucesso', transacao })
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
