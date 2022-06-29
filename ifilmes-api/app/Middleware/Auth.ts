import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { User } from 'App/Models'

export default class AuthMiddleware {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    const token = request.headers().authorization

    if (!token) {
      response.status(401).unauthorized('E_INVALID_API_TOKEN: Invalid API token')
      return
    }
    await axios
      .get('http://localhost:3000/getuserwithtoken', {
        headers: {
          Authorization: token,
        },
      })
      .then(async ({ data }) => {
        const user = await User.firstOrCreate({ email: data.email }, { name: data.name })
        auth.login(user)
        await next()
      })
      .catch(() => {
        response.status(401).unauthorized('E_INVALID_API_TOKEN: Invalid API token')
      })
  }
}
