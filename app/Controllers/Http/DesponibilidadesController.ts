import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Disponibilidade from 'App/Models/Disponibilidade'

export default class DesponibilidadesController {
  public async index( { response }: HttpContextContract){
    try{
      const desponibilidade = await Disponibilidade.all()
       return response.ok(desponibilidade)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar condicao', error})
    }
  }
}
