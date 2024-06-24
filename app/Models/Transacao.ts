// app/Models/Transacao.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, computed } from '@ioc:Adonis/Lucid/Orm'
import Residuo from 'App/Models/Residuo'
import User from 'App/Models/User'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public residuo_id: number // ID do resíduo envolvido na transação

  @column()
  public idUsuarioOferta: number  // ID do usuário ofertante na transação

  @column()
  public idUsuarioRecebe: number  // ID do usuário receptor na transação

  @column.dateTime({ autoCreate: true })
  public dataTransacao: DateTime  // Data e hora da transação

  @column()
  public status: string  // Estado da transação (pendente, concluída, cancelada, etc.)

  @column()
  public quantidade: number  // Quantidade transacionada

  @column()
  public valor_unitario: number  // Valor unitário do resíduo

  @column()
  public valor_total: number  // Valor total da transação

  @column()
  public metodo_pagamento: string | null

  @column()
  public endereco_entrega: string | null  // Endereço de entrega (opcional)

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

  /**
   * Método computado para calcular o valor total da transação.
   * Calculado automaticamente com base na quantidade e no valor unitário.
   */
  @computed()
  public get total() {
    return this.quantidade * this.valor_unitario
  }
}
