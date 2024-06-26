import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Transacao from 'App/Models/Transacao'
export default class ProfileController {
  /**
   * Retorna o perfil do usuário.
   * URL: GET /profile
   */
  public async show({ auth, response }: HttpContextContract) {
    try {
      const user = await User.query().where('id', auth.user!.id).preload('compras').preload('vendas').firstOrFail()
      return response.ok(user)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  /**
   * Retorna as compras do usuário.
   * URL: GET /profile/compras
   */
  public async showCompras({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user!
      const compras = await Transacao.query().where('comprador_id', user.id).where('status', 'concluida').preload('residuo')
      return response.ok(compras)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
