import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Cometários
 *
 */

// cria um cometário, utilizando os middlewares ACL e Auth
Route.post('/comments', 'Comments/CommentsMain.store').middleware([
  'auth',
  'acl:basico,avancado,moderador',
])

// marca um cometário como duplicado ou não, utilizando os middlewares ACL e Auth
Route.put('/comments/:id', 'Comments/CommentsMain.update').middleware(['auth', 'acl:moderador'])

// exlui um cometário, utilizando os middlewares ACL e Auth
Route.delete('/comments/:id', 'Comments/CommentsMain.destroy').middleware(['auth', 'acl:moderador'])
