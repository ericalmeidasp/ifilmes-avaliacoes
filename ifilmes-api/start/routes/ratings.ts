import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Ratings - Avaliações
 *
 */

// avalia um filme, utilizando os middlewares ACL e Auth
Route.post('/rating', 'Movie/Ratings/RatingMain.store').middleware([
  'acl:leitor,basico,avancado,moderador',
  'auth',
])
