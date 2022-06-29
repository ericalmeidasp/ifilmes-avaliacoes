import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Comment } from 'App/Models'
import { UpdateValidator } from 'App/Validators/Reactions'

export default class ReactionsController {
  public async update({ request, auth }: HttpContextContract) {
    const { type, commentId } = await request.validate(UpdateValidator)

    //procura o comentario com base no commentId enviado
    const comment = await Comment.findOrFail(commentId)

    // utiliza o relacionamento para atualizar ou criar a nova reação utilizando os dados enviados e o user autenticado
    const reaction = await comment
      .related('reactions')
      .updateOrCreate({ commentId, userId: auth.user!.id }, { type })

    return reaction
  }
}
