import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota repliesComments // respostas dos comentários
 *
 */

// cria uma resposta a cometário, utilizando os middlewares ACL e Auth
Route.post('/repliescomments', 'Comments/ReplyComments.store').middleware([
  'auth',
  'acl:basico,avancado,moderador',
])

// exlui uma resposta a cometário, utilizando os middlewares ACL e Auth
Route.delete('/repliescomments/:id', 'Comments/ReplyComments.destroy').middleware([
  'auth',
  'acl:moderador',
])
