import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transacaos extends BaseSchema {
  protected tableName = 'transacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('residuo_id').unsigned().notNullable().references('id').inTable('residuos').onDelete('CASCADE').index()
      table.integer('comprador_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index()
      table.integer('vendedor_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index()
      table.float('quantidade').notNullable()  // Quantidade transacionada
      table.float('valor_total').notNullable()  // Valor unitário do resíduo
      table.enum('status', ['pendente', 'concluida', 'cancelada']).defaultTo('pendente')  // Status da transação
      table.string('metodo_pagamento').nullable()  // Método de pagamento utilizado
      table.string('endereco_entrega').nullable()  // Endereço de entrega (se aplicável)
      table.text('observacoes').nullable()  // Observações adicionais
      table.timestamp('data_transacao', { useTz: true }).defaultTo(this.now())
      table.timestamp('data_expiracao_reserva', { useTz: true }).nullable()  // Data e hora de expiração da reserva
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
