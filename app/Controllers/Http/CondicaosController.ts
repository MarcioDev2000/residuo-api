import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Condicao from 'App/Models/Condicao'

export default class CondicaosController {
  public async index({ response }: HttpContextContract){
    try{
      const condicao = await Condicao.all()
      return response.ok(condicao)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar condicao', error})
    }
  }
}
