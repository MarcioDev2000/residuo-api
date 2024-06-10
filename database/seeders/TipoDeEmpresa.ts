import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TipoEmpresa from 'App/Models/TipoDeEmpresa'

export default class TipoDeEmpresaSeeder extends BaseSeeder {
  public async run () {
    const tiposEmpresas = [
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
      { nome: 'Pesquisa e Desenvolvimento' },
    ]

    await TipoEmpresa.createMany(tiposEmpresas)
  }
}
