import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacao from 'App/Models/Transacao'
export default class PerfilsController {
  public async show({ auth, response }: HttpContextContract) {
    try {
      // Recupera o usuário autenticado
      const user = auth.user!

      // Recupera as transações onde o usuário é o comprador
      const compras = await Transacao.query()
        .where('comprador_id', user.id)
        .whereIn('status', ['concluida', 'expirada']) // Filtra compras finalizadas

      // Recupera as transações onde o usuário é o vendedor
      const reservas = await Transacao.query()
        .where('vendedor_id', user.id)
        .whereIn('status', ['reserva_solicitada']) // Filtra reservas em andamento

      return response.ok({ compras, reservas })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
