import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Movie } from 'App/Models'
import { PointsService } from 'App/Services/PointsService'
import { StoreValidator } from 'App/Validators/Movie'

export default class RatingsController {
  /*
   * Cria ou atualiza nova avaliação para o filme
   */
  public async update({ request, response }: HttpContextContract) {
    try {
      const { movieId, value } = await request.validate(StoreValidator)

      // procura o filme com base no movieId enviado
      const movie = await Movie.findOrFail(movieId)

      //carrega as avaliações do filme desse user (caso ele tenha)
      await movie.load('rating', (query) =>
        query.preload('user', (query) => query.where('id', request.user.id))
      )

      //se ele ainda não fez avaliação para esse filme, ele é pontuado.
      if (!movie.myActiveRating) {
        await PointsService.GivePoints(request.user)
      }

      //cria uma nova avaliação para o filme utilizando o relacionamento. (ou atualiza a avaliação existente)
      const rating = await movie
        .related('rating')
        .updateOrCreate({ userId: request.user.id }, { value })

      return rating
    } catch {
      return response.badRequest({ error: { message: 'Verifique os dados enviados' } })
    }
  }
}
