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

// Rotas protegidas para resíduos e transações
Route.post('/residuos', 'ResiduosController.store').middleware('auth')
Route.post('/transacaos', 'TransacaosController.store').middleware('auth')
Route.post('/transacaos/reservar', 'TransacaosController.reservar').middleware('auth')
Route.post('/transacaos/finalizar', 'TransacaosController.finalizar').middleware('auth')

// Rotas públicas para visualizar resíduos
Route.get('/residuos', 'ResiduosController.index')
Route.get('/residuos/:id', 'ResiduosController.show')

// Rota para visualizar o perfil do usuário autenticado
Route.get('/profile', 'ProfileController.show').middleware('auth')

Route.post('/payments/create', 'PaymentsController.createPaymentIntent');
Route.post('/stripe/webhook', 'PaymentsController.handleStripeWebhook');


// Rotas para confirmar pagamento e recebimento
Route.post('/transacaos/confirmar-pagamento', 'TransacaosController.confirmarPagamento').middleware('auth');
Route.post('/transacaos/confirmar-recebimento', 'TransacaosController.confirmarRecebimento').middleware('auth');

// Rota para retornar o menu
Route.get('/menus', 'MenusController.index');
