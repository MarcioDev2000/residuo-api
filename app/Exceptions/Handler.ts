import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: Exception, ctx: HttpContextContract) {
    if (error.status === 422)
      return ctx.response.status(error.status).send({
        code: 'BAD_REQUEST',
        message: error.message,
        status: error.status,
        errors: error['messages']?.errors ? error['messages'].errors : '',
      })
    else if (error.code === 'E_ROW_NOT_FOUND')
      return ctx.response.status(error.status).send({
        code: 'BAD_REQUEST',
        message: 'resource not found',
        status: 404,
      })
    else if (['E_INVALID_AUTH_UID', 'E_INVALID_AUTH_PASSWORD'].includes(error.code || ''))
      return ctx.response.status(error.status).send({
        code: 'BAD_REQUEST',
        message: 'invalid credentials',
        status: 400,
      })
    // Adicionando mais tratamentos de erro
    else if (error.code === 'E_CUSTOM_ERROR')
      return ctx.response.status(error.status).send({
        code: 'CUSTOM_ERROR',
        message: 'custom error message',
        status: 500,
      })
    else if (error.code === 'E_INSUFFICIENT_PERMISSIONS')
      return ctx.response.status(error.status).send({
        code: 'INSUFFICIENT_PERMISSIONS',
        message: 'insufficient permissions',
        status: 403,
      })
    else if (error.code === 'E_INTERNAL_SERVER_ERROR')
      return ctx.response.status(error.status).send({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal server error',
        status: 500,
      })
    // Adicione mais condições para outros tipos de erro aqui
    else if (error.code === 'E_ANOTHER_ERROR')
      return ctx.response.status(error.status).send({
        code: 'ANOTHER_ERROR',
        message: 'another error message',
        status: 500,
      })

    return super.handle(error, ctx)
  }
}
