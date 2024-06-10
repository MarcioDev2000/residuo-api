import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Provincia from './Provincia'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public provinciaId: number

  @belongsTo(() => Provincia)
  public provincia: BelongsTo<typeof Provincia>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
