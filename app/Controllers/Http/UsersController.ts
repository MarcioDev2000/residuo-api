import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Role from 'App/Models/Role'
import UserRole from 'App/Models/UserRole' // Corrigido o nome do modelo

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const userPayload = await request.validate(CreateUserValidator)

    // Verifica se já existe um usuário com o mesmo e-mail
    const existingUser = await User.findBy('email', userPayload.email)
    if (existingUser) {
      throw new BadRequestException('E-mail já está em uso')
    }

    // Obtém o ID do role selecionado pelo usuário
    const roleId = request.input('role_id')

    // Verifica se o role existe
    const role = await Role.findOrFail(roleId)

     // Verifica se o ID do role corresponde a "individuo" (ID 1) ou "empresa" (ID 2)
     if (role.id !== 1 && role.id !== 2) {
      throw new BadRequestException('Tipo de usuário inválido')
    }

    // Cria o usuário no banco de dados
    const user = await User.create(userPayload)

    // Associa o role ao usuário na tabela user_roles
    await UserRole.create({
      userId: user.id,
      roleId: role.id,
    })

    return response.created({ user })
  }
}
