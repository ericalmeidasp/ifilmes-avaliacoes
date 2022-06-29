import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { User } from 'App/Models'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthMiddleware {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    const token = request.headers().authorization

    if (!token) {
      response.status(401).unauthorized('E_INVALID_API_TOKEN: Invalid API token')
      return
    }
    await axios
      .get(`${Env.get('API_AUTH_URL')}/getuserwithtoken`, {
        headers: {
          Authorization: token,
        },
      })
      .then(async ({ data }) => {
        const user = await User.firstOrCreate({ email: data.email }, { name: data.name })
        await auth.login(user)
        await next()
      })
      .catch(() => {
        response.status(401).unauthorized('E_INVALID_API_TOKEN: Invalid API token')
      })
  }
}
