import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Disponibilidade from 'App/Models/Disponibilidade'

export default class DisponibilidadeSeeder extends BaseSeeder {
  public async run () {
    const disponibilidadesData = [
      { nome: 'Disponível' },
      { nome: 'Em falta' },
      { nome: 'A combinar' },
      { nome: 'Outro' },
    ]

    await Disponibilidade.createMany(disponibilidadesData)
  }
}
