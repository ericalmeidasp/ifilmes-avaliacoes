import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Movie } from 'App/Models'
import { ImdbService } from 'App/Services/ImdbService'

export default class MoviesController {
  //envia uma lista dos filmes relacionados
  public async store({ request, response, auth }: HttpContextContract) {
    const { searchString } = request.qs()

    // se não tem query string, retorna erro
    if (!searchString) {
      return response.badRequest('Por gentileza, verifique os dados enviados')
    }

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
    return salveMoviesInDB
  }

  // mostra um filme em especifico utilizando o imdbId
  public async show({ params, auth }: HttpContextContract) {
    // utiliza o serviço externo para busca as informações do filme enviado atraves da req params
    const movie = await Movie.findOrFail(params.id)

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
