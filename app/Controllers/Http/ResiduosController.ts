import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Residuo from 'App/Models/Residuo'
import CreateResiduoValidator from 'App/Validators/ResiduoValidator'

export default class ResiduosController {

  public async uploadFoto({ request, response }: HttpContextContract) {
    const foto = request.file('foto', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!foto) {
      return response.badRequest('Nenhum arquivo foi enviado.')
    }

    const fileName = `${Date.now()}.${foto.extname}`

    // Move the file to the 'local' disk
    await foto.moveToDisk('local', {
      name: fileName,
      contentType: foto.extname,
    })

    return response.json({ fileName })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate()
      const residuoPayload = await request.validate(CreateResiduoValidator)
      residuoPayload.user_id = user.id

      const foto = request.file('foto')
      if (foto) {
        const fileName = `${Date.now()}.${foto.extname}`
        await foto.moveToDisk('local', { name: fileName })
        residuoPayload.fotos = `http://localhost:3333/uploads/local/${fileName}`// Ajuste aqui
      }

      const residuo = await Residuo.create(residuoPayload)
      return response.created({ residuo })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao criar resíduo', error: error.message })
    }
  }

  public async index({ params, request, response, auth }: HttpContextContract) {
    const { tipoResiduoID, quantidadeMinima, localizacao } = request.qs();
    const { user_id } = params;

    try {
      const authenticatedUser = await auth.authenticate();

      // Verificar se o ID do usuário na URL é igual ao ID do usuário autenticado
      if (parseInt(user_id, 10) !== authenticatedUser.id) {
        return response.unauthorized({ message: 'Acesso não autorizado' });
      }

      let query = Residuo.query()
        .where('user_id', authenticatedUser.id)
        .andWhere('quantidade', '>', 0);

      if (tipoResiduoID) {
        query.where('tipo_residuo_id', tipoResiduoID);
      }
      if (quantidadeMinima) {
        query.where('quantidade', '>=', quantidadeMinima);
      }
      if (localizacao) {
        query.where('localizacao', 'ilike', `%${localizacao}%`);
      }

      const residuos = await query.exec();

      // Adicionar URL base às imagens, se necessário
      const baseUrl = 'http://localhost:3333/uploads/local/';
      const residuosComImagens = residuos.map(residuo => {
        if (residuo.fotos && !residuo.fotos.startsWith('http')) {
          residuo.fotos = `${baseUrl}${residuo.fotos}`;
        }
        return residuo;
      });

      return response.ok(residuosComImagens);
    } catch (error) {
      return response.badRequest({ message: 'Erro ao buscar resíduos', error: error.message });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const residuo = await Residuo.query()
        .where('id', id)
        .preload('tipoResiduo')
        .preload('condicao')
        .preload('disponibilidade')
        .firstOrFail()

      const disponibilidade = residuo.estaDisponivelParaCompra() ? 'Disponível para compra imediata' : 'Verificar disponibilidade com o vendedor'

      const detalhesResiduo = {
        id: residuo.id,
        userID: residuo.userID,
        tipoResiduo: residuo.tipoResiduoID,
        condicao: residuo.condicaoID,
        disponibilidade: residuo.disponibilidadeID,
        descricao: residuo.descricao,
        quantidade: residuo.quantidade,
        localizacao: residuo.localizacao,
        fotos: residuo.fotos,
        disponibilidadeStatus: disponibilidade
      }

      return response.ok(detalhesResiduo)
    } catch (error) {
      return response.notFound({ message: 'Resíduo não encontrado', error: error.message })
    }
  }
}
