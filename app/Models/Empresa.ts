import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TipoEmpresa from './TipoDeEmpresa'
import Municipio from './Municipio' // Importe o modelo Municipio

export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public nome: string

  @column()
  public tipoEmpresaId: number

  @column()
  public municipioId: number // Adicione a coluna para o município

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => TipoEmpresa)
  public tipo: BelongsTo<typeof TipoEmpresa>

  @belongsTo(() => Municipio)
  public municipio: BelongsTo<typeof Municipio>

  @column()
  public telefone: string

  @column()
  public endereco: string

  @column()
  public nif: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
