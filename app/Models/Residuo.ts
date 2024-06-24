// app/Models/Residuo.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import TipoResiduo from 'App/Models/TipoResiduo'
import Condicao from 'App/Models/Condicao'
import Disponibilidade from 'App/Models/Disponibilidade'

export default class Residuo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userID: number

  @column()
  public tipoResiduoID: number

  @column()
  public condicaoID: number

  @column()
  public disponibilidadeID: number

  @column()
  public descricao: string

  @column()
  public quantidade: number

  @column()
  public localizacao: string

  @column()
  public fotos: string[]

  @column.dateTime({ autoCreate: true })
  public criadoEm: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public atualizadoEm: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => TipoResiduo)
  public tipoResiduo: BelongsTo<typeof TipoResiduo>

  @belongsTo(() => Condicao)
  public condicao: BelongsTo<typeof Condicao>

  @belongsTo(() => Disponibilidade)
  public disponibilidade: BelongsTo<typeof Disponibilidade>
}
