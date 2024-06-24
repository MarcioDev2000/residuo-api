import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Residuo from 'App/Models/Residuo'
import CreateResiduoValidator from 'App/Validators/ResiduoValidator'

export default class ResiduosController {
  /**
   * Cria um novo resíduo.
   */
  public async store({ request, response }: HttpContextContract) {
    // Valida os dados da requisição
    const residuoPayload = await request.validate(CreateResiduoValidator)

    // Cria o resíduo no banco de dados
    const residuo = await Residuo.create(residuoPayload)

    return response.created({ residuo })
  }

  /**
   * Busca resíduos com base nos critérios fornecidos.
   * URL: GET /residuos
   * Exemplo de requisição: GET /residuos?tipoResiduoID=1&quantidadeMinima=10&localizacao=Brasil
   */
  public async index({ request, response }: HttpContextContract) {
    // Recebe os parâmetros de consulta da requisição
    const { tipoResiduoID, quantidadeMinima, localizacao } = request.qs()

    try {
      let query = Residuo.query().where('quantidade', '>', 0) // Filtra apenas resíduos com quantidade disponível

      // Aplica os filtros conforme os parâmetros recebidos
      if (tipoResiduoID) {
        query.where('tipo_residuo_id', tipoResiduoID)
      }
      if (quantidadeMinima) {
        query.where('quantidade', '>=', quantidadeMinima)
      }
      if (localizacao) {
        query.where('localizacao', 'ilike', `%${localizacao}%`)
      }

      // Realiza a consulta no banco de dados e obtém os resultados
      const residuos = await query.exec()

      return response.ok(residuos)
    } catch (error) {
      return response.badRequest({ message: 'Erro ao buscar resíduos', error: error.message })
    }
  }

   /**
   * Busca um resíduo específico pelo ID.
   * URL: GET /residuos/:id
   */
   public async show({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      // Busca o resíduo pelo ID, incluindo informações relacionadas
      const residuo = await Residuo.query()
        .where('id', id)
        .preload('tipoResiduo')
        .preload('condicao')
        .preload('disponibilidade')
        .firstOrFail()

      // Verifica se o resíduo está disponível para compra imediata
      const disponibilidade = residuo.estaDisponivelParaCompra() ? 'Disponível para compra imediata' : 'Verificar disponibilidade com o vendedor'

      // Adiciona a informação de disponibilidade aos detalhes do resíduo
      const detalhesResiduo = {
        id: residuo.id,
        userID: residuo.userID,
        tipoResiduo: residuo.tipoResiduo,
        condicao: residuo.condicao,
        disponibilidade: residuo.disponibilidade,
        descricao: residuo.descricao,
        quantidade: residuo.quantidade,
        localizacao: residuo.localizacao,
        fotos: residuo.fotos,
        criadoEm: residuo.criadoEm,
        atualizadoEm: residuo.atualizadoEm,
        disponibilidadeStatus: disponibilidade
      }

      return response.ok(detalhesResiduo)
    } catch (error) {
      return response.notFound({ message: 'Resíduo não encontrado', error: error.message })
    }
  }
}
