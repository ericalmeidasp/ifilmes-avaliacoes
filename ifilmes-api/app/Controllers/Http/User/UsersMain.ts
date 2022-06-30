import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/User/Register'
import Env from '@ioc:Adonis/Core/Env'

export default class RegistersController {

  /*
   * Cria um novo usuário na api de autenticação
   */
  public async store({ request, response }: HttpContextContract) {
    //valida os dados enviados
    const { email, password, name } = await request.validate(StoreValidator)

    //cria um novo usuário na Api de Autenticação
    const req = await axios
      .post(`${Env.get('API_AUTH_URL')}/register`, { email, password, name })
      .then(async ({ data }) => {
        await User.create(data)
        return data
      })
      .catch((error) => {
        return error.response.data
      })

    // retorna os dados criados.
    return response.json(req)
  }
}
