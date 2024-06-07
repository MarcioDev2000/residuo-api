import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import BadRequestException from 'App/Exceptions/BadRequestException'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {

      const data = await request.validate(CreateUserValidator)
      // Verifica se já existe um usuário com o mesmo e-mail
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) {
        throw new BadRequestException('E-mail já está em uso')
      }
      // Cria um novo usuário com os dados fornecidos
      const user = await User.create(data)
      return response.created({ user })
  }
}
