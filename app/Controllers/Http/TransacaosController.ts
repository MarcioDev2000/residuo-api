import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacao from 'App/Models/Transacao'
import Residuo from 'App/Models/Residuo'
import TransacaoValidator from 'App/Validators/TransacaoValidator'

export default class TransacaosController {
  /**
   * Método para criar uma nova transação (negociação inicial).
   * URL: POST /transacaos
   */
  public async store({ request, response, auth }: HttpContextContract) {
    // Validação dos dados recebidos
    const { residuo_id, quantidade } = await request.validate(TransacaoValidator)

    try {
      // Encontrar o resíduo associado
      const residuo = await Residuo.findOrFail(residuo_id)

      // Calcula o valor total automaticamente com base na quantidade e no valor unitário do resíduo
      const valorTotal = quantidade * residuo.valor_unitario

      // Obtém o ID do vendedor com base no usuário autenticado
      const vendedor = await auth.authenticate()
      const vendedorId = vendedor.id

      // Cria a transação no banco de dados com status de negociação iniciada
      const transacao = await Transacao.create({
        residuo_id,
        comprador_id: vendedorId, // Usando o mesmo ID para comprador e vendedor neste exemplo
        vendedor_id: vendedorId,
        quantidade,
        valor_total: valorTotal, // Apenas valor_total é necessário aqui
        status: 'pendente' // Ou outro status inicial apropriado
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
    const { transacao_id, comprador_id, metodo_pagamento, endereco_entrega } = request.only(['transacao_id', 'comprador_id', 'metodo_pagamento', 'endereco_entrega'])

    try {
      // Encontrar a transação pelo ID
      const transacao = await Transacao.findOrFail(transacao_id)

      // Associar o comprador à transação
      transacao.comprador_id = comprador_id

      // Atualizar os detalhes da transação conforme necessário
      transacao.metodo_pagamento = metodo_pagamento
      transacao.endereco_entrega = endereco_entrega
      transacao.status = 'concluida' // Atualiza o status para "concluída"

      // Realizar outras operações necessárias, como cálculo final do valor, etc.
      await transacao.save()

      // Exemplo: Atualizar a quantidade do resíduo após a transação
      await this.atualizarQuantidadeResiduo(transacao.residuo_id, transacao.quantidade)

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
