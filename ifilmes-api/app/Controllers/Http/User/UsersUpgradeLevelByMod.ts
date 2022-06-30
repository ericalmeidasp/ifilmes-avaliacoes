import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { usersLevelsTypes } from 'App/Utils'
import { UpdateValidator } from 'App/Validators/User/UpgradeLevel'

export default class UpgradeLevelByModController {
  /*
   * upgrade da conta utilizando um moderador
   */
  public async update({ request, response }: HttpContextContract) {
    //valida os dados
    const { email } = await request.validate(UpdateValidator)

    //busca o usuário pelo email
    const user = await User.findByOrFail('email', email)

    //define o level para moderado e salva.
    user.userLevel = usersLevelsTypes[3]
    user.save()

    //retorna mensagem de sucesso
    return response.json('Usuário promovido a moderador com sucesso')
  }
}
