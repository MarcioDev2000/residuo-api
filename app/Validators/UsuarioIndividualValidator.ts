import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsuarioIndividualValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([
      rules.exists({ table: 'users', column: 'id' })
    ]),
    nome: schema.string(),
    sobrenome: schema.string(),
    telefone: schema.string(),
    endereco: schema.string(),
    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'user_id.exists': 'O ID do usuário especificado não existe',
    'nome.required': 'O nome do usuário é obrigatório',
    'sobrenome.required': 'O sobrenome do usuário é obrigatório',
    'telefone.required': 'O telefone do usuário é obrigatório',
    'endereco.required': 'O endereço do usuário é obrigatório',
    'municipio_id.exists': 'O município especificado não existe'
  }
}
