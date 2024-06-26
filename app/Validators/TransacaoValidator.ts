// app/Validators/TransacaoValidator.ts
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransacaoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    residuo_id: schema.number([
      rules.exists({ table: 'residuos', column: 'id' }),
    ]),
    comprador_id: schema.number([
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    vendedor_id: schema.number([
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    quantidade: schema.number(),
    status: schema.enum.optional([
      'pendente',
      'concluida',
      'cancelada',
    ]),
    metodo_pagamento: schema.string.optional(),
    observacoes: schema.string.optional(),
    endereco_entrega: schema.string.optional(), // Novo campo adicionado
  })

  public messages: CustomMessages = {
    'residuo_id.exists': 'O ID do resíduo informado não existe',
    'comprador_id.exists': 'O ID do comprador informado não existe',
    'vendedor_id.exists': 'O ID do vendedor informado não existe',
    'quantidade.required': 'A quantidade transacionada é obrigatória',
    'status.enum': 'O status da transação deve ser "pendente", "concluida" ou "cancelada"',
    'metodo_pagamento.string': 'O método de pagamento deve ser uma string',
    'observacoes.string': 'As observações devem ser uma string',
    'avaliada.boolean': 'O campo "avaliada" deve ser um booleano',
    'avaliacao_comprador.number': 'A avaliação do comprador deve ser um número',
    'avaliacao_vendedor.number': 'A avaliação do vendedor deve ser um número',
  }
}
