// app/Controllers/Http/TransacaosController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacao from 'App/Models/Transacao'
import TransacaoValidator from 'App/Validators/TransacaoValidator'
import Residuo from 'App/Models/Residuo'

export default class TransacaosController {
  /**
   * Método para criar uma nova transação.
   * URL: POST /transacaos
   */
  public async store({ request, response }: HttpContextContract) {
    // Validação dos dados recebidos
    const payload = await request.validate(TransacaoValidator)

    try {
      // Criar a transação no banco de dados
      const transacao = await Transacao.create(payload)

      // Atualizar a quantidade do resíduo correspondente
      await this.atualizarQuantidadeResiduo(transacao.residuo_id, payload.quantidade)

      // Exemplo de cálculo do valor total (considerando quantidade e outros custos)
      const valorTotal = payload.quantidade * transacao.valor_unitario
      transacao.valor_total = valorTotal
      await transacao.save()

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
      // Criar a transação no banco de dados com status de negociação iniciada
      const transacao = await Transacao.create(payload)

      // Exemplo de cálculo do valor total (considerando quantidade e outros custos)
      const valorTotal = payload.quantidade * transacao.valor_unitario
      transacao.valor_total = valorTotal
      await transacao.save()

      return response.created({ transacao })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  /**
   * Método para reservar um resíduo.
   * URL: POST /transacaos/reservar
   * Exemplo de payload para reservar um resíduo:
   * {
   *   "residuo_id": 1,
   *   "idUsuarioOferta": 1,
   *   "idUsuarioRecebe": 2,
   *   "quantidade": 10,
   *   "valor_unitario": 50,
   *   "status": "reserva_solicitada"
   * }
   */
  public async reservar({ request, response }: HttpContextContract) {
    // Validação dos dados recebidos
    const payload = await request.validate(TransacaoValidator)

    try {
      // Criar a transação no banco de dados com status de reserva solicitada
      const transacao = await Transacao.create(payload)

      // Atualizar a quantidade do resíduo correspondente (opcional, dependendo da lógica de reserva/negociação)
      await this.atualizarQuantidadeResiduo(transacao.residuo_id, payload.quantidade)

      // Exemplo de cálculo do valor total (considerando quantidade e outros custos)
      const valorTotal = payload.quantidade * transacao.valor_unitario
      transacao.valor_total = valorTotal
      await transacao.save()

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

      // Atualizar os detalhes da transação conforme necessário
      transacao.quantidade = payload.quantidade_desejada
      transacao.metodo_pagamento = payload.metodo_pagamento
      transacao.endereco_entrega = payload.endereco_entrega
      transacao.status = 'aguardando_confirmacao' // Defina o status conforme a lógica do seu sistema
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
