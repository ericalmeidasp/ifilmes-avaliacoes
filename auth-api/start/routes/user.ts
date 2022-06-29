import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota User Register
 *
 */

// cria um user
Route.post('/register', 'UsersController.store')