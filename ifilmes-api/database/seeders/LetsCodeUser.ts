import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await User.createMany([
      {
        email: 'leitor@letscode.com.br',
        name: 'Pedro Roberto',
        userLevel: 'leitor',
      },
      {
        email: 'basico@letscode.com.br',
        name: 'Mariana Gloria',
        userLevel: 'basico',
      },
      {
        email: 'avancado@letscode.com.br',
        name: 'Ana Maria',
        userLevel: 'avancado',
      },
      {
        email: 'moderador@letscode.com.br',
        name: 'Inara Lima',
        userLevel: 'moderador',
      },
    ])
  }
}
