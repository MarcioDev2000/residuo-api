import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsuarioIndividuals extends BaseSchema {
  protected tableName = 'usuario_individuals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('nome').notNullable()
      table.string('sobrenome').notNullable()
      table.string('telefone').notNullable()
      table.string('endereco').notNullable()
      table.integer('municipio_id').unsigned().references('id').inTable('municipios').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
