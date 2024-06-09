import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8)]),
    nome: schema.string({ trim: true }, [rules.required()]),
    sobrenome: schema.string({ trim: true }, [rules.required()]),
    telefone: schema.string({ trim: true }, [rules.required()]),
    roleIds: schema.array.optional().members(schema.number()),
  })

  public messages: CustomMessages = {
    'email.required': 'O campo de e-mail é obrigatório',
    'email.email': 'O e-mail deve ser válido',
    'email.unique': 'Este e-mail já está em uso',
    'password.required': 'O campo de senha é obrigatório',
    'password.minLength': 'A senha deve ter pelo menos 8 caracteres',
    'nome.required': 'O campo de nome é obrigatório',
    'sobrenome.required': 'O campo de sobrenome é obrigatório',
    'telefone.required': 'O campo de telefone é obrigatório',
  }
}
