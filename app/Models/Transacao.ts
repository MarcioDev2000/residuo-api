import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Residuo from 'App/Models/Residuo'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public residuoID: number  // ID do resíduo envolvido na transação

  @column()
  public idUsuarioOferta: number  // ID do usuário ofertante na transação

  @column()
  public idUsuarioRecebe: number  // ID do usuário receptor na transação

  @column.dateTime({ autoCreate: true })
  public dataTransacao: DateTime  // Data e hora da transação

  @column()
  public status: string  // Estado da transação (pendente, concluída, cancelada, etc.)

  @column.dateTime({ autoCreate: true })
  public criadoEm: DateTime  // Data de criação do registro

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public atualizadoEm: DateTime  // Data da última atualização do registro

  @belongsTo(() => Residuo)
  public residuo: BelongsTo<typeof Residuo>

  @belongsTo(() => User, { foreignKey: 'idUsuarioOferta' })
  public usuarioOferta: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'idUsuarioRecebe' })
  public usuarioRecebe: BelongsTo<typeof User>
}
