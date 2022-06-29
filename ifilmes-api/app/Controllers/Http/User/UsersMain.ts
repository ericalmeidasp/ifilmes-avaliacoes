import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/User/Register'

export default class RegistersController {
  public async store({ request, response }: HttpContextContract) {
    //valida os dados enviados
    const { email, password, name } = await request.validate(StoreValidator)

    const req = await axios
      .post('http://localhost:3000/register', { email, password, name })
      .then(async ({ data }) => {
        await User.create(data)
        return data
      })
      .catch((error) => {
        return error.response.data
      })

    //cria um novo usuário

    // retorna os dados criados.
    return response.json(req)
  }
}
