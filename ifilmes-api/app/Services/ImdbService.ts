import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

export class ImdbService {
  private static URL_IMDB = Env.get('IMDB_URL')

  public static async getMovies(searchString: string) {
    //acessa API externa do IMDB e retorna a lista dos filmes relacionado
    const { data } = await axios.get(`${this.URL_IMDB}s=${searchString}`)

    return data.Search.map((movie) => {
      return {
        title: movie.Title,
        year: movie.Year,
        imdbId: movie.imdbID,
        type: movie.Type,
        poster: movie.Poster,
      }
    })
  }
}
