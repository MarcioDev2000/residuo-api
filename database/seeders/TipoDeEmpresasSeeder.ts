// database/seeders/TipoDeEmpresasSeeder.ts

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TipoDeEmpresas from 'App/Models/TipoDeEmpresa' // Modifique o caminho do modelo, se necessário

export default class TipoDeEmpresasSeeder extends BaseSeeder {
  public async run () {
    await TipoDeEmpresas.createMany([
      { nome: 'Tecnologia da Informação' }
      // Adicione mais objetos de dados conforme necessário
    ])
  }
}
