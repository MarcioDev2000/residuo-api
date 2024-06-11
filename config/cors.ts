import type { CorsConfig } from '@ioc:Adonis/Core/Cors'

const corsConfig: CorsConfig = {
  enabled: true, // Habilita o CORS

  // Permite solicitações apenas da origem do seu aplicativo Angular
  origin: 'http://localhost:4200',

  /*
  |--------------------------------------------------------------------------
  | Métodos
  |--------------------------------------------------------------------------
  |
  | Uma lista de métodos HTTP permitidos para o CORS.
  */
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],

  /*
  |--------------------------------------------------------------------------
  | Headers
  |--------------------------------------------------------------------------
  |
  | Lista de headers permitidos para o CORS.
  */
  headers: true,

  /*
  |--------------------------------------------------------------------------
  | Expose Headers
  |--------------------------------------------------------------------------
  |
  | Lista de headers expostos pelo CORS.
  */
  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ],

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  |
  | Define se o header `Access-Control-Allow-Credentials` deve ser enviado.
  */
  credentials: true,

  /*
  |--------------------------------------------------------------------------
  | MaxAge
  |--------------------------------------------------------------------------
  |
  | Define o valor do header `Access-Control-Max-Age` em segundos.
  */
  maxAge: 90,
}

export default corsConfig
