import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Municipio from './Municipio'

export default class UsuarioIndividual extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public nome: string

  @column()
  public sobrenome: string

  @column()
  public telefone: string

  @column()
  public endereco: string

  @column()
  public municipioId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Municipio)
  public municipio: BelongsTo<typeof Municipio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
