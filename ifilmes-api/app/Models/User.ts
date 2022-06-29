import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { UsersLevelsTypes } from 'App/Utils'
import { Rating, Comment, Reaction, ReplyComment } from 'App/Models'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public userLevel: UsersLevelsTypes

  @column()
  public userPoints: number

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Rating)
  public rating: HasMany<typeof Rating>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => ReplyComment)
  public replyComments: HasMany<typeof ReplyComment>

  @hasMany(() => Reaction)
  public reactions: HasMany<typeof Reaction>
}
