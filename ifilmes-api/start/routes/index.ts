import Route from '@ioc:Adonis/Core/Route'

// importa todas as rotas da pasta Routes.

import './auth'
import './user'
import './movies'
import './ratings'
import './comments'
import './repliesComments'
import './reactions'

Route.get('/', async () => {
  return { lets: 'Code', itau: 'Devs' }
})
