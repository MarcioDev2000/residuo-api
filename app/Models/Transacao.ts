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
  public comprador_id: number

  @column()
  public vendedor_id: number

  @column.dateTime({ autoCreate: true })
  public dataTransacao: DateTime  // Data e hora da transação

  @column()
  public status: string  // Estado da transação (pendente, concluída, cancelada, etc.)

  @column()
  public quantidade: number  // Quantidade transacionada

  @column()
  public valor_total: number  // Valor total da transação

  @column()
  public metodo_pagamento: string | null

  @column()
  public endereco_entrega: string | null  // Endereço de entrega (opcional)

  @column()
  public observacoes?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Residuo)
  public residuo: BelongsTo<typeof Residuo>

  @belongsTo(() => User, { foreignKey: 'comprador_id' })
  public comprador: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'vendedor_id' })
  public vendedor: BelongsTo<typeof User>

  /**
   * Método computado para calcular o valor total da transação.
   * Calculado automaticamente com base na quantidade e no valor unitário do resíduo.
   */
  @computed()
  public get total() {
    // Este método foi ajustado para calcular o total com base na quantidade e no valor_unitario do resíduo
    if (this.residuo && this.quantidade) {
      return this.quantidade * this.residuo.valor_unitario
    }
    return 0
  }

  /**
   * Método para verificar se o comprador é o vendedor.
   * Retorna true se o comprador for o mesmo que o vendedor.
   */
  public isCompradorVendedor(): boolean {
    return this.comprador_id === this.vendedor_id
  }

  /**
   * Método para verificar se um usuário pode comprar um resíduo de outro usuário.
   * Retorna true se o comprador não for o mesmo que o vendedor.
   */
  public podeComprarDeOutroUsuario(): boolean {
    return !this.isCompradorVendedor()
  }
}
