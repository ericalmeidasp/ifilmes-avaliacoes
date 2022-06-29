import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota User Register
 *
 */

// cria um user
Route.post('/user/register', 'User/UsersMain.store')

/*
 * Rota User Upgrade
 *
 */

// Faz upgrade nivel de usuário, pelo moderador, utilizando os middlewares ACL e Auth
Route.put('/user/upgrade/mod', 'User/UsersUpgradeLevelByMod.update').middleware([
  'acl:moderador',
  'auth',
])

// Faz upgrade nivel de usuário, por pontos, utilizando os middlewares ACL e Auth
Route.put('/user/upgrade', 'User/UsersUpgradeLevelByPoints.update').middleware([
  'acl:leitor,basico,avancado,moderador',
  'auth',
])
