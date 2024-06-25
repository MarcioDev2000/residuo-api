import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import LinkToken from 'App/Models/LinkToken'
import Hash from '@ioc:Adonis/Core/Hash'
import Transacao from 'App/Models/Transacao'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public nome: string

  @column()
  public sobrenome: string

  @column()
  public telefone: string

  @column()
  public nif: string

  @column()
  public endereco: string

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => LinkToken, {
    foreignKey: 'userId',
  })
  public tokens: HasMany<typeof LinkToken>

  // Relacionamento hasMany para transações como comprador
  @hasMany(() => Transacao, { foreignKey: 'comprador_id' })
  public compras: HasMany<typeof Transacao>

  // Relacionamento hasMany para transações como vendedor
  @hasMany(() => Transacao, { foreignKey: 'vendedor_id' })
  public vendas: HasMany<typeof Transacao>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
