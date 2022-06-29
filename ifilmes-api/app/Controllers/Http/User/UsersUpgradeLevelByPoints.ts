import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { usersLevelsTypes } from 'App/Utils'

export default class UpgradeLevelByPointsController {
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
    } else if (user.userPoints >= 100 && user.userLevel != usersLevelsTypes[2]) {
      user.userLevel = usersLevelsTypes[2]
    } else if (user.userPoints >= 20 && user.userLevel != usersLevelsTypes[1]) {
      user.userLevel = usersLevelsTypes[1]
    } else {
      return response.json('Usuário não elegível para Upgrade, junte mais Pontos')
    }
    user.save()

    // retorna menssagem de sucesso.
    return response.json(`Upgrade de conta realizado com sucesso, novo nível: ${user.userLevel}`)
  }
}
