import Route from '@ioc:Adonis/Core/Route'
import Provincia from 'App/Models/Provincia' // Importe o modelo da província aqui

// Rota para criar um novo usuário
Route.post('/users', 'UsersController.store')

// Rotas para autenticação
Route.post('/login', 'SessionsController.store')
Route.post('/logout', 'SessionsController.destroy')
Route.get('/auto-login', 'SessionsController.autoLogin')

// Rotas para recuperação de senha
Route.post('/forgot-password', 'PasswordsController.forgotPassword')
Route.post('/reset-password', 'PasswordsController.resetPassword')

// Rotas para cadastro adicional
Route.post('/empresas', 'EmpresasController.store')
Route.post('/usuarios-individuais', 'UsuariosIndividuaisController.store')

// Rota para obter todos os municípios de uma província específica
Route.get('/provincias/:id/municipios', async ({ params }) => {
  const provincia = await Provincia.findOrFail(params.id) // Busca a província pelo ID

  // Retorna todos os municípios relacionados a essa província
  return await provincia.related('municipios').query()
})

// Rota para obter todas as províncias
Route.get('/provincias', async () => {
  return await Provincia.all() // Retorna todas as províncias
})
