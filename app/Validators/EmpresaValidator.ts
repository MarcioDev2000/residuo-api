import { schema, rules,  CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmpresaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([
      rules.exists({ table: 'users', column: 'id' })
    ]),
    nome: schema.string(),
    tipo_empresa_id: schema.number([
      rules.exists({ table: 'tipos_empresas', column: 'id' })
    ]),
    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' })
    ]),
    telefone: schema.string(),
    endereco: schema.string(),
    nif: schema.string()
  })

  public messages: CustomMessages = {
    'user_id.exists': 'O ID do usuário especificado não existe',
    'nome.required': 'O nome da empresa é obrigatório',
    'tipo_empresa_id.exists': 'O tipo de empresa especificado não existe',
    'municipio_id.exists': 'O município especificado não existe',
    'telefone.required': 'O telefone da empresa é obrigatório',
    'endereco.required': 'O endereço da empresa é obrigatório',
    'nif.required': 'O NIF da empresa é obrigatório'
  }
}
