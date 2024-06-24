import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TipoResiduos extends BaseSchema {
  protected tableName = 'tipo_residuos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable().unique()  // Nome do tipo de resíduo
      table.boolean('ativo').defaultTo(true)  // Indica se o tipo de resíduo está ativo ou não
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
