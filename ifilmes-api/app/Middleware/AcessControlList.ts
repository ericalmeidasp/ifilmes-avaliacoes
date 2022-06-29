import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AcessControlList {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    allowedUsersLevel: string
  ) {
    // autentica o usuário utilizando o token
    const user = await auth.authenticate()

    //verificar se o nivel da conta do usuário está nas permissões enviadas pela rota, e retorna erro caso não esteja.
    if (!allowedUsersLevel.includes(user.userLevel)) {
      return response.unauthorized({ error: { message: 'Acesso Negado' } })
    }
    //caso esteja permitido, prossegue.
    await next()
  }
}
