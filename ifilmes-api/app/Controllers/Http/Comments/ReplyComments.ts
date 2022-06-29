import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReplyComment } from 'App/Models'
import { PointsService } from 'App/Services/PointsService'
import { StoreValidator } from 'App/Validators/ReplyComments'

export default class ReplyCommentsController {
  //criar uma nova resposta a um comentário.
  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    //utilizar o user autenticado para criar nova resposta utilizando o relacionamento e os dados enviados
    const replyComment = await auth.user!.related('replyComments').create(data)

    // carrega os dados do user que criou comentario
    await replyComment.load('user', (query) => query.select(['id', 'name', 'email']))

    //adiciona pontos para o usuário
    await PointsService.GivePoints(auth.user!)

    return replyComment
  }

  public async destroy({ response, params }: HttpContextContract) {
    const replyComment = await ReplyComment.findOrFail(params.id)

    //apaga a resposta e retorna uma mensagem.
    await replyComment.delete()
    return response.json('Comentário Apagado com Sucesso')
  }
}
