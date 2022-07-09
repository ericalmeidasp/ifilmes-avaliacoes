import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Reações -Reactions
 *
 */

// cria uma reação a um comentário, utilizando os middlewares ACL e Auth
Route.put('/reactions', 'Comments/Reactions/ReactionMain.update').middleware([
  'auth',
  'acl:avancado,moderador',
])
