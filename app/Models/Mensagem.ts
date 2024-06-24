import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Mensagem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public remetenteID: number

  @column()
  public destinatarioID: number

  @column()
  public conteudo: string

  @column()
  public lida: boolean

  @column.dateTime({ autoCreate: true })
  public criadaEm: DateTime  // Data de criação da mensagem

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public atualizadaEm: DateTime  // Data da última atualização da mensagem

  @belongsTo(() => User, { foreignKey: 'remetenteID' })
  public remetente: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'destinatarioID' })
  public destinatario: BelongsTo<typeof User>
}
