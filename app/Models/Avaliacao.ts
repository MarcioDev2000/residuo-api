import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Avaliacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public avaliadorID: number  // ID do usuário que fez a avaliação

  @column()
  public avaliadoID: number  // ID do usuário que foi avaliado

  @column()
  public nota: number  // Nota atribuída na avaliação (pode ser um número ou enumeração)

  @column()
  public feedback: string  // Feedback dado na avaliação

  @column.dateTime({ autoCreate: true })
  public criadoEm: DateTime  // Data de criação da avaliação

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public atualizadoEm: DateTime  // Data da última atualização da avaliação

  @belongsTo(() => User, { foreignKey: 'avaliadorID' })
  public avaliador: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'avaliadoID' })
  public avaliado: BelongsTo<typeof User>
}
