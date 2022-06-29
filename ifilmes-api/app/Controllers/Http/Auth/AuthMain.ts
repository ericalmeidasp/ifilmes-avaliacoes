import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'
import axios from 'axios'

export default class AuthController {
  public async store({ request, response }: HttpContextContract) {
    // valida os campos enviados na request
    const { email, password } = await request.validate(StoreValidator)

    const req = await axios
      .post('http://localhost:3000/login', { email, password })
      .then(async ({ data }) => {
        return data
      })
      .catch((error) => {
        return error.response.data
      })

    return response.json(req)
  }

  public async destroy({ request }: HttpContextContract) {
    const token = request.headers().authorization

    await axios.delete('http://localhost:3000/logout', {
      headers: {
        Authorization: token!,
      },
    })
  }
}
