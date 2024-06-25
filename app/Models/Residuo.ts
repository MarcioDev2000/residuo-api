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
  public fotos: string  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => TipoResiduo)
  public tipoResiduo: BelongsTo<typeof TipoResiduo>

  @belongsTo(() => Condicao)
  public condicao: BelongsTo<typeof Condicao>

  @belongsTo(() => Disponibilidade)
  public disponibilidade: BelongsTo<typeof Disponibilidade>

  /**
   * Verifica se o resíduo está disponível para aquisição imediata.
   * Isso pode ser baseado no campo disponibilidadeID, onde diferentes IDs indicam diferentes estados de disponibilidade.
   */
  public estaDisponivelParaCompra(): boolean {
    // Exemplo: Se disponibilidadeID for igual a 1, está disponível para compra imediata
    return this.disponibilidadeID === 1
  }

  /**
   * Função estática para encontrar um resíduo pelo ID.
   * @param id ID do resíduo a ser encontrado
   */
  public static async findById(id: number): Promise<Residuo> {
    return await Residuo.findOrFail(id)
  }
}
