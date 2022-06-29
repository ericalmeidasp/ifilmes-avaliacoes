import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Userauth } from 'App/Models'
import { StoreValidator } from 'App/Validators/User/Register'

export default class RegistersController {
  public async store({ request }: HttpContextContract) {
    //valida os dados enviados
    const newUser = await request.validate(StoreValidator)

    //cria um novo usuário
    const user = await Userauth.create(newUser)

    // retorna os dados criados.
    return user
  }
}
