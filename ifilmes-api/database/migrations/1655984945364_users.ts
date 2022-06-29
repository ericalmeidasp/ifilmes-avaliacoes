import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { usersLevelsTypes } from 'App/Utils'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('name').notNullable()
      table.enu('user_level', usersLevelsTypes).notNullable().defaultTo('leitor')
      table.integer('user_points').unsigned().notNullable().defaultTo(0)
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
