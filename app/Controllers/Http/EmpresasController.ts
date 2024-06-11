import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa'
import EmpresaValidator from 'App/Validators/EmpresaValidator'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class EmpresasController {
  public async store({ request, response }: HttpContextContract) {
    const empresaPayload = await request.validate(EmpresaValidator)

    // Verifica se o usuário existe e tem o role "empresa"
    const user = await User.findOrFail(empresaPayload.user_id)
    await user.load('roles')

    const roleEmpresa = user.roles.find(role => role.id === 2) // Supondo que o ID 2 é o role de empresa
    if (!roleEmpresa) {
      throw new BadRequestException('Usuário não possui permissão para criar uma empresa')
    }

    // Cria a empresa no banco de dados
    const empresa = await Empresa.create(empresaPayload)

    return response.created({ empresa })
  }
}
