import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Residuos extends BaseSchema {
  protected tableName = 'residuos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index()
      table.integer('tipo_residuo_id').unsigned().notNullable().references('id').inTable('tipo_residuos').onDelete('CASCADE').index()
      table.integer('condicao_id').unsigned().notNullable().references('id').inTable('condicaos').onDelete('CASCADE').index()
      table.integer('disponibilidade_id').unsigned().notNullable().references('id').inTable('disponibilidades').onDelete('CASCADE').index()
      table.string('descricao').nullable()
      table.float('quantidade').notNullable()
      table.float('valor_unitario').notNullable()
      table.string('localizacao').nullable()
      table.string('fotos').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
