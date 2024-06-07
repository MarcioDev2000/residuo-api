import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
// Rota para criar um novo usuário
Route.post('/users', 'UsersController.store')
Route.post('/forgot-password', 'PasswordsController.forgotPassword')
Route.post('/reset-password', 'PasswordsController.resetPassword')

// Rotas para autenticação
Route.post('/login', 'SessionsController.store')
Route.post('/logout', 'SessionsController.destroy')
Route.get('/auto-login', 'SessionsController.autoLogin')
