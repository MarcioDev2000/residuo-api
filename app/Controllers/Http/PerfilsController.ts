// app/Controllers/Http/ProfileController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Transacao from 'App/Models/Transacao'
import { DateTime } from 'luxon'

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

  /**
   * Retorna as reservas do usuário.
   * URL: GET /profile/reservas
   */
  public async showReservas({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user!
      const reservas = await Transacao.query()
        .where('comprador_id', user.id)
        .andWhere('status', 'reserva_solicitada')
        .andWhere('data_expiracao_reserva', '>', DateTime.now().toSQL())
        .preload('residuo')

      return response.ok(reservas)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
