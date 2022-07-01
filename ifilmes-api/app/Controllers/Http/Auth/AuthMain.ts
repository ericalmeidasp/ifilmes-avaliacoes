import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { User } from 'App/Models'

export default class AuthController {
  /*
   * Realizar o login na API de Autenticação
   */
  public async store({ request, response, auth }: HttpContextContract) {
    // valida os campos enviados na request
    const { email, password } = await request.validate(StoreValidator)

    // envia os dados para a APi de Auth, caso autentique na API Auth e o user não tem cadastro nessa plataforma (Api ifilmes), ele já cadastra.
    const reqAuth = await axios
      .post(`${Env.get('API_AUTH_URL')}/login`, { email, password })
      .then(async ({ data }) => {
        const user = await User.firstOrCreate({ email: data[1].email }, { name: data[1].name })
        await auth.login(user)
        return data[0]
      })
      .catch((error) => {
        return error.response.data
      })
    // Retorna o token ou erro para o usuário
    return response.json(reqAuth)
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
