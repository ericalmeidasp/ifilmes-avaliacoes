import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { usersLevelsTypes } from 'App/Utils'

export default class UpgradeLevelByPointsController {
  /*
   * upgrade da conta utilizando os pontos
   */
  public async update({ auth, response }: HttpContextContract) {
    //carrega o user autenticado
    const user = auth.user!

    // verifica se o user já é moderador, e retorna uma string caso seja.
    if (user.userLevel == usersLevelsTypes[3]) {
      return response.json('Você já é ' + usersLevelsTypes[3] + '. Parabéns')
    }

    //verifica o nivel do user, e caso esteja elegível, faz o upgrade.
    if (user.userPoints >= 1000) {
      user.userLevel = usersLevelsTypes[3]
    } else if (user.userPoints >= 100) {
      user.userLevel = usersLevelsTypes[2]
    } else if (user.userPoints >= 20) {
      user.userLevel = usersLevelsTypes[1]
    } else {
      return response.json({
        responseText: 'Usuário não elegível para Upgrade, junte mais Pontos.',
        userPoints: user.userPoints
      })
    }
    user.save()

    // retorna menssagem de sucesso.
    return response.json({
      userPoints: user.userPoints,
      userLevel: user.userLevel
    })
  }
}
