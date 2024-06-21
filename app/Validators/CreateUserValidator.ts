import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8)]),
    nome: schema.string({ trim: true }),
    sobrenome: schema.string({ trim: true }),
    telefone: schema.string({ trim: true }, [
      rules.minLength(9),
      rules.maxLength(9),
      rules.regex(/^[0-9]{9}$/), // Regra para garantir que o telefone tenha exatamente 9 dígitos numéricos
    ]),
    nif: schema.string({ trim: true }, [
      rules.minLength(14),
      rules.maxLength(14),
      rules.regex(/^[A-Za-z0-9]{14}$/), // Regra para garantir que o NIF tenha exatamente 14 caracteres alfanuméricos
    ]),
    endereco: schema.string({ trim: true }),
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
    'telefone.minLength': 'O telefone deve ter exatamente 9 dígitos',
    'telefone.maxLength': 'O telefone deve ter exatamente 9 dígitos',
    'telefone.regex': 'O telefone deve ser composto apenas por números e ter exatamente 9 dígitos',
    'nif.required': 'O campo de nif é obrigatório',
    'nif.minLength': 'O NIF deve ter exatamente 14 caracteres',
    'nif.maxLength': 'O NIF deve ter exatamente 14 caracteres',
    'nif.regex': 'O NIF deve ser composto apenas por letras e números, e ter exatamente 14 caracteres',
  }
}
