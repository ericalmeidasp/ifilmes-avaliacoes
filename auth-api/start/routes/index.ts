import Route from '@ioc:Adonis/Core/Route'

// importa todas as rotas da pasta Routes.

import './auth'
import './user'

Route.get('/', async () => {
  return { lets: 'Code', itau: 'Devs' }
})
