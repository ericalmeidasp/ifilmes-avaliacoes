import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Userauth } from 'App/Models'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await Userauth.createMany([
      {
        email: 'leitor@letscode.com.br',
        password: 'letscode',
        name: 'Pedro Roberto',
      },
      {
        email: 'basico@letscode.com.br',
        password: 'letscode',
        name: 'Mariana Gloria',
      },
      {
        email: 'avancado@letscode.com.br',
        password: 'letscode',
        name: 'Ana Maria',
      },
      {
        email: 'moderador@letscode.com.br',
        password: 'letscode',
        name: 'Inara Lima',
      },
    ])
  }
}
