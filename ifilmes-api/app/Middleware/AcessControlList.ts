import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AcessControlList {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>,
    allowedUsersLevel: string
  ) {
    // autentica o usuário utilizando o token
    const user = request.user

    //verificar se o nivel da conta do usuário está nas permissões enviadas pela rota, e retorna erro caso não esteja.
    if (!allowedUsersLevel.includes(user.userLevel)) {
      return response.unauthorized({ error: { message: 'Acesso Negado' } })
    }
    //caso esteja permitido, prossegue.
    await next()
  }
}
