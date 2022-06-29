import { BaseModel, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { Rating, Comment } from 'App/Models'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public imdbId: string

  @column()
  public title: string

  @column()
  public year: string

  @column()
  public poster: string

  @column()
  public type: string

  @hasMany(() => Rating, { serializeAs: null })
  public rating: HasMany<typeof Rating>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  //retorna a nota atual do user atual ou null
  @computed()
  public get myActiveRating() {
    for (let i = 0; i < this.rating.length; i++) {
      if (this.rating[i].user != null) {
        return this.rating[i].value
      }
    }
    return null
  }

  // retorna a média total das notas do filme, ou null
  @computed()
  public get movieRating() {
    if (!this.rating) {
      return 0
    }
    let movierating = 0
    for (let i = 0; i < this.rating.length; i++) {
      movierating += this.rating[i].value
    }
    return movierating > 0 ? (movierating / this.rating.length).toFixed(2) : null
  }
}
