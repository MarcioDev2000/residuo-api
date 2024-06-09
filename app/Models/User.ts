import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import LinkToken from './LinkToken'
import Role from './Role'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public nome: string

  @column()
  public sobrenome: string

  @column()
  public telefone: string

  @column()
  public endereco: string

  @hasMany(() => LinkToken, {
    foreignKey: 'userId',
  })
  public tokens: HasMany<typeof LinkToken>

  @manyToMany(() => Role, {
    pivotTable: 'user_roles',
  })
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    // Verifica se a senha do usuário foi modificada
    if (user.$dirty.password) {
      // Se a senha foi modificada, criptografa a nova senha antes de salvar no banco de dados
      user.password = await Hash.make(user.password)
    }
  }
}
