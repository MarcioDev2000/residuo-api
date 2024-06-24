import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Residuos extends BaseSchema {
  protected tableName = 'residuos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.integer('tipo_residuo_id').notNullable()
      table.integer('condicao_id').notNullable()
      table.integer('disponibilidade_id').notNullable()
      table.string('descricao').nullable()
      table.float('quantidade').notNullable()
      table.string('localizacao').nullable()
      table.json('fotos').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
