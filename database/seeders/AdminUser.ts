import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class AdminUserSeeder extends BaseSeeder {
  public async run () {
    // Verifica se a role "admin" já existe, senão a cria
    const adminRole = await Role.firstOrCreate({ nome: 'admin' })

    // Cria o usuário admin se não existir
    const adminUser = await User.firstOrCreate(
      { email: 'admin@gmail.com' }, // Defina o e-mail do usuário admin aqui
      {
        email: 'admin@gmail.com',
        password: 'admin123', // Defina a senha do usuário admin aqui
      }
    )

    // Associa a role "admin" ao usuário admin
    await adminUser.related('roles').attach([adminRole.id])
  }
}
