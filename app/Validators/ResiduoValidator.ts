// app/Validators/ResiduoValidator.ts

import { schema,CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateResiduoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number(),
    tipo_residuo_id: schema.number(),
    condicao_id: schema.number(),
    disponibilidade_id: schema.number(),
    descricao: schema.string.optional({ trim: true }),
    quantidade: schema.number(),
    localizacao: schema.string.optional({ trim: true }),
    fotos: schema.string.optional({ trim: true }),
    valor_unitario: schema.number(), // Adiciona o valor_unitario como obrigatório
  })

  public messages: CustomMessages = {
    'user_id.required': 'O ID do usuário é obrigatório',
    'tipo_residuo_id.required': 'O ID do tipo de resíduo é obrigatório',
    'condicao_id.required': 'O ID da condição é obrigatório',
    'disponibilidade_id.required': 'O ID da disponibilidade é obrigatório',
    'quantidade.required': 'A quantidade do resíduo é obrigatória',
    'valor_unitario.required': 'O valor unitário do resíduo é obrigatório',
  }
}
