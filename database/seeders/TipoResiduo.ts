import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TipoResiduo from 'App/Models/TipoResiduo'

export default class TipoResiduoSeeder extends BaseSeeder {
  public async run () {
    const tiposResiduoData = [
      { nome: 'Plástico' },
      { nome: 'Papel/Papelão' },
      { nome: 'Vidro' },
      { nome: 'Metal' },
      { nome: 'Orgânico' },
      { nome: 'Eletrônico' },
      { nome: 'Madeira' },
      { nome: 'Vestuário' },
      { nome: 'Outro' },
    ]
    await TipoResiduo.createMany(tiposResiduoData)
  }
}
