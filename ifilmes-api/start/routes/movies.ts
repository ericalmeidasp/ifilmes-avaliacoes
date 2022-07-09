import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Movies
 *
 */

// Lista filmes relacionados em nossa DB, utilizando os middlewares ACL e Auth
Route.get('/movies', 'Movie/MoviesMain.index').middleware([
  'auth',
  'acl:leitor,basico,avancado,moderador',
])

// Salva e lista os filmes realicionados, utilizando os middlewares ACL e Auth
Route.post('/movies', 'Movie/MoviesMain.store').middleware([
  'auth',
  'acl:leitor,basico,avancado,moderador',
])

// exibe as informações de um filme utilizando os middlewares ACL e Auth
Route.get('/movies/:id', 'Movie/MoviesMain.show').middleware([
  'auth',
  'acl:leitor,basico,avancado,moderador',
])
