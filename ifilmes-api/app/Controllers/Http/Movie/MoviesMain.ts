import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Movie } from 'App/Models'
import { ImdbService } from 'App/Services/ImdbService'

export default class MoviesController {
  /*
   * Lista filmes relacionados em nossa DB
   */
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const { searchString } = request.qs()

      // Busca os filmes na base de dados
      const movies = await Movie.query()
        .where('title', 'like', `%${searchString}%`)
        .preload('rating', (query) =>
          query.preload('user', (query) => query.where('id', auth.user!.id))
        )
        .preload('comments', (query) => {
          query.preload('wasQuoted', (query) =>
            query.preload('user', (query) => query.select(['id', 'name', 'email']))
          )
          query.preload('user', (query) => query.select(['id', 'name', 'email']))
          query.preload('replyComments', (query) =>
            query.preload('user', (query) => query.select(['id', 'name', 'email']))
          )
          query.withCount('reactions', (query) => {
            query.where('type', 'like')
            query.as('likeCount')
          })
          query.withCount('reactions', (query) => {
            query.where('type', 'unlike')
            query.as('unLikeCount')
          })
        })

      // retorna o filme
      return movies
    } catch {
      return response.badRequest('Por gentileza, verifique os dados enviados')
    }
  }

  /*
   * Requisita, salva e retorna filmes relacionados
   */
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { searchString } = request.qs()

      // utiliza o serviço ImbdbService para obter a lista de filmes relacionados
      const getListOfMoviesOnApi = await ImdbService.getMovies(searchString)

      // salva os filmes em nossa DB e retorna a lista
      const salveMoviesInDB = await Movie.updateOrCreateMany('imdbId', getListOfMoviesOnApi)

      //carrega as informações que temos em nossa DB das lista obtida.
      const queryLoadInfoMovies = salveMoviesInDB.map(async (movie) => {
        await movie.load('rating', (query) =>
          query.preload('user', (query) => query.where('id', auth.user!.id))
        )
        await movie.load('comments', (query) => {
          query.preload('wasQuoted', (query) =>
            query.preload('user', (query) => query.select(['id', 'name', 'email']))
          )
          query.preload('user', (query) => query.select(['id', 'name', 'email']))
          query.preload('replyComments', (query) =>
            query.preload('user', (query) => query.select(['id', 'name', 'email']))
          )
          query.withCount('reactions', (query) => {
            query.where('type', 'like')
            query.as('likeCount')
          })
          query.withCount('reactions', (query) => {
            query.where('type', 'unlike')
            query.as('unLikeCount')
          })

          return movie
        })
      })

      // resolve as promessas da query
      await Promise.all(queryLoadInfoMovies)

      //retorna as informações da lista obtida
      return salveMoviesInDB
    } catch {
      return response.badRequest('Por gentileza, verifique os dados enviados')
    }
  }

  /*
   * Mostra um filme em especifico utilizando o Id
   */
  public async show({ params, response, auth }: HttpContextContract) {
    try {
      // Busca o filme na base de dados interna
      const movie = await Movie.query()
        .where({ id: params.id })
        .preload('rating', (query) =>
          query.preload('user', (query) => query.where('id', auth.user!.id))
        )
        .preload('comments', (query) => {
          query.preload('wasQuoted', (query) =>
            query.preload('user', (query) => query.select(['id', 'name', 'email']))
          )
          query.preload('user', (query) => query.select(['id', 'name', 'email']))
          query.preload('replyComments', (query) =>
            query.preload('user', (query) => query.select(['id', 'name', 'email']))
          )
          query.withCount('reactions', (query) => {
            query.where('type', 'like')
            query.as('likeCount')
          })
          query.withCount('reactions', (query) => {
            query.where('type', 'unlike')
            query.as('unLikeCount')
          })
        })
        .first()

      // retorna o filme
      return movie
    } catch {
      return response.badRequest('Por gentileza, verifique os dados enviados')
    }
  }
}
