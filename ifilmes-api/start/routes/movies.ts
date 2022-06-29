import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Movies
 *
 */

// Lista os filmes realicionados, utilizando os middlewares ACL e Auth
Route.get('/movies', 'Movie/MoviesMain.index').middleware([
  'acl:leitor,basico,avancado,moderador',
  'auth',
])

// exibe as informações de um filme utilizando os middlewares ACL e Auth
Route.get('/movies/:imdbId', 'Movie/MoviesMain.show').middleware([
  'acl:leitor,basico,avancado,moderador',
  'auth',
])
