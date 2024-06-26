import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TokenExpired from 'App/Exceptions/TokenExpired'
import User from 'App/Models/User'
import ForgotPassword from 'App/Validators/ForgotPasswordValidator'
import ResetPassword from 'App/Validators/ResetPasswordValidator'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class PasswordsController {
  public async forgotPassword({ request, response }: HttpContextContract) {
    const { email, resetPasswordUrl } = await request.validate(ForgotPassword)
    const user = await User.findByOrFail('email', email)

    const random = await promisify(randomBytes)(24)
    const token = random.toString('hex')
    await user.related('tokens').updateOrCreate(
      { userId: user.id },
      {
        token,
      }
    )

    const resetPasswordUrlWithToken = `${resetPasswordUrl}?token=${token}`

    await Mail.send((message) => {
      message
        .from('no-reply@roleplay.com')
        .to(email)
        .subject('Roleplay: Recuperação de Senha')
        .htmlView('email/forgotpassword', {
          productName: 'Roleplay',
          name: user.nome,
          resetPasswordUrl: resetPasswordUrlWithToken,
        })
    })

    return response.noContent()
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const { token, password } = await request.validate(ResetPassword)

    const userByToken = await User.query()
      .whereHas('tokens', (query) => {
        query.where('token', token)
      })
      .preload('tokens')
      .firstOrFail()

    // Calcula a diferença de tempo em minutos
    const tokenAgeInMinutes = userByToken.tokens[0].createdAt.diffNow('minutes').minutes

    // Verifica se a diferença é maior que 15 minutos
    if (tokenAgeInMinutes > 15) throw new TokenExpired()

    // Atualiza a senha do usuário
    userByToken.password = password
    await userByToken.save()

    // Deleta o token usado
    await userByToken.tokens[0].delete()

    return response.noContent()
  }
}
