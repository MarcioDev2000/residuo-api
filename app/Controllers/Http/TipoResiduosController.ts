import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoResiduo from 'App/Models/TipoResiduo'

export default class TipoResiduosController {
  public async index({ response }: HttpContextContract) {
    try {
      const tipoResiduos = await TipoResiduo.all()
      return response.ok(tipoResiduos)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar tipos de resíduos', error })
    }
  }
}
