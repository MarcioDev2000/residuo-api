import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  /**autenticação */
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '2hours',
    })
    return response.created({ user: auth.user, token })
  }
  /**Logout */
  public async destroy({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.ok({})
  }
  /**para verificar o token e retornar as informações do usuário */
  public async autoLogin({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()
      return response.ok({ user: auth.user })
    } catch {
      return response.unauthorized({ message: 'Invalid or expired token' })
    }
  }
}
