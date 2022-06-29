import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Autenticação
 *
 */

// faz o login do user
Route.post('/auth', 'Auth/AuthMain.store')

// faz o logout do user, utilizando o Middlaware auth
Route.delete('/auth', 'Auth/AuthMain.destroy').middleware(['auth'])
