// database/seeders/TipoDeEmpresasSeeder.ts

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TipoDeEmpresas from 'App/Models/TipoDeEmpresa' // Modifique o caminho do modelo, se necessário

export default class TipoDeEmpresasSeeder extends BaseSeeder {
  public async run () {
    await TipoDeEmpresas.createMany([
      { nome: 'Tecnologia da Informação' },
      { nome: 'Serviços Financeiros' },
      { nome: 'Saúde e Bem-estar' },
      { nome: 'Varejo' },
      { nome: 'Indústria Automotiva' },
      { nome: 'Educação' },
      { nome: 'Construção Civil' },
      { nome: 'Agropecuária' },
      { nome: 'Turismo e Hotelaria' },
      { nome: 'Alimentício' },
      { nome: 'Energia e Sustentabilidade' },
      { nome: 'Entretenimento' },
      { nome: 'Moda e Vestuário' },
      { nome: 'Transporte e Logística' },
      { nome: 'Telecomunicações' },
      { nome: 'Arte e Cultura' },
      { nome: 'Consultoria e Assessoria' },
      { nome: 'Imobiliária' },
      { nome: 'Manufatura' },
      { nome: 'Marketing e Publicidade' },
      { nome: 'Serviços Jurídicos' },
      { nome: 'Mineração e Recursos Naturais' },
      { nome: 'Pesquisa e Desenvolvimento' }
    ])
  }
}
