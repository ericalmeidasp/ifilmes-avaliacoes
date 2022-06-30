import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  /*
   * Realizar o login na API de Autenticação
   */
  public async store({ request, response }: HttpContextContract) {
    // valida os campos enviados na request
    const { email, password } = await request.validate(StoreValidator)

    // envia os dados para a APi de Auth
    const req = await axios
      .post(`${Env.get('API_AUTH_URL')}/login`, { email, password })
      .then(async ({ data }) => {
        return data
      })
      .catch((error) => {
        return error.response.data
      })
    // Retorna o token ou  erro para o usuário
    return response.json(req)
  }

  /*
   * Realizar o logout na API de Autenticação
   */
  public async destroy({ request }: HttpContextContract) {
    const token = request.headers().authorization

    await axios.delete(`${Env.get('API_AUTH_URL')}/logout`, {
      headers: {
        Authorization: token!,
      },
    })
  }
}
