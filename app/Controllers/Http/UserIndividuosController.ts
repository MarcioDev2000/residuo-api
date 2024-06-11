import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsuarioIndividual from 'App/Models/UsuarioIndividual'
import UsuarioIndividualValidator from 'App/Validators/UsuarioIndividualValidator'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class UserIndividuosController {
  public async store({ request, response }: HttpContextContract) {
    const usuarioPayload = await request.validate(UsuarioIndividualValidator)

    // Verifica se o usuário existe e tem o role "individuo"
    const user = await User.findOrFail(usuarioPayload.user_id)
    await user.load('roles')

    const roleIndividuo = user.roles.find(role => role.id === 1) // Supondo que o ID 1 é o role de individuo
    if (!roleIndividuo) {
      throw new BadRequestException('Usuário não possui permissão para criar um usuário individual')
    }

    // Cria o usuário individual no banco de dados
    const usuarioIndividual = await UsuarioIndividual.create(usuarioPayload)

    return response.created({ usuarioIndividual })
  }
}
