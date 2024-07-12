import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Condicao from 'App/Models/Condicao'

export default class CondicaoSeeder extends BaseSeeder {
  public async run () {
    const condicoesData = [
      { nome: 'Novo' },
      { nome: 'Usado' },
      { nome: 'Reciclável' },
      { nome: 'Danificado' },
      { nome: 'Outro' },
    ]
    await Condicao.createMany(condicoesData)
  }
}
