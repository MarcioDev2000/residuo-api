import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Municipios extends BaseSchema {
  protected tableName = 'municipios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.integer('provincia_id').unsigned().references('id').inTable('provincias').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
