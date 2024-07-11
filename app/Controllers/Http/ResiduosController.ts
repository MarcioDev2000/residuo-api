import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Residuo from 'App/Models/Residuo'
import CreateResiduoValidator from 'App/Validators/ResiduoValidator'

export default class ResiduosController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate();
      const residuoPayload = await request.validate(CreateResiduoValidator);
      residuoPayload.user_id = user.id; // Atribui o ID do usuário autenticado ao payload

      const residuo = await Residuo.create(residuoPayload);
      return response.created({ residuo });
    } catch (error) {
      return response.badRequest({ message: 'Erro ao criar resíduo', error: error.message });
    }
  }
  public async index({ request, response }: HttpContextContract) {
    const { tipoResiduoID, quantidadeMinima, localizacao } = request.qs()

    try {
      let query = Residuo.query().where('quantidade', '>', 0)

      if (tipoResiduoID) {
        query.where('tipo_residuo_id', tipoResiduoID)
      }
      if (quantidadeMinima) {
        query.where('quantidade', '>=', quantidadeMinima)
      }
      if (localizacao) {
        query.where('localizacao', 'ilike', `%${localizacao}%`)
      }

      const residuos = await query.exec()
      return response.ok(residuos)
    } catch (error) {
      return response.badRequest({ message: 'Erro ao buscar resíduos', error: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const residuo = await Residuo.query()
        .where('id', id)
        .preload('tipoResiduo')
        .preload('condicao')
        .preload('disponibilidade')
        .firstOrFail()

      const disponibilidade = residuo.estaDisponivelParaCompra() ? 'Disponível para compra imediata' : 'Verificar disponibilidade com o vendedor'

      const detalhesResiduo = {
        id: residuo.id,
        userID: residuo.userID,
        tipoResiduo: residuo.tipoResiduoID,
        condicao: residuo.condicaoID,
        disponibilidade: residuo.disponibilidadeID,
        descricao: residuo.descricao,
        quantidade: residuo.quantidade,
        localizacao: residuo.localizacao,
        fotos: residuo.fotos,
        disponibilidadeStatus: disponibilidade
      }

      return response.ok(detalhesResiduo)
    } catch (error) {
      return response.notFound({ message: 'Resíduo não encontrado', error: error.message })
    }
  }
}
