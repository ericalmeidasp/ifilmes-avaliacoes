import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { User, Movie } from 'App/Models'
import ReplyComment from './ReplyComment'
import Reaction from './Reaction'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column({ serializeAs: null })
  public userId: number

  @column()
  public movieId: number

  @column()
  public duplicated: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Movie)
  public movie: BelongsTo<typeof Movie>

  @hasMany(() => ReplyComment)
  public replyComments: HasMany<typeof ReplyComment>

  @hasMany(() => Reaction, { serializeAs: null })
  public reactions: HasMany<typeof Reaction>

  //relacionamento many to many para as citações dos comentários.
  @manyToMany(() => Comment, {
    pivotTable: 'quotes',
    pivotForeignKey: 'has_quoted_id',
    pivotRelatedForeignKey: 'was_quoted_id',
  })
  public wasQuoted: ManyToMany<typeof Comment>

  //retorna os contadores das reações
  @computed()
  public get likeCount() {
    return {
      like: this.$extras.likeCount || 0,
      unLike: this.$extras.unLikeCount || 0,
    }
  }
}
