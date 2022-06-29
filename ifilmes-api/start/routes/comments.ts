import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Cometários
 *
 */

// cria um cometário, utilizando os middlewares ACL e Auth
Route.post('/comments', 'Comments/CommentsMain.store').middleware(['acl:basico,avancado,moderador', 'auth'])

// marca um cometário como duplicado ou não, utilizando os middlewares ACL e Auth
Route.put('/comments/:id', 'Comments/CommentsMain.update').middleware(['acl:moderador', 'auth'])

// exlui um cometário, utilizando os middlewares ACL e Auth
Route.delete('/comments/:id', 'Comments/CommentsMain.destroy').middleware(['acl:moderador', 'auth'])
