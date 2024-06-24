import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Condicaos extends BaseSchema {
  protected tableName = 'condicaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable().unique()  // Nome da condição do resíduo
      table.boolean('ativa').defaultTo(true)  // Indica se a condição está ativa ou não
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
