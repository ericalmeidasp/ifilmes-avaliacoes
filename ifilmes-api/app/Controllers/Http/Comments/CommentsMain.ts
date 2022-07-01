import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Comment } from 'App/Models'
import { PointsService } from 'App/Services/PointsService'
import { usersLevelsTypes } from 'App/Utils'
import { StoreValidator } from 'App/Validators/Comments'

export default class CommentsController {
  /*
   * Cria um novo comentário
   */
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { movieId, content, wasQuotedId } = await request.validate(StoreValidator)

      //utilizar o user autenticado para criar novo comentário utilizando o relacionamento e os dados enviados
      const comment = await auth.user!.related('comments').create({ movieId, content })

      //verifica se o user é avancado ou moderador, caso seja, permite a citação de outro comentario utilizando o dados da req enviados
      if (
        wasQuotedId &&
        (auth.user!.userLevel === usersLevelsTypes[2] ||
          auth.user!.userLevel === usersLevelsTypes[3])
      ) {
        await comment.related('wasQuoted').attach([wasQuotedId])
      }

      // carrega user do comentario e citações
      await comment.load('user', (query) => query.select(['id', 'name', 'email']))
      await comment.load('wasQuoted', (query) =>
        query.preload('user', (query) => query.select(['id', 'name', 'email']))
      )

      //adiciona pontos para o usuário.
      await PointsService.GivePoints(auth.user!)

      return comment
    } catch {
      return response.badRequest('Verifique os dados enviados')
    }
  }

  /*
   * Marca o comentário como duplicado ou desmarca
   */
  public async update({ params, response }: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(params.id)

      //caso o comentário esteja marcado como duplicado, desmarca, e caso não esteja, marca.
      if (comment.duplicated) {
        comment.duplicated = false
      } else {
        comment.duplicated = true
      }
      await comment.save()
      return comment
    } catch {
      return response.badRequest('Verifique os dados enviados')
    }
  }

  /*
   * Apaga o commentário
   */
  public async destroy({ response, params }: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(params.id)

      await comment.delete()
      return response.json('Comentário Apagado com Sucesso')
    } catch {
      return response.badRequest('Verifique os dados enviados')
    }
  }
}
