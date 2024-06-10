import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Provincia from 'App/Models/Provincia'

export default class ProvinciaSeeder extends BaseSeeder {
  public async run () {
    await Provincia.createMany([
      { nome: 'Luanda' },
      { nome: 'Bengo' },
      { nome: 'Benguela' },
      { nome: 'Bié' },
      { nome: 'Cabinda' },
      { nome: 'Cuando Cubango' },
      { nome: 'Cuanza Norte' },
      { nome: 'Cuanza Sul' },
      { nome: 'Cunene' },
      { nome: 'Huambo' },
      { nome: 'Huíla' },
      { nome: 'Malanje' },
      { nome: 'Moxico' },
      { nome: 'Namibe' },
      { nome: 'Uíge' },
      { nome: 'Zaire' },
      { nome: 'Lunda Norte' },
      { nome: 'Lunda Sul' }
    ])
  }
}
