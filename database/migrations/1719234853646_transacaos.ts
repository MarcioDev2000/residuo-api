import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transacaos extends BaseSchema {
  protected tableName = 'transacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('residuo_id').notNullable()  // ID do resíduo relacionado à transação
      table.integer('comprador_id').notNullable()  // ID do comprador da transação
      table.integer('vendedor_id').notNullable()  // ID do vendedor da transação
      table.float('quantidade').notNullable()  // Quantidade transacionada
      table.float('valor_unitario').notNullable()  // Valor unitário do resíduo
      table.float('valor_total').notNullable()  // Valor total da transação
      table.enum('status', ['pendente', 'concluida', 'cancelada']).defaultTo('pendente')  // Status da transação
      table.string('metodo_pagamento').nullable()  // Método de pagamento utilizado
      table.string('endereco_entrega').nullable()  // Endereço de entrega (se aplicável)
      table.text('observacoes').nullable()  // Observações adicionais
      table.boolean('avaliada').defaultTo(false)  // Indica se a transação foi avaliada
      table.integer('avaliacao_comprador').nullable()  // Avaliação dada pelo comprador
      table.integer('avaliacao_vendedor').nullable()  // Avaliação dada pelo vendedor
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
