import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Userauth } from 'App/Models'
import { StoreValidator } from 'App/Validators/User/Register'

export default class RegistersController {
  /*
   * Cria um novo usuário
   */
  public async store({ request }: HttpContextContract) {
    //valida os dados enviados
    const newUser = await request.validate(StoreValidator)

    //cria um novo usuário
    const user = await Userauth.create(newUser)

    // retorna os dados criados.
    return user
  }
}
