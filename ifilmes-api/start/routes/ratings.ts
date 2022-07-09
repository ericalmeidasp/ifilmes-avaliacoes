import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Ratings - Avaliações
 *
 */

// avalia um filme, utilizando os middlewares ACL e Auth
Route.put('/rating', 'Movie/Ratings/RatingMain.update').middleware([
  'auth',
  'acl:leitor,basico,avancado,moderador',
])
