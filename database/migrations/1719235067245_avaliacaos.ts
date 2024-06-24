import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Avaliacaos extends BaseSchema {
  protected tableName = 'avaliacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('transacao_id').notNullable()  // ID da transação relacionada à avaliação
      table.integer('avaliador_id').notNullable()  // ID do avaliador (quem está dando a avaliação)
      table.integer('avaliado_id').notNullable()  // ID do avaliado (quem está recebendo a avaliação)
      table.enum('tipo', ['comprador', 'vendedor']).notNullable()  // Tipo de avaliação (comprador ou vendedor)
      table.integer('classificacao').notNullable()  // Classificação da avaliação (por exemplo, de 1 a 5)
      table.text('comentario').nullable()  // Comentário opcional sobre a avaliação
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
