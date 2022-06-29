import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Movie } from 'App/Models'
import { ImdbService } from 'App/Services/ImdbService'

export default class MoviesController {
  //envia uma lista dos filmes relacionados
  public async index({ request, response, auth }: HttpContextContract) {
    const { searchString } = request.qs()

    // se não tem query string, retorna erro
    if (!searchString) {
      return response.badRequest('Por gentileza, verifique os dados enviados')
    }

    // utiliza o serviço externo para obter a lista de filmes relacionados
    const getListOfMoviesOnApi = await ImdbService.getMovies(searchString)

    //cria ou atualiza os filmes obtidos em nossa base de dados.
    const storeMoviesOnDB = await Movie.updateOrCreateMany('imdbId', getListOfMoviesOnApi)

    //carrega as informações que temos em nossa DB das lista obtida.
    const queryLoadInfoMovies = storeMoviesOnDB.map(async (movie) => {
      await movie.load('rating', (query) =>
        query.preload('user', (query) => query.where('id', auth.user!.id))
      )
      await movie.load('comments', (query) => {
        query.preload('wasQuoted')
        query.preload('replyComments')
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
    return storeMoviesOnDB
  }

  // mostra um filme em especifico utilizando o imdbId
  public async show({ params, auth }: HttpContextContract) {
    // utiliza o serviço externo para busca as informações do filme enviado atraves da req params
    const getMoviesOnApi = await ImdbService.getMovie(params.imdbId)

    //cria ou atualiza o filme obtido em nossa base de dados.
    const movie = await Movie.updateOrCreate({ imdbId: params.imdbId }, getMoviesOnApi)

    //carrega as notas do filme e carrega a nota do user atual
    await movie.load('rating', (query) =>
      query.preload('user', (query) => query.where('id', auth.user!.id))
    )
    await movie.load('comments', (query) => {
      query.preload('wasQuoted')
      query.preload('replyComments')
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
    return movie
  }
}
