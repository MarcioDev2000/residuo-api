// app/Validators/CreateResiduoValidator.ts

import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateResiduoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userID: schema.number(),
    tipoResiduoID: schema.number(),
    condicaoID: schema.number(),
    disponibilidadeID: schema.number(),
    descricao: schema.string({ trim: true }),
    quantidade: schema.number(),
    localizacao: schema.string({ trim: true }),
    fotos: schema.array().members(schema.string()),
  })

  public messages: CustomMessages = {
    'userID.required': 'O ID do usuário é obrigatório',
    'tipoResiduoID.required': 'O ID do tipo de resíduo é obrigatório',
    'condicaoID.required': 'O ID da condição é obrigatório',
    'disponibilidadeID.required': 'O ID da disponibilidade é obrigatório',
    'descricao.required': 'A descrição do resíduo é obrigatória',
    'quantidade.required': 'A quantidade do resíduo é obrigatória',
    'localizacao.required': 'A localização do resíduo é obrigatória',
    'fotos.required': 'As fotos do resíduo são obrigatórias',
  }
}
