import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    // Verifica se as roles já existem
    const roles = await Role.query().whereIn('nome', ['individuo', 'empresa', 'admin'])

    // Cria as roles que não existem
    const rolesToCreate = ['individuo', 'empresa', 'admin'].filter(roleName => !roles.some(role => role.nome === roleName))
    await Role.createMany(rolesToCreate.map(roleName => ({ nome: roleName })))
  }
}
