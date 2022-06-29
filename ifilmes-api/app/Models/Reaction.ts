import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { User, Comment } from 'App/Models'
import { ReactionsTypes } from 'App/Utils'

export default class Reaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public userId: number

  @column()
  public commentId: number

  @column()
  public type: ReactionsTypes

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Comment)
  public comment: BelongsTo<typeof Comment>

}
