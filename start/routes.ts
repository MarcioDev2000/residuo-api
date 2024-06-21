import Route from '@ioc:Adonis/Core/Route'

// Rota para criar um novo usuário
Route.post('/users', 'UsersController.store')

// Rotas para autenticação
Route.post('/login', 'SessionsController.store')
Route.post('/logout', 'SessionsController.destroy')
Route.get('/auto-login', 'SessionsController.autoLogin')

// Rotas para recuperação de senha
Route.post('/forgot-password', 'PasswordsController.forgotPassword')
Route.post('/reset-password', 'PasswordsController.resetPassword')

