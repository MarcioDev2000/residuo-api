import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Municipio from 'App/Models/Municipio'
import Provincia from 'App/Models/Provincia'

export default class MunicipioSeeder extends BaseSeeder {
  public async run () {
    const provincias = await Provincia.all()

    const municipios = {
      Luanda: ['Luanda', 'Belas', 'Cacuaco', 'Cazenga', 'Icolo e Bengo', 'Quiçama', 'Talatona', 'Viana', 'Vila de Cacuaco'],
      Bengo: ['Ambriz', 'Bula Atumba', 'Dande', 'Demba Chio', 'Nambuangongo', 'Pango Aluquém'],
      Benguela: ['Balombo', 'Baía Farta', 'Benguela', 'Bocoio', 'Caimbambo', 'Catumbela', 'Chongorói', 'Cubal', 'Ganda', 'Lobito'],
      Bie: ['Andulo', 'Camacupa', 'Catabola', 'Chinguar', 'Chitembo', 'Cuemba', 'Cunhinga', 'Cuito', 'Nharea'],
      Cabinda: ['Belize', 'Buco-Zau', 'Cabinda', 'Cacongo', 'Landana', 'Lândana', 'Massabi', 'Necuto', 'Povo Grande'],
      CuandoCubango: ['Calai', 'Cuangar', 'Cuchi', 'Cuito Cuanavale', 'Dirico', 'Longa', 'Mavinga', 'Menongue', 'Nancova', 'Rivungo'],
      CuanzaNorte: ['Ambaca', 'Bangas', 'Banga', 'Bolongongo', 'Bula Atumba', 'Cacuso', 'Cambambe', 'Dondo', 'Golungo Alto', 'Lucala', 'Quiculungo', 'Quilombo', 'Samba Cajú', 'Samba Lukala', 'Tango'],
      CuanzaSul: ['Amboim', 'Cassongue', 'Conda', 'Ebo', 'Libolo', 'Mussende', 'Quibala', 'Quilenda', 'Seles'],
      Cunene: ['Cahama', 'Cuanhama', 'Curoca', 'Cuvelai', 'Ombadja'],
      Huambo: ['Bailundo', 'Catchiungo', 'Chicala-Cholohanga', 'Chinjenje', 'Chinguar', 'Ecunha', 'Huambo', 'Londuimbale', 'Longonjo', 'Mungo', 'Tchicala-Tcholoanga', 'Tchindjenje', 'Tchitato'],
      Huila: ['Caconda', 'Cacula', 'Caluquembe', 'Chiange', 'Chibia', 'Chicomba', 'Chipindo', 'Humpata', 'Jamba', 'Lubango', 'Matala', 'Quilengues', 'Quipungo'],
      Malanje: ['Cacuso', 'Calandula', 'Cambaia', 'Cangandala', 'Caculama', 'Kangandala', 'Kiwaba Nzoji', 'Kunda-dia-Baze', 'Luquembo', 'Malanje', 'Marimba', 'Massango', 'Mucari', 'Quela', 'Quirima', 'Tala Mungongo'],
      Moxico: ['Alto Zambeze', 'Bundas', 'Camanongue', 'Cameia', 'Léua', 'Luchazes', 'Luacano', 'Luau', 'Lumbala Nguimbo', 'Lumeje', 'Lutembo', 'Moxico', 'Namacunde', 'Ninda'],
      Namibe: ['Bibala', 'Camucuio', 'Moçâmedes', 'Tômbua', 'Virei'],
      Uige: ['Ambuila', 'Bembe', 'Buengas', 'Bungo', 'Damba', 'Maquela do Zombo', 'Negage', 'Puri', 'Quimbele', 'Sanza Pombo', 'Songo', 'Uíge'],
      Zaire: ['Cuimba', 'M\'Banza Kongo', 'N\'Zeto', 'Soio', 'Tomboco'],
      LundaNorte: ['Cambulo', 'Capenda-Camulemba', 'Caungula', 'Chitato', 'Cuango', 'Cuílo', 'Lubalo', 'Xá-Muteba'],
      Lundaul: ['Cacolo', 'Dala', 'Muconda', 'Saurimo']
    }

    for (const provincia of provincias) {
      const municipioNames = municipios[provincia.nome]
      if (municipioNames) {
        const municipiosDaProvincia = municipioNames.map((nome) => {
          return {
            nome,
            provinciaId: provincia.id
          }
        })
        await Municipio.createMany(municipiosDaProvincia)
      }
    }
  }
}
