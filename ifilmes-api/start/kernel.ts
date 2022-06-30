import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

/*
 * Registro dos Middlewares
 */
Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Authuser'),
  acl: () => import('App/Middleware/AcessControlList'),
})
