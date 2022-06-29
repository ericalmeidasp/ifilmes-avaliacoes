import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Autenticação
 *
 */

// faz o login do user
Route.post('/login', 'AuthController.store')

// autentica o usuario e devolver para a api
Route.get('/getuserwithtoken', 'AuthController.show').middleware('auth')

// faz o logout do user, utilizando o Middlaware auth
Route.delete('/logout', 'AuthController.destroy').middleware('auth')
