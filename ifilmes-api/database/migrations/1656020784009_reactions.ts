import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { reactionsTypes } from 'App/Utils'

export default class extends BaseSchema {
  protected tableName = 'reactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('type', reactionsTypes)
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('comment_id')
        .notNullable()
        .unsigned()
        .references('comments.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
